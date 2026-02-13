import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import { comparePassword } from "@/lib/hash";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const { noteId, password } = await req.json();

  await connectDB();

  const note = await Note.findById(noteId);

  if (!note) {
    return NextResponse.json(
      { error: "This note has expired or does not exist." },
      { status: 404 }
    );
  }

  const valid = await comparePassword(password, note.password);

  if (!valid) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  }

  const token = signToken(noteId);

  const cookieStore = await cookies();

  cookieStore.set("note_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60
  });
  
  

  return NextResponse.json({
    message: "Unlocked",
  });
}
