import React, { useContext, useEffect, useState } from 'react';
import DarkModeIcon from '../../img/ic-dark-mode.png';
import Logo from '../../img/LogFlex.png';
import ExitIcon from '../../img/ic-exit.png';
import { ButtonCircleGray, ButtonTransparent, ContainerHeader, GroupButtonContainer, LogoImage } from './styles';
import { useFont } from '../../contexts/FontContext';
import { useNavigate } from 'react-router-dom';
import { userAuthContext } from '../../contexts/UserAuthContext';

export default function Header(props) {

  const { baseRem, increaseBaseRem, defaultBaseRem, decreaseBaseRem } = useFont();
  const { isLoggedIn, Logout } = useContext(userAuthContext)
  const navigate = useNavigate();
  

  const handleSubmitLogout = (event) => {
      event.preventDefault();

      Logout()
      navigate('/login')
  };

  const handleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };


  return (
    <ContainerHeader>
      <div>
        {props.hasLogo &&
          <LogoImage src={Logo} alt="logo da empresa" onClick={()=>navigate("/home")} tabIndex="1" aria-label="Logo Marca da Log Flex" />
        }

      </div>

      <div>
        <h1 tabIndex="2">
          {props.title}
        </h1>
      </div>

      <GroupButtonContainer>
        <ButtonCircleGray onClick={decreaseBaseRem} tabIndex="3" aria-label="Menos A, Para diminuir tamanho da fonte">
          -A
        </ButtonCircleGray>

        <ButtonCircleGray onClick={defaultBaseRem} tabIndex="4" aria-label="A, Para Manter o tamanho da Fonte" >
          A
        </ButtonCircleGray>

        <ButtonCircleGray onClick={increaseBaseRem} tabIndex="5" aria-label="Mais A, Para aumentar o tamanho da fonte">
          +A
        </ButtonCircleGray>

        <ButtonTransparent onClick={handleDarkMode} tabIndex="6" aria-label="Dark Mode, Para alternar para o modo escuro">
          <img src={DarkModeIcon} alt="darkMode" />
        </ButtonTransparent>

        {(isLoggedIn) ?  
            <ButtonTransparent onClick={handleSubmitLogout}>
              <img src={ExitIcon} alt="sair" tabIndex="7" aria-label="Para sair do sistema" />
            </ButtonTransparent> 
          : <></>
        }

      </GroupButtonContainer>
    </ContainerHeader>
  );
}
