import { LitElement, html, css } from "lit-element";
import stylesScss from './loginStyle.js';
import { renderPage } from './main.js';

export class Login extends LitElement {
  constructor() {
    super();
    this.mensaje = '';
    this.savedUsername = '';
    this.savedPassword = '';
  }

  connectedCallback() {
    super.connectedCallback();
    
    // Recuperar los datos guardados en localStorage
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    
    if (savedUsername) {
      this.savedUsername = savedUsername;
    }
    
    if (savedPassword) {
      this.savedPassword = savedPassword;
    }
  }

  guardarDatosUsuario(username, password) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }

  ingresarLogin() {
    let username = this.shadowRoot.querySelector('#username').value;
    let password = this.shadowRoot.querySelector('#password').value;
    let recordarCheckbox = this.shadowRoot.querySelector('#recordarCheckbox');

    if (recordarCheckbox.checked) {
      this.guardarDatosUsuario(username, password);
    }

    if (username == null || username == undefined || username == '') {
      this.mensaje = 'Atención... campo username vacío.';
      return false;
    }

    if (password == null || password == undefined || password == '') {
      this.mensaje = 'Atención... campo password vacío.';
      return false;
    } else {
      this.mensaje = '';
      renderPage('index');
    }
  }

  mostrarError() {
    return html`<div>${this.mensaje}</div>`;
  }

  static get properties() {
    return {
      mensaje: {
        type: String,
      },
    };
  }

  static get styles() {
    return [stylesScss];
  }

  render() {
    return html`
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
        crossorigin="anonymous"
      />

      <div
        id="container"
        class="d-flex flex-column align-items-center justify-content-center vh-100"
        style="background: linear-gradient(to right, #F5F2F2 , #F5F2F2);"
      >
        <div
          id="form"
          class="p-5 rounded-5 text-secondary shadow form"
          style="width: 25rem"
        >
          <div class="d-flex justify-content-center">
            <div class="image-container">
              <img
                src="/img/descarga.png"
                alt="login-icon"
                style="height: 15rem"
              >
            </div>
          </div>

          <div class="input-group mt-4">
            <div class="input-group-text">
              <img
                src="/img/username-icon.svg"
                alt="username-icon"
                style="height: 1rem"
              />
            </div>
            <input
              class="form-control"
              type="text"
              id="username"
              placeholder="Username"
              .value=${this.savedUsername}
              @input=${(e) => this.savedUsername = e.target.value}
            >
          </div>

          <div class="input-group mt-4">
            <div class="input-group-text">
              <img
                src="/img/password-icon.svg"
                alt="password-icon"
                style="height: 1rem"
              />
            </div>
            <input
              class="form-control"
              type="password"
              id="password"
              placeholder="Password"
              .value=${this.savedPassword}
              @input=${(e) => this.savedPassword = e.target.value}
            >
          </div>

          <div class="d-flex justify-content-around mt-5">
            <div class="d-flex align-items-center text-black gap-1">
              <input class="form-check-input" type="checkbox" id="recordarCheckbox" />
              <div class="pt-1" style="font-size: 0.9rem">Recuérdame</div>
            </div>
            <div class="pt-1">
              <a
                href="#"
                class="text-decoration-none text-black fw-semibold fst-italic"
                style="font-size: 0.9rem"
                >Recuperar contraseña?</a
              >
            </div>
          </div>
        </div>
        <div
          class="btn btn-info text-white -100 mt-3 fw-semibold shadow-sm"
          style="width: 18rem; height: 2.5rem;"
          @click=${this.ingresarLogin}
        >
          Login
        </div>
        ${this.mostrarError()}
      </div>
    `;
  }
}

customElements.define('login-component', Login);
