import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Droplet, Scissors, Sparkles, Flower2, Smile, Shield, Clock, ArrowRight, Heart, Star } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { petSpaImages } from '@/data/seedData';
import { formatCLP } from '@/lib/format';
import { Page } from '@/components/PageTransition';

const iconMap = { droplet: Droplet, scissors: Scissors, sparkles: Sparkles, flower: Flower2, smile: Smile, shield: Shield };

export default function ServiciosHome() {
  const { services } = useApp();

  return (
    <Page data-testid="servicios-home">
      {/* Hero */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="space-y-7">
            <span className="inline-flex items-center gap-2 bg-[#7BAE8F]/15 text-[#5A8C6E] px-4 py-2 rounded-full text-xs font-medium tracking-wide">
              <Heart size={14} /> Cuidado con amor desde 2015
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#2E3A35] leading-[1.08]">
              Tu mejor amigo merece un <span className="text-[#7BAE8F]">día de spa</span>
            </h1>
            <p className="text-[#5C6660] text-lg leading-relaxed max-w-md">
              Peluquería y spa canino profesional. Baños, cortes estéticos y tratamientos relajantes para que tu mascota luzca y se sienta increíble.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/servicios/agendar" className="inline-flex items-center justify-center gap-2 bg-[#7BAE8F] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#6B9E7F] transition-colors" data-testid="hero-agendar-btn">
                Agendar cita <ArrowRight size={18} />
              </Link>
              <a href="#servicios" className="inline-flex items-center justify-center gap-2 border-2 border-[#2E3A35] text-[#2E3A35] px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#2E3A35] hover:text-white transition-colors">
                Ver servicios
              </a>
            </div>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-1 text-[#7BAE8F]">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
              <span className="text-sm text-[#5C6660]">+2.000 mascotas felices</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden">
              <img src={petSpaImages.hero} alt="Spa canino" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-lg p-5 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#7BAE8F]/15 flex items-center justify-center"><Sparkles size={20} className="text-[#7BAE8F]" /></div>
              <div><p className="font-heading text-xl text-[#2E3A35] leading-none">100%</p><p className="text-xs text-[#5C6660]">Productos naturales</p></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <p className="text-[#7BAE8F] text-sm tracking-[0.2em] uppercase mb-3 font-medium">Nuestros servicios</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#2E3A35]">Cuidado a la medida de tu mascota</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const Icon = iconMap[svc.icon] || Sparkles;
              return (
                <motion.div key={svc.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }}
                  className={`relative rounded-2xl p-7 border transition-all hover:shadow-md ${svc.featured ? 'bg-[#2E3A35] border-[#2E3A35] text-white' : 'bg-[#FAF7F2] border-[#E8E0D5]'}`}
                  data-testid={`service-card-${svc.id}`}>
                  {svc.featured && <span className="absolute top-5 right-5 bg-[#7BAE8F] text-white text-[10px] px-3 py-1 rounded-full font-medium tracking-wide">POPULAR</span>}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${svc.featured ? 'bg-[#7BAE8F]' : 'bg-[#7BAE8F]/15'}`}>
                    <Icon size={22} className={svc.featured ? 'text-white' : 'text-[#7BAE8F]'} />
                  </div>
                  <h3 className={`font-heading text-xl mb-2 ${svc.featured ? 'text-white' : 'text-[#2E3A35]'}`}>{svc.name}</h3>
                  <p className={`text-sm leading-relaxed mb-5 ${svc.featured ? 'text-white/70' : 'text-[#5C6660]'}`}>{svc.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`font-heading text-2xl ${svc.featured ? 'text-[#7BAE8F]' : 'text-[#2E3A35]'}`}>{formatCLP(svc.price)}</span>
                    <span className={`inline-flex items-center gap-1 text-xs ${svc.featured ? 'text-white/60' : 'text-[#5C6660]'}`}><Clock size={14} /> {svc.duration} min</span>
                  </div>
                  <Link to="/servicios/agendar" className={`mt-5 block text-center py-2.5 rounded-full text-sm font-medium transition-colors ${svc.featured ? 'bg-[#7BAE8F] text-white hover:bg-[#6B9E7F]' : 'bg-white border border-[#E8E0D5] text-[#2E3A35] hover:border-[#7BAE8F]'}`} data-testid={`book-${svc.id}`}>
                    Reservar
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Store promo band */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#2E3A35] px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="pointer-events-none absolute -right-10 -top-10 w-56 h-56 rounded-full bg-[#7BAE8F]/20 blur-3xl" />
            <div className="relative">
              <p className="text-[#7BAE8F] text-sm tracking-[0.2em] uppercase font-medium mb-2">Nueva tienda online</p>
              <h2 className="font-heading text-3xl md:text-4xl text-white mb-2">Alimento, juguetes y más</h2>
              <p className="text-white/70 max-w-md">Compra todo lo que tu mascota necesita y recíbelo en casa. Pago en línea seguro.</p>
            </div>
            <Link to="/servicios/tienda" className="relative inline-flex items-center gap-2 bg-[#7BAE8F] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#6B9E7F] transition-colors whitespace-nowrap" data-testid="home-tienda-cta">
              Ir a la tienda <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="galeria" className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
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

      {/* Nosotros / CTA */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] rounded-[2rem] overflow-hidden">
            <img src={petSpaImages.staff} alt="Nuestro equipo" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-5">
            <p className="text-[#7BAE8F] text-sm tracking-[0.2em] uppercase font-medium">Sobre nosotros</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#2E3A35]">Profesionales que aman a los animales</h2>
            <p className="text-[#5C6660] leading-relaxed">Nuestro equipo de peluqueros certificados trata a cada mascota con paciencia, cariño y técnicas seguras. Usamos productos hipoalergénicos y un ambiente libre de estrés.</p>
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[['10+', 'Años de experiencia'], ['8', 'Especialistas'], ['100%', 'Clientes felices']].map(([n, l]) => (
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
