import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, BadgePercent, Globe2, ChevronDown, Send, Clock } from 'lucide-react';
import { seedCountries } from '@/data/seedData';
import { formatCLP } from '@/lib/format';
import { Page } from '@/components/PageTransition';

const nf = (n, d = 2) => Number(n).toLocaleString('es-CL', { maximumFractionDigits: d });

export const QuoteCard = ({ onContinue, initialCode = 'VE', initialAmount = 100000 }) => {
  const [code, setCode] = useState(initialCode);
  const [amount, setAmount] = useState(String(initialAmount));
  const country = seedCountries.find((c) => c.code === code);
  const amt = Number(amount) || 0;
  const fee = amt >= 200000 ? 0 : 2990;
  const total = amt + fee;
  const received = amt * (country?.rate || 0);

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-[#0A2540]/5 border border-[#E4E9F2] p-6 md:p-7" data-testid="quote-card">
      <p className="text-sm font-semibold text-[#0A2540] mb-4">Cotiza tu envío</p>

      <label className="block text-xs font-medium text-[#5A6B85] mb-1.5">Envías desde Chile</label>
      <div className="flex items-center gap-3 border border-[#E4E9F2] rounded-xl px-4 py-3 mb-3 bg-[#F6F8FB]">
        <span className="text-xl">🇨🇱</span>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="flex-1 bg-transparent text-lg font-bold text-[#0A2540] focus:outline-none" data-testid="quote-amount" />
        <span className="text-sm font-semibold text-[#5A6B85]">CLP</span>
      </div>

      <label className="block text-xs font-medium text-[#5A6B85] mb-1.5">El destinatario recibe en</label>
      <div className="relative mb-4">
        <select value={code} onChange={(e) => setCode(e.target.value)} className="w-full appearance-none border border-[#E4E9F2] rounded-xl pl-4 pr-10 py-3 bg-white font-semibold text-[#0A2540] focus:outline-none focus:border-[#00B37E]" data-testid="quote-country">
          {seedCountries.map((c) => (
            <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.currency})</option>
          ))}
        </select>
        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6B85] pointer-events-none" />
      </div>

      <div className="rounded-xl bg-[#F6F8FB] p-4 space-y-2 mb-5 text-sm">
        <div className="flex justify-between"><span className="text-[#5A6B85]">Tipo de cambio</span><span className="font-medium text-[#0A2540]">1 CLP = {nf(country?.rate, 4)} {country?.currency}</span></div>
        <div className="flex justify-between"><span className="text-[#5A6B85]">Comisión</span><span className="font-medium text-[#0A2540]">{fee === 0 ? 'Gratis' : formatCLP(fee)}</span></div>
        <div className="flex justify-between"><span className="text-[#5A6B85]">Total a pagar</span><span className="font-semibold text-[#0A2540]">{formatCLP(total)}</span></div>
        <div className="flex justify-between pt-2 border-t border-[#E4E9F2]">
          <span className="text-[#5A6B85]">Recibe</span>
          <span className="font-bold text-[#00B37E] text-base">{country?.symbol} {nf(received)}</span>
        </div>
      </div>

      <button onClick={() => onContinue(code, amt)} disabled={amt <= 0} className="w-full inline-flex items-center justify-center gap-2 bg-[#00B37E] text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-[#009E6E] transition-colors disabled:opacity-40" data-testid="quote-continue-btn">
        Continuar <ArrowRight size={17} />
      </button>
      <p className="text-center text-[11px] text-[#9AA7BD] mt-3">Tipo de cambio referencial · Demo</p>
    </div>
  );
};

export default function EnvialoHome() {
  const navigate = useNavigate();
  const goContinue = (code, amount) => navigate(`/envialo/enviar?pais=${code}&monto=${amount}`);

  const steps = [
    { icon: Globe2, t: 'Elige el destino', d: 'Selecciona el país y el monto a enviar.' },
    { icon: Send, t: 'Ingresa los datos', d: 'Datos del destinatario y método de entrega.' },
    { icon: Zap, t: 'Recibe en minutos', d: 'Confirma el pago y sigue tu envío en tiempo real.' },
  ];

  return (
    <Page data-testid="envialo-home">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-[#00B37E]/10 blur-[100px]" />
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
            <span className="inline-flex items-center gap-2 bg-[#00B37E]/10 text-[#00805a] px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <BadgePercent size={14} /> Sin comisión sobre $200.000
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-[#0A2540] leading-[1.08]">
              Envía dinero a tu familia <span className="text-[#00B37E]">en minutos</span>
            </h1>
            <p className="text-[#5A6B85] text-lg leading-relaxed max-w-md">
              Transferencias seguras a Latinoamérica al mejor tipo de cambio. Depósito bancario, efectivo, billetera y Pago Móvil.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-1">
              <div className="flex items-center gap-2 text-sm text-[#5A6B85]"><ShieldCheck size={18} className="text-[#00B37E]" /> 100% seguro</div>
              <div className="flex items-center gap-2 text-sm text-[#5A6B85]"><Zap size={18} className="text-[#00B37E]" /> Entrega en minutos</div>
              <div className="flex items-center gap-2 text-sm text-[#5A6B85]"><Globe2 size={18} className="text-[#00B37E]" /> 6 países</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <QuoteCard onContinue={goContinue} />
          </motion.div>
        </div>
      </section>

      {/* Countries */}
      <section className="py-8 border-y border-[#E4E9F2] bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="text-center text-sm text-[#5A6B85] mb-5">Enviamos desde Chile a</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {seedCountries.map((c) => (
              <span key={c.code} className="inline-flex items-center gap-2 bg-[#F6F8FB] border border-[#E4E9F2] rounded-full px-4 py-2 text-sm font-medium text-[#0A2540]">
                <span className="text-lg">{c.flag}</span> {c.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <p className="text-[#00B37E] text-sm font-semibold tracking-wide uppercase mb-2">Simple y rápido</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0A2540]">Envía en 3 pasos</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-[#E4E9F2] p-7 relative">
                <span className="absolute top-6 right-7 text-5xl font-bold text-[#F0F3F8]">{i + 1}</span>
                <div className="w-12 h-12 rounded-xl bg-[#0A2540] flex items-center justify-center mb-5"><s.icon size={22} className="text-[#00B37E]" /></div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-2">{s.t}</h3>
                <p className="text-sm text-[#5A6B85] leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="relative overflow-hidden rounded-3xl bg-[#0A2540] px-8 py-12 md:px-14 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="pointer-events-none absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[#00B37E]/20 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Tu primer envío sin comisión</h2>
              <p className="text-white/70 max-w-md">Rápido, seguro y al mejor tipo de cambio. Empieza ahora en menos de 2 minutos.</p>
            </div>
            <Link to="/envialo/enviar" className="relative inline-flex items-center gap-2 bg-[#00B37E] text-white px-8 py-4 rounded-xl text-sm font-semibold hover:bg-[#009E6E] transition-colors whitespace-nowrap" data-testid="cta-enviar-btn">
              Enviar dinero <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </Page>
  );
}
