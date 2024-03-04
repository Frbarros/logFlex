import styled from "styled-components";

export const Container = styled.div`
  .container {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 80px;
  }

  .button-register {
    display: flex;
    flex-direction: column;
    height: 118px;
    justify-content: flex-end;
  }

  .main {
    padding: 30px;
  }

  .flex-1 {
    flex-grow: 1;
  }

  .flex-col-2 {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .error {
    color: red;
    font-size: 0.8rem;
    margin-left: 15px;
  }

  @media (max-width: 1120px) {
    .container {
      flex-direction: column;
      gap: 20px; 
    }

    .flex-1 {
      width: 100%; 
    }

    .flex-col-2 {
      flex-direction: column; 
    }

    .button-register {
      height: auto; 
    }
  }
`;
