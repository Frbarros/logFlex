import Button from "../Button";
import { Container, Overlay } from "./styles";
import SuccessIco from '../../img/ic-success.png';
import FailIco from '../../img/ic-fail.png';

export default function Modal({isOpen,customTitle, description,isSuccess,onClose}){
    
    const titleSuccess= "Cadastro efetuado com sucesso!"
    const titleFail= "Erro ao efetuar cadastro."
    const title=  isSuccess ? titleSuccess : titleFail

    if(! isOpen) return null 

    return(
        <Overlay>
            <Container>
                <img className="image" src={isSuccess ? SuccessIco : FailIco}/>
                <h2 className="title">{customTitle ?? title } </h2>

                <p className="description">{description}</p>

                <Button title ="Fechar" onClick= {onClose}/>
               
            </Container>

        </Overlay>
    )
}