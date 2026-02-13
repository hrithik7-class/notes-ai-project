"use client";

import { useDispatch, useSelector } from "react-redux";
import { summarizeNote } from "@/features/notes/notesSlice";
import Card from "./UI/Card";
import Button from "./UI/Button";
import SummaryBox from "./SummaryBox";
import Link from "next/link";
import { ArrowLeft, BrainCircuit } from "lucide-react";
import { RootState, AppDispatch } from "@/store/store";
import { toast } from "sonner";

type NoteDisplayProps = {
  noteId: string;
  content: string;
};

export default function NoteDisplay({ noteId, content }: NoteDisplayProps) {
  const dispatch = useDispatch<AppDispatch>();

  const { summary, isSummarizing } = useSelector(
    (state: RootState) => state.notes,
  );

  const handleSummarize = async () => {

    const promise = dispatch(
      summarizeNote({ noteId, content })
    ).unwrap();

    toast.promise(promise, {
      loading: "AI is analyzing your note...",
      success: "Summary ready ✨",
      error: "Failed to generate summary",
    });

  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-10">  
        <Link
          href="/"
          className="group inline-flex items-center gap-2 
          text-sm font-semibold text-slate-500 
          hover:text-black transition mb-8"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Exit vault
        </Link>

        <div className="space-y-8">
          {/* Note Card */}
          <Card className="p-8 md:p-10 shadow-xl border border-slate-200 bg-white">
            {/* Optional label → makes it feel like a secure system */}
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              Decrypted Note
            </div>

            <p className="text-[17px] leading-8 whitespace-pre-wrap text-slate-800">
              {content}
            </p>
          </Card>

          {/* Ai Section */}
          {!summary ? (
            <Button
              onClick={handleSummarize}
              isLoading={isSummarizing}
              className="w-full py-4 text-base font-semibold shadow-lg"
            >
              <BrainCircuit className="mr-2 w-5 h-5" />
              Generate AI Summary
            </Button>
          ) : (
            <SummaryBox summary={summary} />
          )}
        </div>
      </div>
    </div>
  );
}
