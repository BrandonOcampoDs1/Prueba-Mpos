# Prueba técnica — Carrito de Compras (MPOS)

**Repositorio:** entrega de la prueba técnica del carrito de compras.
**Demo pública:** https://prueba-mpos.vercel.app/

---

## Resumen del proyecto

Aplicación de carrito de compras desarrollada con **Angular (standalone components)**, gestionando el estado con **signals** y **computed**, diseño 100% CSS (sin librerías de UI) y totalmente responsive (móvil → desktop). Se consumió la API de ejemplo `https://fakestoreapi.com/` para poblar productos.  
La app cumple los requisitos funcionales: listado de productos, drawer lateral del carrito, pantalla de pago simulada y persistencia en `localStorage` para que el carrito sobreviva a un refresh.

> Nota: durante la maquetación se aplicaron animaciones y microinteracciones; si al abrir el proyecto localmente notas pequeños desajustes en ciertos estilos, fue una decisión visual y también puede deberse a diferencias entre entornos — pido disculpas si algún CSS se ve desordenado en resolución específica; todo es 100% CSS y responsive.

---

## Demo en línea

Puedes probar la versión desplegada en:  
**https://prueba-mpos.vercel.app/**

---

## Tecnologías principales

- Angular (standalone components)
- Signals y computed (estado reactivo)
- JavaScript / TypeScript
- HTML5 + CSS3 (100% CSS, sin frameworks)
- LocalStorage para persistencia
- API de ejemplo: `https://fakestoreapi.com/`

---

## Cómo ejecutar el proyecto (local)

> Antes de ejecutar, revisa `package.json` para confirmar los scripts disponibles. Aquí dejo las formas más comunes:

1. Clona el repositorio
```bash
git clone <tu-repo-url>
cd <tu-repo-folder>
```

2. Instala dependencias
```bash
npm install
```

3. Ejecuta la app en modo desarrollo

- Si el proyecto usa Angular CLI:
```bash
npm run start
```

La aplicación se abrirá normalmente en `http://localhost:4200` o en el puerto indicado por el script.

---

## Estructura y decisiones de diseño

### Organización
- **Standalone components**: todos los componentes principales son standalone para demostrar dominio de Angular 19 y su modelo de componentes independientes.
- **Stores** (por ejemplo `CartStore`, `UserStore`): pequeños servicios que encapsulan la lógica de estado usando **signals** y funciones computadas (computed). Esto facilita la sincronización entre vistas (listado, drawer, pantalla de pago).
- **Componentes principales**:
  - `ProductList` — listado de productos (obtiene desde Fakestore API).
  - `CartDrawer` — drawer lateral con resumen, controles y total.
  - `Checkout` / `PurchaseSummary` — flujos de pago y resumen final.
  - `AccountModal` y `AppModal` — modales CSS para interacciones.

### Manejo del estado
Se trabajó con **signals** y actualizaciones inmutables del array de items. Ejemplo representativo usado en `CartStore`:

### Persistencia

La persistencia se resolvió con `localStorage`. Se serializa el estado relevante (carrito y cuenta de usuario) en cada cambio y se restaura al inicializar el store. Ejemplo de la función usada:

```ts
private saveToStorage() {
  if (this.account()) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.account()));
  } else {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
```

También se utiliza `saveToStorage()` desde funciones de mutación del carrito (`addProduct`, `updateQuantity`, `removeProduct`, etc.) para que cualquier cambio quede guardado automáticamente.

### Sincronización entre vistas

Gracias a los signals y computed, cualquier cambio en el `CartStore` se refleja automáticamente en:
- Listado de productos (por ejemplo mostrar cantidad actual en el botón "Agregar")
- Drawer del carrito (cantidad, subtotales, total)
- Pantalla de pago (resumen final)

Esto cumple el requisito de sincronización productos ↔ carrito ↔ pantalla de pago.

---

## UX & Diseño

- Diseño 100% CSS, responsive y pensado para móvil primero.
- Drawer lateral con transición suave (CSS transition) y control de pin/abrir/cerrar.
- Modal CSS para avisos (registro de cuenta, fondos insuficientes) en lugar de `alert()` nativo.
- Microinteracciones: botones con hover activo, animación al añadir producto, transición del drawer, etc.
- Se priorizó legibilidad tipográfica, espaciado y jerarquía visual.

---

## Simulación del flujo de pago

El flujo de pago está simulado: al confirmar compra se verifica que exista una **cuenta** y **saldo** (almacenado en `UserStore` y persistido). Si todo es correcto, se deduce el saldo (`updateBalance(-total)`), se genera un `summary` con los detalles y se navega a la pantalla de resumen final donde se puede exportar el comprobante (PDF generado con `jsPDF`).

---

## Consideraciones finales y notas

- El proyecto cumple los requisitos funcionales listados en la prueba técnica.
- Todo el CSS es handcrafted; si ves algún detalle visual que necesite ajuste puedo corregirlo con prioridad (admito que hubo pequeñas diferencias entre vistas que ya estoy puliendo).

---

## Contacto
Brandon Steven Ocampo Alvarez — creador del proyecto.

---