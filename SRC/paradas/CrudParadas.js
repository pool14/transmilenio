import { LitElement, html, css } from 'lit-element';
import stylesScss from './CrudParadasStyle';

class Paradas extends LitElement {
  static get properties() {
    return {
      paradas: { type: Array },
      nuevaParada: { type: String },
      editIndex: { type: Number },
    };
  }

  constructor() {
    super();
    this.paradas = JSON.parse(localStorage.getItem('paradas')) || ["Molinos", "Consuelo", "Quiroga", "Zanta Zusia "];
    this.nuevaParada = "";
    this.editIndex = -1;
  }

  actualizarLocalStorage() {
    localStorage.setItem('paradas', JSON.stringify(this.paradas));
  }

  agregarParada() {
    if (this.nuevaParada.trim() !== "") {
      if (this.editIndex === -1) {
        this.paradas = [...this.paradas, this.nuevaParada];
        this.actualizarLocalStorage();
        alert("Parada agregada exitosamente");
      } else {
        this.paradas[this.editIndex] = this.nuevaParada;
        this.editIndex = -1;
        this.actualizarLocalStorage();
        alert("Parada actualizada exitosamente");
      }
      this.nuevaParada = "";
      this.requestUpdate();
    } else {
      alert("Por favor, ingrese el nombre de la parada");
    }
  }

  editarParada(index) {
    if (window.confirm("¿Desea editar esta parada?")) {
      this.editIndex = index;
      this.nuevaParada = this.paradas[index];
      this.requestUpdate();
    } else {
      alert("Edición cancelada");
    }
  }

  eliminarParada(index) {
    if (confirm("¿Desea eliminar esta parada?")) {
      this.paradas.splice(index, 1);
      this.actualizarLocalStorage();
      this.requestUpdate();
      alert("Parada eliminada exitosamente");
    } else {
      alert("Eliminación cancelada");
    }
  }

  guardarCambiosModal() {
    if (this.nuevaParada.trim() !== "") {
      this.paradas[this.editIndex] = this.nuevaParada;
      this.editIndex = -1;
      this.actualizarLocalStorage();
      this.requestUpdate();
      alert("Parada actualizada exitosamente");
    } else {
      alert("Por favor, ingrese el nombre de la parada");
    }
  }

  static get styles() {
    return [stylesScss];
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <div class="container mt-5">
        <h1 class="text-center">Gestión de Paradas</h1>
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">Agregar Nueva Parada</h2>
                <div class="form-group">
                  <input
                    type="text"
                    .value="${this.nuevaParada}"
                    @input="${(e) => (this.nuevaParada = e.target.value)}"
                    class="form-control"
                    placeholder="Nombre de la parada"
                  />
                </div>
                <button @click="${this.agregarParada}" class="btn btn-primary btn-block">Agregar</button>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">Lista de Paradas</h2>
                <ul class="list-group">
                  ${this.paradas.map((parada, index) => html`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      ${parada}
                      <div class="btn-group">
                        <button @click="${() => this.editarParada(index)}" class="btn btn-primary btn-sm">Editar</button>
                        <button @click="${() => this.eliminarParada(index)}" class="btn btn-danger btn-sm">Eliminar</button>
                      </div>
                    </li>
                  `)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de edición -->
      <div class="modal" style="${this.editIndex !== -1 ? 'display: block;' : ''}">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Editar Parada</h4>
            <span class="close" @click="${() => (this.editIndex = -1)}">&times;</span>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                .value="${this.nuevaParada}"
                @input="${(e) => (this.nuevaParada = e.target.value)}"
                class="form-control"
                placeholder="Nombre de la parada"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button @click="${this.guardarCambiosModal}" class="btn btn-primary">Guardar cambios</button>
            <button @click="${() => (this.editIndex = -1)}" class="btn btn-secondary">Cerrar</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('paradas-e', Paradas);
