import { LitElement, html, css } from "lit-element";
import stylesScss from "./wcvehiculosstyle";

class wcVehiculosView extends LitElement {
  constructor() {
    super();
    this.buses = JSON.parse(localStorage.getItem('buses')) || [
      {
        placa: "ABC123",
        ruta: "Ruta 1",
        tipoVehiculo: 2,
      },
      {
        placa: "XYZ789",
        ruta: "Ruta 2",
        tipoVehiculo: 3,
      },
      {
        placa: "123DEF",
        ruta: "Ruta 3",
        tipoVehiculo: 1,
      },
    ];

    this.placa = "";
    this.ruta = "";
    this.tipoVehiculo = 0;
    this.editingIndex = -1;
    this.mensaje = '';
  }

  static get properties() {
    return {
      buses: { type: Array },
      placa: { type: String },
      ruta: { type: String },
      tipoVehiculo: { type: Number },
      editingIndex: { type: Number },
      mensaje: { type: String }
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
      <div class="container">
        <div class="form-container">
          <form>
            <div class="form-group">
              <label for="placa">Placa:</label>
              <input
                type="text"
                class="form-control"
                id="placa"
                .value=${this.placa}
                @input=${this.actualizarPlaca}
              />
            </div>
            <div class "form-group">
              <label for="ruta">Ruta:</label>
              <input
                type="text"
                class="form-control"
                id="ruta"
                .value=${this.ruta}
                @input=${this.actualizarRuta}
              />
            </div>
            <div class="form-group">
              <label for="tipoVehiculo">Tipo de Vehículo (Cantidad de Vagones):</label>
              <input
                type="number"
                class="form-control"
                id="tipoVehiculo"
                .value=${this.tipoVehiculo}
                @input=${this.actualizarTipoVehiculo}
              />
            </div>
            ${this.editingIndex !== -1
        ? html`
                  <button
                    type="button"
                    class="btn btn-guardar"
                    @click=${this.guardarEdicion}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    class="btn btn-cancelar"
                    @click=${this.cancelarEdicion}
                  >
                    Cancelar
                  </button>
                `
        : html`
                  <button
                    type="button"
                    class="btn btn-registrar"
                    @click=${this.registrarVehiculo}
                  >
                    Registrar
                  </button>
                `}
            <div class="mensaje">${this.mensaje}</div>
          </form>
        </div>
        <div class="table-container">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Ruta</th>
                <th>Tipo de Vehículo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${this.buses.map(
          (bus, index) => html`
                  <tr>
                    <td>
                      ${this.editingIndex === index
              ? html`<input type="text" .value=${bus.placa} @input=${e => this.buses[index].placa = e.target.value}>`
              : bus.placa}
                    </td>
                    <td>
                      ${this.editingIndex === index
              ? html`<input type="text" .value=${bus.ruta} @input=${e => this.buses[index].ruta = e.target.value}>`
              : bus.ruta}
                    </td>
                    <td>
                      ${this.editingIndex === index
              ? html`<input type="number" .value=${bus.tipoVehiculo} @input=${e => this.buses[index].tipoVehiculo = parseInt(e.target.value, 10)}>`
              : bus.tipoVehiculo}
                    </td>
                    <td>
                      ${this.editingIndex === index
              ? html`
                            <button class="btn btn-editar" @click=${() => this.guardarEdicion(index)}>Guardar</button>
                            <button class="btn btn-cancelar" @click=${() => this.cancelarEdicion(index)}>Cancelar</button>
                          `
              : html`
                            <button class="btn btn-editar" @click=${() => this.editarVehiculo(index)}>Editar</button>
                            <button class="btn btn-eliminar" @click=${() => this.eliminarVehiculo(index)}>Eliminar</button>
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

  actualizarPlaca(e) {
    this.placa = e.target.value;
  }

  actualizarRuta(e) {
    this.ruta = e.target.value;
  }

  actualizarTipoVehiculo(e) {
    this.tipoVehiculo = parseInt(e.target.value, 10);
  }

  registrarVehiculo() {
    if (this.placa && this.ruta && this.tipoVehiculo > 0) {
      this.buses.push({
        placa: this.placa,
        ruta: this.ruta,
        tipoVehiculo: this.tipoVehiculo,
      });
      this.limpiarCampos();
      this.guardarDatosLocales();
      this.mensaje = 'Vehículo registrado con éxito';
      alert(this.mensaje);
    } else {
      this.mensaje = 'Por favor, complete todos los campos antes de registrar el vehículo.';
      alert(this.mensaje);
    }
  }

  editarVehiculo(index) {
    this.editingIndex = index;
  }

  guardarEdicion(index) {
    this.editingIndex = -1;
    this.guardarDatosLocales();
    this.mensaje = 'Edición guardada con éxito';
    alert(this.mensaje);
  }

  cancelarEdicion(index) {
    this.editingIndex = -1;
    this.mensaje = '';
  }

  eliminarVehiculo(index) {
    if (index >= 0 && index < this.buses.length) {
      this.buses.splice(index, 1);
      this.guardarDatosLocales();
      this.mensaje = 'Vehículo eliminado con éxito';
      alert(this.mensaje);
    }
  }

  limpiarCampos() {
    this.placa = "";
    this.ruta = "";
    this.tipoVehiculo = 0;
  }

  guardarDatosLocales() {
    localStorage.setItem('buses', JSON.stringify(this.buses));
  }
}

customElements.define("wc-vehiculos-view", wcVehiculosView);
