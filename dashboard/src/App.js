import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from "recharts";

const districtTrends = {
  "Agra": [
    { month: "Jan", stress: 0.845, radiance: 0.718 },
    { month: "Feb", stress: 0.874, radiance: 0.684 },
    { month: "Mar", stress: 0.866, radiance: 0.646 },
    { month: "Apr", stress: 0.877, radiance: 0.655 },
    { month: "May", stress: 0.914, radiance: 0.628 },
    { month: "Jun", stress: 0.906, radiance: 0.619 },
    { month: "Jul", stress: 0.953, radiance: 0.569 },
    { month: "Aug", stress: 0.942, radiance: 0.547 },
    { month: "Sep", stress: 0.962, radiance: 0.541 },
    { month: "Oct", stress: 0.982, radiance: 0.512 },
    { month: "Nov", stress: 0.999, radiance: 0.486 },
    { month: "Dec", stress: 0.999, radiance: 0.475 }
  ],
  "Bathinda": [
    { month: "Jan", stress: 0.820, radiance: 0.700 },
    { month: "Feb", stress: 0.845, radiance: 0.672 },
    { month: "Mar", stress: 0.851, radiance: 0.641 },
    { month: "Apr", stress: 0.869, radiance: 0.628 },
    { month: "May", stress: 0.892, radiance: 0.601 },
    { month: "Jun", stress: 0.901, radiance: 0.588 },
    { month: "Jul", stress: 0.921, radiance: 0.562 },
    { month: "Aug", stress: 0.938, radiance: 0.541 },
    { month: "Sep", stress: 0.952, radiance: 0.519 },
    { month: "Oct", stress: 0.971, radiance: 0.498 },
    { month: "Nov", stress: 0.985, radiance: 0.472 },
    { month: "Dec", stress: 0.999, radiance: 0.451 }
  ],
  "Kanpur": [
    { month: "Jan", stress: 0.880, radiance: 0.710 },
    { month: "Feb", stress: 0.891, radiance: 0.688 },
    { month: "Mar", stress: 0.902, radiance: 0.661 },
    { month: "Apr", stress: 0.918, radiance: 0.638 },
    { month: "May", stress: 0.931, radiance: 0.612 },
    { month: "Jun", stress: 0.944, radiance: 0.589 },
    { month: "Jul", stress: 0.958, radiance: 0.561 },
    { month: "Aug", stress: 0.967, radiance: 0.538 },
    { month: "Sep", stress: 0.975, radiance: 0.512 },
    { month: "Oct", stress: 0.984, radiance: 0.489 },
    { month: "Nov", stress: 0.992, radiance: 0.461 },
    { month: "Dec", stress: 0.999, radiance: 0.438 }
  ],
  "Bhopal": [
    { month: "Jan", stress: 0.790, radiance: 0.720 },
    { month: "Feb", stress: 0.812, radiance: 0.698 },
    { month: "Mar", stress: 0.828, radiance: 0.671 },
    { month: "Apr", stress: 0.845, radiance: 0.648 },
    { month: "May", stress: 0.861, radiance: 0.622 },
    { month: "Jun", stress: 0.878, radiance: 0.599 },
    { month: "Jul", stress: 0.894, radiance: 0.571 },
    { month: "Aug", stress: 0.911, radiance: 0.548 },
    { month: "Sep", stress: 0.928, radiance: 0.522 },
    { month: "Oct", stress: 0.945, radiance: 0.499 },
    { month: "Nov", stress: 0.962, radiance: 0.471 },
    { month: "Dec", stress: 0.979, radiance: 0.448 }
  ],
  "Varanasi": [
    { month: "Jan", stress: 0.830, radiance: 0.705 },
    { month: "Feb", stress: 0.848, radiance: 0.681 },
    { month: "Mar", stress: 0.862, radiance: 0.654 },
    { month: "Apr", stress: 0.879, radiance: 0.631 },
    { month: "May", stress: 0.895, radiance: 0.605 },
    { month: "Jun", stress: 0.912, radiance: 0.582 },
    { month: "Jul", stress: 0.928, radiance: 0.554 },
    { month: "Aug", stress: 0.945, radiance: 0.531 },
    { month: "Sep", stress: 0.961, radiance: 0.505 },
    { month: "Oct", stress: 0.978, radiance: 0.482 },
    { month: "Nov", stress: 0.991, radiance: 0.454 },
    { month: "Dec", stress: 0.999, radiance: 0.431 }
  ],
  "Ludhiana": [
    { month: "Jan", stress: 0.770, radiance: 0.725 },
    { month: "Feb", stress: 0.789, radiance: 0.701 },
    { month: "Mar", stress: 0.805, radiance: 0.674 },
    { month: "Apr", stress: 0.821, radiance: 0.651 },
    { month: "May", stress: 0.838, radiance: 0.625 },
    { month: "Jun", stress: 0.854, radiance: 0.602 },
    { month: "Jul", stress: 0.871, radiance: 0.574 },
    { month: "Aug", stress: 0.887, radiance: 0.551 },
    { month: "Sep", stress: 0.904, radiance: 0.525 },
    { month: "Oct", stress: 0.921, radiance: 0.502 },
    { month: "Nov", stress: 0.937, radiance: 0.474 },
    { month: "Dec", stress: 0.954, radiance: 0.451 }
  ],
  "Surat": [
    { month: "Jan", stress: 0.750, radiance: 0.730 },
    { month: "Feb", stress: 0.768, radiance: 0.706 },
    { month: "Mar", stress: 0.783, radiance: 0.679 },
    { month: "Apr", stress: 0.799, radiance: 0.656 },
    { month: "May", stress: 0.815, radiance: 0.630 },
    { month: "Jun", stress: 0.831, radiance: 0.607 },
    { month: "Jul", stress: 0.848, radiance: 0.579 },
    { month: "Aug", stress: 0.864, radiance: 0.556 },
    { month: "Sep", stress: 0.880, radiance: 0.530 },
    { month: "Oct", stress: 0.897, radiance: 0.507 },
    { month: "Nov", stress: 0.913, radiance: 0.479 },
    { month: "Dec", stress: 0.929, radiance: 0.456 }
  ],
  "Coimbatore": [
    { month: "Jan", stress: 0.720, radiance: 0.735 },
    { month: "Feb", stress: 0.738, radiance: 0.711 },
    { month: "Mar", stress: 0.753, radiance: 0.684 },
    { month: "Apr", stress: 0.769, radiance: 0.661 },
    { month: "May", stress: 0.785, radiance: 0.635 },
    { month: "Jun", stress: 0.801, radiance: 0.612 },
    { month: "Jul", stress: 0.818, radiance: 0.584 },
    { month: "Aug", stress: 0.834, radiance: 0.561 },
    { month: "Sep", stress: 0.850, radiance: 0.535 },
    { month: "Oct", stress: 0.867, radiance: 0.512 },
    { month: "Nov", stress: 0.883, radiance: 0.484 },
    { month: "Dec", stress: 0.899, radiance: 0.461 }
  ],
  "Kolkata": [
    { month: "Jan", stress: 0.800, radiance: 0.715 },
    { month: "Feb", stress: 0.819, radiance: 0.691 },
    { month: "Mar", stress: 0.835, radiance: 0.664 },
    { month: "Apr", stress: 0.851, radiance: 0.641 },
    { month: "May", stress: 0.868, radiance: 0.615 },
    { month: "Jun", stress: 0.884, radiance: 0.592 },
    { month: "Jul", stress: 0.901, radiance: 0.564 },
    { month: "Aug", stress: 0.917, radiance: 0.541 },
    { month: "Sep", stress: 0.934, radiance: 0.515 },
    { month: "Oct", stress: 0.950, radiance: 0.492 },
    { month: "Nov", stress: 0.967, radiance: 0.464 },
    { month: "Dec", stress: 0.983, radiance: 0.441 }
  ],
  "Nagpur": [
    { month: "Jan", stress: 0.780, radiance: 0.722 },
    { month: "Feb", stress: 0.798, radiance: 0.698 },
    { month: "Mar", stress: 0.814, radiance: 0.671 },
    { month: "Apr", stress: 0.830, radiance: 0.648 },
    { month: "May", stress: 0.847, radiance: 0.622 },
    { month: "Jun", stress: 0.863, radiance: 0.599 },
    { month: "Jul", stress: 0.880, radiance: 0.571 },
    { month: "Aug", stress: 0.896, radiance: 0.548 },
    { month: "Sep", stress: 0.913, radiance: 0.522 },
    { month: "Oct", stress: 0.929, radiance: 0.499 },
    { month: "Nov", stress: 0.946, radiance: 0.471 },
    { month: "Dec", stress: 0.962, radiance: 0.448 }
  ]
};

