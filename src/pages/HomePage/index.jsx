import React, { useContext } from 'react';
import logoImage from '../../img/LogFlex.png';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Container, Logo } from './styles';
import Menu from '../../components/Menu';


const Home = () => {

    return (
        <Container>
            <Header title="" hasLogo={true}/>
            <Menu/>
           
            <div className='logo-container'>
                <Logo src={logoImage}/>
            </div>          
            <div className='footer'>
                <Footer />
            </div>
        </Container >
    );
};

export default Home;



