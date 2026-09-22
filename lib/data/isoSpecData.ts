import { EarsRequirement } from "@/types";

export const EARS_REQUIREMENTS: EarsRequirement[] = [
  {
    id: "REQ_ISO_001",
    type: "ubiquitous",
    statement: "The system shall render an interactive 2D Knowledge Graph representing the multidisciplinary relationships between philosophy, software engineering, and autonomous agents.",
    rationale: "Proveer una representación ontológica visual inmediata del capital de conocimiento acumulado.",
    verification: "Test de renderizado en Canvas a 60 FPS con 100% de los nodos de la bóveda mapeados.",
  },
  {
    id: "REQ_ISO_002",
    type: "event-driven",
    statement: "WHEN the user clicks on any node in the Knowledge Graph, the system shall open the split-view Obsidian drawer within 150 milliseconds displaying the atomic note and callouts.",
    rationale: "Acceso contextual de lectura sin perder el marco espacial del grafo.",
    verification: "Medición de latencia de apertura del drawer en navegador (<150ms).",
  },
  {
    id: "REQ_ISO_003",
    type: "event-driven",
    statement: "WHEN the user clicks on any internal [[Wikilink]] inside the Markdown reader, the system shall smoothly transition focus to the target node in the graph and update the reader content.",
    rationale: "Navegación hipertextual idéntica al grafo nativo de Obsidian.",
    verification: "Test de resolución de enlaces bidireccionales y centrado de coordenadas Canvas.",
  },
  {
    id: "REQ_ISO_004",
    type: "state-driven",
    statement: "WHILE the user is interacting with the terminal command bar, the system shall provide instant one-click copying of the command string with visual confirmation.",
    rationale: "Facilidad de interacción para desarrolladores y reclutadores técnicos que deseen clonar el repositorio.",
    verification: "Test de evento Clipboard API con feedback de estado 'Copied!'.",
  },
  {
    id: "REQ_ISO_005",
    type: "ubiquitous",
    statement: "The system shall display the Human-In-The-Loop (HITL) governance matrix evaluating operational decisions under EU AI Act Article 14 and NIST AI RMF.",
    rationale: "Demostrar solvencia regulatoria formal en el diseño de agentes autónomos.",
    verification: "Inspección de las 6 capas de control y modos MAY ACT, MUST ASK, MUST NEVER.",
  },
  {
    id: "REQ_ISO_006",
    type: "unwanted-behavior",
    statement: "IF an unmapped wikilink or invalid node ID is accessed, THEN the system shall display an epistemic notice indicating the target note is in drafting phase without breaking the application.",
    rationale: "Resiliencia ante estados no encontrados y consistencia del grafo.",
    verification: "Test de frontera pasando enlaces inexistentes y verificando el fallback amigable.",
  },
];
