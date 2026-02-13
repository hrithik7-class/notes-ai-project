"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PasswordInput from "@/components/PasswordInput";
import NoteDisplay from "@/components/NoteDisplay";
import Card from "@/components/UI/Card";
import { AlertTriangle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { unlockNote } from "@/features/notes/notesSlice";
import axios from "axios";
import { toast } from "sonner";

export default function ViewNotePage() {
  const params = useParams();
  const router = useRouter();

  const noteId = params?.id as string;

  const dispatch = useAppDispatch();
  const { isUnlocking, error } = useAppSelector(
    (state) => state.notes
  );

  const [content, setContent] = useState<string | null>(null);

  const fetchNote = async () => {
    try {
      const res = await axios.get(`/api/notes/${noteId}`, {
        withCredentials: true,
      });

      setContent(res.data.content);
    } catch {
      toast.error("Failed to load note");
      router.push("/");
    }
  };

  const handleUnlock = async (password: string) => {
    const result = await dispatch(
      unlockNote({ noteId, password })
    );

    if (unlockNote.fulfilled.match(result)) {
      toast.success("Note unlocked");
      fetchNote();
    } else {
      toast.error("Invalid password");
    }
  };

  if (!noteId) return null;

  const isFatalError =
    error &&
    error !== "Unauthorized" &&
    error !== "Invalid or expired token" &&
    error !== "Forbidden";

  if (isFatalError && !content) {
    return (
      <div className="flex justify-center py-20 px-6">
        <Card className="max-w-md text-center space-y-4">
          <AlertTriangle className="mx-auto text-red-500" size={40} />

          <h2 className="text-2xl font-bold">
            {error === "Invalid password" ? "Access Denied" : "Note Unavailable"}
          </h2>

          <p className="text-slate-500">
            {error}
          </p>

          <button
            onClick={() => location.reload()}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl"
          >
            Retry
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-20 px-6">

      {!content ? (
        <PasswordInput
          onUnlock={handleUnlock}
          isLoading={isUnlocking}
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
