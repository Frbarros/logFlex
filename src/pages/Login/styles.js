import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  font-family: 'Roboto', sans-serif;
  

  .footer{
    position:absolute;
    bottom:0;
    width: 100%;
    @media (max-width: 1120px) {
      .footer{
        position: flex;
      }
      
    }
  }
`;

export const Logo = styled.img`
  width: 324px;
  height: 225px;
  margin-bottom: 20px;
  
`;

export const FormGroup = styled.div`
  margin-bottom: 5px;
`;

export const LabelText = styled.label`
  display: block;
  margin-bottom: none;
  color: var(--font-color);
  font-size: 25px;
  padding:3px;
`;

export const InputField = styled.input`
  width: 324px;
  height: 48px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #D9D9D9;
  border-radius: 20px;
  border: 1px solid #ccc;
  margin-top: px;
`;

export const ForgotPasswordText = styled.p`
  text-align: center;
  color: var( --font-color);
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 10px;
`;

export const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;
  

`;

export const SubmitButton = styled.button`
  width: 254px;
  height: 48px;
  background-color: var(--background-button);
  color: var(--font-button);
  border-radius: 20px;
  cursor: pointer;
  font-size: 25px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;

`;
