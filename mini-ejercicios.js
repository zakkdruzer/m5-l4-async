function lanzarMini1() {
  console.log(
    "%cEtapa 1 · Tu primera función async",
    "font-weight: bold; color: green; font-size: 15px;",
  );
  console.log("");

  function esperar(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function cargarPerfil(nombre) {
    console.log("Cargando perfil...");
    await esperar(1000);
    console.log("¡Perfil listo!");
    return { nombre, rol: "estudiante" };
  }

  // IMPORTANTE: devolver la promesa
  return cargarPerfil("Ana").then((perfil) => console.log(perfil));
}

function lanzarMini2() {
  console.log(
    "%cEtapa 2 · De .then() a await",
    "font-weight: bold; color: green; font-size: 15px;",
  );
  console.log("");

  function obtenerNumero() {
    return new Promise((resolve) => setTimeout(() => resolve(42), 500));
  }

  obtenerNumero().then((n) => console.log("Con then:", n));

  async function mostrarNumero() {
    const n = await obtenerNumero();
    console.log("Con await:", n);
  }

  // DEVOLVER una promesa (por ejemplo, la de mostrarNumero)
  return mostrarNumero();
}

function lanzarMini3() {
  console.log(
    "%cEtapa 3 · Manejar errores con try / catch",
    "font-weight: bold; color: green; font-size: 15px;",
  );
  console.log("");

  function autenticar(usuario, clave) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (clave === "1234") {
          resolve({ usuario, token: "abc123" });
        } else {
          reject(new Error("Clave incorrecta"));
        }
      }, 500);
    });
  }

  async function iniciarSesion(usuario, clave) {
    try {
      const datos = await autenticar(usuario, clave);
      console.log("✅ Bienvenido, token:", datos.token);
    } catch (err) {
      console.log("❌ Error:", err.message);
    } finally {
      console.log("Intento de login finalizado");
    }
  }

  // DEVOLVER también una promesa (por ejemplo, esperar a que terminen ambos intentos)
  return Promise.all([
    iniciarSesion("ana", "1234"),
    iniciarSesion("ana", "mala"),
  ]);
}

function lanzarMini4() {
  console.log(
    "%cEtapa 4 · La ganancia: secuencial vs paralelo",
    "font-weight: bold; color: green; font-size: 15px;",
  );
  console.log("");

  function getUsuarios() {
    return new Promise((r) => setTimeout(() => r("usuarios"), 800));
  }

  function getProductos() {
    return new Promise((r) => setTimeout(() => r("productos"), 600));
  }

  function getVentas() {
    return new Promise((r) => setTimeout(() => r("ventas"), 700));
  }

  async function cargarEnFila() {
    const t0 = Date.now();

    await getUsuarios();
    await getProductos();
    await getVentas();

    console.log("En fila:", Date.now() - t0, "ms");
  }

  async function cargarJuntas() {
    const t0 = Date.now();

    const [u, p, v] = await Promise.all([
      getUsuarios(),
      getProductos(),
      getVentas(),
    ]);

    console.log("Resultados:", u, p, v);
    console.log("En paralelo:", Date.now() - t0, "ms");
  }

  // Ejecutamos las dos versiones y devolvemos una promesa
  // por ejemplo, que espere a que terminen ambas
  return Promise.all([
    cargarEnFila(), 
    cargarJuntas()
  ]);
}

function lanzarMini5() {}

// Ahora sí, todas devuelven promesa:
lanzarMini1()
  .then(() => lanzarMini2())
  .then(() => lanzarMini3())
  .then(() => lanzarMini4())
  .then(() => lanzarMini5());
