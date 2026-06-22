"use client";

import Link from "next/link";

export default function LoginPage() {
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
        <h1
          style={{
            color: "#C084FC",
            fontSize: "55px",
          }}
        >
          🎓 Smart Study Planner
        </h1>

        <p
          style={{
            color: "#C5CAE9",
            marginTop: "10px",
            fontSize: "20px",
          }}
        >
        </p>

        <h1
          style={{
            marginTop: "100px",
            fontSize: "60px",
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
          Wujudkan kebiasaan belajar yang lebih baik bersama Smart Study Planner dengan mengatur jadwal, mencatat tugas, dan mencapai target belajarmu secara lebih terstruktur
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
            style={{
              width: "100%",
              marginTop: "30px",
              padding: "18px",
              border: "none",
              borderRadius: "20px",
              background:
                "linear-gradient(90deg,#A855F7,#60A5FA)",
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
              {" "}Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}