import styled from 'styled-components';

export const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;

  .menu-container{
  width: 100%;
   
  }

  h1 {
    color: var(--font-color-2);
    font-size: 5rem;
    margin-bottom: 20px;
  }

  .search-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  .search-field {
    width: 70%;
    margin-bottom: 10px;
  }

  .button-container {
    display: flex;
    width: 70%;
    justify-content: center;
    margin-top: 10px;
  }

  .table-container {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;

    th, td {
      padding: 10px;
      position: relative;
      border-bottom: 4px solid #3CA393;
    }

    table th {
    font-family: 'Roboto', sans-serif;
    }

    td {
      background-color: #f2f2f2;
      text-align: center;
      padding: 5px -10px; 
      position: relative;
      border-bottom: 4px solid #3CA393;
      color: #100C05;
    }
  }

  .edit-button, .delete-button {
    font-family: 'Roboto', sans-serif;
    background-color: var(--background-editar-button);
    color:  var(--font-color);
    font-size:16px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    margin-right: 8px;
    cursor:pointer;
  }

  .delete-button {
    background-color: var(--background-excluir-button);
    color:  var(--font-color);
  }

  .edit-form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 20px;
  }

  .edit-input {
    width: 100%;
    max-width: 200px;
    padding: 8px;
    margin-right: 8px;
  }

  .save-button {
    font-family: 'Roboto', sans-serif;
    background-color: var(--background-editar-button);
    color:  var(--font-color);
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    margin-top: 10px;
    font-size:16px;
    cursor:pointer;
  }

  @media (max-width: 1120px) {
    h1 {
      font-size: 2rem;
    }

    .search-field {
      width: 100%;
    }

    .button-container {
      width: 100%;
    }

    .edit-input {
      max-width: 100%;
      margin-right: 0;
    }

    table {
      th, td {
        display: block;
        width: 100%;
        box-sizing: border-box;
      }
    }
  }
`;
