"use client";

import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { TextElement as TextElementType } from "@/types";
import Draggable from "react-draggable";

interface TextElementProps {
  textElement: TextElementType;
  updateText: (updatedText: Partial<TextElementType>) => void;
  removeText: () => void;
}

export default function TextElement({
  textElement,
  updateText,
}: TextElementProps) {
  const [position, setPosition] = useState({
    x: textElement.x,
    y: textElement.y,
  });

  useEffect(() => {
    setPosition({ x: textElement.x, y: textElement.y });
  }, [textElement.x, textElement.y]);

  return (
    <Draggable
      bounds="parent"
      position={position}
      onStop={(e, data) => {
        setPosition({ x: data.x, y: data.y });
        updateText({ x: data.x, y: data.y });
      }}
    >
      <div className="absolute">
        <Textarea
          value={textElement.text}
          placeholder="Type and Write Here"
          onChange={(e) => updateText({ text: e.target.value })}
          style={{ color: textElement.color }}
          className="bg-transparent border-accent focus:ring-0 focus:outline-none resize-none min-w-[200px] min-h-full"
        />
      </div>
    </Draggable>
  );
}
