import { relations, sql } from "drizzle-orm";
import {
  boolean,
  doublePrecision,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

// ============================================================================
// ENUMS
// ============================================================================

export const userRoleEnum = pgEnum("user_role", ["teacher", "admin"]);

export const subscriptionTierEnum = pgEnum("subscription_tier", [
  "free",
  "starter",
  "professional",
  "school",
]);

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "past_due",
  "canceled",
  "trialing",
]);

export const generationStatusEnum = pgEnum("generation_status", [
  "pending",
  "generating",
  "reviewing",
  "completed",
  "failed",
]);

export const inquiryModelEnum = pgEnum("inquiry_model", [
  "five_e",
  "kath_murdoch",
  "phenomenon_based",
  "design_thinking",
  "ib_pyp",
  "ib_myp",
]);

export const standardsFrameworkEnum = pgEnum("standards_framework", [
  "ngss",
  "common_core_ela",
  "common_core_math",
  "c3_social_studies",
  "us_state",
  "uk_national",
  "ib_pyp",
  "ib_myp",
  "acara",
  "custom",
]);

export const creditTransactionTypeEnum = pgEnum("credit_transaction_type", [
  "purchase",
  "subscription_grant",
  "generation_debit",
  "refund",
  "admin_grant",
  "bonus",
]);

export const documentTypeEnum = pgEnum("document_type", [
  "unit_overview",
  "presentation",
  "activity_pack",
  "teacher_guide",
]);

export const aiProviderEnum = pgEnum("ai_provider", [
  "anthropic",
  "openrouter",
  "google",
]);

// ============================================================================
// USERS (synced from Clerk via webhook)
// ============================================================================

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: varchar("email", { length: 320 }).notNull().unique(),
    name: varchar("name", { length: 255 }),
    avatarUrl: text("avatar_url"),
    role: userRoleEnum("role").default("teacher").notNull(),
    country: varchar("country", { length: 2 }),
    state: varchar("state", { length: 100 }),
    defaultFramework: standardsFrameworkEnum("default_framework"),
    defaultGradeLevel: varchar("default_grade_level", { length: 20 }),
    defaultInquiryModel: inquiryModelEnum("default_inquiry_model"),
    creditBalance: integer("credit_balance").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("users_email_idx").on(table.email)]
);

// ============================================================================
// SUBSCRIPTIONS
// ============================================================================

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tier: subscriptionTierEnum("tier").notNull(),
  status: subscriptionStatusEnum("status").notNull(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  stripePriceId: varchar("stripe_price_id", { length: 255 }),
  monthlyCredits: integer("monthly_credits").notNull(),
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// CREDIT TRANSACTIONS
// ============================================================================

export const creditTransactions = pgTable(
  "credit_transactions",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: creditTransactionTypeEnum("type").notNull(),
    amount: integer("amount").notNull(),
    balanceAfter: integer("balance_after").notNull(),
    actualApiCostCents: integer("actual_api_cost_cents"),
    generationId: integer("generation_id"),
    stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("credit_tx_user_idx").on(table.userId),
    index("credit_tx_type_idx").on(table.type),
    index("credit_tx_created_idx").on(table.createdAt),
  ]
);

// ============================================================================
// CREDIT PACKS
// ============================================================================

export const creditPacks = pgTable("credit_packs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  credits: integer("credits").notNull(),
  priceCents: integer("price_cents").notNull(),
  stripePriceId: varchar("stripe_price_id", { length: 255 }),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// GENERATIONS
// ============================================================================

export const generations = pgTable(
  "generations",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: generationStatusEnum("status").default("pending").notNull(),
    topic: text("topic").notNull(),
    gradeLevel: varchar("grade_level", { length: 50 }).notNull(),
    subject: varchar("subject", { length: 100 }).notNull(),
    inquiryModel: inquiryModelEnum("inquiry_model").notNull(),
    country: varchar("country", { length: 2 }).notNull(),
    state: varchar("state", { length: 100 }),
    standardsFramework: standardsFrameworkEnum("standards_framework").notNull(),
    selectedStandardIds: jsonb("selected_standard_ids")
      .$type<number[]>()
      .default([]),
    additionalContext: text("additional_context"),
    customRequirements: jsonb("custom_requirements").$type<
      Record<string, string>
    >(),
    aiProvider: aiProviderEnum("ai_provider").default("anthropic").notNull(),
    aiModel: varchar("ai_model", { length: 100 }).notNull(),
    totalTokensInput: integer("total_tokens_input").default(0),
    totalTokensOutput: integer("total_tokens_output").default(0),
    totalApiCostCents: integer("total_api_cost_cents").default(0),
    totalCreditsCharged: integer("total_credits_charged").default(0),
    startedAt: timestamp("started_at"),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("gen_user_idx").on(table.userId),
    index("gen_status_idx").on(table.status),
  ]
);

