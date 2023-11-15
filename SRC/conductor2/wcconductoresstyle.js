import { css } from "lit-element";

export default css`
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  background-color: #007ACC;
  color: #fff;
  padding: 20px 0;
  margin: 0;
}

.container {
  margin-top: 20px;
}

.form-group {
  margin-top: 20px;
}

.card {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
}


ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button {
  background-color: #ff0000;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.blue-button {
  background-color: #007ACC;
  color: #fff;
  border: 1px solid #007ACC;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  display: inline-block;
  margin-left: 10px;
}

.input-button-container {
  display: flex;
  align-items: center;
}

.list-container {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
  border-radius: 5px;
  margin-top: 10px;
}
  `