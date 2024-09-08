import React from "react";
import Note from "../Note";
import Shape from "../Shape";
import TextElement from "../TextElement";
import {
  Note as NoteType,
  Shape as ShapeType,
  TextElement as TextElementType,
} from "@/types";

interface WhiteboardElementsProps {
  notes: NoteType[];
  shapes: ShapeType[];
  textElements: TextElementType[];
  updateNote: (id: number, updatedNote: Partial<NoteType>) => void;
  removeNote: (id: number) => void;
  updateShape: (id: number, updatedShape: Partial<ShapeType>) => void;
  removeShape: (id: number) => void;
  updateText: (id: number, updatedText: Partial<TextElementType>) => void;
  removeText: (id: number) => void;
  handleDragStart: (
    e: React.MouseEvent,
    id: number,
    type: "note" | "shape" | "text"
  ) => void;
  draggedElement: { id: number; type: "note" | "shape" | "text" } | null;
}

export default function WhiteboardElements({
  notes,
  shapes,
  textElements,
  updateNote,
  removeNote,
  updateShape,
  removeShape,
  updateText,
  removeText,
  handleDragStart,
  draggedElement,
}: WhiteboardElementsProps) {
  return (
    <>
      {notes.map((note) => (
        <div
          key={`note-${note.id}`}
          onMouseDown={(e) => handleDragStart(e, note.id, "note")}
          style={{
            position: "absolute",
            left: note.x,
            top: note.y,
            cursor: draggedElement?.id === note.id ? "grabbing" : "grab",
          }}
        >
          <Note
            note={note}
            updateNote={(updatedNote) => updateNote(note.id, updatedNote)}
            removeNote={() => removeNote(note.id)}
          />
        </div>
      ))}
      {shapes.map((shape) => (
        <div
          key={`shape-${shape.id}`}
          onMouseDown={(e) => handleDragStart(e, shape.id, "shape")}
          style={{
            position: "absolute",
            left: shape.x,
            top: shape.y,
            cursor: draggedElement?.id === shape.id ? "grabbing" : "grab",
          }}
        >
          <Shape
            shape={shape}
            updateShape={(updatedShape) => updateShape(shape.id, updatedShape)}
            removeShape={() => removeShape(shape.id)}
          />
        </div>
      ))}
      {textElements.map((textElement) => (
        <div
          key={`text-${textElement.id}`}
          onMouseDown={(e) => handleDragStart(e, textElement.id, "text")}
          style={{
            position: "absolute",
            left: textElement.x,
            top: textElement.y,
            cursor: draggedElement?.id === textElement.id ? "grabbing" : "grab",
          }}
        >
          <TextElement
            textElement={textElement}
            updateText={(updatedText) =>
              updateText(textElement.id, updatedText)
            }
            removeText={() => removeText(textElement.id)}
          />
        </div>
      ))}
    </>
  );
}
