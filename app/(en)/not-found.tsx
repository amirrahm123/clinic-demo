import { NotFound } from "@/components/NotFound";

/** 404 inside the English layout (header + footer in the page language) */
export default function NotFoundPage() {
  return <NotFound locale="en" />;
}
