import { LitElement, html } from 'lit-element';
import stylesScss from './wcconductoresstyle';

class WcConductorView extends LitElement {
  static get properties() {
    return {
      conductores: { type: Array },
      nuevoConductor: {
        type: Object,
        attribute: false,
      },
      conductorSeleccionado: { type: Object, attribute: false },
      mostrarFormulario: { type: Boolean },
      filtroNombre: { type: String },
    };
  }

  constructor() {
    super();
    this.conductores = JSON.parse(localStorage.getItem('conductores')) || [];
    this.nuevoConductor = {
      nombre: '',
      numeroDocumento: '',
      placaCarro: '',
      ruta: {
        nombre: '',
        inicio: '',
        fin: '',
      },
    };
    this.conductorSeleccionado = null;
    this.mostrarFormulario = false;
    this.filtroNombre = '';
  }

  agregarConductor() {
    if (this.validarDatosConductor()) {
      const nuevoConductor = {
        nombre: this.nuevoConductor.nombre,
        numeroDocumento: this.nuevoConductor.numeroDocumento,
        placaCarro: this.nuevoConductor.placaCarro,
        ruta: {
          nombre: this.nuevoConductor.ruta.nombre,
          inicio: this.nuevoConductor.ruta.inicio,
          fin: this.nuevoConductor.ruta.fin,
        },
      };

      this.conductores.push(nuevoConductor);

      this.nuevoConductor = {
        nombre: '',
        numeroDocumento: '',
        placaCarro: '',
        ruta: {
          nombre: '',
          inicio: '',
          fin: '',
        },
      };

      localStorage.setItem('conductores', JSON.stringify(this.conductores));

      this.requestUpdate();
      alert('Conductor agregado exitosamente');
    } else {
      alert('Por favor, complete todos los campos correctamente');
    }
  }

  validarDatosConductor() {
    const { nombre, numeroDocumento, placaCarro, ruta } = this.nuevoConductor;
    return (
      nombre.trim() !== '' &&
      numeroDocumento.trim() !== '' &&
      placaCarro.trim() !== '' &&
      ruta.nombre.trim() !== '' &&
      ruta.inicio.trim() !== '' &&
      ruta.fin.trim() !== ''
    );
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
    // Implementa la lógica para actualizar los detalles del conductor
    // Puedes usar this.conductorSeleccionado para obtener el conductor seleccionado
    this.cerrarFormularioActualizar();

    // Guarda datos actualizados en el almacenamiento local
    localStorage.setItem('conductores', JSON.stringify(this.conductores));

    alert('Conductor actualizado exitosamente');
  }

  eliminarConductor(index) {
    if (confirm('¿Desea eliminar este conductor?')) {
      this.conductores.splice(index, 1);

      // Guarda datos actualizados en el almacenamiento local
      localStorage.setItem('conductores', JSON.stringify(this.conductores));

      this.requestUpdate();
      alert('Conductor eliminado exitosamente');
    }
  }

  static get styles() {
    return [stylesScss];
  }

