import { useState, useEffect, RefObject, useCallback } from "react";
import { Tool } from "@/types";

interface Position {
  x: number;
  y: number;
}

export default function useCanvas(
  canvasRef: RefObject<HTMLCanvasElement>,
  tool: Tool,
  color: string,
  thickness: number,
  isErasing: boolean
) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const getMousePos = useCallback(
    (e: MouseEvent): Position => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    [canvasRef]
  );

  const startDrawing = useCallback(
    (e: MouseEvent) => {
      if (!context) return;
      setIsDrawing(true);
      const { x, y } = getMousePos(e);
      context.beginPath();
      context.moveTo(x, y);
    },
    [context, getMousePos]
  );

  const draw = useCallback(
    (e: MouseEvent) => {
      if (!isDrawing || !context) return;
      const { x, y } = getMousePos(e);
      context.lineTo(x, y);
      context.strokeStyle = isErasing ? "#ffff" : color;
      context.lineWidth = isErasing ? thickness * 2 : thickness;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.stroke();
    },
    [isDrawing, context, color, thickness, isErasing, getMousePos]
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      setContext(ctx);
    }

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const oldImageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = width;
      canvas.height = height;
      if (oldImageData) {
        ctx?.putImageData(oldImageData, 0, 0);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseDown = (e: MouseEvent) => {
      startDrawing(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      draw(e);
    };

    const handleMouseUp = () => {
      stopDrawing();
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseout", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseout", handleMouseUp);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [canvasRef, startDrawing, draw, stopDrawing]);

  return { isDrawing };
}
