import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { PawPrint, Menu, X, Phone, Instagram, MapPin } from 'lucide-react';

export const ServiciosHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E0D5]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-20">
          <Link to="/servicios" className="flex items-center gap-2" data-testid="servicios-logo">
            <PawPrint size={26} className="text-[#7BAE8F]" />
            <span className="font-heading text-2xl text-[#2E3A35]">Patitas <span className="text-[#7BAE8F]">& Co.</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-9">
            <a href="#servicios" className="text-sm text-[#2E3A35] hover:text-[#7BAE8F] transition-colors tracking-wide">Servicios</a>
            <a href="#galeria" className="text-sm text-[#2E3A35] hover:text-[#7BAE8F] transition-colors tracking-wide">Galería</a>
            <a href="#nosotros" className="text-sm text-[#2E3A35] hover:text-[#7BAE8F] transition-colors tracking-wide">Nosotros</a>
            <Link to="/servicios/agendar" className="bg-[#7BAE8F] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#6B9E7F] transition-colors" data-testid="nav-agendar">Agendar cita</Link>
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-[#2E3A35]">{open ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-[#2E3A35] absolute top-20 left-0 right-0 p-6">
          <nav className="flex flex-col gap-4">
            <a onClick={() => setOpen(false)} href="#servicios" className="text-white text-lg py-2 border-b border-white/10">Servicios</a>
            <a onClick={() => setOpen(false)} href="#galeria" className="text-white text-lg py-2 border-b border-white/10">Galería</a>
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
          <a href="#" className="flex items-center gap-3 text-white/60 hover:text-[#7BAE8F] text-sm"><Instagram size={16} /> @patitasyco</a>
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
