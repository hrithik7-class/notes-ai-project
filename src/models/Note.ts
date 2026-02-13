import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 500,
    },
    password: {
      type: String,
      required: true,
    },
    summary: String,
    expiresAt: Date,
  },
  { timestamps: true }
);


NoteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Note ||
  mongoose.model("Note", NoteSchema);
