import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  WidthType,
  BorderStyle,
  TableLayoutType,
} from "docx";

type ActivityPackContent = {
  preAssessment: {
    instructions: string;
    questions: Array<{
      question: string;
      responseType: string;
      options?: string[];
      lineCount?: number;
    }>;
  };
  rubric: {
    skills: Array<{
      skillName: string;
      levels: {
        expert: string;
        proficient: string;
        developing: string;
        beginning: string;
      };
    }>;
  };
  activities: Array<{
    title: string;
    inquiryPhase: string;
    instructions: string;
    tasks: Array<{
      prompt: string;
      responseType: string;
      lineCount?: number;
    }>;
  }>;
  reflection: { questions: string[] };
  stemChallenge: {
    title: string;
    scenario: string;
    constraints: string[];
    engineeringQuestions: string[];
    careerConnection: {
      careers: Array<{
        title: string;
        description: string;
        salaryRange: string;
      }>;
    };
  };
};

const PRIMARY_COLOR = "2563EB";
const SECONDARY_COLOR = "1E40AF";

function sectionHeader(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 32,
        color: PRIMARY_COLOR,
        font: "Arial",
      }),
    ],
  });
}

function subHeader(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 100 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 24,
        color: SECONDARY_COLOR,
        font: "Arial",
      }),
    ],
  });
}

function bodyText(text: string): Paragraph {
  return new Paragraph({
    spacing: { after: 100 },
    children: [
      new TextRun({ text, size: 22, font: "Arial" }),
    ],
  });
}

function responseBox(lines: number = 4): Paragraph[] {
  const result: Paragraph[] = [];
  for (let i = 0; i < lines; i++) {
    result.push(
      new Paragraph({
        spacing: { after: 0 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
        },
        children: [new TextRun({ text: " ", size: 22 })],
      })
    );
  }
  return result;
}

export async function buildActivityPack(
  content: ActivityPackContent,
  unitTitle: string,
  gradeLevel: string
): Promise<Buffer> {
  const sections: Paragraph[] = [];

  // Cover info
  sections.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 600, after: 200 },
      children: [
        new TextRun({
          text: unitTitle,
          bold: true,
          size: 44,
          color: PRIMARY_COLOR,
          font: "Arial",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: "Student Activity Pack",
          size: 28,
          color: "666666",
          font: "Arial",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `Grade ${gradeLevel}`,
          size: 22,
          font: "Arial",
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 400 },
      children: [
        new TextRun({ text: "Name: ________________", size: 22, font: "Arial" }),
        new TextRun({ text: "    Date: ________________", size: 22, font: "Arial" }),
      ],
    })
  );

  // Pre-Assessment
  sections.push(sectionHeader("Pre-Assessment: What Do You Already Know?"));
  sections.push(bodyText(content.preAssessment.instructions));
  for (const [i, q] of content.preAssessment.questions.entries()) {
    sections.push(
      new Paragraph({
        spacing: { before: 200 },
        children: [
          new TextRun({
            text: `${i + 1}. ${q.question}`,
            bold: true,
            size: 22,
            font: "Arial",
          }),
        ],
      })
    );
    if (q.responseType === "multiple_choice" && q.options) {
      for (const opt of q.options) {
        sections.push(
          new Paragraph({
            indent: { left: 400 },
            children: [
              new TextRun({ text: `○  ${opt}`, size: 22, font: "Arial" }),
            ],
          })
        );
      }
    } else {
      sections.push(...responseBox(q.lineCount ?? 4));
    }
  }

  // Rubric
  sections.push(sectionHeader("Scoring Rubric"));
  const rubricRows = [
    new TableRow({
      tableHeader: true,
      children: ["Skill", "Expert (4)", "Proficient (3)", "Developing (2)", "Beginning (1)"].map(
        (header) =>
          new TableCell({
            shading: { fill: PRIMARY_COLOR },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: header,
                    bold: true,
                    color: "FFFFFF",
                    size: 18,
                    font: "Arial",
                  }),
                ],
              }),
            ],
          })
      ),
    }),
    ...content.rubric.skills.map(
      (skill) =>
        new TableRow({
          children: [
            skill.skillName,
            skill.levels.expert,
            skill.levels.proficient,
            skill.levels.developing,
            skill.levels.beginning,
          ].map(
            (text) =>
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text, size: 16, font: "Arial" }),
                    ],
                  }),
                ],
              })
          ),
        })
    ),
  ];

  sections.push(
    new Paragraph({
      children: [],
    })
  );

  // Activities
  for (const activity of content.activities) {
    sections.push(sectionHeader(activity.title));
    sections.push(
      new Paragraph({
        spacing: { after: 50 },
        children: [
          new TextRun({
            text: `Phase: ${activity.inquiryPhase}`,
            italics: true,
            size: 20,
            color: "666666",
            font: "Arial",
          }),
        ],
      })
    );
    sections.push(bodyText(activity.instructions));
    for (const [i, task] of activity.tasks.entries()) {
      sections.push(
        new Paragraph({
          spacing: { before: 200 },
          children: [
            new TextRun({
              text: `${i + 1}. ${task.prompt}`,
              bold: true,
              size: 22,
              font: "Arial",
            }),
          ],
        })
      );
      sections.push(...responseBox(task.lineCount ?? 4));
    }
  }

  // Reflection
  sections.push(sectionHeader("Reflection"));
  for (const [i, q] of content.reflection.questions.entries()) {
    sections.push(
      new Paragraph({
        spacing: { before: 200 },
        children: [
          new TextRun({
            text: `${i + 1}. ${q}`,
            bold: true,
            size: 22,
            font: "Arial",
          }),
        ],
      })
    );
    sections.push(...responseBox(4));
  }

  // STEM Challenge
  sections.push(sectionHeader(`STEM Challenge: ${content.stemChallenge.title}`));
  sections.push(bodyText(content.stemChallenge.scenario));
  sections.push(subHeader("Constraints"));
  for (const c of content.stemChallenge.constraints) {
    sections.push(
      new Paragraph({
        bullet: { level: 0 },
        children: [new TextRun({ text: c, size: 22, font: "Arial" })],
      })
    );
  }
  sections.push(subHeader("Engineering Questions"));
  for (const [i, q] of content.stemChallenge.engineeringQuestions.entries()) {
    sections.push(
      new Paragraph({
        spacing: { before: 100 },
        children: [
          new TextRun({
            text: `${i + 1}. ${q}`,
            bold: true,
            size: 22,
            font: "Arial",
          }),
        ],
      })
    );
    sections.push(...responseBox(3));
  }

  // Career connections
  sections.push(subHeader("Career Connections"));
  for (const career of content.stemChallenge.careerConnection.careers) {
    sections.push(
      new Paragraph({
        spacing: { before: 100 },
        children: [
          new TextRun({
            text: `${career.title}`,
            bold: true,
            size: 22,
            font: "Arial",
          }),
          new TextRun({
            text: ` — ${career.description} (${career.salaryRange})`,
            size: 22,
            font: "Arial",
          }),
        ],
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              bottom: 720,
              left: 720,
              right: 720,
            },
          },
        },
        children: sections,
      },
    ],
  });

  return Buffer.from(await Packer.toBuffer(doc));
}

