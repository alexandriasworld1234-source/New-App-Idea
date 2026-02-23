export const UNIT_OVERVIEW_PROMPT = `Generate a comprehensive unit overview with the following structure. Return ONLY valid JSON matching this exact schema:

{
  "title": "A compelling, student-friendly title for the unit",
  "drivingQuestion": "An open-ended, engaging driving question that anchors the entire unit",
  "unitSummary": "A 2-3 paragraph summary of what students will learn, do, and create in this unit",
  "learningObjectives": ["4-6 specific, measurable learning objectives using Bloom's taxonomy verbs"],
  "keyVocabulary": [
    { "term": "vocabulary word", "definition": "student-friendly definition" }
  ],
  "standardsAlignment": [
    { "standardCode": "code", "alignmentExplanation": "How this unit addresses this standard" }
  ],
  "timeline": [
    { "phase": "Phase name from the inquiry model", "duration": "estimated time", "activities": ["list of key activities"] }
  ],
  "successCriteria": ["What students should know and be able to do by the end"],
  "prerequisiteKnowledge": ["What students should already know before starting"],
  "materialsNeeded": ["List of materials and resources needed"]
}

IMPORTANT GUIDELINES:
- The **driving question** must follow PBLWorks criteria: open-ended (no single right answer), engaging (students care), standards-aligned (answering it requires learning content), and challenging (requires sustained inquiry). For PBL, use the formula: "How can we [action] for [audience] so that [impact]?" For phenomenon-based, frame it around explaining the phenomenon.
- **Learning objectives** must use Bloom's taxonomy action verbs at appropriate cognitive levels for the grade. Include at least 2 objectives at the "Analyze" level or higher. Frame objectives around what students will DO and PRODUCE, not just know.
- **Key vocabulary** should include both content-specific terms AND inquiry process terms (e.g., "evidence," "model," "claim," "prototype," "criteria"). Definitions must be student-friendly for the grade level.
- **Timeline** must include specific named protocols from CLEE, PBLWorks, and Harvard Project Zero thinking routines in the activities list (e.g., "Chalk Talk for initial brainstorm," "Tuning Protocol for peer feedback," "See-Think-Wonder for phenomenon observation").
- **Materials needed** should include protocol handouts, thinking routine templates, and collaboration tools alongside content-specific materials.
- Generate 4-6 learning objectives, 6-10 vocabulary terms, and ensure every selected standard is addressed in standardsAlignment.`;

export const PRESENTATION_PROMPT = `Generate a student-facing presentation with engaging slides. Return ONLY valid JSON matching this schema:

{
  "slides": [
    {
      "slideNumber": 1,
      "title": "Slide title",
      "layout": "title | content | two_column | image_focus | activity | reflection",
      "content": {
        "mainText": "Primary text content (optional)",
        "bulletPoints": ["bullet point items (optional)"],
        "activityInstructions": "Step-by-step instructions for student activity (optional)",
        "discussionPrompt": "Turn-and-talk or class discussion question (optional)",
        "imageDescription": "Detailed description for AI image generation - describe the scene, setting, and people (optional)"
      },
      "speakerNotes": "Detailed speaker notes for the teacher presenting this slide",
      "inquiryPhase": "Which inquiry model phase this slide belongs to"
    }
  ]
}

IMPORTANT GUIDELINES:
- Generate 9-12 slides. The first slide should be a title slide. The last slide should be a reflection slide.
- Include at least 3 slides with **imageDescription** for AI-generated visuals. Image descriptions should depict diverse students (70-80% Black and Brown) actively engaged in inquiry — investigating, discussing, building, presenting. Photorealistic style, not cartoonish.
- **Activity slides** must reference specific named protocols: "Use the Chalk Talk protocol: silently write your responses around the central question" or "Turn to your partner and use the See-Think-Wonder routine" or "In your Microlab group, each person shares for 1 minute."
- **Speaker notes** must be detailed enough for a first-year teacher. Include:
  - What to SAY (suggested script/talking points)
  - What to DO (specific teacher actions)
  - Key QUESTIONS to ask (including probing follow-ups from Queen's University IBL strategies)
  - TIMING suggestions (e.g., "Allow 3-5 minutes for individual think time before group sharing")
  - ANTICIPATED student responses and how to build on them
  - TRANSITIONS to the next slide/activity
- **Discussion prompts** should be genuine inquiry questions, not recall questions. Use stems: "What evidence supports...?", "How might we explain...?", "What would happen if...?", "Why do you think...?"
- Each slide must clearly belong to an inquiry model phase. The progression should feel natural and purposeful — students should feel the logic of moving from one phase to the next.
- Include at least one slide with a Harvard Project Zero **thinking routine** (See-Think-Wonder, Think-Puzzle-Explore, Claim-Support-Question, etc.) presented as a structured student activity.`;

