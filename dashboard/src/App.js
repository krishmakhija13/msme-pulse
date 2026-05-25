import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, ResponsiveContainer, AreaChart, Area,
  ScatterChart, Scatter, ZAxis, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Cell
} from "recharts";

// ── DATA ──────────────────────────────────────────────────────────────────────

const SECTOR_COLORS = {
  Manufacturing: "#3b82f6",
  Textiles: "#f59e0b",
  "Food Processing": "#22c55e",
  "Retail Trade": "#a855f7",
};

const districtTrends = {
  Agra:       [{ m:"Jan",s:.845,r:.718,nlp:.62 },{ m:"Feb",s:.874,r:.684,nlp:.59 },{ m:"Mar",s:.866,r:.646,nlp:.57 },{ m:"Apr",s:.877,r:.655,nlp:.55 },{ m:"May",s:.914,r:.628,nlp:.51 },{ m:"Jun",s:.906,r:.619,nlp:.49 },{ m:"Jul",s:.953,r:.569,nlp:.44 },{ m:"Aug",s:.942,r:.547,nlp:.42 },{ m:"Sep",s:.962,r:.541,nlp:.40 },{ m:"Oct",s:.982,r:.512,nlp:.37 },{ m:"Nov",s:.999,r:.486,nlp:.33 },{ m:"Dec",s:.999,r:.475,nlp:.31 }],
  Bathinda:   [{ m:"Jan",s:.820,r:.700,nlp:.65 },{ m:"Feb",s:.845,r:.672,nlp:.62 },{ m:"Mar",s:.851,r:.641,nlp:.59 },{ m:"Apr",s:.869,r:.628,nlp:.56 },{ m:"May",s:.892,r:.601,nlp:.53 },{ m:"Jun",s:.901,r:.588,nlp:.50 },{ m:"Jul",s:.921,r:.562,nlp:.47 },{ m:"Aug",s:.938,r:.541,nlp:.44 },{ m:"Sep",s:.952,r:.519,nlp:.41 },{ m:"Oct",s:.971,r:.498,nlp:.38 },{ m:"Nov",s:.985,r:.472,nlp:.35 },{ m:"Dec",s:.999,r:.451,nlp:.32 }],
  Kanpur:     [{ m:"Jan",s:.880,r:.710,nlp:.60 },{ m:"Feb",s:.891,r:.688,nlp:.57 },{ m:"Mar",s:.902,r:.661,nlp:.55 },{ m:"Apr",s:.918,r:.638,nlp:.52 },{ m:"May",s:.931,r:.612,nlp:.49 },{ m:"Jun",s:.944,r:.589,nlp:.46 },{ m:"Jul",s:.958,r:.561,nlp:.43 },{ m:"Aug",s:.967,r:.538,nlp:.41 },{ m:"Sep",s:.975,r:.512,nlp:.38 },{ m:"Oct",s:.984,r:.489,nlp:.36 },{ m:"Nov",s:.992,r:.461,nlp:.33 },{ m:"Dec",s:.999,r:.438,nlp:.30 }],
  Bhopal:     [{ m:"Jan",s:.790,r:.720,nlp:.68 },{ m:"Feb",s:.812,r:.698,nlp:.65 },{ m:"Mar",s:.828,r:.671,nlp:.62 },{ m:"Apr",s:.845,r:.648,nlp:.59 },{ m:"May",s:.861,r:.622,nlp:.56 },{ m:"Jun",s:.878,r:.599,nlp:.53 },{ m:"Jul",s:.894,r:.571,nlp:.50 },{ m:"Aug",s:.911,r:.548,nlp:.47 },{ m:"Sep",s:.928,r:.522,nlp:.44 },{ m:"Oct",s:.945,r:.499,nlp:.41 },{ m:"Nov",s:.962,r:.471,nlp:.38 },{ m:"Dec",s:.979,r:.448,nlp:.35 }],
  Varanasi:   [{ m:"Jan",s:.830,r:.705,nlp:.64 },{ m:"Feb",s:.848,r:.681,nlp:.61 },{ m:"Mar",s:.862,r:.654,nlp:.58 },{ m:"Apr",s:.879,r:.631,nlp:.55 },{ m:"May",s:.895,r:.605,nlp:.52 },{ m:"Jun",s:.912,r:.582,nlp:.49 },{ m:"Jul",s:.928,r:.554,nlp:.46 },{ m:"Aug",s:.945,r:.531,nlp:.43 },{ m:"Sep",s:.961,r:.505,nlp:.40 },{ m:"Oct",s:.978,r:.482,nlp:.37 },{ m:"Nov",s:.991,r:.454,nlp:.34 },{ m:"Dec",s:.999,r:.431,nlp:.31 }],
  Ludhiana:   [{ m:"Jan",s:.770,r:.725,nlp:.70 },{ m:"Feb",s:.789,r:.701,nlp:.67 },{ m:"Mar",s:.805,r:.674,nlp:.64 },{ m:"Apr",s:.821,r:.651,nlp:.61 },{ m:"May",s:.838,r:.625,nlp:.58 },{ m:"Jun",s:.854,r:.602,nlp:.55 },{ m:"Jul",s:.871,r:.574,nlp:.52 },{ m:"Aug",s:.887,r:.551,nlp:.49 },{ m:"Sep",s:.904,r:.525,nlp:.46 },{ m:"Oct",s:.921,r:.502,nlp:.43 },{ m:"Nov",s:.937,r:.474,nlp:.40 },{ m:"Dec",s:.954,r:.451,nlp:.37 }],
  Surat:      [{ m:"Jan",s:.750,r:.730,nlp:.72 },{ m:"Feb",s:.768,r:.706,nlp:.69 },{ m:"Mar",s:.783,r:.679,nlp:.66 },{ m:"Apr",s:.799,r:.656,nlp:.63 },{ m:"May",s:.815,r:.630,nlp:.60 },{ m:"Jun",s:.831,r:.607,nlp:.57 },{ m:"Jul",s:.848,r:.579,nlp:.54 },{ m:"Aug",s:.864,r:.556,nlp:.51 },{ m:"Sep",s:.880,r:.530,nlp:.48 },{ m:"Oct",s:.897,r:.507,nlp:.45 },{ m:"Nov",s:.913,r:.479,nlp:.42 },{ m:"Dec",s:.929,r:.456,nlp:.39 }],
  Coimbatore: [{ m:"Jan",s:.720,r:.735,nlp:.74 },{ m:"Feb",s:.738,r:.711,nlp:.71 },{ m:"Mar",s:.753,r:.684,nlp:.68 },{ m:"Apr",s:.769,r:.661,nlp:.65 },{ m:"May",s:.785,r:.635,nlp:.62 },{ m:"Jun",s:.801,r:.612,nlp:.59 },{ m:"Jul",s:.818,r:.584,nlp:.56 },{ m:"Aug",s:.834,r:.561,nlp:.53 },{ m:"Sep",s:.850,r:.535,nlp:.50 },{ m:"Oct",s:.867,r:.512,nlp:.47 },{ m:"Nov",s:.883,r:.484,nlp:.44 },{ m:"Dec",s:.899,r:.461,nlp:.41 }],
  Kolkata:    [{ m:"Jan",s:.800,r:.715,nlp:.66 },{ m:"Feb",s:.819,r:.691,nlp:.63 },{ m:"Mar",s:.835,r:.664,nlp:.60 },{ m:"Apr",s:.851,r:.641,nlp:.57 },{ m:"May",s:.868,r:.615,nlp:.54 },{ m:"Jun",s:.884,r:.592,nlp:.51 },{ m:"Jul",s:.901,r:.564,nlp:.48 },{ m:"Aug",s:.917,r:.541,nlp:.45 },{ m:"Sep",s:.934,r:.515,nlp:.42 },{ m:"Oct",s:.950,r:.492,nlp:.39 },{ m:"Nov",s:.967,r:.464,nlp:.36 },{ m:"Dec",s:.983,r:.441,nlp:.33 }],
  Nagpur:     [{ m:"Jan",s:.780,r:.722,nlp:.69 },{ m:"Feb",s:.798,r:.698,nlp:.66 },{ m:"Mar",s:.814,r:.671,nlp:.63 },{ m:"Apr",s:.830,r:.648,nlp:.60 },{ m:"May",s:.847,r:.622,nlp:.57 },{ m:"Jun",s:.863,r:.599,nlp:.54 },{ m:"Jul",s:.880,r:.571,nlp:.51 },{ m:"Aug",s:.896,r:.548,nlp:.48 },{ m:"Sep",s:.913,r:.522,nlp:.45 },{ m:"Oct",s:.929,r:.499,nlp:.42 },{ m:"Nov",s:.946,r:.471,nlp:.39 },{ m:"Dec",s:.962,r:.448,nlp:.36 }],
  Pune:       [{ m:"Jan",s:.710,r:.740,nlp:.75 },{ m:"Feb",s:.728,r:.718,nlp:.72 },{ m:"Mar",s:.744,r:.692,nlp:.69 },{ m:"Apr",s:.761,r:.669,nlp:.66 },{ m:"May",s:.778,r:.643,nlp:.63 },{ m:"Jun",s:.795,r:.620,nlp:.60 },{ m:"Jul",s:.812,r:.592,nlp:.57 },{ m:"Aug",s:.829,r:.569,nlp:.54 },{ m:"Sep",s:.846,r:.543,nlp:.51 },{ m:"Oct",s:.863,r:.520,nlp:.48 },{ m:"Nov",s:.880,r:.492,nlp:.45 },{ m:"Dec",s:.897,r:.469,nlp:.42 }],
  Chennai:    [{ m:"Jan",s:.760,r:.728,nlp:.71 },{ m:"Feb",s:.779,r:.704,nlp:.68 },{ m:"Mar",s:.795,r:.677,nlp:.65 },{ m:"Apr",s:.812,r:.654,nlp:.62 },{ m:"May",s:.829,r:.628,nlp:.59 },{ m:"Jun",s:.846,r:.605,nlp:.56 },{ m:"Jul",s:.863,r:.577,nlp:.53 },{ m:"Aug",s:.880,r:.554,nlp:.50 },{ m:"Sep",s:.897,r:.528,nlp:.47 },{ m:"Oct",s:.914,r:.505,nlp:.44 },{ m:"Nov",s:.931,r:.477,nlp:.41 },{ m:"Dec",s:.948,r:.454,nlp:.38 }],
  Amritsar:   [{ m:"Jan",s:.740,r:.732,nlp:.73 },{ m:"Feb",s:.758,r:.708,nlp:.70 },{ m:"Mar",s:.773,r:.681,nlp:.67 },{ m:"Apr",s:.789,r:.658,nlp:.64 },{ m:"May",s:.805,r:.632,nlp:.61 },{ m:"Jun",s:.821,r:.609,nlp:.58 },{ m:"Jul",s:.838,r:.581,nlp:.55 },{ m:"Aug",s:.854,r:.558,nlp:.52 },{ m:"Sep",s:.870,r:.532,nlp:.49 },{ m:"Oct",s:.887,r:.509,nlp:.46 },{ m:"Nov",s:.903,r:.481,nlp:.43 },{ m:"Dec",s:.919,r:.458,nlp:.40 }],
  Nashik:     [{ m:"Jan",s:.700,r:.738,nlp:.76 },{ m:"Feb",s:.718,r:.714,nlp:.73 },{ m:"Mar",s:.733,r:.687,nlp:.70 },{ m:"Apr",s:.749,r:.664,nlp:.67 },{ m:"May",s:.765,r:.638,nlp:.64 },{ m:"Jun",s:.781,r:.615,nlp:.61 },{ m:"Jul",s:.797,r:.587,nlp:.58 },{ m:"Aug",s:.813,r:.564,nlp:.55 },{ m:"Sep",s:.829,r:.538,nlp:.52 },{ m:"Oct",s:.845,r:.515,nlp:.49 },{ m:"Nov",s:.861,r:.487,nlp:.46 },{ m:"Dec",s:.877,r:.464,nlp:.43 }],
  Jaipur:     [{ m:"Jan",s:.730,r:.733,nlp:.72 },{ m:"Feb",s:.748,r:.709,nlp:.69 },{ m:"Mar",s:.763,r:.682,nlp:.66 },{ m:"Apr",s:.779,r:.659,nlp:.63 },{ m:"May",s:.795,r:.633,nlp:.60 },{ m:"Jun",s:.811,r:.610,nlp:.57 },{ m:"Jul",s:.827,r:.582,nlp:.54 },{ m:"Aug",s:.843,r:.559,nlp:.51 },{ m:"Sep",s:.859,r:.533,nlp:.48 },{ m:"Oct",s:.875,r:.510,nlp:.45 },{ m:"Nov",s:.891,r:.482,nlp:.42 },{ m:"Dec",s:.907,r:.459,nlp:.39 }],
  Indore:     [{ m:"Jan",s:.760,r:.726,nlp:.71 },{ m:"Feb",s:.778,r:.702,nlp:.68 },{ m:"Mar",s:.793,r:.675,nlp:.65 },{ m:"Apr",s:.809,r:.652,nlp:.62 },{ m:"May",s:.825,r:.626,nlp:.59 },{ m:"Jun",s:.841,r:.603,nlp:.56 },{ m:"Jul",s:.857,r:.575,nlp:.53 },{ m:"Aug",s:.873,r:.552,nlp:.50 },{ m:"Sep",s:.889,r:.526,nlp:.47 },{ m:"Oct",s:.905,r:.503,nlp:.44 },{ m:"Nov",s:.921,r:.475,nlp:.41 },{ m:"Dec",s:.937,r:.452,nlp:.38 }],
  Rajkot:     [{ m:"Jan",s:.690,r:.745,nlp:.77 },{ m:"Feb",s:.708,r:.721,nlp:.74 },{ m:"Mar",s:.724,r:.695,nlp:.71 },{ m:"Apr",s:.741,r:.672,nlp:.68 },{ m:"May",s:.758,r:.646,nlp:.65 },{ m:"Jun",s:.775,r:.623,nlp:.62 },{ m:"Jul",s:.792,r:.595,nlp:.59 },{ m:"Aug",s:.809,r:.572,nlp:.56 },{ m:"Sep",s:.826,r:.546,nlp:.53 },{ m:"Oct",s:.843,r:.523,nlp:.50 },{ m:"Nov",s:.860,r:.495,nlp:.47 },{ m:"Dec",s:.877,r:.472,nlp:.44 }],
};

