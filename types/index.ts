export type Tool = "pencil" | "eraser" | "shapes" | "text";

export interface Note {
  text: string;
  x: number;
  y: number;
  color: string;
}

export interface Shape {
  type: "rectangle" | "circle" | "triangle";
  color: string;
  x: number;
  y: number;
}

export interface TextElement {
  text: string;
  color: string;
  x: number;
  y: number;
}
