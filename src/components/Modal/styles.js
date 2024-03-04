import styled from 'styled-components';

export const Container = styled.div`
display: flex;
background: white;
height: 300px;
width: 500px;
border-radius: 10px;
padding: 50px;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: -100px;
color: #100C05;

.image{
width: 100px;
height: 100px;
}

.title{
font-size: 1.6rem;
text-align: center;

}

.description{
font-size: 1.2rem;
}





`

export const Overlay = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
background: rgba(0,0,0,0.5);
position: fixed;
left:0;
top: 0;
z-index: 999;
`
