"use client";

import React, { useState } from "react";
import RotatingScaleComponent from "@components/RotatingScaleComponent";
import "@styles/global.css";

const HomePage: React.FC = () => {
  return (
    <div className="main-board">
      <h1>RotatingScaleComponent</h1>
      <RotatingScaleComponent />
    </div>
  );
};

export default HomePage;
