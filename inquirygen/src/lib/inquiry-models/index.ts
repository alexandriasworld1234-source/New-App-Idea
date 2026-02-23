// ============================================================================
// Global Inquiry-Based Learning Framework Engine
// ============================================================================
// Sources: Finnish EDUFI, IB (Kath Murdoch), BC Canada, Ontario, NSW Australia,
// EEF UK, Estonia, OECD Learning Compass 2030, UNESCO, High Tech High,
// Cambridge International, Rwanda REB, Malaysia MOE
//
// Philosophy: Pedagogy first. AI as accelerator. Never reverse that order.
// ============================================================================

// ============================================================================
// Types
// ============================================================================

export type InquiryPhase = {
  name: string;
  description: string;
  promptGuidance: string;
  suggestedProtocols: string[];
  assessmentCheckpoints: string[];
  order: number;
};

export type Protocol = {
  name: string;
  source: string;
  purpose: string;
  steps: string[];
  tags: {
    cognitiveLoad: "low" | "medium" | "high";
    ageBand: ("K-2" | "3-5" | "6-8" | "9-12")[];
    inquiryDepth: "confirmation" | "structured" | "guided" | "open";
    discipline: "any" | "science" | "math" | "ela" | "social_studies" | "arts" | "stem";
    phase: string[];
  };
};

export type ScaffoldingLevel = {
  level: string;
  description: string;
  teacherRole: string;
  studentRole: string;
};

export type AssessmentFramework = {
  formativeStrategies: string[];
  summativeStrategies: string[];
  assessmentPurposes: {
    forLearning: string[];
    asLearning: string[];
    ofLearning: string[];
  };
  qualityIndicators: string[];
  metacognitionCycle: string[];
};

export type ProjectDuration = {
  code: string;
  label: string;
  description: string;
  typicalDays: number;
  phaseDepth: "introductory" | "standard" | "extended" | "deep";
  assessmentCheckpoints: number;
  protocolComplexity: "simple" | "moderate" | "complex";
};

export type InquiryModelConfig = {
  code: string;
  name: string;
  origin: string;
  description: string;
  phases: InquiryPhase[];
  unitStructure: {
    slideCount: number;
    activitySections: string[];
    teacherGuideSections: string[];
  };
  scaffoldingProgression: ScaffoldingLevel[];
  assessmentFramework: AssessmentFramework;
  thinkingRoutines: string[];
  equityPractices: string[];
};

// ============================================================================
// Project Duration Options (Teacher-selectable)
// ============================================================================

export const PROJECT_DURATIONS: ProjectDuration[] = [
  {
    code: "mini",
    label: "Mini-Inquiry (1-2 days)",
    description:
      "A focused, single-concept inquiry. One investigation cycle with quick reflection. Ideal for introducing inquiry skills or addressing a specific standard.",
    typicalDays: 2,
    phaseDepth: "introductory",
    assessmentCheckpoints: 1,
    protocolComplexity: "simple",
  },
  {
    code: "short",
    label: "Short Project (3-5 days)",
    description:
      "A complete inquiry cycle with one investigation and structured reflection. Builds foundational inquiry habits while covering core content.",
    typicalDays: 5,
    phaseDepth: "standard",
    assessmentCheckpoints: 2,
    protocolComplexity: "simple",
  },
  {
    code: "standard",
    label: "Standard Unit (1-2 weeks)",
    description:
      "A full inquiry unit with multiple investigations, model revision, peer critique, and substantive assessment. The default for most classroom inquiry.",
    typicalDays: 10,
    phaseDepth: "standard",
    assessmentCheckpoints: 3,
    protocolComplexity: "moderate",
  },
  {
    code: "extended",
    label: "Extended Project (3-4 weeks)",
    description:
      "Deep inquiry with multiple investigation cycles, iterative revision, community connections, and authentic products. Allows for student-driven exploration.",
    typicalDays: 20,
    phaseDepth: "extended",
    assessmentCheckpoints: 5,
    protocolComplexity: "complex",
  },
  {
    code: "deep",
    label: "Full Unit (6-8 weeks)",
    description:
      "Comprehensive phenomenon-based or project-based unit with sustained inquiry, multiple disciplines, public product, and portfolio-based assessment. Mirrors Finnish multidisciplinary learning modules.",
    typicalDays: 35,
    phaseDepth: "deep",
    assessmentCheckpoints: 8,
    protocolComplexity: "complex",
  },
];

// ============================================================================
// Protocol Library (Tagged, Searchable)
// ============================================================================

