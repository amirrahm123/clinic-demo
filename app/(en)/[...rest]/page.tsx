import { notFound } from "next/navigation";

/** Unknown English paths → the (en) not-found boundary (English header + footer, 404 status) */
export default function CatchAll() {
  notFound();
}
