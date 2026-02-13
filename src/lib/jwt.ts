import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export function signToken(noteId: string) {
  return jwt.sign({ noteId }, secret, {
    expiresIn: "1h",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret) as {
    noteId: string;
  };
}