const districtsBySector = {
  All: [
    { name:"Agra",state:"Uttar Pradesh",stress:.999,sector:"Textiles" },
    { name:"Bathinda",state:"Punjab",stress:.999,sector:"Textiles" },
    { name:"Kanpur",state:"Uttar Pradesh",stress:.998,sector:"Textiles" },
    { name:"Bhopal",state:"Madhya Pradesh",stress:.979,sector:"Manufacturing" },
    { name:"Varanasi",state:"Uttar Pradesh",stress:.999,sector:"Textiles" },
    { name:"Ludhiana",state:"Punjab",stress:.954,sector:"Manufacturing" },
    { name:"Surat",state:"Gujarat",stress:.929,sector:"Textiles" },
    { name:"Coimbatore",state:"Tamil Nadu",stress:.899,sector:"Manufacturing" },
    { name:"Kolkata",state:"West Bengal",stress:.983,sector:"Retail Trade" },
    { name:"Nagpur",state:"Maharashtra",stress:.962,sector:"Manufacturing" },
  ],
  Manufacturing: [
    { name:"Pune",state:"Maharashtra",stress:.897,sector:"Manufacturing" },
    { name:"Chennai",state:"Tamil Nadu",stress:.948,sector:"Manufacturing" },
    { name:"Ludhiana",state:"Punjab",stress:.954,sector:"Manufacturing" },
    { name:"Rajkot",state:"Gujarat",stress:.877,sector:"Manufacturing" },
    { name:"Kanpur",state:"Uttar Pradesh",stress:.998,sector:"Manufacturing" },
    { name:"Nagpur",state:"Maharashtra",stress:.962,sector:"Manufacturing" },
    { name:"Coimbatore",state:"Tamil Nadu",stress:.899,sector:"Manufacturing" },
    { name:"Bhopal",state:"Madhya Pradesh",stress:.979,sector:"Manufacturing" },
    { name:"Surat",state:"Gujarat",stress:.929,sector:"Manufacturing" },
    { name:"Kolkata",state:"West Bengal",stress:.983,sector:"Manufacturing" },
  ],
  Textiles: [
    { name:"Agra",state:"Uttar Pradesh",stress:.999,sector:"Textiles" },
    { name:"Bathinda",state:"Punjab",stress:.999,sector:"Textiles" },
    { name:"Kanpur",state:"Uttar Pradesh",stress:.998,sector:"Textiles" },
    { name:"Varanasi",state:"Uttar Pradesh",stress:.999,sector:"Textiles" },
    { name:"Surat",state:"Gujarat",stress:.929,sector:"Textiles" },
    { name:"Ludhiana",state:"Punjab",stress:.954,sector:"Textiles" },
    { name:"Bhopal",state:"Madhya Pradesh",stress:.979,sector:"Textiles" },
    { name:"Coimbatore",state:"Tamil Nadu",stress:.899,sector:"Textiles" },
    { name:"Kolkata",state:"West Bengal",stress:.983,sector:"Textiles" },
    { name:"Nagpur",state:"Maharashtra",stress:.962,sector:"Textiles" },
  ],
  "Food Processing": [
    { name:"Amritsar",state:"Punjab",stress:.919,sector:"Food Processing" },
    { name:"Nashik",state:"Maharashtra",stress:.877,sector:"Food Processing" },
    { name:"Varanasi",state:"Uttar Pradesh",stress:.999,sector:"Food Processing" },
    { name:"Agra",state:"Uttar Pradesh",stress:.999,sector:"Food Processing" },
    { name:"Kolkata",state:"West Bengal",stress:.983,sector:"Food Processing" },
    { name:"Nagpur",state:"Maharashtra",stress:.962,sector:"Food Processing" },
    { name:"Bhopal",state:"Madhya Pradesh",stress:.979,sector:"Food Processing" },
    { name:"Surat",state:"Gujarat",stress:.929,sector:"Food Processing" },
    { name:"Coimbatore",state:"Tamil Nadu",stress:.899,sector:"Food Processing" },
    { name:"Ludhiana",state:"Punjab",stress:.954,sector:"Food Processing" },
  ],
  "Retail Trade": [
    { name:"Jaipur",state:"Rajasthan",stress:.907,sector:"Retail Trade" },
    { name:"Indore",state:"Madhya Pradesh",stress:.937,sector:"Retail Trade" },
    { name:"Kolkata",state:"West Bengal",stress:.983,sector:"Retail Trade" },
    { name:"Nagpur",state:"Maharashtra",stress:.962,sector:"Retail Trade" },
    { name:"Bhopal",state:"Madhya Pradesh",stress:.979,sector:"Retail Trade" },
    { name:"Varanasi",state:"Uttar Pradesh",stress:.999,sector:"Retail Trade" },
    { name:"Surat",state:"Gujarat",stress:.929,sector:"Retail Trade" },
    { name:"Coimbatore",state:"Tamil Nadu",stress:.899,sector:"Retail Trade" },
    { name:"Ludhiana",state:"Punjab",stress:.954,sector:"Retail Trade" },
    { name:"Kanpur",state:"Uttar Pradesh",stress:.998,sector:"Retail Trade" },
  ],
};

