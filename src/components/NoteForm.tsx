"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { createNote } from "@/features/notes/notesSlice";
import Card from "./UI/Card";
import Button from "./UI/Button";
import { RootState, AppDispatch } from "@/store/store";

export default function NoteForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { isCreating, result } = useSelector((state: RootState) => state.notes);

  const [content, setContent] = useState("");
  const [expiry, setExpiry] = useState(60);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Note content is required");
      return;
    }

    try {
      await dispatch(createNote({ content, expiry })).unwrap();
      toast.success("Secure note created");
    } catch (err) {
      const message = typeof err === "string" ? err : "Failed to create note";
      toast.error(message);
    }
  };

  if (result) {
    const fullUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${result.url}`
        : result.url;

    const handleCopyUrl = async () => {
      try {
        await navigator.clipboard.writeText(fullUrl);
        toast.success("Link copied to clipboard");
      } catch {
        toast.error("Failed to copy link");
      }
    };

    const handleCopyPassword = async () => {
      try {
        await navigator.clipboard.writeText(result.pass);
        toast.success("Password copied to clipboard");
      } catch {
        toast.error("Failed to copy password");
      }
    };

    const handleCopyBoth = async () => {
      const text = `Secure note link: ${fullUrl}\nPassword: ${result.pass}`;
      try {
        await navigator.clipboard.writeText(text);
        toast.success("Link and password copied");
      } catch {
        toast.error("Failed to copy");
      }
    };

    const handleDone = () => {
      window.location.reload();
    };

    return (
      <Card className="space-y-4">
        <h2 className="text-xl font-bold">Vault Secured ✅</h2>

        {/* URL Section */}
        <div className="space-y-2">
          <p className="text-sm text-slate-500">Share this link:</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-100 p-3 rounded-lg font-mono break-all">
              {fullUrl}
            </div>
            <Button type="button" onClick={handleCopyUrl}>
              Copy
            </Button>
          </div>
        </div>

        {/* Password Section */}
        <div className="space-y-2">
          <p className="text-sm text-slate-500">Password:</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-900 text-white p-3 rounded-lg font-mono break-all">
              {result.pass}
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCopyPassword}
            >
              Copy
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            type="button"
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={handleDone}
          >
            Done
          </Button>
          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={handleCopyBoth}
          >
            Copy link & password
          </Button>
        </div>
      </Card>
    );
  }


  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <span
            className={`absolute right-3 top-2 text-xs font-medium ${
              content.length > 450 ? "text-red-500" : "text-slate-400"
            }`}
          >
            {content.length}/500
          </span>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={500}
            placeholder="Enter your private note..."
            className={`w-full min-h-[200px] border rounded-xl p-4 pr-16 outline-none transition
              ${
                content.length > 450
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-300 focus:border-slate-500"
              }
            `}
          />
        </div>

        <select
          value={expiry}
          onChange={(e) => setExpiry(Number(e.target.value))}
          className="border rounded-xl p-3 w-full"
        >
          <option value={10}>10 minutes</option>
          <option value={60}>1 hour</option>
          <option value={1440}>24 hours</option>
        </select>

        <Button type="submit" isLoading={isCreating} className="w-full">
          Create Secure Note
        </Button>
      </form>
    </Card>
  );
}
