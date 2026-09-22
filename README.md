# Portafolio — Johan Benítez (`jebb10`)

> *"Filosofía como modo de apreciación e Ingeniería como modo de interacción."*

[![Production Vercel](https://img.shields.io/badge/Vercel-Live%20Production-black?style=flat&logo=vercel)](https://portafolio-seven-indol-36.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-jebb10%2FPortafolio-181717?style=flat&logo=github)](https://github.com/jebb10/Portafolio)
[![EU AI Act Art. 14](https://img.shields.io/badge/Governance-EU%20AI%20Act%20Art.%2014-purple?style=flat)](https://portafolio-seven-indol-36.vercel.app)

- **URL de Producción Oficial:** [https://portafolio-seven-indol-36.vercel.app](https://portafolio-seven-indol-36.vercel.app)
- **Repositorio Oficial:** [https://github.com/jebb10/Portafolio](https://github.com/jebb10/Portafolio)

Plataforma interactiva de producción que materializa el ecosistema de conocimiento, arquitectura de software y gobernanza de agentes de **Johan Esteban Benítez Bermúdez**. Desarrollado fusionando la ergonomía de consola de [Herdr](https://herdr.dev/) con el modelo de pensamiento en grafo de [Obsidian](https://obsidian.md/).

---

## 1. Visión General & Arquitectura

El proyecto está diseñado bajo una arquitectura modular de 3 paneles multiplexados:

```
┌────────────────────────────────────────────────────────────────────────┐
│ Header Multiplexer: Telemetría Herdr (HERDR_ENV=1) + Command Bar ($)    │
├──────────────┬──────────────────────────────────────────┬──────────────┤
│ Sidebar:     │ Central Workspace Canvas:                │ Split View:  │
│ - Spaces 001 │ - Knowledge Graph Canvas (60 FPS D3)     │ Inspector    │
│ - Agents     │ - Casos de Estudio (Tríada Metodológica) │ Obsidian     │
│ - Telemetría │ - Simulador HITL (EU AI Act Art. 14)     │ [[Wikilinks]]│
│   en vivo    │ - Visor ISO 29148 & BABOK v3 EARS        │ & Callouts   │
└──────────────┴──────────────────────────────────────────┴──────────────┘
```

1. **Header Multiplexer:** Telemetría en tiempo real de sesión, breadcrumbs y barra de copiado de comando técnico.
2. **Herdr Workspaces & Agents Sidebar:** Selector de espacios de la bóveda (`001.1` al `001.4`) y monitoreo de estados de agentes (`working`, `idle`, `mature`).
3. **Knowledge Graph Canvas (60 FPS):** Renderizado en Canvas 2D con física de fuerzas interactiva, filtrado por categorías, drag/pan/zoom y detección de hover.
4. **Obsidian Inspector Drawer (Split View):** Visor retráctil lateral con soporte de Callouts (`> [!NOTE]`, `> [!IMPORTANT]`, `> [!CAUTION]`, `> [!TIP]`) y enlaces bidireccionales interactivos `[[...]]`.
5. **Casos de Estudio en Tríada:** Proyectos evaluados bajo los 3 lentes: Filosófico/Ontológico, Negocio (BABOK v3) y Técnico (Software Engineering).
6. **Simulador de Gobernanza HITL:** 6 capas de control operacional según el Artículo 14 del EU AI Act y NIST AI RMF (`MAY ACT`, `MUST ASK`, `MUST NEVER`).

---

## 2. Stack de Desarrollo

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Framework** | Next.js 14+ (App Router) | Server Components (RSC) y renderizado estático/dinámico optimizado |
| **Lenguaje** | TypeScript 5 (Strict Mode) | Tipado estricto sin `any`, contratos de dominio validados |
| **Estilos** | Tailwind CSS v3 | Tokens semánticos Ink-Basalt (`#09090b`), acentos Obsidian (`#a88bfa`) |
| **Iconografía** | Lucide React | Iconografía vectorial consistente (sin emojis como iconos de UI) |
| **Test Runner** | Vitest 2 | Pruebas unitarias de integridad de datos y lógica de dominio |
| **Linter & Formato** | ESLint 8 (`next/core-web-vitals`) | Control de calidad de código y mejores prácticas |
| **Diseño & Craft** | Impeccable Design System | Eliminación determinista de AI-slop y jerarquía tipográfica estricta |
| **CI/CD** | GitHub Actions | Pipeline automatizado de linting, typechecking, tests y build |

---

## 3. Comandos de Desarrollo

```bash
# Clonar repositorio oficial
git clone https://github.com/jebb10/Portafolio.git
cd portafolio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo local
npm run dev

# Ejecutar verificación de tipos TypeScript
npm run type-check

# Ejecutar linter
npm run lint

# Ejecutar suite de pruebas unitarias
npm test

# Ejecutar pruebas en modo observador
npm run test:watch

# Compilar build de producción optimizado
npm run build

# Iniciar servidor de producción local
npm start
```

---

## 4. Integración con el Entorno Herdr (`HERDR_ENV=1`)

El proyecto está configurado para operar dentro del multiplexor de terminales **Herdr**:

```bash
# Dividir panel sin robar el foco del usuario
herdr pane split --current --direction right --cwd "$PWD" --no-focus

# Iniciar un agente especialista
herdr agent start tester --kind agy --pane <pane-id>

# Despachar prompt con espera sincronizada
herdr agent prompt tester "npm test" --wait --timeout 120000
```

---

## 5. Trazabilidad con la Bóveda de Obsidian

El código fuente del Portafolio mantiene sincronización ontológica bidireccional con la bóveda de conocimiento personal de Johan Benítez:

- **Ruta de la Bóveda:** `G:\Mi unidad\Fuente de Conocimiento\Obsidian\001 - Proyectos\001.4 - Portafolio Johan Benitez`
- **Especificación Formal ISO 29148:** `SRS_Portafolio_Johan_Benitez_ISO29148.md`
- **Historias de Usuario BABOK en 11 Secciones:** `Backlog_Historias_Usuario_BABOK.md`
- **Documento Maestro:** `00-Documento-Maestro-Consolidado-Portafolio-Johan-Benitez.md`

---

## 6. Licencia

Desarrollado por [Johan Benítez (jebb10)](https://github.com/jebb10).
Distribuido bajo la licencia MIT.
