import React, { useContext, useEffect, useState } from 'react';
import logoImage from '../../img/LogFlex.png';
import { Container, Logo, FormGroup, ForgotPasswordText, SubmitButtonContainer, SubmitButton } from './styles';
import 'typeface-inter';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import TextField from '../../components/TextField';
import { userAuthContext } from '../../contexts/UserAuthContext';
import Modal from '../../components/Modal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {Login} = useContext(userAuthContext)
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    isOpen:false, 
    isSuccess:false,
    modalTitle:null
  })


  const handleLogin = (event) => {
    event.preventDefault()

    Login(email, password)
      .then (() => {
        setModal({
          isOpen:true, 
          isSuccess:true,
          modalTitle:"Login efetuado com sucesso!"

        })
        
        handleReset();
        
    })
      .catch(() => {
        setModal({
          isOpen:true, 
          isSuccess:false,
          modalTitle:"Usuário ou senha inválido."

        })
        
    })
    

  };


  const handleReset = () => {

    setEmail('')
    setPassword('')
  }

  const closeModal = () => {
    if(modal.isSuccess){
      navigate('/dashboard');
    }

    setModal({
      ...modal,
      isOpen:false
    })
    
  }

  

  return (
    <div>
      <Header title="" hasLogo={false}/>
      <Container>
        <Modal isOpen={modal.isOpen}  isSuccess={modal.isSuccess} customTitle={modal.modalTitle} onClose={closeModal}/>

        <Logo src={logoImage} alt="Logomarca" tabIndex="20" aria-label="Logo da Empresa Log Flex" />
        <form onSubmit={handleLogin} style={{ width: '324px' }} className="loginForm">
          <FormGroup>
            <TextField
              title="Usuário:"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              tabIndex="21"
              aria-label="Entre com seu usuário"
              maxLength={50}
            />
          </FormGroup>
          <FormGroup>
            <TextField
              title="Senha:"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              tabIndex="22"
              aria-label="Entre com sua senha que deve conter 8 digitos entre números e letras"
              maxLength={15}
            />
          </FormGroup>
          <div style={{ textAlign: 'center', color: '#100C05', marginBottom: '10px', cursor: 'pointer' }}>
            {/* <ForgotPasswordText id="forgotPassword" tabIndex="23" aria-label="Esqueci minha senha">
              Esqueci minha senha
            </ForgotPasswordText> */}
          </div>
          <SubmitButtonContainer>
            <SubmitButton type="submit" tabIndex="24" aria-label="Entrar no sistema">
              Entrar
            </SubmitButton>
          </SubmitButtonContainer>
        </form>
        <div className="footer">
          <Footer />
        </div>
      </Container>
    </div>
  );
};

export default Login;
