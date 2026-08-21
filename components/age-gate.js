"use client";

import { useEffect, useState } from "react";
import { Crown, DcbdButton, InfinityMark } from "./dcbd-ui";

export function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem("dcbd-age-confirmed") !== "yes");
  }, []);

  function enterEstate() {
    window.localStorage.setItem("dcbd-age-confirmed", "yes");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
      <div className="age-gate__noise" />
      <div className="age-gate__card">
        <Crown className="age-gate__crown" />
        <p className="kicker kicker--gold">DCBD Estate Access</p>
        <h1 id="age-gate-title">Enter the<br /><span>world</span></h1>
        <p>This website contains age-restricted brand and product content. Confirm you are 18 or over to enter.</p>
        <div className="age-gate__actions">
          <DcbdButton onClick={enterEstate}>I am 18+ • Enter</DcbdButton>
          <a href="https://www.google.com" className="text-link">Under 18 • Leave</a>
        </div>
        <div className="age-gate__seal"><InfinityMark /> EST. 2020</div>
      </div>
    </div>
  );
}
