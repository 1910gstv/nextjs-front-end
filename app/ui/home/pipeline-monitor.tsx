"use client";

import { useState, useEffect } from "react";

const ROWS = [
  { left: "Fontes",  center: "Ingestão",     right: "Bronze"    },
  { left: "Bronze",  center: "Transformação", right: "Silver"    },
  { left: "Silver",  center: "Gold",          right: "Analytics" },
];

export default function PipelineMonitor() {
  const [activeRow, setActiveRow] = useState(0);
  const [activeCol, setActiveCol] = useState(0); // 0=left, 1=center, 2=right

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCol((col) => {
        if (col < 2) return col + 1;
        setActiveRow((row) => (row + 1) % ROWS.length);
        return 0;
      });
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const isActive = (row: number, col: number) =>
    row === activeRow && col === activeCol;

  const isPast = (row: number, col: number) =>
    row < activeRow || (row === activeRow && col < activeCol);

  return (
    <div className="rounded-2xl bg-[#0d1b2e] border border-white/8 p-8">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-[11px] tracking-[0.18em] uppercase text-[#4a7fa5] font-medium">
          Pipeline de dados — monitor ao vivo
        </span>
        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
      </div>

      {/* grid */}
      <div className="flex flex-col gap-4">
        {ROWS.map((row, ri) => (
          <div
            key={ri}
            className="grid items-center"
            style={{ gridTemplateColumns: "1fr 40px 1fr 40px 1fr", gap: 0 }}
          >
            {[row.left, null, row.center, null, row.right].map((cell, ci) => {
              const colIndex = ci === 0 ? 0 : ci === 2 ? 1 : ci === 4 ? 2 : -1;

              if (cell === null) {
                const arrowActive = ri < activeRow || (ri === activeRow && colIndex === -1 && ci === 1 && activeCol >= 1) || (ri === activeRow && ci === 3 && activeCol >= 2);
                const arrowPast   = ri < activeRow || (ri === activeRow && ci === 1 && activeCol >= 1) || (ri === activeRow && ci === 3 && activeCol >= 2);
                return (
                  <div key={ci} className="flex items-center justify-center">
                    <svg width="20" height="12" viewBox="0 0 20 12">
                      <path d="M0 6h16M11 1l5 5-5 5" stroke={arrowPast ? "#2dd4a0" : "#1e3a52"} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transition: "stroke 0.4s" }}
                      />
                    </svg>
                  </div>
                );
              }

              const active = isActive(ri, colIndex);
              const past   = isPast(ri, colIndex);

              return (
                <div
                  key={ci}
                  className="rounded-xl border py-4 px-3 text-center text-sm font-medium transition-all duration-400"
                  style={{
                    borderColor: active ? "#2dd4a0" : past ? "#1a5c44" : "#1e3a52",
                    color:       active ? "#2dd4a0" : past ? "#4aa88a" : "#7ba8c4",
                    background:  active ? "#0a2920" : past ? "#0a1f17" : "#0f2236",
                    boxShadow:   active ? "0 0 16px rgba(45,212,160,0.15)" : "none",
                    transform:   active ? "scale(1.03)" : "scale(1)",
                    transition:  "all 0.4s ease",
                  }}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* legenda */}
      <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-6 flex-wrap">
        {[
          { color: "#2dd4a0", label: "Em processamento" },
          { color: "#4aa88a", label: "Concluído"        },
          { color: "#1e3a52", label: "Aguardando"       },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
            <span className="text-xs text-[#4a7fa5]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