export const PROTOCOL_LIBRARY: Protocol[] = [
  // --- Observation & Inquiry Launch ---
  {
    name: "See-Think-Wonder",
    source: "Harvard Project Zero",
    purpose:
      "Launch inquiry from careful observation. Separates what students SEE (facts) from what they THINK (interpretation) from what they WONDER (questions).",
    steps: [
      "Present stimulus (phenomenon, image, data, artifact). Students observe silently for 30-60 seconds.",
      "SEE: 'What do you see/observe?' — factual observations only, no interpretation",
      "THINK: 'What do you think is happening? Why?' — initial interpretations with reasoning",
      "WONDER: 'What does this make you wonder?' — questions that drive investigation",
    ],
    tags: {
      cognitiveLoad: "low",
      ageBand: ["K-2", "3-5", "6-8", "9-12"],
      inquiryDepth: "structured",
      discipline: "any",
      phase: ["engage", "tuning_in", "anchor_phenomenon", "look_listen_learn"],
    },
  },
  {
    name: "Think-Puzzle-Explore",
    source: "Harvard Project Zero",
    purpose:
      "Surface prior knowledge and generate investigation plans. More structured than See-Think-Wonder.",
    steps: [
      "THINK: 'What do you think you know about this topic?'",
      "PUZZLE: 'What questions or puzzles do you have?'",
      "EXPLORE: 'How could we explore these questions? What would you need to find out?'",
    ],
    tags: {
      cognitiveLoad: "medium",
      ageBand: ["3-5", "6-8", "9-12"],
      inquiryDepth: "guided",
      discipline: "any",
      phase: ["engage", "tuning_in", "initial_models", "ask_questions"],
    },
  },
  {
    name: "Chalk Talk",
    source: "National School Reform Faculty / CLEE",
    purpose:
      "Silent written discussion. Gives ALL students voice — especially introverts, multilingual learners, and those who need processing time.",
    steps: [
      "Write a provocative question or statement on large paper",
      "Students silently write responses, reactions, and questions around it",
      "Students read and respond to each other's comments, drawing lines between connected ideas",
      "After 10-15 minutes, facilitate verbal debrief of themes and patterns",
    ],
    tags: {
      cognitiveLoad: "low",
      ageBand: ["3-5", "6-8", "9-12"],
      inquiryDepth: "structured",
      discipline: "any",
      phase: ["engage", "tuning_in", "ask_questions", "sense_making"],
    },
  },
  // --- Investigation & Research ---
  {
    name: "Microlab Protocol",
    source: "National School Reform Faculty / CLEE",
    purpose:
      "Ensures equitable participation in small groups. Each person gets equal uninterrupted airtime.",
    steps: [
      "Groups of 3-4. Pose a focusing question.",
      "Person A speaks for 1-2 minutes while others listen without interrupting",
      "Person B speaks, then C, then D — same time each",
      "Open discussion: What themes emerged? What surprised us? (2-3 min)",
    ],
    tags: {
      cognitiveLoad: "low",
      ageBand: ["3-5", "6-8", "9-12"],
      inquiryDepth: "structured",
      discipline: "any",
      phase: ["explore", "finding_out", "investigation", "building_knowledge"],
    },
  },
  {
    name: "Jigsaw",
    source: "Aronson (1971) / Global education practice",
    purpose:
      "Divide research responsibilities across expert groups, then teach peers. Builds interdependence and communication skills.",
    steps: [
      "Divide content into 3-5 subtopics. Assign each student to an 'expert group' for one subtopic.",
      "Expert groups research their subtopic deeply (15-30 min)",
      "Students return to 'home groups' (one expert per subtopic in each group)",
      "Each expert teaches their subtopic to the home group",
      "Home group synthesizes all subtopics to build complete understanding",
    ],
    tags: {
      cognitiveLoad: "medium",
      ageBand: ["3-5", "6-8", "9-12"],
      inquiryDepth: "guided",
      discipline: "any",
      phase: ["explore", "finding_out", "building_knowledge", "investigation"],
    },
  },
  // --- Critique & Feedback ---
  {
    name: "Tuning Protocol",
    source: "Joseph McDonald / National School Reform Faculty",
    purpose:
      "Structured peer feedback with warm and cool rounds. Builds culture of constructive critique.",
    steps: [
      "Presenter shares work and focusing question (5 min)",
      "Clarifying questions — factual only, not leading (5 min)",
      "Warm feedback: 'What works well is...' 'I see strengths in...' (5 min)",
      "Cool feedback: 'A question I have is...' 'Have you considered...' (5 min)",
      "Presenter reflects on what they heard and next steps (5 min)",
    ],
    tags: {
      cognitiveLoad: "medium",
      ageBand: ["6-8", "9-12"],
      inquiryDepth: "guided",
      discipline: "any",
      phase: ["develop_critique", "sorting_out", "sense_making", "highlight_fix"],
    },
  },
  {
    name: "Gallery Walk with Feedback",
    source: "Global education practice",
    purpose:
      "Multiple projects get feedback simultaneously. Students practice giving specific, actionable feedback.",
    steps: [
      "Teams display work-in-progress at stations around the room",
      "Teams rotate to each station (3-5 min per station)",
      "At each station, write feedback using stems: 'I notice...', 'I wonder...', 'Have you considered...'",
      "Teams return to own station, read all feedback",
      "Teams discuss: Which feedback will we act on?",
    ],
    tags: {
      cognitiveLoad: "medium",
      ageBand: ["3-5", "6-8", "9-12"],
      inquiryDepth: "guided",
      discipline: "any",
      phase: ["develop_critique", "sorting_out", "highlight_fix", "elaborate"],
    },
  },
  {
    name: "I Like / I Wish / What If",
    source: "Stanford d.school",
    purpose:
      "Simple structured feedback for prototypes and drafts. Keeps feedback constructive.",
    steps: [
      "Presenter shows work (2 min)",
      "'I like...' — specific strengths (2 min)",
      "'I wish...' — specific changes desired (2 min)",
      "'What if...' — creative possibilities (2 min)",
      "Presenter reflects on what to change (1 min)",
    ],
    tags: {
      cognitiveLoad: "low",
      ageBand: ["K-2", "3-5", "6-8", "9-12"],
      inquiryDepth: "structured",
      discipline: "any",
      phase: ["develop_critique", "highlight_fix", "going_further"],
    },
  },
  // --- Sense-Making & Reflection ---
  {
    name: "Consultancy Protocol",
    source: "National School Reform Faculty / CLEE",
    purpose:
      "Exploring a dilemma or challenge. Presenter listens while colleagues discuss, gaining new perspectives.",
    steps: [
      "Presenter describes a dilemma and poses a focusing question (5-10 min)",
      "Clarifying questions (5 min)",
      "Probing questions — open-ended, thought-provoking (10 min)",
      "Participants discuss while presenter LISTENS and takes notes (15 min)",
      "Presenter responds: What resonated? What new thinking emerged? (5 min)",
    ],
    tags: {
      cognitiveLoad: "high",
      ageBand: ["6-8", "9-12"],
      inquiryDepth: "open",
      discipline: "any",
      phase: ["sense_making", "making_conclusions", "reflect"],
    },
  },
  {
    name: "Final Word Protocol",
    source: "National School Reform Faculty / CLEE",
    purpose:
      "Deep processing of text, data, or observations. Presenter gets the 'final word' after hearing all perspectives.",
    steps: [
      "Each person selects a passage, data point, or observation that struck them",
      "Presenter shares their selection and why (1-2 min)",
      "Each group member responds with their interpretation (1 min each)",
      "Presenter has the 'final word' — responds to what they heard (1-2 min)",
    ],
    tags: {
      cognitiveLoad: "medium",
      ageBand: ["6-8", "9-12"],
      inquiryDepth: "guided",
      discipline: "any",
      phase: ["explain", "sorting_out", "sense_making", "making_conclusions"],
    },
  },
  {
    name: "Success Analysis Protocol",
    source: "National School Reform Faculty / CLEE",
    purpose:
      "Structured reflection on what worked and why. Builds metacognitive awareness.",
    steps: [
      "What worked well? What am I proud of?",
      "What was challenging? What did I struggle with?",
      "What would I do differently next time?",
      "What did I learn about myself as a learner?",
    ],
    tags: {
      cognitiveLoad: "medium",
      ageBand: ["3-5", "6-8", "9-12"],
      inquiryDepth: "guided",
      discipline: "any",
      phase: ["evaluate", "reflect", "making_conclusions", "taking_action"],
    },
  },
  {
    name: "I Used to Think... Now I Think...",
    source: "Harvard Project Zero",
    purpose:
      "Metacognitive reflection on conceptual change. Makes invisible learning visible.",
    steps: [
      "Reflect on the topic/concept from the beginning of the unit",
      "Complete: 'I used to think...' (describe prior understanding)",
      "Complete: 'Now I think...' (describe current understanding)",
      "Explain: 'What changed my thinking was...' (identify pivotal moment)",
    ],
    tags: {
      cognitiveLoad: "medium",
      ageBand: ["3-5", "6-8", "9-12"],
      inquiryDepth: "guided",
      discipline: "any",
      phase: ["evaluate", "reflect", "making_conclusions"],
    },
  },
  // --- Discussion & Collaboration ---
  {
    name: "Fishbowl Discussion",
    source: "Global education practice",
    purpose:
      "Model quality discussion. Inner circle discusses while outer circle observes specific skills.",
    steps: [
      "Inner circle (4-6 students) sits in center with discussion topic",
      "Outer circle observes, noting specific skills (evidence use, building on ideas)",
      "Inner circle discusses (10-15 min)",
      "Debrief: Outer circle shares observations. Inner circle reflects.",
      "Optional: Rotate so outer members join inner circle",
    ],
    tags: {
      cognitiveLoad: "medium",
      ageBand: ["6-8", "9-12"],
      inquiryDepth: "guided",
      discipline: "any",
      phase: ["explain", "sense_making", "present", "making_conclusions"],
    },
  },
  {
    name: "World Café",
    source: "World Café Community Foundation",
    purpose:
      "Rotating small-group discussions building on collective intelligence. Each rotation deepens the conversation.",
    steps: [
      "Set up tables with different aspects of a question written on paper",
      "Small groups spend 5-7 minutes at each table discussing and writing ideas",
      "Groups rotate, reading previous groups' ideas and building on them",
      "After all rotations, each table summarizes the most promising ideas",
      "Full group reviews all summaries and identifies patterns",
    ],
    tags: {
      cognitiveLoad: "medium",
      ageBand: ["6-8", "9-12"],
      inquiryDepth: "guided",
      discipline: "any",
      phase: ["navigate_ideas", "going_further", "elaborate", "building_knowledge"],
    },
  },
  // --- Evidence-Based Reasoning ---
  {
    name: "Claim-Evidence-Reasoning (CER)",
    source: "Global science education framework",
    purpose:
      "Structured scientific argumentation. Connects claims to evidence through explicit reasoning.",
    steps: [
      "CLAIM: State what you think is true about the phenomenon",
      "EVIDENCE: Provide specific data/observations from investigations that support your claim",
      "REASONING: Explain WHY the evidence supports your claim — what scientific principle connects them?",
      "Optional REBUTTAL: Address alternative claims and explain why yours is stronger",
    ],
    tags: {
      cognitiveLoad: "high",
      ageBand: ["3-5", "6-8", "9-12"],
      inquiryDepth: "guided",
      discipline: "science",
      phase: ["explain", "sense_making", "making_conclusions", "evaluate"],
    },
  },
  // --- Design & Innovation ---
  {
    name: "FIDS Framework",
    source: "Design for Change (HundrED Hall of Fame)",
    purpose:
      "Student-led social change through empathy-driven design. Used in 71 countries, 30,000+ schools.",
    steps: [
      "FEEL: Develop empathy — identify a problem affecting your community, listen to those affected",
      "IMAGINE: Brainstorm creative solutions collaboratively, prioritize bold and scalable ideas",
      "DO: Implement your plan, reframe failure as prototyping, iterate based on feedback",
      "SHARE: Tell your story to inspire others — locally and globally",
    ],
    tags: {
      cognitiveLoad: "high",
      ageBand: ["3-5", "6-8", "9-12"],
      inquiryDepth: "open",
      discipline: "any",
      phase: ["taking_action", "create_prototype", "present", "elaborate"],
    },
  },
];

