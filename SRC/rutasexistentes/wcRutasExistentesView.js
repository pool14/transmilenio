import { LitElement, html } from 'lit-element';
import stylesScss from "./wcRutasExistentesStyle";

class WcRutasExistentesView extends LitElement {
  constructor() {
    super();
    this.rutasExistentes = [
      { id: 1, nombreRuta: 'B18', paradas: '15', horarios: 'L-V | 04:30 AM - 10:00 PM S | 05:00 AM - 09:30 PM', estado: 'Activa' },
      { id: 2, nombreRuta: 'K10', paradas: '16', horarios: 'L-S | 04:00 AM - 11:00 PM D-F | 04:30 AM - 10:00 PM', estado: 'Activa' },
      { id: 3, nombreRuta: 'F60', paradas: '12', horarios: 'L-D | 05:00 AM - 10:00 PM', estado: 'Activa' },
    ];
    this.editIndex = -1;
    this.nombreRuta = '';
    this.paradas = '';
    this.horarios = '';
    this.estado = '';
  }

  static get properties() {
    return {
      rutasExistentes: { type: Array },
      editIndex: { type: Number },
      nombreRuta: { type: String },
      paradas: { type: String },
      horarios: { type: String },
      estado: { type: String },
    };
  }

  static get styles() {
    return [stylesScss];
  }

  render() {
    return html`
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <div class="container">
        <div class="table-container">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Nombre de la Ruta</th>
                <th>Paradas</th>
                <th>Horarios</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${this.rutasExistentes.map(
      (ruta, index) => html`
                  <tr>
                    <td>${this.editIndex === index ? html`<input type="text" .value=${ruta.nombreRuta} @input=${e => this.nombreRuta = e.target.value}>` : ruta.nombreRuta}</td>
                    <td>${this.editIndex === index ? html`<input type="text" .value=${ruta.paradas} @input=${e => this.paradas = e.target.value}>` : ruta.paradas}</td>
                    <td>${this.editIndex === index ? html`<input type="text" .value=${ruta.horarios} @input=${e => this.horarios = e.target.value}>` : ruta.horarios}</td>
                    <td>${this.editIndex === index ? html`<input type="text" .value=${ruta.estado} @input=${e => this.estado = e.target.value}>` : ruta.estado}</td>
                    <td>
                      ${this.editIndex === index
          ? html`
                            <button class="btn btn-editar" @click=${() => this.guardarEdicion(index)}>Guardar</button>
                            <button class="btn btn-cancelar" @click=${() => this.cancelarEdicion(index)}>Cancelar</button>
                          `
          : html`
                            <button class="btn btn-editar" @click=${() => this.editarRuta(index)}>Editar</button>
                            <button class="btn btn-eliminar" @click=${() => this.eliminarRuta(index)}>Eliminar</button>
                          `}
                    </td>
                  </tr>
                `
    )}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  editarRuta(index) {
    this.editIndex = index;
    const ruta = this.rutasExistentes[index];
    this.nombreRuta = ruta.nombreRuta;
    this.paradas = ruta.paradas;
    this.horarios = ruta.horarios;
    this.estado = ruta.estado;
  }

  guardarEdicion(index) {
    const rutaEditada = {
      nombreRuta: this.nombreRuta,
      paradas: this.paradas,
      horarios: this.horarios,
      estado: this.estado,
    };

    this.rutasExistentes[index] = rutaEditada;
    this.cancelarEdicion(index);
    alert("Ruta editada exitosamente.");
  }

  cancelarEdicion(index) {
    this.editIndex = -1;
    this.nombreRuta = '';
    this.paradas = '';
    this.horarios = '';
    this.estado = '';
  }

  eliminarRuta(index) {
    if (index >= 0 && index < this.rutasExistentes.length) {
      this.rutasExistentes.splice(index, 1);
      this.requestUpdate();
      alert("Ruta eliminada exitosamente.");
    }
  }
}

customElements.define('wc-rutas-existentes-view', WcRutasExistentesView);
