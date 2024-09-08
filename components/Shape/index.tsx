import React from "react";
import { Shape as ShapeType } from "@/types";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { bestContrastingColor } from "@/lib/utils";

interface ShapeProps {
  shape: ShapeType;
  updateShape: (updatedShape: Partial<ShapeType>) => void;
  removeShape: () => void;
}

export default function Shape({ shape, updateShape, removeShape }: ShapeProps) {
  const renderShape = () => {
    switch (shape.type) {
      case "rectangle":
        return (
          <div
            className="w-20 h-20 rounded-md"
            style={{ backgroundColor: shape.color }}
          />
        );
      case "circle":
        return (
          <div
            className="w-20 h-20 rounded-full"
            style={{ backgroundColor: shape.color }}
          />
        );
      case "triangle":
        return (
          <div
            className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px]"
            style={{ borderColor: shape.color }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="absolute"
      style={{ left: shape.x, top: shape.y }}
      draggable
      onDragEnd={(e) => {
        updateShape({ x: e.clientX, y: e.clientY });
      }}
    >
      {renderShape()}
      <Button variant="ghost" size="icon" onClick={removeShape}>
        <XIcon
          className="w-4 h-4"
          style={{ color: bestContrastingColor(shape.color) }}
        />
        <span className="sr-only">Remove Note</span>
      </Button>
    </div>
  );
}
