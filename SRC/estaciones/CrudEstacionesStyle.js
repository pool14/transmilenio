import { css } from 'lit-element';

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

   .card {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 60px;
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
`;
