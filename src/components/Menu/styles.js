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

@media (max-width: 768px){
  grid-template-columns: 1fr;
  
}
`