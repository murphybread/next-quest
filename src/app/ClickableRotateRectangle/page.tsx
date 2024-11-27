"use client";

import React, { useState } from "react";
import ClickableRotateRectangle from "@components/ClickableRotateRectangle";
import "@styles/global.css";

const HomePage: React.FC = () => {
  return (
    <div className="main-board">
      <h1>ClickableRotateRectangle</h1>
      <ClickableRotateRectangle />
    </div>
  );
};

export default HomePage;
