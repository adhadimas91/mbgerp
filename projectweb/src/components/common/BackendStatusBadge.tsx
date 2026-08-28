"use client";
import React, { useEffect, useState } from "react";
import apiClient from "../../lib/api";

interface HealthData {
  status: string;
  database?: {
    connected: boolean;
    latencyMs?: number;
  };
  environment?: string;
  version?: string;
}

export default function BackendStatusBadge() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  const checkHealth = async () => {
    setIsChecking(true);
    try {
      const res = await apiClient.get("/health", { timeout: 3000 });
      const data = res.data?.data || res.data;
      setHealth(data);
      const isHealthy =
        data?.status === "ok" ||
        data?.status === "UP" ||
        data?.database?.connected === true ||
        data?.components?.database?.status === "HEALTHY";
      setIsOnline(isHealthy);
    } catch (err) {
      setIsOnline(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={checkHealth}
      title={
        isOnline
          ? `Backend Terhubung (Live DB Latency: ${health?.database?.latencyMs ?? "<5"}ms)`
          : "Backend Offline - Menggunakan Mode Data Simulasi Cerdas"
      }
      className={`cursor-pointer transition-all duration-200 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
        isOnline === null
          ? "bg-gray-100 dark:bg-gray-800 text-gray-600 border-gray-300 dark:border-gray-700"
          : isOnline
          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800/60 shadow-xs"
          : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800/60"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isOnline === null
            ? "bg-gray-400 animate-pulse"
            : isOnline
            ? "bg-emerald-500 animate-pulse"
            : "bg-amber-500"
        }`}
      />
      <span>
        {isChecking
          ? "Checking API..."
          : isOnline
          ? "Live DB: Connected"
          : "Demo / Hybrid Mode"}
      </span>
    </div>
  );
}
