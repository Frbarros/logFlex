import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchField from '../../components/SearchField';
import Button from '../../components/Button';
import { Container } from './styles';
import Menu from '../../components/Menu';
import { getAllConferente, putActiveConferentes, putDesactiveConferentes } from '../../service/api/LogFlexApi';
import Modal from '../../components/Modal';

export default function Checker() {
  const [conferentes, setConferentes] = useState([]);
  const [conferenteEditando, setConferenteEditando] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalConferentes, setOriginalConferentes] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    isSuccess: false,
    title: ''
  })

  const navigate = useNavigate();

  useEffect(() => {
    getAllConferente().then((res) => {
      if (res.status === 200) {
        const data = res.data;
        setConferentes(data);
        setOriginalConferentes(data);
      }
    });
  }, []);

  useEffect(() => {
    getAllConferente().then(res => {
      if (res.status === 200) {
        setConferentes(res.data);
      }
    })

  },[modal.title])

  const excluirConferente = (id) => {

    const conferente = conferentes.filter((conferente) => conferente.id === id)[0];
    if (conferente.status) {
      putDesactiveConferentes(conferente.cpf)
        .then((res) => {
          if (res.status === 200) {
            setModal({
              isOpen: true,
              isSuccess: true,
              title: 'Conferente desativado com sucesso'
            })
            
          }
        })
        .catch((error) => {

          setModal({
            isOpen: true,
            isSuccess: false,
            title: error.response.data.mensagem ?? "Falha ao desativar conferente"
          })
        })

    } else {
      putActiveConferentes(conferente.cpf)
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

  const editarConferente = (id) => {
    const conferenteParaEditar = conferentes.find((conferente) => conferente.id === id);
    setConferenteEditando({ ...conferenteParaEditar });
  };

  const salvarEdicao = (e) => {
    e.preventDefault();
    const novosConferentes = conferentes.map((conferente) =>
      conferente.id === conferenteEditando.id ? conferenteEditando : conferente
    );
    setConferentes(novosConferentes);
    setConferenteEditando(null);
  };

  const handleSubmitChecker = (event) => {
    event.preventDefault();
    navigate('/cadastro-conferente');
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setConferentes(originalConferentes);
    } else {
      const filteredConferentes = originalConferentes.filter((conferente) =>
        ['nome', 'email', 'endereco', 'telefone', 'dataNascimento'].some((campo) => {
          const campoValue = conferente[campo];
          if (campoValue !== null && campoValue !== undefined) {
            const stringCampo = campoValue.toString().toLowerCase();
            return stringCampo.includes(value);
          }
          return false;
        })
      );

      setConferentes(filteredConferentes);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setConferentes(originalConferentes);
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
        <div className='menu-container'>
          <Menu />
        </div>

        <h1 tabIndex={15} aria-label="Lista de Conferentes">
          Conferentes
        </h1>
        <div className="search-container">
          <div className="search-field">
            <SearchField value={searchTerm} onChange={handleSearchChange} onClear={handleClear} />
          </div>
          <div className="button-container" tabIndex={21} aria-label="Botão para Cadastrar conferente">
            <Button title="Cadastrar conferente" onClick={handleSubmitChecker} />
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome completo</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Data de Nascimento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {conferentes.map((conferente) => (
                <tr key={conferente.id}>
                  <td tabIndex={22} aria-label={`Nome: ${conferente.nome}`}>
                    {conferenteEditando?.id === conferente.id ? (
                      <input
                        type="text"
                        value={conferenteEditando.nome}
                        onChange={(e) => setConferenteEditando({ ...conferenteEditando, nome: e.target.value })}
                      />
                    ) : (
                      conferente.nome
                    )}
                  </td>
                  <td tabIndex={23} aria-label={`E-mail: ${conferente.email}`}>
                    {conferenteEditando?.id === conferente.id ? (
                      <input
                        type="text"
                        value={conferenteEditando.email}
                        disabled
                        onChange={(e) => setConferenteEditando({ ...conferenteEditando, email: e.target.value })}
                      />
                    ) : (
                      conferente.email
                    )}
                  </td>
                  <td tabIndex={24} aria-label={`Telefone: ${conferente.telefone}`}>
                    {conferenteEditando?.id === conferente.id ? (
                      <input
                        type="text"
                        value={conferenteEditando.telefone}
                        onChange={(e) => setConferenteEditando({ ...conferenteEditando, telefone: e.target.value })}
                      />
                    ) : (
                      conferente.telefone
                    )}
                  </td>
                  <td tabIndex={25} aria-label={`Endereço: ${conferente.endereco.cidade} - ${conferente.endereco.uf}`}>
                    {`${conferente.endereco.cidade} - ${conferente.endereco.uf}`}
                  </td>
                  <td tabIndex={26} aria-label={`Data de Nascimento: ${conferente.dataNascimento}`}>
                    {conferenteEditando?.id === conferente.id ? (
                      <input
                        type="text"
                        value={conferenteEditando.dataNascimento}
                        disabled
                        onChange={(e) =>
                          setConferenteEditando({ ...conferenteEditando, dataNascimento: e.target.value })
                        }
                      />
                    ) : (
                      conferente.dataNascimento
                    )}
                  </td>
                  <td>
                    {conferenteEditando?.id === conferente.id ? (
                      <button
                        className="save-button"
                        onClick={salvarEdicao}
                        tabIndex={27}
                        aria-label={`Botão de Salvar edição de: ${conferente.nome}`}
                      >
                        Salvar
                      </button>
                    ) : (
                      <>
                        <button
                          className="delete-button"
                          onClick={() => excluirConferente(conferente.id)}
                          tabIndex={29}
                          aria-label={`Botão de Excluir conferente: ${conferente.nome}`}
                        >
                          {conferente.status ? "Desativar" : "Ativar"}
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
