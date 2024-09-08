import { useState, useCallback } from "react";
import { Tool, Note, Shape, TextElement } from "@/types";

export function useWhiteboardState() {
  const [tool, setTool] = useState<Tool>("pencil");
  const [color, setColor] = useState("#000000");
  const [thickness, setThickness] = useState(2);
  const [isErasing, setIsErasing] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [textElements, setTextElements] = useState<TextElement[]>([]);

  const addNote = useCallback(() => {
    setNotes((prev) => [
      ...prev,
      { id: Date.now(), text: "Nova Nota", x: 100, y: 100, color },
    ]);
  }, [color]);

  const updateNote = useCallback((id: number, updatedNote: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...updatedNote } : note))
    );
  }, []);

  const removeNote = useCallback((id: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

  const addShape = useCallback((shape: Shape) => {
    setShapes((prev) => [...prev, { ...shape, id: Date.now() }]);
  }, []);

  const updateShape = useCallback(
    (id: number, updatedShape: Partial<Shape>) => {
      setShapes((prev) =>
        prev.map((shape) =>
          shape.id === id ? { ...shape, ...updatedShape } : shape
        )
      );
    },
    []
  );

  const removeShape = useCallback((id: number) => {
    setShapes((prev) => prev.filter((shape) => shape.id !== id));
  }, []);

  const addText = useCallback((textElement: TextElement) => {
    setTextElements((prev) => [...prev, { ...textElement, id: Date.now() }]);
  }, []);

  const updateText = useCallback(
    (id: number, updatedText: Partial<TextElement>) => {
      setTextElements((prev) =>
        prev.map((text) =>
          text.id === id ? { ...text, ...updatedText } : text
        )
      );
    },
    []
  );

  const removeText = useCallback((id: number) => {
    setTextElements((prev) => prev.filter((text) => text.id !== id));
  }, []);

  return {
    tool,
    setTool,
    color,
    setColor,
    thickness,
    setThickness,
    isErasing,
    setIsErasing,
    notes,
    shapes,
    textElements,
    addNote,
    updateNote,
    removeNote,
    addShape,
    updateShape,
    removeShape,
    addText,
    updateText,
    removeText,
  };
}
