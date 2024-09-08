"use client";

import React, { useRef } from "react";
import useCanvas from "@/lib/hooks/useCanvas";
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

  useCanvas(canvasRef, tool, color, thickness, isErasing);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
