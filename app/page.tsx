"use client";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    axios.post("/api/track");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">
        IP Tracking with PostgreSQL + Prisma ✅
      </h1>
    </main>
  );
}
