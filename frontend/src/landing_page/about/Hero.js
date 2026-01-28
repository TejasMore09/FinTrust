import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2 text-center">
          “We are building transparent, explainable AI systems for responsible credit decisioning.”
        </h1>
      </div>

      <div
        className="row p-5 mt-5 border-top text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-5">
          <p>
            FinTrust was developed during the IEEE HackDeck 2.0 hackathon to specifically address the systemic exclusion of underbanked populations. For millions of individuals without a traditional credit history, the current financial landscape offers limited options because legacy scoring models are often opaque, rigid, and heavily reliant on past debt. 
          </p>
          <p>
            We built this platform to challenge the existing status quo by creating a transparent, explainable framework where creditworthiness is evaluated through real-time financial behavior.
          </p>
          <p>
            The name reflects our primary mission: developing a financial tool built on a foundation of radical trust and data-driven accountability. By shifting the focus away from historical debt and toward behavioral patterns, we aim to provide a more accurate representation of an individual's financial character. Our goal is to ensure that a lack of formal credit history no longer serves as an automatic barrier to entry for those seeking financial opportunity.
          </p>
        </div>
        <div className="col-6 p-5">
          <p>
            Our team—
            <a href="" style={{ textDecoration: "none" }}>
              Tejas More, Ayush Ahirwar, Aditya Gaud, and Miheer Bagal
            </a>—collaborated during this sprint to engineer a system that prioritizes behavioral data over outdated debt records. By evaluating alternative metrics such as savings consistency, expense volatility, and cashflow stability, we provide a more inclusive risk assessment for those just starting their financial journey. This approach allows us to identify responsible borrowers who are typically overlooked by the traditional banking ecosystem.
          </p>
          <p>
            Our approach centers on the core principle of explainable AI, ensuring that every credit decision is backed by a clear, logical reason rather than a "black-box" algorithm. FinTrust serves as a master blueprint to prove that financial technology can be automated, ethical, and accessible all at once. We are dedicated to building systems where technology acts as an enabler for financial inclusion, ensuring that every user understands the factors that shape their financial future.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;