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
}: WhiteboardElementsProps) {
  return (
    <>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          updateNote={(updates) => updateNote(note.id, updates)}
          removeNote={() => removeNote(note.id)}
        />
      ))}
      {shapes.map((shape) => (
        <Shape
          key={shape.id}
          shape={shape}
          updateShape={(updates) => updateShape(shape.id, updates)}
          removeShape={() => removeShape(shape.id)}
        />
      ))}
      {textElements.map((textElement) => (
        <TextElement
          key={textElement.id}
          textElement={textElement}
          updateText={(updates) => updateText(textElement.id, updates)}
          removeText={() => removeText(textElement.id)}
        />
      ))}
    </>
  );
}
