import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { TextElement as TextElementType } from "@/types";

interface TextElementProps {
  textElement: TextElementType;
  updateText: (updatedText: Partial<TextElementType>) => void;
  removeText: () => void;
}

export default function TextElement({
  textElement,
  updateText,
}: TextElementProps) {
  return (
    <div
      className="absolute w-full h-full"
      style={{ left: textElement.x, top: textElement.y }}
    >
      <Textarea
        value={textElement.text}
        onChange={(e) => updateText({ text: e.target.value })}
        style={{ color: textElement.color }}
        className="bg-transparent border-none focus:ring-0 focus:outline-none resize-none min-w-[200px] min-h-full"
      />
    </div>
  );
}
