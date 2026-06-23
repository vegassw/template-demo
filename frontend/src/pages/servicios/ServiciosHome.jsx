import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Droplet, Scissors, Sparkles, Flower2, Smile, Shield, Stethoscope, Syringe, Heart,
  Clock, ArrowRight, Star, Truck, ShieldCheck, BadgePercent, Store, Stethoscope as Vet, ShoppingBag,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { petSpaImages } from '@/data/seedData';
import { formatCLP } from '@/lib/format';
import { PetProductCard } from '@/components/servicios/PetProductCard';
import { Page } from '@/components/PageTransition';

const iconMap = {
  droplet: Droplet, scissors: Scissors, sparkles: Sparkles, flower: Flower2, smile: Smile,
  shield: Shield, stethoscope: Stethoscope, syringe: Syringe, heart: Heart,
};

const BRANDS = ['Royal Canin', 'Hill\u2019s', 'Pro Plan', 'Eukanuba', 'Acana', 'Champion'];

export default function ServiciosHome() {
  const { services, petProducts, petCategories } = useApp();
  const featured = petProducts.filter((p) => p.featured).slice(0, 8);
  const vetServices = services.filter((s) => s.category === 'veterinaria');
  const groomServices = services.filter((s) => s.category !== 'veterinaria');

  const catImg = {
    alimento: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=700&q=85&auto=format',
    juguetes: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=700&q=85&auto=format',
    higiene: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=700&q=85&auto=format',
    accesorios: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=700&q=85&auto=format',
  };

  return (
    <Page data-testid="servicios-home">
      {/* Announcement bar */}
      <div className="bg-[#2E3A35] text-white text-xs md:text-sm">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-2.5 flex items-center justify-center gap-6 text-center">
          <span className="flex items-center gap-2"><Truck size={14} className="text-[#7BAE8F]" /> Envío gratis sobre $30.000</span>
          <span className="hidden sm:flex items-center gap-2"><ShieldCheck size={14} className="text-[#7BAE8F]" /> Veterinaria & Peluquería</span>
          <span className="hidden md:flex items-center gap-2"><BadgePercent size={14} className="text-[#7BAE8F]" /> Hasta 40% OFF</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="space-y-6">
            <span className="inline-flex items-center gap-2 bg-[#E8845E]/15 text-[#C56A45] px-4 py-2 rounded-full text-xs font-bold tracking-wide">
              <BadgePercent size={14} /> OFERTAS · Hasta 40% OFF
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#2E3A35] leading-[1.08]">
              Todo para tu mascota, <span className="text-[#7BAE8F]">en un solo lugar</span>
            </h1>
            <p className="text-[#5C6660] text-lg leading-relaxed max-w-md">
              Veterinaria, peluquería y tienda de alimentos y accesorios. Compra en línea, agenda tu cita y cuida a tu engreído con lo mejor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/servicios/tienda" className="inline-flex items-center justify-center gap-2 bg-[#7BAE8F] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#6B9E7F] transition-colors" data-testid="hero-comprar-btn">
                Comprar ahora <ArrowRight size={18} />
              </Link>
              <Link to="/servicios/agendar" className="inline-flex items-center justify-center gap-2 border-2 border-[#2E3A35] text-[#2E3A35] px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#2E3A35] hover:text-white transition-colors" data-testid="hero-agendar-btn">
                Agendar cita
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-1 text-[#E8B45E]">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
              <span className="text-sm text-[#5C6660]">+2.000 mascotas felices</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden">
              <img src={petSpaImages.hero} alt="Mascotas felices" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-lg p-5 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#7BAE8F]/15 flex items-center justify-center"><Truck size={20} className="text-[#7BAE8F]" /></div>
              <div><p className="font-heading text-base text-[#2E3A35] leading-none">Envío gratis</p><p className="text-xs text-[#5C6660]">sobre $30.000</p></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="py-6">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid sm:grid-cols-3 gap-5">
          {[
            { icon: Vet, title: 'Veterinaria', desc: 'Consultas, vacunas y controles con profesionales.', to: '/servicios/agendar', cta: 'Reservar hora' },
            { icon: Scissors, title: 'Peluquería & Spa', desc: 'Baños, cortes y tratamientos relajantes.', to: '/servicios/agendar', cta: 'Agendar' },
            { icon: Store, title: 'Tienda', desc: 'Alimentos, juguetes, higiene y accesorios.', to: '/servicios/tienda', cta: 'Comprar' },
          ].map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-[#E8E0D5] p-6 flex flex-col" data-testid={`pillar-${p.title.toLowerCase().split(' ')[0]}`}>
              <div className="w-12 h-12 rounded-xl bg-[#7BAE8F]/15 flex items-center justify-center mb-4"><p.icon size={24} className="text-[#7BAE8F]" /></div>
              <h3 className="font-heading text-xl text-[#2E3A35] mb-1">{p.title}</h3>
              <p className="text-sm text-[#5C6660] mb-4 flex-1">{p.desc}</p>
              <Link to={p.to} className="inline-flex items-center gap-1 text-[#7BAE8F] text-sm font-semibold hover:gap-2 transition-all">{p.cta} <ArrowRight size={15} /></Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#7BAE8F] text-sm tracking-[0.2em] uppercase font-medium mb-2">Compra por categoría</p>
              <h2 className="font-heading text-3xl md:text-4xl text-[#2E3A35]">Explora la tienda</h2>
            </div>
            <Link to="/servicios/tienda" className="hidden md:inline-flex items-center gap-1 text-[#7BAE8F] text-sm font-semibold hover:gap-2 transition-all">Ver todo <ArrowRight size={15} /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {petCategories.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Link to={`/servicios/tienda?cat=${c.slug}`} className="group relative block aspect-[4/3] rounded-2xl overflow-hidden" data-testid={`home-cat-${c.slug}`}>
                  <img src={catImg[c.slug]} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-heading text-xl text-white">{c.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#7BAE8F] text-sm tracking-[0.2em] uppercase font-medium mb-2">Los favoritos</p>
              <h2 className="font-heading text-3xl md:text-4xl text-[#2E3A35]">Más vendidos</h2>
            </div>
            <Link to="/servicios/tienda" className="hidden md:inline-flex items-center gap-1 text-[#7BAE8F] text-sm font-semibold hover:gap-2 transition-all">Ver tienda <ArrowRight size={15} /></Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {featured.map((p, i) => <PetProductCard key={p.id} product={p} index={i} />)}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link to="/servicios/tienda" className="inline-flex items-center gap-2 bg-[#7BAE8F] text-white px-7 py-3 rounded-full text-sm font-semibold">Ver toda la tienda <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="text-center text-[#5C6660] text-sm mb-6">Trabajamos con las mejores marcas</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {BRANDS.map((b) => (
              <span key={b} className="bg-white border border-[#E8E0D5] rounded-full px-5 py-2.5 text-sm font-heading text-[#2E3A35]">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Promo band */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#2E3A35] px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="pointer-events-none absolute -right-10 -top-10 w-56 h-56 rounded-full bg-[#7BAE8F]/20 blur-3xl" />
            <div className="relative">
              <p className="text-[#7BAE8F] text-sm tracking-[0.2em] uppercase font-medium mb-2">Primera compra</p>
              <h2 className="font-heading text-3xl md:text-4xl text-white mb-2">Envío gratis sobre $30.000</h2>
              <p className="text-white/70 max-w-md">Recibe alimentos y productos en la puerta de tu casa. Pago en línea 100% seguro.</p>
            </div>
            <Link to="/servicios/tienda" className="relative inline-flex items-center gap-2 bg-[#7BAE8F] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#6B9E7F] transition-colors whitespace-nowrap" data-testid="home-tienda-cta">
              Ir a la tienda <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="text-center mb-10">
            <p className="text-[#7BAE8F] text-sm tracking-[0.2em] uppercase mb-3 font-medium">Servicios profesionales</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#2E3A35]">Veterinaria & Peluquería</h2>
          </div>

          <h3 className="flex items-center gap-2 font-heading text-xl text-[#2E3A35] mb-5"><Stethoscope size={20} className="text-[#7BAE8F]" /> Veterinaria</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {vetServices.map((svc, i) => <ServiceCard key={svc.id} svc={svc} i={i} />)}
          </div>

          <h3 className="flex items-center gap-2 font-heading text-xl text-[#2E3A35] mb-5"><Scissors size={20} className="text-[#7BAE8F]" /> Peluquería & Spa</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {groomServices.map((svc, i) => <ServiceCard key={svc.id} svc={svc} i={i} />)}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="galeria" className="py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="text-center mb-10">
            <p className="text-[#7BAE8F] text-sm tracking-[0.2em] uppercase mb-3 font-medium">Galería</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#2E3A35]">Momentos felices</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[petSpaImages.bath, petSpaImages.grooming, petSpaImages.gallery1, petSpaImages.gallery2, petSpaImages.gallery3, petSpaImages.staff, petSpaImages.hero, petSpaImages.bath].slice(0, 8).map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.06 }}
                className={`overflow-hidden rounded-2xl ${i % 5 === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'}`}>
                <img src={img} alt="Galería" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] rounded-[2rem] overflow-hidden">
            <img src={petSpaImages.staff} alt="Nuestro equipo" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-5">
            <p className="text-[#7BAE8F] text-sm tracking-[0.2em] uppercase font-medium">Sobre nosotros</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#2E3A35]">Profesionales que aman a los animales</h2>
            <p className="text-[#5C6660] leading-relaxed">Veterinarios y peluqueros certificados que tratan a cada mascota con paciencia y cariño. Productos hipoalergénicos y un ambiente libre de estrés.</p>
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[['10+', 'Años'], ['8', 'Especialistas'], ['100%', 'Clientes felices']].map(([n, l]) => (
                <div key={l}><p className="font-heading text-3xl text-[#7BAE8F]">{n}</p><p className="text-xs text-[#5C6660] mt-1">{l}</p></div>
              ))}
            </div>
            <Link to="/servicios/agendar" className="inline-flex items-center gap-2 bg-[#7BAE8F] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#6B9E7F] transition-colors mt-2">
              Agendar una cita <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </Page>
  );
}

const ServiceCard = ({ svc, i }) => {
  const Icon = iconMap[svc.icon] || Sparkles;
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.06 }}
      className={`relative rounded-2xl p-6 border transition-all hover:shadow-md ${svc.featured ? 'bg-[#2E3A35] border-[#2E3A35] text-white' : 'bg-[#FAF7F2] border-[#E8E0D5]'}`}
      data-testid={`service-card-${svc.id}`}>
      {svc.featured && <span className="absolute top-5 right-5 bg-[#7BAE8F] text-white text-[10px] px-3 py-1 rounded-full font-medium tracking-wide">POPULAR</span>}
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${svc.featured ? 'bg-[#7BAE8F]' : 'bg-[#7BAE8F]/15'}`}>
        <Icon size={20} className={svc.featured ? 'text-white' : 'text-[#7BAE8F]'} />
      </div>
      <h3 className={`font-heading text-lg mb-2 ${svc.featured ? 'text-white' : 'text-[#2E3A35]'}`}>{svc.name}</h3>
      <p className={`text-sm leading-relaxed mb-4 ${svc.featured ? 'text-white/70' : 'text-[#5C6660]'}`}>{svc.description}</p>
      <div className="flex items-center justify-between">
        <span className={`font-heading text-xl ${svc.featured ? 'text-[#7BAE8F]' : 'text-[#2E3A35]'}`}>{formatCLP(svc.price)}</span>
        <span className={`inline-flex items-center gap-1 text-xs ${svc.featured ? 'text-white/60' : 'text-[#5C6660]'}`}><Clock size={14} /> {svc.duration} min</span>
      </div>
      <Link to={`/servicios/agendar?servicio=${svc.id}`} className={`mt-4 block text-center py-2.5 rounded-full text-sm font-medium transition-colors ${svc.featured ? 'bg-[#7BAE8F] text-white hover:bg-[#6B9E7F]' : 'bg-white border border-[#E8E0D5] text-[#2E3A35] hover:border-[#7BAE8F]'}`} data-testid={`book-${svc.id}`}>
        Reservar
      </Link>
    </motion.div>
  );
};
