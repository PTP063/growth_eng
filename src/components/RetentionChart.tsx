"use client";

import React, { useState } from "react";
import { RetentionDataPoint } from "@/types/analytics";

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
  const height = 210;
  const padding = { top: 20, right: 25, bottom: 30, left: 40 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxSecond = Math.max(...data.map((d) => d.second), 20);

  const getX = (second: number) => {
    return padding.left + (second / maxSecond) * chartWidth;
  };

  const getY = (rate: number) => {
    return padding.top + chartHeight - (rate / 100) * chartHeight;
  };

  // Build smooth cubic bezier curve
  const formatBezier = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return d;
  };

  const points = data.map((d) => ({ x: getX(d.second), y: getY(d.retentionRate) }));
  const pathD = formatBezier(points);

  // Area under the curve
  const areaD = `${pathD} L ${getX(data[data.length - 1].second)},${getY(0)} L ${getX(data[0].second)},${getY(0)} Z`;

  // 3s Point Coordinates
  const x3s = getX(3);
  const y3s = getY(retention3s);

  // 60% viral benchmark Y
  const yBenchmark = getY(60);

  return (
    <div className="growth-card rounded-2xl p-5 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xs font-bold text-white tracking-tight uppercase">
              Viewer Retention Trajectory (0.0s – {maxSecond}s)
            </h3>
            <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[9px] font-mono text-slate-300">
              100ms Granularity
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-sans mt-0.5">
            Second-by-second drop-off curve vs. 60.0% FYP algorithm benchmark
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-400">
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
            <span className="text-slate-300">Retention</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-0.5 w-3 bg-emerald-400 border-b border-dashed border-emerald-400"></span>
            <span className="text-emerald-400">60% Benchmark</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"></span>
            <span className="text-rose-400">3s Inflection</span>
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
            <linearGradient id="retentionGlowGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
            <filter id="curveGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((rate) => (
            <g key={rate}>
              <line
                x1={padding.left}
                y1={getY(rate)}
                x2={width - padding.right}
                y2={getY(rate)}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeDasharray="2,4"
              />
              <text
                x={padding.left - 8}
                y={getY(rate) + 3}
                fill="#64748b"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                textAnchor="end"
              >
                {rate}%
              </text>
            </g>
          ))}

          {/* X Axis Time Labels */}
          {[0, 3, 5, 10, 15, 20].map((sec) => (
            <g key={sec}>
              <line
                x1={getX(sec)}
                y1={padding.top}
                x2={getX(sec)}
                y2={height - padding.bottom}
                stroke={sec === 3 ? "rgba(99, 102, 241, 0.3)" : "rgba(255, 255, 255, 0.04)"}
                strokeDasharray={sec === 3 ? "3,3" : "2,4"}
              />
              <text
                x={getX(sec)}
                y={height - padding.bottom + 14}
                fill={sec === 3 ? "#818cf8" : "#64748b"}
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
                fontWeight={sec === 3 ? "bold" : "normal"}
              >
                {sec}s
              </text>
            </g>
          ))}

          {/* 60% Viral FYP Threshold Line */}
          <line
            x1={padding.left}
            y1={yBenchmark}
            x2={width - padding.right}
            y2={yBenchmark}
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            opacity="0.85"
          />
          <text
            x={width - padding.right - 4}
            y={yBenchmark - 4}
            fill="#10b981"
            fontSize="8.5"
            fontFamily="ui-monospace, monospace"
            textAnchor="end"
            fontWeight="bold"
          >
            60% VIRAL THRESHOLD
          </text>

          {/* Retention Area Gradient */}
          <path d={areaD} fill="url(#retentionGlowGradient)" />

          {/* Retention Bezier Curve Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="#818cf8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#curveGlow)"
          />

          {/* 3s Drop-Off Vertical Marker */}
          <line
            x1={x3s}
            y1={padding.top}
            x2={x3s}
            y2={height - padding.bottom}
            stroke="#f43f5e"
            strokeWidth="1.5"
            strokeDasharray="3,3"
            opacity="0.9"
          />

          {/* 3.0s Inflection Point Pulsating Ring */}
          <circle
            cx={x3s}
            cy={y3s}
            r="8"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="1"
            opacity="0.6"
            className="animate-ping"
          />
          <circle
            cx={x3s}
            cy={y3s}
            r="4.5"
            fill="#f43f5e"
            stroke="#ffffff"
            strokeWidth="1.5"
          />

          {/* 3.0s Label Tooltip in SVG */}
          <g transform={`translate(${x3s + 8}, ${Math.max(padding.top + 15, y3s - 12)})`}>
            <rect
              x="0"
              y="-12"
              width="68"
              height="20"
              rx="5"
              fill="#060911"
              stroke="rgba(244, 63, 94, 0.6)"
              strokeWidth="1"
            />
            <text
              x="6"
              y="2"
              fill="#f43f5e"
              fontSize="9.5"
              fontFamily="ui-monospace, monospace"
              fontWeight="bold"
            >
              3.0s: {retention3s}%
            </text>
          </g>

          {/* Interactive Hover Point Indicator */}
          {hoveredPoint && (
            <g>
              <line
                x1={getX(hoveredPoint.second)}
                y1={padding.top}
                x2={getX(hoveredPoint.second)}
                y2={height - padding.bottom}
                stroke="#c084fc"
                strokeWidth="1.2"
                strokeDasharray="2,2"
              />
              <circle
                cx={getX(hoveredPoint.second)}
                cy={getY(hoveredPoint.retentionRate)}
                r="4.5"
                fill="#c084fc"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>
          )}

          {/* Transparent Hover Rectangles */}
          {data.map((d, i) => {
            const x = getX(d.second) - 8;
            return (
              <rect
                key={i}
                x={x}
                y={padding.top}
                width="16"
                height={chartHeight}
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => setHoveredPoint(d)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}
        </svg>
      </div>

      {/* Footer Info */}
      <div className="mt-2 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
        <div>
          Inflection point at <span className="text-rose-400 font-bold">t=3.0s</span> indicates high initial swipe-away.
        </div>
        <div>
          {hoveredPoint ? (
            <span>
              t={hoveredPoint.second}s: <strong className="text-white">{hoveredPoint.retentionRate}%</strong>
            </span>
          ) : (
            <span>Hover chart for second-by-second telemetry</span>
          )}
        </div>
      </div>
    </div>
  );
};
