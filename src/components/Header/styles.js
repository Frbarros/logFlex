import styled from "styled-components";

export const ContainerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-header);
  font-family: 'Roboto', sans-serif;
  padding: 10px;
  box-sizing: border-box;

  h1 {
    font-size: 1%.5;
    color: var(--font-title-color);
    margin-left: 10px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    h1 {
      font-size: 0.9rem;
    }

    .upper-buttons-container {
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
    }
  }

  @media (min-width: 32in) {
    h1 {
      font-size: 3rem;
    }
  }
`;

export const GroupButtonContainer = styled.div`
  display: flex;
  font-size: 16px;
  gap: 5px;

  button {
    width: 46px;
    height: 46px;
    border-style: none;
  }
`;

export const UpperButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }
`;

export const ButtonCircleGray = styled.button`
  background-color: #D9D9D9;
  border-radius: 50%;
  color: #000;
  height: 46px;
  width: 46px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const LogoImage = styled.img`
  width: 140px;
  height: 100px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 80px;
    height: 60px;
  }
`;

export const ButtonTransparent = styled.button`
  background-color: transparent;
  width: 46px;
  height: 46px;
  border-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
