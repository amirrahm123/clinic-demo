"use client";

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type Ref,
} from "react";
import { Close } from "./icons";

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

interface ModalProps {
  ref?: Ref<ModalHandle>;
  /** id of the element that titles the dialog */
  labelledBy: string;
  children: ReactNode;
  onClose?: () => void;
  /** ~960px two-column dialog (doctor profile); full-height sheet on mobile */
  wide?: boolean;
  /** Accessible label of the close button (defaults to German) */
  closeLabel?: string;
  /**
   * Intercepts every close request (button, backdrop, Escape) – e.g. to run a view
   * transition first. Must call the given `close` to actually close the dialog.
   */
  beforeClose?: (close: () => void) => void;
}

const DRAG_CLOSE_DISTANCE = 110; // px
const DRAG_CLOSE_VELOCITY = 0.5; // px/ms – a quick flick closes from 24px on
const DRAG_MIN_FLICK = 24;

interface Sample {
  y: number;
  t: number;
}

/**
 * Native <dialog>: centered dialog on desktop, bottom sheet below 640px.
 * The browser provides focus trap, Esc handling and focus return to the trigger.
 */
export function Modal({
  ref,
  labelledBy,
  children,
  onClose,
  wide,
  closeLabel,
  beforeClose,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dragStart = useRef<number | null>(null);
  const samples = useRef<Sample[]>([]);

  const closeNow = useCallback(() => dialogRef.current?.close(), []);
  /** Every user-initiated close goes through here so `beforeClose` can intercept it */
  const close = useCallback(() => {
    if (beforeClose && dialogRef.current?.open) beforeClose(closeNow);
    else closeNow();
  }, [beforeClose, closeNow]);

  // iOS: a touch-drag on the backdrop must not scroll the page behind the sheet.
  // (React's onTouchMove is passive, so this needs a native non-passive listener.)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const block = (e: TouchEvent) => {
      if (e.target === dialog) e.preventDefault();
    };
    dialog.addEventListener("touchmove", block, { passive: false });
    return () => dialog.removeEventListener("touchmove", block);
  }, []);

  useImperativeHandle(ref, () => ({
    open: () => {
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) dialog.showModal();
    },
    close,
  }));

  // Drag-to-dismiss on the sheet handle (the handle is only rendered on mobile).
  const onHandleDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragStart.current = e.clientY;
    samples.current = [{ y: e.clientY, t: performance.now() }];
    e.currentTarget.setPointerCapture(e.pointerId);
    dialogRef.current?.setAttribute("data-dragging", "true");
  };
  const onHandleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    const dy = Math.max(0, e.clientY - dragStart.current);
    dialogRef.current?.style.setProperty("--drag-y", `${dy}px`);
    const s = samples.current;
    s.push({ y: e.clientY, t: performance.now() });
    if (s.length > 6) s.shift();
  };
  const onHandleUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    const dy = e.clientY - dragStart.current;
    dragStart.current = null;
    const dialog = dialogRef.current;
    dialog?.removeAttribute("data-dragging");
    dialog?.style.removeProperty("--drag-y");
    // Velocity over the last ~100ms of the gesture
    const s = samples.current;
    const last = s[s.length - 1];
    const ref = s.find((p) => last && last.t - p.t <= 100) ?? s[0];
    const velocity = last && ref ? (last.y - ref.y) / Math.max(1, last.t - ref.t) : 0;
    if (dy > DRAG_CLOSE_DISTANCE || (velocity > DRAG_CLOSE_VELOCITY && dy > DRAG_MIN_FLICK))
      close();
  };

  return (
    <dialog
      ref={dialogRef}
      className={`roc-dialog ${wide ? "is-wide" : ""}`}
      aria-labelledby={labelledBy}
      onClose={onClose}
      // Escape: route through `close` so beforeClose runs (the browser would close at once)
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        // A click on the dialog element itself is a click on the backdrop.
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="sheet-handle"
        aria-hidden="true"
        onPointerDown={onHandleDown}
        onPointerMove={onHandleMove}
        onPointerUp={onHandleUp}
        onPointerCancel={onHandleUp}
      />
      <button
        type="button"
        onClick={close}
        aria-label={closeLabel ?? "Schließen"}
        className="bg-ivory/90 text-navy hover:bg-sand absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full transition-colors sm:top-4 sm:right-4"
      >
        <Close />
      </button>
      {children}
    </dialog>
  );
}
