# 🛡️ FaskesShield

> **BPJS Kesehatan Claim Pre-Validator & ICD-10/Fornas Clinical Compliance Checker for Indonesian Primary Clinics (FKTP)**

[![CI](https://github.com/src-id/faskes-shield/actions/workflows/ci.yml/badge.svg)](https://github.com/src-id/faskes-shield/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![Powered by SRC ID](https://img.shields.io/badge/Powered%20by-SRC%20ID-blue)](https://github.com/src-id)

FaskesShield membantu Klinik Pratama dan Faskes Tingkat Pertama (FKTP) di Indonesia melakukan pra-validasi berkas rekam medis dan klaim BPJS Kesehatan sebelum diajukan ke verifikator BPJS (P-Care / E-Klaim), mengeliminasi risiko klaim dispute dan pending berbulan-bulan.

---

## 🎯 Masalah yang Diselesaikan

Di sistem jaminan kesehatan nasional BPJS, **ratusan juta rupiah klaim klinik pratama tertahan (pending/dispute)** setiap bulannya akibat ketidaksesuaian administrasi klinis:
1. **Pelanggaran Fornas (Formularium Nasional)**: Meresepkan obat restriksi Rumah Sakit / FKRTL (seperti Cefixime, PPI injeksi) di faskes primer tanpa rujukan resmi.
2. **Mismatch Diagnosa vs Terapi**: Kode ICD-10 primer tidak mendukung terapi obat yang diberikan.
3. **Over-durasi Peresepan**: Melebihi plafon hari Fornas (misal obat non-kronis diberikan lebih dari 5-7 hari).
4. **Persyaratan Klaim PRB (Program Rujuk Balik)**: Klaim 30 hari obat kronis hipertensi/diabetes tanpa kelengkapan rekam medis rujukan balik.

---

## ✨ Fitur Utama

- 🔍 **Validasi Kode ICD-10 FKTP**: Pemeriksaan kepatuhan 144 diagnosis kompetensi dokter umum faskes primer.
- 💊 **Fornas Tier Compliance Guard**: Deteksi dini peresepan obat level lanjutan (FKRTL) yang pasti memicu penolakan verifikator.
- ⏱️ **Plafon Durasi Hari**: Audit otomatis batas maksimal jumlah hari obat per episode kunjungan.
- 📋 **Instruksi Koreksi Casemix**: Rekomendasi langkah konkret medis per pasien sebelum berkas difinalisasi.
- 📊 **Dashboard Kelolosan Klaim**: Pantau *acceptance rate* dan estimasi nominal pencairan dana klaim faskes.

---

## 🏗️ Arsitektur & Tech Stack

```
src-faskes-shield/
├── src/
│   ├── app/                    # Next.js 15 App Router & Clinical Dashboard
│   ├── lib/
│   │   ├── types.ts            # Zod schemas (PatientCase, ICD10, Fornas)
│   │   ├── clinical-database.ts# Katalog ICD-10 & Fornas FKTP Indonesia
│   │   ├── claim-validator.ts  # Rules engine verifikasi klaim BPJS
│   │   └── __tests__/          # Bun native unit test suite
```

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS (Clinical Dark Theme)
- **Validation**: Zod
- **Icons**: Lucide React
- **Runtime**: Bun / Node.js 22 LTS

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone git@github.com:src-id/faskes-shield.git
cd faskes-shield
bun install
```

### 2. Jalankan Unit Tests
```bash
bun test
```

### 3. Jalankan Local Dev Server
```bash
bun run dev
```
Buka [http://localhost:3000](http://localhost:3000).

### 4. Build Production
```bash
bun run build
```

---

## 📄 Lisensi
MIT License © 2026 [SRC ID](https://github.com/src-id).
