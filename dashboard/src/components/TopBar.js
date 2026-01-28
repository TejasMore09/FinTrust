import React from "react";

import Menu from "./Menu";

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">AVG Score</p>
          <p className="index-points">{89.7} </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">Approval Rate</p>
          <p className="index-points">{90.2}</p>
          <p className="percent"></p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
