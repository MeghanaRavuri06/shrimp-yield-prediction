import React, { useState } from "react";
import "./App.css";

const initialForm = {
  prawn_density_per_m2: "",
  feed_quality_index: "",
  water_exchange_per_month: "",
  DO_mg_L: "",
  temperature_C: "",
  pH: "",
  ammonia_mg_L: "",
  nitrite_mg_L: "",
  H2S_mg_L: "",
  turbidity_cm: "",
  salinity_ppt: "",
  pond_size_ha: "",
  recycling_efficiency_pct: "",
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [prediction, setPrediction] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | error | done
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    setPrediction(null);

    const payload = {
      prawn_density_per_m2: parseFloat(formData.prawn_density_per_m2),
      feed_quality_index: parseFloat(formData.feed_quality_index),
      water_exchange_per_month: parseFloat(formData.water_exchange_per_month),
      DO_mg_L: parseFloat(formData.DO_mg_L),
      temperature_C: parseFloat(formData.temperature_C),
      pH: parseFloat(formData.pH),
      ammonia_mg_L: parseFloat(formData.ammonia_mg_L),
      nitrite_mg_L: parseFloat(formData.nitrite_mg_L),
      H2S_mg_L: parseFloat(formData.H2S_mg_L),
      turbidity_cm: parseFloat(formData.turbidity_cm),
      salinity_ppt: parseFloat(formData.salinity_ppt),
      pond_size_ha: parseFloat(formData.pond_size_ha),
      recycling_efficiency_pct: parseFloat(formData.recycling_efficiency_pct),
    };

    try {
      const res = await fetch("https://shrimp-yield-prediction-backend.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Network response was not OK");

      const data = await res.json();
      setPrediction(data.prediction);
      setStatus("done");
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <div className="animated-bg">
      <div className="page-wrapper">
        <div className="container">
          <header className="header">
            <div className="title-block">
              <h1>Shrimp Yield Prediction</h1>
              <p>Estimate expected harvest yield based on current pond conditions.</p>
            </div>
            <div className="badge">
              <span className="badge-dot" />
              <span>ML Model • Random Forest</span>
            </div>
          </header>

          <div className="content">
            {/* LEFT: FORM */}
            <section className="card">
              <div className="card-header">
                <h2>Input Pond Parameters</h2>
                <span>Enter current values to get a yield estimate</span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Prawn Density per m²</label>
                  <span className="label-sub">Stocking density of shrimp in the pond</span>
                  <input
                    type="number"
                    step="0.1"
                    id="prawn_density_per_m2"
                    placeholder="e.g. 15.0"
                    required
                    value={formData.prawn_density_per_m2}
                    onChange={handleChange}
                  />
                  <small>Range: 5-40 prawn/m²</small>
                </div>

                <div className="form-group">
                  <label>Feed Quality Index</label>
                  <span className="label-sub">Overall quality score of feed</span>
                  <input
                    type="number"
                    step="0.01"
                    id="feed_quality_index"
                    placeholder="e.g. 0.85"
                    required
                    value={formData.feed_quality_index}
                    onChange={handleChange}
                  />
                  <small>Range: 0.4-1.0</small>
                </div>

                <div className="form-group">
                  <label>Water Exchange per Month</label>
                  <span className="label-sub">Number of full or partial exchanges</span>
                  <input
                    type="number"
                    step="0.1"
                    id="water_exchange_per_month"
                    placeholder="e.g. 6"
                    required
                    value={formData.water_exchange_per_month}
                    onChange={handleChange}
                  />
                  <small>Range: 1-12 times/month</small>
                </div>

                <div className="form-group">
                  <label>DO (mg/L)</label>
                  <span className="label-sub">Dissolved oxygen level in the pond</span>
                  <input
                    type="number"
                    step="0.01"
                    id="DO_mg_L"
                    placeholder="e.g. 5.8"
                    required
                    value={formData.DO_mg_L}
                    onChange={handleChange}
                  />
                  <small>Range: 3.5-8.0 mg/L</small>
                </div>

                <div className="form-group">
                  <label>Temperature (°C)</label>
                  <span className="label-sub">Average pond water temperature</span>
                  <input
                    type="number"
                    step="0.1"
                    id="temperature_C"
                    placeholder="e.g. 29.5"
                    required
                    value={formData.temperature_C}
                    onChange={handleChange}
                  />
                  <small>Range: 24-34°C</small>
                </div>

                <div className="form-group">
                  <label>pH</label>
                  <span className="label-sub">Acidity/alkalinity of pond water</span>
                  <input
                    type="number"
                    step="0.01"
                    id="pH"
                    placeholder="e.g. 7.6"
                    required
                    value={formData.pH}
                    onChange={handleChange}
                  />
                  <small>Range: 6.8-8.5</small>
                </div>

                <div className="form-group">
                  <label>Ammonia (mg/L)</label>
                  <span className="label-sub">Unionized or total ammonia level</span>
                  <input
                    type="number"
                    step="0.01"
                    id="ammonia_mg_L"
                    placeholder="e.g. 0.15"
                    required
                    value={formData.ammonia_mg_L}
                    onChange={handleChange}
                  />
                  <small>Range: 0.01-1.2 mg/L</small>
                </div>

                <div className="form-group">
                  <label>Nitrite (mg/L)</label>
                  <span className="label-sub">Nitrite concentration in water</span>
                  <input
                    type="number"
                    step="0.01"
                    id="nitrite_mg_L"
                    placeholder="e.g. 0.08"
                    required
                    value={formData.nitrite_mg_L}
                    onChange={handleChange}
                  />
                  <small>Range: 0.01-0.6 mg/L</small>
                </div>

                <div className="form-group">
                  <label>H₂S (mg/L)</label>
                  <span className="label-sub">Hydrogen sulfide level</span>
                  <input
                    type="number"
                    step="0.01"
                    id="H2S_mg_L"
                    placeholder="e.g. 0.03"
                    required
                    value={formData.H2S_mg_L}
                    onChange={handleChange}
                  />
                  <small>Range: 0-0.15 mg/L</small>
                </div>

                <div className="form-group">
                  <label>Turbidity (cm)</label>
                  <span className="label-sub">Secchi disk visibility depth</span>
                  <input
                    type="number"
                    step="0.1"
                    id="turbidity_cm"
                    placeholder="e.g. 40"
                    required
                    value={formData.turbidity_cm}
                    onChange={handleChange}
                  />
                  <small>Range: 20-80 cm</small>
                </div>

                <div className="form-group">
                  <label>Salinity (ppt)</label>
                  <span className="label-sub">Salt concentration in water</span>
                  <input
                    type="number"
                    step="0.1"
                    id="salinity_ppt"
                    placeholder="e.g. 18"
                    required
                    value={formData.salinity_ppt}
                    onChange={handleChange}
                  />
                  <small>Range: 5-35 ppt</small>
                </div>

                <div className="form-group">
                  <label>Pond Size (ha)</label>
                  <span className="label-sub">Surface area of the pond</span>
                  <input
                    type="number"
                    step="0.1"
                    id="pond_size_ha"
                    placeholder="e.g. 0.8"
                    required
                    value={formData.pond_size_ha}
                    onChange={handleChange}
                  />
                  <small>Range: 0.1-2.0 ha</small>
                </div>

                <div className="form-group">
                  <label>Recycling Efficiency (%)</label>
                  <span className="label-sub">Efficiency of water treatment and reuse</span>
                  <input
                    type="number"
                    step="0.1"
                    id="recycling_efficiency_pct"
                    placeholder="e.g. 65"
                    required
                    value={formData.recycling_efficiency_pct}
                    onChange={handleChange}
                  />
                  <small>Range: 40-90%</small>
                </div>

                <div className="button-row">
                  <button type="submit" className={status === "loading" ? "loading" : ""}>
                    {status === "loading" ? "Predicting..." : "Predict Yield"}
                  </button>

                  <div
                    id="result"
                    className={
                      "result-box " +
                      (status === "idle" ? "result-muted" : "") +
                      (status === "done" ? "result-anim" : "")
                    }
                  >
                    {status === "idle" && "Enter parameters and click Predict to see yield."}
                    {status === "loading" && "Predicting..."}
                    {status === "error" && `Error: ${errorMsg}`}
                    {status === "done" &&
                      prediction !== null &&
                      `Predicted Yield: ${prediction.toFixed(2)}%`}
                  </div>
                </div>
              </form>
            </section>

            {/* RIGHT: SIDEBAR */}
            <aside className="side-panel">
              <section className="card">
                <div className="card-header">
                  <h2>Model Info</h2>
                  <span>Current configuration</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Algorithm</span>
                  <span className="metric-value">Random Forest Regressor</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Train R²</span>
                  <span className="metric-value">≈ 0.96</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Test R²</span>
                  <span className="metric-value">≈ 0.84</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Test MAE</span>
                  <span className="metric-value">≈ 7.8</span>
                </div>

                <div style={{ marginTop: 12 }}>
                  <span className="pill">
                    <span className="pill-dot" />
                    Major drivers: density, DO, ammonia
                  </span>
                </div>
                <p className="alert">
                  Note: This tool is for decision support only, not a substitute for on‑farm trials.
                </p>
              </section>

              <section className="card">
                <div className="card-header">
                  <h2>Tips for Better Predictions</h2>
                  <span>Keep values within recommended ranges</span>
                </div>
                <ul className="tips-list">
                  <li>Maintain DO towards the upper range to support high stocking densities.</li>
                  <li>Keep ammonia and nitrite as low as possible for healthier shrimp.</li>
                  <li>Use consistent measurement methods for all inputs for reliable results.</li>
                </ul>
              </section>
            </aside>
          </div>

          <div className="footer-note">
            Shrimp Yield Simulator • Educational Prototype
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
