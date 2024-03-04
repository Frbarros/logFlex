import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex: 1; 
  overflow-y: auto; 
  
  
`;

export const FooterContainer = styled.footer`
  background-color: var(--background-footer);
  height: 100px;
  width: 100%;
  padding-top:0.10px;
  
  
  p{
    font-size:0.90rem;
    margin-left:20px;
    color: var (--footer-title);    
    text-align: center;
    margin-top: 15px;
    
    
  }
`;
