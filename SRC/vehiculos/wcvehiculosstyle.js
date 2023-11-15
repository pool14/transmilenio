import { css } from "lit-element";

export default css`
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

.container {
  margin-top: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 20px;
}

form {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  color: #000;
  font-size: 16px;
  font-weight: bold;
}

.btn {
  background-color: #007ACC;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
}

.btn-registrar {
  background-color: #007ACC;
}

.btn-guardar {
  background-color: #28a745;
}

.btn-cancelar {
  background-color: #dc3545;
}

.mensaje {
  color: #28a745;
  font-weight: bold;
}

.table-container {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th {
  background-color: #007ACC;
  color: #fff;
  text-align: left;
}

table th,
table td {
  padding: 10px;
  border: 1px solid #ccc;
}

.btn-editar,
.btn-eliminar {
  background-color: #007ACC;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
}

.btn-editar {
  background-color: #007ACC;
}

.btn-eliminar {
  background-color: #dc3545;
}

  
  `;