import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchField from '../../components/SearchField';
import Button from '../../components/Button';
import { Container } from './styles';
import Menu from '../../components/Menu';
import { getAllTransportador, putActiveTransportadores, putDesactiveTransportadores } from '../../service/api/LogFlexApi';
import Modal from '../../components/Modal';

export default function Transporter() {
  const navigate = useNavigate();
  const [transporters, setTransporters] = useState([]);
  const [transporterEdit, setTransporterEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalTransporters, setOriginalTransporters] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    isSuccess: false,
    title: ''
  })

  useEffect(() => {
    getAllTransportador().then(res => {
      if (res.status === 200) {
        const data = res.data;
        setTransporters(data);
        setOriginalTransporters(data);
      }
    });
  }, []);
  useEffect(() => {
    getAllTransportador().then(res => {
      if (res.status === 200) {
        const data = res.data;
        setTransporters(data);
        setOriginalTransporters(data);
      }
    })
  },[modal.title])

  const deleteTransporter = (id) => {
    const transporter = transporters.filter((transporter) => transporter.id === id)[0];
    if (transporter.status) {
      putDesactiveTransportadores(transporter.cpf)
        .then((res) => {
          if (res.status === 200) {
            setModal({
              isOpen: true,
              isSuccess: true,
              title: 'Transportador desativado com sucesso'
            })
            
          }
        })
        .catch((error) => {

          setModal({
            isOpen: true,
            isSuccess: false,
            title: error.response.data.mensagem ?? "Falha ao desativar transportador"
          })
        })

    } else {
      putActiveTransportadores(transporter.cpf)
        .then((res) => {
          if (res.status === 200) {
            setModal({
              isOpen: true,
              isSuccess: true,
              title: 'Transportador ativado com sucesso'
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

  const editTransporter = (id) => {
    const transporterToEdit = transporters.find((transporter) => transporter.id === id);
    setTransporterEdit({ ...transporterToEdit });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const newTransporters = transporters.map((transporter) =>
      transporter.id === transporterEdit.id ? transporterEdit : transporter
    );
    setTransporters(newTransporters);
    setTransporterEdit(null);
  };

  const handleSubmitTransporter = (event) => {
    event.preventDefault();
    navigate('/cadastro-transportador');
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setTransporters(originalTransporters);
    } else {
      const filteredTransporters = originalTransporters.filter((transporter) =>
        ['nome', 'cnh', 'cpf', 'telefone', 'email', 'endereco', 'dataCadastro'].some((campo) => {
          const campoValue = transporter[campo];
          if (campoValue !== null && campoValue !== undefined) {
            const stringCampo = campoValue.toString().toLowerCase();
            return stringCampo.includes(value);
          }
          return false;
        })
      );

      setTransporters(filteredTransporters);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setTransporters(originalTransporters);
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

        <h1 tabIndex={15} aria-label="Lista de Transportadores">
          Transportadores
        </h1>
        <div className="search-container">
          <div className="search-field">
            <SearchField
              value={searchTerm}
              onChange={handleSearchChange}
              onClear={handleClear}
            />
          </div>
          <div className="button-container" tabIndex={21} aria-label="Botão para Cadastrar transportadores">
            <Button
              title="Cadastrar transportador"
              onClick={handleSubmitTransporter}
            />
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CNH</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Endereço</th>
                <th>Data de Nascimento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transporters.map((transporter) => (
                <tr key={transporter.id}>
                  <td tabIndex={22} aria-label={`Nome: ${transporter.nome}`}>
                    {transporterEdit?.id === transporter.id ? (
                      <input
                        type="text"
                        value={transporterEdit.nome}
                        onChange={(e) => setTransporterEdit({ ...transporterEdit, nome: e.target.value })}
                      />
                    ) : (
                      transporter.nome
                    )}
                  </td>
                  <td tabIndex={23} aria-label={`CNH: ${transporter.cnh}`}>
                    {transporterEdit?.id === transporter.id ? (
                      <input
                        type="text"
                        value={transporterEdit.cnh}
                        onChange={(e) => setTransporterEdit({ ...transporterEdit, cnh: e.target.value })}
                      />
                    ) : (
                      transporter.cnh
                    )}
                  </td>
                  <td tabIndex={24} aria-label={`CPF: ${transporter.cpf}`}>
                    {transporterEdit?.id === transporter.id ? (
                      <input
                        type="text"
                        value={transporterEdit.cpf}
                        onChange={(e) => setTransporterEdit({ ...transporterEdit, cpf: e.target.value })}
                      />
                    ) : (
                      transporter.cpf
                    )}
                  </td>
                  <td tabIndex={25} aria-label={`Telefone: ${transporter.telefone}`}>
                    {transporterEdit?.id === transporter.id ? (
                      <input
                        type="text"
                        value={transporterEdit.telefone}
                        onChange={(e) => setTransporterEdit({ ...transporterEdit, telefone: e.target.value })}
                      />
                    ) : (
                      transporter.telefone
                    )}
                  </td>
                  <td tabIndex={26} aria-label={`E-mail: ${transporter.email}`}>
                    {transporterEdit?.id === transporter.id ? (
                      <input
                        type="text"
                        value={transporterEdit.email}
                        onChange={(e) => setTransporterEdit({ ...transporterEdit, email: e.target.value })}
                      />
                    ) : (
                      transporter.email
                    )}
                  </td>

                  <td tabIndex={27} aria-label={`Endereço: ${transporter.endereco.cidade} - ${transporter.endereco.uf}`}>
                    {`${transporter.endereco.cidade} - ${transporter.endereco.uf}`}
                  </td>
                  <td tabIndex={28} aria-label={`Data de cadastro: ${transporter.dataNascimento}`}>
                    {transporterEdit?.id === transporter.id ? (
                      <input
                        type="text"
                        value={transporterEdit.dataNascimento}
                        onChange={(e) =>
                          setTransporterEdit({ ...transporterEdit, dataCadastro: e.target.value })
                        }
                      />
                    ) : (
                      transporter.dataNascimento
                    )}
                  </td>
                  <td>
                    {transporterEdit?.id === transporter.id ? (
                      <button
                        className="save-button"
                        onClick={saveEdit}
                        tabIndex={29}
                        aria-label={`Botão de Salvar edição de: ${transporter.nome}`}
                      >
                        Salvar
                      </button>
                    ) : (
                      <>
                        <button
                          className="delete-button"
                          onClick={() => deleteTransporter(transporter.id)}
                          tabIndex={31}
                          aria-label={`Botão de Excluir transporte: ${transporter.nome}`}
                        >
                          {transporter.status ? "Desativar" : "Ativar"}
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
