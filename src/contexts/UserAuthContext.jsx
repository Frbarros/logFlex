import { createContext, useEffect, useState } from "react";
import { checkToken, getUserByToken } from "../service/api/LogFlexApi";
import { logar } from "../service/api/LogFlexApi";



export const userAuthContext = createContext({})


export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [isLoggedIn, setLoggedIn] = useState(false);


    useEffect(() => {

        const verifyToken = async () => {

            if(localStorage.getItem('Access_TOKEN')) {
                try {
                    const response = await checkToken();
                    
                    if (!response) {
                        localStorage.removeItem('Access_TOKEN');
                    } else {
                        
                        const userResponse = await getUserByToken();

                        setUser(userResponse);
                        setLoggedIn(true);
                    }
                } catch (error) {
                    console.error("Erro ao verificar token:", error.message);
                    
                    localStorage.removeItem('Access_TOKEN');
                    setLoggedIn(false);
                    setUser({});
                }
            }
        }
        
        verifyToken()
    },[])


    const Login = async (email, password) => {
        const {data, status} = await logar(email, password)

        if (status === 200) {

            const tokenWithoutPrefix = data.token.slice(7)
            localStorage.setItem('Access_TOKEN',tokenWithoutPrefix)
            
            const response = await getUserByToken()

            
            setUser(response)
            setLoggedIn(true)
        } else {
            throw new Error("Erro ao realizar login")
        }
    };


    const Logout = () => {
        
        localStorage.removeItem("Access_TOKEN")
        setLoggedIn(false)
        setUser({})
    }

    const Module = {
        SENDER: "Destinatario",
        RECIPIENT: "Remetente",
        DISTRIBUTION_CENTER: "Centro de distribuição",
        TRANSPORTER: "Transportador",
        PACKAGE: "Pacote",
        CHECKER: "Conferente",
        REGISTER_PACKAGE:"Cadastro de pacote",
    }

    const hasPermission = (module) => {
        switch (module) {
            case Module.SENDER:
                if (user.perfil === "GERENTE" || user.perfil === "CONFERENTE") {
                    return true
                } else {
                    return false
                }
            case Module.RECIPIENT:
                if (user.perfil === "GERENTE" || user.perfil === "CONFERENTE") {
                    return true
                } else {
                    return false
                }
            case Module.DISTRIBUTION_CENTER:
                if (user.perfil === "GERENTE" || user.perfil === "CONFERENTE") {
                    return true
                } else {
                    return false
                }
            case Module.TRANSPORTER:
                if (user.perfil === "GERENTE" || user.perfil === "CONFERENTE") {
                    return true
                } else {
                    return false
                }
            case Module.CHECKER:
                if (user.perfil === "GERENTE") {
                    return true
                } else {
                    return false
                }
            case Module.PACKAGE:
                return true
            case Module.REGISTER_PACKAGE:
                if (user.perfil === "GERENTE" || user.perfil === "CONFERENTE") {
                    return true
                } else {
                    return false
                }
            default:
                return false
        }

    }


    return (
        <userAuthContext.Provider value={{user, isLoggedIn, Login, Logout, hasPermission, Module}}>
            {children}
        </userAuthContext.Provider>
    )

}