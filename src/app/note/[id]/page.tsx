"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PasswordInput from "@/components/PasswordInput";
import NoteDisplay from "@/components/NoteDisplay";
import Card from "@/components/UI/Card";
import { AlertTriangle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { unlockNote, getNote, clearAuthError } from "@/features/notes/notesSlice";
import { toast } from "sonner";

export default function ViewNotePage() {
  const params = useParams();
  const noteId = params?.id as string;

  const dispatch = useAppDispatch();

  const {
    isUnlocking,
    isFetching,
    content,
    authError,
  } = useAppSelector((state) => state.notes);

  // ✅ NEW: Track initial load
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!noteId) return;

    const loadNote = async () => {
      await dispatch(getNote(noteId));
      setInitialLoading(false);
    };

    loadNote();
  }, [noteId, dispatch]);

  const handleUnlock = async (password: string) => {
    if (!noteId) return;

    const result = await dispatch(
      unlockNote({ noteId, password })
    );

    if (unlockNote.fulfilled.match(result)) {
      toast.success("Note unlocked");
      await dispatch(getNote(noteId));
    } else {
      const message =
        (result.payload as string) || "Invalid password";
      toast.error(message);
    }
  };

  if (!noteId) return null;

  // ✅ Prevent flashing password UI
  if (initialLoading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  // ❌ Fatal Error UI (Expired, Forbidden, etc.)
  const isFatalError =
    authError &&
    authError !== "Unauthorized" &&
    authError !== "Invalid or expired token" &&
    authError !== "Forbidden";

  if (isFatalError && !content) {
    return (
      <div className="flex justify-center py-20 px-6">
        <Card className="max-w-md text-center space-y-4">
          <AlertTriangle className="mx-auto text-red-500" size={40} />

          <h2 className="text-2xl font-bold">
            {authError === "Invalid password" ? "Access Denied" : "Note Unavailable"}
          </h2>

          <p className="text-slate-500">
            {authError}
          </p>

          <button
            onClick={() => dispatch(clearAuthError())}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl"
          >
            Try Again
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center md:py-20 py-12 md:px-6 px-3">
      {!content ? (
        <PasswordInput
          onUnlock={handleUnlock}
          isLoading={isUnlocking || isFetching}
        />
      ) : (
        <NoteDisplay
          noteId={noteId}
          content={content}
        />
      )}
    </div>
  );
}
