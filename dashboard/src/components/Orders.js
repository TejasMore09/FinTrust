import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/loan-requests")
      .then(res => setLoans(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="orders">
      <h3 className="title">
        Loan Requests ({loans.length})
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Applicant ID</th>
              <th>Amount</th>
              <th>Tenure</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {loans.map(l => (
              <tr key={l._id}>
                <td>{l.applicantId || "—"}</td>
                <td>₹{l.amount}</td>
                <td>{l.tenure} months</td>
                <td className="neutral">{l.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
