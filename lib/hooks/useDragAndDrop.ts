import { useState, useCallback, useRef, useEffect } from "react";

export function useDragAndDrop() {
  const [draggedElement, setDraggedElement] = useState<{
    id: number;
    type: "note" | "shape" | "text";
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback(
    (e: React.MouseEvent, id: number, type: "note" | "shape" | "text") => {
      const element = e.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      setDraggedElement({ id, type, offsetX, offsetY });
    },
    []
  );

  const handleDrag = useCallback(
    (
      e: React.MouseEvent,
      updateFn: (id: number, update: { x: number; y: number }) => void
    ) => {
      if (!draggedElement || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - draggedElement.offsetX;
      const y = e.clientY - rect.top - draggedElement.offsetY;

      updateFn(draggedElement.id, { x, y });
    },
    [draggedElement]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedElement(null);
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleDragEnd);
    return () => {
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, [handleDragEnd]);

  return {
    draggedElement,
    canvasRef,
    handleDragStart,
    handleDrag,
    handleDragEnd,
  };
}