const nationalTrend = [
  { m:"Jan",stress:.791,Manufacturing:.770,Textiles:.845,FoodProcessing:.740,RetailTrade:.730 },
  { m:"Feb",stress:.810,Manufacturing:.789,Textiles:.874,FoodProcessing:.758,RetailTrade:.748 },
  { m:"Mar",stress:.823,Manufacturing:.805,Textiles:.866,FoodProcessing:.773,RetailTrade:.763 },
  { m:"Apr",stress:.839,Manufacturing:.821,Textiles:.877,FoodProcessing:.789,RetailTrade:.779 },
  { m:"May",stress:.855,Manufacturing:.838,Textiles:.914,FoodProcessing:.805,RetailTrade:.795 },
  { m:"Jun",stress:.870,Manufacturing:.854,Textiles:.906,FoodProcessing:.821,RetailTrade:.811 },
  { m:"Jul",stress:.888,Manufacturing:.871,Textiles:.953,FoodProcessing:.838,RetailTrade:.827 },
  { m:"Aug",stress:.904,Manufacturing:.887,Textiles:.942,FoodProcessing:.854,RetailTrade:.843 },
  { m:"Sep",stress:.921,Manufacturing:.904,Textiles:.962,FoodProcessing:.870,RetailTrade:.859 },
  { m:"Oct",stress:.937,Manufacturing:.921,Textiles:.982,FoodProcessing:.887,RetailTrade:.875 },
  { m:"Nov",stress:.954,Manufacturing:.937,Textiles:.999,FoodProcessing:.903,RetailTrade:.891 },
  { m:"Dec",stress:.970,Manufacturing:.954,Textiles:.999,FoodProcessing:.919,RetailTrade:.907 },
];

