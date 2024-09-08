import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { Note as NoteType } from "@/types";
import { bestContrastingColor } from "@/lib/utils";

interface NoteProps {
  note: NoteType;
  updateNote: (updatedNote: Partial<NoteType>) => void;
  removeNote: () => void;
}

export default function Note({ note, updateNote, removeNote }: NoteProps) {
  return (
    <div
      className="absolute p-2 rounded-md shadow-md"
      style={{ left: note.x, top: note.y, backgroundColor: note.color }}
    >
      <Textarea
        value={note.text}
        onChange={(e) => updateNote({ text: e.target.value })}
        style={{ color: bestContrastingColor(note.color) }}
        className="bg-transparent border-none focus:ring-0 focus:outline-none resize-none"
      />
      <div className="flex justify-end gap-2">
        <div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: note.color }}
        />
        <Button variant="ghost" size="icon" onClick={removeNote}>
          <XIcon
            className="w-4 h-4"
            style={{ color: bestContrastingColor(note.color) }}
          />
          <span className="sr-only">Remove Note</span>
        </Button>
      </div>
    </div>
  );
}
