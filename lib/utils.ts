import { ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function sluggify(title: string) {
  const re = /[^\w\s]/g;

  return title.trim().toLowerCase().replace(re, "").replace(/\s+/g, "-");
}
