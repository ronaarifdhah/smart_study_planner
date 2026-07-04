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
  Plus,
  Trash2,
  Video,
  FileText,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";

// Tipe Data untuk Acara/Tugas
interface Event {
  id: string;
  title: string;
  course?: string;
  time: string;
  type: "Bimbingan" | "Deadline" | "Belajar" | "Kelompok" | "Ujian";
  location: string;
  year: number;
  month: number; // 0 = Januari, 5 = Juni, 11 = Desember
  date: number;
}

export default function SmartStudyPage() {
  // State Navigasi Menu & Pencarian
  const [activeMenu, setActiveMenu] = useState("Kalender");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State Kalender Dinamis (Default: Juni 2026 sesuai Screenshot 2026-06-24 134843.jpg)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // 5 melambangkan Juni dalam JavaScript Date
  const [selectedDate, setSelectedDate] = useState<number>(23);

  // State Form Acara Baru
  const [newTitle, setNewTitle] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newTime, setNewTime] = useState("10.00 - 11.00");
  const [newType, setNewType] = useState<Event["type"]>("Belajar");
  const [newLocation, setNewLocation] = useState("Online (Zoom)");

  // Dummy Data Awal sesuai Screenshot 2026-06-24 134843.jpg
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Bimbingan Skripsi",
      course: "Skripsi",
      time: "10.00 - 11.00",
      type: "Bimbingan",
      location: "Online (Zoom)",
      year: 2026,
      month: 5,
      date: 23,
    },
    {
      id: "2",
      title: "Deadline Esai Sejarah",
      course: "HIST 210",
      time: "23.59",
      type: "Deadline",
      location: "E-Learning",
      year: 2026,
      month: 5,
      date: 23,
    },
    {
      id: "3",
      title: "Review Pemrograman Web",
      course: "Web Dev",
      time: "15.00 - 17.00",
      type: "Belajar",
      location: "Lab Komputer",
      year: 2026,
      month: 5,
      date: 24,
    },
    {
      id: "4",
      title: "Lab Report Fisika",
      course: "Fisika Dasar",
      time: "23.59",
      type: "Deadline",
      location: "E-Learning",
      year: 2026,
      month: 5,
      date: 25,
    },
  ]);

  // Daftar Nama Bulan Bahasa Indonesia
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Handler Pindah Bulan
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(1); // Reset tanggal pilihan ke 1 tiap ganti bulan
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(1);
  };

  // Handler Tambah Acara Baru
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEvent: Event = {
      id: Date.now().toString(),
      title: newTitle,
      course: newCourse || undefined,
      time: newTime,
      type: newType,
      location: newLocation,
      year: currentYear,
      month: currentMonth,
      date: selectedDate, // Langsung otomatis masuk ke tanggal yang sedang dipilih
    };

    setEvents([...events, newEvent]);
    setIsModalOpen(false);

    // Reset form teks saja
    setNewTitle("");
    setNewCourse("");
  };

  // Handler Hapus Acara
  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // Logika Kalkulasi Grid Kalender secara Presisi
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Minggu, 1 = Senin, dst.

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blankDaysBefore = Array.from({ length: firstDayIndex });

  // Filter Data untuk List Hari Ini & Pencarian global
  const filteredEventsByDate = events.filter(
    (event) =>
      event.year === currentYear &&
      event.month === currentMonth &&
      event.date === selectedDate &&
      event.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Statistik untuk kartu kanan (Hanya menghitung bulan aktif)
  const totalAcaraBulanIni = events.filter(
    (e) => e.year === currentYear && e.month === currentMonth,
  ).length;
  const totalDeadlineBulanIni = events.filter(
    (e) =>
      e.year === currentYear &&
      e.month === currentMonth &&
      e.type === "Deadline",
  ).length;
  const upcomingEvents = events
    .filter(
      (e) =>
        (e.year === currentYear &&
          e.month === currentMonth &&
          e.date >= selectedDate) ||
        (e.year >= currentYear && e.month > currentMonth),
    )
    .slice(0, 2);

  // Helper Warna Kategori
  const getTypeStyles = (type: Event["type"]) => {
    switch (type) {
      case "Bimbingan":
        return {
          bg: "bg-emerald-50 text-emerald-600",
          dot: "bg-emerald-500",
          label: "Bimbingan",
        };
      case "Deadline":
        return {
          bg: "bg-amber-50 text-amber-600",
          dot: "bg-amber-500",
          label: "Deadline",
        };
      case "Belajar":
        return {
          bg: "bg-purple-50 text-purple-600",
          dot: "bg-purple-500",
          label: "Belajar",
        };
      case "Kelompok":
        return {
          bg: "bg-sky-50 text-sky-600",
          dot: "bg-sky-500",
          label: "Kelompok",
        };
      case "Ujian":
        return {
          bg: "bg-rose-50 text-rose-600",
          dot: "bg-rose-500",
          label: "Ujian",
        };
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

          {/* Navigasi */}
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

        {/* Tips Box */}
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
        {/* Header Atas */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Kolom Cari */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari tugas, mata kuliah, atau catatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-11 pr-4 py-3 rounded-full border border-slate-100 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
            />
          </div>

          {/* Aksi Kanan */}
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

        {/* Sub-judul & Tombol Tambah */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-slate-400 font-medium">
              Kalender Academic
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 tracking-tight">
              Jadwal & Tenggat
            </h2>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#6366F1] hover:bg-indigo-600 text-white font-medium text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Acara Baru
          </button>
        </div>

        {/* Layout Grid Konten */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri: Kalender dan List Agenda */}
          <div className="lg:col-span-2 space-y-6">
            {/* Box Kalender Dinamis */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              {/* Kepala Kalender + Navigasi Bulan */}
              <div className="flex items-center justify-between mb-6 px-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-700 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="font-bold text-sm text-slate-800 tracking-wide">
                  {monthNames[currentMonth]} {currentYear}
                </div>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-700 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Nama Hari */}
              <div className="grid grid-cols-7 text-center text-xs text-slate-400 font-medium mb-3">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>

              {/* Grid Angka Tanggal Dinamis */}
              <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
                {/* Isian Kosong Sebelum Tanggal 1 */}
                {blankDaysBefore.map((_, index) => (
                  <div
                    key={`blank-${index}`}
                    className="text-slate-200 py-2"
                  ></div>
                ))}

                {/* Isian Tanggal Aktual */}
                {daysArray.map((day) => {
                  const isSelected = selectedDate === day;
                  // Menandai hari ini secara manual (misal: 24 Juni 2026 seperti pada Screenshot 2026-06-24 134843.jpg)
                  const isToday =
                    day === 24 && currentMonth === 5 && currentYear === 2026;
                  const hasEvents = events.some(
                    (e) =>
                      e.year === currentYear &&
                      e.month === currentMonth &&
                      e.date === day,
                  );

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`relative py-2 mx-auto w-9 h-9 rounded-full flex items-center justify-center font-medium transition-all ${
                        isSelected
                          ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                          : isToday
                            ? "bg-sky-100 text-sky-600"
                            : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {day}
                      {hasEvents && !isSelected && (
                        <span className="absolute bottom-1 w-1 h-1 bg-purple-400 rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* List Agenda berdasarkan Tanggal & Bulan Terpilih */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 text-sm">
                  Agenda Tanggal {selectedDate} {monthNames[currentMonth]}{" "}
                  {currentYear}
                </h3>
                <span className="text-xs px-2.5 py-1 bg-slate-50 text-slate-500 rounded-full font-medium">
                  {filteredEventsByDate.length} acara
                </span>
              </div>

              {filteredEventsByDate.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  Tidak ada agenda khusus di tanggal ini. Tekan tombol "+ Acara
                  Baru" untuk menjadwalkan.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredEventsByDate.map((event) => {
                    const styles = getTypeStyles(event.type);
                    return (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50/50 transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-2.5 rounded-xl ${styles.bg}`}>
                            {event.type === "Bimbingan" ? (
                              <Video className="w-4 h-4" />
                            ) : (
                              <FileText className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-800 text-sm">
                                {event.title}
                              </h4>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${styles.bg}`}
                              >
                                {styles.label}
                              </span>
                            </div>
                            {event.course && (
                              <p className="text-xs text-slate-400 mt-0.5">
                                {event.course}
                              </p>
                            )}
                            <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                              <span>🕒 {event.time}</span>
                              <span>📍 {event.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Tombol Hapus Acara */}
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-2 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all"
                          title="Hapus Agenda"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ================= KOLOM KANAN ================= */}
          <div className="space-y-6">
            {/* Kartu Statistik Bulan yang Sedang Dilihat */}
            <div className="bg-linear-to-br from-sky-400 to-indigo-500 text-white p-6 rounded-3xl shadow-xl shadow-indigo-100 relative overflow-hidden">
              <div className="absolute -right-5 -top-5 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              <p className="text-xs text-white/80 font-medium">Bulan Ini</p>
              <h3 className="text-2xl font-bold mt-1">
                {monthNames[currentMonth]}
              </h3>
              <p className="text-xs text-white/60">{currentYear}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl">
                  <p className="text-[10px] text-white/70">Total Acara</p>
                  <p className="text-lg font-bold">{totalAcaraBulanIni}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl">
                  <p className="text-[10px] text-white/70">Deadline</p>
                  <p className="text-lg font-bold">{totalDeadlineBulanIni}</p>
                </div>
              </div>
            </div>

            {/* Kartu Agenda Terdekat */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                Mendatang
              </h3>

              <div className="space-y-4">
                {upcomingEvents.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-2">
                    Belum ada agenda mendatang.
                  </p>
                ) : (
                  upcomingEvents.map((event) => {
                    const styles = getTypeStyles(event.type);
                    return (
                      <div
                        key={event.id}
                        className="flex gap-4 items-start p-1"
                      >
                        <div className="bg-slate-50 border border-slate-100 rounded-xl px-2.5 py-1.5 text-center min-w-12">
                          <p className="text-[9px] uppercase text-slate-400 font-bold">
                            {monthNames[event.month].substring(0, 3)}
                          </p>
                          <p className="text-sm font-bold text-slate-700 leading-none">
                            {event.date}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-xs line-clamp-1">
                            {event.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {event.time}
                          </p>
                          <span
                            className={`inline-block text-[9px] px-2 py-0.5 rounded mt-1.5 font-bold ${styles.bg}`}
                          >
                            {styles.label}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Legenda */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 text-xs mb-3 uppercase tracking-wider">
                Legenda
              </h3>
              <div className="space-y-2.5 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full"></span>{" "}
                  Ujian
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>{" "}
                  Deadline
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-purple-500 rounded-full"></span>{" "}
                  Belajar
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-sky-500 rounded-full"></span>{" "}
                  Kelompok
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>{" "}
                  Bimbingan
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ================= MODAL TAMBAH ACARA ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 transform transition-all scale-100">
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Buat Acara Baru
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Acara akan disimpan pada tanggal{" "}
              <span className="text-purple-600 font-bold">
                {selectedDate} {monthNames[currentMonth]} {currentYear}
              </span>
              .
            </p>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Nama Acara / Tugas
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kuis Matematika Diskrit"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Mata Kuliah / Kode (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: IF-201"
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Waktu
                </label>
                <input
                  type="text"
                  required
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    Kategori
                  </label>
                  <select
                    value={newType}
                    onChange={(e) =>
                      setNewType(e.target.value as Event["type"])
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Belajar">Belajar</option>
                    <option value="Deadline">Deadline</option>
                    <option value="Bimbingan">Bimbingan</option>
                    <option value="Kelompok">Kelompok</option>
                    <option value="Ujian">Ujian</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    Lokasi / Platform
                  </label>
                  <input
                    type="text"
                    required
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs transition-all shadow-md shadow-purple-100"
                >
                  Simpan Acara
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
