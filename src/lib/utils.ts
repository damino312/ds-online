import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removePointerEventsFromBody() {
  if (document.body.style.pointerEvents === "none") {
      document.body.style.pointerEvents = "";
  }
}
