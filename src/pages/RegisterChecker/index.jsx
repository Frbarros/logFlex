import { useState } from 'react';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import TextField from '../../components/TextField'
import { Container } from './styles';
import { postUserConferente } from '../../service/api/LogFlexApi';
import { useNavigate } from 'react-router-dom';
import { getEndereco } from '../../service/api/ViaCepApi';
import { validarCPF } from '../../util/ValidationDocuments'
import Modal from '../../components/Modal';
import MaskInput from '../../components/InputMask';

export default function RegisterChecker() {
  const navigate = useNavigate()

  const [cpf, setCpf] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [email, setEmail] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [telephone, setTelephone] = useState('')
  const [address, setAddress] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [errorCpf, setErrorCpf] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorPasswordConfirmation, setErrorPasswordConfirmation] = useState('')
  const [errorEmail, setErrorEmail] = useState('');
  const [errorTelephone, setErrorTelephone] = useState('');
  const [modal, setModal] = useState({
    isOpen: false,
    isSuccess: false,
    description:''
  })
  const [isShown, setIsShown] = useState(false);

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

    setErrorPassword("")
    setErrorPasswordConfirmation("")
    setErrorCpf("")
    setErrorEmail('')
    setErrorTelephone('')

    let formValido = true
    const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

    if (fullName.trim() === "") {
      formValido = false
    } else if (cpf.trim() === '') {
      formValido = false
    } else if (password.trim() === '') {
      formValido = false
    } else if (passwordConfirmation.trim() === '') {
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
    } else if (password.trim() !== passwordConfirmation.trim()) {
      formValido = false
      setErrorPassword("senha não confere")
    } else if (password.length < 8) {
      formValido = false
      setErrorPassword("A senha deve conter no minimo 8 digitos")
    } else if (!regexPassword.test(password)) {
      formValido = false
      setErrorPassword("A senha deve conter letras e números")
    } else if (!validarCPF(cpf)) {
      formValido = false;
      setErrorCpf('O CPF informado é inválido.');
    }

    if (formValido) {


      const parts = dateOfBirth.split("-");
      const formattedValue = `${parts[2]}/${parts[1]}/${parts[0]}`;


      const conferente = {
        nome: fullName,
        cpf: cpf.replace(/\D/g, ""),
        email: email,
        telefone: telephone.replace(/\D/g, ""),
        numeroRua: number,
        complemento: complement,
        senha: password,
        dataNascimento: formattedValue,
        endereco: {
          cep: zipCode.replace(/\D/g, ""),
          rua: address,
          bairro: neighborhood,
          cidade: city,
          uf: state
        }
      }

      postUserConferente(conferente)
      .then((res) => {
          if (res.status === 201) {
              setModal({
                isOpen:true, 
                isSuccess:true,
                description:''
              })
          }
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

   
  const closeModal = () => {
    if (modal.isSuccess) {
      navigate("/listar-conferentes");
    }

    setModal({
      ...modal,
      isOpen: false
    })

  }

    return (
      <Container>
        <Header title="Cadastro Conferente" hasLogo={true} aria-label="Texto Cadastro Conferente " />

        <Modal isOpen={modal.isOpen} isSuccess={modal.isSuccess} description={modal.description} onClose={closeModal} />

        <form className='main' onSubmit={handleSubmit}>
          <div className='container'>
  
            <div className='flex-col-2'>
              <div className='flex-1'>
                <MaskInput
                  title="CPF:"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                  tabIndex={20}
                  aria-label=" Informe o CPF"
                  mask="999.999.999-99"
                />
                {errorCpf && (
                  <div className={`error`} tabIndex={21} aria-live="polite" aria-label="Mensagem de erro">
                    {errorCpf}
                  </div>
                )}
                <div className='flex-col-2'>
                  <div className='flex-1'>
                    <TextField
                      type="password"
                      title="Senha:"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      tabIndex={22}
                      aria-label=" Informe uma senha que deve conter 8 digitos entre números e letras"
                      maxLength={15}
                    />
                    <div className={`error`} tabIndex={23} aria-live="polite" aria-label="Mensagem de erro">
                      {errorPassword}
                    </div>
  
                  </div>
                  <div className='flex-1'>
                    <TextField
                      type="password"
                      title="Confirmação de Senha:"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      required
                      tabIndex={24}
                      aria-label="Repita a senha"
                      maxLength={15}
                    />
                    <div className={`error`} tabIndex={25} aria-live="polite" aria-label="Mensagem de erro">
                      {errorPasswordConfirmation}
                    </div>
                  </div>
                </div>
  
                <TextField
                  title="Nome Completo:"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  tabIndex={26}
                  aria-label=" Informe o Nome Completo"
                  maxLength={30}
                />
                <MaskInput
                  title="CEP:"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  onBlur={onBlurCep}
                  required
                  tabIndex={27}
                  aria-label=" Informe o CEP"
                  mask="99999-999"
                />
                <div className='flex-col-2'>
                  <div className='flex-1'>
                    <TextField
                      title="Número:"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      tabIndex={28}
                      aria-label=" Informe o Número "
                      maxLength={10}
                    />
                  </div>
                  <div className='flex-1'>
                    <TextField
                      title="Complemento:"
                      value={complement}
                      onChange={(e) => setComplement(e.target.value)}
                      tabIndex={29}
                      aria-label=" Informe o Complemento, caso não tenha deixe o campo em branco"
                      maxLength={30}
                    />
                  </div>
                </div>
                <div className='flex-col-2'>
                  <div className='flex-1'>
                    <TextField
                      title="Cidade:"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      disabled
                      tabIndex={30}
                      aria-label=" Informe a cidade"
                      maxLength={30}
                    />
                  </div>
                  <div className='flex-1'>
                    <TextField
                      title="UF:"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      disabled
                      tabIndex={31}
                      aria-label=" Informe a UF"
                      maxLength={2}
                    />
                  </div>
                </div>
  
              </div>
            </div>
  
  
            <div className='flex-col-2'>
              <div className='flex-1'>
                <TextField
                  type="date"
                  title="Data de Nascimento:"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                  tabIndex={32}
                  aria-label=" Informe a Data de Nascimento"
                />
  
                <TextField
                  title="Email:"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  tabIndex={33}
                  aria-label="Informe o Email"
                  maxLength={50}
                />
                {errorEmail && (
                  <div className={`error`} tabIndex={34} aria-live="polite" aria-label="Mensagem de erro">
                    {errorEmail}
                  </div>
                )}
                <MaskInput
                  title="Telefone:"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                  tabIndex={35}
                  aria-label=" Informe o telefone"
                  mask="(99)99999-9999"
                />
                {setErrorTelephone && (
                  <div className={`error`} tabIndex={36} aria-live="polite" aria-label="Mensagem de erro">
                    {errorTelephone}
                  </div>
                )}
                <TextField
                  title="Endereço:"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  tabIndex={37}
                  aria-label=" Informe o endereço"
                  maxLength={50}
                />
                <TextField
                  title="Bairro:"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  required
                  tabIndex={38}
                  disabled
                  aria-label=" Informe o bairro"
                  maxLength={30}
                />
                <div className='button-register'>
                  <Button
                    title="Cadastrar"
                    type="submit"
                    tabIndex={39}
                    aria-label="Botão de Cadastro"
  
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <Footer />
      </Container>
    );
  }