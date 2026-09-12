"use client";

import React, { useState } from "react";
import { samplePatientCases, icd10Catalog, fornasMedicines } from "../lib/clinical-database";
import { validateBpjsClaim } from "../lib/claim-validator";
import { PatientCase } from "../lib/types";
import { BatchAuditView } from "../components/BatchAuditView";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Header } from "../components/dashboard/Header";
import { MetricCards } from "../components/dashboard/MetricCards";
import { OverviewView } from "../components/dashboard/OverviewView";
import { DiagnosaCatalogView } from "../components/dashboard/DiagnosaCatalogView";
import { FornasCatalogView } from "../components/dashboard/FornasCatalogView";
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
  Sparkles,
  Layers,
  LayoutDashboard,
  BookOpen
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "batch" | "single" | "diagnosa144" | "fornas">("overview");
  const [selectedCase, setSelectedCase] = useState<PatientCase>(samplePatientCases[0]);
  const [searchFilter, setSearchFilter] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // New Case State
  const [newName, setNewName] = useState("");
  const [newBpjs, setNewBpjs] = useState("");
  const [newIcd, setNewIcd] = useState("J06.9");
  const [newMedId, setNewMedId] = useState("MED-01");
  const [newDays, setNewDays] = useState("5");

  const report = validateBpjsClaim(selectedCase);

  const handleAddCase = () => {
    if (!newName || !newBpjs) return;
    const med = fornasMedicines.find((m) => m.id === newMedId) || fornasMedicines[0];
    const daysNum = parseInt(newDays, 10) || 5;

    const newCase: PatientCase = {
      id: "case-" + Date.now(),
      patientNo: "RM-" + Math.floor(1000 + Math.random() * 9000),
      patientName: newName,
      age: 35,
      gender: "L",
      bpjsNumber: newBpjs,
      sepNumber: `0115R0010926V${Math.floor(10000 + Math.random() * 90000)}`,
      sepDate: new Date().toISOString().split("T")[0],
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
    setActiveTab("single");
  };

  return (
    <div className="min-h-screen flex bg-[#031310]">
      {/* RizzUI Collapsible Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
        onNewCase={() => setShowNewModal(true)}
      />

      {/* RizzUI Main Area with lg:pl-72 */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* RizzUI Header */}
        <Header
          activeTab={activeTab}
          searchQuery={searchFilter}
          setSearchQuery={setSearchFilter}
          onToggleMobileMenu={() => setIsOpenMobile((prev) => !prev)}
          onNewCase={() => setShowNewModal(true)}
        />

        {/* Main Content Workspace */}
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* Top Metric Cards */}
          <MetricCards onSelectTab={(tab) => setActiveTab(tab)} />

          {/* Navigation Pill Tabs */}
          <div className="flex items-center gap-1.5 border-b border-emerald-950/80 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === "overview"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#091512]"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Overview
            </button>
            <button
              onClick={() => setActiveTab("batch")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === "batch"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#091512]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Audit Batch (50 Klaim)
            </button>
            <button
              onClick={() => setActiveTab("single")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === "single"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#091512]"
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" /> Pre-Validator Tunggal
            </button>
            <button
              onClick={() => setActiveTab("diagnosa144")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === "diagnosa144"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#091512]"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> 144 Non-Spesialistik
            </button>
            <button
              onClick={() => setActiveTab("fornas")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === "fornas"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#091512]"
              }`}
            >
              <Pill className="w-3.5 h-3.5" /> Restriksi Obat Fornas
            </button>
          </div>

          {/* TAB CONTENTS */}
          {activeTab === "overview" && (
            <OverviewView
              onGoToBatch={() => setActiveTab("batch")}
              onGoToSingle={(c) => {
                if (c) setSelectedCase(c);
                setActiveTab("single");
              }}
              sampleCases={samplePatientCases}
            />
          )}

          {activeTab === "batch" && <BatchAuditView />}

          {activeTab === "diagnosa144" && <DiagnosaCatalogView />}

          {activeTab === "fornas" && <FornasCatalogView />}

          {activeTab === "single" && (
            <div className="space-y-6">
              {/* Single Mode: Patient Case Queue & Real-time Pre-Validator */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Patient Case Queue */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                      Antrean Berkas Pasien
                    </h2>
                    <button
                      onClick={() => setShowNewModal(true)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4"
                    >
                      + Pasien Baru
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {samplePatientCases.map((c) => {
                      const isSelected = selectedCase.id === c.id;
                      const r = validateBpjsClaim(c);
                      return (
                        <div
                          key={c.id}
                          onClick={() => setSelectedCase(c)}
                          className={`p-3.5 rounded-xl border transition cursor-pointer ${
                            isSelected
                              ? "bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-500/10"
                              : "bg-[#091512] border-emerald-950 hover:border-emerald-900"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-mono text-slate-400">{c.patientNo}</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                                r.status === "LAYAK_CAIR"
                                  ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                                  : r.status === "POTENSI_DITOLAK"
                                  ? "bg-rose-950 text-rose-400 border border-rose-800"
                                  : "bg-amber-950 text-amber-400 border border-amber-800"
                              }`}
                            >
                              {r.status}
                            </span>
                          </div>
                          <div className="text-sm font-bold text-white">{c.patientName}</div>
                          <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                            <span>
                              ICD: <strong className="text-slate-200 font-mono">{c.primaryIcd}</strong>
                            </span>
                            <span>Rp {c.claimAmount.toLocaleString("id-ID")}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right 2-Columns: Detailed Pre-Validation Audit Sheet */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-[#091512] border border-emerald-950 rounded-xl p-5 shadow-xl space-y-5">
                    {/* Header Case Card */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-950/80 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-extrabold text-white">{selectedCase.patientName}</h3>
                          <span className="text-xs font-mono text-slate-400">({selectedCase.patientNo})</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          SEP: <strong className="text-emerald-300 font-mono">{selectedCase.sepNumber}</strong> &bull; BPJS:{" "}
                          <strong className="text-slate-300 font-mono">{selectedCase.bpjsNumber}</strong>
                        </p>
                      </div>

                      <div className="text-right">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono ${
                            report.status === "LAYAK_CAIR"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                              : report.status === "POTENSI_DITOLAK"
                              ? "bg-rose-950 text-rose-300 border border-rose-700"
                              : "bg-amber-950 text-amber-300 border border-amber-700"
                          }`}
                        >
                          {report.status === "LAYAK_CAIR" ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                          )}
                          <span>{report.status}</span>
                        </span>
                        <div className="text-xs text-slate-400 mt-1 font-mono">
                          Skor Validasi: <strong className="text-emerald-400 font-bold">{report.score} / 100</strong>
                        </div>
                      </div>
                    </div>

                    {/* Clinical Details */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#050f0c] p-3 rounded-lg border border-emerald-950 text-xs">
                      <div>
                        <span className="text-slate-500 block text-[11px]">Tgl Pelayanan</span>
                        <span className="font-mono text-slate-200">{selectedCase.serviceDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Tgl Terbit SEP</span>
                        <span className="font-mono text-slate-200">{selectedCase.sepDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Diagnosa Primer</span>
                        <span className="font-mono font-bold text-emerald-400">{selectedCase.primaryIcd}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Nominal Klaim</span>
                        <span className="font-mono text-slate-200">Rp {selectedCase.claimAmount.toLocaleString("id-ID")}</span>
                      </div>
                    </div>

                    {/* Prescription List */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                        Resep Terapi Obat (Fornas):
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedCase.medications.map((m) => (
                          <div
                            key={m.medicineId}
                            className="p-2.5 rounded-lg bg-[#050f0c] border border-emerald-950 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <Pill className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <div>
                                <p className="font-medium text-slate-200">{m.name}</p>
                                <p className="text-[10px] text-slate-500">{m.signa}</p>
                              </div>
                            </div>
                            <span className="font-mono text-slate-400 text-[11px]">{m.days} hari</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Validation Checkpoints List */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                        Hasil Pemeriksaan Aturan vClaim:
                      </h4>
                      <div className="space-y-2">
                        {report.checks.map((c) => (
                          <div
                            key={c.id}
                            className={`p-3 rounded-lg border flex items-start space-x-3 text-xs ${
                              c.passed
                                ? "bg-[#050f0c] border-emerald-950"
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
                            <div className="space-y-0.5">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-slate-200">{c.name}</span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
                                  {c.category}
                                </span>
                              </div>
                              <p className="text-slate-300 leading-relaxed">{c.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Fixes */}
                    {report.recommendedFixes.length > 0 && (
                      <div className="p-4 rounded-lg bg-emerald-950/30 border border-emerald-900/50 space-y-2">
                        <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                          <AlertTriangle className="h-4 w-4 text-amber-400" />
                          Instruksi Perbaikan Berkas Casemix (Cegah Dispute):
                        </h5>
                        <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
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
          )}
        </main>

        {/* RizzUI Footer */}
        <footer className="border-t border-emerald-950/80 py-4 px-6 text-center text-[11px] text-emerald-500/60 font-mono">
          FaskesShield &bull; BPJS Claim Pre-Validator &bull; SRC-ID Ecosystem &bull; RizzUI Dashboard
        </footer>
      </div>

      {/* Modal Input Pasien Baru */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#091512] border border-emerald-800 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Input Kasus Pasien BPJS Baru</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nama Pasien</label>
                <input
                  type="text"
                  placeholder="Contoh: Bpk. Mulyono"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#050f0c] border border-emerald-900 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nomor Kartu BPJS (13 Digit)</label>
                <input
                  type="text"
                  placeholder="0001892837190"
                  value={newBpjs}
                  onChange={(e) => setNewBpjs(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#050f0c] border border-emerald-900 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Pilih Diagnosa Primer (ICD-10)</label>
                <select
                  value={newIcd}
                  onChange={(e) => setNewIcd(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#050f0c] border border-emerald-900 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  {icd10Catalog.map((icd) => (
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
                    onChange={(e) => setNewMedId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#050f0c] border border-emerald-900 text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    {fornasMedicines.map((m) => (
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
                    onChange={(e) => setNewDays(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#050f0c] border border-emerald-900 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleAddCase}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-500"
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
