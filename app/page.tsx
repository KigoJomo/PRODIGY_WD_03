'use client';

import GameBoard from "./components/GameBoard";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 to-pink-500">
      <GameBoard />
    </main>
  );
}