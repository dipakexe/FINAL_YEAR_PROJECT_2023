import React from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  width: 90%;
  border-radius: 24px;
  box-shadow: 1px 1px 7px rgba(122, 122, 122, 0.3),
    -1px -1px 7px rgba(218, 218, 218, 0.3);
  overflow: hidden;
  font-family: "Arial", sans-serif;
  margin-bottom: 20px;
  padding: 6px;
  transition: box-shadow 0.4s;

  &:hover {
    box-shadow: 2px 2px 10px rgba(122, 122, 122, 0.5),
      -2px -2px 10px rgba(218, 218, 218, 0.5);
    transition: box-shadow 0.3s;
  }
`;

const ProgressBarInner = styled.div`
  height: 30px;
  width: ${(props) =>
    props.probability > 20 ? props.probability : props.probability + 10}%;
  background-color: ${(props) => getBackgroundColor(props.probability)};
  transition: width 0.5s ease-in-out;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #fff;
  padding: 10px;
  border-radius: 24px;
`;

const ProgressLabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const ProgressLabel = styled.span`
  color: #000;
`;

const getBackgroundColor = (percentage) => {
  if (percentage < 30) {
    return "rgb(12, 244, 136)";
  } else if (percentage < 60) {
    return "rgb(206, 188, 32)";
  } else if (percentage < 80) {
    return "rgb(255, 164, 85)";
  } else {
    return "rgb(255, 87, 90)";
  }
};

const getLabel = (percentage) => {
  if (percentage < 30) {
    return "Low probability";
  } else if (percentage < 60) {
    return "Moderate probability";
  } else if (percentage < 80) {
    return "High probability";
  } else {
    return "Very high probability";
  }
};

const ProgressBar = ({ probability, backendErrorOccurred }) => (
  <>
    <ProgressBarContainer>
      <ProgressBarInner probability={probability}>
        {`${probability}%`}
      </ProgressBarInner>
    </ProgressBarContainer>
    <ProgressLabelContainer>
      {backendErrorOccurred && (
        <span style={{ color: "red" }}>
          Backend Error: Select a valid image format.
        </span>
      )}
      {!backendErrorOccurred && (
        <ProgressLabel>{getLabel(probability) + " of Pneumonia"}</ProgressLabel>
      )}
    </ProgressLabelContainer>
  </>
);

export default ProgressBar;
