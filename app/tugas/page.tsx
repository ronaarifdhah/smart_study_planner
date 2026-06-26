"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
  Search,
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Calendar,
  Target,
  BarChart3,
  Bell,
  Settings,
} from "lucide-react";

type Task = {
  id: number;
  title: string;
  subject: string;
  deadline: string;
  priority: "Tinggi" | "Sedang" | "Rendah";
  completed: boolean;
};

export default function Home() {
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");

  const [activeMenu, setActiveMenu] = useState("Tugas");

  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    subject: "",
    deadline: "",
    priority: "Sedang" as "Tinggi" | "Sedang" | "Rendah",
  });

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Kerjakan PR Statistika Bab 3",
      subject: "Statistika",
      deadline: "2026-06-12",
      priority: "Tinggi",
      completed: false,
    },
    {
      id: 2,
      title: "Baca jurnal Sosiologi",
      subject: "Sosiologi",
      deadline: "2026-06-13",
      priority: "Sedang",
      completed: false,
    },
    {
      id: 3,
      title: "Rangkum materi Kalkulus",
      subject: "Kalkulus",
      deadline: "2026-06-11",
      priority: "Tinggi",
      completed: true,
    },
    {
      id: 4,
      title: "Latihan TOEFL Listening",
      subject: "Bahasa Inggris",
      deadline: "2026-06-15",
      priority: "Rendah",
      completed: false,
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  };

  const addTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      subject: newTask.subject,
      deadline: newTask.deadline,
      priority: newTask.priority,
      completed: false,
    };

    setTasks([task, ...tasks]);

    setNewTask({
      title: "",
      subject: "",
      deadline: "",
      priority: "Sedang",
    });

    setShowModal(false);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;

    if (filter === "done") return task.completed;

    return true;
  });

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "Tinggi":
        return "bg-red-100 text-red-500";

      case "Sedang":
        return "bg-yellow-100 text-yellow-600";

      case "Rendah":
        return "bg-green-100 text-green-600";

      default:
        return "";
    }
  };

  return (
    <main
      className={`min-h-screen bg-[#f6f8ff] text-slate-800"
      }`}
    >
      <div className="flex">
        {/* SIDEBAR */}
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

        <section className="flex-1 p-10">
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
          </div>

          {/* HEADER */}

          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-5xl font-bold text-black">Manajemen Tugas</h1>
              <p className="mt-2 text-slate-700">
                {completedCount} dari {tasks.length} tugas selesai ✨
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="
              px-7
              py-3
              rounded-full
              text-white
              bg-linear-to-r
              from-purple-600
              to-cyan-500
              hover:scale-105
              transition
              "
            >
              + Tambah Tugas
            </button>
          </div>

          {/* FILTER */}

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 rounded-full ${
                filter === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              Semua
            </button>

            <button
              onClick={() => setFilter("active")}
              className={`px-5 py-2 rounded-full ${
                filter === "active"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              Aktif
            </button>

            <button
              onClick={() => setFilter("done")}
              className={`px-5 py-2 rounded-full ${
                filter === "done"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              Selesai
            </button>
          </div>

          {/* TASK LIST */}

          <div className="p-6 rounded-3xl bg-white">
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="
                    flex
                    justify-between
                    items-center
                    p-5
                    rounded-2xl
                    transition-all
                    duration-300
                    hover:shadow-xl
                    hover:-translate-y-1
                    hover:scale-[1.02]
                    cursor-pointer
                    "
                >
                  <div className="flex items-center gap-4">
                    <button onClick={() => toggleTask(task.id)}>
                      {task.completed ? (
                        <CheckCircle2 size={26} className="text-green-500" />
                      ) : (
                        <Circle size={26} className="text-slate-500" />
                      )}
                    </button>

                    <div>
                      <h3
                        className={`text-xl font-semibold ${
                          task.completed
                            ? "line-through text-slate-400"
                            : "text-black"
                        }`}
                      >
                        {task.title}
                      </h3>

                      <p className="text-black">
                        {task.subject} • Tenggat {task.deadline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                        task.priority,
                      )}`}
                    >
                      {task.priority}
                    </span>

                    <Pencil
                      size={18}
                      className="cursor-pointer text-slate-700 hover:text-purple-600"
                    />

                    <Trash2
                      size={18}
                      className="cursor-pointer text-red-500 hover:text-red-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-xl bg-white rounded-3xl p-8 shadow-2xl">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Tambah Tugas Baru
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Tambahkan tugas dan atur tenggatnya.
              </p>
            </div>

            {/* Nama Tugas */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nama Tugas
              </label>

              <input
                type="text"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    title: e.target.value,
                  })
                }
                placeholder="Contoh: PR Statistika Bab 3"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none text-black focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Mata Kuliah */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Mata Kuliah
              </label>

              <input
                type="text"
                value={newTask.subject}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    subject: e.target.value,
                  })
                }
                placeholder="Contoh: Statistika"
                className="w-full border border-slate-200 text-black rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Deadline */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tenggat
              </label>

              <input
                type="date"
                value={newTask.deadline}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    deadline: e.target.value,
                  })
                }
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Prioritas
                </label>

                <select
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      priority: e.target.value as
                        | "Tinggi"
                        | "Sedang"
                        | "Rendah",
                    })
                  }
                  className="w-full border border-slate-200 text-black rounded-xl px-4 py-3"
                >
                  <option>Tinggi</option>
                  <option>Sedang</option>
                  <option>Rendah</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>

                <select className="w-full border border-slate-200 text-black rounded-xl px-4 py-3">
                  <option>Belum Selesai</option>
                  <option>Selesai</option>
                </select>
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="
                px-5
                py-3
                rounded-xl
                bg-slate-100
                text-slate-600
                hover:bg-slate-200
                "
              >
                Batal
              </button>

              <button
                onClick={addTask}
                className="
                  px-6
                  py-3
                  rounded-xl
                  text-white
                  bg-linear-to-r
                  from-purple-600
                  to-cyan-500
                  "
              >
                Simpan Tugas
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
