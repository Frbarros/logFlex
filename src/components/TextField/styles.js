import styled from "styled-components";

export const ContainerTextField = styled.div`

display: flex;
flex-direction: column;
padding: 10px;
font-family: 'Roboto', sans-serif;

p{
    font-size: 1.5rem;
    margin-bottom: 5px;
}

input{
    border-radius: 20px;
    background-color: var(--text-field-background);
    height:48px ;
    margin-top: 3px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    padding-left: 10px;
    font-size: 1.2rem;

}

.error{
    color:red;
    font-size:0.9rem;
}

.erro-container{
    height:0%.9rem;
}
`




