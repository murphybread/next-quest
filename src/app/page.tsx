"use client";

import React, { useState } from "react";
import ClickableRotateRectangle from "@components/ClickableRotateRectangle";
import DynamicButton from "@components/DynamicButton";
import RotatingScaleComponent from "@components/RotatingScaleComponent";
import Card from "@components/Card";

const Page: React.FC = () => {
  return (
    <div>
      <DynamicButton
        component={ClickableRotateRectangle}
        componentName="Clickable Rotate Rectangle"
        index={0}
      ></DynamicButton>
      <DynamicButton
        component={RotatingScaleComponent}
        componentName="RotatingScaleComponent"
        index={1}
      ></DynamicButton>

      <DynamicButton
        component={Card}
        componentName="Card"
        index={2}
      ></DynamicButton>
    </div>
  );
};

export default Page;
