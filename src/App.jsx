import React, { useRef, useState } from "react";
import styled from "styled-components";

import "./App.css";
import Loader from "./components/animations/Loader";

import ResultSection from "./components/elements/ResultSection";
import Footer from "./components/elements/Footer";
import Header from "./components/elements/Header";
import Title from "./components/elements/Title";

const App = () => {
  const [probability, setProbability] = useState(50);
  const inputRef = useRef(null);
  const imgRef = useRef(null);
  const formRef = useRef(null);
  const [isValidImageSelected, setIsValidImageSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingResult, setIsShowingResult] = useState(false);
  const resultContainerRef = useRef(null);
  const [backendErrorOccurred, setBackendErrorOccurred] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsValidImageSelected(true);
      const reader = new FileReader();

      reader.onload = function (e) {
        imgRef.current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidImageSelected) {
      setIsLoading(true);

      try {
        const response = await fetch("/classify", {
          method: "POST",
          body: new FormData(formRef.current),
        });

        if (response.ok) {
          const response_json = await response.json();

          if (response_json["result_found"] === "true") {
            setIsLoading(false);
            setIsShowingResult(true);
            setProbability(
              Number.parseFloat(response_json["pneumonia_percentage"])
            );
            resultContainerRef.current.scrollIntoView();
            setBackendErrorOccurred(false);
          } else if (response_json["result_found"] === "false") {
            setIsLoading(false);
            setIsShowingResult(true);
            setBackendErrorOccurred(true);
            setProbability(50);
          }
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    imgRef.current.src = "";
    setIsValidImageSelected(false);
    setIsShowingResult(false);
  };

  return (
    <>
      <MainContainer>
        <Header>Chest X-Ray Classification</Header>

        <Title>
          <span>Classify normal and pneumonia-affected chest x-rays</span>
        </Title>

        <FormContainer ref={formRef}>
          <ImageInputContainer onClick={() => inputRef.current.click()}>
            <ImageInput
              ref={inputRef}
              type="file"
              name="input-image-file"
              accept="image/*"
              required
              hidden
              onChange={handleFileChange}
            />
            {(!isValidImageSelected || backendErrorOccurred) && (
              <PlaceholderText>Click here to select image</PlaceholderText>
            )}
            <PreviewImage
              hidden={!isValidImageSelected}
              ref={imgRef}
              src=""
              alt=""
            />
          </ImageInputContainer>

          {isLoading && (
            <LoadingContainer>
              <Loader />
            </LoadingContainer>
          )}

          <ButtonContainer>
            <SubmitButton type="submit" onClick={handleSubmit}>
              SUBMIT IMAGE
            </SubmitButton>
            <ResetButton type="reset" onClick={handleReset}>
              RESET
            </ResetButton>
          </ButtonContainer>
        </FormContainer>

        <ResultContainer ref={resultContainerRef}>
          {isShowingResult && (
            <ResultSection
              probability={probability}
              backendErrorOccurred={backendErrorOccurred}
            />
          )}
        </ResultContainer>
      </MainContainer>
      <Footer />
    </>
  );
};

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 110px;
`;

const FormContainer = styled.form`
  width: 96%;
  max-width: 650px;
  border-radius: 10px;
  box-shadow: 3px 2px 5px rgba(0, 0, 0, 0.2),
    -3px -2px 3px rgba(156, 156, 156, 0.2);
  padding: 35px 20px;
  padding-bottom: 15px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-top: 20px;
  padding-bottom: 12px;
`;

const ImageInput = styled.input`
  display: none;
`;

const PlaceholderText = styled.span`
  border: 2px dashed #222;
  border-radius: 9px;
  padding: 3em 5em;
  color: #444;
`;

const PreviewImage = styled.img`
  width: 100%;
  margin: 20px 10px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px;
`;

const ButtonContainer = styled.div`
  margin: 2em auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

const SubmitButton = styled.button`
  padding: 1em 2em;
  font-size: 1em;
  font-weight: bold;
  color: white;
  background-color: rgb(61, 74, 255);
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ResetButton = styled.button`
  padding: 1em 2em;
  font-size: 1em;
  font-weight: bold;
  color: white;
  background-color: rgb(255, 60, 60);
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ResultContainer = styled.div`
  width: 100%;
`;

export default App;
