# PRD — Plantillas Demo (Mock Frontend)

## Problema / Objetivo
Repositorio React con DOS plantillas 100% mockeadas (sin backend real, estado en `localStorage`) para presentar a clientes. Idioma: Español. Moneda: CLP (peso chileno).

- **Raíz `/`**: Selector entre las dos demos.
- **E-commerce "AURUM & CO."** (`/ecommerce/*`): productos variados (hogar, tecnología, accesorios, herramientas).
- **Servicios "PATITAS & CO."** (`/servicios/*`): peluquería canina / spa.

## Arquitectura
- Frontend-only. React 19 + Tailwind + Framer Motion + React Router v6 + sonner (toasts).
- Estado global: `context/AppContext.jsx` (persiste en localStorage: products, categories, cart, isAdmin, bookings).
- Seed inicial: `data/seedData.js`. Helpers: `lib/format.js` (formatCLP, slugify).
- Backend: NO usado.

## Implementado (2026-06-15)
- ✅ Ruteo nuevo en `App.js` con `AppProvider` + `Toaster`.
- ✅ Selector raíz (`pages/RootSelector.jsx`).
- ✅ E-commerce: Home, Catálogo (filtros/búsqueda/orden), Detalle de producto, Carrito.
- ✅ Checkout falso estilo **Mercado Pago** (form → procesando ~3s → "Pago aprobado", limpia carrito).
- ✅ Panel Admin: login mock (admin@demo.com/admin123), Dashboard (stats), CRUD de Productos y Categorías (localStorage), restaurar demo, logout.
- ✅ Servicios: landing minimalista, catálogo de 6 servicios, flujo de agendamiento en 3 pasos → "Cita agendada".
- ✅ Transiciones de página con Framer Motion.
- ✅ Probado por testing agent: 13/13 flujos OK (iteration_1.json), 100%.

## Credenciales
- Admin: `admin@demo.com` / `admin123`

## Backlog / Próximos pasos (P2)
- Vista de "Reservas" en algún panel para PATITAS (las bookings ya se guardan en localStorage).
- Wishlist / favoritos en e-commerce.
- Reseñas de clientes en fichas de producto.
- Modo multi-idioma o selector de moneda.
