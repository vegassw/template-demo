import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Send, Menu, X, ShieldCheck, Search } from 'lucide-react';

const NAV = [
  { to: '/envialo/enviar', label: 'Enviar dinero' },
  { to: '/envialo/seguimiento', label: 'Seguimiento' },
];

export const EnvialoHeader = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E4E9F2]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-[72px]">
          <Link to="/envialo" className="flex items-center gap-2.5" data-testid="envialo-logo">
            <span className="w-9 h-9 rounded-xl bg-[#0A2540] flex items-center justify-center">
              <Send size={18} className="text-[#00B37E]" />
            </span>
            <span className="text-xl font-bold tracking-tight text-[#0A2540]">Envíalo</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className={`text-sm font-medium transition-colors ${pathname === n.to ? 'text-[#0A2540]' : 'text-[#5A6B85] hover:text-[#0A2540]'}`} data-testid={`nav-${n.label.split(' ')[0].toLowerCase()}`}>
                {n.label}
              </Link>
            ))}
            <Link to="/envialo/enviar" className="bg-[#00B37E] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#009E6E] transition-colors" data-testid="header-enviar-btn">
              Enviar ahora
            </Link>
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-[#0A2540]">{open ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-[#0A2540] absolute top-[72px] left-0 right-0 p-6">
          <nav className="flex flex-col gap-4">
            {NAV.map((n) => (
              <Link key={n.to} onClick={() => setOpen(false)} to={n.to} className="text-white text-lg py-1">{n.label}</Link>
            ))}
            <Link onClick={() => setOpen(false)} to="/envialo/enviar" className="text-[#00B37E] text-lg font-semibold py-1">Enviar ahora →</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export const EnvialoFooter = () => (
  <footer className="bg-[#0A2540] text-white">
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2 space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center"><Send size={18} className="text-[#00B37E]" /></span>
          <span className="text-xl font-bold">Envíalo</span>
        </div>
        <p className="text-white/60 text-sm max-w-sm leading-relaxed">Envía dinero a tu familia de forma rápida, segura y al mejor tipo de cambio. Recíbelo en minutos.</p>
        <div className="flex items-center gap-2 text-white/50 text-xs pt-2"><ShieldCheck size={15} className="text-[#00B37E]" /> Transacciones cifradas · Demo simulada</div>
      </div>
      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Servicio</h4>
        {['Enviar dinero', 'Seguimiento de envío', 'Tipos de cambio', 'Puntos de retiro'].map((l) => (
          <p key={l} className="text-white/60 text-sm">{l}</p>
        ))}
      </div>
      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Ayuda</h4>
        {['Centro de ayuda', 'Contacto', 'Términos', 'Privacidad'].map((l) => (
          <p key={l} className="text-white/60 text-sm">{l}</p>
        ))}
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between gap-2 text-white/40 text-xs">
        <span>© 2026 Envíalo. Todos los derechos reservados.</span>
        <span>DEMO — Mockup para presentación</span>
      </div>
    </div>
  </footer>
);

export default function EnvialoLayout() {
  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col" data-testid="envialo-layout">
      <EnvialoHeader />
      <main className="flex-1 pt-[72px]"><Outlet /></main>
      <EnvialoFooter />
    </div>
  );
}