export const ACTIVITY_PACK_PROMPT = `Generate a comprehensive student activity pack. Return ONLY valid JSON matching this schema:

{
  "preAssessment": {
    "instructions": "Instructions for completing the pre-assessment",
    "questions": [
      {
        "question": "The question text",
        "responseType": "open_response | multiple_choice | drawing",
        "options": ["Only for multiple_choice type"],
        "lineCount": 4
      }
    ]
  },
  "rubric": {
    "skills": [
      {
        "skillName": "Name of the skill being assessed",
        "levels": {
          "expert": "Description of expert-level performance",
          "proficient": "Description of proficient performance",
          "developing": "Description of developing performance",
          "beginning": "Description of beginning performance"
        }
      }
    ]
  },
  "activities": [
    {
      "title": "Activity title",
      "inquiryPhase": "Which inquiry phase this belongs to",
      "instructions": "Clear instructions for students",
      "tasks": [
        {
          "prompt": "The task or question",
          "responseType": "open_response | table | diagram | multiple_choice",
          "lineCount": 4
        }
      ]
    }
  ],
  "reflection": {
    "questions": ["5 reflection questions that promote metacognition"]
  },
  "stemChallenge": {
    "title": "Engineering/design challenge title",
    "scenario": "Real-world scenario description",
    "constraints": ["Design constraints students must follow"],
    "engineeringQuestions": ["Guiding questions for the design process"],
    "careerConnection": {
      "careers": [
        { "title": "Career title", "description": "Brief description", "salaryRange": "$XX,000 - $XX,000" }
      ]
    }
  }
}

IMPORTANT GUIDELINES:
- Generate 4 pre-assessment questions, 4-5 rubric skills, 4-6 activities (one per inquiry phase), 5 reflection questions, and a meaningful STEM challenge with 2-3 career connections.
- **Pre-assessment** must reveal students' PRIOR KNOWLEDGE and MISCONCEPTIONS — not test what they haven't learned yet. Include at least one drawing/diagram question where students create an initial model or representation. These initial responses will be compared to post-unit work to show growth.
- **Rubric skills** must include both CONTENT skills AND INQUIRY PROCESS skills. Use PBLWorks 4 C's as a framework: Critical Thinking (analyzing information, evaluating evidence), Collaboration (working productively with peers), Communication (presenting ideas clearly), and Creativity/Innovation (generating original solutions). Each rubric level must describe specific, observable behaviors — not vague qualifiers like "excellent" or "needs improvement."
- **Activities** must embed specific named protocols from CLEE, PBLWorks, and Harvard Project Zero:
  - Include explicit protocol instructions: "Use the Microlab Protocol: In your group of 3, each person shares for 1 minute while others listen without interrupting."
  - Include thinking routine templates: "Complete the See-Think-Wonder chart: What do you SEE? What do you THINK is happening? What do you WONDER?"
  - Include sentence starters for discussion and writing: "The evidence suggests...", "I agree/disagree with ___ because...", "My claim is ___ and the evidence is ___"
  - Include collaborative structures with defined roles (materials manager, recorder, reporter, timekeeper)
  - Each activity must require students to PRODUCE something — a model, a written explanation, collected data, a diagram, a CER paragraph — not just answer questions
- **Reflection questions** must promote genuine METACOGNITION using these stems: "How has your thinking about ___ changed?", "What strategy helped you learn best?", "What would you do differently next time?", "What are you still wondering about?", "How could you apply what you learned to a real situation?" Include at least one "I Used to Think... Now I Think..." prompt.
- **STEM Challenge** must be AUTHENTIC — connected to a real-world problem that matters to students' communities. Include the design thinking process: Empathize → Define → Ideate → Prototype → Test. Career connections should feature diverse role models with realistic salary ranges appropriate to the country/location.`;

