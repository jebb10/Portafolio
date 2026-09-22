import { KnowledgeNode, KnowledgeLink } from "@/types";

export const GRAPH_NODES: KnowledgeNode[] = [
  {
    id: "johan-benitez",
    label: "Johan Benítez (jebb10)",
    group: "core",
    category: "Identity & Vision",
    summary: "Licenciado en Filosofía (UNAD) e Ingeniero de Sistemas (UniMinuto) con Certificación Oracle Agentic AI. Constructor de agentes autónomos y arquitecturas de conocimiento.",
    tags: ["Philosophy", "Software Engineering", "Agentic AI", "Ontology"],
    contentMarkdown: `# Johan Esteban Benítez Bermúdez

> [!NOTE]
> *"Filosofía como modo de apreciación e Ingeniería como modo de interacción."*

### Trayectoria Multidisciplinar
- **Licenciatura en Filosofía (UNAD):** Rigor epistémico, análisis ontológico, ética formal y fundamentación crítica.
- **Ingeniería de Sistemas (UniMinuto):** Arquitectura de software, patrones de diseño empresarial, modelado formal y gobernanza.
- **Técnico en Programación de Software (SENA):** Artesanía del código, construcción pragmática y solvencia técnica.
- **Oracle Certified Agentic AI:** Orquestación multi-agente, bucles evaluator-optimizer, memoria distribuida y supervisión HITL.

### Enlaces Ontológicos
- [[ataraxia-system]]
- [[triada-johan]]
- [[llm-wiki-jb]]
- [[babok-v3]]
- [[iso-29148]]`,
  },
  {
    id: "ataraxia-system",
    label: "Ataraxia System",
    group: "core",
    category: "Master Architecture",
    summary: "Marco conceptual y operacional que integra la ontología filosófica con sistemas de agentes autónomos y arquitecturas limpias.",
    tags: ["Core", "Ontology", "Agentic Framework", "DDD"],
    contentMarkdown: `# Ataraxia System (v2.1)

> [!IMPORTANT]
> Ataraxia representa el estado de serenidad imperturbable derivado del orden epistémico y la solvencia técnica. No es la ausencia de fricción, sino el gobierno riguroso sobre la complejidad algorítmica.

### Pilares Fundamentales
1. **Pilar 1: Obsidian & LLM WIKI JB:** Contexto cognitivo, Zettelkasten y topología de carpetas numeradas sin islas huérfanas.
2. **Pilar 2: GitHub (jebb10):** Código versionado, Conventional Commits y automatización de entrega.
3. **Pilar 3: Backend & Persistencia:** Supabase PostgreSQL, RLS determinista y Clean Architecture DDD.
4. **Pilar 4: Frontend & Despliegue:** Vercel Edge Runtime, Tailwind CSS tokenizado y filosofía Impeccable.

### Enlaces Ontológicos
- [[johan-benitez]]
- [[herdr-runtime]]
- [[hitl-governance]]`,
  },
  {
    id: "triada-johan",
    label: "Tríada Metodológica",
    group: "core",
    category: "Evaluation Framework",
    summary: "Lente de análisis en 3 dimensiones: Dimensión Filosófica (Ontología), Dimensión de Negocio (BABOK v3) y Dimensión Técnica (Ingeniería de Software).",
    tags: ["Methodology", "Philosophy", "Business", "Engineering"],
    contentMarkdown: `# La Tríada Metodológica de Johan Benítez

Un enfoque de descomposición de problemas complejos donde ninguna solución técnica se concibe sin propósito de negocio ni coherencia conceptual:

1. **Dimensión Filosófica (Ontológica):** ¿Qué es lo que verdaderamente existe en este dominio? ¿Cuáles son los axiomas de verdad, las relaciones invariantes y la ética de delegación?
2. **Dimensión de Negocio (BABOK v3):** ¿Cuál es el caso de negocio medible? Análisis BACCM (Context, Need, Solution, Stakeholder, Value, Change) e impacto en ROI.
3. **Dimensión Técnica (Ingeniería):** ¿Cómo se garantiza la mantenibilidad a 10 años? Clean Architecture, esquemas Zod en runtime, RFC 7807 y latencia sub-100ms.

### Enlaces Ontológicos
- [[johan-benitez]]
- [[case-llm-wiki]]
- [[case-gas-hub]]`,
  },
  {
    id: "herdr-runtime",
    label: "Herdr Multiplexer Runtime",
    group: "agents",
    category: "Agent Orchestration",
    summary: "Entorno de orquestación de terminales y agentes hermanos (HERDR_ENV=1) con división dinámica de paneles y monitoreo Herdr Radar.",
    tags: ["Herdr", "Terminal TUI", "Multi-Agent", "Radar"],
    contentMarkdown: `# Herdr Runtime Orchestration

> [!NOTE]
> Herdr proporciona un multiplexor de terminales diseñado expresamente para agentes de codificación autónomos, permitiendo división de paneles sin robo de foco (\`--no-focus\`) y despacho concurrente de tareas.

### Directivas Operativas
\`\`\`bash
# División de panel en Herdr
herdr pane split --current --direction right --cwd "$PWD" --no-focus

# Despacho con espera sincronizada
herdr agent prompt worker-1 "Validar contratos TypeScript" --wait --timeout 180000
\`\`\`

### Enlaces Ontológicos
- [[ataraxia-system]]
- [[agent-johan]]
- [[agentadk]]`,
  },
  {
    id: "agent-johan",
    label: "johan-personal-agent",
    group: "agents",
    category: "Autonomous Agent",
    summary: "Copiloto auto-incremental en Obsidian y terminales Herdr para captura de conocimiento y trazabilidad en tiempo real.",
    tags: ["Agentic AI", "Antigravity", "Zettelkasten Copilot"],
    contentMarkdown: `# johan-personal-agent

Agente autónomo residente con acceso a la bóveda de Obsidian mediante el servidor MCP \`obsidian-vault\` y al perfil GitHub \`jebb10\`.

### Capacidades
- Inspección de topología de carpetas numeradas (\`000\` a \`008\`).
- Creación de notas atómicas con enlaces bidireccionales automáticos.
- Verificación de grafos para evitar islas huérfanas.`,
  },
  {
    id: "agentadk",
    label: "AgentADK (MCP Suite)",
    group: "agents",
    category: "Agent Tooling",
    summary: "Conjunto de herramientas de integración MCP para Python y Claude Code con validación rigurosa de contratos y testing en Pytest.",
    tags: ["MCP", "Python", "Tooling", "GitHub"],
    contentMarkdown: `# AgentADK (MCP Suite)

Repositorio: \`jebb10/AgentADK\`

Arquitectura de servidores MCP para delegación segura de herramientas hacia modelos de lenguaje avanzados. Implementa rate-limiting estricto y tipado con Pydantic.`,
  },
  {
    id: "tablero-realtime",
    label: "Tablero Realtime",
    group: "agents",
    category: "Web & Sockets",
    summary: "Tablero colaborativo multi-usuario sincronizado en tiempo real sobre PostgreSQL y Supabase Realtime Channels.",
    tags: ["Supabase", "WebSocket", "Realtime", "TypeScript"],
    contentMarkdown: `# Tablero Realtime

Repositorio: \`jebb10/Tablero\`

Sistema reactivo de gestión visual de estados con resolución de conflictos de concurrencia optimista y políticas RLS granulares por organización.`,
  },
  {
    id: "gas-data-hub",
    label: "Google Apps Script Data Hub",
    group: "spaces",
    category: "Enterprise Automation",
    summary: "Hub empresarial que procesa más de 500 transmisiones documentales diarias sin entrada manual de datos y con validación criptográfica.",
    tags: ["Automation", "ETL", "Enterprise", "Zero Manual Entry"],
    contentMarkdown: `# Google Apps Script Enterprise Data Hub

Solución corporativa que eliminó el 100% de la digitación manual en la gestión de transmisiones documentales de ingeniería.

### Impacto Operativo
- **Volumen:** +500 transmittals procesados diariamente.
- **Tasa de error:** Reducción del 99.4% en inconsistencias de metadatos.
- **Trazabilidad:** Integración continua con Google Cloud Storage y Webhooks.`,
  },
  {
    id: "llm-wiki-jb",
    label: "LLM WIKI JB (001.3)",
    group: "spaces",
    category: "Knowledge Base",
    summary: "Bóveda de conocimiento estructurado en Markdown con subagentes especializados (.claude/agents) y gobernanza ontológica formal.",
    tags: ["Obsidian", "Markdown", "Ontology", "SPEC"],
    contentMarkdown: `# LLM WIKI JB (Espacio 001.3)

Gobernanza ontológica y base de conocimiento vivo para la interoperabilidad multi-modelo. Contiene las especificaciones formales de los bloques 0, 1 y 2.`,
  },
  {
    id: "portafolio",
    label: "Portafolio Johan Benítez (001.4)",
    group: "spaces",
    category: "Active Production Surface",
    summary: "Superficie activa de producción que fusiona la consola Herdr con el Knowledge Graph Canvas y el visor de notas Obsidian.",
    tags: ["Portafolio", "Next.js 14", "App Router", "Canvas 60 FPS", "EARS", "BABOK"],
    contentMarkdown: `# Portafolio Johan Benítez (Espacio 001.4)

> [!NOTE]
> *"Filosofía como modo de apreciación e Ingeniería como modo de interacción."*

### Arquitectura de la Plataforma
- **Consola Multiplexor (Herdr):** Barra de telemetría de agentes, terminal y selección de espacios de trabajo.
- **Knowledge Graph Canvas:** Renderizado 2D en HTML5 Canvas con física interactiva a 60 FPS.
- **Inspector Obsidian (Split View):** Lector de notas Markdown con resolución de [[Wikilinks]] y callouts semánticos.
- **Gobernanza HITL:** Matriz de 6 capas conforme al EU AI Act (Art. 14) y NIST AI RMF.
- **Especificación Formal:** Requerimientos EARS e Historias de Usuario BABOK en 11 secciones.

### Enlaces Ontológicos
- [[johan-benitez]]
- [[triada-johan]]
- [[herdr-runtime]]
- [[hitl-governance]]
- [[iso-29148]]
- [[babok-v3]]`,
  },
  {
    id: "hitl-governance",
    label: "Gobernanza HITL & EU AI Act",
    group: "governance",
    category: "AI Safety & Ethics",
    summary: "Matriz de 6 capas de supervisión humana (Human-In-The-Loop) alineada con el Artículo 14 del Reglamento Europeo de IA (EU AI Act) y NIST AI RMF.",
    tags: ["EU AI Act", "NIST AI RMF", "HITL", "Ethics"],
    contentMarkdown: `# Matriz de Gobernanza HITL (EU AI Act Art. 14)

> [!CAUTION]
> Los sistemas autónomos que interactúan con infraestructura o datos de producción deben operar bajo barreras criptográficas y de consentimiento verificables.

### Modos Operacionales
1. **MAY ACT:** Operaciones de lectura, generación de borradores, pruebas locales y análisis estático.
2. **MUST ASK:** Modificación de esquemas de base de datos, despliegues a producción y commits en ramas maestras.
3. **MUST NEVER:** Eliminación de datos sin respaldo, evasión de políticas RLS o ejecución de código arbitrario sin sandbox.`,
  },
  {
    id: "evaluator-optimizer",
    label: "Bucle Evaluator-Optimizer",
    group: "governance",
    category: "Oracle Architecture",
    summary: "Patrón de auto-crítica y refinamiento iterativo donde un agente auditor contrasta la salida del generador contra criterios Gherkin y contratos Zod.",
    tags: ["Oracle Agentic", "Self-Correction", "Reflection", "Quality"],
    contentMarkdown: `# Evaluator-Optimizer Loop

Patrón arquitectónico donde el código generado no es aceptado hasta superar la evaluación estricta de un agente o test runner independiente:

\`\`\`
[ Generador (Coder) ] ──> [ Diff / Código ] ──> [ Evaluador (Auditor) ]
         ▲                                                │
         └───────────── [ Feedback de Errores ] ──────────┘
\`\`\``,
  },
  {
    id: "babok-v3",
    label: "BABOK v3 (Análisis de Negocio)",
    group: "standards",
    category: "Business Standard",
    summary: "Guía del cuerpo de conocimiento de análisis de negocio (IIBA), aplicada a la especificación de Historias de Usuario en 11 secciones.",
    tags: ["BABOK v3", "IIBA", "BACCM", "Requirements"],
    contentMarkdown: `# Estándar BABOK v3

Estructura formal de captura de valor de negocio mediante las 11 secciones:
1. Metadatos & Trazabilidad
2. Declaración Mike Cohn
3. Criterios de Aceptación Gherkin
4. Requerimientos FURPS+
5. Contratos de Datos y Esquemas Zod
6. Diagramas Mermaid
7. Reglas de Negocio
8. Interfaz y Experiencia UX/UI
9. Dependencias Técnicas
10. Matriz de Riesgos
11. Definition of Done (DoD)`,
  },
  {
    id: "iso-29148",
    label: "ISO/IEC/IEEE 29148:2018",
    group: "standards",
    category: "Software Specification",
    summary: "Estándar internacional para la ingeniería de requerimientos de software con sintaxis formal EARS (Easy Approach to Requirements Syntax).",
    tags: ["ISO 29148", "EARS", "SRS", "Verification"],
    contentMarkdown: `# ISO/IEC/IEEE 29148:2018

Estándar para la especificación formal de requerimientos de software (SRS). Utiliza sintaxis EARS:
- **Ubiquitous:** \`The system shall <action>\`
- **Event-Driven:** \`WHEN <trigger>, the system shall <action>\`
- **State-Driven:** \`WHILE <condition>, the system shall <action>\`
- **Unwanted-Behavior:** \`IF <error condition>, THEN the system shall <action>\``,
  },
  {
    id: "clean-architecture",
    label: "Clean Architecture & DDD",
    group: "standards",
    category: "Software Engineering",
    summary: "Separación estricta de responsabilidades (Domain -> Application -> Infrastructure -> Presentation) con Value Objects inmutables y puertos/adaptadores.",
    tags: ["Clean Architecture", "DDD", "Hexagonal", "TypeScript"],
    contentMarkdown: `# Clean Architecture & Domain-Driven Design

Regla de dependencia inquebrantable: el código de dominio no depende de ningún framework, base de datos ni detalle de infraestructura.

- **Domain:** Entidades, Value Objects, Excepciones de Dominio.
- **Application:** Casos de Uso, Puertos (Interfaces).
- **Infrastructure:** Adaptadores Supabase, Clientes HTTP, APIs externas.
- **Presentation:** Server Components, Client Hooks, Controladores.`,
  },
];

