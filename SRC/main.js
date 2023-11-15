// Importa las vistas
import './vehiculos/wcvehiculosview';
import './conductor2/wcconductorview';
import './entrada_salida/CrudEntraySalidaRutas';
import './estaciones/CrudEstaciones';
import './paradas/CrudParadas';
import './index';
import './login';
import './rutas/rutas';
import './conductor/conductor';
import './vehiculos/wcvehiculosview';
import './paradas/CrudParadas';
import './rutasexistentes/wcRutasExistentesView';



const appContainer = document.getElementById('app');

export function renderPage(pageName) {
  switch (pageName) {
    case 'index':
      appContainer.innerHTML = '<index-entrar></index-entrar>';
      break;
    
  }
}

// Llama a renderPage con la página de inicio por defecto al cargar la aplicación
renderPage('login');