import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import TextField from '../../components/TextField'
import { Container } from './styles';
import { postPacote, getAllDestinatario, getAllRemetente } from '../../service/api/LogFlexApi';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';
import MaskInput from '../../components/InputMask';


export default function RegisterPackage() {

    const navigate = useNavigate()
   
    const [weight, setWeight] = useState('')
    const [lenght, setLenght] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [sender, setSender] = useState('')
    const [descriptionPackage, setDescriptionPackage] = useState('')
    const [recipient, setRecipient] = useState('')
    const [modal, setModal] = useState({
        isOpen: false,
        isSuccess: false,
        description:''
    })
    const [destinatariosOptions, setDestinatariosOptions] = useState([])
    const [remetentesOptions, setRemetentesOptions] = useState([])

    useEffect(() => {
        const fetchDestinatarios = async () => {
            try {
                const response = await getAllDestinatario();
                setDestinatariosOptions(response.data);
            } catch (error) {
                alert("Destinatário não encontrado");
            }
        };

        const fetchRemetentes = async () => {
            try {
                const response = await getAllRemetente();
                setRemetentesOptions(response.data);
            }catch (error) {
                alert("Remetente não encontrado.")
            }
        }
    
        fetchDestinatarios();
        fetchRemetentes();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        let formValido = true


        // Verifica se o campo de nome está vazio
        if (weight.trim() === '') {
            formValido = false
        } else if (lenght.trim() === '') {
            formValido = false
        } else if (width.trim() === '') {
            formValido = false
        } else if (height.trim() === '') {
            formValido = false
        } else if (sender.trim() === '') {
            formValido = false
        } else if (descriptionPackage.trim() === '') {
            formValido = false
        }  else if (recipient.trim() === '') {
            formValido = false
        }

        if(formValido){

            const pacote = {
                descricao: descriptionPackage,
                peso: weight.replace(/,/g, '.').replace(/[a-zA-Z]/g, ''),
                comprimento: lenght.replace(/,/g, '.').replace(/[a-zA-Z]/g, ''),
                largura: width.replace(/,/g, '.').replace(/[a-zA-Z]/g, ''),
                altura: height.replace(/,/g, '.').replace(/[a-zA-Z]/g, ''),
                destinatario: {
                    cpf: recipient.replace(/\D/g, "").slice(-11)
                },
                remetente:{
                    cnpj: sender.replace(/\D/g, "").slice(-14)
                }
            }
            
        postPacote(pacote)
        .then((res)=> {

            if(res.status === 201) {
                setModal({
                    isOpen: true,
                    isSuccess:true,
                    description: ''
                })
            }
            // handleset();
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
            navigate("/listar-pacotes");
        }
  
        setModal({
          ...modal,
          isOpen: false
        })
  
      }


    return (
        <Container>

            <Header title="Cadastro Pacote" hasLogo={true} isLogged={true} aria-label="Texto Cadastro Pacote" />
            <Modal isOpen={modal.isOpen} isSuccess={modal.isSuccess} description={modal.description} onClose={closeModal} />

            <form className='main' onSubmit={handleSubmit}>
                <div className='flex-1'>
                    <TextField
                        title="Descrição Pacote:"
                        value={descriptionPackage}
                        onChange={(e) => setDescriptionPackage(e.target.value)}
                        required
                        tabIndex={20}
                        aria-label=" Informe  a Descrição Pacote"
                        maxLength={255}
                    />
                </div>

                <div className='container'>
                    <div className='flex-1'>
                        <div className='flex-col-2'>
                            <div className='flex-1'>
                                <MaskInput
                                    title="Peso:"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    required
                                    tabIndex={21}
                                    aria-label=" Informe o Peso"
                                    mask="999,99kg"
                                />
                            </div>
                        </div>
                        <div className='flex-col-2'>
                            <div className='flex-1'>
                                <MaskInput
                                    title="Largura:"
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                    required
                                    tabIndex={22}
                                    aria-label=" Informe a largura"
                                    mask="999,99cm"
                                />
                            </div>
                        </div>
                        <div className='flex-1'>
                            <TextField
                                title="Remetente:"
                                value={sender}
                                onChange={(e) => setSender(e.target.value)}
                                list="remetentesList"
                                required
                                tabIndex={23}
                                aria-label=" Informe o Remetente ou escolha da lista"
                            />
                            <datalist id="remetentesList">
                                {remetentesOptions.map((remetente) => (
                                <option key={remetente.cnpj} value={`Razao Social: ${remetente.razaoSocial}, CNPJ: ${remetente.cnpj}`} />
                                ))}
                            </datalist>
                        </div>
                    </div>
                    <div className='flex-1'>
                        <div className='flex-1'>
                            <MaskInput
                                title="Comprimento:"
                                value={lenght}
                                onChange={(e) => setLenght(e.target.value)}
                                required
                                tabIndex={25}
                                aria-label=" Informe o Comprimento"
                                mask="999,99cm"
                            />
                        </div>
                        <div className='flex-1'>
                            <MaskInput
                                title="Altura:"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                required
                                tabIndex={26}
                                aria-label=" Informe a Altura"
                                mask="999,99cm"
                            />
                        </div>
                        <div className='flex-1'>
                            <TextField
                                title="Destinatário:"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                list="destinatariosList"
                                tabIndex={27}
                                aria-label=" Informe o Destinatário ou escolha da lista"                                    
                            />
                            <datalist id="destinatariosList">
                                {destinatariosOptions.map((destinatario) => (
                                <option key={destinatario.cpf} value={`Nome: ${destinatario.nome}, CPF: ${destinatario.cpf}`} />
                                ))}
                            </datalist>
                        </div>                      
                    </div>
                </div>
                <div className='button-register' tabIndex={29}>
                    <Button
                        title="Cadastrar"
                        type="submit"
                        aria-label="Botão de Cadastro"
                    />
                </div>
            </form>
            <Footer />
        </Container >
    )
};