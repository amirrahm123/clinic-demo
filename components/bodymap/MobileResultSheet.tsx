"use client";

import type { ReactNode, Ref } from "react";
import { Modal, type ModalHandle } from "../Modal";

interface MobileResultSheetProps {
  ref: Ref<ModalHandle>;
  titleId: string;
  /** Department color for the sheet header bar */
  accent: string;
  disclaimer: string;
  children: ReactNode;
}

/** Bottom sheet with the result on small screens (drag handle, close button, Esc, focus trap). */
export function MobileResultSheet({
  ref,
  titleId,
  accent,
  disclaimer,
  children,
}: MobileResultSheetProps) {
  return (
    <Modal ref={ref} labelledBy={titleId}>
      <div className="h-[3px] flex-none" style={{ background: accent }} aria-hidden="true" />
      <div className="overflow-y-auto overscroll-contain px-5 pt-3 pb-7 sm:px-8 sm:pt-6">
        {children}
        <p className="text-subtle mt-5 text-sm">{disclaimer}</p>
      </div>
    </Modal>
  );
}
