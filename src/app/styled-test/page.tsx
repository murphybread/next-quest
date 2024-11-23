"use client";

import React from "react";
import styled from "styled-components";

// Styled-components 정의
const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const TestBox = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px;
  background-color: ${(props) => (props.color ? props.color : "lightblue")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #fff;
`;

const StyledTestPage: React.FC = () => {
  return (
    <TestContainer>
      <TestBox color="lightblue">Box 1</TestBox>
      <TestBox color="coral">Box 2</TestBox>
      <TestBox color="teal">Box 3</TestBox>
    </TestContainer>
  );
};

export default StyledTestPage;
