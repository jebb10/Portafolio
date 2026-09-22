import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-basalt-950 text-white p-4 text-center">
      <div className="h-12 w-12 rounded-xl bg-basalt-900 border border-basalt-800 flex items-center justify-center font-mono text-obsidian-accent mb-4 shadow-subtle">
        <Terminal className="w-6 h-6" />
      </div>
      <h1 className="text-3xl font-bold font-mono text-white mb-2">404: Node Not Found</h1>
      <p className="text-xs sm:text-sm text-basalt-400 max-w-md mb-6 leading-relaxed">
        La coordenada epistémica solicitada no existe dentro del Knowledge Graph del Portafolio.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-basalt-850 hover:bg-basalt-800 border border-basalt-700 text-xs font-mono text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-obsidian-accent" />
        <span>Retornar al Workspace</span>
      </Link>
    </div>
  );
}