const radarData = [
  { axis:"Credit Delinquency",All:88,Manufacturing:82,Textiles:95,FoodProcessing:79,RetailTrade:84 },
  { axis:"NLP Sentiment",All:71,Manufacturing:68,Textiles:78,FoodProcessing:65,RetailTrade:70 },
  { axis:"Night Light Drop",All:65,Manufacturing:61,Textiles:72,FoodProcessing:58,RetailTrade:64 },
  { axis:"GST Filing Gap",All:80,Manufacturing:75,Textiles:87,FoodProcessing:72,RetailTrade:77 },
  { axis:"MCA Defaults",All:74,Manufacturing:70,Textiles:81,FoodProcessing:67,RetailTrade:73 },
  { axis:"Employment Signal",All:69,Manufacturing:65,Textiles:76,FoodProcessing:62,RetailTrade:68 },
];

const stateStress = [
  { state:"Uttar Pradesh",stress:.998,msmes:89 },
  { state:"Punjab",stress:.975,msmes:62 },
  { state:"West Bengal",stress:.961,msmes:71 },
  { state:"Madhya Pradesh",stress:.958,msmes:55 },
  { state:"Maharashtra",stress:.942,msmes:96 },
  { state:"Gujarat",stress:.929,msmes:78 },
  { state:"Tamil Nadu",stress:.912,msmes:74 },
  { state:"Rajasthan",stress:.895,msmes:53 },
];

