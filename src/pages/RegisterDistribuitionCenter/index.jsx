
import { useState } from 'react';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import TextField from '../../components/TextField'
import { Container } from './styles';
import { postCentroDistribuicao } from '../../service/api/LogFlexApi';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import { getEndereco } from '../../service/api/ViaCepApi';
import MaskInput from '../../components/InputMask';

export default function RegisterDistribuitionCenter() {

    const navigate = useNavigate()

    const [companyName, setCompanyName] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [corporateReason, setCorporateReason] = useState('')
    const [email, setEmail] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [telephone, setTelephone] = useState('')
    const [address, setAddress] = useState('')
    const [number, setNumber] = useState('')
    const [complement, setComplement] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [errorCnpj, setErrorCnpj] = useState('')
    const [errorEmail, setErrorEmail] = useState('');
    const [errorTelephone, setErrorTelephone] = useState('');
    const [modal, setModal] = useState({
        isOpen: false,
        isSuccess: false,
        description:''
      })
    
    
    const onBlurCep = (e) => {
        const { value } = e.target
    
        if (value?.length !== 9 ) {
          return
        }
    
        getEndereco(value.replace(/\D/g, ""))
        .then(res => {
    
          const endereco  = res
    
    
          setAddress(endereco.logradouro)
          setNeighborhood(endereco.bairro)
          setCity(endereco.localidade)
          setState(endereco.uf)
        }).catch(console.log)
    } 

    const handleSubmit = async (event) => {
        event.preventDefault();

        let formValido = true
        setErrorCnpj('')
        setErrorEmail('')
        setErrorTelephone('')


        // Verifica se o campo de nome está vazio
        if (companyName.trim() === "") {
            formValido = false
        } else if (cnpj.trim() === '') {
            formValido = false
        } else if (corporateReason.trim() === '') {
            formValido = false
        } else if (!email.includes('@')) {
            formValido = false;
            setErrorEmail('Digite um e-mail válido');
        } else if (zipCode.trim() === '') {
            formValido = false
        } else if (telephone.replace(/\D/g, '').length < 10 || telephone.replace(/\D/g, '').length > 11) {
            formValido = false;
            setErrorTelephone('O telefone com DDD deve conter entre 10 e 11 dígitos');
        } else if (address.trim() === '') {
            formValido = false
        } else if (neighborhood.trim() === '') {
            formValido = false
        } else if (city.trim() === '') {
            formValido = false
        } else if (state.trim() === '') {
            formValido = false
        } else if (number.trim() === '') {
            setNumber("S/N")
        } else if (!validarCNPJ(cnpj)) {
            formValido = false
            setErrorCnpj("O cnpj informado é inválido ")
        }

        if (formValido) {
      
      
            const centroDistribuicao = {
                cnpj: cnpj.replace(/\D/g, ""),
                nomeFantasia: companyName,
                razaoSocial: corporateReason,
                email: email,
                telefone: telephone.replace(/\D/g, ""),
                numeroRua: number,
                complemento: complement,
                endereco: {
                    cep: zipCode.replace(/\D/g, ""),
                    rua: address,
                    bairro: neighborhood,
                    cidade: city,
                    uf: state
                }
            }
      
          postCentroDistribuicao(centroDistribuicao)
          .then ((res) => {
            
            
            if (res.status === 201) {
                setModal({
                  isOpen:true, 
                  isSuccess:true,
                  description:''
        
                })
            }
        
            handleReset();
            
        })
          .catch((error) => {
            
            setModal({
              isOpen:true, 
              isSuccess:false,
              description:error.response.data.mensagem
    
            })
            
        })       
        }
        
    };

    function validarCNPJ(cnpj) {
        // Remover caracteres não numéricos
        cnpj = cnpj.replace(/[^\d]/g, '');

        // Verificar se o CNPJ tem 14 dígitos
        if (cnpj.length !== 14) {
            return false;
        }

        // Verificar se todos os dígitos são iguais (situação inválida, mas que passaria na validação de formato)
        if (/^(\d)\1+$/.test(cnpj)) {
            return false;
        }

        // Calcular os dígitos verificadores
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        if (resultado !== parseInt(digitos.charAt(0))) {
            return false;
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        if (resultado !== parseInt(digitos.charAt(1))) {
            return false;
        }

        return true;
    }

    const closeModal = () => {
        if (modal.isSuccess) {
            navigate("/listar-centro-distribuicao");
        }
  
        setModal({
          ...modal,
          isOpen: false
        })
  
      }




    return (
        <Container>
            <Header title="Cadastro Centro de Distribuição" hasLogo={true} isLogged={true} aria-label="Texto Cadastro Centro de Distribuição " />

            <Modal isOpen={modal.isOpen} isSuccess={modal.isSuccess} description={modal.description} onClose={closeModal} />

            <form className="main" onSubmit={handleSubmit}>
                <div className="container">
                    <div className="flex-1">
                        <TextField
                            id="nome"
                            title="Nome fantasia:"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                            tabIndex={20}
                            aria-label=" Informe o Nome fantasia"
                            maxLength={30}
                        />
                        <TextField
                            title="Razão social:"
                            value={corporateReason}
                            onChange={(e) => setCorporateReason(e.target.value)}
                            required
                            tabIndex={21}
                            aria-label=" Informe a Razão social "
                            maxLength={30}
                        />
                        <MaskInput
                            title="Cep:"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            onBlur={onBlurCep}
                            required
                            tabIndex={22}
                            aria-label=" Informe o CEP "
                            mask="99999-999"
                        />
                    </div>
                    <div className="flex-1">
                        <MaskInput
                            title="CNPJ:"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            required
                            tabIndex={23}
                            aria-label=" Informe o CNPJ "
                            mask="99.999.999/9999-99"
                        />
                        {errorCnpj && (
                <div className={`error`} tabIndex={24} aria-live="polite" aria-label="Mensagem de erro">
                  {errorCnpj}
                </div>
              )}
                        <TextField
                            title="E-mail:"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            tabIndex={25}
                            aria-label=" Informe o Email"
                            maxLength={50}
                        />
                        {errorEmail && (
                <div className={`error`} tabIndex={26} aria-live="polite" aria-label="Mensagem de erro">
                  {errorEmail}
                </div>
              )}
                        <MaskInput
                            title="Telefone:"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            required
                            tabIndex={27}
                            aria-label=" Informe o Telefone "
                            mask="(99)99999-9999"
                        />
                        {setErrorTelephone && (
                <div className={`error`} tabIndex={28} aria-live="polite" aria-label="Mensagem de erro">
                  {errorTelephone}
                </div>
              )}
                    </div>
                </div>

                <div className="flex-1">
                    <TextField
                        title="Endereço:"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        tabIndex={29}
                        aria-label=" Informe o Endereço "
                        maxLength={50}
                    />

                    <div className="flex-col-2">
                        <div className="flex-1">
                            <TextField
                                title="Número:"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                tabIndex={30}
                                aria-label=" Informe o Número "
                                maxLength={10}
                            />
                        </div>
                        <div className="flex-1">
                            <TextField
                                title="Complemento:"
                                value={complement}
                                onChange={(e) => setComplement(e.target.value)}
                                tabIndex={31}
                                aria-label=" Informe o Complemento, caso não tenha deixe o campo em branco"
                                maxLength={30}
                            />
                        </div>
                        <div className="flex-1">
                            <TextField
                                title="Bairro:"
                                value={neighborhood}
                                onChange={(e) => setNeighborhood(e.target.value)}
                                required
                                tabIndex={32}
                                aria-label=" Informe o Bairro "
                                maxLength={30}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-col-2">
                    <div className="flex-1">
                        <TextField
                            title="Cidade:"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            tabIndex={33}
                            aria-label=" Informe a cidade"
                            maxLength={30}
                        />
                    </div>
                    <div className="flex-1">
                        <TextField
                            title="UF:"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            tabIndex={34}
                            aria-label=" Informe a UF"
                            maxLength={2}
                        />
                    </div>
                    <div className="flex-1">
                        <div className='button-register'>
                            <Button
                                title="Cadastrar"
                                type="submit"
                                tabIndex={35}
                                aria-label="Botão de Cadastro"
                            />
                           
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </Container>
    );
}