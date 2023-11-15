import { LitElement, html } from 'lit-element';
import stylesScss from './CrudEntraySalidarutasStyle';

class CrudEntraySalidaRutas extends LitElement {
  static get properties() {
    return {
      rutas: { type: Array },
      nuevaRuta: {
        type: Object,
        attribute: false,
      },
      rutaSeleccionada: { type: Object, attribute: false },
      mostrarFormulario: { type: Boolean },
      filtroNombre: { type: String },
    };
  }

  constructor() {
    super();
    this.rutas = JSON.parse(localStorage.getItem('rutas')) || [];
    this.nuevaRuta = {
      nombre: '',
      inicio: '',
      fin: '',
    };
    this.rutaSeleccionada = null;
    this.mostrarFormulario = false;
    this.filtroNombre = '';
  }

  agregarRuta() {
    if (this.validarDatosRuta()) {
      const nuevaRuta = {
        nombre: this.nuevaRuta.nombre,
        inicio: this.nuevaRuta.inicio,
        fin: this.nuevaRuta.fin,
      };

      this.rutas.push(nuevaRuta);

      this.nuevaRuta = {
        nombre: '',
        inicio: '',
        fin: '',
      };

      localStorage.setItem('rutas', JSON.stringify(this.rutas));

      this.requestUpdate();
      alert('Ruta agregada exitosamente');
    } else {
      alert('Por favor, complete todos los campos correctamente');
    }
  }

  validarDatosRuta() {
    const { nombre, inicio, fin } = this.nuevaRuta;
    return (
      nombre.trim() !== '' &&
      inicio.trim() !== '' &&
      fin.trim() !== ''
    );
  }

  abrirFormularioActualizar(ruta) {
    this.rutaSeleccionada = ruta;
    this.mostrarFormulario = true;
  }

  cerrarFormularioActualizar() {
    this.mostrarFormulario = false;
    this.rutaSeleccionada = null;
  }

  actualizarRuta() {
    this.cerrarFormularioActualizar();

    localStorage.setItem('rutas', JSON.stringify(this.rutas));

    alert('Ruta actualizada exitosamente');
  }

  eliminarRuta(index) {
    if (confirm('¿Desea eliminar esta ruta?')) {
      this.rutas.splice(index, 1);

      localStorage.setItem('rutas', JSON.stringify(this.rutas));

      this.requestUpdate();
      alert('Ruta eliminada exitosamente');
    }
  }

  static get styles() {
    return [stylesScss];
  }

  render() {
    const rutasFiltradas = this.rutas.filter(
      (ruta) =>
        ruta.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
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
        <h1 class="text-center">Tiempo de Rutas</h1>
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">Sistema de entrada y salida</h2>
                <div class="form-group">
                  <label for="nombreRuta">Nombre de la Ruta:</label>
                  <input
                    type="text"
                    .value="${this.nuevaRuta.nombre}"
                    @input="${(e) => (this.nuevaRuta.nombre = e.target.value)}"
                    class="form-control"
                    placeholder="Nombre de la ruta"
                  />
                </div>
                <label for="inicio">Inicio (Hora) de la Ruta:</label>
                <input
                  type="time"
                  .value="${this.nuevaRuta.inicio}"
                  @input="${(e) => (this.nuevaRuta.inicio = e.target.value)}"
                  class="form-control"
                />
                <label for="fin">Fin (Hora) de la Ruta:</label>
                <input
                  type="time"
                  .value="${this.nuevaRuta.fin}"
                  @input="${(e) => (this.nuevaRuta.fin = e.target.value)}"
                  class="form-control"
                />
                <button @click="${this.agregarRuta}" class="btn btn-primary btn-block">Agregar</button>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">Lista de Rutas</h2>
                <div class="form-group">
                  <label for="filtroNombre">Filtrar por Nombre de la Ruta:</label>
                  <input
                    type="text"
                    id="filtroNombre"
                    .value="${this.filtroNombre}"
                    @input="${(e) => (this.filtroNombre = e.target.value)}"
                    class="form-control"
                    placeholder="Nombre de la ruta"
                  />
                </div>
                <ul class="list-group">
                  ${rutasFiltradas.map((ruta, index) => html`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <span>Nombre de la Ruta: ${ruta.nombre}</span>
                        <br />
                        <span>Inicio: ${ruta.inicio}</span>
                        <br />
                        <span>Fin: ${ruta.fin}</span>
                        <br />
                      </div>
                      <div class="btn-group">
                        <button @click="${() => this.abrirFormularioActualizar(ruta)}" class="btn btn-primary btn-sm">Actualizar</button>
                        <button @click="${() => this.eliminarRuta(index)}" class="btn btn-danger btn-sm">Eliminar</button>
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
                    <h5 class="modal-title">Actualizar Ruta</h5>
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
                        .value="${this.rutaSeleccionada.nombre}"
                        @input="${(e) => (this.rutaSeleccionada.nombre = e.target.value)}"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group">
                      <label for="inicio">Inicio (Hora) de la Ruta:</label>
                      <input
                        type="time"
                        id="inicio"
                        .value="${this.rutaSeleccionada.inicio}"
                        @input="${(e) => (this.rutaSeleccionada.inicio = e.target.value)}"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group">
                      <label for="fin">Fin (Hora) de la Ruta:</label>
                      <input
                        type="time"
                        id="fin"
                        .value="${this.rutaSeleccionada.fin}"
                        @input="${(e) => (this.rutaSeleccionada.fin = e.target.value)}"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="${this.cerrarFormularioActualizar}">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="${this.actualizarRuta}">Actualizar</button>
                  </div>
                </div>
              </div>
            </div>
          `
        : ''}
    `;
  }
}

customElements.define('crud-rutas', CrudEntraySalidaRutas);
