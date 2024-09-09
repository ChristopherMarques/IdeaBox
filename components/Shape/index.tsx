"use client";

import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Shape as ShapeType } from "@/types";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

interface ShapeProps {
  shape: ShapeType;
  updateShape: (updatedShape: Partial<ShapeType>) => void;
  removeShape: () => void;
}

const shapeComponents = {
  square: (color: string) => (
    <div className="w-48 h-48 rounded-md" style={{ backgroundColor: color }} />
  ),
  circle: (color: string) => (
    <div
      className="w-48 h-48 rounded-full"
      style={{ backgroundColor: color }}
    />
  ),
  triangle: (color: string) => (
    <div
      className="w-0 h-0 border-x-[50px] border-x-transparent border-b-[100px]"
      style={{ borderBottomColor: color }}
    />
  ),
};

export default function Shape({ shape, updateShape, removeShape }: ShapeProps) {
  const [position, setPosition] = useState({ x: shape.x, y: shape.y });

  useEffect(() => {
    setPosition({ x: shape.x, y: shape.y });
  }, [shape.x, shape.y]);

  const renderShape = () => {
    const ShapeComponent = shapeComponents[shape.type];
    return (
      <>
        {ShapeComponent && ShapeComponent(shape.color)}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 -mt-2 -mr-2"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={removeShape}
        >
          <XIcon className="w-4 h-4 text-red-500" />
          <span className="sr-only">Remove Shape</span>
        </Button>
      </>
    );
  };

  return (
    <Draggable
      bounds="parent"
      position={position}
      onStop={(e, data) => {
        setPosition({ x: data.x, y: data.y });
        updateShape({ x: data.x, y: data.y });
      }}
    >
      <div className="absolute">{renderShape()}</div>
    </Draggable>
  );
}
