import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { generatedDocuments, generations } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import {
  buildActivityPack,
  buildTeacherGuide,
} from "@/lib/documents/docx-builder";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { generationId, documentType } = await request.json();

  if (!["activity_pack", "teacher_guide"].includes(documentType)) {
    return NextResponse.json(
      { error: "Invalid document type" },
      { status: 400 }
    );
  }

  // Verify ownership
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
      eq(generatedDocuments.documentType, documentType)
    ),
  });

  if (!doc) {
    return NextResponse.json(
      { error: "Document not found" },
      { status: 404 }
    );
  }

  const content = (doc.editedContent ?? doc.content) as any;
  let buffer: Buffer;
  let filename: string;

  if (documentType === "activity_pack") {
    buffer = await buildActivityPack(
      content,
      generation.topic,
      generation.gradeLevel
    );
    filename = `${generation.topic.replace(/[^a-zA-Z0-9]/g, "_")}_activity_pack.docx`;
  } else {
    buffer = await buildTeacherGuide(
      content,
      generation.topic,
      generation.gradeLevel
    );
    filename = `${generation.topic.replace(/[^a-zA-Z0-9]/g, "_")}_teacher_guide.docx`;
  }

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
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