// ============================================================================
// Inquiry Model 1: Kath Murdoch Inquiry Cycle (IB PYP / Global)
// ============================================================================

export const KATH_MURDOCH_INQUIRY: InquiryModelConfig = {
  code: "kath_murdoch",
  name: "Inquiry Cycle (Kath Murdoch)",
  origin:
    "International Baccalaureate PYP — used globally across 5,600+ IB schools in 159 countries",
  description:
    "A non-linear, organic inquiry cycle: Tuning In → Finding Out → Sorting Out → Going Further → Making Conclusions → Taking Action. Explicitly NOT a rigid sequence — genuine inquiry is 'more like a web than a cycle.' Reflection occurs throughout all phases. Rooted in IB's Learner Profile (Inquirers, Knowledgeable, Thinkers, Communicators, Principled, Open-minded, Caring, Risk-takers, Balanced, Reflective).",
  phases: [
    {
      name: "Tuning In",
      description:
        "Activate curiosity, assess prior knowledge, create cognitive disequilibrium. Students encounter a provocation that makes them realize they can't fully explain what they observe. This creates a 'time capsule' of initial thinking to revisit later.",
      promptGuidance:
        "Design a provocation (image, artifact, data, demonstration, story) that makes students curious and reveals their prior knowledge. Use 'See-Think-Wonder' for observation-based launch, or 'Chalk Talk' for silent brainstorm. The provocation must be puzzling enough that students genuinely want to know more. DO NOT explain anything at this stage — let students sit with productive uncertainty. Record all student 'noticings' and 'wonderings' visibly. Include formative pre-assessment embedded naturally (not a separate test).",
      suggestedProtocols: [
        "See-Think-Wonder",
        "Chalk Talk",
        "Think-Puzzle-Explore",
      ],
      assessmentCheckpoints: [
        "Pre-assessment: Document initial understanding through models, drawings, or written responses",
        "Observation: Note which students can articulate prior knowledge and which show misconceptions",
      ],
      order: 1,
    },
    {
      name: "Finding Out",
      description:
        "Gather information, investigate, build foundational understanding. Students research using multiple sources, conduct hands-on investigations, and develop vocabulary and concepts.",
      promptGuidance:
        "Design varied investigation activities: hands-on experiments, guided research, primary source analysis, interviews, field observations. Scaffold research skills explicitly — teach source evaluation, note-taking, and data collection. Use 'Jigsaw' for dividing research across groups. Use 'Microlab' for equitable sharing of findings. Provide multiple modalities: visual, kinesthetic, auditory, digital. Honour student agency by offering choices in HOW they investigate.",
      suggestedProtocols: ["Jigsaw", "Microlab Protocol", "Say Something"],
      assessmentCheckpoints: [
        "Formative: Check data collection quality and source evaluation skills",
        "Observation: Monitor which students can identify relevant information vs. those who need scaffolding",
      ],
      order: 2,
    },
    {
      name: "Sorting Out",
      description:
        "Organize information, identify patterns, develop critical thinking. Students make sense of what they've found by categorizing, comparing, and connecting ideas.",
      promptGuidance:
        "Design activities that require students to ORGANIZE and ANALYZE — not just collect. Use graphic organizers, concept maps, Venn diagrams, ranking ladders. Use 'Final Word Protocol' for processing key findings. Apply Malaysia's i-Think maps where appropriate: Circle Map (defining), Bubble Map (describing), Double Bubble (comparing), Flow Map (sequencing), Multi-Flow (cause/effect), Tree Map (classifying). Students should begin forming tentative explanations. Teacher introduces formal vocabulary and concepts AFTER students have attempted their own sense-making.",
      suggestedProtocols: [
        "Final Word Protocol",
        "Gallery Walk with Feedback",
        "Fishbowl Discussion",
      ],
      assessmentCheckpoints: [
        "Formative: Review graphic organizers for evidence of pattern recognition",
        "Assessment AS learning: Students self-assess their understanding using criteria",
      ],
      order: 3,
    },
    {
      name: "Going Further",
      description:
        "Deepen understanding through personalized exploration. Students pursue aspects that interest them, investigate multiple perspectives, and extend their inquiry into new territory.",
      promptGuidance:
        "This is where student VOICE AND CHOICE is strongest. Offer multiple pathways for deeper investigation. Students may: pursue subtopics, explore different perspectives, design their own mini-investigations, connect to other disciplines. Use 'World Café' for collaborative deepening. Use 'Consultancy Protocol' if students encounter challenges. Include cross-curricular connections appropriate to the topic and country context. For older students, this phase moves toward OPEN INQUIRY where students formulate their own questions and methods.",
      suggestedProtocols: [
        "World Café",
        "Consultancy Protocol",
        "I Like / I Wish / What If",
      ],
      assessmentCheckpoints: [
        "Formative: Check depth and breadth of extended investigation",
        "Self-assessment: Students evaluate their own inquiry process skills",
      ],
      order: 4,
    },
    {
      name: "Making Conclusions",
      description:
        "Reflect deeply, synthesize understanding, form evidence-based conclusions. Students articulate how their thinking has changed and demonstrate their learning.",
      promptGuidance:
        "Structure synthesis activities: CER writing (Claim-Evidence-Reasoning), model revision (compare initial to final understanding), portfolio documentation. Use 'I Used to Think... Now I Think...' to make conceptual change visible. Use 'Tuning Protocol' for peer feedback on final work. Students must be able to articulate WHAT they learned, HOW they know it (evidence), and WHY it matters. Include metacognitive reflection: 'What strategies helped you learn? What would you do differently?'",
      suggestedProtocols: [
        "Tuning Protocol",
        "I Used to Think... Now I Think...",
        "Claim-Evidence-Reasoning (CER)",
        "Success Analysis Protocol",
      ],
      assessmentCheckpoints: [
        "Summative: Evaluate conceptual understanding through synthesis products",
        "Metacognition: Assess quality of self-reflection and identification of learning strategies",
        "Model comparison: Initial vs. final understanding showing growth",
      ],
      order: 5,
    },
    {
      name: "Taking Action",
      description:
        "Apply learning in meaningful, real-world contexts. Students use what they've learned to make a difference — in their classroom, school, community, or beyond. Action can be small and personal or large and public.",
      promptGuidance:
        "Design authentic action opportunities connected to students' communities and the local context of the teacher's country/region. Use Design for Change 'FIDS' framework: Feel the problem, Imagine solutions, Do something about it, Share the story. Actions can include: teaching others, creating resources, writing letters to decision-makers, designing solutions, organizing events, changing personal habits. The key: action must be student-initiated and genuinely meaningful — not performative. 'Small, personal actions are just as impactful as large initiatives' (IB PYP). Include public sharing of learning with authentic audience.",
      suggestedProtocols: [
        "FIDS Framework",
        "Gallery Walk with Feedback",
        "Fishbowl Discussion",
      ],
      assessmentCheckpoints: [
        "Summative: Evaluate quality and authenticity of action taken",
        "Reflection: How did applying learning deepen understanding?",
        "Peer and community feedback on impact",
      ],
      order: 6,
    },
  ],
  unitStructure: {
    slideCount: 10,
    activitySections: [
      "Pre-Assessment (embedded in Tuning In)",
      "Provocation Response",
      "Investigation Activities",
      "Sorting & Analysis",
      "Extended Inquiry",
      "Synthesis & Conclusions",
      "Action Planning",
      "Reflection Portfolio",
    ],
    teacherGuideSections: [
      "Standards Unpacking",
      "Conceptual Framework (Key Concepts + Related Concepts)",
      "Background Content for Teacher",
      "Provocation Design & Facilitation",
      "Investigation Facilitation Guide",
      "Sense-Making Discussion Guide",
      "Answer Key & Expected Responses",
      "Differentiation Strategies",
      "Assessment Guidance (FOR/AS/OF Learning)",
      "Common Misconceptions",
    ],
  },
  scaffoldingProgression: [
    {
      level: "Confirmation Inquiry",
      description:
        "Students confirm known principles through structured activity. Best for: introducing inquiry habits, K-2 students, building confidence.",
      teacherRole:
        "Provides question, procedure, and expected results. Guides step-by-step.",
      studentRole:
        "Follows procedure, observes outcomes, confirms expectations. Learns process skills.",
    },
    {
      level: "Structured Inquiry",
      description:
        "Teacher provides question and procedure. Students generate their own explanations from data.",
      teacherRole:
        "Provides research question and procedure. Does NOT reveal expected outcome.",
      studentRole:
        "Follows procedure, collects data, formulates own explanation.",
    },
    {
      level: "Guided Inquiry",
      description:
        "Teacher provides only the question. Students design investigation, collect data, draw conclusions.",
      teacherRole:
        "Provides driving question and materials. Facilitates, asks probing questions.",
      studentRole:
        "Designs procedure, selects variables, analyzes data, builds explanations.",
    },
    {
      level: "Open Inquiry",
      description:
        "Students formulate own questions, design investigations, communicate findings. Highest autonomy.",
      teacherRole:
        "Creates conditions for inquiry. Serves as consultant and resource.",
      studentRole:
        "Generates questions, designs full investigation, communicates findings.",
    },
  ],
  assessmentFramework: {
    formativeStrategies: [
      "Observation during investigations — what do students do when stuck?",
      "Exit tickets: '3 things I learned, 2 connections I made, 1 question I still have'",
      "Model/drawing revision — compare initial to current understanding",
      "Discussion monitoring: Who uses evidence? Who builds on others' ideas?",
      "Quick-write: 'The most important thing I discovered today is...'",
    ],
    summativeStrategies: [
      "CER (Claim-Evidence-Reasoning) structured writing",
      "Portfolio of inquiry process including drafts, revisions, reflections",
      "Performance task: Apply understanding to a new context",
      "Public presentation/exhibition of learning to authentic audience",
      "Model comparison: Initial vs. final with annotated changes",
    ],
    assessmentPurposes: {
      forLearning: [
        "Diagnostic pre-assessment embedded in Tuning In phase",
        "Teacher observations during investigation to identify misconceptions",
        "Descriptive feedback on works-in-progress (not grades)",
        "Formative checks at each phase transition",
      ],
      asLearning: [
        "Student self-assessment against criteria before teacher assessment",
        "Peer feedback using structured protocols (Tuning Protocol, Gallery Walk)",
        "Metacognitive reflection: 'What strategies helped me learn?'",
        "'I Used to Think... Now I Think...' conceptual change tracking",
      ],
      ofLearning: [
        "Summative evaluation of final products against rubric criteria",
        "Standards-referenced achievement evidence",
        "Portfolio documentation of learning journey",
        "Exhibition/presentation to authentic audience",
      ],
    },
    qualityIndicators: [
      "NSW QT: Deep Knowledge — Does the task focus on key disciplinary ideas?",
      "NSW QT: Deep Understanding — Do students demonstrate (not just recall) understanding?",
      "NSW QT: Higher-Order Thinking — Does the task demand analysis, evaluation, or creation?",
      "NSW QT: Substantive Communication — Are students communicating meaningfully about their learning?",
      "NSW QT: Connectedness — Does the task connect to real-world contexts?",
      "NSW QT: Cultural Knowledge — Are diverse perspectives valued?",
    ],
    metacognitionCycle: [
      "PLANNING: What am I being asked to do? What strategies could I use? Have I done something similar before?",
      "MONITORING: Am I on track? Do I need to change my approach? Is this strategy working?",
      "EVALUATING: How did it go? What worked well? What would I do differently next time?",
    ],
  },
  thinkingRoutines: [
    "See-Think-Wonder — observation-based inquiry launch",
    "Think-Puzzle-Explore — surface prior knowledge and generate questions",
    "I Used to Think... Now I Think... — track conceptual change",
    "Claim-Support-Question — build evidence-based arguments",
    "Connect-Extend-Challenge — process new learning",
    "Circle of Viewpoints — examine topic from multiple perspectives",
    "What Makes You Say That? — push for evidence-based reasoning",
    "Compass Points — Excited, Worrisome, Need to know, Stance",
  ],
  equityPractices: [
    "Use silent/written protocols (Chalk Talk, See-Think-Wonder) BEFORE verbal discussion",
    "Provide multiple modalities for demonstrating understanding (draw, write, speak, build, act)",
    "Include sentence starters and vocabulary supports in students' home languages",
    "Assign rotating group roles to prevent status hierarchies",
    "Select contexts reflecting students' cultural backgrounds and communities",
    "Value and build on students' cultural knowledge and lived experience",
    "Use equity strategies (random calling, think time) to ensure all voices are heard",
    "Provide scaffolded inquiry levels so ALL students participate at appropriate challenge",
  ],
};

