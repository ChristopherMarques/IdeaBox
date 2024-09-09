"use client";

import React, { useRef, useEffect } from "react";
import useCanvas from "@/lib/hooks/useCanvas";
import { Tool } from "@/types";
import { useWhiteboard } from "@/contexts/WhiteboardContext";

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
  const { saveCanvasState } = useWhiteboard();

  const { isDrawing } = useCanvas(canvasRef, tool, color, thickness, isErasing);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const savedCanvasState = localStorage.getItem("canvasState");
        if (savedCanvasState) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
          };
          img.src = savedCanvasState;
        }
      }
    }
  }, [canvasRef]);

  useEffect(() => {
    if (!isDrawing) {
      saveCanvasState();
    }
  }, [isDrawing, saveCanvasState]);

  useEffect(() => {
    const saveCanvasState = () => {
      if (canvasRef.current) {
        const dataURL = canvasRef.current.toDataURL();
        localStorage.setItem("canvasState", dataURL);
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mouseup", saveCanvasState);
      canvas.addEventListener("touchend", saveCanvasState);

      return () => {
        canvas.removeEventListener("mouseup", saveCanvasState);
        canvas.removeEventListener("touchend", saveCanvasState);
      };
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
