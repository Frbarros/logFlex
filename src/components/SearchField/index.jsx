import React from 'react';
import SearchIcon from "../../img/ic-search.png";
import XIcon from "../../img/ic-x.png";
import { Container } from "./styles";

export default function SearchField({ value, onChange, onClear }) {
  const handleClear = () => {
    onClear();
  };

  return (
    <Container>
      <img
        className="search-icon"
        src={SearchIcon}
        alt="Ícone de pesquisa"
       
      />
      <input
        placeholder="Procure por algo aqui..."
        value={value}
        onChange={onChange}
        aria-label="Campo de pesquisa"
        tabIndex={16}
        id="searchInput"
      />
      <button
        onClick={handleClear}
        className={value ? "clear-button" : "clear-button hidden"}
        aria-label="Limpar pesquisa"
        tabIndex={17}
      >
        <img
          className="close-icon"
          src={XIcon}
          alt="Ícone de fechar"
          
        />
      </button>
    </Container>
  );
}
