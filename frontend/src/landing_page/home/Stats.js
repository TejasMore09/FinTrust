import React from 'react';

function Stats() {
    return ( 
         <div className="container p-3">
      <div className="row p-5">
        <div className="col-6 p-5">
          <h1 className="fs-2 mb-5">Trust with confidence</h1>
          <h2 className="fs-4">New Credit Application</h2>
          <p className="text-muted">
            Users input financial behavior data like income stability, expenses, and payment history through simple sliders. Generates instant AI credit decisions without traditional CIBIL scores. Demo mode offers pre-filled consumer profiles for quick testing.
          </p>
          <h2 className="fs-4">Credit Applications</h2>
          <p className="text-muted">
            Dashboard shows all submitted applications with status (Approved/Review/Not Approved), credit scores, and timestamps. Filterable by date or risk level for tracking funding requests. Exportable data for presentations.
          </p>
          <h2 className="fs-4">Risk Breakdown</h2>
          <p className="text-muted">
            Visual bars show what drives decisions—positive factors like consistent savings vs risk factors like expense volatility. Plain-English paragraph explains AI logic clearly. Builds trust through full transparency.
          </p>
          <h2 className="fs-4">Explainability / Ethics</h2>
          <p className="text-muted">
            Uses only financial behavior data—no personal details like gender/caste. Shows bias safeguards and RBI compliance. Proves fairness focus for trustworthy lending decisions.
          </p>
        </div>
        <div className="col-6 p-5">
          <img src="media/images/ecosystem.jpeg" style={{ width: "140%" }} />
          <div className="text-center">
            <a href="" className="mx-5" style={{ textDecoration: "none" }}>
              Explore our products{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
            <a href="" style={{ textDecoration: "none" }}>
              Try demo{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
     );
}

export default Stats;