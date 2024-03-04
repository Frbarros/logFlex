import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchField from '../../components/SearchField';
import Button from '../../components/Button';
import { Container } from './styles';
import Menu from '../../components/Menu';
import { getAllRemetente, putActiveRemetentes, putDesactiveRemetentes } from '../../service/api/LogFlexApi';
import Modal from '../../components/Modal';

export default function Sender() {
  const [senders, setSenders] = useState([]);
  const [senderEdit, setSenderEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalSenders, setOriginalSenders] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    isSuccess: false,
    title: ''
  })

  const navigate = useNavigate();

  useEffect(() => {
    getAllRemetente().then((res) => {
      if (res.status === 200) {
        const data = res.data;
        setSenders(data);
        setOriginalSenders(data);
      }
    });
  }, [modal.title]);

  const deleteSender = (id) => {
    const sender = senders.filter((sender) => sender.id === id)[0];
    if (sender.status) {
      putDesactiveRemetentes(sender.cnpj)
        .then((res) => {
          if (res.status === 200) {
            setModal({
              isOpen: true,
              isSuccess: true,
              title: 'Remetente desativado com sucesso'
            })
            
          }
        })
        .catch((error) => {

          setModal({
            isOpen: true,
            isSuccess: false,
            title: error.response.data.mensagem ?? "Falha ao desativar remetente"
          })
        })

    } else {
      putActiveRemetentes(sender.cnpj)
        .then((res) => {
          if (res.status === 200) {
            setModal({
              isOpen: true,
              isSuccess: true,
              title: 'Remetente ativado com sucesso'
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

  const editSender = (id) => {
    const senderToEdit = senders.find((sender) => sender.id === id);
    setSenderEdit({ ...senderToEdit });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const newSenders = senders.map((sender) =>
      sender.id === senderEdit.id ? senderEdit : sender
    );
    setSenders(newSenders);
    setSenderEdit(null);
  };

  const handleSubmitSender = (event) => {
    event.preventDefault();
    navigate('/cadastro-remetente');
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setSenders(originalSenders);
    } else {
      const filteredSenders = originalSenders.filter((sender) =>
        ['razaoSocial', 'nomeFantasia', 'cnpj', 'telefone', 'email', 'dataCadastro'].some(
          (campo) => {
            const campoValue = sender[campo];
            if (campoValue !== null && campoValue !== undefined) {
              const stringCampo = campoValue.toString().toLowerCase();
              return stringCampo.includes(value);
            }
            return false;
          }
        )
      );

      setSenders(filteredSenders);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSenders(originalSenders);
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
        <Header title="" hasLogo={true} />
        <Modal isOpen={modal.isOpen} isSuccess={modal.isSuccess} customTitle={modal.title} onClose={closeModal} />
        <div className="menu-container">
          <Menu />
        </div>

        <h1 tabIndex={15} aria-label="Lista de Remetente">
          Remetente
        </h1>
        <div className="search-container">
          <div className="search-field">
            <SearchField value={searchTerm} onChange={handleSearchChange} onClear={handleClear} />
          </div>
          <div className="button-container" tabIndex={21} aria-label="Botão para Cadastrar remetente">
            <Button title="Cadastrar remetente" onClick={handleSubmitSender} />
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
              {senders.map((sender) => (
                <tr key={sender.id}>
                  <td tabIndex={22} aria-label={`Razão social: ${sender.razaoSocial}`}>
                    {senderEdit?.id === sender.id ? (
                      <input
                        type="text"
                        value={senderEdit.razaoSocial}
                        onChange={(e) => setSenderEdit({ ...senderEdit, razaoSocial: e.target.value })}
                      />
                    ) : (
                      sender.razaoSocial
                    )}
                  </td>
                  <td tabIndex={23} aria-label={`Nome fantasia: ${sender.nomeFantasia}`}>
                    {senderEdit?.id === sender.id ? (
                      <input
                        type="text"
                        value={senderEdit.nomeFantasia}
                        onChange={(e) => setSenderEdit({ ...senderEdit, nomeFantasia: e.target.value })}
                      />
                    ) : (
                      sender.nomeFantasia
                    )}
                  </td>
                  <td tabIndex={24} aria-label={`CNPJ: ${sender.cnpj}`}>
                    {senderEdit?.id === sender.id ? (
                      <input
                        type="text"
                        value={senderEdit.cnpj}
                        onChange={(e) => setSenderEdit({ ...senderEdit, cnpj: e.target.value })}
                      />
                    ) : (
                      sender.cnpj
                    )}
                  </td>
                  <td tabIndex={25} aria-label={`Telefone: ${sender.telefone}`}>
                    {senderEdit?.id === sender.id ? (
                      <input
                        type="text"
                        value={senderEdit.telefone}
                        onChange={(e) => setSenderEdit({ ...senderEdit, telefone: e.target.value })}
                      />
                    ) : (
                      sender.telefone
                    )}
                  </td>
                  <td tabIndex={26} aria-label={`E-mail: ${sender.email}`}>
                    {senderEdit?.id === sender.id ? (
                      <input
                        type="text"
                        value={senderEdit.email}
                        onChange={(e) => setSenderEdit({ ...senderEdit, email: e.target.value })}
                      />
                    ) : (
                      sender.email
                    )}
                  </td>

                  <td tabIndex={27} aria-label={`Endereço: ${sender.endereco.cidade} - ${sender.endereco.uf}`}>
                    {`${sender.endereco.cidade} - ${sender.endereco.uf}`}
                  </td>
                  <td tabIndex={28} aria-label={`Status: ${sender.status}`}>
                    {senderEdit?.id === sender.id ? (
                      <input
                        type="text"
                        value={senderEdit.status}
                        onChange={(e) =>
                          setSenderEdit({ ...senderEdit, status: e.target.value })
                        }
                      />
                    ) : (
                      `${sender.status ? 'Ativo' : 'Desativado'}`
                    )}
                  </td>
                  <td>
                    {senderEdit?.id === sender.id ? (
                      <button
                        className="save-button"
                        onClick={saveEdit}
                        tabIndex={29}
                        aria-label={`Botão de Salvar edição de: ${sender.nomeFantasia}`}
                      >
                        Salvar
                      </button>
                    ) : (
                      <>
                        <button
                          className="delete-button"
                          onClick={() => deleteSender(sender.id)}
                          tabIndex={31}
                          aria-label={`Botão de Excluir remetente: ${sender.nomeFantasia}`}
                        >
                          {sender.status ? "Desativar" : "Ativar"}
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
