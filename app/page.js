"use client"

import React, {useState} from "react";
import Choose from "./components/Choose";
import Game from "./components/Game";

export default function Home() {
  const [player, setPlayer] = useState(null);

  const handleChoose = (choice) => {
    setPlayer(choice)
  }

  return (
    <>
    {player === null ? (
      <Choose onChoose={handleChoose} />
    ) : (
      <Game player={player} />
    )}
    </>
  );
}
