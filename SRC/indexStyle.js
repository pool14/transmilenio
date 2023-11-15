import { css } from 'lit-element';

export default css`
  h1 {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin: 20px 0;
  }

  .menu {
    background-color: #333;
    color: #fff;
    padding: 10px 0;
    text-align: center;
  }

  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
  }

  .menu li {
    margin: 0 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-block;
  }

  .menu li:hover {
    font-weight: bold;
    color: #ff6600;
  }

  .menu li:last-child {
    margin-right: 0;
  }

  .contenido {
    padding: 20px;
    background-color: #f7f7f7;
  }

  footer {
    text-align: center;
    background-color: #333;
    color: #fff;
    padding: 10px 0;
  }
   body {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100vh;
      margin: 0;
      overflow: hidden; /* Oculta el desbordamiento horizontal */
    }

    .galeria {
      display: flex;
      transition: transform 0.5s ease; /* Agregamos una transición suave a la propiedad transform */
    }

    .galeria img {
      max-width: 100%;
      height: auto;
    }
`;
