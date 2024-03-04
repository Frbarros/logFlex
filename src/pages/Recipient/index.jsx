import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchField from '../../components/SearchField';
import Button from '../../components/Button';
import { Container } from './styles';
import Menu from '../../components/Menu';
import { getAllDestinatario, putActiveDestinatarios, putDesactiveDestinatarios } from '../../service/api/LogFlexApi';
import Modal from '../../components/Modal';

export default function Recipient() {
  const [recipients, setRecipients] = useState([]);
  const [recipientEdit, setRecipientEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalRecipients, setOriginalRecipients] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    isSuccess: false,
    title: ''
  })

  useEffect(() => {
    getAllDestinatario().then((res) => {
      if (res.status === 200) {
        const data = res.data;
        setRecipients(data);
        setOriginalRecipients(data);
      }
    });
  }, []);

  useEffect(() => {
    getAllDestinatario().then((res) => {
      if (res.status === 200) {
        const data = res.data;
        setRecipients(data);
        setOriginalRecipients(data);
      }
    })
  },[modal.title])

  const deleteRecipient = (id) => {
    const recipient = recipients.filter((recipient) => recipient.id === id)[0];
    if (recipient.status) {
      putDesactiveDestinatarios(recipient.cpf)
        .then((res) => {
          if (res.status === 200) {
            setModal({
              isOpen: true,
              isSuccess: true,
              title: 'Destinatário desativado com sucesso'
            })
            
          }
        })
        .catch((error) => {

          setModal({
            isOpen: true,
            isSuccess: false,
            title: error.response.data.mensagem ?? "Falha ao desativar destinatário"
          })
        })

    } else {
      putActiveDestinatarios(recipient.cpf)
        .then((res) => {
          if (res.status === 200) {
            setModal({
              isOpen: true,
              isSuccess: true,
              title: 'Conferente ativado com sucesso'
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

  const editRecipient = (id) => {
    const recipientToEdit = recipients.find((recipient) => recipient.id === id);
    setRecipientEdit({ ...recipientToEdit });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const newRecipients = recipients.map((recipient) =>
      recipient.id === recipientEdit.id ? recipientEdit : recipient
    );
    setRecipients(newRecipients);
    setRecipientEdit(null);
  };

  const navigate = useNavigate();

  const handleSubmitRecipient = (event) => {
    event.preventDefault();
    navigate('/cadastro-destinatario');
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setRecipients(originalRecipients);
    } else {
      const filteredRecipients = originalRecipients.filter((recipient) =>
        ['nome', 'cpf', 'telefone', 'email', 'endereco', 'dataNascimento'].some((campo) => {
          const campoValue = recipient[campo];
          if (campoValue !== null && campoValue !== undefined) {
            const stringCampo = campoValue.toString().toLowerCase();
            return stringCampo.includes(value);
          }
          return false;
        })
      );

      setRecipients(filteredRecipients);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setRecipients(originalRecipients);
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

        <h1 tabIndex={15} aria-label="Lista de Destinatários">
          Destinatários
        </h1>
        <div className="search-container">
          <div className="search-field">
            <SearchField
              value={searchTerm}
              onChange={handleSearchChange}
              onClear={handleClear}
            />
          </div>
          <div className="button-container" tabIndex={21} aria-label="Botão para Cadastrar destinatário">
            <Button
              title="Cadastrar destinatário"
              onClick={handleSubmitRecipient}
            />
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Endereço</th>
                <th>Data de Nascimento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((recipient) => (
                <tr key={recipient.id}>
                  <td tabIndex={22} aria-label={`Nome: ${recipient.nome}`}>
                    {recipientEdit?.id === recipient.id ? (
                      <input
                        type="text"
                        value={recipientEdit.nome}
                        onChange={(e) => setRecipientEdit({ ...recipientEdit, nome: e.target.value })}
                      />
                    ) : (
                      recipient.nome
                    )}
                  </td>

                  <td tabIndex={23} aria-label={`CPF: ${recipient.cpf}`}>
                    {recipientEdit?.id === recipient.id ? (
                      <input
                        type="text"
                        value={recipientEdit.cpf}
                        onChange={(e) => setRecipientEdit({ ...recipientEdit, cpf: e.target.value })}
                      />
                    ) : (
                      recipient.cpf
                    )}
                  </td>
                  <td tabIndex={24} aria-label={`Telefone: ${recipient.telefone}`}>
                    {recipientEdit?.id === recipient.id ? (
                      <input
                        type="text"
                        value={recipientEdit.telefone}
                        onChange={(e) => setRecipientEdit({ ...recipientEdit, telefone: e.target.value })}
                      />
                    ) : (
                      recipient.telefone
                    )}
                  </td>
                  <td tabIndex={25} aria-label={`E-mail: ${recipient.email}`}>
                    {recipientEdit?.id === recipient.id ? (
                      <input
                        type="text"
                        value={recipientEdit.email}
                        onChange={(e) => setRecipientEdit({ ...recipientEdit, email: e.target.value })}
                      />
                    ) : (
                      recipient.email
                    )}
                  </td>

                  <td tabIndex={26} aria-label={`Endereço: ${recipient.endereco.cidade} - ${recipient.endereco.uf}`}>
                    {`${recipient.endereco.cidade} - ${recipient.endereco.uf}`}
                  </td>
                  <td tabIndex={27} aria-label={`Data de Nascimento: ${recipient.dataNascimento}`}>
                    {recipientEdit?.id === recipient.id ? (
                      <input
                        type="text"
                        value={recipientEdit.dataNascimento}
                        onChange={(e) =>
                          setRecipientEdit({ ...recipientEdit, dataNascimento: e.target.value })
                        }
                      />
                    ) : (
                      `${recipient.dataNascimento}`
                    )}
                  </td>
                  <td>
                    {recipientEdit?.id === recipient.id ? (
                      <button
                        className="save-button"
                        onClick={saveEdit}
                        tabIndex={28}
                        aria-label={`Botão de Salvar edição de: ${recipient.nome}`}
                      >
                        Salvar
                      </button>
                    ) : (
                      <>
                        <button
                          className="delete-button"
                          onClick={() => deleteRecipient(recipient.id)}
                          tabIndex={30}
                          aria-label={`Botão de Excluir destinatário: ${recipient.nome}`}
                        >
                          {recipient.status ? "Desativar" : "Ativar"}
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
