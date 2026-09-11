"use client";

import React, { useState } from "react";
import { samplePatientCases, icd10Catalog, fornasMedicines } from "../lib/clinical-database";
import { validateBpjsClaim } from "../lib/claim-validator";
import { PatientCase } from "../lib/types";
import {
  ShieldCheck,
  AlertOctagon,
  Stethoscope,
  Pill,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Coins,
  ChevronRight,
  User,
  Search,
  Sparkles
} from "lucide-react";

export default function HomePage() {
  const [selectedCase, setSelectedCase] = useState<PatientCase>(samplePatientCases[0]);
  const [searchFilter, setSearchFilter] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);

  // New Case State
  const [newName, setNewName] = useState("");
  const [newBpjs, setNewBpjs] = useState("");
  const [newIcd, setNewIcd] = useState("J06.9");
  const [newMedId, setNewMedId] = useState("MED-01");
  const [newDays, setNewDays] = useState("5");

  const report = validateBpjsClaim(selectedCase);

  const handleAddCase = () => {
    if (!newName || !newBpjs) return;
    const med = fornasMedicines.find(m => m.id === newMedId) || fornasMedicines[0];
    const daysNum = parseInt(newDays, 10) || 5;

    const newCase: PatientCase = {
      id: "case-" + Date.now(),
      patientNo: "RM-" + Math.floor(1000 + Math.random() * 9000),
      patientName: newName,
      age: 35,
      gender: "L",
      bpjsNumber: newBpjs,
      serviceDate: new Date().toISOString().split("T")[0],
      complaints: "Pemeriksaan rawat jalan Faskes Tingkat 1",
      primaryIcd: newIcd,
      secondaryIcd: [],
      medications: [
        {
          medicineId: med.id,
          name: med.name,
          quantity: daysNum * 2,
          days: daysNum,
          signa: "2x1 sesudah makan"
        }
      ],
      procedures: ["Pemeriksaan Fisik Dokter"],
      claimAmount: 150_000
    };

    setSelectedCase(newCase);
    setShowNewModal(false);
    setNewName("");
    setNewBpjs("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 border border-teal-800/40 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>BPJS Kesehatan Claim Pre-Validator for Indonesian Primary Clinics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Klaim BPJS Faskes Cair Cepat <span className="text-teal-400">Bebas Dispute & Pending</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Audit otomatis kesesuaian diagnosa ICD-10 dengan Formularium Nasional (Fornas FKTP), eliminasi salah resep obat tingkat rumah sakit (FKRTL), dan pastikan kelengkapan klaim sebelum kirim ke verifikator BPJS.
          </p>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400">Total Klaim Terverifikasi</span>
          <div className="text-2xl font-black text-white mt-1">128 Pasien</div>
          <span className="text-[11px] text-emerald-400">Bulan Berjalan (September)</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400">Estimasi Dana Cair</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">Rp 24.850.000</div>
          <span className="text-[11px] text-slate-400">Non-Kapitasi & Tindakan</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400">Acceptance Rate</span>
          <div className="text-2xl font-black text-teal-400 mt-1">94.2%</div>
          <span className="text-[11px] text-teal-300">Target Faskes &gt; 90%</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400">Potensi Klaim Tertahan</span>
          <div className="text-2xl font-black text-rose-400 mt-1">Rp 1.420.000</div>
          <span className="text-[11px] text-rose-300">3 Kasus Perlu Koreksi</span>
        </div>
      </div>

      {/* Main Grid: Patient Queue & Validator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Patient Case Queue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Antrean Berkas Pasien
            </h2>
            <button
              onClick={() => setShowNewModal(true)}
              className="text-xs text-teal-400 hover:text-teal-300 font-semibold underline underline-offset-4"
            >
              + Pasien Baru
            </button>
          </div>

          <div className="space-y-3">
            {samplePatientCases.map(c => {
              const isSelected = selectedCase.id === c.id;
              const r = validateBpjsClaim(c);
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? "bg-teal-950/40 border-teal-500 shadow-md shadow-teal-500/10"
                      : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-slate-400">{c.patientNo}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.status === "LAYAK_CAIR"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : r.status === "RISIKO_DISPUTE"
                        ? "bg-amber-950 text-amber-400 border border-amber-800"
                        : "bg-rose-950 text-rose-400 border border-rose-800"
                    }`}>
                      {r.status.replace("_", " ")}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{c.patientName}</h4>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>ICD: <strong className="text-slate-200">{c.primaryIcd}</strong></span>
                    <span>Rp {c.claimAmount.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Pre-Validation Inspection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
            {/* Case Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-slate-300">
                    {selectedCase.patientNo}
                  </span>
                  <span className="text-slate-400 font-mono">No. Kartu: {selectedCase.bpjsNumber}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{selectedCase.patientName} ({selectedCase.age} th)</h3>
                <p className="text-xs text-slate-400 italic">"{selectedCase.complaints}"</p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                <div className="text-right">
                  <div className="text-xs text-slate-400">Skor Kepatuhan BPJS</div>
                  <div className={`text-2xl font-black ${
                    report.score >= 80 ? "text-emerald-400" : report.score >= 50 ? "text-amber-400" : "text-rose-400"
                  }`}>
                    {report.score}%
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  report.status === "LAYAK_CAIR"
                    ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                    : report.status === "RISIKO_DISPUTE"
                    ? "bg-amber-950/80 text-amber-400 border-amber-800"
                    : "bg-rose-950/80 text-rose-400 border-rose-800"
                }`}>
                  {report.status.replace("_", " ")}
                </span>
              </div>
            </div>

            {/* Prescribed Items & Procedures */}
            <div className="py-5 border-b border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
                <span className="font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <Stethoscope className="h-3.5 w-3.5 text-teal-400" />
                  Diagnosa & Tindakan
                </span>
                <div className="text-slate-200 font-medium">{report.primaryDiagnosis}</div>
                <div className="text-slate-400 text-[11px]">
                  Tindakan: {selectedCase.procedures.join(", ")}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
                <span className="font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <Pill className="h-3.5 w-3.5 text-teal-400" />
                  Resep Obat Diberikan ({selectedCase.medications.length})
                </span>
                <div className="space-y-1">
                  {selectedCase.medications.map(m => (
                    <div key={m.medicineId} className="flex justify-between text-slate-300">
                      <span>• {m.name}</span>
                      <span className="text-slate-400 font-mono">{m.quantity} tab ({m.days} hr)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Validation Checklist Results */}
            <div className="pt-6 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Hasil Pre-Verifikasi Sistem BPJS
              </h4>

              <div className="space-y-3">
                {report.checks.map(c => (
                  <div
                    key={c.id}
                    className={`p-3.5 rounded-lg border flex items-start space-x-3 ${
                      c.passed
                        ? "bg-slate-950/50 border-slate-800"
                        : c.severity === "CRITICAL"
                        ? "bg-rose-950/20 border-rose-900/60"
                        : "bg-amber-950/20 border-amber-900/60"
                    }`}
                  >
                    {c.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" />
                    )}
                    <div className="space-y-0.5 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-slate-200">{c.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          {c.category}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{c.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actionable Recommendations */}
              {report.recommendedFixes.length > 0 && (
                <div className="mt-5 p-4 rounded-lg bg-teal-950/30 border border-teal-900/50 space-y-2">
                  <h5 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    Instruksi Perbaikan Berkas Casemix (Cegah Dispute):
                  </h5>
                  <ul className="text-xs text-slate-300 space-y-1.5 pl-4 list-disc">
                    {report.recommendedFixes.map((fix, idx) => (
                      <li key={idx}>{fix}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Input Pasien Baru */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Input Kasus Pasien BPJS Baru</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nama Pasien</label>
                <input
                  type="text"
                  placeholder="Contoh: Bpk. Mulyono"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nomor Kartu BPJS (13 Digit)</label>
                <input
                  type="text"
                  placeholder="0001892837190"
                  value={newBpjs}
                  onChange={e => setNewBpjs(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Pilih Diagnosa Primer (ICD-10)</label>
                <select
                  value={newIcd}
                  onChange={e => setNewIcd(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-500"
                >
                  {icd10Catalog.map(icd => (
                    <option key={icd.code} value={icd.code}>
                      {icd.code} - {icd.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Resep Obat Fornas</label>
                  <select
                    value={newMedId}
                    onChange={e => setNewMedId(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-500"
                  >
                    {fornasMedicines.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.fornasLevel})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Durasi Hari</label>
                  <input
                    type="number"
                    value={newDays}
                    onChange={e => setNewDays(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 rounded bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
              >
                Batal
              </button>
              <button
                onClick={handleAddCase}
                className="px-4 py-2 rounded bg-teal-600 text-white text-xs font-medium hover:bg-teal-500"
              >
                Validasi Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
