import { TicTacToeBoard } from "../components/TicTacToeBoard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-foreground p-0">
      <header className="w-full py-8 flex flex-col items-center bg-gradient-to-r from-primary/20 to-secondary/20 shadow-lg">
        <h1 className="text-5xl font-extrabold mb-2 text-white tracking-tight drop-shadow-xl">Tic Tac Toe</h1>
        <p className="text-lg text-gray-300 font-medium">Demo</p>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="border rounded-2xl p-8 bg-card/80 shadow-2xl mt-8">
          <TicTacToeBoard />
        </div>
      </main>
      <footer className="py-6 text-xs text-gray-400 text-center border-t border-zinc-800 bg-black/60">
        Powered by <span className="font-semibold text-primary"></span>
        <span className="font-semibold text-blue-400">Next.js</span>,
        <span className="font-semibold text-blue-400">React 19</span>,
        <span className="font-semibold text-blue-400">Tailwind CSS</span>,
        and <span className="font-semibold text-blue-400">shadcn/ui</span>
      </footer>
    </div>
  );
}
// ...existing code...
