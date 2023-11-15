import { LitElement, html } from 'lit-element';
import stylesScss from './rutasStyle';

class Rutas extends LitElement {
  static get properties() {
    return {
      rutas: { type: Array },
      nuevaRuta: {
        type: Object,
        attribute: false,
      },
      mostrarFormulario: { type: Boolean },
      rutaSeleccionada: { type: Object, attribute: false },
    };
  }

  constructor() {
    super();
    // Intenta cargar los datos desde localStorage, si no hay, establece valores predeterminados
    this.rutas = JSON.parse(localStorage.getItem('rutas')) || [];
    this.nuevaRuta = {
      nombre: '',
      paradas: 0,
      tiempoEntrada: '',
      tiempoSalida: '',
      disponible: true,
    };
    this.mostrarFormulario = false;
    this.rutaSeleccionada = null;
  }

  agregarRuta() {
    if (this.validarDatosRuta()) {
      if (this.rutaSeleccionada === null) {
        // Agrega una nueva ruta
        this.rutas = [
          ...this.rutas,
          { ...this.nuevaRuta },
        ];
        this.mostrarAlerta("Ruta agregada con éxito.");
      } else {
        // Actualiza la ruta seleccionada
        this.rutas[this.rutaSeleccionada] = { ...this.nuevaRuta };
        this.rutaSeleccionada = null;
        this.mostrarAlerta("Ruta actualizada con éxito.");
      }
      this.limpiarCampos();
      this.guardarDatosEnLocalStorage();
      this.requestUpdate(); // Actualiza la vista después de modificar la lista
    } else {
      this.mostrarAlerta("Por favor, complete todos los campos obligatorios.");
    }
  }

  validarDatosRuta() {
    const { nombre, paradas, tiempoEntrada, tiempoSalida } = this.nuevaRuta;
    return nombre.trim() !== '' && paradas > 0 && tiempoEntrada.trim() !== '' && tiempoSalida.trim() !== '';
  }

  editarRuta(index) {
    this.rutaSeleccionada = index;
    this.nuevaRuta = { ...this.rutas[index] };
    this.mostrarFormulario = true; // Muestra el modal de actualización al editar
  }

  eliminarRuta(index) {
    if (confirm("¿Desea eliminar esta ruta?")) {
      this.rutas.splice(index, 1);
      this.guardarDatosEnLocalStorage();
      this.mostrarAlerta("Ruta eliminada con éxito.");
      this.requestUpdate(); // Actualiza la vista después de modificar la lista
    }
  }

  mostrarAlerta(mensaje) {
    alert(mensaje);
  }

