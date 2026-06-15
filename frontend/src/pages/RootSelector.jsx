import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Scissors, ArrowRight } from 'lucide-react';

const DemoCard = ({ to, badge, title, subtitle, desc, image, accent, cta, testid }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="group relative overflow-hidden rounded-2xl bg-white border border-white/10"
    data-testid={testid}
  >
    <Link to={to} className="block">
      <div className="relative h-64 md:h-72 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <span className="absolute top-5 left-5 text-[10px] font-mono tracking-[0.25em] uppercase px-3 py-1.5 rounded-full" style={{ background: accent, color: '#0c0c0c' }}>
          {badge}
        </span>
      </div>
      <div className="p-7 md:p-9 bg-[#111114]">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: accent }}>{subtitle}</p>
        <h3 className="font-heading text-3xl md:text-4xl text-white mb-3">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-7 max-w-sm">{desc}</p>
        <span className="inline-flex items-center gap-2 text-white font-semibold text-sm tracking-wide group-hover:gap-4 transition-all">
          {cta} <ArrowRight size={18} style={{ color: accent }} />
        </span>
      </div>
    </Link>
  </motion.div>
);

export default function RootSelector() {
  return (
    <div className="min-h-screen bg-[#0c0c0e] relative overflow-hidden" data-testid="root-selector">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full bg-[#C9A227]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-[#7BAE8F]/10 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-mono text-xs tracking-[0.4em] text-[#C9A227] uppercase mb-5">Plantillas Demo</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Elige una experiencia<br />para explorar
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            Dos plantillas funcionales 100% interactivas. Navega, agrega al carrito, simula pagos y agenda citas.
            Todo en una demo lista para presentar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <DemoCard
            to="/ecommerce"
            badge="E-commerce"
            subtitle="Tienda online"
            title="AURUM & CO."
            desc="Catálogo de productos premium, carrito de compras, checkout simulado y panel de administración completo."
            image="https://images.unsplash.com/photo-1760072513442-9872656c1b07?w=900&q=85&auto=format"
            accent="#C9A227"
            cta="Entrar a la tienda"
            testid="demo-ecommerce"
          />
          <DemoCard
            to="/servicios"
            badge="Servicios"
            subtitle="Peluquería canina · Spa"
            title="PATITAS & CO."
            desc="Landing minimalista, catálogo de servicios de spa para mascotas y agendamiento de citas en pocos pasos."
            image="https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=900&q=85&auto=format"
            accent="#7BAE8F"
            cta="Ver servicios"
            testid="demo-servicios"
          />
        </div>

        <div className="mt-14 flex items-center justify-center gap-6 text-gray-500 text-xs">
          <span className="inline-flex items-center gap-2"><ShoppingBag size={14} /> Carrito & checkout</span>
          <span className="inline-flex items-center gap-2"><Scissors size={14} /> Agenda de citas</span>
        </div>
      </div>
    </div>
  );
}
