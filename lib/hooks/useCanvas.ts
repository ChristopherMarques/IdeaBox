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

  const getPos = useCallback(
    (e: MouseEvent | TouchEvent): Position => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      if ("touches" in e) {
        return {
          x: (e.touches[0].clientX - rect.left) * scaleX,
          y: (e.touches[0].clientY - rect.top) * scaleY,
        };
      } else {
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY,
        };
      }
    },
    [canvasRef]
  );

  const startDrawing = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!context) return;
      setIsDrawing(true);
      const { x, y } = getPos(e);
      context.beginPath();
      context.moveTo(x, y);
    },
    [context, getPos]
  );

  const draw = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDrawing || !context) return;
      const { x, y } = getPos(e);
      context.lineTo(x, y);
      context.strokeStyle = isErasing ? "#ffffff" : color;
      context.lineWidth = thickness;
      context.lineCap = "round";
      context.lineJoin = "round";
      if (isErasing) {
        context.globalCompositeOperation = "destination-out";
      } else {
        context.globalCompositeOperation = "source-over";
      }
      context.stroke();
    },
    [isDrawing, context, color, thickness, isErasing, getPos]
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    if (context) {
      context.beginPath();
    }
  }, [context]);

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

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);

      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);

      window.removeEventListener("resize", resizeCanvas);
    };
  }, [canvasRef, startDrawing, draw, stopDrawing]);

  return { isDrawing };
}
