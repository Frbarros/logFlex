import { prefix } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'



const PREFIX = "Bearer "


const logFlexApi = axios.create({
    
    baseURL: "http://localhost:8080/v1/logflex"
})



export const logar = async (email, password) => {
    
    const response = await logFlexApi.post("", {
        email: email,
        senha: password
    })
    
    return response
}

export const checkToken = async () => {
    const TOKEN = localStorage.getItem("Access_TOKEN")
    
    const response = await logFlexApi.post(`/${TOKEN}/verificar-token`)
    if (response.status === 200) {
        return true
    }
    
    return false
}

export const getUserByToken = async () => {
    const TOKEN = localStorage.getItem("Access_TOKEN")
    
    const response = await logFlexApi.get(`/${TOKEN}/buscar-usuario`)
    
    return response.data
}


export const getAllRemetente = async () => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.get(`/remetentes`,{
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const getAllConferente = async () => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.get(`/conferentes`, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const getAllDestinatario = async () => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.get(`/destinatarios`, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}
export const getAllTransportador = async () => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.get(`/transportadores`, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}
export const getAllCentroDistribuicoes = async () => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.get(`/centrodistribuicoes`, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const getAllpacotes = async () => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.get(`/pacotes`, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const getAllrastreio = async (codigoRastreio) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.get(`/pacotes/${codigoRastreio}/rastreios`, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const postCriarRastreio = async (codigoRastreio, rastreio) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.post(`/pacotes/${codigoRastreio}/rastreios/iniciar-rastreio`, {
        dataPrevista: rastreio.dataPrevista,
        centroDistribuicao: {
            cnpj: rastreio.centroDistribuicao.cnpj
        },
        transportador: {
            cnh: rastreio.transportador.cnh
        }
    },{
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}


export const postAtualizarRastreio = async (codigoRastreio, rastreio) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.post(`/pacotes/${codigoRastreio}/rastreios/adicionar-rastreio`, {
        transportador: {
            cnh: rastreio.transportador.cnh
        },
        status: rastreio.status
    },{
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const postUserRemetente = async (remetente) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")
    
    const response = await logFlexApi.post(`/remetentes`, {
        cnpj: remetente.cnpj,
	    nomeFantasia: remetente.nomeFantasia,
	    razaoSocial: remetente.razaoSocial,
	    email: remetente.email,
	    telefone: remetente.telefone,
	    numeroRua: remetente.numeroRua,
	    complemento: remetente.complemento,
	    senha: remetente.senha,
	    endereco: {
            cep: remetente.endereco.cep,
            rua: remetente.endereco.rua,
            bairro: remetente.endereco.bairro,
            cidade: remetente.endereco.cidade,
            uf: remetente.endereco.uf
        }
    }, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })
    
    
    return response
}


export const postUserDestinatario = async (destinatario) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")
    
    
    const response = await logFlexApi.post(`/destinatarios`, {
        nome: destinatario.nome,
        cpf: destinatario.cpf,
	    email: destinatario.email,
	    telefone: destinatario.telefone,
	    numeroRua: destinatario.numeroRua,
        complemento: destinatario.complemento,
	    senha: destinatario.senha,
        dataNascimento: destinatario.dataNascimento,
	    endereco: {
            cep: destinatario.endereco.cep,
            rua: destinatario.endereco.rua,
            bairro: destinatario.endereco.bairro,
            cidade: destinatario.endereco.cidade,
            uf: destinatario.endereco.uf
        }
    }, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })
    
    return response
}

export const postUserTransportador = async (transportador) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")
    
    const response = await logFlexApi.post(`/transportadores`, {
        nome: transportador.nome,
        cpf: transportador.cpf,
	    email: transportador.email,
	    telefone: transportador.telefone,
	    numeroRua: transportador.numeroRua,
	    cnh: transportador.cnh,
        complemento: transportador.complemento,
	    senha: transportador.senha,
        dataNascimento: transportador.dataNascimento,
	    endereco: {
            cep: transportador.endereco.cep,
            rua: transportador.endereco.rua,
            bairro: transportador.endereco.bairro,
            cidade: transportador.endereco.cidade,
            uf: transportador.endereco.uf
        }
    }, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })
    
    return response
}

export const postUserConferente = async (conferente) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")
    
    const response = await logFlexApi.post(`/conferentes`, {
        nome: conferente.nome,
        cpf: conferente.cpf,
	    email: conferente.email,
	    telefone: conferente.telefone,
	    numeroRua: conferente.numeroRua,
        complemento: conferente.complemento,
	    senha: conferente.senha,
        dataNascimento: conferente.dataNascimento,
	    endereco: {
            cep: conferente.endereco.cep,
            rua: conferente.endereco.rua,
            bairro: conferente.endereco.bairro,
            cidade: conferente.endereco.cidade,
            uf: conferente.endereco.uf
        }
    }, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })
    
    return response
}

export const postCentroDistribuicao = async (centroDistribuicao) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")
    
    const response = await logFlexApi.post(`/centrodistribuicoes`, {
        cnpj: centroDistribuicao.cnpj,
	    nomeFantasia: centroDistribuicao.nomeFantasia,
	    razaoSocial: centroDistribuicao.razaoSocial,
	    email: centroDistribuicao.email,
	    telefone: centroDistribuicao.telefone,
	    numeroRua: centroDistribuicao.numeroRua,
	    complemento: centroDistribuicao.complemento,
	    endereco: {
            cep: centroDistribuicao.endereco.cep,
            rua: centroDistribuicao.endereco.rua,
            bairro: centroDistribuicao.endereco.bairro,
            cidade: centroDistribuicao.endereco.cidade,
            uf: centroDistribuicao.endereco.uf
        }
    }, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })
    
    return response
}

export const postPacote = async (pacote) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.post(`/pacotes`, {
        descricao: pacote.descricao,
        peso: pacote.peso,
        comprimento: pacote.comprimento,
        largura: pacote.largura,
        altura: pacote.altura,
        destinatario: {
            cpf: pacote.destinatario.cpf
        },
        remetente: {
            cnpj: pacote.remetente.cnpj
        }
    }, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const putActiveDistributionCenter = async (cnpj) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.put(`/centrodistribuicoes/ativar/${cnpj} `, null, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const putDesactiveDistributionCenter = async (cnpj) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.put(`/centrodistribuicoes/inativar/${cnpj} `,null, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const putActiveRemetentes = async (cnpj) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.put(`/remetentes/ativar/${cnpj} `, null, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const putDesactiveRemetentes = async (cnpj) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.put(`/remetentes/inativar/${cnpj} `,null, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const putActiveConferentes = async (cpf) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.put(`/conferentes/ativar/${cpf} `,null,{
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const putDesactiveConferentes = async (cpf) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.put(`/conferentes/inativar/${cpf} `,null,{
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const putActiveDestinatarios = async (cpf) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.put(`/destinatarios/ativar/${cpf} `, null, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const putDesactiveDestinatarios = async (cpf) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.put(`/destinatarios/inativar/${cpf} `, null, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const putActiveTransportadores = async (cpf) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.put(`/transportadores/ativar/${cpf} `, null, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

export const putDesactiveTransportadores = async (cpf) => {
    const TOKEN = localStorage.getItem("Access_TOKEN")

    const response = await logFlexApi.put(`/transportadores/inativar/${cpf} `, null, {
        headers: {
            Authorization: `${PREFIX} ${TOKEN}`
        }
    })

    return response
}