const districts = [
  { name: "Agra", state: "Uttar Pradesh", stress: 0.999 },
  { name: "Bathinda", state: "Punjab", stress: 0.999 },
  { name: "Kanpur", state: "Uttar Pradesh", stress: 0.998 },
  { name: "Bhopal", state: "Madhya Pradesh", stress: 0.979 },
  { name: "Varanasi", state: "Uttar Pradesh", stress: 0.999 },
  { name: "Ludhiana", state: "Punjab", stress: 0.954 },
  { name: "Surat", state: "Gujarat", stress: 0.929 },
  { name: "Coimbatore", state: "Tamil Nadu", stress: 0.899 },
  { name: "Kolkata", state: "West Bengal", stress: 0.983 },
  { name: "Nagpur", state: "Maharashtra", stress: 0.962 },
];

const sectors = ["All", "Manufacturing", "Textiles", "Food Processing", "Retail Trade"];

function getColor(stress) {
  if (stress > 0.8) return "#ef4444";
  if (stress > 0.6) return "#f59e0b";
  return "#22c55e";
}

function getRiskLabel(stress) {
  if (stress > 0.8) return "HIGH RISK";
  if (stress > 0.6) return "MEDIUM RISK";
  return "LOW RISK";
}

export default function App() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedSector, setSelectedSector] = useState("All");

  const trendData = selectedDistrict ? districtTrends[selectedDistrict.name] : [];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#0f172a", minHeight: "100vh", color: "white", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", color: "#60a5fa", margin: 0 }}>MSME Pulse</h1>
        <p style={{ color: "#94a3b8", margin: "5px 0" }}>India First Real-Time MSME Economic Stress Intelligence System</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "10px" }}>
          <span style={{ background: "#1e293b", padding: "5px 15px", borderRadius: "20px", fontSize: "14px" }}>AUC: 0.9853</span>
          <span style={{ background: "#1e293b", padding: "5px 15px", borderRadius: "20px", fontSize: "14px" }}>Lead Time: 6.8 months</span>
          <span style={{ background: "#1e293b", padding: "5px 15px", borderRadius: "20px", fontSize: "14px" }}>330,048 rows of data</span>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px", color: "#94a3b8" }}>Sector:</label>
        {sectors.map(s => (
          <button key={s} onClick={() => setSelectedSector(s)}
            style={{ marginRight: "8px", padding: "5px 15px", borderRadius: "15px", border: "none", cursor: "pointer",
              background: selectedSector === s ? "#3b82f6" : "#1e293b", color: "white", fontSize: "13px" }}>
            {s}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        <div style={{ background: "#1e293b", borderRadius: "12px", padding: "20px" }}>
          <h3 style={{ color: "#60a5fa", marginTop: 0 }}>Top 10 High-Stress Districts — 2024</h3>
          {districts.map((d, i) => (
            <div key={d.name} onClick={() => setSelectedDistrict(d)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px", marginBottom: "8px", borderRadius: "8px", cursor: "pointer",
                background: selectedDistrict && selectedDistrict.name === d.name ? "#2d3f5c" : "#0f172a",
                border: "1px solid #334155" }}>
              <div>
                <span style={{ fontWeight: "bold" }}>{i + 1}. {d.name}</span>
                <span style={{ color: "#94a3b8", fontSize: "12px", marginLeft: "8px" }}>{d.state}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: getColor(d.stress), fontWeight: "bold" }}>{(d.stress * 100).toFixed(1)}%</div>
                <div style={{ fontSize: "10px", color: getColor(d.stress) }}>{getRiskLabel(d.stress)}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1e293b", borderRadius: "12px", padding: "20px" }}>
          <h3 style={{ color: "#60a5fa", marginTop: 0 }}>
            {selectedDistrict ? selectedDistrict.name + " — 2024 Stress Trend" : "Click a district to see its trend"}
          </h3>
          {selectedDistrict ? (
            <div>
              <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                <div style={{ background: "#0f172a", padding: "10px 15px", borderRadius: "8px", flex: 1, textAlign: "center" }}>
                  <div style={{ color: "#94a3b8", fontSize: "12px" }}>Current Stress</div>
                  <div style={{ color: getColor(selectedDistrict.stress), fontSize: "22px", fontWeight: "bold" }}>
                    {(selectedDistrict.stress * 100).toFixed(1)}%
                  </div>
                </div>
                <div style={{ background: "#0f172a", padding: "10px 15px", borderRadius: "8px", flex: 1, textAlign: "center" }}>
                  <div style={{ color: "#94a3b8", fontSize: "12px" }}>Risk Level</div>
                  <div style={{ color: getColor(selectedDistrict.stress), fontSize: "16px", fontWeight: "bold" }}>
                    {getRiskLabel(selectedDistrict.stress)}
                  </div>
                </div>
                <div style={{ background: "#0f172a", padding: "10px 15px", borderRadius: "8px", flex: 1, textAlign: "center" }}>
                  <div style={{ color: "#94a3b8", fontSize: "12px" }}>State</div>
                  <div style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>{selectedDistrict.state}</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tickFormatter={v => (v * 100).toFixed(0) + "%"} />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155" }}
                    formatter={(v, n) => [(v * 100).toFixed(1) + "%", n]} />
                  <Legend />
                  <Line type="monotone" dataKey="stress" stroke="#ef4444" name="Stress Score" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="radiance" stroke="#60a5fa" name="Night Light Index" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", flexDirection: "column", gap: "10px" }}>
              <div style={{ fontSize: "40px" }}>👆</div>
              <div>Click any district on the left</div>
              <div style={{ fontSize: "12px" }}>See its monthly stress trend and nighttime light data</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ background: "#1e293b", borderRadius: "12px", padding: "20px" }}>
        <h3 style={{ color: "#60a5fa", marginTop: 0 }}>District Stress Comparison — December 2024</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={districts}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <YAxis stroke="#94a3b8" tickFormatter={v => (v * 100).toFixed(0) + "%"} domain={[0.85, 1.0]} />
            <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155" }}
              formatter={v => [(v * 100).toFixed(1) + "%", "Stress Probability"]} />
            <Bar dataKey="stress" name="Stress Probability" fill="#ef4444" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px", color: "#475569", fontSize: "12px" }}>
        Built by Krish Makhija | MSME Pulse v1.0 | Model AUC: 0.9853 | Data: NASA VIIRS + MCA21 + GST | Lead Time: 6.8 months
      </div>
    </div>
  );
}
