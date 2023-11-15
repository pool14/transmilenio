import { LitElement, html } from 'lit-element';
import stylesScss from './CrudEstacionesStyle';

class Estaciones extends LitElement {
  static get properties() {
    return {
      estaciones: { type: Array },
      nuevaEstacion: { type: String },
    };
  }

  constructor() {
    super();
    // Recupera las estaciones almacenadas en localStorage o usa un valor predeterminado si no hay datos.
    this.estaciones = JSON.parse(localStorage.getItem('estaciones')) || ["Portal Norte", "Héroes", "Museo del Oro", "Las Aguas"];
    this.nuevaEstacion = "";
  }

  agregarEstacion() {
    if (this.nuevaEstacion.trim() !== "") {
      this.estaciones.push(this.nuevaEstacion);
      this.nuevaEstacion = "";
      this.actualizarLocalStorage(); // Actualiza los datos en localStorage
      this.requestUpdate(); // Actualiza la vista después de modificar la lista
      alert("Estación agregada exitosamente");
    } else {
      alert("Por favor, ingrese el nombre de la estación");
    }
  }

  actualizarEstacion(index) {
    const nuevoNombre = prompt("Ingrese el nuevo nombre de la estación:", this.estaciones[index]);
    if (nuevoNombre !== null) {
      this.estaciones[index] = nuevoNombre;
      this.actualizarLocalStorage(); // Actualiza los datos en localStorage
      this.requestUpdate(); // Actualiza la vista después de modificar la lista
      alert("Estación actualizada exitosamente");
    }
  }

  eliminarEstacion(index) {
    if (confirm("¿Desea eliminar esta estación?")) {
      this.estaciones.splice(index, 1);
      this.actualizarLocalStorage(); // Actualiza los datos en localStorage
      this.requestUpdate(); // Actualiza la vista después de modificar la lista
      alert("Estación eliminada exitosamente");
    }
  }

  // Método para actualizar los datos en localStorage
  actualizarLocalStorage() {
    localStorage.setItem('estaciones', JSON.stringify(this.estaciones));
  }

  static get styles() {
    return [stylesScss];
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      
      <div class="container mt-5">
        <h1 class="text-center">Estaciones de Transmilenio</h1>
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">Agregar Nueva Estación</h2>
                <div class="form-group">
                  <input type="text" .value="${this.nuevaEstacion}" @input="${(e) => this.nuevaEstacion = e.target.value}" class="form-control" placeholder="Nombre de la estación">
                </div>
                <button @click="${this.agregarEstacion}" class="btn btn-primary btn-block">Agregar</button>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">Lista de Estaciones</h2>
                <ul class="list-group">
                  ${this.estaciones.map((estacion, index) => html`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      ${estacion}
                      <div class="btn-group">
                        <button @click="${() => this.actualizarEstacion(index)}" class="btn btn-primary btn-sm">Actualizar</button>
                        <button @click="${() => this.eliminarEstacion(index)}" class="btn btn-danger btn-sm">Eliminar</button>
                      </div>
                    </li>
                  `)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('estaciones-e', Estaciones);
