/**
 * Standards Database Seeding Script
 *
 * This script seeds the standards database with education standards from:
 * - US Common Core ELA (K-12)
 * - US Common Core Math (K-12)
 * - NGSS (Next Generation Science Standards)
 * - US Social Studies (C3 Framework)
 * - UK National Curriculum (Key Stages 1-4)
 * - Australian Curriculum (ACARA)
 * - IB PYP / IB MYP
 *
 * For full state-specific standards (all 50 US states), additional
 * seed files can be added per state in scripts/standards/us-states/
 *
 * Run: bun run scripts/seed-standards.ts
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

type StandardSeed = {
  code: string;
  description: string;
  gradeLevel: string;
  keywords: string[];
  disciplinaryCoreIdeas?: string[];
  scienceEngineeringPractices?: string[];
  crosscuttingConcepts?: string[];
};

type ClusterSeed = {
  code: string;
  name: string;
  gradeLevel: string;
  standards: StandardSeed[];
};

type DomainSeed = {
  code: string;
  name: string;
  description?: string;
  clusters: ClusterSeed[];
};

type FrameworkSeed = {
  code: string;
  name: string;
  country: string;
  region?: string;
  version?: string;
  domains: DomainSeed[];
};

async function seedFramework(fw: FrameworkSeed) {
  console.log(`Seeding framework: ${fw.name}...`);

  // Upsert framework
  const [framework] = await db
    .insert(schema.standardsFrameworks)
    .values({
      code: fw.code,
      name: fw.name,
      country: fw.country,
      region: fw.region,
      version: fw.version,
    })
    .onConflictDoUpdate({
      target: schema.standardsFrameworks.code,
      set: { name: fw.name, country: fw.country, version: fw.version },
    })
    .returning();

  let standardCount = 0;

  for (const [domIdx, dom] of fw.domains.entries()) {
    const [domain] = await db
      .insert(schema.standardsDomains)
      .values({
        frameworkId: framework.id,
        code: dom.code,
        name: dom.name,
        description: dom.description,
        sortOrder: domIdx,
      })
      .returning();

    for (const [cluIdx, clu] of dom.clusters.entries()) {
      const [cluster] = await db
        .insert(schema.standardsClusters)
        .values({
          domainId: domain.id,
          code: clu.code,
          name: clu.name,
          gradeLevel: clu.gradeLevel,
          sortOrder: cluIdx,
        })
        .returning();

      for (const std of clu.standards) {
        await db.insert(schema.standards).values({
          clusterId: cluster.id,
          code: std.code,
          description: std.description,
          gradeLevel: std.gradeLevel,
          keywords: std.keywords,
          disciplinaryCoreIdeas: std.disciplinaryCoreIdeas,
          scienceEngineeringPractices: std.scienceEngineeringPractices,
          crosscuttingConcepts: std.crosscuttingConcepts,
        });
        standardCount++;
      }
    }
  }

  console.log(
    `  -> ${fw.name}: ${standardCount} standards seeded across ${fw.domains.length} domains`
  );
}

// ============================================================================
// US COMMON CORE ELA (Representative sample - full set has 1000+ standards)
// ============================================================================
const COMMON_CORE_ELA: FrameworkSeed = {
  code: "common_core_ela",
  name: "Common Core State Standards - English Language Arts",
  country: "US",
  version: "2010",
  domains: [
    {
      code: "RL",
      name: "Reading: Literature",
      description: "Key Ideas and Details, Craft and Structure, Integration of Knowledge, Range of Reading",
      clusters: [
        {
          code: "RL.K", name: "Reading Literature - Kindergarten", gradeLevel: "K",
          standards: [
            { code: "RL.K.1", description: "With prompting and support, ask and answer questions about key details in a text.", gradeLevel: "K", keywords: ["reading", "literature", "questions", "key details"] },
            { code: "RL.K.2", description: "With prompting and support, retell familiar stories, including key details.", gradeLevel: "K", keywords: ["reading", "retell", "stories", "key details"] },
            { code: "RL.K.3", description: "With prompting and support, identify characters, settings, and major events in a story.", gradeLevel: "K", keywords: ["reading", "characters", "settings", "events"] },
          ],
        },
        {
          code: "RL.3", name: "Reading Literature - Grade 3", gradeLevel: "3",
          standards: [
            { code: "RL.3.1", description: "Ask and answer questions to demonstrate understanding of a text, referring explicitly to the text as the basis for the answers.", gradeLevel: "3", keywords: ["reading", "questions", "text evidence", "comprehension"] },
            { code: "RL.3.2", description: "Recount stories, including fables, folktales, and myths from diverse cultures; determine the central message, lesson, or moral and explain how it is conveyed through key details in the text.", gradeLevel: "3", keywords: ["reading", "stories", "central message", "cultures", "moral"] },
            { code: "RL.3.3", description: "Describe characters in a story (e.g., their traits, motivations, or feelings) and explain how their actions contribute to the sequence of events.", gradeLevel: "3", keywords: ["reading", "characters", "traits", "motivations", "sequence"] },
          ],
        },
        {
          code: "RL.5", name: "Reading Literature - Grade 5", gradeLevel: "5",
          standards: [
            { code: "RL.5.1", description: "Quote accurately from a text and draw inferences from the text when explaining what the text says explicitly and when drawing inferences from the text.", gradeLevel: "5", keywords: ["reading", "quote", "inferences", "text evidence"] },
            { code: "RL.5.2", description: "Determine a theme of a story, drama, or poem from details in the text, including how characters in a story or drama respond to challenges or how the speaker in a poem reflects upon a topic; summarize the text.", gradeLevel: "5", keywords: ["reading", "theme", "summarize", "story", "drama", "poem"] },
            { code: "RL.5.3", description: "Compare and contrast two or more characters, settings, or events in a story or drama, drawing on specific details in the text.", gradeLevel: "5", keywords: ["reading", "compare", "contrast", "characters", "settings", "events"] },
          ],
        },
        {
          code: "RL.8", name: "Reading Literature - Grade 8", gradeLevel: "8",
          standards: [
            { code: "RL.8.1", description: "Cite the textual evidence that most strongly supports an analysis of what the text says explicitly as well as inferences drawn from the text.", gradeLevel: "8", keywords: ["reading", "textual evidence", "analysis", "inferences"] },
            { code: "RL.8.2", description: "Determine a theme or central idea of a text and analyze its development over the course of the text, including its relationship to the characters, setting, and plot; provide an objective summary of the text.", gradeLevel: "8", keywords: ["reading", "theme", "central idea", "development", "summary"] },
          ],
        },
      ],
    },
    {
      code: "W",
      name: "Writing",
      description: "Text Types and Purposes, Production and Distribution, Research, Range of Writing",
      clusters: [
        {
          code: "W.3", name: "Writing - Grade 3", gradeLevel: "3",
          standards: [
            { code: "W.3.1", description: "Write opinion pieces on topics or texts, supporting a point of view with reasons.", gradeLevel: "3", keywords: ["writing", "opinion", "point of view", "reasons"] },
            { code: "W.3.2", description: "Write informative/explanatory texts to examine a topic and convey ideas and information clearly.", gradeLevel: "3", keywords: ["writing", "informative", "explanatory", "topic"] },
            { code: "W.3.3", description: "Write narratives to develop real or imagined experiences or events using effective technique, descriptive details, and clear event sequences.", gradeLevel: "3", keywords: ["writing", "narrative", "descriptive", "sequence"] },
          ],
        },
        {
          code: "W.5", name: "Writing - Grade 5", gradeLevel: "5",
          standards: [
            { code: "W.5.1", description: "Write opinion pieces on topics or texts, supporting a point of view with reasons and information.", gradeLevel: "5", keywords: ["writing", "opinion", "reasons", "information"] },
            { code: "W.5.2", description: "Write informative/explanatory texts to examine a topic and convey ideas and information clearly.", gradeLevel: "5", keywords: ["writing", "informative", "explanatory"] },
            { code: "W.5.3", description: "Write narratives to develop real or imagined experiences or events using effective technique, descriptive details, and clear event sequences.", gradeLevel: "5", keywords: ["writing", "narrative", "technique", "details"] },
          ],
        },
      ],
    },
    {
      code: "SL",
      name: "Speaking & Listening",
      description: "Comprehension and Collaboration, Presentation of Knowledge and Ideas",
      clusters: [
        {
          code: "SL.5", name: "Speaking & Listening - Grade 5", gradeLevel: "5",
          standards: [
            { code: "SL.5.1", description: "Engage effectively in a range of collaborative discussions with diverse partners on grade 5 topics and texts, building on others' ideas and expressing their own clearly.", gradeLevel: "5", keywords: ["speaking", "listening", "collaborative", "discussion"] },
            { code: "SL.5.4", description: "Report on a topic or text or present an opinion, sequencing ideas logically and using appropriate facts and relevant, descriptive details to support main ideas or themes; speak clearly at an understandable pace.", gradeLevel: "5", keywords: ["speaking", "present", "report", "opinion"] },
          ],
        },
      ],
    },
  ],
};

// ============================================================================
// US COMMON CORE MATH (Representative sample)
// ============================================================================
const COMMON_CORE_MATH: FrameworkSeed = {
  code: "common_core_math",
  name: "Common Core State Standards - Mathematics",
  country: "US",
  version: "2010",
  domains: [
    {
      code: "OA",
      name: "Operations & Algebraic Thinking",
      clusters: [
        {
          code: "3.OA", name: "Operations & Algebraic Thinking - Grade 3", gradeLevel: "3",
          standards: [
            { code: "3.OA.A.1", description: "Interpret products of whole numbers, e.g., interpret 5 × 7 as the total number of objects in 5 groups of 7 objects each.", gradeLevel: "3", keywords: ["multiplication", "products", "groups", "arrays"] },
            { code: "3.OA.A.2", description: "Interpret whole-number quotients of whole numbers, e.g., interpret 56 ÷ 8 as the number of objects in each share when 56 objects are partitioned equally into 8 shares.", gradeLevel: "3", keywords: ["division", "quotients", "equal shares", "partition"] },
            { code: "3.OA.A.3", description: "Use multiplication and division within 100 to solve word problems in situations involving equal groups, arrays, and measurement quantities.", gradeLevel: "3", keywords: ["multiplication", "division", "word problems", "equal groups"] },
            { code: "3.OA.A.4", description: "Determine the unknown whole number in a multiplication or division equation relating three whole numbers.", gradeLevel: "3", keywords: ["unknown", "equation", "multiplication", "division"] },
          ],
        },
        {
          code: "5.OA", name: "Operations & Algebraic Thinking - Grade 5", gradeLevel: "5",
          standards: [
            { code: "5.OA.A.1", description: "Use parentheses, brackets, or braces in numerical expressions, and evaluate expressions with these symbols.", gradeLevel: "5", keywords: ["parentheses", "brackets", "expressions", "order of operations"] },
            { code: "5.OA.A.2", description: "Write simple expressions that record calculations with numbers, and interpret numerical expressions without evaluating them.", gradeLevel: "5", keywords: ["expressions", "calculations", "interpret"] },
          ],
        },
      ],
    },
    {
      code: "NF",
      name: "Number & Operations - Fractions",
      clusters: [
        {
          code: "3.NF", name: "Fractions - Grade 3", gradeLevel: "3",
          standards: [
            { code: "3.NF.A.1", description: "Understand a fraction 1/b as the quantity formed by 1 part when a whole is partitioned into b equal parts; understand a fraction a/b as the quantity formed by a parts of size 1/b.", gradeLevel: "3", keywords: ["fractions", "numerator", "denominator", "parts", "whole"] },
            { code: "3.NF.A.2", description: "Understand a fraction as a number on the number line; represent fractions on a number line diagram.", gradeLevel: "3", keywords: ["fractions", "number line", "represent"] },
          ],
        },
        {
          code: "5.NF", name: "Fractions - Grade 5", gradeLevel: "5",
          standards: [
            { code: "5.NF.A.1", description: "Add and subtract fractions with unlike denominators (including mixed numbers) by replacing given fractions with equivalent fractions.", gradeLevel: "5", keywords: ["fractions", "add", "subtract", "unlike denominators", "equivalent"] },
            { code: "5.NF.B.3", description: "Interpret a fraction as division of the numerator by the denominator (a/b = a ÷ b). Solve word problems involving division of whole numbers leading to answers in the form of fractions or mixed numbers.", gradeLevel: "5", keywords: ["fractions", "division", "word problems", "mixed numbers"] },
          ],
        },
      ],
    },
    {
      code: "G",
      name: "Geometry",
      clusters: [
        {
          code: "5.G", name: "Geometry - Grade 5", gradeLevel: "5",
          standards: [
            { code: "5.G.A.1", description: "Use a pair of perpendicular number lines, called axes, to define a coordinate system, with the intersection of the lines arranged to coincide with the 0 on each line and a given point in the plane located by using an ordered pair of numbers.", gradeLevel: "5", keywords: ["geometry", "coordinate", "axes", "ordered pair", "plane"] },
            { code: "5.G.B.3", description: "Understand that attributes belonging to a category of two-dimensional figures also belong to all subcategories of that category.", gradeLevel: "5", keywords: ["geometry", "attributes", "categories", "two-dimensional", "figures"] },
          ],
        },
        {
          code: "8.G", name: "Geometry - Grade 8", gradeLevel: "8",
          standards: [
            { code: "8.G.A.1", description: "Verify experimentally the properties of rotations, reflections, and translations.", gradeLevel: "8", keywords: ["geometry", "transformations", "rotation", "reflection", "translation"] },
            { code: "8.G.B.6", description: "Explain a proof of the Pythagorean Theorem and its converse.", gradeLevel: "8", keywords: ["geometry", "pythagorean theorem", "proof", "right triangle"] },
            { code: "8.G.B.7", description: "Apply the Pythagorean Theorem to determine unknown side lengths in right triangles in real-world and mathematical problems in two and three dimensions.", gradeLevel: "8", keywords: ["pythagorean theorem", "right triangle", "side lengths", "real-world"] },
          ],
        },
      ],
    },
  ],
};

// ============================================================================
// NGSS (Next Generation Science Standards)
// ============================================================================
const NGSS: FrameworkSeed = {
  code: "ngss",
  name: "Next Generation Science Standards",
  country: "US",
  version: "2013",
  domains: [
    {
      code: "PS",
      name: "Physical Science",
      description: "Matter, forces, energy, waves",
      clusters: [
        {
          code: "5-PS", name: "Physical Science - Grade 5", gradeLevel: "5",
          standards: [
            { code: "5-PS1-1", description: "Develop a model to describe that matter is made of particles too small to be seen.", gradeLevel: "5", keywords: ["matter", "particles", "model"], disciplinaryCoreIdeas: ["PS1.A"], scienceEngineeringPractices: ["Developing and Using Models"], crosscuttingConcepts: ["Scale, Proportion, and Quantity"] },
            { code: "5-PS1-2", description: "Measure and graph quantities to provide evidence that regardless of the type of change that occurs when heating, cooling, or mixing substances, the total weight of matter is conserved.", gradeLevel: "5", keywords: ["matter", "conservation", "weight", "heating", "cooling"], disciplinaryCoreIdeas: ["PS1.A", "PS1.B"], scienceEngineeringPractices: ["Using Mathematics and Computational Thinking"], crosscuttingConcepts: ["Scale, Proportion, and Quantity"] },
            { code: "5-PS1-3", description: "Make observations and measurements to identify materials based on their properties.", gradeLevel: "5", keywords: ["matter", "properties", "materials", "observations"], disciplinaryCoreIdeas: ["PS1.A"], scienceEngineeringPractices: ["Planning and Carrying Out Investigations"], crosscuttingConcepts: ["Scale, Proportion, and Quantity"] },
            { code: "5-PS1-4", description: "Conduct an investigation to determine whether the mixing of two or more substances results in new substances.", gradeLevel: "5", keywords: ["matter", "mixing", "substances", "chemical change"], disciplinaryCoreIdeas: ["PS1.B"], scienceEngineeringPractices: ["Planning and Carrying Out Investigations"], crosscuttingConcepts: ["Cause and Effect"] },
            { code: "5-PS3-1", description: "Use models to describe that energy in animals' food (used for body repair, growth, motion, and to maintain body warmth) was once energy from the sun.", gradeLevel: "5", keywords: ["energy", "food", "sun", "model"], disciplinaryCoreIdeas: ["PS3.D", "LS1.C"], scienceEngineeringPractices: ["Developing and Using Models"], crosscuttingConcepts: ["Energy and Matter"] },
          ],
        },
        {
          code: "MS-PS", name: "Physical Science - Middle School", gradeLevel: "6-8",
          standards: [
            { code: "MS-PS1-1", description: "Develop models to describe the atomic composition of simple molecules and extended structures.", gradeLevel: "6-8", keywords: ["atoms", "molecules", "models", "structure"], disciplinaryCoreIdeas: ["PS1.A"], scienceEngineeringPractices: ["Developing and Using Models"], crosscuttingConcepts: ["Scale, Proportion, and Quantity"] },
            { code: "MS-PS1-2", description: "Analyze and interpret data on the properties of substances before and after the substances interact to determine if a chemical reaction has occurred.", gradeLevel: "6-8", keywords: ["chemical reaction", "properties", "substances", "data"], disciplinaryCoreIdeas: ["PS1.A", "PS1.B"], scienceEngineeringPractices: ["Analyzing and Interpreting Data"], crosscuttingConcepts: ["Patterns"] },
            { code: "MS-PS2-1", description: "Apply Newton's Third Law to design a solution to a problem involving the motion of two colliding objects.", gradeLevel: "6-8", keywords: ["Newton", "force", "motion", "collision", "engineering"], disciplinaryCoreIdeas: ["PS2.A"], scienceEngineeringPractices: ["Constructing Explanations and Designing Solutions"], crosscuttingConcepts: ["Systems and System Models"] },
          ],
        },
      ],
    },
    {
      code: "LS",
      name: "Life Science",
      description: "Ecosystems, heredity, evolution, organisms",
      clusters: [
        {
          code: "5-LS", name: "Life Science - Grade 5", gradeLevel: "5",
          standards: [
            { code: "5-LS1-1", description: "Support an argument that plants get the materials they need for growth chiefly from air and water.", gradeLevel: "5", keywords: ["plants", "growth", "air", "water", "photosynthesis"], disciplinaryCoreIdeas: ["LS1.C"], scienceEngineeringPractices: ["Engaging in Argument from Evidence"], crosscuttingConcepts: ["Energy and Matter"] },
            { code: "5-LS2-1", description: "Develop a model to describe the movement of matter among plants, animals, decomposers, and the environment.", gradeLevel: "5", keywords: ["matter cycling", "ecosystem", "decomposers", "food web"], disciplinaryCoreIdeas: ["LS2.A", "LS2.B"], scienceEngineeringPractices: ["Developing and Using Models"], crosscuttingConcepts: ["Systems and System Models"] },
          ],
        },
        {
          code: "MS-LS", name: "Life Science - Middle School", gradeLevel: "6-8",
          standards: [
            { code: "MS-LS1-1", description: "Conduct an investigation to provide evidence that living things are made of cells; either one cell or many different numbers and types of cells.", gradeLevel: "6-8", keywords: ["cells", "organisms", "investigation"], disciplinaryCoreIdeas: ["LS1.A"], scienceEngineeringPractices: ["Planning and Carrying Out Investigations"], crosscuttingConcepts: ["Scale, Proportion, and Quantity"] },
            { code: "MS-LS2-1", description: "Analyze and interpret data to provide evidence for the effects of resource availability on organisms and populations of organisms in an ecosystem.", gradeLevel: "6-8", keywords: ["ecosystem", "resources", "populations", "data"], disciplinaryCoreIdeas: ["LS2.A"], scienceEngineeringPractices: ["Analyzing and Interpreting Data"], crosscuttingConcepts: ["Cause and Effect"] },
            { code: "MS-LS4-4", description: "Construct an explanation based on evidence that describes how genetic variations of traits in a population increase some individuals' probability of surviving and reproducing in a specific environment.", gradeLevel: "6-8", keywords: ["evolution", "natural selection", "genetic variation", "survival"], disciplinaryCoreIdeas: ["LS4.B"], scienceEngineeringPractices: ["Constructing Explanations and Designing Solutions"], crosscuttingConcepts: ["Cause and Effect"] },
          ],
        },
      ],
    },
    {
      code: "ESS",
      name: "Earth and Space Science",
      description: "Earth systems, weather, climate, space",
      clusters: [
        {
          code: "5-ESS", name: "Earth and Space Science - Grade 5", gradeLevel: "5",
          standards: [
            { code: "5-ESS1-1", description: "Support an argument that differences in the apparent brightness of the sun compared to other stars is due to their relative distances from Earth.", gradeLevel: "5", keywords: ["stars", "brightness", "distance", "sun"], disciplinaryCoreIdeas: ["ESS1.A"], scienceEngineeringPractices: ["Engaging in Argument from Evidence"], crosscuttingConcepts: ["Scale, Proportion, and Quantity"] },
            { code: "5-ESS2-1", description: "Develop a model using an example to describe ways the geosphere, biosphere, hydrosphere, and/or atmosphere interact.", gradeLevel: "5", keywords: ["earth systems", "geosphere", "biosphere", "hydrosphere", "atmosphere"], disciplinaryCoreIdeas: ["ESS2.A"], scienceEngineeringPractices: ["Developing and Using Models"], crosscuttingConcepts: ["Systems and System Models"] },
            { code: "5-ESS2-2", description: "Describe and graph the amounts of salt water and fresh water in various reservoirs to provide evidence about the distribution of water on Earth.", gradeLevel: "5", keywords: ["water", "salt water", "fresh water", "distribution", "graph"], disciplinaryCoreIdeas: ["ESS2.C"], scienceEngineeringPractices: ["Using Mathematics and Computational Thinking"], crosscuttingConcepts: ["Scale, Proportion, and Quantity"] },
          ],
        },
      ],
    },
  ],
};

// ============================================================================
// US SOCIAL STUDIES - C3 FRAMEWORK (College, Career, and Civic Life)
// ============================================================================
const C3_SOCIAL_STUDIES: FrameworkSeed = {
  code: "c3_social_studies",
  name: "C3 Framework for Social Studies State Standards",
  country: "US",
  version: "2013",
  domains: [
    {
      code: "CIV",
      name: "Civics",
      description: "Civic and political institutions, participation, processes",
      clusters: [
        {
          code: "D2.Civ.3-5", name: "Civics - Grades 3-5", gradeLevel: "3-5",
          standards: [
            { code: "D2.Civ.1.3-5", description: "Distinguish the responsibilities and powers of government officials at various levels and branches of government and in different times and places.", gradeLevel: "3-5", keywords: ["government", "powers", "branches", "officials"] },
            { code: "D2.Civ.2.3-5", description: "Explain how a democracy relies on people's responsible participation, and draw implications for how individuals should participate.", gradeLevel: "3-5", keywords: ["democracy", "participation", "civic duty"] },
          ],
        },
        {
          code: "D2.Civ.6-8", name: "Civics - Grades 6-8", gradeLevel: "6-8",
          standards: [
            { code: "D2.Civ.1.6-8", description: "Distinguish the powers and responsibilities of citizens, political parties, interest groups, and the media in a variety of governmental and nongovernmental contexts.", gradeLevel: "6-8", keywords: ["citizens", "political parties", "interest groups", "media"] },
            { code: "D2.Civ.6.6-8", description: "Describe the roles of political, civil, and economic organizations in shaping people's lives and policies.", gradeLevel: "6-8", keywords: ["organizations", "policies", "civic life"] },
          ],
        },
      ],
    },
    {
      code: "ECO",
      name: "Economics",
      description: "Economic decision making, exchange, markets, economy",
      clusters: [
        {
          code: "D2.Eco.3-5", name: "Economics - Grades 3-5", gradeLevel: "3-5",
          standards: [
            { code: "D2.Eco.1.3-5", description: "Compare the benefits and costs of individual choices.", gradeLevel: "3-5", keywords: ["economics", "benefits", "costs", "choices", "trade-offs"] },
            { code: "D2.Eco.6.3-5", description: "Explain the relationship between investment in human capital, productivity, and future incomes.", gradeLevel: "3-5", keywords: ["economics", "human capital", "productivity", "income"] },
          ],
        },
      ],
    },
    {
      code: "GEO",
      name: "Geography",
      description: "Spatial views, places, regions, human-environment interaction",
      clusters: [
        {
          code: "D2.Geo.3-5", name: "Geography - Grades 3-5", gradeLevel: "3-5",
          standards: [
            { code: "D2.Geo.1.3-5", description: "Construct maps and other graphic representations of both familiar and unfamiliar places.", gradeLevel: "3-5", keywords: ["geography", "maps", "graphic representations", "places"] },
            { code: "D2.Geo.4.3-5", description: "Explain how culture influences the way people modify and adapt to their environments.", gradeLevel: "3-5", keywords: ["geography", "culture", "environment", "adaptation"] },
          ],
        },
      ],
    },
    {
      code: "HIS",
      name: "History",
      description: "Change and continuity, perspectives, historical sources",
      clusters: [
        {
          code: "D2.His.3-5", name: "History - Grades 3-5", gradeLevel: "3-5",
          standards: [
            { code: "D2.His.1.3-5", description: "Create and use a chronological sequence of related events to compare developments that happened at the same time.", gradeLevel: "3-5", keywords: ["history", "chronological", "sequence", "events", "compare"] },
            { code: "D2.His.3.3-5", description: "Generate questions about individuals and groups who have shaped significant historical changes and continuities.", gradeLevel: "3-5", keywords: ["history", "individuals", "groups", "change", "continuity"] },
          ],
        },
      ],
    },
  ],
};

// ============================================================================
// UK NATIONAL CURRICULUM (Representative sample)
// ============================================================================
const UK_NATIONAL: FrameworkSeed = {
  code: "uk_national",
  name: "UK National Curriculum",
  country: "GB",
  version: "2014",
  domains: [
    {
      code: "UK-SCI",
      name: "Science",
      description: "Working Scientifically, Biology, Chemistry, Physics",
      clusters: [
        {
          code: "UK-SCI-KS2", name: "Science - Key Stage 2 (Years 3-6)", gradeLevel: "KS2",
          standards: [
            { code: "UK-SCI-KS2-WS", description: "Pupils should be taught to plan different types of scientific enquiries to answer questions, including recognising and controlling variables where necessary.", gradeLevel: "KS2", keywords: ["science", "enquiry", "variables", "investigation", "working scientifically"] },
            { code: "UK-SCI-KS2-LT1", description: "Identify and describe the functions of different parts of flowering plants: roots, stem/trunk, leaves and flowers.", gradeLevel: "KS2", keywords: ["science", "plants", "roots", "stem", "leaves", "flowers", "biology"] },
            { code: "UK-SCI-KS2-PR1", description: "Identify common appliances that run on electricity and construct a simple series electrical circuit.", gradeLevel: "KS2", keywords: ["science", "electricity", "circuit", "appliances", "physics"] },
          ],
        },
        {
          code: "UK-SCI-KS3", name: "Science - Key Stage 3 (Years 7-9)", gradeLevel: "KS3",
          standards: [
            { code: "UK-SCI-KS3-BIO1", description: "Structure and function of living organisms: cells and organisation, the skeletal and muscular systems, nutrition and digestion, gas exchange systems, reproduction.", gradeLevel: "KS3", keywords: ["biology", "cells", "skeletal", "digestion", "reproduction"] },
            { code: "UK-SCI-KS3-CHE1", description: "The particulate nature of matter: the properties of the different states of matter (solid, liquid and gas) in terms of the particle model.", gradeLevel: "KS3", keywords: ["chemistry", "particles", "states of matter", "solid", "liquid", "gas"] },
          ],
        },
      ],
    },
    {
      code: "UK-MAT",
      name: "Mathematics",
      description: "Number, Measurement, Geometry, Statistics",
      clusters: [
        {
          code: "UK-MAT-KS2", name: "Mathematics - Key Stage 2 (Years 3-6)", gradeLevel: "KS2",
          standards: [
            { code: "UK-MAT-KS2-N1", description: "Read, write, order and compare numbers to at least 1,000,000 and determine the value of each digit.", gradeLevel: "KS2", keywords: ["mathematics", "place value", "numbers", "compare", "order"] },
            { code: "UK-MAT-KS2-F1", description: "Compare and order fractions whose denominators are all multiples of the same number.", gradeLevel: "KS2", keywords: ["mathematics", "fractions", "compare", "order", "denominators"] },
            { code: "UK-MAT-KS2-G1", description: "Identify 3-D shapes, including cubes and other cuboids, from 2-D representations.", gradeLevel: "KS2", keywords: ["mathematics", "geometry", "3D shapes", "cubes", "representations"] },
          ],
        },
      ],
    },
    {
      code: "UK-ENG",
      name: "English",
      description: "Reading, Writing, Spoken Language, Grammar",
      clusters: [
        {
          code: "UK-ENG-KS2", name: "English - Key Stage 2 (Years 3-6)", gradeLevel: "KS2",
          standards: [
            { code: "UK-ENG-KS2-R1", description: "Apply their growing knowledge of root words, prefixes and suffixes, both to read aloud and to understand the meaning of new words they meet.", gradeLevel: "KS2", keywords: ["english", "reading", "root words", "prefixes", "suffixes", "vocabulary"] },
            { code: "UK-ENG-KS2-W1", description: "Plan their writing by identifying the audience for and purpose of the writing, selecting the appropriate form.", gradeLevel: "KS2", keywords: ["english", "writing", "audience", "purpose", "planning"] },
          ],
        },
      ],
    },
  ],
};

// ============================================================================
// AUSTRALIAN CURRICULUM (ACARA v9.0 - Representative sample)
// ============================================================================
const AUSTRALIAN_CURRICULUM: FrameworkSeed = {
  code: "acara",
  name: "Australian Curriculum (ACARA v9.0)",
  country: "AU",
  version: "9.0",
  domains: [
    {
      code: "AU-SCI",
      name: "Science",
      description: "Science Understanding, Science as a Human Endeavour, Science Inquiry Skills",
      clusters: [
        {
          code: "AU-SCI-5-6", name: "Science - Years 5-6", gradeLevel: "5-6",
          standards: [
            { code: "AC9S5U01", description: "Investigate how solids, liquids and gases change when heated and cooled, including explaining observable changes using the particle model.", gradeLevel: "5-6", keywords: ["science", "states of matter", "heating", "cooling", "particle model"] },
            { code: "AC9S6U01", description: "Investigate the transfer and transformation of energy, including from one form to another.", gradeLevel: "5-6", keywords: ["science", "energy", "transfer", "transformation"] },
          ],
        },
      ],
    },
    {
      code: "AU-MAT",
      name: "Mathematics",
      description: "Number, Algebra, Measurement, Space, Statistics, Probability",
      clusters: [
        {
          code: "AU-MAT-5-6", name: "Mathematics - Years 5-6", gradeLevel: "5-6",
          standards: [
            { code: "AC9M5N01", description: "Interpret, compare and order numbers with more than 2 decimal places, including those greater than one, using place value understanding.", gradeLevel: "5-6", keywords: ["mathematics", "decimals", "place value", "compare", "order"] },
            { code: "AC9M6A01", description: "Recognise and use rules that generate visually growing patterns and number patterns involving rational numbers.", gradeLevel: "5-6", keywords: ["mathematics", "patterns", "algebra", "rational numbers"] },
          ],
        },
      ],
    },
  ],
};

// ============================================================================
// SEED INQUIRY MODEL TEMPLATES
// ============================================================================
async function seedInquiryModels() {
  console.log("Seeding inquiry model templates...");

  const models = [
    {
      code: "five_e",
      name: "5E Instructional Model",
      description: "Engage, Explore, Explain, Elaborate, Evaluate - a research-based constructivist model by BSCS.",
      phases: [
        { name: "Engage", description: "Activate prior knowledge, spark curiosity", promptGuidance: "Create a compelling hook", order: 1 },
        { name: "Explore", description: "Hands-on investigation and data collection", promptGuidance: "Design student-centered investigation", order: 2 },
        { name: "Explain", description: "Formal concepts and vocabulary introduction", promptGuidance: "Transition from student ideas to formal explanations", order: 3 },
        { name: "Elaborate", description: "Apply understanding to new contexts", promptGuidance: "Challenge students with transfer activities", order: 4 },
        { name: "Evaluate", description: "Assess understanding, self-reflection", promptGuidance: "Create three-dimensional assessments", order: 5 },
      ],
      unitStructure: { slideCount: 10, activitySections: ["Pre-Assessment", "Engage", "Explore", "Explain", "Elaborate", "Evaluate", "STEM Challenge"], teacherGuideSections: ["Standards Unpacking", "Background Content", "5E Overview", "Facilitation Guide", "Answer Key", "Differentiation", "Misconceptions"] },
    },
    {
      code: "kath_murdoch",
      name: "Kath Murdoch Inquiry Cycle",
      description: "IB PYP-aligned inquiry cycle: Tuning In, Finding Out, Sorting Out, Going Further, Making Conclusions, Taking Action. Used globally in IB and Australian schools.",
      phases: [
        { name: "Tuning In", description: "Activate prior knowledge, surface curiosities and misconceptions", promptGuidance: "Use thinking routines (See-Think-Wonder, Chalk Talk) to surface prior knowledge", order: 1 },
        { name: "Finding Out", description: "Gather information through investigation and research", promptGuidance: "Design structured investigations with data collection", order: 2 },
        { name: "Sorting Out", description: "Analyze, organize, and make meaning from information", promptGuidance: "Use graphic organizers, classification, and pattern-finding", order: 3 },
        { name: "Going Further", description: "Deepen understanding through new perspectives and transfer", promptGuidance: "Introduce complexity, alternative viewpoints, expert connections", order: 4 },
        { name: "Making Conclusions", description: "Synthesize learning and construct evidence-based claims", promptGuidance: "Facilitate CER writing, model revision, synthesis discussions", order: 5 },
        { name: "Taking Action", description: "Apply learning to create meaningful change", promptGuidance: "Design authentic action projects connected to community", order: 6 },
      ],
      unitStructure: { slideCount: 12, activitySections: ["Pre-Assessment", "Tuning In", "Finding Out", "Sorting Out", "Going Further", "Making Conclusions", "Taking Action", "Reflection"], teacherGuideSections: ["Standards Unpacking", "Inquiry Overview", "Background Content", "Facilitation Guide", "Answer Key", "Differentiation", "Assessment", "Action Ideas"] },
    },
    {
      code: "phenomenon_based",
      name: "Phenomenon-Based Learning",
      description: "Begin with a real, observable phenomenon. Students generate questions and build explanatory models.",
      phases: [
        { name: "Anchor Phenomenon", description: "Introduce compelling phenomenon", promptGuidance: "Present observable, grade-appropriate phenomenon", order: 1 },
        { name: "Initial Models & Questions", description: "Students create initial models", promptGuidance: "Have students draw initial explanatory models", order: 2 },
        { name: "Investigation Sequence", description: "Systematic investigations", promptGuidance: "Design 2-3 evidence-building investigations", order: 3 },
        { name: "Sense-Making", description: "Revise models with evidence", promptGuidance: "Create sense-making discussions with CER", order: 4 },
        { name: "Transfer & Application", description: "Apply to related phenomenon", promptGuidance: "Present transfer challenge", order: 5 },
      ],
      unitStructure: { slideCount: 10, activitySections: ["Pre-Assessment", "Phenomenon Observation", "Initial Model", "Driving Questions", "Investigation 1", "Investigation 2", "Model Revision", "CER Writing", "Transfer"], teacherGuideSections: ["Standards Unpacking", "Phenomenon Rationale", "Background Content", "Investigation Guide", "Sense-Making Guide", "Answer Key", "Differentiation", "Assessment"] },
    },
    {
      code: "design_thinking",
      name: "Design Thinking / LAUNCH Cycle",
      description: "Look-Listen-Learn, Ask Questions, Understand, Navigate Ideas, Create, Highlight & Fix.",
      phases: [
        { name: "Look, Listen & Learn", description: "Research and empathize", promptGuidance: "Design empathy research activities", order: 1 },
        { name: "Ask Tons of Questions", description: "Define the problem", promptGuidance: "Use How Might We framing", order: 2 },
        { name: "Navigate Ideas", description: "Brainstorm and evaluate", promptGuidance: "Use structured ideation techniques", order: 3 },
        { name: "Create a Prototype", description: "Build tangible solution", promptGuidance: "Guide rapid prototyping", order: 4 },
        { name: "Highlight & Fix", description: "Test, feedback, iterate", promptGuidance: "Structure testing and feedback sessions", order: 5 },
      ],
      unitStructure: { slideCount: 10, activitySections: ["Pre-Assessment", "Empathy Research", "Problem Definition", "Ideation", "Prototype Plan", "Testing Protocol", "Iteration Log", "Final Reflection"], teacherGuideSections: ["Standards Unpacking", "Challenge Overview", "Materials Prep", "Facilitation Guide", "Feedback Guide", "Rubrics", "Differentiation", "Career Connections"] },
    },
  ];

  for (const model of models) {
    await db
      .insert(schema.inquiryModelTemplates)
      .values(model)
      .onConflictDoUpdate({
        target: schema.inquiryModelTemplates.code,
        set: {
          name: model.name,
          description: model.description,
          phases: model.phases,
          unitStructure: model.unitStructure,
        },
      });
  }

  console.log(`  -> ${models.length} inquiry model templates seeded`);
}

// ============================================================================
// MAIN
// ============================================================================
async function main() {
  console.log("=== InquiryGen Standards Database Seeder ===\n");

  // Seed all frameworks
  await seedFramework(COMMON_CORE_ELA);
  await seedFramework(COMMON_CORE_MATH);
  await seedFramework(NGSS);
  await seedFramework(C3_SOCIAL_STUDIES);
  await seedFramework(UK_NATIONAL);
  await seedFramework(AUSTRALIAN_CURRICULUM);

  // Seed inquiry models
  await seedInquiryModels();

  console.log("\n=== Seeding complete! ===");
  console.log(
    "\nNote: This is an initial seed with representative standards."
  );
  console.log(
    "For full coverage, additional state-specific and international"
  );
  console.log(
    "standards can be added via scripts/standards/ directory."
  );
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
