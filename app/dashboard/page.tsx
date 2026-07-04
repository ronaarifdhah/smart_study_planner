"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Target,
  BarChart3,
  Bell,
  Moon,
  Search,
  GraduationCap,
  Settings,
  Plus,
  CheckCircle2,
  Clock,
  Flame,
  Coffee,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

// Interface untuk struktur data tugas
interface Tugas {
  id: number;
  judul: string;
  waktu: string;
  prioritas: "Tinggi" | "Sedang" | "Rendah";
  selesai: boolean;
}

export default function DasborPage() {
  // State Navigasi Menu Samping
  const [activeMenu, setActiveMenu] = useState("Dasbor");

  // State Daftar Tugas Hari Ini (Dibuat interaktif agar bisa dicentang & ditambah)
  const [daftarTugas, setDaftarTugas] = useState<Tugas[]>([
    {
      id: 1,
      judul: "Baca Bab 4 - Kalkulus Lanjut",
      waktu: "08.00 - 09.30",
      prioritas: "Tinggi",
      selesai: true,
    },
    {
      id: 2,
      judul: "Kerjakan PR Statistika",
      waktu: "10.00 - 11.30",
      prioritas: "Tinggi",
      selesai: false,
    },
    {
      id: 3,
      judul: "Diskusi kelompok Sosiologi",
      waktu: "13.00 - 14.00",
      prioritas: "Sedang",
      selesai: false,
    },
    {
      id: 4,
      judul: "Latihan soal Bahasa Inggris",
      waktu: "15.30 - 16.30",
      prioritas: "Rendah",
      selesai: false,
    },
    {
      id: 5,
      judul: "Review catatan Pemrograman",
      waktu: "19.00 - 20.00",
      prioritas: "Sedang",
      selesai: false,
    },
  ]);

  // Perhitungan Metrik Otomatis
  const totalTugas = daftarTugas.length;
  const totalSelesai = daftarTugas.filter((t) => t.selesai).length;
  const persentaseSelesai =
    totalTugas > 0 ? Math.round((totalSelesai / totalTugas) * 100) : 0;

  // Handler untuk mencentang dan menyontek tugas
  const handleToggleTugas = (id: number) => {
    setDaftarTugas(
      daftarTugas.map((tugas) =>
        tugas.id === id ? { ...tugas, selesai: !tugas.selesai } : tugas,
      ),
    );
  };

  // Handler untuk menambahkan tugas baru melalui prompt interaktif
  const handleTambahTugas = () => {
    const judul = prompt("Masukkan nama/judul tugas baru:");
    if (!judul) return;

    const waktu = prompt(
      "Masukkan jam pelaksanaan (contoh: 14.00 - 15.30):",
      "14.00 - 15.00",
    );
    if (!waktu) return;

    const prioritasInput = prompt(
      "Masukkan tingkat prioritas (Tinggi / Sedang / Rendah):",
      "Sedang",
    );
    let prioritas: "Tinggi" | "Sedang" | "Rendah" = "Sedang";
    if (prioritasInput === "Tinggi" || prioritasInput === "Rendah") {
      prioritas = prioritasInput;
    }

    const tugasBaru: Tugas = {
      id: Date.now(),
      judul,
      waktu,
      prioritas,
      selesai: false,
    };

    setDaftarTugas([...daftarTugas, tugasBaru]);
  };

  // Fungsi pembantu pewarnaan badge prioritas
  const getBadgeClass = (prioritas: string) => {
    switch (prioritas) {
      case "Tinggi":
        return "bg-rose-50 text-rose-500 border border-rose-100";
      case "Sedang":
        return "bg-amber-50 text-amber-500 border border-amber-100";
      case "Rendah":
        return "bg-emerald-50 text-emerald-500 border border-emerald-100";
      default:
        return "bg-slate-50 text-slate-500";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FD] text-slate-700 font-sans antialiased">
      {/* ================= SIDEBAR KIRI ================= */}
      <aside
        className="
          w-64
          bg-white
          border-r
          border-slate-100
          p-6
          flex
          flex-col
          justify-between
          sticky
          top-0
          h-screen
        "
      >
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 pl-2">
            <div className="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 leading-tight text-sm">
                Smart Study
              </h1>
              <p className="text-xs text-slate-400">Planner</p>
            </div>
          </div>

          {/* Navigasi Menu */}
          <nav className="space-y-1">
            {[
              { name: "Dasboard", icon: LayoutDashboard, href: "/dashboard" },
              { name: "Tugas", icon: BookOpen, href: "/tugas" },
              { name: "Kalender", icon: Calendar, href: "/kalender" },
              { name: "Pengingat", icon: Bell, href: "/pengingat" },
              { name: "Pengaturan", icon: Settings, href: "/pengaturan" },
            ].map((menu) => {
              const Icon = menu.icon;
              const isActive = activeMenu === menu.name;
              return (
                <Link key={menu.name} href={menu.href}>
                  <div
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-purple-50 text-purple-600 shadow-sm"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-purple-600" : "text-slate-400"}`}
                    />
                    {menu.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Kotak Tips Cerdas Samping */}
        <div className="bg-linear-to-br from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100/50">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-purple-600 text-xs font-bold">
              💡 Tips Cerdas
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Coba teknik Pomodoro 25 menit untuk fokus maksimal hari ini.
          </p>
        </div>
      </aside>

      {/* ================= AREA KONTEN UTAMA ================= */}
      <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
        {/* Top Bar / Header Atas */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari tugas, mata kuliah, atau catatan..."
              className="w-full bg-white pl-11 pr-4 py-3 rounded-full border border-slate-100 text-sm focus:outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-4 justify-end">
            <Link
              href="/pengingat"
              className="relative p-2.5 bg-white rounded-full border border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-purple-600 transition-all cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
            </Link>
            <Link
              href="/pengaturan"
              className="w-10 h-10 bg-pink-400 text-white font-bold rounded-full flex items-center justify-center text-sm shadow-sm cursor-pointer"
            >
              AR
            </Link>
          </div>
        </header>

        {/* Sapaan & Tombol Tambah */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs text-slate-400 font-medium">
              Selamat pagi, Aulia 👋
            </p>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              Siap belajar dengan tenang hari ini?
            </h2>
          </div>
        </div>

        {/* 4 KOTAK RINGKASAN METRIK (ATAS) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Metrik 1: Total Tugas */}
          <div className="bg-[#EEF2FF] p-4 rounded-2xl border border-indigo-50 flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-indigo-500">
                Tugas Hari Ini
              </p>
              <p className="text-2xl font-bold text-slate-800 mt-2">
                {totalTugas}
              </p>
            </div>
            <BookOpen className="w-4 h-4 text-indigo-400 mt-0.5" />
          </div>

          {/* Metrik 2: Total Selesai */}
          <div className="bg-[#EBFDF5] p-4 rounded-2xl border border-emerald-50 flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-emerald-600">Selesai</p>
              <p className="text-2xl font-bold text-slate-800 mt-2">
                {totalSelesai}
              </p>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
          </div>

          {/* Metrik 3: Jam Belajar */}
          <div className="bg-[#F0F9FF] p-4 rounded-2xl border border-sky-50 flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-sky-500">Jam Belajar</p>
              <p className="text-2xl font-bold text-slate-800 mt-2">4.2j</p>
            </div>
            <Clock className="w-4 h-4 text-sky-400 mt-0.5" />
          </div>

          {/* Metrik 4: Streak */}
          <div className="bg-[#FFFBEB] p-4 rounded-2xl border border-amber-50 flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-amber-600">Streak</p>
              <p className="text-2xl font-bold text-slate-800 mt-2">12 hari</p>
            </div>
            <Flame className="w-4 h-4 text-amber-500 mt-0.5" />
          </div>
        </div>

        {/* LAYOUT KONTEN GANDA (KOLOM KIRI & KOLOM KANAN) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* ================= KOLOM KIRI (LEBAR) ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* KOTAK INTERAKTIF: TUGAS HARI INI */}
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Tugas Hari Ini
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {totalSelesai} dari {totalTugas} selesai
                  </p>
                </div>
                <span className="text-[11px] font-bold bg-purple-50 text-purple-600 px-2 py-0.5 rounded-md">
                  {persentaseSelesai}%
                </span>
              </div>

              {/* Progress Bar Dinamis */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-purple-400 transition-all duration-500 ease-out"
                  style={{ width: `${persentaseSelesai}%` }}
                ></div>
              </div>

              {/* List Daftar Tugas */}
              <div className="space-y-4">
                {daftarTugas.map((tugas) => (
                  <div
                    key={tugas.id}
                    onClick={() => handleToggleTugas(tugas.id)}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-slate-50/60 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {/* Tombol Bulat Centang */}
                      <button
                        type="button"
                        className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                          tugas.selesai
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-slate-300 bg-white group-hover:border-purple-400"
                        }`}
                      >
                        {tugas.selesai && (
                          <span className="text-[10px] font-bold">✓</span>
                        )}
                      </button>

                      {/* Judul & Jam (Bisa Nyoret Otomatis) */}
                      <div>
                        <p
                          className={`text-xs font-semibold transition-all ${
                            tugas.selesai
                              ? "line-through text-slate-400 font-normal"
                              : "text-slate-700"
                          }`}
                        >
                          {tugas.judul}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {tugas.waktu}
                        </p>
                      </div>
                    </div>

                    {/* Badge Prioritas */}
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getBadgeClass(tugas.prioritas)}`}
                    >
                      {tugas.prioritas}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* BARIS SEJAJAR: GRAFIK PROGRES MINGGUAN & ANALITIK FOKUS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Grafik Progres Mingguan */}
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xs font-bold text-slate-800">
                    Progres Mingguan
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    Jam belajar
                  </span>
                </div>
                {/* Visual Diagram Batang Murni CSS */}
                <div className="flex justify-between items-end h-28 pt-2 px-1">
                  {[
                    { hari: "Sen", h: "h-12" },
                    { hari: "Sel", h: "h-16" },
                    { hari: "Rab", h: "h-10" },
                    { hari: "Kam", h: "h-24" },
                    { hari: "Jum", h: "h-14" },
                    { hari: "Sab", h: "h-20" },
                    { hari: "Min", h: "h-8" },
                  ].map((bar, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 flex-1"
                    >
                      <div
                        className={`w-6 ${bar.h} bg-linear-to-t from-sky-400 to-purple-400 rounded-md`}
                      ></div>
                      <span className="text-[10px] text-slate-400">
                        {bar.hari}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grafik Analitik Fokus */}
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-bold text-slate-800">
                    Analitik Fokus
                  </h4>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-500 px-1.5 py-0.5 rounded">
                    +18%
                  </span>
                </div>
                {/* Visual Mini Line Chart */}
                <div className="relative h-24 flex items-end justify-center mb-2">
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 100 50"
                  >
                    <path
                      d="M 5,40 Q 30,30 50,32 T 95,15"
                      fill="none"
                      stroke="#818CF8"
                      strokeWidth="2.5"
                    />
                    <circle cx="5" cy="40" r="3" fill="#818CF8" />
                    <circle cx="50" cy="32" r="3" fill="#818CF8" />
                    <circle cx="95" cy="15" r="3" fill="#818CF8" />
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 px-1">
                  <span>W1</span>
                  <span>W2</span>
                  <span>W3</span>
                  <span>W4</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= KOLOM KANAN (RAMPING) ================= */}
          <div className="space-y-6">
            {/* Ringkasan Produktivitas */}
            <div className="bg-linear-to-br from-indigo-400 to-sky-400 text-white p-5 rounded-3xl shadow-md">
              <p className="text-[11px] font-medium opacity-90">
                Ringkasan Produktivitas
              </p>
              <p className="text-3xl font-extrabold mt-2">84%</p>
              <p className="text-[10px] opacity-80 mt-0.5">
                Skor fokus minggu ini
              </p>

              <div className="w-full h-1.5 bg-white/20 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-white w-[84%]"></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5 pt-3 border-t border-white/10 text-center">
                <div className="bg-white/10 p-2 rounded-xl">
                  <p className="text-[10px] opacity-70">Sesi</p>
                  <p className="text-sm font-bold mt-0.5">24</p>
                </div>
                <div className="bg-white/10 p-2 rounded-xl">
                  <p className="text-[10px] opacity-70">Istirahat</p>
                  <p className="text-sm font-bold mt-0.5">12</p>
                </div>
              </div>
            </div>

            {/* Waktu Belajar Disarankan */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 text-amber-500 mb-3">
                <Coffee className="w-4 h-4" />
                <h4 className="text-xs font-bold text-slate-800">
                  Waktu Belajar Disarankan
                </h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal mb-4">
                Berdasarkan pola fokusmu, waktu paling produktif:
              </p>
              <div className="space-y-3">
                {[
                  { jam: "09.00 – 11.00", ket: "Fokus tinggi" },
                  { jam: "15.00 – 16.30", ket: "Review materi" },
                  { jam: "19.30 – 21.00", ket: "Latihan soal" },
                ].map((waktu, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-[11px] py-1"
                  >
                    <span className="font-semibold text-slate-700">
                      {waktu.jam}
                    </span>
                    <span className="text-slate-400 text-xs">{waktu.ket}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tujuan Harian (Progress Bars) */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-bold text-slate-800">
                  Tujuan Harian
                </h4>
                <Target className="w-4 h-4 text-purple-400" />
              </div>
              <div className="space-y-4">
                {/* Target 1 */}
                <div>
                  <div className="flex justify-between text-[10px] font-semibold text-slate-600 mb-1">
                    <span>Belajar 4 jam</span>
                    <span>72%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400 w-[72%]"></div>
                  </div>
                </div>
                {/* Target 2 */}
                <div>
                  <div className="flex justify-between text-[10px] font-semibold text-slate-600 mb-1">
                    <span>Selesaikan 5 tugas</span>
                    <span>20%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-400 w-[20%]"></div>
                  </div>
                </div>
                {/* Target 3 */}
                <div>
                  <div className="flex justify-between text-[10px] font-semibold text-slate-600 mb-1">
                    <span>3 sesi Pomodoro</span>
                    <span>66%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 w-[66%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pengingat Cerdas */}
            <div className="bg-linear-to-br from-rose-50 to-amber-50 p-4 rounded-2xl border border-rose-100/50 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
                  Pengingat Cerdas
                </h5>
                <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                  Esai Sejarah jatuh tempo{" "}
                  <span className="font-bold text-slate-800">
                    besok pukul 23.59
                  </span>
                  . Sisihkan 90 menit malam ini untuk menyelesaikannya.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= AREA PALING BAWAH: TENGGAT MENDATANG ================= */}
        <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-800">
              Tenggat Mendatangan
            </h3>
            <button className="text-xs font-semibold text-purple-600 flex items-center gap-0.5 hover:underline">
              Lihat semua <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { t: "Esai Sejarah Modern", d: "HIST 210 • Besok", p: "Tinggi" },
              {
                t: "Lab Report Fisika",
                d: "PHYS 102 • 3 hari lagi",
                p: "Sedang",
              },
              {
                t: "Proyek UI Design",
                d: "DKV 305 • 5 hari lagi",
                p: "Sedang",
              },
              { t: "Kuis Algoritma", d: "CS 201 • 1 minggu", p: "Rendah" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-[#FAFAFA] rounded-xl border border-slate-100/50"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 text-purple-500 rounded-lg">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700">
                      {item.t}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {item.d}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getBadgeClass(item.p)}`}
                >
                  {item.p}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
