// src/components/InfoContainer.tsx
import React from "react";
import styled from "styled-components";

const StyledInfoContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  white-space: pre-wrap;
`;

interface InfoContainerProps {
  componentName: string;
  description?: string;
}

const InfoContainer: React.FC<InfoContainerProps> = ({
  componentName,
  description,
}) => {
  return (
    <StyledInfoContainer>
      <h4>{componentName}</h4>
      <p>{description}</p>
    </StyledInfoContainer>
  );
};

export default InfoContainer;
