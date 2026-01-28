import React from "react";
import { Route, Routes } from "react-router-dom";

import Explainability from "./Explainability";
import RepaymentSimulation from "./RepaymentSimulation";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/loanrequest" element={<Orders />} />
          <Route path="/creditapplication" element={<Holdings />} />
          <Route path="/riskassessment" element={<Positions />} />
          <Route path="/repayment" element={<RepaymentSimulation />} />
          <Route path="/explainability" element={<Explainability />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