  limpiarCampos() {
    this.nuevaRuta = {
      nombre: '',
      paradas: 0,
      tiempoEntrada: '',
      tiempoSalida: '',
      disponible: true,
    };
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  guardarDatosEnLocalStorage() {
    localStorage.setItem('rutas', JSON.stringify(this.rutas));
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
        <h1 class="text-center">Registro de Rutas</h1>
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">Agregar Nueva Ruta</h2>
                <div class="form-group">
                  <label for="nombreRuta">Nombre de la Ruta</label>
                  <input
                    id="nombreRuta"
                    type="text"
                    class="form-control"
                    .value="${this.nuevaRuta.nombre}"
                    @input="${(e) => (this.nuevaRuta.nombre = e.target.value)}"
                  />
                </div>
                <div class="form-group">
                  <label for="paradas">Paradas</label>
                  <input
                    id="paradas"
                    type="number"
                    class="form-control"
                    .value="${this.nuevaRuta.paradas}"
                    @input="${(e) => (this.nuevaRuta.paradas = parseInt(e.target.value))}"
                  />
                </div>
                <div class="form-group">
                  <label for="tiempoEntrada">Tiempo de Entrada</label>
                  <input
                    id="tiempoEntrada"
                    type="time"
                    class="form-control"
                    .value="${this.nuevaRuta.tiempoEntrada}"
                    @input="${(e) => (this.nuevaRuta.tiempoEntrada = e.target.value)}"
                  />
                </div>
                <div class="form-group">
                  <label for="tiempoSalida">Tiempo de Salida</label>
                  <input
                    id="tiempoSalida"
                    type="time"
                    class="form-control"
                    .value="${this.nuevaRuta.tiempoSalida}"
                    @input="${(e) => (this.nuevaRuta.tiempoSalida = e.target.value)}"
                  />
                </div>
                <div class="form-group">
                  <label for="estado">Estado</label>
                  <select
                    id="estado"
                    class="form-control"
                    @change="${(e) => (this.nuevaRuta.disponible = e.target.value === 'disponible')}"
                  >
                    <option value="disponible" ?selected="${this.nuevaRuta.disponible}">Disponible</option>
                    <option value="no disponible" ?selected="${!this.nuevaRuta.disponible}">No Disponible</option>
                  </select>
                </div>
                <button @click="${this.agregarRuta}" class="btn btn-primary btn-block">
                  ${this.rutaSeleccionada === null ? 'Agregar' : 'Actualizar'}
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">Lista de Rutas</h2>
                <ul class="list-group">
                  ${this.rutas.map((ruta, index) => html`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <span>Nombre de la Ruta: ${ruta.nombre}</span>
                        <br/>
                        <span>Paradas: ${ruta.paradas}</span>
                        <br />
                        <span>Tiempo de Entrada: ${ruta.tiempoEntrada}</span>
                        <br />
                        <span>Tiempo de Salida: ${ruta.tiempoSalida}</span>
                        <br />
                        <span>Estado: ${ruta.disponible ? 'Disponible' : 'No Disponible'}</span>
                      </div>
                      <div class="btn-group">
                        <button @click="${() => this.editarRuta(index)}" class="btn btn-primary btn-sm">Editar</button>
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

      <!-- Modal de actualización -->
      <div class="modal" tabindex="-1" role="dialog" style="display: ${this.mostrarFormulario ? 'block' : 'none'};">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${this.rutaSeleccionada === null ? 'Agregar' : 'Actualizar'} Ruta</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="${this.cerrarFormulario}">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                  <label for="nombreRuta">Nombre de la Ruta</label>
                  <input
                    id="nombreRuta"
                    type="text"
                    class="form-control"
                    .value="${this.nuevaRuta.nombre}"
                    @input="${(e) => (this.nuevaRuta.nombre = e.target.value)}"
                  />
                </div>
                <div class="form-group">
                  <label for="paradas">Paradas</label>
                  <input
                    id="paradas"
                    type="number"
                    class="form-control"
                    .value="${this.nuevaRuta.paradas}"
                    @input="${(e) => (this.nuevaRuta.paradas = parseInt(e.target.value))}"
                  />
                </div>
                <div class="form-group">
                  <label for="tiempoEntrada">Tiempo de Entrada</label>
                  <input
                    id="tiempoEntrada"
                    type="time"
                    class="form-control"
                    .value="${this.nuevaRuta.tiempoEntrada}"
                    @input="${(e) => (this.nuevaRuta.tiempoEntrada = e.target.value)}"
                  />
                </div>
                <div class="form-group">
                  <label for="tiempoSalida">Tiempo de Salida</label>
                  <input
                    id="tiempoSalida"
                    type="time"
                    class="form-control"
                    .value="${this.nuevaRuta.tiempoSalida}"
                    @input="${(e) => (this.nuevaRuta.tiempoSalida = e.target.value)}"
                  />
                </div>
                <div class="form-group">
                  <label for="estado">Estado</label>
                  <select
                    id="estado"
                    class="form-control"
                    @change="${(e) => (this.nuevaRuta.disponible = e.target.value === 'disponible')}"
                  >
                    <option value="disponible" ?selected="${this.nuevaRuta.disponible}">Disponible</option>
                    <option value="no disponible" ?selected="${!this.nuevaRuta.disponible}">No Disponible</option>
                  </select>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="${this.cerrarFormulario}">Cancelar</button>
              <button type="button" class="btn btn-primary" @click="${this.agregarRuta}">
                ${this.rutaSeleccionada === null ? 'Agregar' : 'Actualizar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('rutas-r', Rutas);
