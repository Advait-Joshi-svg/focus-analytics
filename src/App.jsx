import { useMemo, useState } from "react";
import { useSessions } from "./hooks/useSessions";

import DashboardShell from "./components/DashboardShell";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardGrid from "./components/DashboardGrid";
import Panel from "./components/Panel";

import SessionControls from "./components/SessionControls";
import MetricsCards from "./components/MetricsCards";
import SessionTable from "./components/SessionTable";
import FocusScoreChart from "./components/FocusScoreChart";
import FilterBar from "./components/FilterBar";
import SessionDetailsDrawer from "./components/SessionDetailsDrawer";

export default function App() {
  const {
    sessions,
    activeSession,
    startSession,
    endSession,
    addDistraction,
    resetAll,
  } = useSessions();

  const [range, setRange] = useState("ALL");
  const [view, setView] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);

  const filteredSessions = useMemo(() => {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    if (range === "ALL") return sessions;

    if (range === "TODAY") {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const t0 = startOfDay.getTime();
      return sessions.filter((s) => s.start >= t0);
    }

    const t0 = now - 7 * dayMs;
    return sessions.filter((s) => s.start >= t0);
  }, [sessions, range]);

  const searchedSessions = useMemo(() => {
    if (!query) return filteredSessions;
    const q = query.toLowerCase();

    return filteredSessions.filter((s) => {
      const startStr = new Date(s.start).toLocaleString().toLowerCase();
      const endStr = s.end
        ? new Date(s.end).toLocaleString().toLowerCase()
        : "";
      const status = s.active ? "active" : "completed";

      return (
        startStr.includes(q) ||
        endStr.includes(q) ||
        status.includes(q)
      );
    });
  }, [filteredSessions, query]);

  return (
    <DashboardShell
      sidebar={
        <Sidebar
          view={view}
          onChange={(v) => {
            setSelectedSession(null);
            setView(v);
          }}
        />
      }
      topbar={<Topbar title="Main Dashboard" onSearch={setQuery} />}
    >
      {view === "dashboard" && (
        <>
          {/* Controls row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            <SessionControls
              activeSession={activeSession}
              onStart={startSession}
              onEnd={endSession}
              onDistraction={addDistraction}
              onReset={resetAll}
            />
            <FilterBar value={range} onChange={setRange} />
          </div>

          <DashboardGrid
            kpis={<MetricsCards sessions={searchedSessions} />}
            leftChart={
              <Panel title="Focus Score Trend">
                  <div style={{ width: "100%", minWidth: 0, overflow: "hidden" }}>
                <FocusScoreChart sessions={searchedSessions} />
                </div>
              </Panel>
            }
            rightChart={
              <Panel title="Sessions (Summary)">
                <div style={{ display: "grid", gap: 10, opacity: 0.9 }}>
                  <div>Sessions in range: <b>{searchedSessions.length}</b></div>
                  <div>Completed: <b>{searchedSessions.filter(s => s.end).length}</b></div>
                  <div>Active: <b>{searchedSessions.filter(s => s.active).length}</b></div>
                  <div>Avg distractions/session: <b>{
                    searchedSessions.length
                      ? (searchedSessions.reduce((sum, s) => sum + (s.distractions || 0), 0) / searchedSessions.length).toFixed(1)
                      : "0.0"
                  }</b></div>
                </div>
              </Panel>
            }
            table={
              <Panel title="Sessions Table">
                <SessionTable
                  sessions={searchedSessions}
                  onSelect={setSelectedSession}
                />
              </Panel>
            }
            pie={
              <Panel title="Breakdown">
              <div style={{ display: "grid", gap: 10, opacity: 0.9 }}>
                <div>0 distractions: <b>{searchedSessions.filter(s => (s.distractions || 0) === 0).length}</b></div>
                <div>1–2 distractions: <b>{searchedSessions.filter(s => {
                  const d = s.distractions || 0;
                  return d >= 1 && d <= 2;
                }).length}</b></div>
                <div>3+ distractions: <b>{searchedSessions.filter(s => (s.distractions || 0) >= 3).length}</b></div>
              </div>
            </Panel>
            }
          />
        </>
      )}

      {view === "sessions" && (
        <Panel title="All Sessions">
          <SessionTable
            sessions={searchedSessions}
            onSelect={setSelectedSession}
          />
        </Panel>
      )}

      {view === "insights" && (
        <Panel title="Insights">
          <div style={{ opacity: 0.7 }}>
            Insights engine coming next.
          </div>
        </Panel>
      )}

      {view === "settings" && (
        <Panel title="Settings">
          <div style={{ opacity: 0.7 }}>
            Export CSV, reset confirmation, preferences.
          </div>
        </Panel>
      )}

      {selectedSession && (
        <SessionDetailsDrawer
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </DashboardShell>
  );
}
