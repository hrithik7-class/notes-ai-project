import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const noteId = String(id);

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return NextResponse.json(
        { error: "Invalid note ID" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("note_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    const note = await Note.findById(noteId);

    if (!note) {
      return NextResponse.json(
        { error: "This note has expired or does not exist." },
        { status: 410 }
      );
    }

    if (String(decoded.noteId) !== String(note._id)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      content: note.content,
      summary: note.summary,
      createdAt: note.createdAt,
    });

  } catch (error) {
    console.error("GET NOTE ERROR:", error);

    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
