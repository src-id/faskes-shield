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

      {/* Right: Compliance Badges & Quick Action Triggers */}
      <div className="flex items-center gap-2 sm:gap-3">
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
