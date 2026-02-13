import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import { hashPassword } from "@/lib/hash";

function generatePassword(length = 12) {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }
  return pass;
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { content, expiry } = await req.json();
    

    if (!content || content.length > 500) {
      return NextResponse.json(
        { error: "Invalid note content" },
        { status: 400 }
      );
    }

    const minutes =
      typeof expiry === "number" && expiry > 0 ? expiry : 60; 
    const expiresAt = new Date(Date.now() + minutes * 60 * 1000);

    const password = generatePassword();
    const hashed = await hashPassword(password);
    console.log(hashed);

    const note = await Note.create({
      content,
      password: hashed,
      expiresAt,
    });

    return NextResponse.json({
      url: `/note/${note._id}`,
      pass: password,
    });
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
