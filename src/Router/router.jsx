import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from '../pages/Login';
import Home from '../pages/HomePage';
import RegisterSender from '../pages/RegisterSender';
import RegisterChecker from '../pages/RegisterChecker';
import RegisterRecipient from '../pages/RegisterRecipient';
import RegisterDistribuitionCenter from '../pages/RegisterDistribuitionCenter';
import RegisterPackage from '../pages/RegisterPackage';
import Checker from "../pages/Checker";
import Sender from "../pages/Sender";
import Recipient from "../pages/Recipient";
import DistributionCenter from "../pages/DistributionCenter";
import Transporter from "../pages/Transporter";
import Bundle from "../pages/Bundle";
import TrackingPackage from "../pages/TrackingPackage";
import PackageDetail from "../pages/PackageDetail";
import PrivateRoutes from "./PrivateRoutes";
import PublicOnlyRoutes from "./PublicOnlyRoutes";
import RegisterTransporter from "../pages/RegisterTransporter";




export default function Router() {
    return (
            <BrowserRouter>
                <Routes>
                    
                    {/* Rota padrão para redirecionar para a página de login */}
                    <Route element={<PublicOnlyRoutes path={"/home"}/>}>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/*" element={<Login />} />
                    </Route>
                    
                    {/* rotas protegidas */}
                    <Route element={<PrivateRoutes path={"/login"}/>}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/cadastro-remetente" element={<RegisterSender />} />
                        <Route path="/cadastro-conferente" element={<RegisterChecker />} />
                        <Route path="/cadastro-destinatario" element={<RegisterRecipient />} />
                        <Route path="/cadastro-centro-distribuicao" element={<RegisterDistribuitionCenter />} />
                        <Route path="/cadastro-pacote" element={<RegisterPackage />} />
                        <Route path="/cadastro-transportador" element={<RegisterTransporter />} />
                        <Route path="/listar-conferentes" element={<Checker />} />
                        <Route path="/listar-remetentes" element={<Sender />} />
                        <Route path="/listar-destinatarios" element={<Recipient />} />
                        <Route path="/listar-centro-distribuicao" element={<DistributionCenter />} />
                        <Route path="/listar-transportadores" element={<Transporter />} />
                        <Route path="/listar-pacotes" element={<Bundle />} />
                        <Route path="/rastreio-pacote" element={<TrackingPackage />} />
                        <Route path="/detalhe-pacote" element={<PackageDetail/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
    );
}
