"use client";

import Whiteboard from "@/components/WhiteBoard";
import { WhiteboardProvider } from "@/contexts/WhiteboardContext";

export default function Home() {
  return (
    <WhiteboardProvider>
      <main className="w-screen h-screen">
        <Whiteboard />
      </main>
    </WhiteboardProvider>
  );
}
