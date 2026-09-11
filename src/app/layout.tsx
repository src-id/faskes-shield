import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FaskesShield — BPJS Claim Pre-Validator & ICD-10 Compliance",
  description: "Pre-validasi berkas klaim BPJS Kesehatan & Fornas FKTP untuk cegah dispute di Klinik Pratama.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased selection:bg-teal-600 selection:text-white">
        <header className="border-b border-emerald-950/80 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 font-black text-white text-xl shadow-lg shadow-teal-500/30">
                🛡️
              </span>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight">FaskesShield</span>
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 font-mono border border-teal-500/20">
                  src-id v0.1
                </span>
              </div>
            </div>
            <nav className="flex items-center space-x-4 text-sm font-medium text-slate-300">
              <span className="hidden md:inline-block text-xs text-emerald-400 font-mono">
                BPJS FKTP Pre-Validator • Fornas Guard
              </span>
              <a
                href="https://github.com/src-id/faskes-shield"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-xs flex items-center transition"
              >
                GitHub Repo
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-emerald-950/60 mt-20 py-8 text-center text-xs text-slate-500">
          <p>© 2026 SRC ID (PT Solusi Rekayasa Cipta). Open Source Apache 2.0 / MIT.</p>
        </footer>
      </body>
    </html>
  );
}
