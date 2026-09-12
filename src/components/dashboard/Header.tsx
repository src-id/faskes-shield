"use client";

import React from "react";
import {
  Menu,
  Search,
  ShieldCheck,
  Plus,
  Bell,
  Sparkles,
  CheckCircle2,
  Layers
} from "lucide-react";

interface HeaderProps {
  activeTab: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onToggleMobileMenu: () => void;
  onNewCase: () => void;
}

export function Header({
  activeTab,
  searchQuery,
  setSearchQuery,
  onToggleMobileMenu,
  onNewCase
}: HeaderProps) {
  const getTabLabel = (tab: string) => {
    switch (tab) {
      case "overview":
        return "Executive Overview";
      case "batch":
        return "Audit Batch 50 Klaim FKTP";
      case "single":
        return "Pre-Validator Kasus Tunggal";
      case "diagnosa144":
        return "Master 144 Diagnosa Non-Spesialistik";
      case "fornas":
        return "Restriksi Obat Fornas FKTP & FKRTL";
      default:
        return "Dashboard Verifikasi";
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#091512]/90 backdrop-blur border-b border-emerald-950/80 px-4 lg:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-emerald-950 transition"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
          <span className="text-emerald-500/60">FaskesShield</span>
          <span className="text-emerald-800">/</span>
          <span className="text-emerald-300 font-medium">{getTabLabel(activeTab)}</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            shadcn dashboard
          </span>
        </div>
      </div>

      {/* Center: Quick Search Input */}
      <div className="hidden md:flex items-center flex-1 max-w-xs mx-6">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-emerald-500/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari No. SEP / Pasien / ICD (⌘K)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#050f0c] border border-emerald-900/50 rounded-lg text-xs text-emerald-100 placeholder-emerald-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
          />
        </div>
      </div>

      {/* Right: GitHub CTA, Compliance Badges & Quick Action Triggers */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* GitHub Star CTA (next-shadcn-dashboard-starter pattern) */}
        <a
          href="https://github.com/src-id/src-faskes-shield"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#050f0c] border border-emerald-900/60 hover:border-emerald-500 text-emerald-200 hover:text-white text-xs font-mono transition shadow-sm"
          title="View on GitHub"
        >
          <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span className="font-semibold hidden sm:inline">GitHub</span>
        </a>
        {/* Compliance Badges */}
        <div className="hidden xl:flex items-center gap-2 bg-[#050f0c] border border-emerald-900/60 px-2.5 py-1 rounded-lg text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>144 Non-Spesialistik</span>
          </div>
          <span className="text-emerald-800">|</span>
          <div className="flex items-center gap-1 text-teal-300">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Anti-Dispute vClaim</span>
          </div>
        </div>

        {/* New Case Button */}
        <button
          type="button"
          onClick={onNewCase}
          className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Audit Pasien Baru</span>
        </button>
      </div>
    </header>
  );
}