// ============================================================================
// Inquiry Model 2: Phenomenon-Based Learning (Finnish / NGSS Storyline)
// ============================================================================

export const PHENOMENON_BASED: InquiryModelConfig = {
  code: "phenomenon_based",
  name: "Phenomenon-Based Learning",
  origin:
    "Finnish National Agency for Education (EDUFI) — embedded in Finland's national curriculum since 2016. Also aligns with NGSS storyline design and Ambitious Science Teaching.",
  description:
    "Begin with a real, observable phenomenon that crosses disciplinary boundaries. Students generate questions, investigate, build and revise explanatory models, and construct evidence-based explanations. Finland's approach integrates transversal competencies (thinking, cultural, self-care, multiliteracy, ICT, work-life, participation) into every phenomenon study. Assessment focuses on competence demonstration, not content recall.",
  phases: [
    {
      name: "Anchor Phenomenon",
      description:
        "Introduce a real-world phenomenon that is observable, puzzling, and crosses disciplines. Students observe and wonder.",
      promptGuidance:
        "Present a phenomenon that is: (1) OBSERVABLE — students can see, hear, or interact with it, (2) COMPLEX — requires multiple concepts to explain, (3) CROSS-DISCIPLINARY — naturally connects to multiple subjects (Finnish model), (4) CULTURALLY RELEVANT — connected to students' community and the teacher's country/region. Use 'See-Think-Wonder' to structure observation. Do NOT explain the phenomenon — let students sit with uncertainty. Finnish approach: frame it as a 'multidisciplinary learning module' connecting to the teacher's subject AND at least one other discipline.",
      suggestedProtocols: [
        "See-Think-Wonder",
        "Chalk Talk",
        "Think-Puzzle-Explore",
      ],
      assessmentCheckpoints: [
        "Document initial models/explanations — these become the baseline for measuring growth",
        "Categorize student questions as testable, researchable, or philosophical",
      ],
      order: 1,
    },
    {
      name: "Initial Models & Questions",
      description:
        "Students create initial explanatory models and generate driving questions. Models make thinking VISIBLE — both correct ideas and misconceptions become apparent.",
      promptGuidance:
        "Students draw/write their initial model explaining the phenomenon. Provide a template: 'What is happening? Why? What's invisible that might be important?' Use 'Microlab Protocol' for sharing models. Create a DRIVING QUESTION BOARD — display all questions visibly. Categorize: testable vs. researchable. Prioritize what to investigate first. PRESERVE initial models — they will be compared to final models to show growth. This comparison is one of the most powerful metacognitive tools available.",
      suggestedProtocols: [
        "Microlab Protocol",
        "Chalk Talk",
      ],
      assessmentCheckpoints: [
        "Assess model quality: Does it attempt to explain mechanisms, not just describe?",
        "Assess question quality: Are questions investigable? Do they go beyond surface level?",
      ],
      order: 2,
    },
    {
      name: "Investigation Sequence",
      description:
        "2-3 linked investigations that build on each other, each addressing student questions from the Driving Question Board.",
      promptGuidance:
        "Design investigations that connect to specific student questions. Use appropriate scaffolding level: Structured for novices (provide procedure), Guided for experienced learners (provide question only). Include data collection tools, collaborative group roles, and safety considerations. After each investigation, use a processing protocol. Return to Driving Question Board after each: Which questions can we now answer? What new questions emerged? Finnish approach: include cross-disciplinary connections (e.g., math data analysis, writing technical reports, historical/social context).",
      suggestedProtocols: [
        "Microlab Protocol",
        "Final Word Protocol",
        "Jigsaw",
      ],
      assessmentCheckpoints: [
        "Formative: Data collection quality and analysis depth",
        "Process skills: Can students design fair tests and identify variables?",
        "Driving Question Board updates — evidence of sustained inquiry",
      ],
      order: 3,
    },
    {
      name: "Sense-Making",
      description:
        "Students revise models and build evidence-based explanations. This is NOT the teacher explaining — it's students constructing understanding through discussion and reasoning.",
      promptGuidance:
        "Structure sense-making: (1) MODEL REVISION — students revisit initial models and revise with new evidence, using two colors to show changes. (2) CER writing — Claim, Evidence, Reasoning. (3) Consensus building — use 'Fishbowl' to model quality discussion, then class develops shared understanding. Teacher's role is FACILITATOR: 'What evidence supports that?', 'How does this connect to what [student] said?', 'Can anyone add to this model?' EEF evidence: metacognition (+8 months impact) — explicitly teach Planning-Monitoring-Evaluating cycle.",
      suggestedProtocols: [
        "Claim-Evidence-Reasoning (CER)",
        "Fishbowl Discussion",
        "Consultancy Protocol",
        "Final Word Protocol",
      ],
      assessmentCheckpoints: [
        "Model comparison: Initial vs. revised — what changed and why?",
        "CER quality: Strength of claims, relevance of evidence, sophistication of reasoning",
        "Discussion participation: Who uses evidence? Who builds on others' ideas?",
      ],
      order: 4,
    },
    {
      name: "Transfer & Application",
      description:
        "Apply understanding to a related phenomenon or real-world challenge. Finnish approach: connect to transversal competencies (participation, work-life skills, sustainability).",
      promptGuidance:
        "Present a NEW phenomenon and ask students to explain it using their model — this tests genuine transfer. OR design a challenge requiring applying the concepts. Use 'World Café' for collaborative transfer discussions. Include connection to OECD transformative competencies: Creating New Value, Reconciling Tensions, Taking Responsibility. End with 'I Used to Think... Now I Think...' and final model comparison. Finnish approach: connect to real civic participation — how does this knowledge matter for our community?",
      suggestedProtocols: [
        "World Café",
        "I Used to Think... Now I Think...",
        "Gallery Walk with Feedback",
        "FIDS Framework",
      ],
      assessmentCheckpoints: [
        "Transfer: Can students explain a NEW phenomenon using their model?",
        "Application: Quality and authenticity of real-world connection",
        "Final model comparison with annotated growth",
        "Portfolio: Complete inquiry journey documentation",
      ],
      order: 5,
    },
  ],
  unitStructure: {
    slideCount: 10,
    activitySections: [
      "Pre-Assessment (embedded in observation)",
      "Phenomenon Observation & Wonder",
      "Initial Model Drawing",
      "Driving Question Board",
      "Investigation 1",
      "Investigation 2",
      "Model Revision & CER Writing",
      "Transfer Activity",
      "Reflection Portfolio",
    ],
    teacherGuideSections: [
      "Standards Unpacking",
      "Phenomenon Selection Rationale",
      "Cross-Disciplinary Connections (Finnish model)",
      "Background Content for Teacher",
      "Investigation Facilitation Guide",
      "Sense-Making Discussion Guide",
      "Answer Key & Model Progressions",
      "Differentiation Strategies",
      "Assessment Guidance (formative throughout)",
      "Common Misconceptions with Correction Strategies",
    ],
  },
  scaffoldingProgression: [
    {
      level: "Confirmation Inquiry",
      description: "Students observe phenomenon and confirm expected observations using provided guide.",
      teacherRole: "Provides phenomenon, observation guide, and expected observations.",
      studentRole: "Observes carefully, records using provided organizer, confirms patterns.",
    },
    {
      level: "Structured Inquiry",
      description: "Teacher provides question and procedure. Students collect data and generate explanations.",
      teacherRole: "Designs procedure, provides data tools. Does NOT reveal explanations.",
      studentRole: "Follows procedure, collects data, generates initial explanations.",
    },
    {
      level: "Guided Inquiry",
      description: "Teacher provides driving question. Students design investigation and revise models.",
      teacherRole: "Provides question and materials. Facilitates with probing questions.",
      studentRole: "Designs procedure, determines what data to collect, revises model.",
    },
    {
      level: "Open Inquiry",
      description: "Students identify questions, design investigations, construct complete explanations.",
      teacherRole: "Presents phenomenon. Serves as consultant. Assesses reasoning quality.",
      studentRole: "Generates questions, designs investigation, builds and defends explanatory model.",
    },
  ],
  assessmentFramework: {
    formativeStrategies: [
      "Model progression tracking — document how models evolve across the unit",
      "Driving Question Board monitoring — are questions being answered? Are new ones emerging?",
      "Investigation notebook quality checks (data collection, analysis, reflection)",
      "Exit tickets: CER sentence starters completed for each investigation",
      "Observation of discussion: Who uses evidence? Who asks follow-up questions?",
    ],
    summativeStrategies: [
      "Final model with annotations explaining each component and its evidence basis",
      "CER essay: Full claim-evidence-reasoning explanation of the phenomenon",
      "Transfer task: Explain a new phenomenon using the same model",
      "Portfolio: Complete inquiry journey from initial wonder to final understanding",
      "Presentation of findings to authentic audience",
    ],
    assessmentPurposes: {
      forLearning: [
        "Initial model reveals prior knowledge and misconceptions to inform instruction",
        "Investigation data quality reveals process skill development needs",
        "Discussion monitoring identifies students needing additional support",
      ],
      asLearning: [
        "Model comparison: Students annotate their own growth",
        "Self-assessment against investigation quality criteria",
        "Metacognitive reflection using EEF Planning-Monitoring-Evaluating cycle",
      ],
      ofLearning: [
        "Final model quality against rubric",
        "CER writing against standards-aligned criteria",
        "Transfer task performance",
        "Portfolio completeness and reflection quality",
      ],
    },
    qualityIndicators: [
      "NSW QT: Deep Knowledge — sustained focus on key disciplinary ideas",
      "NSW QT: Problematic Knowledge — knowledge presented as open to multiple interpretations",
      "NSW QT: Higher-Order Thinking — analysis, evaluation, creation throughout",
      "NSW QT: Metalanguage — explicit attention to disciplinary language",
      "EEF: Metacognition — explicit Planning-Monitoring-Evaluating cycle embedded",
      "EEF: Collaborative learning — structured group work with defined roles",
    ],
    metacognitionCycle: [
      "PLANNING: What do I already know about this phenomenon? What strategy will help me investigate?",
      "MONITORING: Is my investigation giving me useful data? Do I need to adjust my approach?",
      "EVALUATING: Does my model explain the phenomenon? What evidence is strongest? What gaps remain?",
    ],
  },
  thinkingRoutines: [
    "See-Think-Wonder — phenomenon observation launch",
    "Think-Puzzle-Explore — surface prior knowledge",
    "Claim-Support-Question — build evidence-based explanations",
    "I Used to Think... Now I Think... — track conceptual change",
    "What Makes You Say That? — push for evidence-based reasoning",
    "3-2-1 Bridge — compare understanding before and after investigations",
    "Connect-Extend-Challenge — process investigation findings",
    "Circle of Viewpoints — examine phenomenon from multiple disciplinary perspectives",
  ],
  equityPractices: [
    "Select phenomena from students' communities and cultural contexts",
    "Use multiple modalities for modeling (drawing, physical models, digital, dramatic)",
    "Provide observation guides with sentence starters in multiple languages",
    "Use silent protocols before verbal discussion to amplify all voices",
    "Value students' everyday language and cultural knowledge about phenomena",
    "Provide scaffolded inquiry levels so all students can participate",
    "Allow collaborative model-building so students with different strengths contribute",
    "Connect to local environmental and community issues that matter to families",
  ],
};

