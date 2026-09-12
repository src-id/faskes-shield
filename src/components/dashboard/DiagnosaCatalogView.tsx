"use client";

import React, { useState } from "react";
import { BookOpen, Search, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { icd10Catalog } from "../../lib/clinical-database";

export function DiagnosaCatalogView() {
  const [search, setSearch] = useState("");

  const filtered = icd10Catalog.filter(
    (item) =>
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#091512] border border-emerald-950 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Katalog Master 144 Diagnosa Non-Spesialistik FKTP</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Daftar kompetensi 4A dokter umum FKTP yang wajib tuntas di faskes primer tanpa rujukan BPJS (PMK No. 5/2014)
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-emerald-500/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kode ICD-10 atau nama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#050f0c] border border-emerald-900/60 rounded-lg text-xs text-emerald-100 placeholder-emerald-700 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-emerald-950 text-slate-400 text-[11px]">
              <th className="pb-2.5 font-medium">Kode ICD-10</th>
              <th className="pb-2.5 font-medium">Nama Penyakit (Diagnosa)</th>
              <th className="pb-2.5 font-medium">Level Kompetensi</th>
              <th className="pb-2.5 font-medium">Status Rujukan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-950/60">
            {filtered.map((item) => (
              <tr key={item.code} className="hover:bg-emerald-950/30 transition">
                <td className="py-2.5">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                    {item.code}
                  </span>
                </td>
                <td className="py-2.5 font-sans font-medium text-slate-200">{item.name}</td>
                <td className="py-2.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30">
                    {item.isFktpCompetent ? "Tingkat 4A (Mandiri)" : "Spesialistik"}
                  </span>
                </td>
                <td className="py-2.5">
                  {item.isFktpCompetent ? (
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Wajib Tuntas FKTP
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-400 flex items-center gap-1 font-sans">
                      <AlertTriangle className="w-3.5 h-3.5" /> Dapat Dirujuk
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
