import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  PencilIcon,
  EraserIcon,
  ShapesIcon,
  TypeIcon,
  PlusIcon,
  SquareIcon,
  CircleIcon,
  TriangleIcon,
} from "lucide-react";
import { Shape, TextElement, Tool } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface ToolBarProps {
  tool: Tool;
  setTool: (tool: Tool) => void;
  color: string;
  setColor: (color: string) => void;
  thickness: number;
  setThickness: (thickness: number) => void;
  setIsErasing: (isErasing: boolean) => void;
  addNote: () => void;
  addShape: (shape: Shape) => void;
  addText: (text: TextElement) => void;
  selectedShape: Shape["type"];
  setSelectedShape: (shape: Shape["type"]) => void;
}

export default function ToolBar({
  tool,
  setTool,
  color,
  setColor,
  thickness,
  setThickness,
  setIsErasing,
  addNote,
  addShape,
  addText,
  selectedShape,
  setSelectedShape,
}: ToolBarProps) {
  return (
    <div className="bg-background border-r border-muted p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Button
          variant={tool === "pencil" ? "default" : "ghost"}
          onClick={() => {
            setTool("pencil");
            setIsErasing(false);
          }}
        >
          <PencilIcon className="w-5 h-5" />

          <span className="sr-only">Pencil</span>
        </Button>
        <Button
          variant={tool === "eraser" ? "default" : "ghost"}
          onClick={() => {
            setTool("eraser");
            setIsErasing(true);
          }}
        >
          <EraserIcon className="w-5 h-5" />
          <span className="sr-only">Eraser</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={tool === "shapes" ? "default" : "ghost"}>
              <ShapesIcon className="w-5 h-5" />
              <span className="sr-only">Shapes</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setTool("shapes");
                setSelectedShape("square");
                addShape({
                  type: "square",
                  id: Date.now(),
                  color: color,
                  x: 0,
                  y: 0,
                });
              }}
            >
              <SquareIcon className="w-4 h-4 mr-2" />
              Square
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTool("shapes");
                setSelectedShape("circle");
                addShape({
                  type: "circle",
                  id: Date.now(),
                  color: color,
                  x: 0,
                  y: 0,
                });
              }}
            >
              <CircleIcon className="w-4 h-4 mr-2" />
              Circle
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTool("shapes");
                setSelectedShape("triangle");
                addShape({
                  type: "triangle",
                  id: Date.now(),
                  color: color,
                  x: 0,
                  y: 0,
                });
              }}
            >
              <TriangleIcon className="w-4 h-4 mr-2" />
              Triangle
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant={tool === "text" ? "default" : "ghost"}
          onClick={(e) => {
            setTool("text");
            e.stopPropagation();
            addText({
              id: Date.now(),
              text: "Type and Write Here",
              color: color,
              x: 0,
              y: 0,
            });
          }}
        >
          <TypeIcon className="w-5 h-5" />
          <span className="sr-only">Text</span>
        </Button>
        <Button variant="ghost" onClick={addNote}>
          <PlusIcon className="w-5 h-5" />
          <span className="sr-only">Add Note</span>
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label htmlFor="color-picker">Color</Label>
        <Input
          id="color-picker"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-10 w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="thickness-slider">Thickness</Label>
        <Slider
          id="thickness-slider"
          min={1}
          max={10}
          value={[thickness]}
          onValueChange={(value) => setThickness(value[0])}
          className="[&>span:first-child]:h-1 [&>span:first-child]:bg-primary [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
        />
      </div>
      <div className="mt-auto">
        <Link href="/docs">
          <Button variant="outline" className="w-full">
            Documentation
          </Button>
        </Link>
      </div>
    </div>
  );
}
