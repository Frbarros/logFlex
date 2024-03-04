import { useContext, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import TextField from '../../components/TextField'
import { Container } from './styles';
import { userAuthContext } from '../../contexts/UserAuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllCentroDistribuicoes, getAllTransportador, getAllrastreio, postAtualizarRastreio, postCriarRastreio } from '../../service/api/LogFlexApi';
import Modal from '../../components/Modal';



export default function TrackingPackage() {
    const { user } = useContext(userAuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const [codeTracker, setCodeTracker] = useState('')
    const [centerDistributionInitial, setCenterDistributionInitial] = useState('')
    const [status, setStatus] = useState('')
    const [dateOfSend, setDateOfSend] = useState('')
    const [datePreview, setDatePreview] = useState('')
    const [transporter, setTransporter] = useState('')
    const [sender, setSender] = useState('')
    const [receiver, setReceiver] = useState('')
    const [trackerExist, setTrackerExist] = useState(false)
    const [trackers, setTrackers] = useState([])
    const [reachedDistributionCenter, setReachedDistributionCenter] = useState(false)
    const [transportadoresOptions, setTransportadoresOptions] = useState([])
    const [centroDistribuicoesOptions, setCentroDistribuicoesOptions] = useState([])
    const today = new Date().toISOString().split('T')[0];
    const [modal, setModal] = useState({
        isOpen: false,
        isSuccess: false,
        description:'',
        title:''
      })


    useEffect(() => {

        setCodeTracker(location.state.codigoRastreio)
        setReceiver(`${location.state.destinatario.nome}`)
        setSender(`${location.state.remetente.nomeFantasia}`)

        getAllrastreio(location.state.codigoRastreio).then(res => {

            if(res.status === 200) {
                setTrackers(res.data)
                
                if (res.data.length > 0) {
                    setTrackerExist(true)

                    setDateOfSend(location.state.dataEnvio)
                    setDatePreview(location.state.dataPrevista)

                    if (status === 'EM_TRANSITO') {
                        const currentTransporter = res.data[res.data.length-1]?.transportador 
                        setTransporter(`Nome: ${currentTransporter?.nome}, CNH: ${currentTransporter?.cnh}`)
                    }
                }
            }
        }).catch(console.log)

        if (user.perfil != 'TRANSPORTADOR') {

            getAllTransportador().then(res => {
                
                if(res.status === 200) {
                    
                    setTransportadoresOptions(res.data)
                }
            })
            
            getAllCentroDistribuicoes().then(res => {
                
                if(res.status === 200) {
                    
                    setCentroDistribuicoesOptions(res.data)
                }
            })

        }
        const centroDistribuicaoInfo = location.state.centroDistribuicao
        const status = location.state.status

        if (!location.state.dataEnvio) {
            const dataAtual = new Date()

            const dia = String(dataAtual.getDate()).padStart(2, '0')
            const mes = String(dataAtual.getMonth() + 1).padStart(2, '0')
            const ano = dataAtual.getFullYear()

            const dataFormatada = `${dia}/${mes}/${ano}`;

            setDateOfSend(dataFormatada)
        }

        if (centroDistribuicaoInfo) {
            setCenterDistributionInitial(`Razão Social: ${centroDistribuicaoInfo.razaoSocial}, CNPJ: ${centroDistribuicaoInfo.cnpj}`);
        }
        
        
        setReachedDistributionCenter(trackers.some(rastreio => rastreio[status] === 'RECEBIDO_CENTRO_DISTRIBUICAO'))
        
    },[])



    const handleStatusOptions = (user) => {
        switch (user.perfil) {
            case 'TRANSPORTADOR':
                return (
                    <>  
                        {!reachedDistributionCenter && <option value="RECEBIDO_CENTRO_DISTRIBUICAO">Recebido no centro de distribuição</option>}
                        <option value="ENTREGUE">Entregue</option>
                        <option value="DEVOLVIDO">Devolvido</option>
                    </>
                );
            default:
                if (location.state.status === 'EM_TRANSITO' && trackerExist) {
                    return (
                        <>
                            {!reachedDistributionCenter && <option value="RECEBIDO_CENTRO_DISTRIBUICAO">Recebido no centro de distribuição</option>}
                            <option value="ENTREGUE">Entregue</option>
                            <option value="DEVOLVIDO">Devolvido</option>
                        </>
                    );
                } else {
                    return <option value="EM_TRANSITO">Em trânsito</option>;
                }
        }
    }



    const handleSubmit = (event) => {
        event.preventDefault();

        let formValido = true


        // Verifica se o campo de nome está vazio
        if (codeTracker.trim() === "") {
            formValido = false
        } else if (sender.trim() === '') {
            formValido = false
        }else if (receiver.trim() === '') {
            formValido = false
        }else if (centerDistributionInitial.trim() === '') {
            formValido = false
        } else if (status.trim() === '') {
            formValido = false
        } else if (datePreview.trim() === '') {
            formValido = false
        } else if (transporter.trim() === '') {
            formValido = false
        }


        if(formValido) {


            if(!trackerExist) {

                const parts = datePreview.split("-");
                const formattedValue = `${parts[2]}/${parts[1]}/${parts[0]}`;
                
                const rastreio = {
                    dataPrevista: formattedValue,
                    centroDistribuicao: {
                        cnpj: centerDistributionInitial.replace(/\D/g, "").slice(-14)
                    },
                    transportador: {
                        cnh: transporter.replace(/\D/g, "").slice(-11)
                    }
                }
                postCriarRastreio(codeTracker ,rastreio)
                .then((res) => {
                    if (res.status === 201) {
                        setModal({
                          isOpen:true, 
                          isSuccess:true,
                          description:'',
                          title:'Rastreio atualizado com sucesso.'
                        })
                    }
                })
                .catch((error) => {
                    
                  setModal({
                    isOpen:true, 
                    isSuccess:false,
                    description:error.response.data.mensagem,
                    title:''
                  })  
                })
            } else {

                const rastreio = {
                    transportador: {
                        cnh: transporter.replace(/\D/g, "").slice(-11)
                    },
                    status: status
                }

                postAtualizarRastreio(codeTracker,rastreio)
                .then((res) => {
                    if (res.status === 201) {
                        setModal({
                          isOpen:true, 
                          isSuccess:true,
                          description:'',
                          title:'Rastreio atualizado com sucesso.'
                        })
                    }
                })
                .catch((error) => {
                    
                  setModal({
                    isOpen:true, 
                    isSuccess:false,
                    description:error.response.data.mensagem,
                    title:''
                  })  
                })
            }
        }
    };

    const renderExpectedDate = () => {
        if (trackerExist) {
            return (
                <TextField
                    title="Data Prevista:"
                    value={location.state.dataPrevista}
                    onChange={(e) => setDatePreview(e.target.value)}
                    tabIndex={27}
                    type="text"
                    required
                    disabled
                    aria-label=" Informe a Data prevista"
                />
            );
        } else {
            return (
                <TextField
                    title="Data Prevista:"
                    value={datePreview}
                    onChange={(e) => setDatePreview(e.target.value)}
                    tabIndex={27}
                    type="date"
                    required
                    min={today}
                    disabled={trackerExist}
                    aria-label=" Informe a Data prevista"
                />
            );
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

            <Header title="Rastreio de Pacote" hasLogo={true} aria-label="Texto Cadastro Pacote" />
            <Modal isOpen={modal.isOpen} isSuccess={modal.isSuccess} description={modal.description} customTitle= {modal.title} onClose={closeModal} />

            <form className='main' onSubmit={handleSubmit}>
                <div className='container'>
                    <div className='flex-1'>                    
                        <div className='flex-1'>
                            <TextField
                                title="Codigo Rastreamento:"
                                value={codeTracker}
                                onChange={(e) => setCodeTracker(e.target.value)}
                                required
                                tabIndex={20}
                                aria-label="  Codigo de Rastreamento"
                                disabled
                            />
                        </div>
                        <div className='flex-1'>
                                <TextField
                                    title="Destinatário:"
                                    value={receiver}
                                    onChange={(e) => setReceiver(e.target.value)}
                                    tabIndex={21}
                                    aria-label=" Informação sobre o Destinatário"
                                    disabled
                                />
                            </div>
                        <div className='flex-col-2'>
                            <div className='flex-1'>
                                <TextField
                                    title="Data de Envio:"
                                    value={dateOfSend}
                                    disabled
                                    tabIndex={22}
                                    aria-label=" Informe a data de envio"
                                />
                            </div>
                        </div>
                        <div className='flex-1'>
                            <TextField
                                title="Centro de Distribuição :"
                                value={centerDistributionInitial}
                                onChange={(e) => setCenterDistributionInitial(e.target.value)}
                                required
                                disabled={trackerExist}
                                tabIndex={23}
                                list="centroDistribuicaoList"
                                aria-label=" Informe o cnpj do Centro de Distribuição no input abaixo para buscar"
                            />
                            {trackerExist ? (
                                <></>
                            ) : (
                                <datalist id="centroDistribuicaoList">
                                    {centroDistribuicoesOptions.map((centroDistribuicao) => (
                                        <option key={centroDistribuicao.cnpj} value={`Razão Social: ${centroDistribuicao.razaoSocial}, CNPJ: ${centroDistribuicao.cnpj}`} />
                                    ))}
                                </datalist>
                            )}
                        </div>
                    </div>
                    <div className='flex-1' >                
                        <div className='select-status'>
                            <p htmlFor="status">Status:</p>                        
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                    tabIndex={25}
                                    aria-label="Escolha o status"
                                >
                                    <option value="" hidden>
                                        Selecione o status do pacote
                                    </option>
                                  
                                    {handleStatusOptions(user)}
                                </select>    
                        </div>
                        <div className='flex-col-2'>
                            <div className='flex-1'>
                                <TextField
                                 title="Remetente:"
                                 value={sender}
                                 onChange={(e) => setSender(e.target.value)}
                                 required
                                 tabIndex={26}
                                 aria-label=" Informação sobre o Rementente"
                                 disabled
                             />   
                            </div>
                        </div>
                        <div className='flex-col-2'>
                            <div className='flex-1'>
                                {renderExpectedDate()}
                            </div>
                        </div>
                        <div className='flex-1'>
                            <TextField
                                    title="Transportador:"
                                    value={transporter}
                                    onChange={(e) => setTransporter(e.target.value)}
                                    required
                                    tabIndex={28}
                                    disabled={location.state.status === 'EM_TRANSITO'}
                                    list="transportadorList"
                                    aria-label=" Informe o Transportador ou entre no botão abaixo par buscar"
                                />
                            <datalist id="transportadorList">
                                {transportadoresOptions.map((transportador) => (
                                    <option key={transportador.cnh} value={`Nome: ${transportador.nome}, CNH: ${transportador.cnh}`} />
                                ))}
                            </datalist>
                        </div>
                    </div>
                </div>
                <div className='button-register' tabIndex={30}>
                    <Button
                        title="Atualizar"
                        type="submit"
                        aria-label="Botão de Atualizar"
                    />
                </div>
            </form>
            <Footer />
        </Container >
    )
};