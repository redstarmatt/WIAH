import { useState, useEffect, useRef } from "react";

// ============================================================
// WIAH — What Is Actually Happening
// Interactive Prototype v1.0
// ============================================================

// Brand colours
const C = {
  dark: "#0D1117",
  black: "#1A1A1A",
  white: "#FFFFFF",
  light: "#F5F5F5",
  mid: "#6B7280",
  border: "#E5E7EB",
  red: "#E63946",
  amber: "#F4A261",
  green: "#2A9D8F",
  blue: "#264653",
};

// ============================================================
// MOCK DATA
// ============================================================
const CATEGORIES = [
  {
    id: "health",
    label: "Health",
    color: C.red,
    headline: "GP wait times have doubled since 2015",
    direction: "worse",
    questions: [
      { id: "gp", title: "Can you actually see a doctor?", short: "GP Access" },
      { id: "ambulance", title: "What happens when you call 999?", short: "Ambulance" },
    ],
    metrics: [
      { label: "Average GP wait", value: "21.3", unit: "days", change: "+4.2 since 2019", target: "14 days", direction: "up", polarity: "up-is-bad", sparkline: [12, 13, 14, 14, 15, 16, 17, 19, 20, 21, 21.3] },
      { label: "Patients per GP", value: "2,273", unit: "", change: "+340 since 2015", target: "1,800", direction: "up", polarity: "up-is-bad", sparkline: [1933, 1980, 2020, 2050, 2100, 2150, 2180, 2220, 2250, 2273] },
      { label: "Cat 2 ambulance wait", value: "42", unit: "min", change: "+24 min since 2015", target: "18 min", direction: "up", polarity: "up-is-bad", sparkline: [18, 19, 22, 25, 28, 32, 35, 38, 40, 42] },
    ],
    gpTimeSeries: [
      { year: "2015", wait: 10.2, satisfaction: 85 },
      { year: "2016", wait: 11.1, satisfaction: 83 },
      { year: "2017", wait: 12.4, satisfaction: 80 },
      { year: "2018", wait: 13.8, satisfaction: 77 },
      { year: "2019", wait: 17.1, satisfaction: 71 },
      { year: "2020", wait: 16.5, satisfaction: 68 },
      { year: "2021", wait: 18.2, satisfaction: 62 },
      { year: "2022", wait: 19.4, satisfaction: 58 },
      { year: "2023", wait: 20.1, satisfaction: 56 },
      { year: "2024", wait: 20.8, satisfaction: 55 },
      { year: "2025", wait: 21.3, satisfaction: 54 },
    ],
    ambulanceTimeSeries: [
      { year: "2015", cat2: 18, cat1: 7 },
      { year: "2016", cat2: 19, cat1: 7.2 },
      { year: "2017", cat2: 21, cat1: 7.5 },
      { year: "2018", cat2: 24, cat1: 7.8 },
      { year: "2019", cat2: 28, cat1: 8.1 },
      { year: "2020", cat2: 32, cat1: 8.5 },
      { year: "2021", cat2: 35, cat1: 9.2 },
      { year: "2022", cat2: 40, cat1: 9.8 },
      { year: "2023", cat2: 42, cat1: 10.1 },
      { year: "2024", cat2: 41, cat1: 9.9 },
      { year: "2025", cat2: 42, cat1: 10.0 },
    ],
    context: "In 2015, most patients could see a GP within a week. Today, the average wait is over three weeks — and in parts of England it's significantly longer. The workforce has shrunk relative to demand: there are now 2,273 patients per GP, up from 1,933 a decade ago. When people can't see a GP, more end up calling 999. Ambulance services are stretched to breaking point — the average Category 2 response time (strokes, heart attacks) is 42 minutes against an 18-minute target.",
    sources: [
      "NHS Digital, Appointments in General Practice, January 2026",
      "NHS England, GP Patient Survey, July 2025",
      "NHS England, Ambulance Quality Indicators, January 2026",
    ],
  },
  {
    id: "housing",
    label: "Housing",
    color: C.amber,
    headline: "The average home costs 8.3x the average salary",
    direction: "worse",
    questions: [
      { id: "afford", title: "Can you afford to live where you live?", short: "Affordability" },
    ],
    metrics: [
      { label: "House price to earnings ratio", value: "8.3x", unit: "", change: "+4.1x since 1997", target: null, direction: "up", polarity: "up-is-bad", sparkline: [4.2, 4.8, 5.5, 6.2, 6.8, 7.0, 6.5, 7.2, 7.8, 8.3] },
      { label: "First-time buyer average age", value: "34", unit: "years", change: "+8 since 1997", target: null, direction: "up", polarity: "up-is-bad", sparkline: [26, 27, 28, 29, 30, 31, 32, 33, 33, 34] },
    ],
  },
  {
    id: "water",
    label: "Water",
    color: C.blue,
    headline: "3.6 million hours of sewage discharged in 2023",
    direction: "worse",
    questions: [
      { id: "water", title: "Is your water actually clean?", short: "Water Quality" },
    ],
    metrics: [
      { label: "Sewage discharge hours", value: "3.6M", unit: "hours", change: "+1.8M since 2020", target: "0", direction: "up", polarity: "up-is-bad", sparkline: [1.2, 1.4, 1.8, 2.4, 2.8, 3.1, 3.6] },
      { label: "Rivers in good health", value: "14%", unit: "", change: "-2% since 2016", target: "100%", direction: "down", polarity: "down-is-bad", sparkline: [17, 16, 16, 15, 15, 14, 14] },
    ],
  },
  {
    id: "justice",
    label: "Justice",
    color: C.mid,
    headline: "Fewer than 6% of reported crimes lead to a charge",
    direction: "worse",
    questions: [
      { id: "crime", title: "What happens when you report a crime?", short: "Crime Outcomes" },
    ],
    metrics: [
      { label: "Crimes leading to charge", value: "5.7%", unit: "", change: "-10.3% since 2015", target: null, direction: "down", polarity: "down-is-bad", sparkline: [16, 14, 12, 10, 8, 7, 6.5, 6.2, 5.9, 5.7] },
      { label: "Crown court backlog", value: "73,000", unit: "cases", change: "+30,000 since 2019", target: null, direction: "up", polarity: "up-is-bad", sparkline: [43, 45, 52, 58, 62, 65, 68, 70, 72, 73] },
    ],
  },
  {
    id: "education",
    label: "Education",
    color: C.green,
    headline: "The attainment gap is the widest in a decade",
    direction: "worse",
    questions: [
      { id: "schools", title: "What's actually happening in schools?", short: "Schools" },
    ],
    metrics: [
      { label: "Attainment gap (FSM vs non-FSM)", value: "23%", unit: "", change: "+4% since 2019", target: null, direction: "up", polarity: "up-is-bad", sparkline: [18, 18.5, 19, 19.5, 20, 21, 22, 22, 23] },
      { label: "Teacher vacancy rate", value: "2.8%", unit: "", change: "+1.3% since 2018", target: null, direction: "up", polarity: "up-is-bad", sparkline: [1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.5, 2.6, 2.8] },
    ],
  },
];

