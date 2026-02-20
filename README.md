# LEVER Lesson & Materials Generator

**Teacher-only planning tool.** One prompt in → complete LEVER-driven instructional plan + full student materials packet.

---

## What It Does

Teachers provide:
- Grade band, topic/standard, discipline
- Timeframe (1 class → 3 weeks)
- Student readiness level
- Classroom constraints
- Optional artifact type

The engine outputs:

**A) Teacher Plan**
- Standard/topic unpacking (concepts, misconceptions, prerequisites, success evidence)
- Full LEVER learning arc (Leverage → Environment → Velocity → Execution → Repetition)
- Week 1 minimum viable learning experience
- Facilitation moves: questions, talk moves, mini-conferences, small-group prompts
- Differentiation pathways (novice / intermediate / advanced)
- Micro-lessons targeting specific misconceptions (5–8 min)

**B) Student Materials Packet**
- Quick Readers at 3 levels (accessible / grade-level / stretch) with vocab supports and thinking prompts
- Research pack (keyword searches, source guidance, credibility checklist, note-catcher, synthesis organizer)
- Thinking & journaling tools (sensemaking maps, hypothesis builders, systems maps, evidence logs, reflections)
- Writing integration tasks (constructed response, argument from evidence, narrative reflection)
- Activity protocols (adapted for the specific topic)
- Artifact plan with specifications and evidence requirements

---

## The LEVER Framework

LEVER is **fractal** — it operates at unit, lesson, and micro-activity scale:

| Letter | Phase | What It Does |
|--------|-------|-------------|
| **L** | Leverage | Find high-impact variables and moves |
| **E** | Environment | Context shapes behavior and learning |
| **V** | Velocity | Movement creates clarity; short feedback loops |
| **E** | Execution | Output is a learning technology |
| **R** | Repetition | Learning compounds through reuse |

---

## Non-Negotiables (Hard Constraints)

- **No student data** collected. No logins for students. No surveillance.
- **No deficit framing.** Asset-based language only.
- **No worksheetification.** Thinking tools demand reasoning, not recall.
- **No poster projects.** Artifacts must demonstrate reasoning and evidence.
- **No fake partners.** No "present to the community" without teacher-specified context.
- **AI deepens thinking** — never replaces student cognition.
- **Bias/coloniality checks** embedded in content generation.

---

## Setup

### Prerequisites
- Node.js 18+
- Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com))

### Install

```bash
npm install
```

### Configure

```bash
cp .env.local.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY
```

### Run

```bash
npm run dev
# Open http://localhost:3000
```

---

## Architecture

```
src/
├── app/
│   ├── api/generate/route.ts    # Streaming API route (Claude Opus 4.6)
│   ├── page.tsx                 # Main app shell + state machine
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── TeacherInputForm.tsx     # Input form with preference loading
│   ├── TeacherPlanView.tsx      # Plan display (LEVER arc, unpacking, moves)
│   ├── StudentPacketView.tsx    # Tabbed packet (readers, research, tools, writing...)
│   ├── FeedbackBar.tsx          # Export + feedback + save-as-template
│   └── GenerationProgress.tsx  # Animated generation progress
├── lib/
│   ├── lever-kernel.ts          # LEVER orchestration kernel + prompt builder
│   ├── preferences.ts           # Teacher preference memory (localStorage)
│   └── export.ts                # Text/JSON export functions
└── types/
    └── index.ts                 # Full TypeScript type definitions
```

### Claude API Usage
- **Model:** `claude-opus-4-6`
- **Mode:** Streaming with adaptive thinking (`thinking: { type: "adaptive" }`)
- **Effort:** High (`output_config: { effort: "high" }`)
- **Max tokens:** 16,000

---

## Teacher Preference Memory (Phase 2)

Opt-in, teacher-only, stored in `localStorage`. No server-side storage, no student data:
- Default grade band, timeframe, readiness level
- Saved classroom constraints
- Feedback history (👍/👎 + tags)
- Saved templates ("I like this — save it")

---

## Exports

All exports are client-side (no server upload):
- **Teacher Plan** — plain text document
- **Student Packet** — plain text document
- **Full JSON** — complete generation output (for template reuse)

---

## MVP Roadmap

**Phase 1 (current):** One prompt → full Week 1 plan + student packet with 3 reading levels, research pack, journaling tools, writing tasks, protocols, and artifact plan. Exports included. Teacher preference memory active.

**Phase 2:** Protocol library upload (teacher-defined protocols), voice input, enhanced template management.

**Phase 3:** Collaborative template sharing (opt-in), Google Drive integration, deeper personalization from feedback history.
