
import React, { useContext, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchField from '../../components/SearchField';
import Button from '../../components/Button';
import { Container } from './styles';
import Menu from '../../components/Menu';
import Modal from '../../components/Modal';
import { userAuthContext } from '../../contexts/UserAuthContext';
import { getAllpacotes } from '../../service/api/LogFlexApi';


export default function Bundle() {
  const [bundles, setBundles] = useState([]);
  const [bundleEdit, setBundleEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false)
  const {Module, hasPermission} = useContext(userAuthContext)
  const [originalBundles, setOriginalBundles] = useState([]);
  const { user } = useContext(userAuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    getAllpacotes().then(res => {
      if (res.status === 200) {
        const data = res.data;
        setBundles(data);
        setOriginalBundles(data);
      }
    })
  }, []);

  const handleEditTrack = (bundle) => {
    
    navigate("/rastreio-pacote", {state: bundle})
  
  }

  const handleDetailBundle = (bundle) => {
    navigate("/detalhe-pacote", {state: bundle})
  }

  const deleteBundle = (id) => {
    const newBundles = bundles.filter((bundle) => bundle.id !== id);
    setBundles(newBundles);
  };

  const editBundle = (id) => {
    const bundleToEdit = bundles.find((bundle) => bundle.id === id);
    setBundleEdit({ ...bundleToEdit });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const newBundles = bundles.map((bundle) =>
      bundle.id === bundleEdit.id ? bundleEdit : bundle
    );
    setBundles(newBundles);
    setBundleEdit(null);
  };

  const handleSubmitBundle = (event) => {
    event.preventDefault();
     if (hasPermission(Module.REGISTER_PACKAGE)) {
            navigate('/cadastro-pacote');
        } else {
            setIsOpenModal(true)
        }
    
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setBundles(originalBundles);
    } else {
      const filteredBundles = originalBundles.filter((bundle) =>
        ['codigoRastreio', 'dataCadastro', 'descricao', 'dataEnvio', 'dataEntrega', 'status']
          .concat(
            ['remetente.nomeFantasia', 'destinatario.nome']
          )
          .some((campo) => {
            const campoValue = getCampoValue(bundle, campo);
            if (campoValue !== null && campoValue !== undefined) {
              const stringCampo = campoValue.toString().toLowerCase();
              return stringCampo.includes(value);
            }
            return false;
          })
      );
      setBundles(filteredBundles);
    }
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const getCampoValue = (obj, campo) => {
    const campos = campo.split('.');
    return campos.reduce((o, key) => (o && o[key] !== 'undefined' ? o[key] : null), obj);
  };

  return (
    <>
      <Container>
        <Header title="" hasLogo={true} />
        <Modal isOpen={isOpenModal} onClose={closeModal} customTitle="Seu usuário não tem permissão para acessar essa pagina" isSuccess={false}/>
        <div className='menu-container'>
          <Menu />
        </div>
        <h1 tabIndex={15} aria-label="Lista de Pacotes">
          Pacotes
        </h1>
        <div className="search-container">
          <div className="search-field">
            <SearchField
              value={searchTerm}
              onChange={handleSearchChange}
              onClear={handleClear}
            />
          </div>
          <div className="button-container" 
          tabIndex={21} 
          aria-label="Botão para Cadastrar pacotes">
            <Button
              title="Cadastrar pacote"
              onClick={handleSubmitBundle}
            />
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Descrição</th>
                <th>Data cadastro</th>
                <th>Remetente</th>
                <th>Destinatario</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {bundles.map((bundle) => (
                <tr key={bundle.codigoRastreio}>
                  <td tabIndex={22} aria-label={`Codigo: ${bundle.codigoRastreio}`}>
                    {bundle.codigoRastreio}
                  </td>
                  <td tabIndex={23} 
                  aria-label={`Descrição: ${bundle.descricao}`}>
                    {bundle.descricao}
                  </td>
                  <td tabIndex={24} 
                  aria-label={`Data Cadastro: ${bundle.dataCadastro}`}>
                    {bundle.dataCadastro}
                  </td>
                  <td tabIndex={25} 
                  aria-label={`Remetente: ${bundle.remetente.cnpj}`}>
                    {bundle.remetente.nomeFantasia}
                  </td>
                  <td tabIndex={26} aria-label={`Destinatario: ${bundle.destinatario.cpf}`}>
                    {bundle.destinatario.nome}
                  </td>
                  <td tabIndex={27} aria-label={`Status: ${bundle.status}`}>
                    {bundle.status}
                  </td>
                  <td className="actions-column">
                      {(bundle.status === 'ENTREGUE' || bundle.status === 'DEVOLVIDO' || 
                      ['DESTINATARIO','REMETENTE'].includes(user.perfil) || user.perfil === 'TRANSPORTADOR' && bundle.status !== 'EM_TRANSITO') ? (
                      <></>
                      ): ( 
                        <button
                          className="editar-button"
                          onClick={() => handleEditTrack(bundle)}
                          tabIndex={28}
                          aria-label={`Botão de Salvar edição de: ${bundle.codigoRastreio}`}
                        >
                          Editar rastreio
                        </button>
                      )}
                        <button
                         className="detalhe-button space-after-editar"
                         onClick={() => handleDetailBundle(bundle)}
                         tabIndex={29}
                         aria-label={`Botão de Editar destinatário: ${bundle.codigoRastreio}`}
                       >
                         Detalhes
                       </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
      <Footer />
    </>
  );
}