// ============================================================
// COMPONENTS
// ============================================================

// Tiny sparkline SVG
function Sparkline({ data, color, width = 80, height = 24 }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Direction arrow
function Arrow({ direction, polarity }) {
  const isUp = direction === "up";
  const isBad = (polarity === "up-is-bad" && isUp) || (polarity === "down-is-bad" && !isUp);
  const color = isBad ? C.red : C.green;
  return (
    <span style={{ color, fontSize: "1.2em", marginLeft: 8, fontWeight: 700 }}>
      {isUp ? "↑" : "↓"}
    </span>
  );
}

// Metric Card
function MetricCard({ metric, animate, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const isBad = (metric.polarity === "up-is-bad" && metric.direction === "up") ||
                (metric.polarity === "down-is-bad" && metric.direction === "down");
  const sparkColor = isBad ? C.red : C.green;

  return (
    <div style={{
      background: C.white,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "20px 24px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: "all 0.6s ease",
      flex: "1 1 220px",
      minWidth: 220,
    }}>
      <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 13, color: C.mid, marginBottom: 8 }}>
        {metric.label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace", fontSize: 32, fontWeight: 700, color: C.dark, letterSpacing: "-0.02em" }}>
          {metric.value}
        </span>
        {metric.unit && (
          <span style={{ fontFamily: "'SF Mono', monospace", fontSize: 16, color: C.mid }}>{metric.unit}</span>
        )}
        <Arrow direction={metric.direction} polarity={metric.polarity} />
      </div>
      <div style={{ fontFamily: "'SF Mono', monospace", fontSize: 12, color: C.mid, marginTop: 6 }}>
        {metric.change}{metric.target ? ` · Target: ${metric.target}` : ""}
      </div>
      <div style={{ marginTop: 12 }}>
        <Sparkline data={metric.sparkline} color={sparkColor} width={100} height={20} />
      </div>
      <div style={{ fontFamily: "'SF Mono', monospace", fontSize: 10, color: C.border, marginTop: 8, borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
        Source: NHS Digital, Jan 2026
      </div>
    </div>
  );
}

// Line chart component
function LineChart({ data, xKey, lines, annotations, height = 280 }) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const width = 600;
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const allValues = lines.flatMap(l => data.map(d => d[l.key]));
  const minVal = Math.min(...allValues) * 0.9;
  const maxVal = Math.max(...allValues) * 1.1;

  const xScale = (i) => padding.left + (i / (data.length - 1)) * innerW;
  const yScale = (v) => padding.top + innerH - ((v - minVal) / (maxVal - minVal)) * innerH;

  return (
    <div style={{ width: "100%", maxWidth: 600 }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto" }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const y = padding.top + innerH * (1 - pct);
          const val = minVal + (maxVal - minVal) * pct;
          return (
            <g key={i}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke={C.border} strokeWidth={1} />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize={10} fontFamily="'SF Mono', monospace" fill={C.mid}>
                {Math.round(val)}
              </text>
            </g>
          );
        })}

        {/* X axis labels */}
        {data.map((d, i) => (
          <text key={i} x={xScale(i)} y={height - 8} textAnchor="middle" fontSize={10} fontFamily="'SF Mono', monospace" fill={C.mid}>
            {d[xKey]}
          </text>
        ))}

        {/* Lines */}
        {lines.map((line) => {
          const pathD = data.map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(d[line.key])}`).join(" ");
          return (
            <path key={line.key} d={pathD} fill="none" stroke={line.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          );
        })}

        {/* Annotations */}
        {annotations && annotations.map((a, i) => {
          const idx = data.findIndex(d => d[xKey] === a.year);
          if (idx === -1) return null;
          return (
            <g key={i}>
              <line x1={xScale(idx)} y1={padding.top} x2={xScale(idx)} y2={padding.top + innerH} stroke={C.mid} strokeWidth={1} strokeDasharray="4,4" />
              <text x={xScale(idx)} y={padding.top - 6} textAnchor="middle" fontSize={9} fontFamily="'SF Mono', monospace" fill={C.mid}>
                {a.label}
              </text>
            </g>
          );
        })}

        {/* Hover targets */}
        {data.map((d, i) => (
          <rect key={i} x={xScale(i) - innerW / data.length / 2} y={padding.top} width={innerW / data.length} height={innerH} fill="transparent"
            onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)} />
        ))}

        {/* Hover tooltip */}
        {hoverIndex !== null && (
          <g>
            <line x1={xScale(hoverIndex)} y1={padding.top} x2={xScale(hoverIndex)} y2={padding.top + innerH} stroke={C.dark} strokeWidth={1} opacity={0.3} />
            {lines.map((line) => (
              <circle key={line.key} cx={xScale(hoverIndex)} cy={yScale(data[hoverIndex][line.key])} r={4} fill={line.color} stroke={C.white} strokeWidth={2} />
            ))}
            <rect x={xScale(hoverIndex) - 55} y={padding.top - 2} width={110} height={lines.length * 18 + 22} rx={4} fill={C.dark} opacity={0.95} />
            <text x={xScale(hoverIndex)} y={padding.top + 14} textAnchor="middle" fontSize={11} fontFamily="'SF Mono', monospace" fill={C.white} fontWeight="bold">
              {data[hoverIndex][xKey]}
            </text>
            {lines.map((line, li) => (
              <text key={line.key} x={xScale(hoverIndex)} y={padding.top + 30 + li * 18} textAnchor="middle" fontSize={10} fontFamily="'SF Mono', monospace" fill={line.color}>
                {line.label}: {data[hoverIndex][line.key]}{line.unit || ""}
              </text>
            ))}
          </g>
        )}

        {/* Target line */}
        {lines[0].target && (
          <g>
            <line x1={padding.left} y1={yScale(lines[0].target)} x2={width - padding.right} y2={yScale(lines[0].target)} stroke={C.green} strokeWidth={1.5} strokeDasharray="6,4" />
            <text x={width - padding.right + 4} y={yScale(lines[0].target) + 4} fontSize={10} fontFamily="'SF Mono', monospace" fill={C.green}>
              Target
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

// Category card for homepage
function CategoryCard({ category, onClick, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const isBad = category.direction === "worse";
  const metric = category.metrics[0];

  return (
    <div
      onClick={() => onClick(category.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.white,
        border: `1px solid ${hovered ? category.color : C.border}`,
        borderRadius: 12,
        padding: "28px 28px 24px",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-2px)" : "translateY(0)") : "translateY(16px)",
        transition: "all 0.5s ease",
        boxShadow: hovered ? `0 4px 20px rgba(0,0,0,0.06)` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Category color accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: category.color }} />

      <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 13, fontWeight: 400, color: category.color, marginBottom: 12 }}>
        What is <span style={{ fontWeight: 700, fontStyle: "italic" }}>actually</span> happening in {category.label}
      </div>

      <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 18, fontWeight: 700, color: C.dark, lineHeight: 1.3, marginBottom: 16 }}>
        {category.headline}
      </div>

      {/* Mini metrics */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {category.metrics.slice(0, 2).map((m, i) => (
          <div key={i} style={{ flex: 1, minWidth: 100 }}>
            <div style={{ fontFamily: "'SF Mono', monospace", fontSize: 10, color: C.mid, marginBottom: 4 }}>{m.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontFamily: "'SF Mono', monospace", fontSize: 20, fontWeight: 700, color: C.dark }}>
                {m.value}
              </span>
              {m.unit && <span style={{ fontFamily: "'SF Mono', monospace", fontSize: 12, color: C.mid }}>{m.unit}</span>}
              <Arrow direction={m.direction} polarity={m.polarity} />
            </div>
            <div style={{ marginTop: 4 }}>
              <Sparkline data={m.sparkline} color={isBad ? C.red : C.green} width={70} height={16} />
            </div>
          </div>
        ))}
      </div>

      {/* Questions preview */}
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
        {category.questions.map((q, i) => (
          <div key={i} style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: C.mid, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: category.color }}>→</span> {q.short}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// PAGES
// ============================================================

function HomePage({ onNavigate }) {
  return (
    <div style={{ minHeight: "100vh", background: C.white }}>
      {/* Hero */}
      <div style={{ background: C.dark, padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 42, fontWeight: 400, color: C.white, margin: "0 0 32px", lineHeight: 1.3, letterSpacing: "0.01em" }}>
            What is <span style={{ fontWeight: 700, fontStyle: "italic" }}>actually</span> happening
          </h1>
          <div style={{ width: 40, height: 2, background: C.red, margin: "0 auto 32px" }} />
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 20, color: "#9CA3AF", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            The state of the nation, made visible. Data-driven answers to the questions that actually matter.
          </p>
        </div>
      </div>

      {/* Category grid */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 20, fontWeight: 400, color: C.dark, marginBottom: 32 }}>
          What is <span style={{ fontWeight: 700, fontStyle: "italic" }}>actually</span> happening in...
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} onClick={onNavigate} delay={i * 120} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "32px 24px", textAlign: "center" }}>
        <span style={{ fontFamily: "'SF Mono', monospace", fontSize: 11, color: C.mid }}>
          whatisactuallyhappening.uk · Independent · Non-partisan · Open data · Prototype v1.0
        </span>
      </div>
    </div>
  );
}

function HealthPage({ onBack }) {
  const cat = CATEGORIES[0]; // health
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <div style={{ minHeight: "100vh", background: C.white }}>
      {/* Nav bar */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: C.white, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span onClick={onBack} style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 15, fontWeight: 400, color: C.dark, cursor: "pointer" }}>What is <span style={{ fontWeight: 700, fontStyle: "italic" }}>actually</span> happening</span>
          <span style={{ color: C.border }}>|</span>
          <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: C.mid }}>Health</span>
        </div>
        <span onClick={onBack} style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: C.blue, cursor: "pointer" }}>← All topics</span>
      </div>

      {/* Hero */}
      <div style={{
        padding: "60px 24px 48px",
        maxWidth: 800,
        margin: "0 auto",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.6s ease",
      }}>
        <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 16, fontWeight: 400, color: C.red, marginBottom: 16 }}>
          What is <span style={{ fontWeight: 700, fontStyle: "italic" }}>actually</span> happening in Health
        </div>
        <h1 style={{ fontFamily: "system-ui, sans-serif", fontSize: 36, fontWeight: 800, color: C.dark, lineHeight: 1.2, margin: "0 0 20px" }}>
          Can You Actually See a Doctor?
        </h1>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 18, color: "#4B5563", lineHeight: 1.7, margin: 0 }}>
          In 2015, 85% of patients could see a GP within a week. Today it's 54%. In some parts of England it's below 40%.
        </p>
      </div>

      {/* Metric cards */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {cat.metrics.map((m, i) => (
            <MetricCard key={i} metric={m} delay={200 + i * 150} />
          ))}
        </div>
      </div>

      {/* Postcode lookup */}
      <div style={{ background: C.light, padding: "40px 24px", margin: "0 0 48px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, fontWeight: 700, color: C.dark, marginBottom: 8 }}>
            Enter your postcode to see GP access in your area
          </div>
          <div style={{ display: "flex", gap: 8, maxWidth: 360 }}>
            <input
              type="text"
              placeholder="e.g. SW1A 1AA"
              style={{
                flex: 1,
                padding: "12px 16px",
                border: `1px solid ${C.border}`,
                borderRadius: 6,
                fontFamily: "'SF Mono', monospace",
                fontSize: 14,
                outline: "none",
                background: C.white,
              }}
            />
            <button style={{
              padding: "12px 24px",
              background: C.dark,
              color: C.white,
              border: "none",
              borderRadius: 6,
              fontFamily: "system-ui, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}>
              Look up
            </button>
          </div>
          <div style={{ fontFamily: "'SF Mono', monospace", fontSize: 11, color: C.mid, marginTop: 8 }}>
            Prototype — postcode lookup not yet connected to live data
          </div>
        </div>
      </div>

      {/* Chart: GP Wait Times */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{ marginBottom: 8 }}>
          <h2 style={{ fontFamily: "system-ui, sans-serif", fontSize: 20, fontWeight: 700, color: C.dark, margin: "0 0 4px" }}>
            GP appointment wait times, 2015–2025
          </h2>
          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, color: C.mid }}>
            Average days from booking to appointment, England
          </div>
        </div>
        <LineChart
          data={cat.gpTimeSeries}
          xKey="year"
          lines={[
            { key: "wait", label: "Wait", color: C.red, unit: " days", target: 14 },
          ]}
          annotations={[
            { year: "2018", label: "GP contract reformed" },
            { year: "2020", label: "COVID" },
          ]}
        />
        <div style={{ fontFamily: "'SF Mono', monospace", fontSize: 11, color: C.mid, marginTop: 8 }}>
          Source: NHS Digital, Appointments in General Practice, 2015–2025. Updated monthly.
        </div>
      </div>

      {/* Chart: Patient Satisfaction */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{ marginBottom: 8 }}>
          <h2 style={{ fontFamily: "system-ui, sans-serif", fontSize: 20, fontWeight: 700, color: C.dark, margin: "0 0 4px" }}>
            Patient satisfaction with GP access, 2015–2025
          </h2>
          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, color: C.mid }}>
            % of patients describing GP access as "good", England
          </div>
        </div>
        <LineChart
          data={cat.gpTimeSeries}
          xKey="year"
          lines={[
            { key: "satisfaction", label: "Satisfaction", color: C.blue, unit: "%" },
          ]}
        />
        <div style={{ fontFamily: "'SF Mono', monospace", fontSize: 11, color: C.mid, marginTop: 8 }}>
          Source: NHS England, GP Patient Survey, 2015–2025. Updated annually.
        </div>
      </div>

      {/* Chart: Ambulance */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{ marginBottom: 8 }}>
          <h2 style={{ fontFamily: "system-ui, sans-serif", fontSize: 20, fontWeight: 700, color: C.dark, margin: "0 0 4px" }}>
            What happens when you call 999?
          </h2>
          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, color: C.mid }}>
            Average response time in minutes by category, England
          </div>
        </div>
        <LineChart
          data={cat.ambulanceTimeSeries}
          xKey="year"
          lines={[
            { key: "cat2", label: "Cat 2", color: C.red, unit: " min", target: 18 },
            { key: "cat1", label: "Cat 1", color: C.amber, unit: " min" },
          ]}
          annotations={[
            { year: "2017", label: "New categories" },
            { year: "2020", label: "COVID" },
          ]}
        />
        <div style={{ fontFamily: "'SF Mono', monospace", fontSize: 11, color: C.mid, marginTop: 8 }}>
          Source: NHS England, Ambulance Quality Indicators, 2015–2025. Updated monthly. Category 2 target: 18 minutes.
        </div>
      </div>

      {/* Context */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 32 }}>
          <h2 style={{ fontFamily: "system-ui, sans-serif", fontSize: 20, fontWeight: 700, color: C.dark, margin: "0 0 16px" }}>
            What's driving this
          </h2>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
            {cat.context}
          </p>
        </div>
      </div>

      {/* Sources */}
      <div style={{ background: C.light, padding: "32px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontFamily: "'SF Mono', monospace", fontSize: 11, color: C.mid, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
            Sources & Methodology
          </div>
          {cat.sources.map((s, i) => (
            <div key={i} style={{ fontFamily: "'SF Mono', monospace", fontSize: 12, color: C.mid, marginBottom: 6 }}>
              {s}
            </div>
          ))}
          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: C.mid, marginTop: 16, fontStyle: "italic" }}>
            Data shown is illustrative for this prototype. Production version will pull from live NHS Digital and NHS England datasets.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "32px 24px", textAlign: "center" }}>
        <span onClick={onBack} style={{ fontFamily: "'SF Mono', monospace", fontSize: 11, color: C.blue, cursor: "pointer" }}>
          ← All topics
        </span>
        <div style={{ fontFamily: "'SF Mono', monospace", fontSize: 11, color: C.mid, marginTop: 8 }}>
          whatisactuallyhappening.uk · Independent · Non-partisan · Open data · Prototype v1.0
        </div>
      </div>
    </div>
  );
}

// ============================================================
// APP
// ============================================================

export default function App() {
  const [page, setPage] = useState("home");

  if (page === "health") {
    return <HealthPage onBack={() => setPage("home")} />;
  }

  return (
    <HomePage onNavigate={(id) => {
      if (id === "health") setPage("health");
    }} />
  );
}
