"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  PropsWithChildren,
} from "react";
import { Tool, Note, Shape, TextElement } from "@/types";
import { toast } from "@/lib/hooks/useToast";

interface WhiteboardContextType {
  tool: Tool;
  setTool: (tool: Tool) => void;
  color: string;
  setColor: (color: string) => void;
  thickness: number;
  setThickness: (thickness: number) => void;
  isErasing: boolean;
  setIsErasing: (isErasing: boolean) => void;
  notes: Note[];
  shapes: Shape[];
  textElements: TextElement[];
  addNote: (note: Note) => void;
  updateNote: (id: number, updatedNote: Partial<Note>) => void;
  removeNote: (id: number) => void;
  addShape: (shape: Shape) => void;
  updateShape: (id: number, updatedShape: Partial<Shape>) => void;
  removeShape: (id: number) => void;
  addText: (textElement: TextElement) => void;
  updateText: (id: number, updatedText: Partial<TextElement>) => void;
  removeText: (id: number) => void;
  selectedShape: Shape["type"] | null;
  setSelectedShape: (shape: Shape["type"] | null) => void;
  canvasRef: React.RefObject<HTMLCanvasElement> | null;
  setCanvasRef: (ref: React.RefObject<HTMLCanvasElement>) => void;
  clearCanvas: () => void;
  saveCanvasState: () => void;
  clearWhiteboardState: () => void;
}

const WhiteboardContext = createContext<WhiteboardContextType>({
  tool: "pencil",
  setTool: () => {},
  color: "#000000",
  setColor: () => {},
  thickness: 2,
  setThickness: () => {},
  isErasing: false,
  setIsErasing: () => {},
  notes: [],
  shapes: [],
  textElements: [],
  addNote: () => {},
  updateNote: () => {},
  removeNote: () => {},
  addShape: () => {},
  updateShape: () => {},
  removeShape: () => {},
  addText: () => {},
  updateText: () => {},
  removeText: () => {},
  selectedShape: null,
  setSelectedShape: () => {},
  canvasRef: null,
  setCanvasRef: () => {},
  clearCanvas: () => {},
  saveCanvasState: () => {},
  clearWhiteboardState: () => {},
});

export const WhiteboardProvider = ({ children }: PropsWithChildren) => {
  const [tool, setTool] = useState<Tool>("pencil");
  const [color, setColor] = useState("#000000");
  const [thickness, setThickness] = useState(2);
  const [isErasing, setIsErasing] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [selectedShape, setSelectedShape] = useState<Shape["type"] | null>(
    null
  );
  const [canvasRef, setCanvasRef] =
    useState<React.RefObject<HTMLCanvasElement> | null>(null);

  const clearCanvas = useCallback(() => {
    if (canvasRef && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, [canvasRef]);

  const saveCanvasState = useCallback(() => {
    if (canvasRef && canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL();
      localStorage.setItem("canvasState", dataURL);
      toast({
        title: "Success!",
        variant: "default",
        description: "Canvas state saved",
      });
    }
  }, [canvasRef]);

  const clearWhiteboardState = useCallback(() => {
    setNotes([]);
    setShapes([]);
    setTextElements([]);
    localStorage.removeItem("whiteboardState");
    localStorage.removeItem("canvasState");
    toast({
      title: "Success!",
      variant: "default",
      description: "Canvas state cleared",
    });
    window.location.reload();
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem("whiteboardState");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setNotes(parsedState.notes);
        setShapes(parsedState.shapes);
        setTextElements(parsedState.textElements);
      } catch (error) {
        console.error("Error parsing saved state:", error);
        toast({
          title: "Error!",
          variant: "destructive",
          description: "Error parsing saved state",
        });
      }
    }
  }, []);

  useEffect(() => {
    const stateToSave = JSON.stringify({ notes, shapes, textElements });
    localStorage.setItem("whiteboardState", stateToSave);
  }, [notes, shapes, textElements]);

  const addNote = (note: Note) => setNotes((prev) => [...prev, note]);
  const updateNote = (id: number, updatedNote: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...updatedNote } : note))
    );
  };
  const removeNote = (id: number) =>
    setNotes((prev) => prev.filter((note) => note.id !== id));

  const addShape = (shape: Shape) => setShapes((prev) => [...prev, shape]);
  const updateShape = (id: number, updatedShape: Partial<Shape>) => {
    setShapes((prev) =>
      prev.map((shape) =>
        shape.id === id ? { ...shape, ...updatedShape } : shape
      )
    );
  };
  const removeShape = (id: number) =>
    setShapes((prev) => prev.filter((shape) => shape.id !== id));

  const addText = (textElement: TextElement) =>
    setTextElements((prev) => [...prev, textElement]);
  const updateText = (id: number, updatedText: Partial<TextElement>) => {
    setTextElements((prev) =>
      prev.map((text) => (text.id === id ? { ...text, ...updatedText } : text))
    );
  };
  const removeText = (id: number) =>
    setTextElements((prev) => prev.filter((text) => text.id !== id));

  return (
    <WhiteboardContext.Provider
      value={{
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
        selectedShape,
        setSelectedShape,
        canvasRef,
        setCanvasRef,
        clearCanvas,
        saveCanvasState,
        clearWhiteboardState,
      }}
    >
      {children}
    </WhiteboardContext.Provider>
  );
};

export const useWhiteboard = () => {
  const context = useContext(WhiteboardContext);
  if (context === undefined) {
    throw new Error("useWhiteboard must be used within a WhiteboardProvider");
  }
  return context;
};
