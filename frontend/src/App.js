import "@/App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "sonner";

import RootSelector from "@/pages/RootSelector";
import { ScrollToTop } from "@/components/ScrollToTop";

import EcommerceLayout from "@/components/ecommerce/EcommerceLayout";
import Home from "@/pages/ecommerce/Home";
import Catalogo from "@/pages/ecommerce/Catalogo";
import ProductDetail from "@/pages/ecommerce/ProductDetail";
import Cart from "@/pages/ecommerce/Cart";
import Checkout from "@/pages/ecommerce/Checkout";

import AdminLayout from "@/components/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import ProductsAdmin from "@/pages/admin/ProductsAdmin";
import CategoriesAdmin from "@/pages/admin/CategoriesAdmin";

import ServiciosLayout from "@/components/servicios/ServiciosLayout";
import ServiciosHome from "@/pages/servicios/ServiciosHome";
import Agendar from "@/pages/servicios/Agendar";
import Tienda from "@/pages/servicios/Tienda";
import PetProductDetail from "@/pages/servicios/PetProductDetail";
import PetCart from "@/pages/servicios/PetCart";
import PetCheckout from "@/pages/servicios/PetCheckout";

function App() {
  return (
    <AppProvider>
      <div className="App font-body">
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<RootSelector />} />

            {/* E-commerce admin (separate layout, no store chrome) */}
            <Route path="/ecommerce/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="productos" element={<ProductsAdmin />} />
              <Route path="categorias" element={<CategoriesAdmin />} />
            </Route>

            {/* E-commerce store */}
            <Route path="/ecommerce" element={<EcommerceLayout />}>
              <Route index element={<Home />} />
              <Route path="catalogo" element={<Catalogo />} />
              <Route path="producto/:slug" element={<ProductDetail />} />
              <Route path="carrito" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>

            {/* Services template */}
            <Route path="/servicios" element={<ServiciosLayout />}>
              <Route index element={<ServiciosHome />} />
              <Route path="agendar" element={<Agendar />} />
              <Route path="tienda" element={<Tienda />} />
              <Route path="producto/:slug" element={<PetProductDetail />} />
              <Route path="carrito" element={<PetCart />} />
              <Route path="checkout" element={<PetCheckout />} />
            </Route>

            <Route path="*" element={<RootSelector />} />
          </Routes>
          <Toaster position="top-center" richColors />
        </HashRouter>
      </div>
    </AppProvider>
  );
}

export default App;
