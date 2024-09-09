"use client";

import React, { useRef, useEffect } from "react";
import useCanvas from "@/lib/hooks/useCanvas";
import { useWhiteboard } from "@/contexts/WhiteboardContext";
import { Tool } from "@/types";

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
  const { isDrawing } = useCanvas(canvasRef, tool, color, thickness, isErasing);
  const { setCanvasRef } = useWhiteboard();

  useEffect(() => {
    if (canvasRef.current) {
      setCanvasRef(canvasRef);
    }
  }, [setCanvasRef]);

  useEffect(() => {
    const loadSavedCanvasState = () => {
      const savedState = localStorage.getItem("canvasState");
      if (savedState && canvasRef.current) {
        const img = new Image();
        img.onload = () => {
          const ctx = canvasRef.current?.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
          }
        };
        img.src = savedState;
      }
    };

    loadSavedCanvasState();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{
        touchAction: "none",
        cursor: isDrawing || isErasing ? "crosshair" : "default",
      }}
    />
  );
}
