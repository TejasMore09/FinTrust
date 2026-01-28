import React from 'react';

function Pricing() {
    return ( 
         <div className="container">
      <div className="row">
        <div className="col-4">
          <h1 className="mb-3 fs-2">Unbeatable Assesment</h1>
          <p>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            See Pricing{" "}
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
        <div className="col-2"></div>
        <div className="col-6  mb-5">
          <div className="row text-center">
            <div className="col p-3 ">
                <img src='media/images/pricing-eq 0.svg' style={{width:"60%"}}/>
              <p>
                Free equity delivery and
                <br />
                direct mutual funds
              </p>
            </div>
            <div className="col p-3 ">
              <img src='media/images/pricing-eq 0.svg' style={{width:"60%"}}/>
              <p>
                Free equity delivery and
                <br />
                direct mutual funds
              </p>
            </div>
            <div className="col p-3 ">
              <img src='media/images/pricing-eq 20.svg' style={{width:"60%"}}/>
              <p>Intraday and F&O</p>
            </div>
          </div>
        </div>
      </div>
    </div>
     );
}

export default Pricing;