const alerts = [
  { district:"Agra",state:"UP",change:"+4.2%",trigger:"GST filings dropped 38%",severity:"critical",time:"2h ago" },
  { district:"Varanasi",state:"UP",change:"+3.8%",trigger:"Night light index fell 12pts",severity:"critical",time:"5h ago" },
  { district:"Kanpur",state:"UP",change:"+2.1%",trigger:"MCA default spike detected",severity:"high",time:"8h ago" },
  { district:"Kolkata",state:"WB",change:"+1.9%",trigger:"NLP sentiment crossed threshold",severity:"high",time:"12h ago" },
  { district:"Ludhiana",state:"PB",change:"+1.4%",trigger:"Credit delinquency up 22%",severity:"medium",time:"1d ago" },
];

const yoyData = [
  { m:"Jan",y2023:.701,y2024:.791 },{ m:"Feb",y2023:.718,y2024:.810 },
  { m:"Mar",y2023:.729,y2024:.823 },{ m:"Apr",y2023:.741,y2024:.839 },
  { m:"May",y2023:.754,y2024:.855 },{ m:"Jun",y2023:.768,y2024:.870 },
  { m:"Jul",y2023:.775,y2024:.888 },{ m:"Aug",y2023:.782,y2024:.904 },
  { m:"Sep",y2023:.796,y2024:.921 },{ m:"Oct",y2023:.808,y2024:.937 },
  { m:"Nov",y2023:.815,y2024:.954 },{ m:"Dec",y2023:.822,y2024:.970 },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────

const S = {
  bg: "#0b1120",
  surface: "#111827",
  surface2: "#1a2234",
  border: "#1e2d45",
  blue: "#3b82f6",
  red: "#ef4444",
  amber: "#f59e0b",
  green: "#22c55e",
  purple: "#a855f7",
  muted: "#64748b",
  text: "#e2e8f0",
  textSm: "#94a3b8",
};

function stressColor(v) {
  if (v > 0.85) return S.red;
  if (v > 0.70) return S.amber;
  return S.green;
}
function riskLabel(v) {
  if (v > 0.85) return "CRITICAL";
  if (v > 0.70) return "HIGH";
  return "MODERATE";
}
function pct(v) { return (v * 100).toFixed(1) + "%"; }

const TooltipStyle = { background: S.surface2, border: `1px solid ${S.border}`, borderRadius: 8, fontSize: 12 };

const TAB_STYLE = (active) => ({
  padding: "6px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500,
  background: active ? S.blue : S.surface2, color: active ? "#fff" : S.textSm, transition: "all .2s",
});

const CARD = { background: S.surface, borderRadius: 12, padding: "18px 20px", border: `1px solid ${S.border}` };

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, color }) {
  return (
    <div style={{ ...CARD, textAlign: "center" }}>
      <div style={{ fontSize: 11, color: S.textSm, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: color || S.blue, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: S.muted, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function AlertBadge({ severity }) {
  const cfg = { critical: [S.red, "#3b0f0f"], high: [S.amber, "#3b2a0f"], medium: [S.purple, "#2a1a3b"] };
  const [fg, bg] = cfg[severity] || [S.muted, S.surface2];
  return (
    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: bg, color: fg, textTransform: "uppercase", letterSpacing: "0.06em" }}>
      {severity}
    </span>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [sector, setSector] = useState("All");
  const [selDistrict, setSelDistrict] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [trendMetric, setTrendMetric] = useState("stress");
  const [pulse, setPulse] = useState(false);

  // pulse animation on mount
  useEffect(() => { setPulse(true); }, []);

  const districts = districtsBySector[sector] || districtsBySector.All;
  const trendData = selDistrict ? districtTrends[selDistrict.name] || [] : [];

  const handleSector = (s) => { setSector(s); setSelDistrict(null); };

  const SECTORS = ["All","Manufacturing","Textiles","Food Processing","Retail Trade"];
  const TABS = [
    { id:"overview", label:"Overview" },
    { id:"district", label:"District Drill-down" },
    { id:"sectors", label:"Sector Analysis" },
    { id:"alerts", label:`Alerts (${alerts.length})` },
  ];

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace", background: S.bg, minHeight: "100vh", color: S.text, padding: "20px 24px" }}>

      {/* ── HEADER ── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: S.green,
              boxShadow: pulse ? `0 0 0 4px rgba(34,197,94,.2)` : "none", transition: "box-shadow 1s" }} />
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: S.blue, letterSpacing: "0.02em" }}>MSME PULSE</h1>
            <span style={{ fontSize: 11, color: S.muted, background: S.surface2, padding: "2px 8px", borderRadius: 4, border: `1px solid ${S.border}` }}>v1.0</span>
          </div>
          <p style={{ margin: "4px 0 0 20px", fontSize: 11, color: S.textSm }}>India's First Real-Time MSME Economic Stress Intelligence System</p>
        </div>
        <div style={{ display:"flex", gap: 8 }}>
          {[["AUC","0.9853"],["Lead Time","6.8 mo"],["Rows","330K"],["Districts","742"]].map(([k,v]) => (
            <div key={k} style={{ background: S.surface2, border: `1px solid ${S.border}`, padding: "5px 12px", borderRadius: 8, textAlign:"center" }}>
              <div style={{ fontSize: 10, color: S.muted }}>{k}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: S.text }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── KPI STRIP ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap: 10, marginBottom: 18 }}>
        <KpiCard label="Avg National Stress" value="97.0%" color={S.red} sub="Dec 2024" />
        <KpiCard label="Critical Districts" value="6" color={S.red} sub="stress > 98%" />
        <KpiCard label="High Risk Districts" value="28" color={S.amber} sub="stress > 85%" />
        <KpiCard label="YoY Change" value="+14.8pp" color={S.amber} sub="vs Dec 2023" />
        <KpiCard label="BERT Sentiment" value="31.2%" color={S.purple} sub="positive signals" />
      </div>

      {/* ── SECTOR FILTER ── */}
      <div style={{ display:"flex", alignItems:"center", gap: 8, marginBottom: 18 }}>
        <span style={{ fontSize: 11, color: S.muted, marginRight: 4 }}>SECTOR</span>
        {SECTORS.map(s => (
          <button key={s} onClick={() => handleSector(s)} style={TAB_STYLE(sector===s)}>{s}</button>
        ))}
      </div>

      {/* ── TABS ── */}
      <div style={{ display:"flex", gap: 6, marginBottom: 18, borderBottom: `1px solid ${S.border}`, paddingBottom: 12 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ ...TAB_STYLE(activeTab===t.id), borderRadius: "8px 8px 0 0" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* TAB: OVERVIEW */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <div style={{ display:"flex", flexDirection:"column", gap: 16 }}>

          {/* Row 1: National trend + YoY */}
          <div style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr", gap: 16 }}>
            <div style={CARD}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 12 }}>
                <h3 style={{ margin:0, fontSize:13, color:S.blue }}>National Average Stress — 2024</h3>
                <div style={{ display:"flex", gap:6 }}>
                  {["stress","Manufacturing","Textiles","FoodProcessing","RetailTrade"].map(m => (
                    <button key={m} onClick={() => setTrendMetric(m)}
                      style={{ ...TAB_STYLE(trendMetric===m), fontSize:10, padding:"3px 8px" }}>
                      {m==="stress"?"All":m.replace("Processing"," Proc.")}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={nationalTrend}>
                  <defs>
                    <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={S.blue} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={S.blue} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={S.border} />
                  <XAxis dataKey="m" stroke={S.muted} tick={{ fontSize:10 }} />
                  <YAxis stroke={S.muted} tickFormatter={v=>(v*100).toFixed(0)+"%"} tick={{ fontSize:10 }} domain={[0.65,1.0]} />
                  <Tooltip contentStyle={TooltipStyle} formatter={v=>[pct(v)]} />
                  <Area type="monotone" dataKey={trendMetric} stroke={S.blue} fill="url(#areaG)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={CARD}>
              <h3 style={{ margin:"0 0 12px", fontSize:13, color:S.blue }}>Year-on-Year Comparison</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={yoyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={S.border} />
                  <XAxis dataKey="m" stroke={S.muted} tick={{ fontSize:10 }} />
                  <YAxis stroke={S.muted} tickFormatter={v=>(v*100).toFixed(0)+"%"} tick={{ fontSize:10 }} domain={[0.65,1.0]} />
                  <Tooltip contentStyle={TooltipStyle} formatter={v=>[pct(v)]} />
                  <Legend iconSize={10} wrapperStyle={{ fontSize:11 }} />
                  <Line type="monotone" dataKey="y2023" stroke={S.muted} strokeWidth={2} dot={false} name="2023" strokeDasharray="4 4" />
                  <Line type="monotone" dataKey="y2024" stroke={S.red} strokeWidth={2} dot={false} name="2024" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Row 2: State heatmap bar + Sector radar */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: 16 }}>
            <div style={CARD}>
              <h3 style={{ margin:"0 0 12px", fontSize:13, color:S.blue }}>State-Level Stress Index</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={stateStress} layout="vertical" margin={{ left:20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={S.border} horizontal={false} />
                  <XAxis type="number" stroke={S.muted} tickFormatter={v=>(v*100).toFixed(0)+"%"} tick={{ fontSize:10 }} domain={[0.85,1.0]} />
                  <YAxis type="category" dataKey="state" stroke={S.muted} tick={{ fontSize:10 }} width={100} />
                  <Tooltip contentStyle={TooltipStyle} formatter={v=>[pct(v),"Stress Index"]} />
                  <Bar dataKey="stress" radius={[0,4,4,0]} name="Stress">
                    {stateStress.map((d,i) => <Cell key={i} fill={stressColor(d.stress)} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={CARD}>
              <h3 style={{ margin:"0 0 12px", fontSize:13, color:S.blue }}>Multi-Signal Stress Radar — {sector}</h3>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData} margin={{ top:10, right:20, bottom:10, left:20 }}>
                  <PolarGrid stroke={S.border} />
                  <PolarAngleAxis dataKey="axis" tick={{ fontSize:9, fill:S.textSm }} />
                  <PolarRadiusAxis angle={30} domain={[0,100]} tick={{ fontSize:9, fill:S.muted }} />
                  <Radar name={sector} dataKey={sector.replace(" ","")} stroke={S.blue} fill={S.blue} fillOpacity={0.25} strokeWidth={2} />
                  {sector !== "All" && (
                    <Radar name="All" dataKey="All" stroke={S.muted} fill="none" strokeDasharray="4 4" strokeWidth={1.5} />
                  )}
                  <Legend iconSize={10} wrapperStyle={{ fontSize:11 }} />
                  <Tooltip contentStyle={TooltipStyle} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* TAB: DISTRICT DRILL-DOWN */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeTab === "district" && (
        <div style={{ display:"grid", gridTemplateColumns:"340px 1fr", gap: 16 }}>

          {/* District list */}
          <div style={{ ...CARD, padding: 0, overflow:"hidden" }}>
            <div style={{ padding:"12px 16px", borderBottom:`1px solid ${S.border}` }}>
              <h3 style={{ margin:0, fontSize:13, color:S.blue }}>
                Top 10 — {sector === "All" ? "All Sectors" : sector}
              </h3>
            </div>
            <div style={{ overflowY:"auto", maxHeight: 480 }}>
              {districts.map((d,i) => (
                <div key={d.name} onClick={() => setSelDistrict(d)}
                  style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                    padding:"10px 16px", cursor:"pointer", borderBottom:`1px solid ${S.border}`,
                    background: selDistrict?.name===d.name ? "#1d2d44" : "transparent",
                    borderLeft: selDistrict?.name===d.name ? `3px solid ${S.blue}` : "3px solid transparent",
                    transition:"all .15s" }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600 }}>{i+1}. {d.name}</div>
                    <div style={{ fontSize:10, color:S.textSm, marginTop:2 }}>{d.state}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:14, fontWeight:700, color:stressColor(d.stress) }}>{pct(d.stress)}</div>
                    <div style={{ fontSize:9, color:stressColor(d.stress) }}>{riskLabel(d.stress)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div style={{ display:"flex", flexDirection:"column", gap: 14 }}>
            {selDistrict ? (
              <>
                {/* KPIs */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                  <KpiCard label="Stress Score" value={pct(selDistrict.stress)} color={stressColor(selDistrict.stress)} />
                  <KpiCard label="Risk Level" value={riskLabel(selDistrict.stress)} color={stressColor(selDistrict.stress)} />
                  <KpiCard label="State" value={selDistrict.state} />
                </div>

                {/* 3-line trend */}
                <div style={CARD}>
                  <h3 style={{ margin:"0 0 12px", fontSize:13, color:S.blue }}>{selDistrict.name} — Monthly Signals 2024</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={S.border} />
                      <XAxis dataKey="m" stroke={S.muted} tick={{ fontSize:10 }} />
                      <YAxis stroke={S.muted} tickFormatter={v=>(v*100).toFixed(0)+"%"} tick={{ fontSize:10 }} />
                      <Tooltip contentStyle={TooltipStyle} formatter={(v,n)=>[pct(v),n]} />
                      <Legend iconSize={10} wrapperStyle={{ fontSize:11 }} />
                      <Line type="monotone" dataKey="s" stroke={S.red} name="Stress Score" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="r" stroke={S.blue} name="Night Light Index" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="nlp" stroke={S.purple} name="NLP Sentiment" strokeWidth={2} dot={false} strokeDasharray="4 3" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Scatter: stress vs radiance */}
                <div style={CARD}>
                  <h3 style={{ margin:"0 0 12px", fontSize:13, color:S.blue }}>Stress vs Night Light — {selDistrict.name}</h3>
                  <ResponsiveContainer width="100%" height={160}>
                    <ScatterChart margin={{ top:5, right:20, bottom:5, left:0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={S.border} />
                      <XAxis dataKey="r" name="Night Light" stroke={S.muted} tick={{ fontSize:10 }} label={{ value:"Radiance", position:"insideBottom", offset:-5, fill:S.muted, fontSize:10 }} />
                      <YAxis dataKey="s" name="Stress" stroke={S.muted} tick={{ fontSize:10 }} tickFormatter={v=>(v*100).toFixed(0)+"%"} />
                      <ZAxis range={[40,40]} />
                      <Tooltip contentStyle={TooltipStyle} cursor={{ strokeDasharray:"3 3" }}
                        formatter={(v,n)=>[n==="Night Light"?v.toFixed(3):pct(v),n]} />
                      <Scatter data={trendData.map(d=>({r:d.r,s:d.s}))} fill={S.blue} opacity={0.8} />
                    </ScatterChart>
                  </ResponsiveContainer>
                  <div style={{ fontSize:10, color:S.muted, marginTop:6, textAlign:"center" }}>
                    Inverse correlation — as night light drops, stress rises (R² ≈ 0.87)
                  </div>
                </div>
              </>
            ) : (
              <div style={{ ...CARD, display:"flex", alignItems:"center", justifyContent:"center", height: 400, flexDirection:"column", gap:10 }}>
                <div style={{ fontSize:36 }}>←</div>
                <div style={{ color:S.textSm, fontSize:13 }}>Select a district to see full analysis</div>
                <div style={{ fontSize:11, color:S.muted }}>Trend · Night Light · NLP · Scatter</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* TAB: SECTOR ANALYSIS */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeTab === "sectors" && (
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

          {/* Sector comparison bar */}
          <div style={CARD}>
            <h3 style={{ margin:"0 0 12px", fontSize:13, color:S.blue }}>Sector Stress Comparison — Dec 2024</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={districts}>
                <CartesianGrid strokeDasharray="3 3" stroke={S.border} />
                <XAxis dataKey="name" stroke={S.muted} tick={{ fontSize:10 }} />
                <YAxis stroke={S.muted} tickFormatter={v=>(v*100).toFixed(0)+"%"} tick={{ fontSize:10 }} domain={[0.85,1.0]} />
                <Tooltip contentStyle={TooltipStyle} formatter={v=>[pct(v),"Stress"]} />
                <Bar dataKey="stress" radius={[4,4,0,0]} name="Stress">
                  {districts.map((d,i) => <Cell key={i} fill={stressColor(d.stress)} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* All-sector trend */}
          <div style={CARD}>
            <h3 style={{ margin:"0 0 12px", fontSize:13, color:S.blue }}>All Sectors — Monthly Stress Trend 2024</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={nationalTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke={S.border} />
                <XAxis dataKey="m" stroke={S.muted} tick={{ fontSize:10 }} />
                <YAxis stroke={S.muted} tickFormatter={v=>(v*100).toFixed(0)+"%"} tick={{ fontSize:10 }} domain={[0.65,1.0]} />
                <Tooltip contentStyle={TooltipStyle} formatter={(v,n)=>[pct(v),n]} />
                <Legend iconSize={10} wrapperStyle={{ fontSize:11 }} />
                <Line dataKey="Manufacturing" stroke={SECTOR_COLORS.Manufacturing} strokeWidth={2} dot={false} />
                <Line dataKey="Textiles" stroke={SECTOR_COLORS.Textiles} strokeWidth={2} dot={false} />
                <Line dataKey="FoodProcessing" name="Food Processing" stroke={SECTOR_COLORS["Food Processing"]} strokeWidth={2} dot={false} />
                <Line dataKey="RetailTrade" name="Retail Trade" stroke={SECTOR_COLORS["Retail Trade"]} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* TAB: ALERTS */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeTab === "alerts" && (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
            <h3 style={{ margin:0, fontSize:13, color:S.blue }}>Live Alert Feed — Early Warning Triggers</h3>
            <span style={{ fontSize:11, color:S.green }}>● Live</span>
          </div>
          {alerts.map((a,i) => (
            <div key={i} style={{ ...CARD, display:"flex", alignItems:"center", gap:16, padding:"14px 18px" }}>
              <div style={{ width:42, height:42, borderRadius:"50%", background:S.surface2,
                border:`2px solid ${stressColor(.9)}`, display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:11, fontWeight:700, color:stressColor(.9), flexShrink:0 }}>
                {a.district.slice(0,2).toUpperCase()}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <span style={{ fontWeight:700, fontSize:14 }}>{a.district}</span>
                  <span style={{ fontSize:11, color:S.textSm }}>{a.state}</span>
                  <AlertBadge severity={a.severity} />
                </div>
                <div style={{ fontSize:12, color:S.textSm }}>{a.trigger}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:15, fontWeight:700, color:S.red }}>{a.change}</div>
                <div style={{ fontSize:10, color:S.muted, marginTop:3 }}>{a.time}</div>
              </div>
            </div>
          ))}
          <div style={{ ...CARD, textAlign:"center", color:S.muted, fontSize:12, padding:"14px" }}>
            Alerts generated by XGBoost threshold crossings + BERT sentiment drops. Lead time: 6.8 months avg.
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign:"center", marginTop:24, color:S.muted, fontSize:10, letterSpacing:"0.04em" }}>
        BUILT BY KRISH MAKHIJA · MSME PULSE v1.0 · MODEL AUC 0.9853 · DATA: NASA VIIRS + MCA21 + GST · LEAD TIME 6.8 MONTHS
      </div>
    </div>
  );
}
