import React, { useEffect, useState } from "react";
import axios from "axios";

const Holdings = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/credit-applications")
      .then((res) => setApplications(res.data))
      .catch((err) => console.error(err));
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
              <th>Risk</th>
              <th>Decision</th>
              <th>Confidence</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app._id}</td>
                <td>{app.risk}</td>
                <td>{app.decision}</td>
                <td>{app.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Holdings;
