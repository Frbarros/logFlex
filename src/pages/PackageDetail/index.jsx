import { useEffect, useState } from "react"
import { Container } from "./styles"
import Header from "../../components/Header"
import TextField from "../../components/TextField"
import Footer from "../../components/Footer"
import { getAllrastreio } from "../../service/api/LogFlexApi"
import { useLocation } from "react-router-dom"

export default function PackageDetail() {
    const location = useLocation()


    const [codTracker, setCodTracker] = useState('')
    const [lenght, setLenght] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [width, setWidth] = useState('')
    const [dateRegister, setDateRegister] = useState('')
    const [descriptionPackage, setDescriptionPackage] = useState('')
    const [sender, setSender] = useState('')
    const [addressSender, setAddressSender] = useState('')
    const [recipient, setRecipient] = useState('')
    const [addressRecipient, setAddressRecipient] = useState('')
    const [dateSend, setDateSend] = useState('')
    const [dateForeseen, setDateForeseen] = useState('')
    const [dateDelivery, setDateDelivery] = useState('')
    const [distribuitionCenter, setDistribuitionCenter] = useState('')

    const [list, setList] = useState([])


    useEffect(() => {

        setCodTracker(location.state.codigoRastreio)

        getAllrastreio(location.state.codigoRastreio).then((res) => {

            if (res.status === 200) {


                setList(res.data)

            }
        })


        loadInfo()

    },[])

    const loadInfo = () => {
        const destinatario = location.state.destinatario
        const remetente = location.state.remetente


        setCodTracker(location.state.codigoRastreio)
        setAddressRecipient(
            `${destinatario.endereco.rua}, Nº ${destinatario.numeroRua}, ${destinatario.endereco.bairro}, ${destinatario.endereco.cidade} - ${destinatario.endereco.uf}`
        )
        setAddressSender(
            `${remetente.endereco.rua}, Nº ${remetente.numeroRua}, ${remetente.endereco.bairro}, ${remetente.endereco.cidade} - ${remetente.endereco.uf}`
        )
        setWidth(location.state.largura)
        setHeight(location.state.altura)
        setLenght(location.state.comprimento)
        setWeight(location.state.peso)
        setDateRegister(location.state.dataCadastro)
        setSender(`Razão Social: ${remetente.razaoSocial} - CNPJ: ${remetente.cnpj}`)
        setRecipient(`Nome: ${destinatario.nome} - CPF: ${destinatario.cpf}`)
        setDescriptionPackage(location.state.descricao)


        if (location.state.status !== 'EM_PROCESSAMENTO') {
            const centroDistribuicao = location.state.centroDistribuicao
            
            setDateSend(location.state.dataEnvio)
            setDateForeseen(location.state.dataPrevista)
            setDateDelivery(location.state.dataEntrega || 'Pacote não chegou ao destino')
            setDistribuitionCenter(`Razão Social: ${centroDistribuicao.razaoSocial} - CNPJ: ${centroDistribuicao.cnpj}`)
        }
    }


    return (
        <Container>
            <Header title="Pacote" hasLogo={true} aria-label="Pacote" />
            <div className="grid">
                <p className="title">Informações do pacote </p>
                <div className="grid-col-3">
                    <TextField
                        title="Codigo de rastreio:"
                        value={codTracker}
                        disabled
                        tabIndex={20}
                        aria-label="codigo de rastreio"
                    />
                    <TextField
                        title="Comprimento:"
                        value={lenght}
                        disabled
                        tabIndex={20}
                        aria-label="comprimento"
                    />
                    <TextField
                        title="Peso: (kg)"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        disabled
                        tabIndex={20}
                        aria-label="peso Kg"
                    />
                </div>
                <div className="grid-col-3">
                    <TextField
                        title="Data Cadastro:"
                        value={dateRegister}
                        disabled
                        tabIndex={20}
                        aria-label="data cadastro"
                    />
                    <TextField
                        title="Largura:"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        disabled
                        tabIndex={20}
                        aria-label="largura"
                    />
                    <TextField
                        title="Altura:"
                        value={height}
                        disabled
                        tabIndex={20}
                        aria-label="altura"
                    />
                </div>
                <div>
                    <TextField
                        title="Descrição:"
                        value={descriptionPackage}
                        disabled
                        tabIndex={20}
                        aria-label="descrição"
                    />
                </div>
                <div className="grid-col-2">
                    <TextField
                        title="Remetente:"
                        value={sender}
                        disabled
                        tabIndex={20}
                        aria-label="remetente"
                    />
                    <TextField
                        title="Endereço Remetente:"
                        value={addressSender}
                        disabled
                        tabIndex={20}
                        aria-label="endereço remetente"
                    />
                </div>
                <div className="grid-col-2">
                    <TextField
                        title="Destinatário:"
                        value={recipient}
                        disabled
                        tabIndex={20}
                        aria-label="destinatario"
                    />
                    <TextField
                        title="Endereço Destinatário:"
                        value={addressRecipient}
                        disabled
                        tabIndex={20}
                        aria-label="endereço destinatario"
                    />
                </div>
                {(location.state.status === 'EM_PROCESSAMENTO') ? <></> :
                <>
                    <p className="title">
                        Informações Rastreio
                    </p>
                    <div className="grid-col-3">
                        <TextField
                            title="Data Envio:"
                            value={dateSend}
                            disabled
                            tabIndex={20}
                            aria-label="data envio"
                            />
                        <TextField
                            title="Data Prevista:"
                            value={dateForeseen}
                            disabled
                            tabIndex={20}
                            aria-label="data prevista"
                            />
                        <TextField
                            title="Data Entrega:"
                            value={dateDelivery}
                            disabled
                            tabIndex={20}
                            aria-label="data entrega"
                            />
                    </div>
                    <div>
                        <TextField
                            title="Centro de Distribuição:"
                            value={distribuitionCenter}
                            disabled
                            tabIndex={20}
                            aria-label="centro de distribuição"
                            />
                    </div>
                    <div className="list">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Transportador</th>
                                    <th>Status</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                            {list.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <p>{item.transportador.nome}</p>
                                    </td>
                                    <td>
                                        <p>{item.status}</p>
                                    </td>
                                    <td>
                                        <p>{item.dataEvento}</p>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </>
                }
            </div>
            <Footer/>

        </Container>

    )
}