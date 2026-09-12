"use client";

import React, { useState, useMemo } from "react";
import { PatientCase, ClaimValidationReport } from "../lib/types";
import { auditBatchClaims, generateAuditCsv } from "../lib/claim-validator";
import { simulated50BatchCases } from "../lib/batch-simulator";
import {
  Coins,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  XCircle,
  Download,
  FileCode,
  RefreshCw,
  Search,
  Stethoscope,
  Pill,
  FileText,
  ShieldCheck,
  ChevronRight,
  Activity
} from "lucide-react";

export function BatchAuditView() {
  const [batchCases, setBatchCases] = useState<PatientCase[]>(simulated50BatchCases);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedReport, setSelectedReport] = useState<ClaimValidationReport | null>(null);

  const auditReport = useMemo(() => auditBatchClaims(batchCases), [batchCases]);

  const filteredReports = useMemo(() => {
    return auditReport.claimReports.filter(c => {
      const matchesSearch =
        searchQuery === "" ||
        c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.primaryDiagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.sepNumber && c.sepNumber.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [auditReport.claimReports, searchQuery, statusFilter]);

  const handleDownloadCsv = () => {
    const csv = generateAuditCsv(auditReport);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `laporan-audit-bpjs-faskes-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(auditReport, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `laporan-audit-bpjs-faskes-${new Date().toISOString().split("T")[0]}.json`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleResetBatch = () => {
    setBatchCases([...simulated50BatchCases]);
    setSearchQuery("");
    setStatusFilter("ALL");
  };

  const { issueBreakdown } = auditReport;

  return (
    <div className="space-y-8">
      {/* Action Bar & Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-mono border border-teal-500/30">
              SIMULASI 50 KLAIM FKTP
            </span>
            <span className="text-xs text-slate-400">Periode Berjalan</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Audit Kolektif Berkas Klaim Faskes Tingkat Pertama
          </h2>
          <p className="text-xs text-slate-400">
            Deteksi otomatis anomali diagnosa non-kompetensi, pelanggaran Fornas, polifarmasi, dan administrasi SEP sebelum pengajuan klaim.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadCsv}
            className="px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={handleDownloadJson}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <FileCode className="h-3.5 w-3.5 text-teal-400" />
            <span>Ekspor JSON</span>
          </button>
          <button
            onClick={handleResetBatch}
            className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition"
            title="Reset Data Simulasi"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Dashboard Strip (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Klaim */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Nilai Klaim Faskes</span>
            <Coins className="h-4 w-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-white">
            Rp {auditReport.totalClaimAmount.toLocaleString("id-ID")}
          </div>
          <div className="text-xs text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60">
            <span>Volume Berkas</span>
            <span className="font-semibold text-slate-200">{auditReport.totalClaimsCount} Klaim Pasien</span>
          </div>
        </div>

        {/* Potensi Kerugian / Dispute */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Potensi Kerugian / Dispute</span>
            <AlertTriangle className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400">
            Rp {auditReport.totalDisputeRiskAmount.toLocaleString("id-ID")}
          </div>
          <div className="text-xs text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60">
            <span>Berkas Bermasalah</span>
            <span className="font-semibold text-rose-300">
              {auditReport.risikoDisputeCount + auditReport.potensiDitolakCount} Kasus
            </span>
          </div>
        </div>

        {/* Rasio Lolos Validasi */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Rasio Layak Cair</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">
            {auditReport.passRatio.layakCairPct}%
          </div>
          <div className="text-xs text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60">
            <span>Nilai Bersih Cair</span>
            <span className="font-semibold text-emerald-300">
              Rp {auditReport.layakCairAmount.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Breakdown Status Rasio */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Status Distribusi</span>
            <Activity className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-xs space-y-1.5 pt-1">
            <div className="flex justify-between">
              <span className="text-emerald-400 font-medium">Layak Cair:</span>
              <span className="font-mono text-slate-200">{auditReport.layakCairCount} ({auditReport.passRatio.layakCairPct}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-400 font-medium">Risiko Dispute:</span>
              <span className="font-mono text-slate-200">{auditReport.risikoDisputeCount} ({auditReport.passRatio.risikoDisputePct}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rose-400 font-medium">Potensi Ditolak:</span>
              <span className="font-mono text-slate-200">{auditReport.potensiDitolakCount} ({auditReport.passRatio.potensiDitolakPct}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Proportional Bar */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-xs font-semibold text-slate-300">
          <span>Proposi Status Klaim Kolektif</span>
          <span className="text-slate-400">Target Faskes Sehat: Layak Cair &gt; 90%</span>
        </div>
        <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex">
          <div
            style={{ width: `${auditReport.passRatio.layakCairPct}%` }}
            className="bg-emerald-500 transition-all duration-500"
            title={`Layak Cair: ${auditReport.passRatio.layakCairPct}%`}
          />
          <div
            style={{ width: `${auditReport.passRatio.risikoDisputePct}%` }}
            className="bg-amber-500 transition-all duration-500"
            title={`Risiko Dispute: ${auditReport.passRatio.risikoDisputePct}%`}
          />
          <div
            style={{ width: `${auditReport.passRatio.potensiDitolakPct}%` }}
            className="bg-rose-500 transition-all duration-500"
            title={`Potensi Ditolak: ${auditReport.passRatio.potensiDitolakPct}%`}
          />
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Layak Cair ({auditReport.passRatio.layakCairPct}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Risiko Dispute ({auditReport.passRatio.risikoDisputePct}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" /> Potensi Ditolak ({auditReport.passRatio.potensiDitolakPct}%)
          </span>
        </div>
      </div>

      {/* Tabel Breakdown Isu Klaim */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Tabel Breakdown Isu & Evaluasi Risiko Klaim
            </h3>
            <p className="text-xs text-slate-400">
              Klasifikasi 4 jenis anomali berkas penyebab penolakan dan dispute klaim BPJS Kesehatan di FKTP.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
            4 Kategori Utama
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase font-semibold text-[11px]">
                <th className="py-3 px-4">Kategori Isu</th>
                <th className="py-3 px-4">Deskripsi Dampak</th>
                <th className="py-3 px-4 text-center">Frekuensi Kasus</th>
                <th className="py-3 px-4 text-right">Nilai Klaim Terdampak</th>
                <th className="py-3 px-4">Rekomendasi Tindakan Casemix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {/* Row 1: Diagnosa Non-Kompetensi */}
              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-3.5 px-4 font-bold text-rose-400 flex items-center gap-2">
                  <AlertOctagon className="h-4 w-4 shrink-0 text-rose-400" />
                  {issueBreakdown.nonFktpDiagnosis.title}
                </td>
                <td className="py-3.5 px-4 text-slate-300 max-w-xs">
                  {issueBreakdown.nonFktpDiagnosis.description}
                </td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-white">
                  {issueBreakdown.nonFktpDiagnosis.count} kasus ({issueBreakdown.nonFktpDiagnosis.percentage}%)
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-rose-300">
                  Rp {issueBreakdown.nonFktpDiagnosis.totalAmount.toLocaleString("id-ID")}
                </td>
                <td className="py-3.5 px-4 text-slate-400 text-[11px] leading-relaxed">
                  {issueBreakdown.nonFktpDiagnosis.recommendation}
                </td>
              </tr>

              {/* Row 2: Pelanggaran Fornas */}
              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-3.5 px-4 font-bold text-amber-400 flex items-center gap-2">
                  <Pill className="h-4 w-4 shrink-0 text-amber-400" />
                  {issueBreakdown.fornasViolations.title}
                </td>
                <td className="py-3.5 px-4 text-slate-300 max-w-xs">
                  {issueBreakdown.fornasViolations.description}
                </td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-white">
                  {issueBreakdown.fornasViolations.count} kasus ({issueBreakdown.fornasViolations.percentage}%)
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-300">
                  Rp {issueBreakdown.fornasViolations.totalAmount.toLocaleString("id-ID")}
                </td>
                <td className="py-3.5 px-4 text-slate-400 text-[11px] leading-relaxed">
                  {issueBreakdown.fornasViolations.recommendation}
                </td>
              </tr>

              {/* Row 3: Polifarmasi Tidak Rasional */}
              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-3.5 px-4 font-bold text-orange-400 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-orange-400" />
                  {issueBreakdown.irrationalPolypharmacy.title}
                </td>
                <td className="py-3.5 px-4 text-slate-300 max-w-xs">
                  {issueBreakdown.irrationalPolypharmacy.description}
                </td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-white">
                  {issueBreakdown.irrationalPolypharmacy.count} kasus ({issueBreakdown.irrationalPolypharmacy.percentage}%)
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-orange-300">
                  Rp {issueBreakdown.irrationalPolypharmacy.totalAmount.toLocaleString("id-ID")}
                </td>
                <td className="py-3.5 px-4 text-slate-400 text-[11px] leading-relaxed">
                  {issueBreakdown.irrationalPolypharmacy.recommendation}
                </td>
              </tr>

              {/* Row 4: Ketidaksesuaian SEP */}
              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-3.5 px-4 font-bold text-sky-400 flex items-center gap-2">
                  <FileText className="h-4 w-4 shrink-0 text-sky-400" />
                  {issueBreakdown.sepMismatch.title}
                </td>
                <td className="py-3.5 px-4 text-slate-300 max-w-xs">
                  {issueBreakdown.sepMismatch.description}
                </td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-white">
                  {issueBreakdown.sepMismatch.count} kasus ({issueBreakdown.sepMismatch.percentage}%)
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-sky-300">
                  Rp {issueBreakdown.sepMismatch.totalAmount.toLocaleString("id-ID")}
                </td>
                <td className="py-3.5 px-4 text-slate-400 text-[11px] leading-relaxed">
                  {issueBreakdown.sepMismatch.recommendation}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabel 50 Berkas Klaim (Filter & Search) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Rincian Berkas Klaim Batch ({filteredReports.length} dari {auditReport.totalClaimsCount})
            </h3>
            <p className="text-xs text-slate-400">
              Pilih baris berkas untuk melihat audit trail dan instruksi perbaikan klaim secara detail.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari pasien, SEP, ICD..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 w-48 sm:w-56"
              />
            </div>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
            >
              <option value="ALL">Semua Status ({auditReport.totalClaimsCount})</option>
              <option value="LAYAK_CAIR">Layak Cair ({auditReport.layakCairCount})</option>
              <option value="RISIKO_DISPUTE">Risiko Dispute ({auditReport.risikoDisputeCount})</option>
              <option value="POTENSI_DITOLAK">Potensi Ditolak ({auditReport.potensiDitolakCount})</option>
            </select>
          </div>
        </div>

        {/* Claims Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase font-semibold text-[11px]">
                <th className="py-2.5 px-3">No</th>
                <th className="py-2.5 px-3">Pasien & No RM</th>
                <th className="py-2.5 px-3">No. SEP</th>
                <th className="py-2.5 px-3">Diagnosa Primer</th>
                <th className="py-2.5 px-3 text-right">Nilai Klaim</th>
                <th className="py-2.5 px-3 text-center">Skor</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredReports.map((c, index) => {
                return (
                  <tr
                    key={c.caseId}
                    className="hover:bg-slate-800/40 transition cursor-pointer"
                    onClick={() => setSelectedReport(c)}
                  >
                    <td className="py-3 px-3 font-mono text-slate-500">{index + 1}</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{c.patientName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">No BPJS: {c.bpjsNumber}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-300">
                      {c.sepNumber || "-"}
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-slate-200">{c.primaryDiagnosis}</div>
                      {c.issueCategories.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {c.issueCategories.map(issue => (
                            <span
                              key={issue}
                              className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-800 text-rose-400"
                            >
                              {issue === "nonFktpDiagnosis" && "Non-Kompetensi"}
                              {issue === "fornasViolations" && "Fornas"}
                              {issue === "irrationalPolypharmacy" && "Polifarmasi"}
                              {issue === "sepMismatch" && "SEP"}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-medium text-slate-200">
                      Rp {c.estimatedClaimAmount.toLocaleString("id-ID")}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`font-mono font-bold ${
                        c.score >= 80 ? "text-emerald-400" : c.score >= 50 ? "text-amber-400" : "text-rose-400"
                      }`}>
                        {c.score}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        c.status === "LAYAK_CAIR"
                          ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                          : c.status === "RISIKO_DISPUTE"
                          ? "bg-amber-950/80 text-amber-400 border-amber-800"
                          : "bg-rose-950/80 text-rose-400 border-rose-800"
                      }`}>
                        {c.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedReport(c);
                        }}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-medium"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Berkas Klaim */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-slate-300">
                    {selectedReport.caseId}
                  </span>
                  <span className="text-slate-400 font-mono">SEP: {selectedReport.sepNumber}</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedReport.patientName}
                </h3>
                <p className="text-xs text-slate-400">
                  Diagnosa: <strong className="text-slate-200">{selectedReport.primaryDiagnosis}</strong>
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400">Skor Kepatuhan</div>
                <div className={`text-2xl font-black ${
                  selectedReport.score >= 80 ? "text-emerald-400" : selectedReport.score >= 50 ? "text-amber-400" : "text-rose-400"
                }`}>
                  {selectedReport.score}%
                </div>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                  selectedReport.status === "LAYAK_CAIR"
                    ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                    : selectedReport.status === "RISIKO_DISPUTE"
                    ? "bg-amber-950 text-amber-400 border-amber-800"
                    : "bg-rose-950 text-rose-400 border-rose-800"
                }`}>
                  {selectedReport.status.replace("_", " ")}
                </span>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Rincian Evaluasi Aturan BPJS:
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {selectedReport.checks.map(item => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg border text-xs flex items-start space-x-2.5 ${
                      item.passed
                        ? "bg-slate-950/40 border-slate-800"
                        : item.severity === "CRITICAL"
                        ? "bg-rose-950/20 border-rose-900/50"
                        : "bg-amber-950/20 border-amber-900/50"
                    }`}
                  >
                    {item.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" />
                    )}
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-slate-200">{item.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {selectedReport.recommendedFixes.length > 0 && (
              <div className="p-4 rounded-lg bg-teal-950/30 border border-teal-900/50 space-y-2">
                <h5 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  Rekomendasi Perbaikan Klaim Casemix:
                </h5>
                <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                  {selectedReport.recommendedFixes.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
