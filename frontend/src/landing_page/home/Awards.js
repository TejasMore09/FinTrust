import React from 'react';

function Awards() {
    return ( 
         <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5 mt-5">
          <img style={{ width: "100%" }} src="media/images/explainableAI.jpeg" />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>Unloack your financial potential</h1>
          <p className="mb-5">
            Our explainable AI evaluates behavioural data, not your  real financialbehaviour.
          </p>
          <div className="row">
            <div className="col-6">
              <ul>
                <li>
                  <p>Age range</p>
                </li>
                <li>
                  <p>Months employed</p>
                </li>
                <li>
                  <p>Monthly income</p>
                </li>
                <li>
                  <p>Savings rate (%)</p>
                </li>
                <li>
                  <p>Digital transaction frequency</p>
                </li>
                <li>
                  <p>Past EMI delays</p>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>
                  <p>Loan amount</p>
                </li>
                <li>
                  <p>Loan purpose</p>
                </li>
                <li>
                  <p>Income-to-EMI (months)</p>
                </li>
                <li>
                  <p>Cashflow surplus</p>
                </li>
                <li>
                  <p>Repayment reliability</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
     );
}

export default Awards;