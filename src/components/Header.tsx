"use client";

import Link from "next/link";
import { ShieldCheck, Plus } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-5xl mx-auto md:px-6 px-3 md:py-4 py-3 flex items-center justify-between">
        
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <div className="md:w-10 md:h-10 w-8 h-8 bg-emerald-600  rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition">
            <ShieldCheck className="md:w-6 w-h-6 w-4 h-4 text-white" />
          </div>

          <span className="md:text-xl text-lg font-bold text-slate-900">
            FrontierVault
          </span>
        </Link>

        <Link
          href="/create-note"
          className="bg-slate-900 text-white md:px-5 md:py-2.5 px-3 py-1.5 md:rounded-xl rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-slate-800 active:scale-95 transition"
        >
          <Plus className="w-4 h-4" />
          New Note
        </Link>
      </div>
    </header>
  );
};

export default Header;
