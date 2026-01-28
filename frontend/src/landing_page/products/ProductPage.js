import React from "react";

import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

import Navbar from "../Navbar";
import Footer from "../Footer";

function PricingPage() {
  return (
    <>
      <Hero />
      <LeftSection
        imageURL="media/images/kite.png"
        productName="New Credit Application"
        productDesription="Users input financial behavior data like income stability, expenses, and payment history through simple sliders. Generates instant AI credit decisions without traditional CIBIL scores. Demo mode offers pre-filled consumer profiles for quick testing."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <RightSection
        imageURL="media/images/console.png"
        productName="Credit Applications"
        productDesription="Dashboard shows all submitted applications with status (Approved/Review/Not Approved), credit scores, and timestamps. Filterable by date or risk level for tracking funding requests. Exportable data for presentations."
        learnMore=""
      />
      <LeftSection
        imageURL="media/images/coin.png"
        productName="Risk Breakdown"
        productDesription="Visual bars show what drives decisions—positive factors like consistent savings vs risk factors like expense volatility. Plain-English paragraph explains AI logic clearly. Builds trust through full transparency."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <RightSection
        imageURL="media/images/kiteconnect.png"
        productName="Repayment Simulation"
        productDesription="Interactive scenarios test EMI stress under income drops (-30%) or expense shocks (+25%). Highlights warning months and default risk curves. Helps consumers plan confidently before accepting loans."
        learnMore=""
      />
      <LeftSection
        imageURL="media/images/varsity.png"
        productName="Explainability / Ethics"
        productDesription="Uses only financial behavior data—no personal details like gender/caste. Shows bias safeguards and RBI compliance. Proves fairness focus for trustworthy lending decisions."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <p className="text-center mt-5 mb-5">
        Want to know more about our technology stack?
      </p>
      <Universe />
    </>
  );
}

export default PricingPage;