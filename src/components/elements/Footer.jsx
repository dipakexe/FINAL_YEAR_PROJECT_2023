import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #f8f8f8;
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const CopyrightText = styled.p`
  font-size: 14px;
  margin: 0;
  color: #555;
`;

const SourceCodeLink = styled.p`
  font-size: 14px;
  margin: 0;
  color: #555;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ContentContainer>
        <CopyrightText>
          &copy; 2023 Chest X-Ray Classification. rights reserved.
        </CopyrightText>
        <SourceCodeLink>
          Find the{" "}
          <a
            href="https://github.com/dipakexe/FINAL_YEAR_PROJECT_2023"
            target="_blank"
          >
            source code
          </a>{" "}
          on GitHub.
        </SourceCodeLink>
      </ContentContainer>
    </FooterContainer>
  );
};

export default Footer;
