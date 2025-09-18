# 🛒 Prueba Técnica – Carrito de Compras (Angular 19)

Este proyecto corresponde a la **prueba técnica para MPOS**, donde se implementa un carrito de compras usando **Angular 19 (standalone components, signals y computed)** y la API pública [FakeStoreAPI](https://fakestoreapi.com/).

El objetivo es demostrar dominio de Angular moderno, manejo de estado reactivo, persistencia de datos y un diseño **100% CSS**, totalmente responsive y amigable con el usuario final.

---

## 🚀 Funcionalidades

- Tabla de productos con opción de **agregar al carrito**.
- **Drawer lateral** para visualizar el carrito con:
  - Productos seleccionados
  - Cantidades y subtotales
  - Total acumulado
  - Botón para ir al flujo de pago
- **Pantalla de pago** con resumen de la compra y simulación de proceso de pago.
- **Persistencia del carrito** (localStorage) → no se pierde al refrescar el navegador.
- Diseño **100% CSS, sin frameworks UI**, responsive de móvil a desktop.

---

## 🛠️ Tecnologías utilizadas

- [Angular 19](https://v19.angular.dev/) (standalone components)
- Signals y computed para estado reactivo
- TypeScript
- CSS puro (variables, grid, flexbox, transiciones)
- Persistencia con `localStorage`
- API: [FakeStoreAPI](https://fakestoreapi.com/)

---

## 📦 Instalación y ejecución local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/BrandonOcampoDs1/Prueba-Mpos.git
   cd Prueba-Mpos
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Levanta el servidor local:
   ```bash
   ng serve
   ```
   👉 Abre en tu navegador: [http://localhost:4200](http://localhost:4200)

---

## 🌍 Demo en línea

El proyecto también está desplegado en **Vercel**, así que puedes probarlo directamente aquí:  
👉 [Demo en Vercel](https://prueba-mpos.vercel.app/)

---

## 📝 Decisiones técnicas

- **Estado**: manejado con `signals` y `computed` en lugar de `NgRx` u otros stores, para cumplir con el objetivo de la prueba.  
- **Persistencia**: `localStorage` para mantener el carrito tras recargar.  
- **Diseño**: CSS variables para colores, sombras y bordes → interfaz limpia y moderna para mejorar el UX/UI del usuario final.  
- **Responsive**: combinación de **CSS Grid + Flexbox + media queries**.  
- **Drawer**: animación fluida con transiciones CSS, sin librerías externas.  
---