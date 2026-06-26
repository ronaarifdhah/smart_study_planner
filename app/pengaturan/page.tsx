"use client";

import Link from "next/link";
import React, { useState, useRef } from "react";
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
  User,
  Lock,
  BellRing,
  Paintbrush,
  LogOut,
  Camera,
  Sun,
} from "lucide-react";

export default function PengaturanPage() {
  // State Navigasi Menu Samping
  const [activeMenu, setActiveMenu] = useState("Pengaturan");

  // State Profil Pengguna
  const [username, setUsername] = useState("ayu_rahma");
  const [email, setEmail] = useState("ayu.rahma@kampus.ac.id");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State Keamanan Akun
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State Pengaturan Notifikasi (Toggle Saklar)
  const [notifTugas, setNotifTugas] = useState(true);
  const [notifTenggat, setNotifTenggat] = useState(true);
  const [notifBelajar, setNotifBelajar] = useState(false);

  // State Tampilan/Tema
  const [themeMode, setThemeMode] = useState<"terang" | "gelap">("terang");

  // Handler Upload/Ubah Foto Profil
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file maksimal 2MB!");
        return;
      }
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  // Handler Aksi Tombol
  const handleSimpanProfil = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Profil berhasil diperbarui!\nNama: ${username}\nEmail: ${email}`);
  };

  const handleUbahPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Harap isi semua kolom kata sandi!");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Konfirmasi sandi baru tidak cocok!");
      return;
    }
    alert("Kata sandi sukses diganti!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleLogout = () => {
    const yakin = window.confirm("Apakah Anda yakin ingin keluar dari akun?");
    if (yakin) alert("Sesi diakhiri. Kembali ke halaman login.");
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
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100/50">
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

      {/* ================= AREA UTAMA (KONTEN) ================= */}
      <main className="flex-1 p-6 lg:p-8 max-w-4xl mx-auto w-full overflow-y-auto">
        {/* Header Atas */}
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
            <div className="relative p-2.5 bg-white rounded-full border border-slate-100 text-slate-500 hover:bg-slate-50 cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
            </div>
            <div className="w-10 h-10 bg-pink-400 text-white font-bold rounded-full flex items-center justify-center text-sm shadow-sm cursor-pointer">
              AR
            </div>
          </div>
        </header>

        {/* Judul Menu Utama Pengaturan */}
        <div className="flex items-start gap-4 mb-8">
          <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
            <Settings className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Pengaturan
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Kelola profil, keamanan, notifikasi, dan tampilan aplikasimu.
            </p>
          </div>
        </div>

        {/* FORM KONTEN (SEKUENSIAL KE BAWAH) */}
        <div className="space-y-6">
          {/* 1. KARTU PROFIL PENGGUNA */}
          <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-start gap-3 mb-6">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 leading-none">
                  Profil Pengguna
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Perbarui informasi akunmu.
                </p>
              </div>
            </div>

            <form onSubmit={handleSimpanProfil} className="space-y-6">
              {/* Sesi Input Foto Profil */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-tr from-pink-400 to-purple-500 text-white font-bold rounded-full flex items-center justify-center text-lg shadow-inner">
                      AR
                    </div>
                  )}
                  {/* Tombol Input File tersembunyi */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-1.5 bg-white border border-slate-100 text-slate-500 rounded-full shadow-md hover:bg-slate-50 transition-transform active:scale-90"
                    title="Ubah Foto Profil"
                  >
                    <Camera className="w-3 h-3 text-purple-500" />
                  </button>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-700">
                    Foto Profil
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    PNG/JPG, maks 2MB.
                  </p>
                </div>
              </div>

              {/* Grid Form Isian Nama & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Nama Pengguna
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-[#FAFAFA] text-sm focus:outline-none focus:bg-white focus:border-purple-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-[#FAFAFA] text-sm focus:outline-none focus:bg-white focus:border-purple-400 transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#7C3AED] hover:bg-purple-700 text-white font-medium text-xs px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </section>

          {/* 2. KARTU KEAMANAN AKUN */}
          <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-start gap-3 mb-6">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 leading-none">
                  Keamanan Akun
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ubah kata sandi secara berkala untuk menjaga keamanan.
                </p>
              </div>
            </div>

            <form onSubmit={handleUbahPassword} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Kata Sandi Saat Ini
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-[#FAFAFA] text-sm focus:outline-none focus:bg-white focus:border-purple-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-[#FAFAFA] text-sm focus:outline-none focus:bg-white focus:border-purple-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Konfirmasi Sandi
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-[#FAFAFA] text-sm focus:outline-none focus:bg-white focus:border-purple-400 transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#7C3AED] hover:bg-purple-700 text-white font-medium text-xs px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
                >
                  Ubah Kata Sandi
                </button>
              </div>
            </form>
          </section>

          {/* 3. KARTU PENGATURAN NOTIFIKASI */}
          <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-start gap-3 mb-6">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                <BellRing className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 leading-none">
                  Pengaturan Notifikasi
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Pilih notifikasi yang ingin kamu terima.
                </p>
              </div>
            </div>

            {/* List Baris Saklar */}
            <div className="divide-y divide-slate-50">
              {/* Row 1 */}
              <div className="flex items-center justify-between py-4 first:pt-0">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Notifikasi Tugas
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Pemberitahuan saat ada tugas baru atau diperbarui.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifTugas(!notifTugas)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-all ${notifTugas ? "bg-purple-500 justify-end" : "bg-slate-200 justify-start"}`}
                >
                  <span className="w-4 h-4 bg-white rounded-full shadow-sm"></span>
                </button>
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Notifikasi Tenggat
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Ingatkan saya menjelang tenggat tugas.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifTenggat(!notifTenggat)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-all ${notifTenggat ? "bg-purple-500 justify-end" : "bg-slate-200 justify-start"}`}
                >
                  <span className="w-4 h-4 bg-white rounded-full shadow-sm"></span>
                </button>
              </div>

              {/* Row 3 */}
              <div className="flex items-center justify-between py-4 last:pb-0">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Notifikasi Belajar
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Pengingat sesi belajar dan Pomodoro.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifBelajar(!notifBelajar)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-all ${notifBelajar ? "bg-purple-500 justify-end" : "bg-slate-200 justify-start"}`}
                >
                  <span className="w-4 h-4 bg-white rounded-full shadow-sm"></span>
                </button>
              </div>
            </div>
          </section>

          {/* 4. KARTU TAMPILAN (TEMA) */}
          <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-start gap-3 mb-6">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                <Paintbrush className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 leading-none">
                  Tampilan
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Sesuaikan tema agar nyaman di mata.
                </p>
              </div>
            </div>

            {/* Pilihan Mode Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Opsi Terang */}
              <button
                type="button"
                onClick={() => setThemeMode("terang")}
                className={`p-4 rounded-2xl border text-left flex items-start gap-4 transition-all ${
                  themeMode === "terang"
                    ? "border-purple-400 ring-2 ring-purple-100 bg-white"
                    : "border-slate-100 bg-[#FAFAFA] opacity-70"
                }`}
              >
                <div className="p-2 bg-amber-50 rounded-xl text-amber-500 mt-0.5">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Mode Terang
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Warna lembut & cerah.
                  </p>
                </div>
              </button>
            </div>
          </section>

          {/* 5. BAGIAN BAR KELUAR AKUN (LOGOUT) */}
          <div className="bg-rose-50 border border-rose-100/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 self-start sm:self-center">
              <div className="p-2.5 bg-rose-100/50 text-rose-500 rounded-xl">
                <LogOut className="w-4 h-4 transform rotate-180" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-rose-700 leading-none">
                  Keluar dari akun
                </h4>
                <p className="text-[11px] text-rose-400 mt-1">
                  Kamu akan kembali ke halaman masuk dan sesi ini akan diakhiri.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full sm:w-auto bg-[#F43F5E] hover:bg-rose-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm shadow-rose-100 transition-all transform active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
