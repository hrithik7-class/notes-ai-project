import { summarizeNoteWithAI } from "@/lib/ai";
import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { noteId, content: providedContent } = await req.json();

    await connectDB();

    let note = null;
    if (noteId && mongoose.Types.ObjectId.isValid(noteId)) {
      note = await Note.findById(noteId);
    }

   
    if (note?.summary) {
      return NextResponse.json({
        summary: note.summary,
      });
    }

    const contentToSummarize = providedContent || note?.content;

    if (!contentToSummarize) {
      return NextResponse.json(
        { error: "No content provided to summarize" },
        { status: 400 }
      );
    }

    if (note.summary) {
      return NextResponse.json({
        summary: note.summary,
      });
    }

    const summary = await summarizeNoteWithAI(
      contentToSummarize
    );

    if (note) {
      note.summary = summary;
      await note.save();
    }

    return NextResponse.json({ summary });

  } catch (error) {
    console.error("SUMMARY ROUTE ERROR:", error);

    return NextResponse.json(
      { error: "AI service unavailable" },
      { status: 500 }
    );
  }
}
