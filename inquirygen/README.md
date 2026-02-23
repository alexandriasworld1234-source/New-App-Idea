# InquiryGen

An AI-powered multi-modal generator that produces complete inquiry-based learning units with all supporting materials for teachers worldwide. Teachers provide a topic, grade level, location, and preferred inquiry model, and the app generates a full unit: student presentation, student activity pack, teacher's guide, and unit overview — all aligned to the teacher's local/national education standards.

**Philosophy: Pedagogy first. AI as accelerator. Never reverse that order.**

## What It Generates

Each generation produces 4 documents:

| Document | Purpose |
|----------|---------|
| **Unit Overview** | Driving question, objectives, vocabulary, timeline, standards alignment |
| **Student Presentation** | 9-12 inquiry-driven slides with speaker notes, discussion prompts, thinking routines |
| **Student Activity Pack** | Pre-assessment, rubric, phase-based activities, reflection, STEM challenge |
| **Teacher's Guide** | Standards unpacking, background content, slide-by-slide facilitation, answer key, differentiation |

## Inquiry Models

All models draw from world-class global inquiry traditions — not a single country's framework:

- **Kath Murdoch Inquiry Cycle** (IB / Australia) — Tuning In, Finding Out, Sorting Out, Going Further, Making Conclusions, Taking Action
- **Phenomenon-Based Learning** (Finland / NGSS) — Anchored in real-world phenomena, student-driven investigation
- **Design Thinking / LAUNCH Cycle** (Global / Stanford d.school) — Human-centered design process
- **5E Instructional Model** (BSCS / Global) — Engage, Explore, Explain, Elaborate, Evaluate

## Pedagogical Frameworks Informing Generation

The AI system prompt is informed by research and practice from:

- Finnish EDUFI (phenomenon-based multidisciplinary modules)
- IB PYP/MYP (Kath Murdoch cycle, transdisciplinary themes)
- British Columbia Know-Do-Understand model
- Ontario Growing Success assessment (FOR/AS/OF learning)
- NSW Australia Quality Teaching Framework (18 elements)
- EEF UK evidence-based strategies (metacognition, collaborative learning)
- Cambridge International Thinking & Working Scientifically
- Estonia competence-based curriculum
- OECD Learning Compass 2030
- UNESCO Futures of Education
- High Tech High liberatory PBL
- Harvard Project Zero thinking routines
- Design for Change (FIDS) — 71 countries

## Project Duration

Teachers choose how long the unit should run:

| Duration | Time | Depth |
|----------|------|-------|
| Mini-Inquiry | 1-2 days | Single concept, one investigation |
| Short Project | 3-5 days | Complete inquiry cycle |
| Standard Unit | 1-2 weeks | Multiple investigations, peer critique |
| Extended Project | 3-4 weeks | Iterative revision, community connections |
| Deep Dive | 6-8 weeks | Sustained cross-disciplinary inquiry |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js, React 19, TypeScript |
| Runtime | Bun |
| Database | Neon Postgres + Drizzle ORM |
| Auth | Clerk |
| Payments | Stripe (subscriptions + credit packs) |
| AI (Text) | Claude API (via Vercel AI SDK) |
| AI (Images) | OpenRouter (Gemini 2.5 Flash Image) |
| UI | Tailwind CSS v4 + shadcn/ui |
| Editor | TipTap |
| Export | pptxgenjs (PowerPoint), docx (Word) |

## Getting Started

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Fill in: DATABASE_URL, CLERK_*, ANTHROPIC_API_KEY, OPENROUTER_API_KEY, STRIPE_*

# Run database migrations
bun run db:push

# Seed standards and inquiry models
bun run db:seed

# Start development server
bun dev
```

## Project Structure

```
src/
├── app/
│   ├── (public)/           # Landing, pricing pages
│   ├── (auth)/             # Clerk sign-in/sign-up
│   ├── dashboard/
│   │   ├── generate/       # Generation wizard (5-step form)
│   │   ├── units/          # Saved units + editor
│   │   ├── credits/        # Balance, purchase, history
│   │   └── settings/       # Profile, defaults
│   └── api/
│       ├── generate/       # Generation endpoints
│       ├── export/         # .pptx and .docx download
│       └── webhooks/       # Stripe + Clerk webhooks
├── db/
│   ├── schema.ts           # Drizzle schema
│   └── index.ts            # DB client
└── lib/
    ├── ai/
    │   ├── providers.ts    # Claude + OpenRouter config
    │   ├── pipeline.ts     # Multi-step generation orchestrator
    │   └── prompts/        # System + document prompts
    ├── inquiry-models/     # Global inquiry framework engine
    ├── credits/            # Credit calculation + guard
    └── documents/          # .pptx and .docx builders
```

## Assessment Framework

Every generated unit embeds research-based assessment practices:

- **Assessment FOR Learning** (formative) — Exit tickets, observation checklists, diagnostic probes
- **Assessment AS Learning** (metacognition) — Self-assessment, peer critique, learning journals
- **Assessment OF Learning** (summative) — Performance tasks, portfolios, presentations
- **Metacognition Cycle** (EEF) — Planning, Monitoring, Evaluating (+8 months impact)
- **Quality Indicators** (NSW QTF) — Deep knowledge, higher-order thinking, substantive communication

## License

Private. All rights reserved.
