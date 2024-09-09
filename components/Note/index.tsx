"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { Note as NoteType } from "@/types";
import { bestContrastingColor } from "@/lib/utils";
import Draggable from "react-draggable";

interface NoteProps {
  note: NoteType;
  updateNote: (updatedNote: Partial<NoteType>) => void;
  removeNote: () => void;
}

export default function Note({ note, updateNote, removeNote }: NoteProps) {
  const [position, setPosition] = useState({ x: note.x, y: note.y });
  const color = bestContrastingColor(note.color);

  useEffect(() => {
    setPosition({ x: note.x, y: note.y });
  }, [note.x, note.y]);

  return (
    <Draggable
      bounds="parent"
      position={position}
      onStop={(e, data) => {
        setPosition({ x: data.x, y: data.y });
        updateNote({ x: data.x, y: data.y });
      }}
    >
      <div
        className="absolute p-2 rounded-md shadow-md min-w-[200px] min-h-[100px]"
        style={{ backgroundColor: note.color }}
      >
        <Textarea
          value={note.text}
          onChange={(e) => updateNote({ text: e.target.value })}
          style={{ color: color }}
          className="bg-transparent border-none focus:ring-0 focus:outline-none resize-none"
        />
        <div className="flex justify-end gap-2">
          <div
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: note.color }}
          />
          <Button
            variant="ghost"
            size="icon"
            className={`text-[${color}] hover:text-red-500`}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={removeNote}
          >
            <XIcon className={`w-4 h-4 `} />
            <span className="sr-only">Remove Note</span>
          </Button>
        </div>
      </div>
    </Draggable>
  );
}
