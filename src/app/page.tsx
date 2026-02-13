"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Zap, History, ArrowRight, Trash2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/UI/Card";
import { toast } from "sonner";

const getLocalHistory = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("noteHistory") || "[]");
};

const removeFromHistory = (id: string) => {
  const updated = getLocalHistory().filter((n: HistoryItem) => n.id !== id);
  localStorage.setItem("noteHistory", JSON.stringify(updated));
};

interface HistoryItem {
  id: string;
  password: string;
  createdAt: string;
}

export default function Home() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(() => getLocalHistory());
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    removeFromHistory(id);
    setHistory(getLocalHistory());

    toast.success("Removed from history");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">

      {/* HERO */}
      <section className="flex flex-col items-center text-center max-w-3xl mx-auto">

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 px-4 py-1 bg-emerald-50 text-emerald-600 font-semibold text-xs rounded-full"
        >
          Secure • Private • Ephemeral
        </motion.span>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6"
        >
          Share secrets.
          <br />
          <span className="text-emerald-600">Let them disappear.</span>
        </motion.h1>

        <p className="text-lg text-slate-500 mb-10">
          Create encrypted notes, share securely, and generate AI summaries after unlocking.
        </p>

        <Link
          href="/create-note"
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition"
        >
          Create Secure Note
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* HISTORY */}
      <AnimatePresence>
        {history.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <History className="w-5 h-5 text-slate-400" />
              <h2 className="text-2xl font-bold">
                Recent Notes
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Link href={`/note/${item.id}`}>
                    <Card className="relative hover:shadow-xl transition cursor-pointer">

                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>

                      <p className="text-xs text-slate-400 mb-2">
                        NOTE ID
                      </p>

                      <p className="font-mono font-semibold mb-4 truncate">
                        {item.id}
                      </p>

                      <p className="text-xs text-slate-400">
                        PASSWORD
                      </p>

                      <p className="font-mono mb-4">
                        {item.password}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Clock size={14} />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>

                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-10">

        <Feature
          icon={<Lock />}
          title="Privacy First"
          description="Your notes are encrypted and protected with password access."
        />

        <Feature
          icon={<Zap />}
          title="AI Summaries"
          description="Generate quick insights from unlocked notes using AI."
        />

        <Feature
          icon={<ShieldCheck />}
          title="Auto Expiry"
          description="Notes automatically disappear after their expiration."
        />

      </section>
    </div>
  );
}


function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-emerald-600 w-fit p-3 rounded-xl text-white">
        {icon}
      </div>

      <h3 className="font-bold text-lg">
        {title}
      </h3>

      <p className="text-slate-500">
        {description}
      </p>
    </div>
  );
}
