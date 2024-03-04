import axios from "axios"


const ViaCepApi = axios.create({
    
    baseURL: "https://viacep.com.br/ws"
})



export const getEndereco = async (cep) => {

    try {
        const response = await ViaCepApi.get(`/${cep}/json/`)

        return response.data
    } catch (error) {
        throw new console.error(error)
    }
} 