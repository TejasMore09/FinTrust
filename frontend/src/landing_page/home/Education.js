import React from 'react';

function Education() {
    return ( 
        <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <img src="media/images/education.jpeg" style={{ width: "70%" }} />
        </div>
        <div className="col-6">
          <h1 className="mb-3 fs-2">Explainable, Fair, Trustworthy Credit Scores</h1>
          <p>
            Get clear, AI-powered credit decisions with full transparency.
            See who, why, understand how, and see what could improve your creditworthiness.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            Creditworthiness <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
          <p className="mt-5">
            Transparent Decisions
            Every approval or rejection is explained in simple language, no jargon.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            LoanQ&A <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
     );
}

export default Education;