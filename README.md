# Módulo 5 · JavaScript Asíncrono – async / await ⏳

Panel de usuarios desarrollado como proyecto final del Módulo 5 de JavaScript Asíncrono.  
Integra **Promesas**, **async/await**, **Promise.all**, manejo de errores con **try/catch/finally**, clases ES6, `Map`, y manipulación del DOM.

---

## 🎯 Objetivo del proyecto

Construir una mini–app de tipo **panel de usuarios** que:

- Simula un servidor con datos de usuarios y estadísticas usando `setTimeout` dentro de Promesas.
- Carga datos **en paralelo** con `Promise.all` cuando no dependen entre sí.
- Encadena operaciones **en secuencia** con `await` cuando un paso necesita el resultado del anterior.
- Maneja errores reales (fallos aleatorios) con `try/catch` mostrando mensajes amigables en el DOM.

---

## 🧱 Tecnologías y conceptos usados

- **HTML5** (estructura de la página y panel).
- **JavaScript (ES6+)**:
  - `async` / `await`
  - `Promise.all`
  - `try / catch / finally`
  - `setTimeout` para simular latencias de servidor
  - Clases con campos privados (`class Usuario { #activo = false; ... }`)
  - `Map` para almacenar usuarios indexados por `id`
- **Bootstrap 5** para el diseño de tarjetas y layout.

---

## 📁 Estructura del proyecto

- `index.html`  
  Página principal con:
  - Bloque introductorio del módulo.
  - Sección del **panel de usuarios**.
  - Botón **Recargar**.
  - Contenedores para barra de estadísticas, mensajes y tarjetas de usuarios.

- `mini-ejercicios.js`  
  Archivo con los mini–ejercicios 1–5 del módulo (prácticas de async/await, Promise.all y try/catch). Los resultados se ven en la consola del navegador.

- `ejercicio-final.js`  
  Lógica del proyecto final:
  - Simulación de servidor (`getUsuarios`, `getEstadisticas`).
  - Clase `Usuario` y `Map` de usuarios.
  - Función `iniciarPanel()` con `async/await` + `Promise.all`.
  - Funciones de renderizado al DOM y eventos de botones.

---

## 👤 Datos simulados y clase `Usuario`

- `USUARIOS_DB`: array con al menos 5 usuarios, cada uno con:
  - `id`
  - `nombre` (nombre y apellido)
  - `email`
  - `ciudad`

- `class Usuario`:
  - Campo privado `#activo` (inicia en `false`).
  - Constructor que recibe un objeto de datos.
  - Getter `iniciales` que devuelve las primeras letras de nombre y apellido en mayúsculas.
  - Método `activar()` que marca al usuario como activo.
  - Getter `activo` para consultar el estado.

Cada registro del array se convierte en una instancia de `Usuario` y se almacena en un `Map` (`id → Usuario`).

---

## 🌐 “Servidor” simulado

Se simula una API con Promesas y `setTimeout`:

- `getUsuarios()`  
  - Espera 600 ms.
  - Devuelve la lista de usuarios (`USUARIOS_DB`).
  - Falla el **20% de las veces** usando `Math.random()` para probar el manejo de errores.

- `getEstadisticas()`  
  - Espera 400 ms.
  - Devuelve un objeto con estadísticas:
    - `totalVisitas`
    - `ciudadTop`

No se hace ninguna llamada real a servidores externos: todo ocurre en el navegador.

---

## ⚙️ Carga del panel con async/await + Promise.all

La función principal es `async function iniciarPanel()`:

1. Muestra en el DOM un mensaje tipo **“Cargando…”**.
2. Ejecuta en **paralelo**:
   ```js
   const [usuariosRaw, stats] = await Promise.all([
     getUsuarios(),
     getEstadisticas(),
   ]);
   ```
   Usuarios y estadísticas son independientes, por eso se cargan juntas.
3. Convierte los usuarios crudos (`usuariosRaw`) a instancias de `Usuario` y las guarda en un `Map`.
4. Llama a:
   - `renderStats(stats)` para mostrar la barra con estadísticas.
   - `renderUsuarios(mapaUsuarios)` para generar las tarjetas.
5. Si algo falla:
   - Captura el error en `catch (err)` y muestra un mensaje amigable en el DOM (no el error técnico).
6. En `finally` limpia el estado de “Cargando…” según corresponda.

---

## 🎨 Renderizado y UI (Bootstrap)

En el panel se muestran:

- **Barra superior** con estadísticas:
  - Total de visitas.
  - Ciudad top.

- **Tarjetas Bootstrap** por usuario (`card` dentro de una `row`):
  - Iniciales en un círculo amarillo.
  - Nombre completo.
  - Email.
  - Ciudad.
  - Botón **“Activar”**:
    - Al hacer clic:
      - Llama a `usuario.activar()`.
      - Marca la tarjeta como activa.
      - Muestra la etiqueta “Activo”.
      - Deshabilita el botón.

- **Botón “Recargar”**:
  - Vuelve a ejecutar `iniciarPanel()`.
  - Permite ver cómo el panel se recarga y, a veces, falla la carga de usuarios (20% de probabilidad), disparando el `catch`.

---

## 🧪 Mini–ejercicios (consola)

Además del proyecto final, el archivo `mini-ejercicios.js` contiene varios mini–ejercicios para practicar:

1. Primera función `async` con `await` y retorno de Promesa.
2. Traducción de `.then()` a `async/await`.
3. Manejo de errores con `try / catch / finally`.
4. Comparación de carga **secuencial vs paralela** con `Promise.all`.
5. Ejemplo donde la secuencia es obligatoria (usuario → posts → comentarios).

Sus resultados se visualizan en la consola (`F12 → Console`).

---

## 🚀 Cómo ejecutar el proyecto

1. Clona el repositorio o descarga los archivos.
2. Abre `panel.html` en tu navegador (puedes usar Live Server o abrir el archivo directamente).
3. Abre la **consola** para ver los mini–ejercicios.
4. Prueba el panel:
   - Observa las estadísticas.
   - Usa los botones **“Activar”** en las tarjetas.
   - Pulsa **“Recargar”** varias veces para ver el manejo de errores en acción.

---

## 💡 Aprendizajes clave

- Escribir código asíncrono que se lee como código normal usando `async/await`.
- Decidir cuándo usar:
  - `await` en secuencia (cuando un paso necesita el resultado del anterior).
  - `Promise.all` en paralelo (cuando son independientes).
- Manejar errores reales con `try/catch/finally` sin romper la interfaz.
- Integrar asincronía con manipulación del DOM y una interfaz visual con Bootstrap.

---

## Puedes ver el resultado en:

https://zakkdruzer.github.io/m5-l4-async/
