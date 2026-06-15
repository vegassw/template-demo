import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { PawPrint, Menu, X, Phone, Instagram, MapPin, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const ServiciosHeader = () => {
  const [open, setOpen] = useState(false);
  const { petCartCount } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const goServicios = () => {
    setOpen(false);
    if (location.pathname === '/servicios') {
      document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/servicios');
      setTimeout(() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }), 350);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E0D5]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-20">
          <Link to="/servicios" className="flex items-center gap-2" data-testid="servicios-logo">
            <PawPrint size={26} className="text-[#7BAE8F]" />
            <span className="font-heading text-2xl text-[#2E3A35]">Patitas <span className="text-[#7BAE8F]">& Co.</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/servicios" className="text-sm text-[#2E3A35] hover:text-[#7BAE8F] transition-colors tracking-wide" data-testid="nav-inicio-serv">Inicio</Link>
            <Link to="/servicios/tienda" className="text-sm text-[#2E3A35] hover:text-[#7BAE8F] transition-colors tracking-wide" data-testid="nav-tienda">Tienda</Link>
            <button onClick={goServicios} className="text-sm text-[#2E3A35] hover:text-[#7BAE8F] transition-colors tracking-wide" data-testid="nav-servicios">Servicios</button>
            <Link to="/servicios/carrito" className="relative text-[#2E3A35] hover:text-[#7BAE8F] transition-colors" data-testid="pet-cart-link" aria-label="Carrito">
              <ShoppingBag size={20} />
              {petCartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#7BAE8F] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">{petCartCount}</span>
              )}
            </Link>
            <Link to="/servicios/agendar" className="bg-[#7BAE8F] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#6B9E7F] transition-colors" data-testid="nav-agendar">Agendar cita</Link>
          </nav>
          <div className="flex items-center gap-3 md:hidden">
            <Link to="/servicios/carrito" className="relative text-[#2E3A35]" data-testid="pet-cart-link-mobile" aria-label="Carrito">
              <ShoppingBag size={22} />
              {petCartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#7BAE8F] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">{petCartCount}</span>}
            </Link>
            <button onClick={() => setOpen(!open)} className="p-2 text-[#2E3A35]">{open ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-[#2E3A35] absolute top-20 left-0 right-0 p-6">
          <nav className="flex flex-col gap-4">
            <Link onClick={() => setOpen(false)} to="/servicios" className="text-white text-lg py-2 border-b border-white/10">Inicio</Link>
            <Link onClick={() => setOpen(false)} to="/servicios/tienda" className="text-white text-lg py-2 border-b border-white/10">Tienda</Link>
            <button onClick={goServicios} className="text-white text-lg py-2 border-b border-white/10 text-left">Servicios</button>
            <Link onClick={() => setOpen(false)} to="/servicios/agendar" className="text-[#7BAE8F] text-lg py-2 font-medium">Agendar cita →</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export const ServiciosFooter = () => (
  <footer className="bg-[#2E3A35] text-white py-16">
    <div className="max-w-6xl mx-auto px-6 md:px-10">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <PawPrint size={24} className="text-[#7BAE8F]" />
            <span className="font-heading text-2xl">Patitas & Co.</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">Spa y peluquería canina donde cada mascota recibe el cariño y cuidado que merece.</p>
        </div>
        <div className="space-y-3">
          <h4 className="font-heading text-lg">Contacto</h4>
          <a href="tel:+56900000000" className="flex items-center gap-3 text-white/60 hover:text-[#7BAE8F] text-sm"><Phone size={16} /> +56 9 0000 0000</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-[#7BAE8F] text-sm"><Instagram size={16} /> @patitasyco</a>
          <span className="flex items-center gap-3 text-white/60 text-sm"><MapPin size={16} /> Providencia, Santiago</span>
        </div>
        <div className="space-y-3">
          <h4 className="font-heading text-lg">Horario</h4>
          <p className="text-white/60 text-sm">Lun a Vie · 9:00 — 19:00</p>
          <p className="text-white/60 text-sm">Sábado · 10:00 — 16:00</p>
          <Link to="/servicios/agendar" className="inline-block mt-3 bg-[#7BAE8F] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#6B9E7F] transition-colors">Agendar cita</Link>
        </div>
      </div>
      <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between gap-3 text-white/40 text-xs">
        <span>© 2026 Patitas & Co. Todos los derechos reservados.</span>
        <span>DEMO — Sitio mock para presentación a clientes</span>
      </div>
    </div>
  </footer>
);

export default function ServiciosLayout() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col" data-testid="servicios-layout">
      <ServiciosHeader />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <ServiciosFooter />
    </div>
  );
}
