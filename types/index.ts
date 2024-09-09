export type Tool = "pencil" | "eraser" | "shapes" | "text" | "note";

export interface Note {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
}

export interface Shape {
  id: number;
  type: "square" | "circle" | "triangle";
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

export interface DrawingCommand {
  type: 'draw' | 'erase';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  thickness: number;
}
