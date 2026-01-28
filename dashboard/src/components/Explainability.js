import React, { useEffect, useState } from "react";
import axios from "axios";

const Explainability = () => {
  const [data, setData] = useState([]);
  const [llmExplanations, setLlmExplanations] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/explainability")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const fetchLLMExplanation = async (app) => {
    if (llmExplanations[app.applicantId]) return;

    const res = await axios.post("http://localhost:3000/llm-explain", {
      risk: app.risk,
      confidence: app.confidence,
      surplus: app.surplus,
      past_emi_delays: app.past_emi_delays,
      behavior_score: app.behavior_consistency_score
    });

    setLlmExplanations(prev => ({
      ...prev,
      [app.applicantId]: res.data
    }));
  };

  return (
    <>
      <h3 className="title">Explainability & Ethics</h3>

      {data.length === 0 && <p>No processed applications found.</p>}

      {data.map(app => (
        <div
          key={app.applicantId}
          className="order-table"
          style={{ marginBottom: "25px", maxWidth: "800px" }}
        >
          <div style={{ padding: "20px" }}>
            <h4>Applicant ID</h4>
            <p style={{ fontSize: "12px", color: "#777" }}>
              {app.applicantId}
            </p>

            <p><b>Decision:</b> {app.decision}</p>
            <p><b>Risk Level:</b> {app.risk}</p>
            <p><b>Model Confidence:</b> {(app.confidence * 100).toFixed(0)}%</p>
            <p><b>Monthly Surplus:</b> ₹{app.surplus}</p>

            <hr />

            <p><b>Key Factors (Structured)</b></p>
            <ul>
              {app.keyFactors.map((factor, i) => (
                <li key={i}>{factor}</li>
              ))}
            </ul>

            <button
              onClick={() => fetchLLMExplanation(app)}
              style={{ marginTop: "10px" }}
            >
              Generate AI Explanation
            </button>

            {llmExplanations[app.applicantId] && (
              <>
                <p style={{ marginTop: "15px" }}>
                  <b>Explanation Source:</b>{" "}
                  {llmExplanations[app.applicantId].source}
                </p>
                <p style={{ color: "#555" }}>
                  {llmExplanations[app.applicantId].explanation}
                </p>
              </>
            )}

            {app.humanReviewRequired && (
              <p style={{ color: "#faad14", marginTop: "10px" }}>
                ⚠ Medium-risk case flagged for human review
              </p>
            )}
          </div>
        </div>
      ))}

      {/* ================= ETHICS ================= */}
      <div className="order-table" style={{ maxWidth: "800px" }}>
        <div style={{ padding: "20px" }}>
          <h4>Ethical Safeguards</h4>
          <ul>
            <li>LLM does NOT make credit decisions</li>
            <li>Only anonymized financial signals are sent to LLM</li>
            <li>Rule-based fallback ensures reliability</li>
            <li>Human review for medium-risk cases</li>
            <li>All decisions are auditable</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Explainability;
