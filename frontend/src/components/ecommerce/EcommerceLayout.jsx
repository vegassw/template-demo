import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, MessageCircle, Phone, Mail, MapPin, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const BRAND = 'AURUM & CO.';

export const EcommerceHeader = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const { cartCount } = useApp();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQ.trim()) {
      navigate(`/ecommerce/catalogo?q=${encodeURIComponent(searchQ.trim())}`);
      setSearchOpen(false);
      setSearchQ('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/ecommerce" className="flex items-center gap-2" data-testid="logo-link">
            <span className="font-heading text-2xl tracking-tight text-[#1a1a1a]">
              AURUM <span className="text-[#C9A227]">&amp; CO.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link to="/ecommerce" className="font-body text-sm tracking-wide text-[#1a1a1a] hover:text-[#C9A227] transition-colors" data-testid="nav-inicio">INICIO</Link>
            <Link to="/ecommerce/catalogo" className="font-body text-sm tracking-wide text-[#1a1a1a] hover:text-[#C9A227] transition-colors" data-testid="nav-catalogo">CATÁLOGO</Link>
            <Link to="/ecommerce/catalogo?cat=hogar" className="font-body text-sm tracking-wide text-[#1a1a1a] hover:text-[#C9A227] transition-colors">HOGAR</Link>
            <Link to="/ecommerce/catalogo?cat=tecnologia" className="font-body text-sm tracking-wide text-[#1a1a1a] hover:text-[#C9A227] transition-colors">TECNOLOGÍA</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen((s) => !s)} className="p-2 hover:text-[#C9A227] transition-colors" data-testid="search-toggle-btn" aria-label="Buscar">
              <Search size={20} />
            </button>
            <Link to="/ecommerce/admin" className="p-2 hover:text-[#C9A227] transition-colors hidden md:block" data-testid="admin-link" title="Panel Admin">
              <User size={20} />
            </Link>
            <Link to="/ecommerce/carrito" className="relative p-2 hover:text-[#C9A227] transition-colors" data-testid="cart-link" aria-label="Carrito">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A227] text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setOpen(!open)} className="md:hidden p-2" data-testid="mobile-menu-btn" aria-label="Menú">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={handleSearch} className="py-4 border-t border-gray-100">
            <input
              autoFocus
              type="text"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full bg-transparent border-b border-gray-200 px-0 py-3 focus:border-[#C9A227] focus:outline-none transition-colors"
              data-testid="search-input"
            />
          </form>
        )}
      </div>

      {open && (
        <div className="md:hidden bg-[#1a1a1a] absolute top-20 left-0 right-0 p-6">
          <nav className="flex flex-col gap-4">
            <Link onClick={() => setOpen(false)} to="/ecommerce" className="text-white text-lg py-2 border-b border-gray-700">INICIO</Link>
            <Link onClick={() => setOpen(false)} to="/ecommerce/catalogo" className="text-white text-lg py-2 border-b border-gray-700">CATÁLOGO</Link>
            <Link onClick={() => setOpen(false)} to="/ecommerce/admin" className="text-white text-lg py-2 border-b border-gray-700">ADMIN</Link>
            <Link onClick={() => setOpen(false)} to="/ecommerce/carrito" className="text-white text-lg py-2">CARRITO ({cartCount})</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export const EcommerceFooter = () => (
  <footer className="bg-[#1a1a1a] border-t border-gray-800 py-16 mt-24">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <span className="font-heading text-2xl text-white">
            AURUM <span className="text-[#C9A227]">&amp; CO.</span>
          </span>
          <p className="font-body text-gray-400 text-sm leading-relaxed">
            Productos premium de hogar, tecnología, accesorios y herramientas con la mejor relación calidad-precio.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="font-heading text-lg text-white">Enlaces</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/ecommerce" className="font-body text-gray-400 hover:text-[#C9A227] transition-colors text-sm">Inicio</Link>
            <Link to="/ecommerce/catalogo" className="font-body text-gray-400 hover:text-[#C9A227] transition-colors text-sm">Catálogo</Link>
            <Link to="/ecommerce/carrito" className="font-body text-gray-400 hover:text-[#C9A227] transition-colors text-sm">Carrito</Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h4 className="font-heading text-lg text-white">Categorías</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/ecommerce/catalogo?cat=hogar" className="font-body text-gray-400 hover:text-[#C9A227] transition-colors text-sm">Hogar</Link>
            <Link to="/ecommerce/catalogo?cat=tecnologia" className="font-body text-gray-400 hover:text-[#C9A227] transition-colors text-sm">Tecnología</Link>
            <Link to="/ecommerce/catalogo?cat=accesorios" className="font-body text-gray-400 hover:text-[#C9A227] transition-colors text-sm">Accesorios</Link>
            <Link to="/ecommerce/catalogo?cat=herramientas" className="font-body text-gray-400 hover:text-[#C9A227] transition-colors text-sm">Herramientas</Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h4 className="font-heading text-lg text-white">Contacto</h4>
          <div className="flex flex-col gap-3">
            <a href="tel:+56900000000" className="flex items-center gap-3 font-body text-gray-400 hover:text-[#C9A227] transition-colors text-sm">
              <Phone size={16} /> +56 9 0000 0000
            </a>
            <a href="mailto:contacto@aurumco.cl" className="flex items-center gap-3 font-body text-gray-400 hover:text-[#C9A227] transition-colors text-sm">
              <Mail size={16} /> contacto@aurumco.cl
            </a>
            <span className="flex items-center gap-3 font-body text-gray-400 text-sm">
              <MapPin size={16} /> Santiago, Chile
            </span>
            <a href="https://wa.me/56900000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-body text-gray-400 hover:text-[#C9A227] transition-colors text-sm">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-gray-500 text-sm">© 2026 AURUM &amp; CO. Todos los derechos reservados.</p>
        <p className="font-body text-gray-600 text-xs">DEMO — Sitio mock para presentación a clientes</p>
      </div>
    </div>
  </footer>
);

const EcommerceLayout = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <EcommerceHeader />
    <main className="flex-1 pt-20"><Outlet /></main>
    <EcommerceFooter />
  </div>
);

export default EcommerceLayout;
export { BRAND };
