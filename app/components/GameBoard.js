import React, { useState } from 'react';
import { X, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const GameBoard = () => {
  const initialState = {
    board: Array(9).fill(null),
    isXNext: true,
    gameMode: null, // 'ai' or 'friend'
    gameStarted: false,
    winner: null,
    score: { you: 0, ai: 0 },
  };

  const [gameState, setGameState] = useState(initialState);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6], // diagonals
    ];

    return lines
      .map(([a, b, c]) => (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) ? squares[a] : null)
      .find(Boolean); // Return the winner if found, otherwise null
  };

  const getAIMove = (board) => {
    // Simple AI: Find first empty space
    const emptyIndexes = board.map((square, index) => square === null ? index : null).filter(val => val !== null);
    return emptyIndexes.length ? emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)] : null;
  };

  const updateGameState = (newBoard, winner, newScore) => {
    setGameState((prevState) => ({
      ...prevState,
      board: newBoard,
      isXNext: prevState.gameMode === 'friend' ? !prevState.isXNext : true,
      winner,
      score: newScore,
    }));
  };

  const handleSquareClick = (index) => {
    if (!gameState.gameStarted || gameState.board[index] || gameState.winner) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.isXNext ? 'X' : 'O';

    const winner = calculateWinner(newBoard);

    let newScore = { ...gameState.score };

    if (gameState.gameMode === 'ai' && !winner) {
      const aiMove = getAIMove(newBoard);
      if (aiMove !== null) {
        newBoard[aiMove] = 'O';
      }
    }

    const finalWinner = calculateWinner(newBoard);
    if (finalWinner) {
      if (gameState.gameMode === 'ai') {
        newScore[finalWinner === 'X' ? 'you' : 'ai']++;
      }
    }

    updateGameState(newBoard, finalWinner, newScore);
  };

  const startGame = (mode) => {
    setGameState({ ...initialState, gameMode: mode, gameStarted: true });
  };

  const resetGame = () => {
    setGameState({ ...initialState, gameStarted: true });
  };

  const endGame = () => {
    setGameState(initialState);
  };

  const renderSquare = (index) => {
    const value = gameState.board[index];
    return (
      <button
        key={index}
        className="w-20 h-20 border-2 border-white/20 flex items-center justify-center text-white text-4xl"
        onClick={() => handleSquareClick(index)}
      >
        {value === 'X' && <X size={40} />}
        {value === 'O' && <Circle size={40} />}
      </button>
    );
  };

  const renderGameModeSelection = () => (
    <Card className="w-80 bg-purple-600 text-white">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex justify-center gap-4 text-4xl mb-8">
          <Circle size={48} />
          <X size={48} />
        </div>
        <h2 className="text-xl text-center mb-4">Choose a play mode</h2>
        <Button className="w-full bg-white/20 hover:bg-white/30" onClick={() => startGame('ai')}>
          With AI
        </Button>
        <Button className="w-full bg-white/20 hover:bg-white/30" onClick={() => startGame('friend')}>
          With a friend
        </Button>
      </CardContent>
    </Card>
  );

  const renderChooseSideScreen = () => (
    <Card className="w-80 bg-purple-600 text-white">
      <CardContent className="p-6 flex flex-col gap-4">
        <h2 className="text-xl text-center mb-4">Choose a side</h2>
        <div className="flex justify-center gap-8 mb-8">
          <Circle size={48} />
          <X size={48} />
        </div>
        <Button className="w-full bg-white/20 hover:bg-white/30" onClick={startGame}>
          Start game
        </Button>
      </CardContent>
    </Card>
  );

  const renderGameBoard = () => (
    <Card className="w-80 bg-purple-600 text-white">
      <CardContent className="p-6">
        {gameState.gameMode === 'ai' && (
          <div className="flex justify-between mb-4">
            <span>You {gameState.score.you}</span>
            <span>AI {gameState.score.ai}</span>
          </div>
        )}
        <div className="grid grid-cols-3 gap-1 mb-4">
          {Array.from({ length: 9 }, (_, index) => renderSquare(index))}
        </div>
        <div className="flex flex-col gap-2">
          <Button className="w-full bg-white/20 hover:bg-white/30" onClick={resetGame}>
            Restart
          </Button>
          <Button className="w-full bg-white/20 hover:bg-white/30" onClick={endGame}>
            End game
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (!gameState.gameMode) return renderGameModeSelection();
  if (!gameState.gameStarted) return renderChooseSideScreen();
  return renderGameBoard();
};

export default GameBoard;