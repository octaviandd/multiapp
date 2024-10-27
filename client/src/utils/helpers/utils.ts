/** @format */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchWithOptions(
  url: RequestInfo | URL,
  options?: {
    method?: string;
    headers?: RequestInit["headers"];
    contentType?: string;
    body?: string | FormData;
  }
) {
  const defaultOptions = {
    method: options?.method ? options?.method : "GET",
    headers: {
      "Content-Type": options?.contentType
        ? options?.contentType
        : "application/json",
      credentials: "include",
    },
    body: options?.body ? options?.body : undefined,
  };

  let error: any = undefined;
  let data: any = undefined;

  try {
    const response = await fetch(url, defaultOptions);
    data = await response.json();
  } catch (error) {
    error = error;
  }

  return { data, error };
}
