import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchField from '../../components/SearchField';
import Button from '../../components/Button';
import { Container } from './styles';
import Menu from '../../components/Menu';
import { getAllCentroDistribuicoes, putActiveDistributionCenter, putDesactiveDistributionCenter } from '../../service/api/LogFlexApi';
import Modal from '../../components/Modal';

export default function DistributionCenter() {
  const [distributionCenters, setDistributionCenters] = useState([]);
  const [distributionCenterEdit, setDistributionCenterEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalDistributionCenters, setOriginalDistributionCenters] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    isSuccess: false,
    title: ''
  })

  useEffect(() => {
    getAllCentroDistribuicoes().then(res => {
      if (res.status === 200) {
        setDistributionCenters(res.data);
        setOriginalDistributionCenters(res.data)
      }
    });
  }, []);

  useEffect(() => {
    getAllCentroDistribuicoes().then(res => {
      if (res.status === 200) {
        setDistributionCenters(res.data);
      }
    })
  }, [modal.title])

  const deleteDistributionCenter = (id) => {
    const distributionCenter = distributionCenters.filter((distributionCenter) => distributionCenter.id === id)[0];
    if (distributionCenter.status) {
      putDesactiveDistributionCenter(distributionCenter.cnpj)
        .then((res) => {
          if (res.status === 200) {
            setModal({
              isOpen: true,
              isSuccess: true,
              title: 'Centro de distribuição desativado com sucesso'
            })
            
          }
        })
        .catch((error) => {

          setModal({
            isOpen: true,
            isSuccess: false,
            title: error.response.data.mensagem ?? "Falha ao desativar centro de distribuição"
          })
        })

    } else {
      putActiveDistributionCenter(distributionCenter.cnpj)
        .then((res) => {
          if (res.status === 200) {
            setModal({
              isOpen: true,
              isSuccess: true,
              title: 'Centro de distribuição ativado com sucesso'
            })
            
          }
        })
        .catch((error) => {

          setModal({
            isOpen: true,
            isSuccess: false,
            title: error.response.data.mensagem
          })
        })

    }
  };

  const editDistributionCenter = (id) => {
    const distributionCenterToEdit = distributionCenters.find(
      (distributionCenter) => distributionCenter.id === id
    );
    setDistributionCenterEdit({ ...distributionCenterToEdit });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const newDistributionCenters = distributionCenters.map((distributionCenter) =>
      distributionCenter.id === distributionCenterEdit.id ? distributionCenterEdit : distributionCenter
    );
    setDistributionCenters(newDistributionCenters);
    setDistributionCenterEdit(null);
  };

  const navigate = useNavigate();

  const handleSubmitDistributionCenter = (event) => {
    event.preventDefault();
    navigate('/cadastro-centro-distribuicao');
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);


    if (!value) {
      setDistributionCenters(originalDistributionCenters);
    } else {
    const filteredDistributionCenters = originalDistributionCenters.filter((distributionCenter) =>
      ['razaoSocial', 'nomeFantasia', 'cnpj', 'telefone', 'email', 'endereco', 'dataCadastro'].some(
        (campo) => {
          const campoValue = distributionCenter[campo];
          if (campoValue !== null && campoValue !== undefined) {
            const stringCampo = campoValue.toString().toLowerCase();
            return stringCampo.includes(value);
          }
          return false;
        }
      )
    );

    setDistributionCenters(filteredDistributionCenters);
  };
 }
  const handleClear = () => {
    setSearchTerm('');
    setDistributionCenters(originalDistributionCenters);
      
  };

  

  const closeModal = () => {
    setModal({
      ...modal,
      isOpen: false
    })

  }

  return (
    <>
      <Container>
        <Header title="" hasLogo={true} isLogged={true} />
        <Modal isOpen={modal.isOpen} isSuccess={modal.isSuccess} customTitle={modal.title} onClose={closeModal} />

        <div className='menu-container'>
          <Menu/>
        </div>

        <h1 tabIndex={15} aria-label="Lista de Centro Distribuição">
          Centro Distribuição
        </h1>
        <div className="search-container">
          <div className="search-field">
            <SearchField
              value={searchTerm}
              onChange={handleSearchChange}
              onClear={handleClear}
            />
          </div>
          <div className="button-container" tabIndex={21} aria-label="Botão para Cadastrar centro distribuição">
            <Button
              title="Cadastrar centro distribuição"
              onClick={handleSubmitDistributionCenter}
            />
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Razão social</th>
                <th>Nome fantasia</th>
                <th>CNPJ</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Endereço</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {distributionCenters.map((distributionCenter) => (
                <tr key={distributionCenter.id}>
                  <td tabIndex={22} aria-label={`Razão social: ${distributionCenter.razaoSocial}`}>
                    {distributionCenterEdit?.id === distributionCenter.id ? (
                      <input
                        type="text"
                        value={distributionCenterEdit.razaoSocial}
                        onChange={(e) =>
                          setDistributionCenterEdit({
                            ...distributionCenterEdit,
                            razaoSocial: e.target.value,
                          })
                        }
                      />
                    ) : (
                      distributionCenter.razaoSocial
                    )}
                  </td>
                  <td tabIndex={23} aria-label={`Nome fantasia: ${distributionCenter.nomeFantasia}`}>
                    {distributionCenterEdit?.id === distributionCenter.id ? (
                      <input
                        type="text"
                        value={distributionCenterEdit.nomeFantasia}
                        onChange={(e) =>
                          setDistributionCenterEdit({
                            ...distributionCenterEdit,
                            nomeFantasia: e.target.value,
                          })
                        }
                      />
                    ) : (
                      distributionCenter.nomeFantasia
                    )}
                  </td>
                  <td tabIndex={24} aria-label={`CNPJ: ${distributionCenter.cnpj}`}>
                    {distributionCenterEdit?.id === distributionCenter.id ? (
                      <input
                        type="text"
                        value={distributionCenterEdit.cnpj}
                        onChange={(e) =>
                          setDistributionCenterEdit({
                            ...distributionCenterEdit,
                            cnpj: e.target.value,
                          })
                        }
                      />
                    ) : (
                      distributionCenter.cnpj
                    )}
                  </td>
                  <td tabIndex={25} aria-label={`Telefone: ${distributionCenter.telefone}`}>
                    {distributionCenterEdit?.id === distributionCenter.id ? (
                      <input
                        type="text"
                        value={distributionCenterEdit.telefone}
                        onChange={(e) =>
                          setDistributionCenterEdit({
                            ...distributionCenterEdit,
                            telefone: e.target.value,
                          })
                        }
                      />
                    ) : (
                      distributionCenter.telefone
                    )}
                  </td>
                  <td tabIndex={26} aria-label={`E-mail: ${distributionCenter.email}`}>
                    {distributionCenterEdit?.id === distributionCenter.id ? (
                      <input
                        type="text"
                        value={distributionCenterEdit.email}
                        onChange={(e) =>
                          setDistributionCenterEdit({
                            ...distributionCenterEdit,
                            email: e.target.value,
                          })
                        }
                      />
                    ) : (
                      distributionCenter.email
                    )}
                  </td>
                  <td tabIndex={27} aria-label={`Endereço: ${distributionCenter.endereco}`}>
                      {`${distributionCenter.endereco.cidade} - ${distributionCenter.endereco.uf}`}
                  </td>
                  <td tabIndex={28} aria-label={`Status: ${distributionCenter.status}`}>
                    {distributionCenterEdit?.id === distributionCenter.id ? (
                      <input
                        type="text"
                        value={distributionCenterEdit.status}
                        onChange={(e) =>
                          setDistributionCenterEdit({
                            ...distributionCenterEdit,
                            status: e.target.value,
                          })
                        }
                      />
                    ) : (
                      `${distributionCenter.status ? 'Ativo' : 'Desativado'}`
                    )}
                  </td>
                  <td>
                    {distributionCenterEdit?.id === distributionCenter.id ? (
                      <button
                        className="save-button"
                        onClick={saveEdit}
                        tabIndex={29}
                        aria-label={`Botão de Salvar edição de: ${distributionCenter.nomeFantasia}`}
                      >
                        Salvar
                      </button>
                    ) : (
                      <>
                        <button
                          className="delete-button"
                          onClick={() => deleteDistributionCenter(distributionCenter.id)}
                          tabIndex={31}
                          aria-label={`Botão de Excluir centro distribuição: ${distributionCenter.nomeFantasia}`}
                        >
                          {distributionCenter.status ? "Desativar" : "Ativar"}
                        </button>
                      </>
                    )}
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