export const GRAPH_LINKS: KnowledgeLink[] = [
  { source: "johan-benitez", target: "portafolio", label: "Superficie Activa" },
  { source: "johan-benitez", target: "ataraxia-system", label: "Proyecto 001.1" },
  { source: "johan-benitez", target: "triada-johan", label: "Lente Epistémico" },
  { source: "johan-benitez", target: "agent-johan", label: "Agente Personal" },
  { source: "portafolio", target: "herdr-runtime", label: "Consola Multiplexor" },
  { source: "portafolio", target: "hitl-governance", label: "Matriz Art. 14" },
  { source: "portafolio", target: "iso-29148", label: "Especificación SRS" },
  { source: "portafolio", target: "babok-v3", label: "Historias BABOK" },
  { source: "ataraxia-system", target: "herdr-runtime", label: "Runtime de Ejecución" },
  { source: "ataraxia-system", target: "hitl-governance", label: "Barrera Ética" },
  { source: "ataraxia-system", target: "clean-architecture", label: "Patrón de Diseño" },
  { source: "triada-johan", target: "babok-v3", label: "Dimensión Negocio" },
  { source: "triada-johan", target: "iso-29148", label: "Dimensión Requerimientos" },
  { source: "triada-johan", target: "clean-architecture", label: "Dimensión Técnica" },
  { source: "herdr-runtime", target: "agent-johan", label: "Orquesta" },
  { source: "herdr-runtime", target: "agentadk", label: "Despacha" },
  { source: "herdr-runtime", target: "tablero-realtime", label: "Sincroniza" },
  { source: "agent-johan", target: "llm-wiki-jb", label: "Indexa Bóveda" },
  { source: "gas-data-hub", target: "triada-johan", label: "Caso de Estudio" },
  { source: "hitl-governance", target: "evaluator-optimizer", label: "Bucle de Calidad" },
  { source: "iso-29148", target: "portafolio", label: "Especifica SRS" },
  { source: "babok-v3", target: "portafolio", label: "Gobierna Historias" },
];
