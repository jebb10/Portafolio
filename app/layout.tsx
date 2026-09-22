import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Johan Benítez | Portafolio — Arquitectura, Filosofía & Agentic AI",
  description: "Portafolio de Johan Benítez (jebb10): Filosofía, Ingeniería de Software y Agentes Autónomos. Arquitectura de conocimiento Herdr x Obsidian.",
  keywords: [
    "Johan Benítez",
    "jebb10",
    "Portafolio",
    "Agentic AI",
    "Obsidian",
    "Herdr",
    "Knowledge Graph",
    "BABOK",
    "ISO 29148",
    "Software Architecture",
  ],
  authors: [{ name: "Johan Benítez", url: "https://github.com/jebb10" }],
  openGraph: {
    title: "Johan Benítez | Portafolio",
    description: "Filosofía como modo de apreciación e Ingeniería como modo de interacción.",
    url: "https://ataraxia-system.vercel.app",
    siteName: "Portafolio Johan Benítez",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-basalt-950 text-basalt-100 min-h-screen selection:bg-obsidian-glow selection:text-white">
        {children}
      </body>
    </html>
  );
}