// ============================================================================
// Inquiry Model 3: Design Thinking / Human-Centered Design
// ============================================================================

export const DESIGN_THINKING: InquiryModelConfig = {
  code: "design_thinking",
  name: "Design Thinking / Human-Centered Design",
  origin:
    "Stanford d.school, LAUNCH Cycle (Spencer & Juliani), Design for Change (global — 71 countries). Adapted through High Tech High's liberatory approach and OECD's transformative competencies.",
  description:
    "Human-centered design process emphasizing empathy, ideation, prototyping, and iteration. Students identify real problems affecting real people, then design and test solutions. Integrates High Tech High's equity stances: every student positioned as a central agent in their education. Process-as-evaluation — the design journey IS the assessment.",
  phases: [
    {
      name: "Look, Listen & Learn (Empathize)",
      description:
        "Research the problem space, build empathy with people affected, observe the situation firsthand. Students must deeply understand the HUMAN experience before designing solutions.",
      promptGuidance:
        "Design empathy-building activities: interviews with affected people (open-ended: 'Tell me about a time when...', 'How did that feel?'), field observation, data analysis, immersion experiences. Use 'Microlab Protocol' for sharing research. Create an EMPATHY MAP: See/Hear/Think-Feel/Do. Connect to OECD: Taking Responsibility — understanding consequences of our actions on others. The problem must be REAL and connected to students' community.",
      suggestedProtocols: [
        "Microlab Protocol",
        "See-Think-Wonder",
        "Chalk Talk",
      ],
      assessmentCheckpoints: [
        "Empathy research quality: Did students genuinely listen? Can they articulate user needs?",
        "Empathy map completeness and depth",
      ],
      order: 1,
    },
    {
      name: "Ask & Define",
      description:
        "Generate questions, define the problem precisely, identify constraints and criteria. Move from divergent (many questions) to convergent (specific problem statement).",
      promptGuidance:
        "Use 'Chalk Talk' for question generation (aim for 30+ questions per group). Categorize questions. Craft a 'How Might We...' statement that is narrow enough to be actionable but broad enough for creative solutions. Formula: 'How might we [action] for [specific user] so that [desired outcome]?' Identify CRITERIA (what success looks like) and CONSTRAINTS (limitations). Use 'Think-Puzzle-Explore' to map the problem space.",
      suggestedProtocols: [
        "Chalk Talk",
        "Think-Puzzle-Explore",
      ],
      assessmentCheckpoints: [
        "Problem statement quality: Specific, actionable, empathy-informed",
        "Criteria and constraints identification: Complete and realistic",
      ],
      order: 2,
    },
    {
      name: "Navigate Ideas (Ideate)",
      description:
        "Generate many possible solutions before selecting. Quantity before quality. Build on each other's ideas.",
      promptGuidance:
        "Silent brainstorm first (one idea per sticky note, aim for 8-10 each), then share and cluster. Use 'World Café' for rotating ideation. Evaluate ideas against criteria and constraints using a decision matrix. Students must JUSTIFY their selection with evidence from empathy research. SCAMPER technique for creative stretching. OECD: Creating New Value — going beyond reproducing existing knowledge.",
      suggestedProtocols: [
        "World Café",
        "Gallery Walk with Feedback",
      ],
      assessmentCheckpoints: [
        "Ideation breadth: Quantity and diversity of ideas generated",
        "Selection justification: Evidence-based reasoning connecting to user needs",
      ],
      order: 3,
    },
    {
      name: "Create & Prototype",
      description:
        "Build a tangible representation. Prototypes are 'thinking tools' — not final products. Emphasis on speed and iteration over perfection.",
      promptGuidance:
        "Rapid prototyping with limited time and simple materials. Physical (cardboard, paper, tape), digital (wireframes, mockups), or conceptual (storyboards, role-play). Start LOW-FIDELITY to test the concept. Document with photos and a 'Prototype Testing Plan': What question does this answer? How will we test it? Use 'Gallery Walk' for quick peer review before formal testing.",
      suggestedProtocols: [
        "Gallery Walk with Feedback",
        "I Like / I Wish / What If",
      ],
      assessmentCheckpoints: [
        "Prototype-testing plan quality: Clear questions to test",
        "Documentation: Process photos and written rationale",
      ],
      order: 4,
    },
    {
      name: "Highlight & Fix (Test & Iterate)",
      description:
        "Test with real users, get feedback, iterate. The most important phase — solutions improve through cycles of feedback and revision. Failure is learning.",
      promptGuidance:
        "User testing: Someone interacts with the prototype while designer OBSERVES (don't explain or defend). Use 'I Like / I Wish / What If' or 'Tuning Protocol' for structured feedback. Iteration log: Version, Change, Why, Result. At least TWO rounds of test-and-revise. Reflection using 'Success Analysis Protocol': What worked? What would I change? What did failure teach me? Share final solutions to authentic audience. High Tech High approach: process-as-evaluation — document the JOURNEY, not just the final product.",
      suggestedProtocols: [
        "I Like / I Wish / What If",
        "Tuning Protocol",
        "Success Analysis Protocol",
        "FIDS Framework",
      ],
      assessmentCheckpoints: [
        "Iteration evidence: Did the design improve through feedback cycles?",
        "Reflection quality: Depth of metacognitive thinking about process",
        "User feedback: Does the solution address the identified need?",
        "Portfolio: Complete design journey documentation",
      ],
      order: 5,
    },
  ],
  unitStructure: {
    slideCount: 10,
    activitySections: [
      "Pre-Assessment",
      "Empathy Research & Map",
      "Problem Definition (HMW)",
      "Ideation Workshop",
      "Prototype Plan & Build",
      "Testing & Feedback",
      "Iteration Log",
      "Final Presentation",
      "Reflection Portfolio",
    ],
    teacherGuideSections: [
      "Standards Unpacking",
      "Design Challenge Overview & Community Connection",
      "Material & Space Preparation",
      "Empathy Research Facilitation",
      "Ideation & Prototyping Guide",
      "Feedback Protocol Guide",
      "Assessment (Process Portfolio)",
      "Differentiation Strategies",
      "Career Connections",
    ],
  },
  scaffoldingProgression: [
    {
      level: "Teacher-Defined Challenge",
      description: "Teacher selects problem, defines constraints, provides materials. Students follow design process with high structure.",
      teacherRole: "Defines challenge, provides materials, models each phase, facilitates feedback.",
      studentRole: "Follows design steps, creates prototype within parameters, receives structured feedback.",
    },
    {
      level: "Guided Design Challenge",
      description: "Teacher provides problem area. Students define specific user, constraints, and approach.",
      teacherRole: "Provides problem area, models empathy and ideation methods, provides checkpoints.",
      studentRole: "Conducts empathy research, defines problem, generates solutions, builds and tests prototype.",
    },
    {
      level: "Student-Identified Challenge",
      description: "Students identify a real problem in their community and design solutions. Teacher coaches.",
      teacherRole: "Guides problem identification, coaches design process, connects to real users.",
      studentRole: "Identifies problem, conducts full empathy research, designs and tests solution.",
    },
    {
      level: "Community-Impact Design",
      description: "Students work with real community partners on genuine challenges. Solutions presented to decision-makers.",
      teacherRole: "Connects with community partners, ensures academic rigor, facilitates presentations.",
      studentRole: "Collaborates with clients, conducts professional design process, creates implementable solutions.",
    },
  ],
  assessmentFramework: {
    formativeStrategies: [
      "Empathy map quality check — depth of understanding of user needs",
      "Problem definition review — specificity and actionability of HMW statement",
      "Ideation breadth check — quantity and diversity of ideas before selection",
      "Prototype-feedback cycle monitoring — evidence of iteration",
      "Process documentation review at each phase",
    ],
    summativeStrategies: [
      "Process portfolio: Full design journey including failures and pivots",
      "Final presentation to authentic audience with Q&A",
      "Iteration log analysis: Evidence of improvement through feedback cycles",
      "Peer and user evaluation of final solution",
      "Reflection essay: What did the design process teach me?",
    ],
    assessmentPurposes: {
      forLearning: [
        "Empathy research review reveals understanding of user perspective",
        "Problem definition feedback helps students narrow focus",
        "Prototype testing identifies areas for improvement",
      ],
      asLearning: [
        "Self-assessment of collaboration and communication skills",
        "Peer feedback using structured protocols",
        "Iteration log: Students track their own improvement",
      ],
      ofLearning: [
        "Portfolio quality against process criteria",
        "Final solution quality against design criteria",
        "Presentation effectiveness with authentic audience",
        "Reflection depth and metacognitive awareness",
      ],
    },
    qualityIndicators: [
      "NSW QT: Connectedness — genuine connection to real-world problem",
      "NSW QT: Student Direction — student agency in design choices",
      "NSW QT: Higher-Order Thinking — creative problem-solving throughout",
      "High Tech High: Equity — every student positioned as capable designer",
      "OECD: Creating New Value — novel, meaningful solutions",
      "OECD: Taking Responsibility — understanding impact on others",
    ],
    metacognitionCycle: [
      "PLANNING: What do I know about this user? What approach will work? What resources do I need?",
      "MONITORING: Is my prototype addressing the real need? Does the feedback suggest changes?",
      "EVALUATING: Did my design process lead to a good solution? What would I do differently?",
    ],
  },
  thinkingRoutines: [
    "See-Think-Wonder — observe the problem space",
    "Think-Feel-Care — empathy routine for understanding user perspective",
    "How Might We...? — reframe problems as design opportunities",
    "Compass Points — reflect on selected idea",
    "I Used to Think... Now I Think... — track design process learning",
    "What? So What? Now What? — structured reflection after testing",
    "Step Inside — imagine yourself as the user",
    "Connect-Extend-Challenge — process feedback and testing results",
  ],
  equityPractices: [
    "Select design challenges affecting students' own communities",
    "Include empathy interviews with diverse community members",
    "Provide multiple prototyping modalities (physical, digital, dramatic, verbal)",
    "Use silent brainstorming before group sharing",
    "Value cultural knowledge and community expertise as valid design input",
    "Rotating leadership roles within design teams",
    "Allow presentations in students' preferred languages",
    "Connect to careers reflecting students' communities and aspirations",
  ],
};

