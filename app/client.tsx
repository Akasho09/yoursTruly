"use client";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    axios.post("/api/track");
  }, []);

  return (
    <></>
  );
}
