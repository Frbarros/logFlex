import styled from "styled-components";

export const Container = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
  }

  input {
    height: 45px;
    border-radius: 6px;
    width: 45%;
    padding-left: 5%;
  }

  .search-icon {
    position: relative;
    left: 30px;
  }

  .close-icon {
    // position: relative;
    // right: 30px;
  }

  button {
    background-color: transparent;
    border-style: none;
    position: relative;
    right: 40px;
  }

  @media (max-width: 768px) {
    input {
      font-size: 0.7rem; 
      padding-left: 9%; 
    }
  }
`;