export const TEACHER_GUIDE_PROMPT = `Generate a comprehensive teacher's guide. Return ONLY valid JSON matching this schema:

{
  "standardsUnpacking": {
    "standards": [
      {
        "code": "Standard code",
        "fullText": "Full standard text",
        "studentFriendlyLanguage": "How to explain this to students",
        "assessmentBoundary": "What students are NOT expected to know (optional)",
        "clarificationStatement": "Additional context for teachers (optional)"
      }
    ]
  },
  "backgroundContent": {
    "overview": "2-3 paragraphs of deep content knowledge for the teacher",
    "keyConceptsForTeacher": [
      { "concept": "Concept name", "explanation": "Detailed explanation teachers need" }
    ],
    "commonMisconceptions": [
      {
        "misconception": "What students commonly think incorrectly",
        "correction": "The correct understanding",
        "teachingTip": "How to address this in class"
      }
    ]
  },
  "facilitationGuide": [
    {
      "slideNumber": 1,
      "slideTitle": "Matching slide title",
      "inquiryPhase": "Phase name",
      "timeEstimate": "e.g., 10-15 minutes",
      "whatToSay": "Suggested teacher script/talking points",
      "whatToDo": "Specific actions and things to watch for",
      "expectedStudentResponses": ["What students might say or do"],
      "probeQuestions": ["Follow-up questions to deepen thinking"],
      "transitionToNext": "How to transition to the next activity"
    }
  ],
  "answerKey": [
    {
      "activityTitle": "Matching activity title from the activity pack",
      "answers": [
        {
          "question": "The question",
          "expectedResponse": "Strong example response",
          "acceptableVariations": ["Other acceptable answers"]
        }
      ]
    }
  ],
  "differentiation": {
    "scaffolding": ["4 strategies for struggling learners"],
    "extension": ["4 ideas for advanced learners"],
    "ell": ["4 strategies for English Language Learners"],
    "specialEducation": ["4 accommodations for students with IEPs"]
  },
  "assessmentGuidance": {
    "formative": ["Formative assessment strategies to use during the unit"],
    "summative": ["Summative assessment ideas for the end of the unit"]
  }
}

IMPORTANT GUIDELINES:
- The facilitation guide should match the number of slides in the presentation. Answer keys must match activities from the activity pack.

### Standards Unpacking
- **Student-friendly language** must be genuinely understandable by students at this grade level — not just simplified jargon. Test: Could a student read this and understand what they're expected to learn?
- **Assessment boundaries** are critical: clearly state what is BEYOND the scope of this grade level to prevent teacher over-teaching

### Background Content
- **Overview** should give teachers enough content knowledge to feel confident facilitating inquiry — especially teachers teaching outside their primary expertise
- **Key concepts** should include the "why" behind the concept, not just the "what" — connect to big ideas and real-world applications
- **Common misconceptions** must be genuinely common at this specific grade level, based on research. The teaching tip must explain HOW to address it using inquiry (elicit the misconception, provide contradicting evidence, facilitate revision) — not just "tell students the correct answer"

### Facilitation Guide — This is the MOST IMPORTANT section
- **What to say** must include:
  - Opening script for each phase/slide
  - Specific questions to pose (not just "ask questions about the topic")
  - How to validate student responses without giving away answers: "That's an interesting observation. What evidence led you to that conclusion?"
  - How to handle WRONG answers productively: "I see how you might think that. Let's test that idea against our data."
  - Named protocol instructions: "Now we'll use the Microlab Protocol. In your groups of 3, Person A will share for 1 minute while B and C listen..."

- **What to do** must include:
  - Specific teacher ACTIONS: "Walk around and listen for students who mention [concept]. Note which groups are struggling with [common difficulty]."
  - Room setup instructions: "Arrange desks in groups of 4. Post the driving question on the board."
  - Materials to have ready: "Have data collection sheets pre-distributed. Set up the demonstration before students arrive."
  - Equity moves: "Use equity sticks for calling on students. Provide 2 minutes of silent think time before discussion."

- **Expected student responses** must include:
  - 3-5 REALISTIC responses students at this grade level would actually give (both correct and incorrect)
  - Common misconceptions that will surface
  - Signs of understanding to look for
  - Signs of confusion that signal need for additional support

- **Probe questions** must follow Queen's University IBL questioning strategies:
  - Clarifying: "Can you say more about that?"
  - Probing: "What evidence supports your claim?"
  - Redirecting: "How does what [Student A] said connect to what [Student B] observed?"
  - Extending: "What would happen if we changed [variable]?"
  - Metacognitive: "How did you figure that out? What was your thinking process?"

### Differentiation
- Must be SPECIFIC and ACTIONABLE — not generic ("provide extra time", "offer enrichment"). Examples:
  - Scaffolding: "Provide a partially completed data table with row headers pre-filled" or "Use a sentence frame: 'My claim is ___ because the evidence shows ___'"
  - Extension: "Challenge students to design their own investigation to test a different variable" or "Have students write a CER paragraph explaining a related phenomenon"
  - ELL: "Provide vocabulary cards with images and L1 translations. Allow collaborative discussion in home language before sharing in English. Use visual models and diagrams to support comprehension."
  - Special Education: "Provide graphic organizer with pre-printed headings. Break multi-step activities into individual checkpoints with teacher check-in. Offer choice of response modality (draw, write, type, record audio)."

### Assessment Guidance
- **Formative**: Include specific observable indicators for each phase — what does understanding LOOK LIKE in action? Reference specific protocols for assessment: "During the Gallery Walk, look for students who can explain the cause-and-effect relationship" or "Exit ticket: Complete a CER sentence about today's investigation."
- **Summative**: Include both traditional (test, essay) and authentic (presentation, portfolio, model) options. Reference the unit rubric and PBLWorks 4 C's framework.`;
