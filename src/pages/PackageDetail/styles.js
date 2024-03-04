import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  .grid {
    display: grid;
    grid-template-columns: 100%;
    padding-left: 5%;
    padding-right: 5%;
  }

  .grid-col-2 {
    display: grid;
    grid-template-columns: 50% 50%;
  }

  .grid-col-3 {
    display: grid;
    grid-template-columns: 33% 33% 33%;
  }

  .title {
    width: 100%;
    color: #f7b533;
    font-weight: 800;
    font-size: 2rem;
    text-align: center;
  }

  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 5px solid #000;
    font-size: 1.8rem;
    width: 1fr;
    height: 50px;
    align-items: end;
  }

  .list {
    margin-top: 50px;
    margin-bottom: 100px;
  }

  .table {
    width: 100%;
    text-align: center;

    thead > tr {
      height: 30px;
      flex-direction: row;
      justify-content: space-between;
      background-color: var(--background-rastreio);
      font-size: 1.8rem;

    }

    tbody > tr {
      
      font-size: 1.5rem;

    }
    th {
      color: var(--font-color-rastreio);
    }
    
  }

  tbody,
  tr {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 1120px) {
    .grid,
    .grid-col-2,
    .grid-col-3 {
      grid-template-columns: 100%;
    }

    .item {
      font-size: 1.5rem; 
    }
  }
`;
