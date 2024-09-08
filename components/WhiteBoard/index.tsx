"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Tool,
  Note as NoteType,
  Shape as ShapeType,
  TextElement as TextElementType,
} from "@/types";
import ToolBar from "../ToolBar";
import Canvas from "../Canvas";
import Note from "../Note";
import Shape from "../Shape";
import TextElement from "../TextElement";

export default function Whiteboard() {
  const [tool, setTool] = useState<Tool>("pencil");
  const [color, setColor] = useState("#000000");
  const [thickness, setThickness] = useState(2);
  const [isErasing, setIsErasing] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [shapes, setShapes] = useState<ShapeType[]>([]);
  const [textElements, setTextElements] = useState<TextElementType[]>([]);

  const addNote = () => {
    setNotes([...notes, { text: "New Note", x: 100, y: 100, color: color }]);
  };

  const updateNote = (index: number, updatedNote: Partial<NoteType>) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = { ...updatedNotes[index], ...updatedNote };
    setNotes(updatedNotes);
  };

  const removeNote = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const addShape = (shape: ShapeType) => {
    setShapes([...shapes, shape]);
  };

  const updateShape = (index: number, updatedShape: Partial<ShapeType>) => {
    const updatedShapes = [...shapes];
    updatedShapes[index] = { ...updatedShapes[index], ...updatedShape };
    setShapes(updatedShapes);
  };

  const removeShape = (index: number) => {
    const updatedShapes = [...shapes];
    updatedShapes.splice(index, 1);
    setShapes(updatedShapes);
  };

  const addText = (textElement: TextElementType) => {
    setTextElements([...textElements, textElement]);
  };

  const updateText = (index: number, updatedText: Partial<TextElementType>) => {
    const updatedTextElements = [...textElements];
    updatedTextElements[index] = {
      ...updatedTextElements[index],
      ...updatedText,
    };
    setTextElements(updatedTextElements);
  };

  const removeText = (index: number) => {
    const updatedTextElements = [...textElements];
    updatedTextElements.splice(index, 1);
    setTextElements(updatedTextElements);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const [type, index] = draggableId.split("-");

    const newX = destination.x;
    const newY = destination.y;

    switch (type) {
      case "note":
        updateNote(parseInt(index), { x: newX, y: newY });
        break;
      case "shape":
        updateShape(parseInt(index), { x: newX, y: newY });
        break;
      case "text":
        updateText(parseInt(index), { x: newX, y: newY });
        break;
    }
  };

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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="whiteboard" type="WHITEBOARD_ITEM">
          {(provided, snapshot) => (
            <div
              className="flex-1 relative"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Canvas
                tool={tool}
                color={color}
                thickness={thickness}
                isErasing={isErasing}
              />
              {notes.map((note, index) => (
                <Draggable
                  key={`note-${index}`}
                  draggableId={`note-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        position: "absolute",
                        left: note.x,
                        top: note.y,
                      }}
                    >
                      <Note
                        note={note}
                        updateNote={(updatedNote) =>
                          updateNote(index, updatedNote)
                        }
                        removeNote={() => removeNote(index)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {shapes.map((shape, index) => (
                <Draggable
                  key={`shape-${index}`}
                  draggableId={`shape-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        position: "absolute",
                        left: shape.x,
                        top: shape.y,
                      }}
                    >
                      <Shape
                        shape={shape}
                        updateShape={(updatedShape) =>
                          updateShape(index, updatedShape)
                        }
                        removeShape={() => removeShape(index)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {textElements.map((textElement, index) => (
                <Draggable
                  key={`text-${index}`}
                  draggableId={`text-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        position: "absolute",
                        left: textElement.x,
                        top: textElement.y,
                      }}
                    >
                      <TextElement
                        textElement={textElement}
                        updateText={(updatedText) =>
                          updateText(index, updatedText)
                        }
                        removeText={() => removeText(index)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
