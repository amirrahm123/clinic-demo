import { notFound } from "next/navigation";

/** Unknown /de/… paths → the (de) not-found boundary (German header + footer, 404 status) */
export default function CatchAll() {
  notFound();
}