type TeacherGuideContent = {
  standardsUnpacking: {
    standards: Array<{
      code: string;
      fullText: string;
      studentFriendlyLanguage: string;
      assessmentBoundary?: string;
      clarificationStatement?: string;
    }>;
  };
  backgroundContent: {
    overview: string;
    keyConceptsForTeacher: Array<{ concept: string; explanation: string }>;
    commonMisconceptions: Array<{
      misconception: string;
      correction: string;
      teachingTip: string;
    }>;
  };
  facilitationGuide: Array<{
    slideNumber: number;
    slideTitle: string;
    inquiryPhase: string;
    timeEstimate: string;
    whatToSay: string;
    whatToDo: string;
    expectedStudentResponses: string[];
    probeQuestions: string[];
    transitionToNext: string;
  }>;
  answerKey: Array<{
    activityTitle: string;
    answers: Array<{
      question: string;
      expectedResponse: string;
      acceptableVariations?: string[];
    }>;
  }>;
  differentiation: {
    scaffolding: string[];
    extension: string[];
    ell: string[];
    specialEducation: string[];
  };
  assessmentGuidance: {
    formative: string[];
    summative: string[];
  };
};

export async function buildTeacherGuide(
  content: TeacherGuideContent,
  unitTitle: string,
  gradeLevel: string
): Promise<Buffer> {
  const sections: Paragraph[] = [];

  // Cover
  sections.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 600, after: 200 },
      children: [
        new TextRun({
          text: unitTitle,
          bold: true,
          size: 44,
          color: PRIMARY_COLOR,
          font: "Arial",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({
          text: "Teacher's Guide",
          size: 28,
          color: "666666",
          font: "Arial",
        }),
      ],
    })
  );

  // Standards Unpacking
  sections.push(sectionHeader("Standards Unpacking"));
  for (const std of content.standardsUnpacking.standards) {
    sections.push(subHeader(std.code));
    sections.push(bodyText(std.fullText));
    sections.push(
      new Paragraph({
        spacing: { before: 100 },
        children: [
          new TextRun({
            text: "Student-Friendly: ",
            bold: true,
            size: 22,
            font: "Arial",
          }),
          new TextRun({
            text: std.studentFriendlyLanguage,
            italics: true,
            size: 22,
            font: "Arial",
          }),
        ],
      })
    );
  }

  // Background Content
  sections.push(sectionHeader("Background Content Knowledge"));
  sections.push(bodyText(content.backgroundContent.overview));
  for (const concept of content.backgroundContent.keyConceptsForTeacher) {
    sections.push(subHeader(concept.concept));
    sections.push(bodyText(concept.explanation));
  }

  // Misconceptions
  sections.push(sectionHeader("Common Misconceptions"));
  for (const m of content.backgroundContent.commonMisconceptions) {
    sections.push(
      new Paragraph({
        spacing: { before: 200 },
        children: [
          new TextRun({
            text: "Misconception: ",
            bold: true,
            color: "DC2626",
            size: 22,
            font: "Arial",
          }),
          new TextRun({ text: m.misconception, size: 22, font: "Arial" }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Correction: ",
            bold: true,
            color: "16A34A",
            size: 22,
            font: "Arial",
          }),
          new TextRun({ text: m.correction, size: 22, font: "Arial" }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Teaching Tip: ",
            bold: true,
            color: PRIMARY_COLOR,
            size: 22,
            font: "Arial",
          }),
          new TextRun({ text: m.teachingTip, size: 22, font: "Arial" }),
        ],
      })
    );
  }

  // Facilitation Guide
  sections.push(sectionHeader("Slide-by-Slide Facilitation Guide"));
  for (const slide of content.facilitationGuide) {
    sections.push(
      subHeader(
        `Slide ${slide.slideNumber}: ${slide.slideTitle} (${slide.timeEstimate})`
      )
    );
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Phase: ${slide.inquiryPhase}`,
            italics: true,
            size: 20,
            color: "666666",
            font: "Arial",
          }),
        ],
      })
    );
    sections.push(
      new Paragraph({
        spacing: { before: 100 },
        children: [
          new TextRun({
            text: "What to Say: ",
            bold: true,
            size: 22,
            font: "Arial",
          }),
          new TextRun({ text: slide.whatToSay, size: 22, font: "Arial" }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "What to Do: ",
            bold: true,
            size: 22,
            font: "Arial",
          }),
          new TextRun({ text: slide.whatToDo, size: 22, font: "Arial" }),
        ],
      })
    );
    if (slide.probeQuestions.length > 0) {
      sections.push(
        new Paragraph({
          spacing: { before: 100 },
          children: [
            new TextRun({
              text: "Probe Questions:",
              bold: true,
              size: 22,
              font: "Arial",
            }),
          ],
        })
      );
      for (const q of slide.probeQuestions) {
        sections.push(
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({
                text: q,
                italics: true,
                size: 22,
                font: "Arial",
              }),
            ],
          })
        );
      }
    }
  }

  // Answer Key
  sections.push(sectionHeader("Answer Key"));
  for (const activity of content.answerKey) {
    sections.push(subHeader(activity.activityTitle));
    for (const answer of activity.answers) {
      sections.push(
        new Paragraph({
          spacing: { before: 100 },
          children: [
            new TextRun({
              text: `Q: ${answer.question}`,
              bold: true,
              size: 22,
              font: "Arial",
            }),
          ],
        }),
        new Paragraph({
          indent: { left: 200 },
          children: [
            new TextRun({
              text: `A: ${answer.expectedResponse}`,
              size: 22,
              color: "16A34A",
              font: "Arial",
            }),
          ],
        })
      );
    }
  }

  // Differentiation
  sections.push(sectionHeader("Differentiation Strategies"));
  const diffSections = [
    { title: "Scaffolding (Struggling Learners)", items: content.differentiation.scaffolding },
    { title: "Extension (Advanced Learners)", items: content.differentiation.extension },
    { title: "English Language Learners", items: content.differentiation.ell },
    { title: "Special Education / IEP Accommodations", items: content.differentiation.specialEducation },
  ];
  for (const diff of diffSections) {
    sections.push(subHeader(diff.title));
    for (const item of diff.items) {
      sections.push(
        new Paragraph({
          bullet: { level: 0 },
          children: [new TextRun({ text: item, size: 22, font: "Arial" })],
        })
      );
    }
  }

  // Assessment Guidance
  sections.push(sectionHeader("Assessment Guidance"));
  sections.push(subHeader("Formative Assessment"));
  for (const item of content.assessmentGuidance.formative) {
    sections.push(
      new Paragraph({
        bullet: { level: 0 },
        children: [new TextRun({ text: item, size: 22, font: "Arial" })],
      })
    );
  }
  sections.push(subHeader("Summative Assessment"));
  for (const item of content.assessmentGuidance.summative) {
    sections.push(
      new Paragraph({
        bullet: { level: 0 },
        children: [new TextRun({ text: item, size: 22, font: "Arial" })],
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, bottom: 720, left: 720, right: 720 },
          },
        },
        children: sections,
      },
    ],
  });

  return Buffer.from(await Packer.toBuffer(doc));
}
