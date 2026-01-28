import React, { useState, useEffect } from "react";
import axios from "axios";

const RepaymentSimulation = () => {
  const [amount, setAmount] = useState(200000);
  const [tenure, setTenure] = useState(24);
  const [interestRate, setInterestRate] = useState(12);
  const [scenario, setScenario] = useState("normal");

  const [applicantId, setApplicantId] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH LATEST CREDIT APPLICATION ---------------- */
  useEffect(() => {
    axios
      .get("http://localhost:3000/credit-applications")
      .then((res) => {
        if (res.data.length > 0) {
          setApplicantId(res.data[0]._id); // use latest application
        }
      })
      .catch((err) => console.error(err));
  }, []);

  /* ---------------- SIMULATION CALL ---------------- */
  const simulate = async () => {
    if (!applicantId) {
      alert("No credit application found. Please submit one first.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/repayment-simulation",
        {
          amount,
          tenure,
          interestRate,
          scenario,
          applicantId,
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Simulation failed");
    }

    setLoading(false);
  };

  return (
    <>
      <h3 className="title">Repayment Simulation</h3>

      {/* ================= INPUT CARD ================= */}
      <div className="order-table" style={{ maxWidth: "720px" }}>
        <div style={{ padding: "20px" }}>
          <h4>Loan & Stress Scenario</h4>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            <div>
              <label>Loan Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
              />
            </div>

            <div>
              <label>Tenure (months)</label>
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(+e.target.value)}
              />
            </div>

            <div>
              <label>Interest Rate (%)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(+e.target.value)}
              />
            </div>

            <div>
              <label>Scenario</label>
              <select
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
              >
                <option value="normal">Normal Income</option>
                <option value="income_drop">Income Drop</option>
                <option value="job_loss">Job Loss</option>
              </select>
            </div>
          </div>

          <br />
          <button onClick={simulate} disabled={loading}>
            {loading ? "Simulating..." : "Simulate Repayment"}
          </button>
        </div>
      </div>

      {/* ================= RESULT CARD ================= */}
      {result && (
        <div
          className="order-table"
          style={{
            marginTop: "25px",
            maxWidth: "720px",
            borderLeft:
              result.strategy === "EMI Moratorium"
                ? "6px solid #ff4d4f"
                : result.strategy === "Reduced EMI"
                ? "6px solid #faad14"
                : "6px solid #52c41a",
          }}
        >
          <div style={{ padding: "20px" }}>
            <h4>Simulation Result</h4>

            <p>
              <b>Strategy Applied:</b> {result.strategy}
            </p>

            <p>
              <b>Base EMI:</b> ₹{result.baseEmi}
            </p>

            {result.revisedEmi && (
              <p>
                <b>Revised EMI:</b> ₹{result.revisedEmi}
              </p>
            )}

            {result.monthsPaused && (
              <p>
                <b>Moratorium Period:</b> {result.monthsPaused} months
              </p>
            )}

            <hr />

            <p>
              <b>AI Reasoning</b>
            </p>

            <ul style={{ color: "#555" }}>
              <li>
                Monthly cashflow surplus: ₹{result.surplus}
              </li>
              <li>
                EMI affordability ratio: {result.affordabilityRatio}
              </li>
              <li>{result.reason}</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default RepaymentSimulation;
