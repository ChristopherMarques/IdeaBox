export type Tool = "pencil" | "eraser" | "shapes" | "text";

export interface Note {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
}

export interface Shape {
  type: "rectangle" | "circle" | "triangle";
  id: number;
  color: string;
  x: number;
  y: number;
}

export interface TextElement {
  id: number;
  text: string;
  color: string;
  x: number;
  y: number;
}
