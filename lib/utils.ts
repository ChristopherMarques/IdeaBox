import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function hexToRgb(hex: string): [number, number, number] | null {
  if (!hex || typeof hex !== "string") {
    return null;
  }

  hex = hex.replace(/^#/, "");

  // Check if it's a valid hex color
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return null;
  }

  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return [r, g, b];
}

function linearizeColorComponent(c: number): number {
  const cNormalized = c / 255;
  if (cNormalized <= 0.03928) {
    return cNormalized / 12.92;
  } else {
    return Math.pow((cNormalized + 0.055) / 1.055, 2.4);
  }
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const rLin = linearizeColorComponent(r);
  const gLin = linearizeColorComponent(g);
  const bLin = linearizeColorComponent(b);
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

export function bestContrastingColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return "#000000"; // Return black if the hex color is invalid
  }
  const luminance = relativeLuminance(rgb);

  // If luminance is less than 0.5 (darker), return white, otherwise return black
  return luminance < 0.5 ? "#FFFFFF" : "#000000";
}
