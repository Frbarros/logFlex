import { GridContainer, GridSection } from "./styles";
import Button from '../Button';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAuthContext } from "../../contexts/UserAuthContext";
import Modal from "../Modal";


export default function Menu() {
    const navigate = useNavigate();
    const {Module, hasPermission} = useContext(userAuthContext)
    const [isOpenModal, setIsOpenModal] = useState(false)


    const handleSubmitSender = (event) => {
        event.preventDefault();
        if (hasPermission(Module.SENDER)) {
            navigate("/listar-remetentes")
        } else {
            setIsOpenModal(true)
        }
        
    };

    const handleSubmitRecipient = (event) => {
        event.preventDefault();
        if (hasPermission(Module.RECIPIENT)) {
            navigate("/listar-destinatarios")
        } else {
            setIsOpenModal(true)
        }
       
    };

    const handleSubmitTransporter = (event) => {
        event.preventDefault();
        if (hasPermission(Module.TRANSPORTER)) {
            navigate("/listar-transportadores")
        } else {
            setIsOpenModal(true)
        }
       
    };

    const handleSubmitChecker = (event) => {
        event.preventDefault();
        if (hasPermission(Module.CHECKER)) {
            navigate("/listar-conferentes")
        } else {
            setIsOpenModal(true)
        }
        
    };

    const handleSubmitPackage = (event) => {
        event.preventDefault();
        if (hasPermission(Module.PACKAGE)) {
            navigate("/listar-pacotes")
        } else {
            setIsOpenModal(true)
        }
       
    };

    const handleSubmitCenterDistribution = (event) => {
        event.preventDefault();
        if (hasPermission(Module.DISTRIBUTION_CENTER)) {
            navigate("/listar-centro-distribuicao")
        } else {
            setIsOpenModal(true)
        }
        
    };

    const closeModal = () => {
        setIsOpenModal(false)
      }

    return(
        
        <GridContainer>
            <Modal isOpen={isOpenModal} onClose={closeModal} customTitle="Seu usuário não tem permissão para acessar essa pagina" isSuccess={false}/>
                <GridSection>
                    <Button
                        title="Remetente"
                        onClick={handleSubmitSender}
                        tabIndex={9}
                        disabled={!hasPermission(Module.SENDER)}
                        aria-label="Acessar tela de lista de Rementente" />

                    <Button
                        title="Destinatário"
                        onClick={handleSubmitRecipient}
                        tabIndex={10}
                        disabled={!hasPermission(Module.RECIPIENT)}
                        aria-label="Acessar tela de lista de Destinatário" />
                </GridSection>
                <GridSection>
                <Button
                        title="Transportador"
                        onClick={handleSubmitTransporter}
                        tabIndex={11}
                        disabled={!hasPermission(Module.TRANSPORTER)}
                        aria-label="Acessar tela de lista de transportador" />

                    <Button
                        title="Conferente"
                        onClick={handleSubmitChecker}
                        tabIndex={12}
                        disabled={!hasPermission(Module.CHECKER)}
                        aria-label="Acessar tela de lista de conferente" />
                </GridSection>
                <Button
                        title="Pacote"
                        onClick={handleSubmitPackage}
                        tabIndex={13}
                        disabled={!hasPermission(Module.PACKAGE)}
                        aria-label="Acessar tela de lista de pacote" />

                    <Button
                        title="Centro de distribuição"
                        onClick={handleSubmitCenterDistribution}
                        tabIndex={14}
                        disabled={!hasPermission(Module.DISTRIBUTION_CENTER)}
                        aria-label="Acessar tela de lista de centro de distribuição" />

                       
            </GridContainer>

        
    )
}