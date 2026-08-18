"use client";

import React, { useState } from "react";
import { RetentionDataPoint } from "@/types/analytics";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

interface RetentionChartProps {
  data: RetentionDataPoint[];
  retention3s: number;
}

export const RetentionChart: React.FC<RetentionChartProps> = ({
  data,
  retention3s,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<RetentionDataPoint | null>(null);

  const width = 680;
  const height = 220;
  const padding = { top: 20, right: 30, bottom: 35, left: 45 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxSecond = Math.max(...data.map((d) => d.second), 20);

  const getX = (second: number) => {
    return padding.left + (second / maxSecond) * chartWidth;
  };

  const getY = (rate: number) => {
    return padding.top + chartHeight - (rate / 100) * chartHeight;
  };

  // Build SVG path for retention curve
  const points = data.map((d) => `${getX(d.second)},${getY(d.retentionRate)}`);
  const pathD = `M ${points.join(" L ")}`;

  // Area under the curve
  const areaD = `${pathD} L ${getX(data[data.length - 1].second)},${getY(0)} L ${getX(data[0].second)},${getY(0)} Z`;

  // 3s Point Coordinates
  const x3s = getX(3);
  const y3s = getY(retention3s);

  // 60% viral benchmark Y
  const yBenchmark = getY(60);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-white">
              Second-by-Second Viewer Retention Curve
            </h3>
            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-300">
              0.0s – {maxSecond}s
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time drop-off trajectory vs. 60% Viral FYP Threshold
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4 text-[11px]">
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500"></span>
            <span className="text-slate-300">Actual Retention</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-0.5 w-3 bg-emerald-400 border-b border-dashed border-emerald-400"></span>
            <span className="text-emerald-400">60% Viral Threshold</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500"></span>
            <span className="text-rose-400">Drop-off Spike</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative overflow-hidden w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="criticalDropGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[100, 75, 50, 25, 0].map((rate) => {
            const y = getY(rate);
            return (
              <g key={rate}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="10"
                  fill="#64748b"
                  className="font-mono"
                >
                  {rate}%
                </text>
              </g>
            );
          })}

          {/* X Axis Time Labels */}
          {[0, 3, 5, 8, 12, 16, 20].filter((s) => s <= maxSecond).map((second) => {
            const x = getX(second);
            return (
              <g key={second}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={height - padding.bottom}
                  stroke={second === 3 ? "rgba(244, 63, 94, 0.3)" : "#1e293b"}
                  strokeDasharray={second === 3 ? "2 2" : "3 3"}
                />
                <text
                  x={x}
                  y={height - padding.bottom + 16}
                  textAnchor="middle"
                  fontSize="10"
                  fill={second === 3 ? "#f43f5e" : "#64748b"}
                  fontWeight={second === 3 ? "bold" : "normal"}
                  className="font-mono"
                >
                  {second}s
                </text>
              </g>
            );
          })}

          {/* Viral Benchmark 60% line */}
          <line
            x1={padding.left}
            y1={yBenchmark}
            x2={width - padding.right}
            y2={yBenchmark}
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            x={width - padding.right + 4}
            y={yBenchmark + 3}
            fontSize="9"
            fill="#10b981"
            className="font-mono"
          >
            60%
          </text>

          {/* Filled Area */}
          <path d={areaD} fill="url(#retentionGradient)" />

          {/* Retention Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 3-Second Critical Zone Marker */}
          <rect
            x={getX(0)}
            y={padding.top}
            width={getX(3) - getX(0)}
            height={chartHeight}
            fill="url(#criticalDropGradient)"
          />

          {/* 3s Key Highlight Dot */}
          <circle
            cx={x3s}
            cy={y3s}
            r="6"
            fill="#f43f5e"
            stroke="#020617"
            strokeWidth="2"
            className="animate-pulse"
          />

          {/* Retention Data Points & Dropoff Badges */}
          {data.map((point, index) => {
            const cx = getX(point.second);
            const cy = getY(point.retentionRate);
            const isCritical = point.isDropoffSpike;

            return (
              <g
                key={index}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isCritical ? "5" : "4"}
                  fill={isCritical ? "#f43f5e" : "#818cf8"}
                  stroke="#0f172a"
                  strokeWidth="2"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip display */}
        {hoveredPoint && (
          <div
            className="pointer-events-none absolute z-20 rounded-lg border border-slate-700 bg-slate-950/90 px-3 py-1.5 text-xs text-white shadow-xl backdrop-blur-md"
            style={{
              left: `${Math.min(getX(hoveredPoint.second) / width * 100, 80)}%`,
              top: `${Math.max(10, getY(hoveredPoint.retentionRate) / height * 100 - 20)}%`,
            }}
          >
            <div className="font-semibold text-indigo-300">
              Second {hoveredPoint.second}.0s
            </div>
            <div className="text-[11px] text-slate-300">
              Retention: <span className="font-mono text-white">{hoveredPoint.retentionRate}%</span>
            </div>
            {hoveredPoint.note && (
              <div className="mt-1 max-w-[200px] text-[10px] text-rose-300 border-t border-slate-800 pt-1">
                {hoveredPoint.note}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3s Drop-off Insights Bar */}
      <div className="mt-3 flex flex-wrap items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/50 p-3 text-xs">
        <div className="flex items-center space-x-2.5">
          {retention3s < 45 ? (
            <AlertTriangle className="h-4 w-4 text-rose-400 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
          )}
          <div>
            <span className="font-medium text-slate-200">
              3-Second Retention Verdict:{" "}
            </span>
            <span
              className={`font-bold ${
                retention3s < 45
                  ? "text-rose-400"
                  : retention3s < 60
                  ? "text-amber-400"
                  : "text-emerald-400"
              }`}
            >
              {retention3s}% ({retention3s < 45 ? "Sub-Optimal" : retention3s < 60 ? "Average" : "High Velocity"})
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-[11px] text-slate-400">
          <Info className="h-3.5 w-3.5 text-slate-500" />
          <span>FYP algorithmic distribution accelerates when 3s retention exceeds 60%.</span>
        </div>
      </div>
    </div>
  );
};
