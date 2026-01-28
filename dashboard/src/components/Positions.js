import React, { useEffect, useState } from "react";
import axios from "axios";

const Positions = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/risk-breakdown")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <p>Loading risk breakdown...</p>;

  return (
    <>
      <h3 className="title">
        Risk Breakdown (Total Applications: {data.total})
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Risk Category</th>
              <th>Count</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="profit">Low Risk</td>
              <td>{data.breakdown.Low}</td>
            </tr>
            <tr>
              <td className="neutral">Medium Risk</td>
              <td>{data.breakdown.Medium}</td>
            </tr>
            <tr>
              <td className="loss">High Risk</td>
              <td>{data.breakdown.High}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
