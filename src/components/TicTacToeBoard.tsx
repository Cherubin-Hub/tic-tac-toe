"use client";
import { useState, useEffect } from "react";

export function TicTacToeBoard() {
  const initialBoard = Array(9).fill(null);
  function calculateWinner(squares: (string | null)[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  const [squares, setSquares] = useState<(string | null)[]>(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, Draw: 0 });
  const [showWinner, setShowWinner] = useState<string | null>(null);
  const [showNewGameWarning, setShowNewGameWarning] = useState(false);
  const winner = calculateWinner(squares);

  function handleClick(i: number) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // Show popup when game ends
  useEffect(() => {
    if (winner) {
      setTimeout(() => setShowWinner(winner === "X" ? "❌ X wins!" : "⭕ O wins!"), 400);
    } else if (squares.every(Boolean)) {
      setTimeout(() => setShowWinner("🤝 It's a draw!"), 400);
    }
  }, [winner, squares]);

  function handleReset() {
    // Update scoreboard if game ended
    if (winner === "X" || winner === "O") {
      setScore((prev) => ({ ...prev, [winner]: prev[winner as "X" | "O"] + 1 }));
    } else if (squares.every(Boolean)) {
      setScore((prev) => ({ ...prev, Draw: prev.Draw + 1 }));
    }
    setSquares(initialBoard);
    setXIsNext(true);
    setShowWinner(null);
  }

  function handleNewGame() {
    setShowNewGameWarning(true);
  }

  function confirmNewGame() {
    setScore({ X: 0, O: 0, Draw: 0 });
    setSquares(initialBoard);
    setXIsNext(true);
    setShowWinner(null);
    setShowNewGameWarning(false);
  }

  return (
    <div className="flex flex-row items-start justify-center gap-8 w-full relative">
      {/* Winner Popup */}
      {showWinner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 flex flex-col items-center gap-4">
            <span className="text-3xl font-extrabold text-gray-800">{showWinner}</span>
            <button
              className="mt-2 px-4 py-2 rounded-lg bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition-all"
              onClick={() => setShowWinner(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* New Game Warning Popup */}
      {showNewGameWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 flex flex-col items-center gap-4">
            <span className="text-xl font-bold text-gray-800">Start a new game?</span>
            <span className="text-gray-600 text-sm">This will reset the board and scoreboard.</span>
            <div className="flex gap-4 mt-2">
              <button
                className="px-4 py-2 rounded-lg bg-green-500 text-white font-bold shadow hover:bg-green-600 transition-all"
                onClick={confirmNewGame}
              >
                Yes, New Game
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 font-bold shadow hover:bg-gray-400 transition-all"
                onClick={() => setShowNewGameWarning(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Board and turn indicator */}
      <div className="flex flex-col items-center gap-4">
        {/* Top bar: X O icons, turn indicator */}
        <div className="flex items-center justify-center gap-4 w-full mb-2">
          <div className="flex items-center gap-2">
          </div>
          <div className="flex-1 flex justify-center">
            <span className={`px-3 py-1 rounded-lg font-bold text-sm tracking-wide bg-zinc-800 text-white shadow ${xIsNext ? 'border-cyan-300 border-2' : 'border-yellow-400 border-2'}`}>{xIsNext ? <span className="text-cyan-300">X</span> : <span className="text-yellow-400">O</span>} TURN</span>
          </div>
        </div>
        {/* Board */}
        <div className="grid grid-cols-3 gap-3 bg-zinc-800 p-4 rounded-2xl shadow-2xl border-2 border-zinc-700">
          {squares.map((value, i) => (
            <button
              key={i}
              className={`w-16 h-16 text-3xl font-extrabold rounded-xl border-2 border-zinc-700 bg-zinc-900 hover:bg-zinc-700 transition-all flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-300/60 ${value === "X" ? "text-cyan-300" : value === "O" ? "text-yellow-400" : "text-zinc-500"}`}
              onClick={() => handleClick(i)}
              aria-label={`Square ${i + 1}`}
              disabled={!!winner || !!value}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      {/* Scoreboard and controls */}
      <div className="flex flex-col items-center gap-4 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl px-6 py-8 min-w-[160px]">
        <h2 className="text-lg font-extrabold mb-2 text-white tracking-wide">Scoreboard</h2>
        <div className="flex flex-col gap-3 text-base w-full">
          <div className="flex items-center justify-between w-full bg-cyan-300/90 rounded-lg px-3 py-2">
            <span className="text-xs font-bold text-zinc-800">X</span>
            <span className="font-extrabold text-zinc-900">{score.X}</span>
          </div>
          <div className="flex items-center justify-between w-full bg-zinc-400/80 rounded-lg px-3 py-2">
            <span className="text-xs font-bold text-zinc-800">TIES</span>
            <span className="font-extrabold text-zinc-900">{score.Draw}</span>
          </div>
          <div className="flex items-center justify-between w-full bg-yellow-400/90 rounded-lg px-3 py-2">
            <span className="text-xs font-bold text-zinc-800">O</span>
            <span className="font-extrabold text-zinc-900">{score.O}</span>
          </div>
        </div>
        <button
          className="w-full mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold shadow-lg hover:from-pink-500 hover:to-blue-500 transition-all text-base tracking-wide border border-zinc-700"
          onClick={handleReset}
        >
          🔄 Reset Game
        </button>
        <button
          className="w-full mt-2 px-4 py-2 rounded-lg bg-green-500 text-white font-bold shadow-lg hover:bg-green-600 transition-all text-base tracking-wide border border-zinc-700"
          onClick={handleNewGame}
        >
          🆕 New Game
        </button>
      </div>
    </div>
  );
}
