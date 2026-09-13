"use client";

import React from "react";
import { SrcIdLogo } from "../SrcIdLogo";
import {
  LayoutDashboard,
  Layers,
  Stethoscope,
  BookOpen,
  Pill,
  ShieldCheck,
  Download,
  Upload,
  Sparkles,
  ChevronRight,
  X,
  Plus,
  AlertTriangle
} from "lucide-react";

interface SidebarProps {
  activeTab: "overview" | "batch" | "single" | "diagnosa144" | "fornas";
  setActiveTab: (tab: "overview" | "batch" | "single" | "diagnosa144" | "fornas") => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  onNewCase: () => void;
}

export function Sidebar({
  activeTab,
  setActiveTab,
  isOpenMobile,
  setIsOpenMobile,
  onNewCase
}: SidebarProps) {
  const navItems = [
    {
      group: "AUDIT & PRE-VALIDASI KLAIM",
      items: [
        {
          id: "overview" as const,
          label: "Dashboard Overview",
          icon: LayoutDashboard,
          badge: "Live",
          badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        },
        {
          id: "batch" as const,
          label: "Audit Batch (50 Klaim)",
          icon: Layers,
          badge: "CSV/JSON",
          badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20"
        },
        {
          id: "single" as const,
          label: "Pre-Validator Kasus Tunggal",
          icon: Stethoscope,
          badge: "Direct",
          badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20"
        },
        {
          id: "diagnosa144" as const,
          label: "Katalog 144 Non-Spesialistik",
          icon: BookOpen,
          badge: "144 ICD",
          badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
        },
        {
          id: "fornas" as const,
          label: "Restriksi Fornas FKTP & FKRTL",
          icon: Pill,
          badge: "Anti-Dispute",
          badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20"
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#091512] border-r border-emerald-950/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-emerald-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-sm p-1.5">
              <SrcIdLogo className="w-full h-full" stroke="#34d399" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold tracking-tight text-white font-mono">FaskesShield</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/80 font-semibold">
                  vClaim
                </span>
              </div>
              <p className="text-[10px] text-emerald-300/60 truncate max-w-[150px]">Klinik Pratama Sehat Mandiri</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpenMobile(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-emerald-950"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add Case Button */}
        <div className="p-4 border-b border-emerald-950/60">
          <button
            type="button"
            onClick={() => {
              onNewCase();
              setIsOpenMobile(false);
            }}
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Audit Pasien Baru</span>
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navItems.map((sec) => (
            <div key={sec.group} className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-emerald-500/60 font-mono">
                {sec.group}
              </p>
              <div className="space-y-0.5 pt-1">
                {sec.items.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsOpenMobile(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                        isActive
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold"
                          : "text-slate-300 hover:bg-emerald-950/40 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComponent className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-emerald-500/60"}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Verification Engine Info */}
          <div className="p-3 bg-emerald-950/30 border border-emerald-900/40 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rules Engine BPJS 2026</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Mendeteksi otomatis diagnosa spesialistik, obat terlarang FKTP, masa berlaku SEP &gt;15 hari, dan duplikasi kelas terapi.
            </p>
          </div>
        </div>

        {/* Footer Profile & TrustMark */}
        <div className="p-3 border-t border-emerald-950 bg-[#060f0d]">
          <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold font-mono text-xs flex items-center justify-center border border-emerald-500/30">
              HK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">dr. Hendra Kurniawan</p>
              <p className="text-[10px] text-emerald-400/70 truncate">Verifikator Klaim FKTP</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="vClaim Online" />
          </div>
        </div>
      </aside>
    </>
  );
}
