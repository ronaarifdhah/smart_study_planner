"use client";

import Link from "next/link";

export default function SignUpPage() {
  return (
    <div
      style={{
        backgroundColor: "#091223",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      {/* kiri */}
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
            color: "#60A5FA",
            fontSize: "55px",
          }}
        >
          🎓 Smart Study Planner
        </h1>

        <h1
          style={{
            marginTop: "100px",
            fontSize: "60px",
          }}
        >
          Start Your Journey ✨
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

      {/* kanan */}
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
            boxShadow: "0px 0px 25px rgba(96,165,250,0.5)",
          }}
        >

          <p style={{ color: "white", marginTop: "30px" }}>
            Nama Lengkap
          </p>

          <input
            type="text"
            placeholder="Masukkan nama"
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

          <p
            style={{
              color: "white",
              marginTop: "20px",
            }}
          >
            Email
          </p>

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
            }}
          />

          <p
            style={{
              color: "white",
              marginTop: "20px",
            }}
          >
            Password
          </p>

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
                "linear-gradient(90deg,#60A5FA,#A855F7)",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Daftar
          </button>

          <p
            style={{
              color: "#C5CAE9",
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            Sudah punya akun?

            <Link
              href="/login"
              style={{
                color: "#60A5FA",
                textDecoration: "none",
              }}
            >
              {" "}Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}