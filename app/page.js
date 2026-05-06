"use client";
import { useState } from "react";
import { horizons, meta } from "../data/kpis";

const TABS = ["Overview", "KPI Sheets", "Summary Table"];

// ─── Tab bar ──────────────────────────────────────────────────────────────────
function TabBar({ active, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{ fontFamily: "var(--font-body)" }}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer border ${
            active === tab
              ? "bg-white text-black border-white"
              : "text-(--muted) border-(--border) hover:border-gray-500 hover:text-(--text)"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ─── KPI card ─────────────────────────────────────────────────────────────────
function KPICard({ kpi, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-(--surface) border border-(--border) rounded-2xl p-8 hover:border-gray-600 transition-all duration-200 cursor-pointer w-full group"
    >
      <p
        style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}
        className="text-(--muted) mb-4 tracking-wide"
      >
        {kpi.id}
      </p>
      <p
        style={{ fontFamily: "var(--font-heading)", fontSize: "18px" }}
        className="font-bold text-(--text) mb-6 leading-snug"
      >
        {kpi.name}
      </p>
      <div className="space-y-2.5 text-sm text-(--muted)">
        <p>
          <span className="text-(--text) font-medium">SLO:</span> {kpi.slo}
        </p>
        <p>
          <span className="text-(--text) font-medium">Frequency:</span>{" "}
          {kpi.frequency}
        </p>
        <p>
          <span className="text-(--text) font-medium">Formula:</span>{" "}
          {kpi.formula}
        </p>
      </div>
    </button>
  );
}

// ─── Horizon section ──────────────────────────────────────────────────────────
function HorizonSection({ horizon, onKpiClick }) {
  return (
    <div className="mb-14">
      <div
        className="relative flex items-center px-8 py-5 rounded-xl mb-6 border border-(--border) overflow-hidden"
        style={{ backgroundColor: "var(--surface)" }}
      >
        <p
          style={{ fontFamily: "var(--font-heading)", fontSize: "15px" }}
          className="font-semibold text-(--text) relative z-10 pr-12"
        >
          {horizon.label} · {horizon.range} — {horizon.tagline}
        </p>
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.03) 8px, rgba(255,255,255,0.03) 16px)",
            maskImage: "linear-gradient(to left, black 0%, transparent 55%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 0%, transparent 55%)",
          }}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {horizon.kpis.map((kpi) => (
          <KPICard
            key={kpi.id}
            kpi={kpi}
            onClick={() => onKpiClick(kpi, horizon)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── KPI detail sheet ─────────────────────────────────────────────────────────
function KPISheet({ kpi, horizon }) {
  const rows = [
    { label: "Why this KPI?", value: kpi.why },
    { label: "What it brings", value: kpi.value },
    { label: "Formula", value: kpi.formula, mono: true },
    { label: "Frequency", value: kpi.frequency },
    { label: "Assumptions & limits", value: kpi.limits },
    { label: "If SLO not met (SLA)", value: kpi.sla },
  ];

  return (
    <div className="bg-(--surface) border border-(--border) rounded-2xl overflow-hidden">
      <div className="p-10 border-b border-(--border)">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <p
              style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}
              className="text-(--muted) mb-2 tracking-wide"
            >
              {kpi.id}
            </p>
            <h3
              style={{ fontFamily: "var(--font-heading)" }}
              className="text-2xl font-bold text-(--text)"
            >
              {kpi.name}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-(--muted) mb-1">SLO</p>
            <p className="font-bold text-2xl text-(--text)">{kpi.slo}</p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-(--border)">
        {rows.map((row) => (
          <div
            key={row.label}
            className="px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <p className="text-xs font-semibold text-(--muted) uppercase tracking-wider pt-0.5">
              {row.label}
            </p>
            <p
              style={
                row.mono ? { fontFamily: "var(--font-mono)", fontSize: "13px" } : {}
              }
              className={`sm:col-span-2 text-sm text-(--text) leading-relaxed ${
                row.mono
                  ? "bg-black/40 px-4 py-3 rounded-lg border border-(--border)"
                  : ""
              }`}
            >
              {row.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── KPI sheets tab ───────────────────────────────────────────────────────────
function KPISheetsTab({ selectedKpi }) {
  const [activeHorizon, setActiveHorizon] = useState(
    selectedKpi?.horizon.id ?? "H1"
  );
  const horizon = horizons.find((h) => h.id === activeHorizon);

  return (
    <div>
      <div className="flex gap-2 mb-8 flex-wrap">
        {horizons.map((h) => {
          const isActive = activeHorizon === h.id;
          return (
            <button
              key={h.id}
              onClick={() => setActiveHorizon(h.id)}
              style={{ fontFamily: "var(--font-body)" }}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border ${
                isActive
                  ? "bg-white text-black border-white shadow-sm"
                  : "text-(--muted) border-(--border) hover:border-gray-500 hover:text-(--text)"
              }`}
            >
              {h.id} · {h.range}
            </button>
          );
        })}
      </div>

      <div
        className="relative flex items-center px-6 py-4 rounded-xl mb-8 border border-(--border) overflow-hidden"
        style={{ backgroundColor: "var(--surface)" }}
      >
        <div className="relative z-10">
          <p className="text-xs font-semibold text-(--muted) uppercase tracking-wider mb-1">
            Objective
          </p>
          <p className="text-sm text-(--text)">{horizon.tagline}</p>
          <ul className="mt-3 space-y-1.5">
            {horizon.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-(--muted)">
                <span className="w-1 h-1 rounded-full bg-(--muted) mt-2 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.03) 8px, rgba(255,255,255,0.03) 16px)",
            maskImage: "linear-gradient(to left, black 0%, transparent 60%)",
            WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="space-y-6">
        {horizon.kpis.map((kpi) => (
          <KPISheet key={kpi.id} kpi={kpi} horizon={horizon} />
        ))}
      </div>
    </div>
  );
}

// ─── Summary table tab ────────────────────────────────────────────────────────
function SummaryTableTab() {
  const allKpis = horizons.flatMap((h) =>
    h.kpis.map((k) => ({ ...k, horizon: h }))
  );

  return (
    <div>
      <div className="mb-8">
        <h2
          style={{ fontFamily: "var(--font-heading)" }}
          className="text-xl font-bold text-(--text) mb-1"
        >
          Summary Table
        </h2>
        <p className="text-sm text-(--muted)">
          All 8 KPIs across the three time horizons.
        </p>
      </div>

      <div className="bg-(--surface) border border-(--border) rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-(--border)">
                {["Horizon", "KPI ID", "KPI Name", "Frequency", "SLO", "Current"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-4 text-xs font-semibold text-(--muted) uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {allKpis.map((item, i) => {
                const isFirst =
                  i === 0 || allKpis[i - 1].horizon.id !== item.horizon.id;
                return (
                  <tr
                    key={item.id}
                    className="border-b border-(--border) hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isFirst ? (
                        <span className="text-xs font-semibold text-(--text) border border-(--border) px-2.5 py-1 rounded-lg">
                          {item.horizon.id} · {item.horizon.range}
                        </span>
                      ) : (
                        <span className="text-(--muted) text-xs pl-4">↳</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                        }}
                        className="font-medium text-(--muted)"
                      >
                        {item.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-(--text)">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-(--muted) whitespace-nowrap">
                      {item.frequency}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold text-(--text) border border-(--border) px-2.5 py-1 rounded-full">
                        {item.slo}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item.current !== null ? (
                        <span className="font-bold text-(--text)">
                          {item.current}%
                        </span>
                      ) : (
                        <span className="text-(--muted) text-xs italic">
                          — to fill in
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-5 text-xs text-(--muted)">
        <span>
          <span className="font-semibold text-(--text)">SLO</span> —
          Service Level Objective (target to reach)
        </span>
        <span>
          <span className="font-semibold text-(--text)">SLA</span> —
          Service Level Agreement (remediation plan)
        </span>
      </div>
    </div>
  );
}

// ─── Overview tab ─────────────────────────────────────────────────────────────
function OverviewTab({ onKpiClick }) {
  return (
    <div>
      {horizons.map((h) => (
        <HorizonSection key={h.id} horizon={h} onKpiClick={onKpiClick} />
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Page() {
  const [tab, setTab] = useState(TABS[0]);
  const [selectedKpi, setSelectedKpi] = useState(null);

  function handleKpiClick(kpi, horizon) {
    setSelectedKpi({ kpi, horizon });
    setTab(TABS[1]);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <header className="border-b border-(--border)">
        <div className="px-10 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              style={{ fontFamily: "var(--font-heading)", fontSize: "26px" }}
              className="font-bold text-(--text) leading-tight"
            >
              AI Technology Watch — KPI Dashboard
            </h1>
            <p className="text-xs text-(--muted) mt-1">
              {meta.author} · 8 indicators · 3 time horizons
            </p>
          </div>
          <TabBar active={tab} onChange={setTab} />
        </div>
      </header>

      <main className="px-10 py-14">
        {tab === TABS[0] && <OverviewTab onKpiClick={handleKpiClick} />}
        {tab === TABS[1] && <KPISheetsTab selectedKpi={selectedKpi} />}
        {tab === TABS[2] && <SummaryTableTab />}
      </main>

      <footer className="px-10 py-10 border-t border-(--border)">
        <p className="text-xs text-(--muted) text-center">
          {meta.author} · AI Technology Watch · KPI Dashboard · 8 indicators · 3 time horizons
        </p>
      </footer>
    </div>
  );
}
