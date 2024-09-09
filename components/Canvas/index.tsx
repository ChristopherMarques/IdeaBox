"use client";

import React, { useRef, useEffect } from "react";
import useCanvas from "@/lib/hooks/useCanvas";
import { Tool } from "@/types";
import { useWhiteboard } from "@/contexts/WhiteboardContext";
import { DrawingCommand } from "@/types";

interface CanvasProps {
  tool: Tool;
  color: string;
  thickness: number;
  isErasing: boolean;
}

export default function Canvas({
  tool,
  color,
  thickness,
  isErasing,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { saveCanvasState, loadCanvasState } = useWhiteboard();

  const { isDrawing, drawingCommands } = useCanvas(
    canvasRef,
    tool,
    color,
    thickness,
    isErasing
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const savedCommands = loadCanvasState();
        if (savedCommands) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          savedCommands.forEach((command) => {
            ctx.beginPath();
            ctx.moveTo(command.startX, command.startY);
            ctx.lineTo(command.endX, command.endY);
            ctx.globalCompositeOperation =
              command.type === "erase" ? "destination-out" : "source-over";
            ctx.strokeStyle = command.color;
            ctx.lineWidth = command.thickness;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();
          });
        }
      }
    }
  }, [loadCanvasState]);

  useEffect(() => {
    if (!isDrawing) {
      saveCanvasState(drawingCommands as DrawingCommand[]); // Use type assertion aqui
    }
  }, [isDrawing, drawingCommands, saveCanvasState]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
