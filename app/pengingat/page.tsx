"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Clock3,
  Search,
  Moon,
  Sun,
  Circle,
  CheckCircle2,
  Pencil,
  Trash2,
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Calendar,
  Target,
  BarChart3,
  Bell,
  Settings,
} from "lucide-react";

export default function PengingatPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [editReminder, setEditReminder] = useState({
    category: "",
    title: "",
    date: "",
  });

  const [activeMenu, setActiveMenu] = useState("Pengingat");

  const [reminders, setReminders] = useState([
    {
      id: 1,
      category: "Pengingat Tugas",
      title: "Mulai PR Statistika",
      date: "11 Juni 2026 • 09.00",
      icon: <BookOpen size={18} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 2,
      category: "Pengingat Tenggat",
      title: "Kumpulkan laporan praktikum",
      date: "12 Juni 2026 • 23.59",
      icon: <Calendar size={18} />,
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: 3,
      category: "Pengingat Belajar",
      title: "Sesi belajar Kalkulus",
      date: "10 Juni 2026 • 19.00",
      icon: <Clock3 size={18} />,
      color: "bg-blue-100 text-blue-600",
    },
  ]);

  const history = [
    {
      title: "Pengingat: Diskusi kelompok",
      time: "Hari ini, 13.00",
      icon: <BookOpen size={16} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Pengingat: Sesi Pomodoro",
      time: "Hari ini, 10.30",
      icon: <Clock3 size={16} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pengingat: Tenggat esai",
      time: "Kemarin, 22.00",
      icon: <Calendar size={16} />,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  const deleteReminder = (id: number) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus pengingat ini?",
    );

    if (!confirmDelete) return;

    setReminders(reminders.filter((item) => item.id !== id));
  };

  const saveReminder = () => {
    setReminders(
      reminders.map((item) =>
        item.id === editingId
          ? {
              ...item,
              category: editReminder.category,
              title: editReminder.title,
              date: editReminder.date,
            }
          : item,
      ),
    );

    setShowEditModal(false);
    setEditingId(null);

    setEditReminder({
      category: "",
      title: "",
      date: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f8ff] flex">
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
              { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
              { name: "Tugas", icon: BookOpen, href: "/tugas" },
              { name: "Kalender", icon: Calendar, href: "/kalender" },
              { name: "Pengingat", icon: Bell, href: "/pengingat" },
              { name: "Pengaturan", icon: Settings, href: "/pengaturan" },
            ].map((menu) => {
              const Icon = menu.icon;
              const isActive = activeMenu === menu.name;
              return (
                <Link
                  key={menu.name}
                  href={menu.href}
                  onClick={() => setActiveMenu(menu.name)}
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

      {/* CONTENT */}
      <main className="flex-1 p-8">
        {/* TOPBAR */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-130">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Cari tugas, mata kuliah, atau catatan..."
              className="
                w-full
                bg-white
                rounded-full
                text-black
                py-3
                pl-11
                pr-4
                shadow-sm
                outline-none
              "
            />
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/pengaturan"
              className="w-10 h-10 bg-pink-400 text-white font-bold rounded-full flex items-center justify-center text-sm shadow-sm cursor-pointer"
            >
              AR
            </Link>
          </div>
        </div>

        <div className="flex gap-8">
          {/* LEFT */}
          <section className="flex-1">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-5xl font-bold text-slate-900">Pengingat</h1>

                <p className="mt-2 text-gray-500">
                  Atur pengingat tugas, tenggat, dan sesi belajarmu.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {reminders.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-sm
                    relative
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-lg
                  "
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}
                    >
                      {item.icon}
                    </div>

                    <h3 className="text-xl font-semibold text-black">
                      {item.category}
                    </h3>

                    <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                      1
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold text-slate-900">
                    {item.title}
                  </h4>

                  <p className="text-gray-500 mt-2">{item.date}</p>

                  {/* ACTIONS */}
                  <div
                    className={`
                      absolute
                      right-6
                      top-1/2
                      -translate-y-1/2
                      flex
                      gap-2
                      transition-all
                      duration-300
                      ${
                        hovered === item.id
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-4"
                      }
                    `}
                  >
                    <button
                      onClick={() => {
                        setEditingId(item.id);

                        setEditReminder({
                          category: item.category,
                          title: item.title,
                          date: item.date,
                        });

                        setShowEditModal(true);
                      }}
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-yellow-100
                        text-yellow-600
                        flex
                        items-center
                        justify-center
                        hover:scale-110
                        transition
                      "
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => deleteReminder(item.id)}
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-red-100
                        text-red-500
                        flex
                        items-center
                        justify-center
                        hover:scale-110
                        transition
                      "
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT */}
          <aside className="w-85">
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Bell size={18} className="text-purple-500" />

                <h3 className="text-xl font-semibold text-black">
                  Riwayat Notifikasi
                </h3>
              </div>

              <div className="border-t pt-5 space-y-5">
                {history.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900">
                        {item.title}
                      </h4>

                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {showEditModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-xl bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Edit Pengingat
            </h2>

            <p className="text-sm text-slate-500 mb-6">
              Ubah informasi pengingat.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Kategori
              </label>

              <input
                type="text"
                value={editReminder.category}
                onChange={(e) =>
                  setEditReminder({
                    ...editReminder,
                    category: e.target.value,
                  })
                }
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Judul
              </label>

              <input
                type="text"
                value={editReminder.title}
                onChange={(e) =>
                  setEditReminder({
                    ...editReminder,
                    title: e.target.value,
                  })
                }
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tanggal
              </label>

              <input
                type="text"
                value={editReminder.date}
                onChange={(e) =>
                  setEditReminder({
                    ...editReminder,
                    date: e.target.value,
                  })
                }
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-black"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-5 py-3 rounded-xl bg-slate-100 text-slate-600"
              >
                Batal
              </button>

              <button
                onClick={saveReminder}
                className="px-6 py-3 rounded-xl text-white bg-linear-to-r from-purple-600 to-cyan-500"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({ text }: { text: string }) {
  return (
    <div
      className="
        px-4
        py-3
        rounded-2xl
        text-slate-700
        hover:bg-gray-100
        transition
        cursor-pointer
      "
    >
      {text}
    </div>
  );
}
