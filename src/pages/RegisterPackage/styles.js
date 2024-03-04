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
    width: 300px;
    justify-content: center;
    
    
    
  }.button-register {
  display: flex;
  flex-direction: column;
  height: 50px;
  width: 300px;
  justify-content: center;
  margin: 70px auto; 
  text-align: center;
}

.button-register > button {
  width: 100%;
  height: 100%;
}

@media (max-width: 1120px) {
  .button-register {
    width: 100%; 
  }

  .button-register > button {
    width: 100%; 
  }
}
  .button-padding {
  display: flex;
  justify-content: center;
}

  .main {
    padding: 30px;
    margin-top:50px;
    
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

  @media (max-width: 768px) {
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

.error{
    color: red;
    font-size: 0.8rem;
}
@media (max-width: 768px) {
    .container {
      flex-direction: column;
      gap: 20px; 
    }

    .button-padding {
    display: flex;
    justify-content: center;


}

}
  }
`