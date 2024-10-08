"use client";

import React from "react";
import ToolBar from "../ToolBar";
import Canvas from "../Canvas";
import WhiteboardElements from "./WhiteBoardElements";
import { useWhiteboard } from "@/contexts/WhiteboardContext";
import { Button } from "../ui/button";

export default function Whiteboard() {
  const {
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
    clearWhiteboardState,
    saveCanvasState,
  } = useWhiteboard();

  return (
    <div className="flex h-screen">
      <ToolBar
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
        thickness={thickness}
        setThickness={setThickness}
        setIsErasing={setIsErasing}
        addNote={() => {
          addNote({
            id: Date.now(),
            text: "",
            x: 0,
            y: 0,
            color: color,
          });
          setTool("note");
        }}
        addShape={addShape}
        addText={addText}
        selectedShape={selectedShape || "square"}
        setSelectedShape={setSelectedShape}
      />
      <div className="flex-1 relative">
        <div className="z-10">
          <Canvas
            tool={tool}
            color={color}
            thickness={thickness}
            isErasing={isErasing}
          />
        </div>
        <Button
          variant="outline"
          className="mt-4 absolute top-4 z-50 right-4"
          onClick={saveCanvasState}
        >
          Save Drawing
        </Button>
        <Button
          className="absolute bottom-4 z-50 right-4"
          onClick={clearWhiteboardState}
        >
          Clear Whiteboard
        </Button>
        <WhiteboardElements
          notes={notes}
          shapes={shapes}
          textElements={textElements}
          updateNote={updateNote}
          removeNote={removeNote}
          updateShape={updateShape}
          removeShape={removeShape}
          updateText={updateText}
          removeText={removeText}
        />
      </div>
    </div>
  );
}
