import styled from 'styled-components';

export const GridContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap:20px 50px;
justify-content: center;
align-items: center;
padding-left: 3%;
padding-right: 3%;
margin-top:50px;




@media (max-width: 1120px){
  grid-template-columns: 1fr;
  gap:0;
}
`

export const GridSection = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 0px 50px;

@media (max-width: 1120px){
  grid-template-columns: 1fr;
  
}
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
 
  

  .footer{
    bottom:0;
    position: absolute;
    width: 100%;
    height: 100px;
  } 

  .logo-container{
    margin-top:10px;
    display:flex;
    justify-content: center;
    width: 100%;
    align-items: center;
  }
  `;

export const Logo = styled.img`
  width: 688px;
  height: 427px;

  @media (max-width: 1120px) {
    width: 100%; 
    height: auto; 
    max-width: 688px; 
    max-height: 427px; 
  }
`;



















