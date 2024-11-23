"use client";

import React, { useState } from "react";
import Card from "@components/Card";
import "@styles/global.css";

const HomePage: React.FC = () => {
  return (
    <div className="main-board">
      <h1>Card Flip Animation ( Click 4 times animations)</h1>
      <Card />
    </div>
  );
};

export default HomePage;
