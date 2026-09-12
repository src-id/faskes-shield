"use client";

import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertOctagon,
  Pill,
  BookOpen,
  TrendingUp,
  Coins
} from "lucide-react";

interface MetricCardsProps {
  onSelectTab: (tab: "overview" | "batch" | "single" | "diagnosa144" | "fornas") => void;
}

export function MetricCards({ onSelectTab }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* 1. Total Klaim FKTP */}
      <div
        onClick={() => onSelectTab("batch")}
        className="cursor-pointer bg-[#091512] border border-emerald-950 hover:border-emerald-500/50 p-4 rounded-xl shadow-sm transition group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs text-emerald-400/80 font-medium">Total Klaim Diaudit</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition">
            <Coins className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono">50</span>
            <span className="text-[10px] font-mono text-emerald-400 font-medium flex items-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5" /> Batch Aktif
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Nominal: <strong className="text-slate-200">Rp 7.500.000</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Tingkat Layak Cair */}
      <div
        onClick={() => onSelectTab("batch")}
        className="cursor-pointer bg-[#091512] border border-emerald-950 hover:border-emerald-500/50 p-4 rounded-xl shadow-sm transition group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs text-emerald-400/80 font-medium">Tingkat Layak Cair</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-400 font-mono">92.0%</span>
            <span className="text-[10px] font-mono text-emerald-300">46 / 50 Lolos</span>
          </div>
          <div className="mt-2.5 w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-emerald-950">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: "92%" }} />
          </div>
        </div>
      </div>

      {/* 3. Potensi Dispute & Pending */}
      <div
        onClick={() => onSelectTab("batch")}
        className="cursor-pointer bg-[#091512] border border-emerald-950 hover:border-rose-500/50 p-4 rounded-xl shadow-sm transition group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs text-rose-400/90 font-medium">Potensi Dispute / Tolak</span>
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-105 transition">
            <AlertOctagon className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-400 font-mono">4</span>
            <span className="text-[10px] font-mono text-rose-300">Berkas Perlu Koreksi</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Risiko Tertahan: <strong className="text-rose-300">Rp 600.000</strong></span>
          </div>
        </div>
      </div>

      {/* 4. Deteksi Obat FKRTL Restriksi */}
      <div
        onClick={() => onSelectTab("fornas")}
        className="cursor-pointer bg-[#091512] border border-emerald-950 hover:border-amber-500/50 p-4 rounded-xl shadow-sm transition group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs text-amber-400/90 font-medium">Obat FKRTL Dicegat</span>
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition">
            <Pill className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-400 font-mono">2</span>
            <span className="text-[10px] font-mono text-amber-300">0 Lolos ke BPJS</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400 font-mono truncate">
            Ceftriaxone &bull; Atorvastatin
          </p>
        </div>
      </div>

      {/* 5. Kesesuaian 144 Diagnosa */}
      <div
        onClick={() => onSelectTab("diagnosa144")}
        className="cursor-pointer bg-[#091512] border border-emerald-950 hover:border-teal-500/50 p-4 rounded-xl shadow-sm transition group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs text-teal-400/90 font-medium">144 Non-Spesialistik</span>
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-105 transition">
            <BookOpen className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono">144</span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3" /> 100% Sesuai
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400 font-mono">
            Standar Kompetensi FKTP
          </p>
        </div>
      </div>
    </div>
  );
}
