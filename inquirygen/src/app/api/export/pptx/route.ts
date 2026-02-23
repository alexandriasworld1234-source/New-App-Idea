import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { generatedDocuments, generations } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { buildPresentation } from "@/lib/documents/pptx-builder";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { generationId } = await request.json();

  // Fetch generation and presentation document
  const generation = await db.query.generations.findFirst({
    where: and(
      eq(generations.id, generationId),
      eq(generations.userId, userId)
    ),
  });

  if (!generation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const doc = await db.query.generatedDocuments.findFirst({
    where: and(
      eq(generatedDocuments.generationId, generationId),
      eq(generatedDocuments.documentType, "presentation")
    ),
  });

  if (!doc) {
    return NextResponse.json(
      { error: "Presentation not found" },
      { status: 404 }
    );
  }

  const content = (doc.editedContent ?? doc.content) as any;

  const buffer = await buildPresentation(
    content,
    generation.topic,
    generation.gradeLevel
  );

  // Update export count
  await db
    .update(generatedDocuments)
    .set({
      exportCount: doc.exportCount + 1,
      lastExportedAt: new Date(),
    })
    .where(eq(generatedDocuments.id, doc.id));

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "Content-Disposition": `attachment; filename="${generation.topic.replace(/[^a-zA-Z0-9]/g, "_")}_presentation.pptx"`,
    },
  });
}
