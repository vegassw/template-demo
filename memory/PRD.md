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

## Implementado (2026-06-15) — Modo tienda en PATITAS
- ✅ PATITAS & CO. ahora tiene modo e-commerce además de servicios: catálogo de productos para mascotas (Alimento, Juguetes, Higiene, Accesorios).
- ✅ Carrito **independiente** del de AURUM (clave localStorage `patitas_cart_v1` vs `aurum_cart_v1`), con quick-add, ficha de producto, carrito y checkout simulado Mercado Pago.
- ✅ Header con "Tienda" + badge de carrito; banner promocional de tienda en la landing.
- ✅ Probado por testing agent: 11/11 flujos nuevos + regresiones OK (iteration_2.json), 100%. Independencia de carritos verificada en ambos sentidos.

## Despliegue en GitHub Pages (2026-06-15)
- App 100% estática (mock localStorage), ideal para GitHub Pages.
- `App.js` usa **HashRouter** (evita 404 al recargar rutas internas en Pages).
- `package.json` → `"homepage": "."` (assets relativos, funciona en cualquier subruta `usuario.github.io/repo/`).
- Workflow CI/CD: `.github/workflows/deploy.yml` (build con yarn + deploy a Pages, `CI:false` para no fallar por warnings).
- `frontend/public/.nojekyll` incluido. `index.html` con título/meta actualizados.
- Pasos del usuario: Save to GitHub → repo Settings → Pages → Source = "GitHub Actions". El workflow corre en push a `main`.

## Backlog / Próximos pasos (P2)
- Vista de "Reservas" en algún panel para PATITAS (las bookings ya se guardan en localStorage).
- Panel admin para la tienda de PATITAS (hoy los productos de mascotas son estáticos del seed).
- Wishlist / favoritos en e-commerce.
- Reseñas de clientes en fichas de producto.
