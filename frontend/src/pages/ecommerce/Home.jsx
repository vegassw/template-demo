import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Truck, ShieldCheck, CreditCard, Headphones } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ecommerce/ProductCard';
import { Page } from '@/components/PageTransition';

const Hero = () => (
  <section className="relative min-h-[88vh] flex items-center bg-white">
    <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
          <p className="font-mono text-xs tracking-[0.3em] text-[#C9A227] uppercase">Tienda Premium</p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a1a1a] leading-[1.05]">
            AURUM<br /><span className="text-[#C9A227]">& CO.</span>
          </h1>
          <p className="font-body text-lg text-gray-600 max-w-md leading-relaxed">
            Productos seleccionados de hogar, tecnología, accesorios y herramientas. Calidad que se siente, precios que enamoran.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/ecommerce/catalogo" className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-[#C9A227] hover:text-black transition-all duration-300" data-testid="hero-catalogo-btn">
              Ver catálogo <ArrowRight size={18} />
            </Link>
            <Link to="/ecommerce/catalogo?cat=tecnologia" className="inline-flex items-center justify-center gap-2 border-2 border-[#1a1a1a] text-[#1a1a1a] px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-[#1a1a1a] hover:text-white transition-all duration-300">
              Ofertas
            </Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative">
          <div className="aspect-[4/5] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1760072513442-9872656c1b07?w=900&q=85&auto=format" alt="AURUM & CO." className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-[#C9A227] text-black p-6">
            <p className="font-heading text-4xl font-bold">16+</p>
            <p className="font-body text-sm uppercase tracking-wide">Productos</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Perks = () => {
  const items = [
    { icon: Truck, t: 'Envío a todo Chile', s: 'Despacho en 24-48h' },
    { icon: ShieldCheck, t: 'Garantía incluida', s: 'Hasta 24 meses' },
    { icon: CreditCard, t: 'Pago seguro', s: 'Mercado Pago' },
    { icon: Headphones, t: 'Soporte', s: 'Atención dedicada' },
  ];
  return (
    <section className="border-y border-gray-100 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((i) => (
          <div key={i.t} className="flex items-center gap-4">
            <i.icon className="text-[#C9A227]" size={26} />
            <div>
              <p className="font-medium text-[#1a1a1a] text-sm">{i.t}</p>
              <p className="text-gray-500 text-xs">{i.s}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function Home() {
  const { products, categories } = useApp();
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <Page data-testid="ecommerce-home">
      <Hero />
      <Perks />

      {/* Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="font-mono text-xs tracking-[0.3em] text-[#C9A227] uppercase mb-4">Explora</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1a1a1a]">Categorías</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, index) => {
              const count = products.filter((p) => p.categoryId === cat.id).length;
              return (
                <motion.div key={cat.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                  <Link to={`/ecommerce/catalogo?cat=${cat.slug}`} className="group relative block aspect-[3/4] overflow-hidden" data-testid={`category-${cat.slug}`}>
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-heading text-2xl text-white mb-1">{cat.name}</h3>
                      <p className="font-mono text-xs text-white/70">{count} productos</p>
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/0 group-hover:bg-[#C9A227] flex items-center justify-center transition-all duration-300">
                      <ChevronRight className="text-white group-hover:text-black" size={20} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-[#C9A227] uppercase mb-4">Lo mejor</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1a1a1a]">Destacados</h2>
            </div>
            <Link to="/ecommerce/catalogo" className="hidden md:flex items-center gap-2 text-[#1a1a1a] hover:text-[#C9A227] transition-colors text-sm tracking-wide">
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>
    </Page>
  );
}
