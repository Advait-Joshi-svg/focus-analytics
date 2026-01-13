import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "focus_sessions";

function safeParse(json) {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useSessions() {
  const [sessions, setSessions] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? safeParse(stored) : [];
  });

  // Persist on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const activeSession = useMemo(() => {
    return sessions.find((s) => s.active) || null;
  }, [sessions]);

  const endActiveSession = (now) => (prev) =>
    prev.map((s) => (s.active ? { ...s, end: now, active: false } : s));

  const startSession = () => {
    const now = Date.now();
    setSessions((prev) => {
      const endedPrev = endActiveSession(now)(prev);
      const newSession = {
        id: crypto.randomUUID(),
        start: now,
        end: null,
        distractions: 0,
        active: true,
      };
      return [...endedPrev, newSession];
    });
  };

  const endSession = () => {
    const now = Date.now();
    setSessions((prev) => endActiveSession(now)(prev));
  };

  const addDistraction = (amount = 1) => {
    if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) return;

    setSessions((prev) =>
      prev.map((s) =>
        s.active ? { ...s, distractions: (s.distractions || 0) + amount } : s
      )
    );
  };

  const resetAll = () => {
    setSessions([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { sessions, activeSession, startSession, endSession, addDistraction, resetAll };
}
