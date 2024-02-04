import React from "react";
import styled from "styled-components";
import ProgressBar from "./../animations/ProgressBar";

const StyledResultSection = styled.section`
  width: 96%;
  max-width: 700px;
  border-radius: 10px;
  box-shadow: 3px 2px 5px rgba(0, 0, 0, 0.2),
    -3px -2px 3px rgba(156, 156, 156, 0.2);
  padding: 35px 20px 20px;

  margin: auto;
  margin-top: 35px;
  margin-bottom: 20px;

  text-align: center;
`;

const ResultHeading = styled.span`
  display: block;
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 15px;
`;

const ResultContainer = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResultSection = ({ probability, backendErrorOccurred }) => {
  return (
    <StyledResultSection>
      <ResultContainer>
        <ResultHeading>Result of scanning</ResultHeading>
        <ProgressBar
          probability={probability}
          backendErrorOccurred={backendErrorOccurred}
        />
      </ResultContainer>
    </StyledResultSection>
  );
};

export default ResultSection;