// ============================================================================
// GENERATION STEPS
// ============================================================================

export const generationSteps = pgTable("generation_steps", {
  id: serial("id").primaryKey(),
  generationId: integer("generation_id")
    .notNull()
    .references(() => generations.id, { onDelete: "cascade" }),
  stepName: varchar("step_name", { length: 100 }).notNull(),
  aiProvider: aiProviderEnum("ai_provider").notNull(),
  aiModel: varchar("ai_model", { length: 100 }).notNull(),
  promptTokens: integer("prompt_tokens").default(0),
  completionTokens: integer("completion_tokens").default(0),
  costCents: integer("cost_cents").default(0),
  durationMs: integer("duration_ms"),
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// GENERATED DOCUMENTS
// ============================================================================

export const generatedDocuments = pgTable("generated_documents", {
  id: serial("id").primaryKey(),
  generationId: integer("generation_id")
    .notNull()
    .references(() => generations.id, { onDelete: "cascade" }),
  documentType: documentTypeEnum("document_type").notNull(),
  content: jsonb("content").notNull(),
  editedContent: jsonb("edited_content"),
  isEdited: boolean("is_edited").default(false).notNull(),
  lastExportedAt: timestamp("last_exported_at"),
  exportCount: integer("export_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// GENERATED IMAGES
// ============================================================================

export const generatedImages = pgTable("generated_images", {
  id: serial("id").primaryKey(),
  generationId: integer("generation_id")
    .notNull()
    .references(() => generations.id, { onDelete: "cascade" }),
  documentId: integer("document_id").references(() => generatedDocuments.id, {
    onDelete: "set null",
  }),
  prompt: text("prompt").notNull(),
  imageUrl: text("image_url"),
  slotIdentifier: varchar("slot_identifier", { length: 100 }),
  aiProvider: aiProviderEnum("ai_provider").notNull(),
  aiModel: varchar("ai_model", { length: 100 }).notNull(),
  costCents: integer("cost_cents").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// STANDARDS DATABASE
// ============================================================================

export const standardsFrameworks = pgTable("standards_frameworks", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  country: varchar("country", { length: 2 }).notNull(),
  region: varchar("region", { length: 100 }),
  version: varchar("version", { length: 50 }),
  isActive: boolean("is_active").default(true).notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const standardsDomains = pgTable("standards_domains", {
  id: serial("id").primaryKey(),
  frameworkId: integer("framework_id")
    .notNull()
    .references(() => standardsFrameworks.id, { onDelete: "cascade" }),
  code: varchar("code", { length: 50 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const standardsClusters = pgTable("standards_clusters", {
  id: serial("id").primaryKey(),
  domainId: integer("domain_id")
    .notNull()
    .references(() => standardsDomains.id, { onDelete: "cascade" }),
  code: varchar("code", { length: 50 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  gradeLevel: varchar("grade_level", { length: 50 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const standards = pgTable(
  "standards",
  {
    id: serial("id").primaryKey(),
    clusterId: integer("cluster_id")
      .notNull()
      .references(() => standardsClusters.id, { onDelete: "cascade" }),
    code: varchar("code", { length: 50 }).notNull(),
    description: text("description").notNull(),
    gradeLevel: varchar("grade_level", { length: 50 }).notNull(),
    disciplinaryCoreIdeas: jsonb("disciplinary_core_ideas").$type<string[]>(),
    scienceEngineeringPractices: jsonb(
      "science_engineering_practices"
    ).$type<string[]>(),
    crosscuttingConcepts: jsonb("crosscutting_concepts").$type<string[]>(),
    keywords: jsonb("keywords").$type<string[]>().default([]),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("standards_code_idx").on(table.code),
    index("standards_grade_idx").on(table.gradeLevel),
  ]
);

// ============================================================================
// INQUIRY MODEL TEMPLATES
// ============================================================================

export const inquiryModelTemplates = pgTable("inquiry_model_templates", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  phases: jsonb("phases")
    .$type<
      Array<{
        name: string;
        description: string;
        promptGuidance: string;
        order: number;
      }>
    >()
    .notNull(),
  unitStructure: jsonb("unit_structure")
    .$type<{
      slideCount: number;
      activitySections: string[];
      teacherGuideSections: string[];
    }>()
    .notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// USER TEMPLATES
// ============================================================================

export const userTemplates = pgTable("user_templates", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  config: jsonb("config")
    .$type<{
      gradeLevel?: string;
      subject?: string;
      inquiryModel?: string;
      country?: string;
      state?: string;
      standardsFramework?: string;
      customInstructions?: string;
    }>()
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// AI MODEL PRICING
// ============================================================================

export const aiModelPricing = pgTable(
  "ai_model_pricing",
  {
    id: serial("id").primaryKey(),
    provider: aiProviderEnum("provider").notNull(),
    modelId: varchar("model_id", { length: 100 }).notNull(),
    modelName: varchar("model_name", { length: 255 }).notNull(),
    inputPricePerMillionTokens: doublePrecision(
      "input_price_per_million_tokens"
    ).notNull(),
    outputPricePerMillionTokens: doublePrecision(
      "output_price_per_million_tokens"
    ).notNull(),
    imageGenerationCostCents: integer("image_generation_cost_cents"),
    isActive: boolean("is_active").default(true).notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("ai_model_pricing_provider_model_idx").on(
      table.provider,
      table.modelId
    ),
  ]
);

// ============================================================================
// CHAT MESSAGES
// ============================================================================

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  generationId: integer("generation_id")
    .notNull()
    .references(() => generations.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 20 }).notNull(),
  content: text("content").notNull(),
  tokensUsed: integer("tokens_used"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// RELATIONS
// ============================================================================

export const usersRelations = relations(users, ({ many }) => ({
  subscriptions: many(subscriptions),
  creditTransactions: many(creditTransactions),
  generations: many(generations),
  userTemplates: many(userTemplates),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));

export const creditTransactionsRelations = relations(
  creditTransactions,
  ({ one }) => ({
    user: one(users, {
      fields: [creditTransactions.userId],
      references: [users.id],
    }),
  })
);

export const generationsRelations = relations(generations, ({ one, many }) => ({
  user: one(users, {
    fields: [generations.userId],
    references: [users.id],
  }),
  steps: many(generationSteps),
  documents: many(generatedDocuments),
  images: many(generatedImages),
  chatMessages: many(chatMessages),
}));

export const generationStepsRelations = relations(
  generationSteps,
  ({ one }) => ({
    generation: one(generations, {
      fields: [generationSteps.generationId],
      references: [generations.id],
    }),
  })
);

export const generatedDocumentsRelations = relations(
  generatedDocuments,
  ({ one, many }) => ({
    generation: one(generations, {
      fields: [generatedDocuments.generationId],
      references: [generations.id],
    }),
    images: many(generatedImages),
  })
);

export const generatedImagesRelations = relations(
  generatedImages,
  ({ one }) => ({
    generation: one(generations, {
      fields: [generatedImages.generationId],
      references: [generations.id],
    }),
    document: one(generatedDocuments, {
      fields: [generatedImages.documentId],
      references: [generatedDocuments.id],
    }),
  })
);

export const standardsFrameworksRelations = relations(
  standardsFrameworks,
  ({ many }) => ({
    domains: many(standardsDomains),
  })
);

export const standardsDomainsRelations = relations(
  standardsDomains,
  ({ one, many }) => ({
    framework: one(standardsFrameworks, {
      fields: [standardsDomains.frameworkId],
      references: [standardsFrameworks.id],
    }),
    clusters: many(standardsClusters),
  })
);

export const standardsClustersRelations = relations(
  standardsClusters,
  ({ one, many }) => ({
    domain: one(standardsDomains, {
      fields: [standardsClusters.domainId],
      references: [standardsDomains.id],
    }),
    standards: many(standards),
  })
);

export const standardsRelations = relations(standards, ({ one }) => ({
  cluster: one(standardsClusters, {
    fields: [standards.clusterId],
    references: [standardsClusters.id],
  }),
}));

export const inquiryModelTemplatesRelations = relations(
  inquiryModelTemplates,
  () => ({})
);

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  generation: one(generations, {
    fields: [chatMessages.generationId],
    references: [generations.id],
  }),
}));
