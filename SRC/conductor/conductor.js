import { LitElement, html } from 'lit-element';
import stylesScss from './conductorStyle';

class Conductor extends LitElement {
  static get properties() {
    return {
      conductores: { type: Array },
      nuevoConductor: {
        type: Object,
        attribute: false,
      },
      conductorSeleccionado: { type: Object, attribute: false },
      mostrarFormulario: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.conductores = JSON.parse(localStorage.getItem('conductores')) || [];
    this.nuevoConductor = {
      nombre: '',
      tipoDocumento: 'selecciona tu tipo de documento',
      numeroDocumento: '',
      tieneLicencia: false,
      experiencia: 0,
    };
    this.conductorSeleccionado = null;
    this.mostrarFormulario = false;
  }

  guardarEnLocalStorage() {
    localStorage.setItem('conductores', JSON.stringify(this.conductores));
  }

  agregarConductor() {
    if (this.validarDatosConductor()) {
      this.conductores.push({ ...this.nuevoConductor });
      this.nuevoConductor = {
        nombre: '',
        tipoDocumento: 'CC',
        numeroDocumento: '',
        tieneLicencia: false,
        experiencia: 0,
      };
      this.guardarEnLocalStorage();
      this.requestUpdate();
      alert('Conductor agregado exitosamente');
    } else {
      alert('Por favor, complete todos los campos correctamente');
    }
  }

  validarDatosConductor() {
    const { nombre, tipoDocumento, numeroDocumento, tieneLicencia, experiencia } = this.nuevoConductor;
    return nombre.trim() !== '' && numeroDocumento.trim() !== '' && experiencia >= 0;
  }

  abrirFormularioActualizar(conductor) {
    this.conductorSeleccionado = conductor;
    this.mostrarFormulario = true;
  }

  cerrarFormularioActualizar() {
    this.mostrarFormulario = false;
    this.conductorSeleccionado = null;
  }

  actualizarConductor() {
    this.cerrarFormularioActualizar();
    this.guardarEnLocalStorage();
    alert('Conductor actualizado exitosamente');
  }

  eliminarConductor(index) {
    if (confirm('¿Desea eliminar este conductor?')) {
      this.conductores.splice(index, 1);
      this.guardarEnLocalStorage();
      this.requestUpdate();
      alert('Conductor eliminado exitosamente');
    }
  }

  static get styles() {
    return [stylesScss];
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />

      <div class="container mt-5">
        <h1 class="text-center">Registro de Conductores</h1>
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">Agregar Nuevo Conductor</h2>
                <div class="form-group">
                  <label for="Nombre">Nombre:</label>
                  <input
                    type="text"
                    .value="${this.nuevoConductor.nombre}"
                    @input="${(e) => (this.nuevoConductor.nombre = e.target.value)}"
                    class="form-control"
                    placeholder="Nombre del conductor"
                  />
                </div>
                <div class="form-group">
                  <label for="tipoDocumento">Tipo de documento</label>
                  <select
                    id="tipoDocumento"
                    .value="${this.nuevoConductor.tipoDocumento}"
                    @change="${(e) => (this.nuevoConductor.tipoDocumento = e.target.value)}"
                    class="form-control"
                  >
                    <option value="" disabled selected>Seleccione su tipo de documento</option>
                    <option value="CC">CC</option>
                    <option value="CE">CE</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="numero Documento">Numero de documento</label>
                  <input
                    type="number"
                    .value="${this.nuevoConductor.numeroDocumento}"
                    @input="${(e) => (this.nuevoConductor.numeroDocumento = e.target.value)}"
                    class="form-control"
                    placeholder="Número de documento"
                  />
                </div>
                <div class="form-group">
                  <label for="Experiencia (en años)">Experiencia (en años)</label>
                  <input
                    type="number"
                    .value="${this.nuevoConductor.experiencia}"
                    @input="${(e) => (this.nuevoConductor.experiencia = parseInt(e.target.value, 10))}"
                    class="form-control"
                    placeholder="Experiencia (en años)"
                  />
                </div>
                <div class="form-check">
                  <input
                    type="checkbox"
                    ?checked="${this.nuevoConductor.tieneLicencia}"
                    @change="${(e) => (this.nuevoConductor.tieneLicencia = e.target.checked)}"
                    class="form-check-input"
                  />
                  <label class="form-check-label">¿Tiene licencia de conducción?</label>
                </div>
                <button @click="${this.agregarConductor}" class="btn btn-primary btn-block">Agregar</button>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">Lista de Conductores</h2>
                <ul class="list-group">
                  ${this.conductores.map((conductor, index) => html`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>${conductor.nombre}</strong>
                        <br />
                        <span>Tipo de documento: ${conductor.tipoDocumento}</span>
                        <br />
                        <span>Número de documento: ${conductor.numeroDocumento}</span>
                        <br />
                        <span>Licencia de conducción: ${conductor.tieneLicencia ? 'Sí' : 'No'}</span>
                        <br />
                        <span>Experiencia: ${conductor.experiencia} años</span>
                      </div>
                      <div class="btn-group">
                        <button @click="${() => this.abrirFormularioActualizar(conductor)}" class="btn btn-primary btn-sm">Actualizar</button>
                        <button @click="${() => this.eliminarConductor(index)}" class="btn btn-danger btn-sm">Eliminar</button>
                      </div>
                    </li>
                  `)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      ${this.mostrarFormulario
        ? html`
            <div class="modal" tabindex="-1" role="dialog" style="display: block;">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Actualizar Conductor</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="${this.cerrarFormularioActualizar}">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                      <label for="nombre">Nombre del conductor</label>
                      <input
                        type="text"
                        id="nombre"
                        .value="${this.conductorSeleccionado ? this.conductorSeleccionado.nombre : ''}"
                        @input="${(e) => (this.conductorSeleccionado.nombre = e.target.value)}"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group">
                      <label for="tipoDocumento">Tipo de documento</label>
                      <div class="custom-select">
                        <span class="placeholder">Selecciona tu documento</span>
                        <select
                          id="tipoDocumento"
                          .value="${this.conductorSeleccionado ? this.conductorSeleccionado.tipoDocumento : ''}"
                          @change="${(e) => (this.conductorSeleccionado.tipoDocumento = e.target.value)}"
                          class="form-control"
                        >
                          <option value="CC">CC</option>
                          <option value="CE">CE</option>
                        </select>
                      </div>
                    </div>


                    <div class="form-group">
                      <label for="numeroDocumento">Número de documento</label>
                      <input
                        type="text"
                        id="numeroDocumento"
                        .value="${this.conductorSeleccionado ? this.conductorSeleccionado.numeroDocumento : ''}"
                        @input="${(e) => (this.conductorSeleccionado.numeroDocumento = e.target.value)}"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group">
                      <label for="experiencia">Experiencia (en años)</label>
                      <input
                        type="number"
                        id="experiencia"
                        .value="${this.conductorSeleccionado ? this.conductorSeleccionado.experiencia : 0}"
                        @input="${(e) => (this.conductorSeleccionado.experiencia = parseInt(e.target.value, 10))}"
                        class="form-control"
                      />
                    </div>
                    <div class="form-check">
                      <input
                        type="checkbox"
                        id="tieneLicencia"
                        ?checked="${this.conductorSeleccionado ? this.conductorSeleccionado.tieneLicencia : false}"
                        @change="${(e) => (this.conductorSeleccionado.tieneLicencia = e.target.checked)}"
                        class="form-check-input"
                      />
                      <label class="form-check-label" for="tieneLicencia">¿Tiene licencia de conducción?</label>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="${this.cerrarFormularioActualizar}">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="${this.actualizarConductor}">Actualizar</button>
                  </div>
                </div>
              </div>
            </div>
          `
        : ''}
    `;
  }
}

customElements.define('conductor-c', Conductor);
