"use client";

import NoteForm from "@/components/NoteForm";
import { motion } from "framer-motion";

export default function CreateNotePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:py-16 py-12">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="text-center mb-10"
      >
        <h1 className="md:text-4xl text-2xl font-bold tracking-tight text-slate-900 md:mb-3 mb-1">
          Create Secure Note
        </h1>

        <p className="text-slate-500 max-w-base mx-auto md:text-base text-xs">
          Encrypt sensitive information, set an expiration,
          and share access securely.
        </p>
      </motion.div>

      {/* Form */}
      <NoteForm />

    </div>
  );
}
