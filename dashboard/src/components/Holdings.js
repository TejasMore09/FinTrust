import React, { useEffect, useState } from "react";
import axios from "axios";

const Holdings = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/credit-applications")
      .then(res => setApplications(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h3 className="title">
        Credit Applications ({applications.length})
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Applicant ID</th>
              <th>Income</th>
              <th>Expenses</th>
              <th>Savings Rate</th>
              <th>EMI Delays</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.applicantId || app._id.slice(-6)}</td>
                <td>₹{app.behavior?.monthlyIncome}</td>
                <td>₹{app.behavior?.monthlyExpenses}</td>
                <td>{(app.behavior?.savingsRate * 100).toFixed(1)}%</td>
                <td>{app.behavior?.pastEmiDelays}</td>
                <td className="neutral">SUBMITTED</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Holdings;
