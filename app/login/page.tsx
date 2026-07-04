"use client";

import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (!email || !password) {
      alert("Email dan Password harus diisi!");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div
      style={{
        backgroundColor: "#091223",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      {/* Kiri */}
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "white",
        }}
      >
        <div className="flex items-center gap-5 mb-8 pl-2">
          <div className="w-15 h-15 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <GraduationCap className="w-10 h-10" />
          </div>
          <div>
            <h1 className="font-bold text-white leading-tight text-5xl">
              Smart Study Planner
            </h1>
          </div>
        </div>

        <p
          style={{
            color: "#C5CAE9",
            marginTop: "10px",
            fontSize: "20px",
          }}
        ></p>

        <h1
          style={{
            marginTop: "100px",
            fontSize: "40px",
          }}
        >
          Welcome Back 👋
        </h1>

        <p
          style={{
            marginTop: "20px",
            color: "#C5CAE9",
            fontSize: "20px",
            lineHeight: "35px",
          }}
        >
          Wujudkan kebiasaan belajar yang lebih baik bersama Smart Study Planner
          dengan mengatur jadwal, mencatat tugas, dan mencapai target belajarmu
          secara lebih terstruktur
        </p>
      </div>

      {/* Kanan */}
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "450px",
            backgroundColor: "#121D38",
            padding: "50px",
            borderRadius: "30px",
            boxShadow: "0px 0px 25px rgba(168,85,247,0.5)",
          }}
        >
          <p style={{ color: "white" }}>Email</p>

          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#1A294A",
              color: "white",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          />

          <p style={{ color: "white" }}>Password</p>

          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#1A294A",
              color: "white",
              marginTop: "10px",
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              marginTop: "30px",
              padding: "18px",
              border: "none",
              borderRadius: "20px",
              background: "linear-gradient(90deg,#A855F7,#60A5FA)",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <p
            style={{
              color: "#C5CAE9",
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            Belum punya akun?
            <Link
              href="/signup"
              style={{
                color: "#C084FC",
                textDecoration: "none",
              }}
            >
              {" "}
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