  render() {
    const conductoresFiltrados = this.conductores.filter(
      (conductor) =>
        conductor.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );

    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />

      <div class="container mt-5">
        <h1 class="text-center">Tiempo de Conductores</h1>
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">Agregar Nuevo Conductor</h2>
                <div class="form-group">
                  <label for="nombreRuta">Nombre de la Ruta:</label>
                  <input
                    type="text"
                    .value="${this.nuevoConductor.ruta.nombre}"
                    @input="${(e) => (this.nuevoConductor.ruta.nombre = e.target.value)}"
                    class="form-control"
                    placeholder="Nombre de la ruta"
                  />
                </div>
                <label for="Nombre">Nombre:</label>
                <input
                  type="text"
                  .value="${this.nuevoConductor.nombre}"
                  @input="${(e) => (this.nuevoConductor.nombre = e.target.value)}"
                  class="form-control"
                  placeholder="Nombre del conductor"
                />
                <div class="form-group">
                  <label for="numeroDocumento">Número de documento</label>
                  <input
                    type="number"
                    .value="${this.nuevoConductor.numeroDocumento}"
                    @input="${(e) => (this.nuevoConductor.numeroDocumento = e.target.value)}"
                    class="form-control"
                    placeholder="Número de documento"
                  />
                  <label for="placaCarro">Placa del Carro:</label>
                  <input
                    type="text"
                    .value="${this.nuevoConductor.placaCarro}"
                    @input="${(e) => (this.nuevoConductor.placaCarro = e.target.value)}"
                    class="form-control"
                    placeholder="Placa del carro"
                  />
                  <label for="inicio">Inicio (Hora) del Conductor:</label>
                  <input
                    type="time"
                    .value="${this.nuevoConductor.ruta.inicio}"
                    @input="${(e) => (this.nuevoConductor.ruta.inicio = e.target.value)}"
                    class="form-control"
                  />
                  <label for="fin">Fin (Hora) del Conductor:</label>
                  <input
                    type="time"
                    .value="${this.nuevoConductor.ruta.fin}"
                    @input="${(e) => (this.nuevoConductor.ruta.fin = e.target.value)}"
                    class="form-control"
                  />
                </div>
                <button @click="${this.agregarConductor}" class="btn btn-primary btn-block">Agregar</button>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">Lista de Conductores</h2>
                <div class="form-group">
                  <label for="filtroNombre">Filtrar por Nombre del Conductor:</label>
                  <input
                    type="text"
                    id="filtroNombre"
                    .value="${this.filtroNombre}"
                    @input="${(e) => (this.filtroNombre = e.target.value)}"
                    class="form-control"
                    placeholder="Nombre del conductor"
                  />
                </div>
                <ul class="list-group">
                  ${conductoresFiltrados.map((conductor, index) => html`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <span>Nombre de la Ruta: ${conductor.ruta ? conductor.ruta.nombre : ''}</span>
                        <br /><br />
                        <span>Nombre Conductor : ${conductor.nombre}</span>
                        <br />
                        <span>Número de documento: ${conductor.numeroDocumento}</span>
                        <br />
                        <span>Inicio: ${conductor.ruta ? conductor.ruta.inicio : ''}</span>
                        <br />
                        <span>Fin: ${conductor.ruta ? conductor.ruta.fin : ''}</span>
                        <br />
                        <span>Placa del Carro: ${conductor.placaCarro}</span>
                        <br />
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
                      <label for="nombreRuta">Nombre de la Ruta:</label>
                      <input
                        type="text"
                        id="nombreRuta"
                        .value="${this.conductorSeleccionado.ruta.nombre}"
                        @input="${(e) => (this.conductorSeleccionado.ruta.nombre = e.target.value)}"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group">
                      <label for="nombre">Nombre del conductor</label>
                      <input
                        type="text"
                        id="nombre"
                        .value="${this.conductorSeleccionado.nombre}"
                        @input="${(e) => (this.conductorSeleccionado.nombre = e.target.value)}"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group">
                      <label for="numeroDocumento">Número de documento</label>
                      <input
                        type="number"
                        id="numeroDocumento"
                        .value="${this.conductorSeleccionado.numeroDocumento}"
                        @input="${(e) => (this.conductorSeleccionado.numeroDocumento = e.target.value)}"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group">
                      <label for="placaCarro">Placa del Carro:</label>
                      <input
                        type="text"
                        id="placaCarro"
                        .value="${this.conductorSeleccionado.placaCarro}"
                        @input="${(e) => (this.conductorSeleccionado.placaCarro = e.target.value)}"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group">
                      <label for="inicio">Inicio (Hora) del Conductor:</label>
                      <input
                        type="time"
                        id="inicio"
                        .value="${this.conductorSeleccionado.ruta.inicio}"
                        @input="${(e) => (this.conductorSeleccionado.ruta.inicio = e.target.value)}"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group">
                      <label for="fin">Fin (Hora) del Conductor:</label>
                      <input
                        type="time"
                        id="fin"
                        .value="${this.conductorSeleccionado.ruta.fin}"
                        @input="${(e) => (this.conductorSeleccionado.ruta.fin = e.target.value)}"
                        class="form-control"
                      />
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

customElements.define('wc-conductor-view', WcConductorView);