// ============================================================================
// Inquiry Model 4: 5E Instructional Model (Global Science Education)
// ============================================================================

export const FIVE_E: InquiryModelConfig = {
  code: "five_e",
  name: "5E Instructional Model",
  origin:
    "Bybee et al. (1997) — Biological Sciences Curriculum Study. Widely adopted globally in science education. Enhanced here with EEF evidence-based practices, NSW Quality Teaching indicators, and Cambridge International's Thinking & Working Scientifically framework.",
  description:
    "A research-based constructivist model: Engage, Explore, Explain, Elaborate, Evaluate. The critical insight: students EXPLORE before they EXPLAIN. Formal vocabulary and concepts are introduced AFTER hands-on investigation, not before. Enhanced with EEF's seven-step metacognition model and Ontario's three investigation processes.",
  phases: [
    {
      name: "Engage",
      description:
        "Activate prior knowledge, spark curiosity, create cognitive disequilibrium. Students encounter something they can't fully explain.",
      promptGuidance:
        "Create a compelling hook using: discrepant event, thought-provoking image/video, puzzling data, or 'See-Think-Wonder' routine. Must create genuine 'need to know.' Use 'Chalk Talk' for equitable brainstorming. Embed pre-assessment naturally in the engagement activity. EEF: Activate prior knowledge as the first step of the seven-step metacognition model.",
      suggestedProtocols: [
        "See-Think-Wonder",
        "Chalk Talk",
        "Think-Puzzle-Explore",
      ],
      assessmentCheckpoints: [
        "Pre-assessment embedded in engagement activity",
        "Document initial conceptions (correct and incorrect) to inform instruction",
      ],
      order: 1,
    },
    {
      name: "Explore",
      description:
        "Hands-on investigation BEFORE formal instruction. Students discover concepts through direct experience with the phenomenon.",
      promptGuidance:
        "Design student-centered investigation. Students discover patterns BEFORE formal concepts are introduced — this is the critical distinction of 5E. Include: materials list, safety, data collection tools, group roles. Use 'Microlab Protocol' for processing observations. Scaffold using Ontario's three investigation processes: (1) Scientific Research, (2) Scientific Experimentation, (3) Engineering Design — choose the most appropriate for the content. EEF: Seven-step model — explicit strategy instruction followed by modeling.",
      suggestedProtocols: [
        "Microlab Protocol",
        "Jigsaw",
      ],
      assessmentCheckpoints: [
        "Process skills: Can students collect, organize, and begin analyzing data?",
        "Observation: What patterns are students noticing? What misconceptions are surfacing?",
      ],
      order: 2,
    },
    {
      name: "Explain",
      description:
        "Students articulate findings FIRST, then teacher introduces formal concepts. Sequence matters: student sense-making before teacher explanation.",
      promptGuidance:
        "Two parts: (1) STUDENT EXPLANATION — use 'Final Word Protocol' or 'Fishbowl' for students to share and discuss findings. (2) TEACHER EXPLANATION — introduce formal vocabulary and concepts AFTER hearing student ideas. Connect student discoveries to formal knowledge. Validate student thinking before correcting misconceptions. Use 'Frayer Model' for vocabulary development. EEF: Guided practice phase — students apply strategies with support.",
      suggestedProtocols: [
        "Final Word Protocol",
        "Fishbowl Discussion",
      ],
      assessmentCheckpoints: [
        "Formative: Can students explain their findings using evidence?",
        "Vocabulary check: Are students using new terms accurately?",
      ],
      order: 3,
    },
    {
      name: "Elaborate",
      description:
        "Apply understanding to new contexts. Students transfer knowledge — they use what they learned in a new, unfamiliar situation.",
      promptGuidance:
        "Design a TRANSFER task — not just repetition. Real-world application connected to students' community. Cross-curricular connections. Use 'Gallery Walk' for sharing work. Use 'World Café' for collaborative problem-solving. For advanced students, move toward OPEN INQUIRY. OECD: Creating New Value — students apply learning in novel ways. Cambridge: Assessment Objective 2 (Application) and AO3 (Analysis).",
      suggestedProtocols: [
        "Gallery Walk with Feedback",
        "World Café",
      ],
      assessmentCheckpoints: [
        "Transfer: Can students apply concepts in a new context?",
        "Cross-curricular: Can they connect to other disciplines?",
      ],
      order: 4,
    },
    {
      name: "Evaluate",
      description:
        "Ongoing assessment culminating in summative evidence. Assessment happens throughout ALL phases, with this phase providing the capstone.",
      promptGuidance:
        "Multiple assessment types: CER writing, model comparison (initial vs. final), performance tasks, self-assessment, peer evaluation using 'Tuning Protocol.' Use 'I Used to Think... Now I Think...' for metacognitive reflection. EEF: The Planning-Monitoring-Evaluating cycle — students reflect on their entire learning process. Include formative checkpoints in EVERY phase, not just here. Ontario: Triangulate evidence from observations, conversations, and student products.",
      suggestedProtocols: [
        "Tuning Protocol",
        "I Used to Think... Now I Think...",
        "Claim-Evidence-Reasoning (CER)",
        "Success Analysis Protocol",
      ],
      assessmentCheckpoints: [
        "Summative: Standards-aligned evidence of understanding",
        "Metacognition: Quality of self-reflection on learning process",
        "Model comparison: Initial vs. final showing conceptual growth",
        "Portfolio: Complete learning journey documentation",
      ],
      order: 5,
    },
  ],
  unitStructure: {
    slideCount: 10,
    activitySections: [
      "Pre-Assessment (embedded in Engage)",
      "Engage Activity",
      "Explore Investigation",
      "Explain Discussion & Vocabulary",
      "Elaborate Application",
      "Evaluate Reflection",
      "STEM Challenge",
    ],
    teacherGuideSections: [
      "Standards Unpacking",
      "Background Content for Teacher",
      "5E Framework Overview",
      "Slide-by-Slide Facilitation",
      "Answer Key & Expected Responses",
      "Differentiation Strategies",
      "Assessment Guidance (FOR/AS/OF Learning)",
      "Common Misconceptions with Correction Strategies",
    ],
  },
  scaffoldingProgression: [
    {
      level: "Confirmation Inquiry",
      description: "Students confirm known principle through structured activity.",
      teacherRole: "Provides question, procedure, and expected results.",
      studentRole: "Follows procedure, confirms expected outcome, learns process skills.",
    },
    {
      level: "Structured Inquiry",
      description: "Teacher provides question and procedure. Students generate own explanations.",
      teacherRole: "Provides question and procedure. Does NOT reveal expected outcome.",
      studentRole: "Follows procedure, collects data, formulates own explanation.",
    },
    {
      level: "Guided Inquiry",
      description: "Teacher provides only the question. Students design investigation.",
      teacherRole: "Provides driving question and materials. Facilitates without giving answers.",
      studentRole: "Designs procedure, selects variables, analyzes data, builds explanations.",
    },
    {
      level: "Open Inquiry",
      description: "Students formulate own questions and design full investigations.",
      teacherRole: "Creates conditions. Serves as consultant. Assesses process and product.",
      studentRole: "Generates questions, designs investigation, communicates findings.",
    },
  ],
  assessmentFramework: {
    formativeStrategies: [
      "Exit tickets at each phase: 'The most important thing I learned today is...'",
      "Observation during Explore: What are students noticing? Where are they stuck?",
      "Quick-write before Explain: 'Based on my investigation, I think...'",
      "Vocabulary check: Can students use terms accurately in context?",
      "Discussion monitoring: Evidence use and reasoning quality",
    ],
    summativeStrategies: [
      "CER writing: Claim-Evidence-Reasoning explanation",
      "Performance task: Apply understanding in new context",
      "Model comparison: Initial vs. final with annotated changes",
      "Lab report or investigation write-up",
      "Portfolio with reflection on inquiry process",
    ],
    assessmentPurposes: {
      forLearning: [
        "Pre-assessment in Engage reveals prior knowledge and misconceptions",
        "Observation during Explore identifies process skill needs",
        "Discussion monitoring in Explain shows reasoning development",
      ],
      asLearning: [
        "Self-assessment against investigation quality criteria",
        "Peer feedback using Tuning Protocol",
        "Metacognitive reflection on learning strategies",
      ],
      ofLearning: [
        "CER writing quality against standards-aligned criteria",
        "Performance task demonstrating transfer",
        "Portfolio completeness and reflection quality",
      ],
    },
    qualityIndicators: [
      "EEF: Metacognition and self-regulation (+8 months impact) — embedded throughout",
      "EEF: Collaborative learning (+5 months) — structured group work in Explore",
      "EEF: Feedback (+8 months) — descriptive, timely feedback at each phase",
      "NSW QT: Deep Understanding — students demonstrate, not just recall",
      "NSW QT: Higher-Order Thinking — analysis, evaluation, creation",
      "Cambridge: Thinking & Working Scientifically — models, enquiry, analysis",
    ],
    metacognitionCycle: [
      "PLANNING: What do I already know? What strategy will help me investigate? What do I predict?",
      "MONITORING: Is my investigation working? Am I collecting useful data? Do I need to adjust?",
      "EVALUATING: What did I learn? Does my explanation fit the evidence? What would I do differently?",
    ],
  },
  thinkingRoutines: [
    "See-Think-Wonder — observation-based engagement",
    "Think-Puzzle-Explore — prior knowledge activation",
    "Claim-Support-Question — evidence-based argumentation",
    "I Used to Think... Now I Think... — conceptual change tracking",
    "Connect-Extend-Challenge — processing new learning",
    "What Makes You Say That? — evidence-based reasoning",
    "3-2-1 Bridge — before/after thinking comparison",
    "Compass Points — reflection on learning: Excited, Worrisome, Need, Stance",
  ],
  equityPractices: [
    "Use silent protocols (Chalk Talk, written See-Think-Wonder) BEFORE verbal discussion",
    "Provide multiple modalities for demonstrating understanding",
    "Include sentence starters and vocabulary supports in students' home languages",
    "Rotating collaborative roles preventing status hierarchies",
    "Select phenomena from students' cultural backgrounds and communities",
    "Scaffolded inquiry levels so all students participate at appropriate challenge",
    "Equity calling strategies ensuring all voices are heard",
    "Value and build on students' everyday language and cultural knowledge",
  ],
};

// ============================================================================
// Export All Models
// ============================================================================

export const ALL_INQUIRY_MODELS: Record<string, InquiryModelConfig> = {
  kath_murdoch: KATH_MURDOCH_INQUIRY,
  phenomenon_based: PHENOMENON_BASED,
  design_thinking: DESIGN_THINKING,
  five_e: FIVE_E,
};

// ============================================================================
// Helper: Get protocols for a specific phase and context
// ============================================================================

export function getProtocolsForContext(options: {
  phase?: string;
  ageBand?: "K-2" | "3-5" | "6-8" | "9-12";
  inquiryDepth?: "confirmation" | "structured" | "guided" | "open";
  cognitiveLoad?: "low" | "medium" | "high";
}): Protocol[] {
  return PROTOCOL_LIBRARY.filter((p) => {
    if (options.phase && !p.tags.phase.includes(options.phase)) return false;
    if (options.ageBand && !p.tags.ageBand.includes(options.ageBand))
      return false;
    if (options.inquiryDepth && p.tags.inquiryDepth !== options.inquiryDepth)
      return false;
    if (options.cognitiveLoad && p.tags.cognitiveLoad !== options.cognitiveLoad)
      return false;
    return true;
  });
}
