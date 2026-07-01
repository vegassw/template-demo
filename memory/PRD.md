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

## Implementado (2026-06-15) — PATITAS estilo PetMax (centro integral)
- ✅ Rediseño de la home de PATITAS inspirado en petmax.ca: barra de anuncios (envío gratis), hero de ofertas, 3 pilares (Veterinaria · Peluquería & Spa · Tienda), tiles de categorías, "Más vendidos" con rating + badges de descuento, franja de marcas, banda promocional y servicios agrupados (Veterinaria / Peluquería).
- ✅ Agregados servicios de **Veterinaria** (consulta, vacunación, desparasitación, control sano) en seedServices con `category`.
- ✅ PetProductCard mejorado: estrellas de rating, reviews y badge de % descuento / "Más vendido" (acento coral #E8845E).
- ✅ Todo sigue 100% mock (carrito + checkout Mercado Pago simulado intactos).

## Implementado (2026-07-01) — 3er template: ENVÍALO (envío de dinero, mock)
- ✅ Tercer template fintech "Envíalo" (envío de dinero + Pago Móvil), 100% mock localStorage, diseño minimalista bancario (navy #0A2540 + menta #00B37E).
- ✅ Home con **cotizador** (país destino + monto → tipo de cambio ficticio, comisión, total, monto recibido), franja de países y "cómo funciona".
- ✅ Flujo de envío estilo Ria en 4 pasos: monto/país → método de entrega (depósito, efectivo, billetera, **Pago Móvil VE**) → datos del destinatario (dinámicos por método; Pago Móvil pide banco 4 dígitos + teléfono + cédula/RIF) → pago (Transferencia / Mercado Pago / Efectivo) → procesando → éxito con **N° de seguimiento**.
- ✅ Página de **seguimiento** con timeline de estados (recibido → en proceso → pagado).
- ✅ **Dashboard admin** (`/#/envialo/admin`, mismo login) con stats (total enviado, comisiones, envíos hoy), tabla de transacciones, cambio de estado y detalle.
- ✅ Corredores desde Chile: Perú, Colombia, Venezuela, Bolivia, Argentina, México (tasas ficticias).
- ✅ Selector raíz ahora con 3 tarjetas (AURUM, PATITAS, ENVÍALO).
- Estado transferencias en localStorage `envialo_transfers_v1`.

## Actualización (2026-07-01) — Envíalo: pago en efectivo con referencia
- ✅ Pago en efectivo: al confirmar NO se completa el envío; genera **número de pago (PAG-XXXXXXXX)** + lista de **sucursales** donde pagar; el envío queda en estado **pendiente** hasta que el admin lo confirma (cambia a "en proceso").
- ✅ Pagos online (Transferencia / Mercado Pago) → estado "en proceso" directo.
- ✅ Botón dinámico: "Generar pago en efectivo" vs "Pagar $X".
- ✅ Seguimiento con timeline dinámico ("Pago pendiente en sucursal" para efectivo).
- ✅ Admin: cambio de estado pendiente→en_proceso→pagado persiste en localStorage.
- ✅ Probado por testing agent (iteration_3.json): 100%, sin regresiones en AURUM/PATITAS.

## Backlog / Próximos pasos (P2)
- Vista de "Reservas" en algún panel para PATITAS (las bookings ya se guardan en localStorage).
- Panel admin para la tienda de PATITAS (hoy los productos de mascotas son estáticos del seed).
- Wishlist / favoritos en e-commerce.
- Reseñas de clientes en fichas de producto.
