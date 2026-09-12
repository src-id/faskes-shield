"use client";

import React, { useState } from "react";
import { Pill, Search, AlertOctagon, CheckCircle2, ShieldAlert } from "lucide-react";
import { fornasMedicines } from "../../lib/clinical-database";

export function FornasCatalogView() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<"ALL" | "FKTP" | "FKRTL">("ALL");

  const filtered = fornasMedicines.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.genericName.toLowerCase().includes(search.toLowerCase()) ||
      (m.pharmacologyClass || "").toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === "ALL" || m.fornasLevel === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="bg-[#091512] border border-emerald-950 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <Pill className="w-4 h-4 text-emerald-400" />
            <span>Katalog Restriksi Obat Formularium Nasional (Fornas 2026)</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Database restriksi peresepan obat di fasilitas kesehatan tingkat pertama (FKTP) vs rumah sakit (FKRTL)
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Level Filter */}
          <div className="flex items-center bg-[#050f0c] p-1 rounded-lg border border-emerald-900/60 text-xs font-mono">
            <button
              onClick={() => setLevelFilter("ALL")}
              className={`px-2.5 py-1 rounded ${
                levelFilter === "ALL" ? "bg-emerald-900 text-emerald-100 font-bold" : "text-slate-400"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setLevelFilter("FKTP")}
              className={`px-2.5 py-1 rounded ${
                levelFilter === "FKTP" ? "bg-emerald-600 text-white font-bold" : "text-slate-400"
              }`}
            >
              Fornas FKTP
            </button>
            <button
              onClick={() => setLevelFilter("FKRTL")}
              className={`px-2.5 py-1 rounded ${
                levelFilter === "FKRTL" ? "bg-rose-900/80 text-rose-200 font-bold" : "text-slate-400"
              }`}
            >
              Restriksi RS (FKRTL)
            </button>
          </div>

          <div className="relative w-48">
            <Search className="w-3.5 h-3.5 text-emerald-500/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari obat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1 bg-[#050f0c] border border-emerald-900/60 rounded-lg text-xs text-emerald-100 placeholder-emerald-700 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-emerald-950 text-slate-400 text-[11px]">
              <th className="pb-2.5 font-medium">Kode &amp; Nama Obat</th>
              <th className="pb-2.5 font-medium">Kelas Farmakologi</th>
              <th className="pb-2.5 font-medium">Level Fornas</th>
              <th className="pb-2.5 font-medium">Maks Hari</th>
              <th className="pb-2.5 font-medium">Catatan Restriksi BPJS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-950/60">
            {filtered.map((m) => {
              const isRestricted = m.fornasLevel === "FKRTL";
              return (
                <tr key={m.id} className="hover:bg-emerald-950/30 transition">
                  <td className="py-2.5">
                    <p className="font-sans font-semibold text-white">{m.name}</p>
                    <p className="text-[10px] text-slate-400">{m.id} &bull; {m.genericName}</p>
                  </td>
                  <td className="py-2.5 text-slate-300">{m.pharmacologyClass}</td>
                  <td className="py-2.5">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${
                        isRestricted
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      }`}
                    >
                      {m.fornasLevel}
                    </span>
                  </td>
                  <td className="py-2.5 text-slate-300">{m.maxDaysSupply} hari</td>
                  <td className="py-2.5 font-sans text-slate-300 text-[11px] max-w-xs">
                    {isRestricted ? (
                      <span className="text-rose-300 flex items-start gap-1">
                        <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span>{m.restrictionNote}</span>
                      </span>
                    ) : (
                      <span>{m.restrictionNote}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
