"use client";

import React from "react";
import {
  ShieldCheck,
  AlertOctagon,
  AlertTriangle,
  Pill,
  BookOpen,
  Calendar,
  Layers,
  Stethoscope,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  FileSpreadsheet
} from "lucide-react";
import { PatientCase } from "../../lib/types";

interface OverviewViewProps {
  onGoToBatch: () => void;
  onGoToSingle: (caseItem?: PatientCase) => void;
  sampleCases: PatientCase[];
}

export function OverviewView({
  onGoToBatch,
  onGoToSingle,
  sampleCases
}: OverviewViewProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-[#091815] to-[#040d0a] border border-emerald-800/40 p-5 sm:p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>BPJS Kesehatan FKTP Claim Pre-Validator &bull; vClaim Dispute Shield</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Klaim BPJS Faskes Cair Cepat &bull; Bebas Dispute &amp; Pending
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
              Audit otomatis pra-pengajuan klaim rawat jalan FKTP: verifikasi kesesuaian 144 diagnosa non-spesialistik, filter obat restriksi rumah sakit (FKRTL), cegah polifarmasi irasional, dan validasi keabsahan SEP.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onGoToBatch}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow transition"
            >
              <Layers className="w-4 h-4" />
              <span>Audit Batch 50 Klaim</span>
            </button>
            <button
              type="button"
              onClick={() => onGoToSingle()}
              className="inline-flex items-center gap-2 bg-[#091512] hover:bg-emerald-950 text-emerald-300 border border-emerald-900/80 text-xs font-medium px-3.5 py-2.5 rounded-lg transition"
            >
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              <span>Verifikasi Tunggal</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Dispute Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cat 1: Restriksi Obat FKRTL */}
        <div className="p-4 bg-[#091512] border border-emerald-950 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Pill className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
              Kritis / Tolak
            </span>
          </div>
          <h4 className="text-xs font-bold text-white font-mono">Restriksi Obat FKRTL</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Mencegah peresepan obat level rumah sakit (misal Ceftriaxone injeksi, Atorvastatin) di klinik primer yang otomatis memicu dispute klaim BPJS.
          </p>
        </div>

        {/* Cat 2: 144 Non-Spesialistik */}
        <div className="p-4 bg-[#091512] border border-emerald-950 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
              Kompetensi FKTP
            </span>
          </div>
          <h4 className="text-xs font-bold text-white font-mono">144 Diagnosa Tuntas</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Menandai diagnosa non-spesialistik yang wajib dituntaskan di faskes tingkat pertama tanpa rujukan kecuali terdapat komplikasi klinis.
          </p>
        </div>

        {/* Cat 3: Polifarmasi Irasional */}
        <div className="p-4 bg-[#091512] border border-emerald-950 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 font-semibold">
              Rasionalitas
            </span>
          </div>
          <h4 className="text-xs font-bold text-white font-mono">Duplikasi Farmakologi</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Mendeteksi peresepan ganda pada kelas terapi yang sama (misal kombinasi Paracetamol + Ibuprofen atau Cipro + Amoxicillin tanpa indikasi).
          </p>
        </div>

        {/* Cat 4: Masa Berlaku SEP */}
        <div className="p-4 bg-[#091512] border border-emerald-950 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              Batas 15 Hari
            </span>
          </div>
          <h4 className="text-xs font-bold text-white font-mono">Validitas Masa SEP</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Memastikan selisih tanggal SEP dan tanggal pelayanan tidak melampaui aturan verifikasi 15 hari kalender sebelum berkas diajukan.
          </p>
        </div>
      </div>

      {/* Quick Antrean Berkas Pasien Table */}
      <div className="bg-[#091512] border border-emerald-950 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              <span>Contoh Antrean Berkas Pasien Aktif</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Uji coba simulasi pre-validasi per-kasus dengan aturan vClaim</p>
          </div>
          <button
            type="button"
            onClick={() => onGoToSingle()}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 font-mono transition"
          >
            <span>Buka Pre-Validator</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-emerald-950 text-slate-400 font-mono text-[11px]">
                <th className="pb-2.5 font-medium">Pasien</th>
                <th className="pb-2.5 font-medium">No. SEP & BPJS</th>
                <th className="pb-2.5 font-medium">Diagnosa Primer</th>
                <th className="pb-2.5 font-medium">Resep Obat</th>
                <th className="pb-2.5 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/60 font-mono">
              {sampleCases.slice(0, 5).map((c) => (
                <tr key={c.id} className="hover:bg-emerald-950/30 transition">
                  <td className="py-3 font-sans">
                    <p className="font-semibold text-white truncate max-w-[140px]">{c.patientName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{c.patientNo} &bull; {c.age} th ({c.gender})</p>
                  </td>
                  <td className="py-3 text-[11px]">
                    <p className="text-emerald-300 font-medium">{c.sepNumber}</p>
                    <p className="text-[10px] text-slate-400">{c.bpjsNumber}</p>
                  </td>
                  <td className="py-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                      {c.primaryIcd}
                    </span>
                  </td>
                  <td className="py-3 text-[11px] text-slate-300 max-w-[180px] truncate">
                    {c.medications.map((m) => m.name).join(", ")}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onGoToSingle(c)}
                      className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[11px] font-medium transition"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
