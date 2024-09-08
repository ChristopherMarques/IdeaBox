"use client";

import React from "react";
import ToolBar from "../ToolBar";
import Canvas from "../Canvas";
import { useWhiteboardState } from "@/lib/hooks/useWhiteboardState";
import { useDragAndDrop } from "@/lib/hooks/useDragAndDrop";
import WhiteboardElements from "./WhiteBoardElements";

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
  } = useWhiteboardState();

  const {
    draggedElement,
    canvasRef,
    handleDragStart,
    handleDrag,
    handleDragEnd,
  } = useDragAndDrop();

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
        addNote={addNote}
        addShape={addShape}
        addText={addText}
      />
      <div
        ref={canvasRef}
        className="flex-1 relative overflow-hidden"
        onMouseMove={(e) =>
          handleDrag(e, (id, update) => {
            if (draggedElement?.type === "note") updateNote(id, update);
            if (draggedElement?.type === "shape") updateShape(id, update);
            if (draggedElement?.type === "text") updateText(id, update);
          })
        }
      >
        <Canvas
          tool={tool}
          color={color}
          thickness={thickness}
          isErasing={isErasing}
        />
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
          handleDragStart={handleDragStart}
          draggedElement={draggedElement}
        />
      </div>
    </div>
  );
}
