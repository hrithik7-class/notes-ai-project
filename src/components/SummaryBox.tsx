"use client";

import { motion } from "framer-motion";

interface Props {
  summary: string;
}

export default function SummaryBox({ summary }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border rounded-2xl p-6 bg-slate-50"
    >
      <h3 className="font-bold mb-3">
        AI Summary ✨
      </h3>

      <p className="leading-relaxed whitespace-pre-line">
        {summary}
      </p>
    </motion.div>
  );
}
