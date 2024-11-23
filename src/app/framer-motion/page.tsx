"use client";

import React, { useState } from "react";
import ClickableRotateRectangle from "@components/ClickableRotateRectangle";
import DynamicButton from "@components/DynamicButton";
import RotatingScaleComponent from "../../components/RotatingScaleComponent";

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
    </div>
  );
};

export default Page;
