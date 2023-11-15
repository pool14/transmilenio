import { css } from "lit-element";

    export default css `
    body {
        background: #000000;
    }
    
    .form {
        background: linear-gradient(to right, #F5F2F2, #F5F2F2);
        padding: 98px;
        border-radius: 20px;
    }
    
    .form-check-input {
        margin-right: 10px;
    }
    
    .input-group-text {
        background-color: #ADADAD; /* Cambio a un color azul claro para que coincida con el segundo bloque */
        color: white;
    }
    
    .form-control::placeholder {
        color: #000000; /* Cambio a un color azul claro para que coincida con el segundo bloque */
    }
    
    .form-control {
        background-color: #ADADAD; /* Cambio a un color azul claro para que coincida con el segundo bloque */
        color: white;
    }
    
    .btn {
        background: linear-gradient(to right, #C6C5C5, #C6C5C5);
        border-radius: 0 0 20px 20px;
        border: none;
    }
    
    /* Estilos para la imagen */
    .image-container {
        position: relative;
    }
    
    .image-container img {
        position: relative;
        z-index: 1;
        margin-top: -8.5rem;
    }
    `