console.log(
    "%cEtapa Final · Panel de Usuarios",
    "font-weight: bold; color: green; font-size: 15px;",
  );

// ── 1) Datos y clase ──────────────────────────────
const USUARIOS_DB = [
  { id: 1, nombre: 'Ana García', email: 'ana@mail.com', ciudad: 'Santiago' },
  { id: 2, nombre: 'Luis Pérez', email: 'luis@mail.com', ciudad: 'Valparaíso' },
  { id: 3, nombre: 'María López', email: 'maria@mail.com', ciudad: 'Concepción' },
  { id: 4, nombre: 'Carlos Díaz', email: 'carlos@mail.com', ciudad: 'Antofagasta' },
  { id: 5, nombre: 'Sofía Rojas', email: 'sofia@mail.com', ciudad: 'Punta Arenas' },
];

class Usuario {
  #activo = false;

  constructor(datos) {
    Object.assign(this, datos);
  }

  get iniciales() {
    // asumir "Nombre Apellido"
    const partes = this.nombre.split(' ');
    const primera = partes[0]?.[0] ?? '';
    const segunda = partes[1]?.[0] ?? '';
    return (primera + segunda).toUpperCase();
  }

  activar() {
    this.#activo = true;
  }

  get activo() {
    return this.#activo;
  }
}

// ── 2) "Servidor" simulado ────────────────────────
function getUsuarios() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // etapa 4/5: fallo aleatorio
      if (Math.random() < 0.2) {
        return reject(new Error('Servidor caído'));
      }
      resolve(USUARIOS_DB);
    }, 600);
  });
}

function getEstadisticas() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ totalVisitas: 1250, ciudadTop: 'Santiago' });
    }, 400);
  });
}

const barraEl = document.getElementById('barra');
const mensajesEl = document.getElementById('mensajes');
const usuariosEl = document.getElementById('usuarios');

function mostrarMensaje(texto) {
  document.getElementById('mensajes').textContent = texto;
}

function limpiarMensaje() {
  document.getElementById('mensajes').textContent = '';
}

function renderStats(stats) {
  const barraEl = document.getElementById('barra');
  barraEl.textContent = `Total visitas: ${stats.totalVisitas} · Ciudad top: ${stats.ciudadTop}`;
}

function renderUsuarios(mapaUsuarios) {
  const usuariosEl = document.getElementById('usuarios');
  usuariosEl.innerHTML = '';

  mapaUsuarios.forEach(usuario => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';

    const card = document.createElement('article');
    card.className = 'card h-100 bg-dark text-light';

    card.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center mb-3">
          <div class="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center me-3" style="width:48px;height:48px;">
            <span class="fw-bold">${usuario.iniciales}</span>
          </div>
          <div>
            <h3 class="h5 mb-0">${usuario.nombre}</h3>
            <small class="text-muted">${usuario.email}</small>
          </div>
        </div>
        <p class="mb-2">Ciudad: ${usuario.ciudad}</p>
        <button class="btn btn-sm btn-success btn-activar">Activar</button>
        <span class="ms-2 estado"></span>
      </div>
    `;

    const btn = card.querySelector('.btn-activar');
    const estado = card.querySelector('.estado');

    btn.addEventListener('click', () => {
      usuario.activar();
      estado.textContent = 'Activo';
      estado.classList.add('text-success');
      btn.disabled = true;
    });

    col.appendChild(card);
    usuariosEl.appendChild(col);
  });
}

// ── 3) Carga con async/await + Promise.all ────────
async function iniciarPanel() {
  try {
    mostrarMensaje('Cargando...');

    const [usuariosRaw, stats] = await Promise.all([
      getUsuarios(),
      getEstadisticas(),
    ]);

    // Map id → instancia Usuario
    const mapaUsuarios = new Map();
    usuariosRaw.forEach(datos => {
      const usuario = new Usuario(datos);
      mapaUsuarios.set(usuario.id, usuario);
    });

    renderStats(stats);
    renderUsuarios(mapaUsuarios);
  } catch (err) {
    mostrarMensaje('Ups, hubo un problema al cargar el panel. Intenta nuevamente en unos segundos.');
  } finally {
    // si quieres, puedes limpiar el mensaje después de un rato, o dejar el de error
    // aquí solo lo limpiamos si no hubo error
    // (simple: si el texto actual es "Cargando...", lo borramos)
    if (mensajesEl.textContent === 'Cargando...') {
      limpiarMensaje();
    }
  }
}

// ── 4) Botón de recarga ───────────────────────────
document.getElementById('btn-recargar').addEventListener('click', () => {
  iniciarPanel();
});

// Primera carga
iniciarPanel();