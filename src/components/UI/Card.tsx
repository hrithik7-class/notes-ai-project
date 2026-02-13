"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  disableAnimation?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  disableAnimation = false,
}) => {
  const styles =
    "bg-white border border-slate-200 shadow-lg rounded-2xl p-8 w-full";

  if (disableAnimation) {
    return <div className={`${styles} ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`${styles} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
