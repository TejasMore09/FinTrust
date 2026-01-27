import React, { useEffect, useState } from "react";
import axios from "axios";

const Positions = () => {
  const [decisions, setDecisions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/credit-decisions")
      .then(res => setDecisions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h3 className="title">
        Credit Decisions ({decisions.length})
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Applicant ID</th>
              <th>Risk</th>
              <th>Decision</th>
              <th>Confidence</th>
              <th>Reason</th>
            </tr>
          </thead>

          <tbody>
            {decisions.map(decision => (
              <tr key={decision._id}>
                <td>{decision.applicantId || "—"}</td>
                <td className={
                  decision.risk === "High" ? "loss" :
                  decision.risk === "Low" ? "profit" : "neutral"
                }>
                  {decision.risk}
                </td>
                <td>{decision.decision}</td>
                <td>{(decision.confidence * 100).toFixed(0)}%</td>
                <td>{decision.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
