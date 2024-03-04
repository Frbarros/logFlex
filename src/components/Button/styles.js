import styled from "styled-components";

export const Container = styled.div`
display: flex;

  button{ 
    flex-grow: 1;
    background-color:var(--background-button);
    color:  var(--font-button); 
    border-radius: 20px;
    cursor: pointer;
    font-size: 1.5rem;
    margin-top: 5px;
    //display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 8px;
    padding-top: 8px;
    padding-left: 20px;
    padding-right: 20px;
  }

  button:enabled:hover {
    //background-color: #e0a500;
    background-color: var(--background-button-hover);
  }

  button:disabled{
    cursor: not-allowed;
    /* border-color: var(--background-button); */
    border-color:#F7B533;
    border-width: 3px;
    background-color: var(--background);
    border-style: dashed;
    color: var(--font-color);
    


  }
`

