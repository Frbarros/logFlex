import { useState } from 'react';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import TextField from '../../components/TextField';
import { Container } from './styles';
import { validarCNH, validarCPF } from '../../util/ValidationDocuments';
import { postUserTransportador } from '../../service/api/LogFlexApi';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import { getEndereco } from '../../service/api/ViaCepApi';
import MaskInput from '../../components/InputMask';

export default function RegisterTransporter() {
    const navigate = useNavigate();

    const [cpf, setCpf] = useState('');
    const [fullName, setFullName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setpasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [telephone, setTelephone] = useState('');
    const [cnh, setCnh] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [errorCpf, setErrorCpf] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorPasswordConfirmation, setErrorPasswordConfirmation] = useState('');
    const [errorCnh, setErrorCnh] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorTelephone, setErrorTelephone] = useState('');
    const [modal, setModal] = useState({
        isOpen: false,
        isSuccess: false,
        description: ''
    })


    const onBlurCep = (e) => {
        const { value } = e.target

        if (value?.length !== 9) {
            return
        }

        getEndereco(value.replace(/\D/g, ""))
            .then(res => {

                const endereco = res

                setAddress(endereco.logradouro)
                setNeighborhood(endereco.bairro)
                setCity(endereco.localidade)
                setState(endereco.uf)
            }).catch(console.log)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let formValido = true
        setErrorCpf('')
        setErrorPassword('')
        setErrorPasswordConfirmation('')
        setErrorCnh('')
        setErrorEmail('')
        setErrorTelephone('')

        const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

        // Verifica se o campo de nome está vazio
        if (cpf.trim() === '') {
            formValido = false;
        } else if (password.trim() === '') {
            formValido = false;
        } else if (passwordConfirmation.trim() === '') {
            formValido = false;
        } else if (!email.includes('@')) {
            formValido = false;
            setErrorEmail('Digite um e-mail válido');
        } else if (zipCode.trim() === '') {
            formValido = false;
        } else if (telephone.replace(/\D/g, '').length < 11 || telephone.replace(/\D/g, '').length > 11) {
            formValido = false;
            setErrorTelephone('O telefone com DDD deve conter 11 dígitos');
        } else if (address.trim() === '') {
            formValido = false;
        } else if (neighborhood.trim() === '') {
            formValido = false;
        } else if (city.trim() === '') {
            formValido = false;
        } else if (state.trim() === '') {
            formValido = false;
        } else if (number.trim() === '') {
            setNumber('S/N');
        } else if (password.trim() !== passwordConfirmation.trim()) {
            formValido = false;
            setErrorPassword('senha não confere');
        } else if (password.length < 8) {
            formValido = false;
            setErrorPassword('A senha deve conter no mínimo 8 dígitos');
        } else if (!regexPassword.test(password)) {
            formValido = false;
            setErrorPassword('A senha deve conter letras e números');
        } else if (!validarCPF(cpf)) {
            formValido = false;
            setErrorCpf('O CPF informado é inválido.');
        }

        console.log('CNH antes de validarCNH:', cnh);
        if (!validarCNH(cnh)) {
            formValido = false;
            setErrorCnh('A CNH informada é inválida');
            console.log('CNH inválida');
        }


        if (formValido) {

            const parts = birthDate.split("-");
            const formattedValue = `${parts[2]}/${parts[1]}/${parts[0]}`;

            const transportador = {
                nome: fullName,
                cpf: cpf.replace(/\D/g, ''),
                cnh: cnh.replace(/\D/g, ''),
                email: email,
                telefone: telephone.replace(/\D/g, ''),
                numeroRua: number,
                complemento: complement,
                senha: password,
                dataNascimento: formattedValue,
                endereco: {
                    cep: zipCode.replace(/\D/g, ''),
                    rua: address,
                    bairro: neighborhood,
                    cidade: city,
                    uf: state
                }
            }


            postUserTransportador(transportador)
                .then(() => {
                    setModal({
                        isOpen: true,
                        isSuccess: true,
                        description: ''

                    })

                    handleReset();

                })
                .catch((error) => {
                    setModal({
                        isOpen: true,
                        isSuccess: false,
                        description: error.response.data.mensagem
                    })

                })
        }
    };

    const closeModal = () => {
        if (modal.isSuccess) {
            navigate("/listar-transportadores")
        }

        setModal({
            ...modal,
            isOpen: false
        })

    }
    return (
        <Container>
            <Header title="Cadastro Transportador" hasLogo={true} isLogged={true} aria-label="Texto Cadastro Transportador " />
            <Modal isOpen={modal.isOpen} isSuccess={modal.isSuccess} description={modal.description} onClose={closeModal} />
            <form className='main' onSubmit={handleSubmit}>
                <div className='flex-1'>
                    <TextField
                        title="Nome Completo:"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        tabIndex={20}
                        aria-label=" Informe o Nome Completo"
                        maxLength={30}
                    />
                </div>
                <div className='container'>
                    <div className='flex-1'>
                        <MaskInput
                            title="CPF:"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            required
                            tabIndex={21}
                            aria-label=" Informe o CPF"
                            mask="999.999.999-99"
                        />
                        {errorCpf && (
                            <div className={`error`} tabIndex={22} aria-live="polite" aria-label="Mensagem de erro">
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
                                    tabIndex={23}
                                    aria-label=" Informe uma senha que deve conter 8 digitos entre números e letras"
                                    maxLength={15}
                                />
                                <div className={`error`} tabIndex={24} aria-live="polite" aria-label="Mensagem de erro">
                                    {errorPassword}
                                </div>
                            </div>
                            <div className='flex-1'>
                                <TextField
                                    type="password"
                                    title="Confirmar Senha:"
                                    value={passwordConfirmation}
                                    menssage={errorPasswordConfirmation}
                                    onChange={(e) => setpasswordConfirmation(e.target.value)}
                                    required
                                    tabIndex={25}
                                    aria-label="Repita a senha"
                                    maxLength={15}
                                />
                                <div className={`error`} tabIndex={26} aria-live="polite" aria-label="Mensagem de erro">
                                    {errorPasswordConfirmation}
                                </div>
                            </div>
                        </div>
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
                    </div>
                    <div className='flex-1'>
                        <TextField
                            type="date"
                            title="Data de Nascimento:"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                            tabIndex={28}
                            aria-label=" Informe a Data de Nascimento"
                        />
                        <TextField
                            title="E-mail:"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            tabIndex={29}
                            aria-label=" Informe o Email"
                            maxLength={50}
                        />
                        {errorEmail && (
                            <div className={`error`} tabIndex={30} aria-live="polite" aria-label="Mensagem de erro">
                                {errorEmail}
                            </div>
                        )}
                        <div className='flex-col-2'>
                            <div className='flex-1'>
                                <MaskInput
                                    title="Telefone:"
                                    value={telephone}
                                    onChange={(e) => setTelephone(e.target.value)}
                                    required
                                    tabIndex={31}
                                    aria-label=" Informe o telefone"
                                    mask="(99)99999-9999"
                                />
                                <div className={`error`} tabIndex={32} aria-live="polite" aria-label="Mensagem de erro">
                                    {errorTelephone}
                                </div>
                            </div>
                            <div className='flex-1'>
                                <TextField
                                    title="CNH:"
                                    value={cnh}
                                    onChange={(e) => setCnh(e.target.value)}
                                    required
                                    tabIndex={33}
                                    aria-label=" Informe a CNH"
                                    maxLength={11}
                                />
                                <div className={`error`} tabIndex={34} aria-live="polite" aria-label="Mensagem de erro">
                                    {errorCnh}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <TextField
                        title="Enderço:"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        tabIndex={35}
                        aria-label=" Informe o endereço"
                        maxLength={50}
                    />
                </div>
                <div>
                    <div className='flex-1'>
                        <div className='flex-col-2'>
                            <div className='flex-1'>
                                <TextField
                                    title="Número:"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    tabIndex={36}
                                    aria-label=" Informe o Número "
                                    maxLength={10}
                                />
                                <div className='flex-1'>
                                    <TextField
                                        title="Bairro:"
                                        value={neighborhood}
                                        onChange={(e) => setNeighborhood(e.target.value)}
                                        tabIndex={38}
                                        aria-label=" Informe o bairro"
                                        maxLength={30}
                                    />
                                    <div className='flex-1'>
                                        <TextField
                                            title="UF:"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            tabIndex={40}
                                            aria-label=" Informe a UF"
                                            maxLength={2}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex-1'>
                                <TextField
                                    title="Complemento:"
                                    value={complement}
                                    onChange={(e) => setComplement(e.target.value)}
                                    tabIndex={37}
                                    aria-label=" Informe o Complemento, caso não tenha deixe o campo em branco"
                                    maxLength={30}
                                />
                                <div className='flex-1'>
                                    <TextField
                                        title="Cidade:"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        tabIndex={39}
                                        aria-label=" Informe a cidade"
                                        maxLength={30}
                                    />
                                    <div className='flex-1'>
                                        <div className='button-register'>
                                            <Button
                                                title="Cadastrar"
                                                type="submit"
                                                tabIndex={41}
                                                aria-label="Botão de Cadastro"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <Footer />

        </Container >
    )
};
