import { css } from 'lit-element';

export default css`
  /* Contenedor principal */
  div {
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    margin: 10px;
  }

  /* Título de la lista */
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
  }

  /* Lista de rutas existentes */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }

  /* Cabecera de la tabla */
  th {
    background-color: #007bff;
    color: #fff;
    padding: 12px;
    text-align: left;
  }

  /* Celdas de la tabla */
  td {
    border: 1px solid #ddd;
    padding: 12px;
  }

  /* Elemento de la lista */
  tr {
    background-color: #ffffff;
  }

  /* Botones de editar y eliminar */
  .btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 5px;
    transition: background-color 0.3s ease;
  }

  .btn:hover {
    background-color: #0056b3;
  }

  .btn-editar {
    background-color: #3498db;
  }

  .btn-editar:hover {
    background-color: #3498db;
  }

  .btn-eliminar {
    background-color: #dc3545;
  }

  .btn-eliminar:hover {
    background-color: #c82333;
  }

  /* Inputs de edición */
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
`;
