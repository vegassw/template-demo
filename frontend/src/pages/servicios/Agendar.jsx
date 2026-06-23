import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Clock, Calendar as CalIcon, PawPrint, ArrowLeft, ArrowRight, CheckCircle2, PartyPopper } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCLP } from '@/lib/format';
import { Page } from '@/components/PageTransition';

const TIME_SLOTS = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'];

const minDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });
};

export default function Agendar() {
  const { services, addBooking } = useApp();
  const [searchParams] = useSearchParams();
  const preselectId = searchParams.get('servicio');
  const hasPreselect = !!(preselectId && services.find((s) => s.id === preselectId));
  const [step, setStep] = useState(hasPreselect ? 2 : 1); // 1 service, 2 date/time, 3 data, 4 done
  const [data, setData] = useState({ serviceId: hasPreselect ? preselectId : '', date: '', time: '', petName: '', petBreed: '', ownerName: '', phone: '' });
  const [confirmed, setConfirmed] = useState(null);

  // Scroll to top whenever the wizard step changes (mobile UX)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [step]);

  const service = services.find((s) => s.id === data.serviceId);
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const canNext = () => {
    if (step === 1) return !!data.serviceId;
    if (step === 2) return !!data.date && !!data.time;
    if (step === 3) return data.petName && data.ownerName && data.phone;
    return false;
  };

  const handleConfirm = () => {
    const booking = addBooking({ ...data, serviceName: service.name, price: service.price });
    setConfirmed(booking);
    setStep(4);
  };

  // ---- Confirmation ----
  if (step === 4 && confirmed) {
    return (
      <Page className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center" data-testid="booking-confirmed">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="w-20 h-20 rounded-full bg-[#14B8A6]/15 flex items-center justify-center mx-auto mb-7">
            <CheckCircle2 size={48} className="text-[#14B8A6]" />
          </motion.div>
          <span className="inline-flex items-center gap-2 text-[#14B8A6] text-sm font-medium mb-3"><PartyPopper size={16} /> ¡Listo!</span>
          <h1 className="font-heading text-3xl md:text-4xl text-[#134E4A] mb-3">Cita agendada</h1>
          <p className="text-[#5C6660] mb-8">Te esperamos para consentir a {confirmed.petName}. Te enviaremos un recordatorio por WhatsApp.</p>
          <div className="bg-white rounded-2xl border border-[#CCEFE9] p-7 text-left space-y-3 mb-8">
            <Row label="Código" value={confirmed.id.toUpperCase()} mono />
            <Row label="Servicio" value={confirmed.serviceName} />
            <Row label="Mascota" value={`${confirmed.petName}${confirmed.petBreed ? ` · ${confirmed.petBreed}` : ''}`} />
            <Row label="Fecha" value={formatDate(confirmed.date)} cap />
            <Row label="Hora" value={confirmed.time} />
            <div className="flex justify-between pt-3 border-t border-[#CCEFE9]"><span className="text-[#5C6660]">Total</span><span className="font-heading text-xl text-[#14B8A6]">{formatCLP(confirmed.price)}</span></div>
          </div>
          <Link to="/servicios" className="inline-flex items-center gap-2 bg-[#134E4A] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#0B3B38] transition-colors" data-testid="back-servicios-btn">
            Volver al inicio
          </Link>
        </motion.div>
      </Page>
    );
  }

  return (
    <Page className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <div data-testid="agendar-page">
        <Link to="/servicios" className="inline-flex items-center gap-2 text-sm text-[#5C6660] hover:text-[#14B8A6] mb-8"><ArrowLeft size={16} /> Volver</Link>
        <h1 className="font-heading text-3xl md:text-4xl text-[#134E4A] mb-2">Agenda tu cita</h1>
        <p className="text-[#5C6660] mb-10">En 3 simples pasos reservas el spa para tu mascota.</p>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 max-w-md">
          {[1, 2, 3].map((n) => (
            <React.Fragment key={n}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= n ? 'bg-[#14B8A6] text-white' : 'bg-[#CCEFE9] text-[#5C6660]'}`}>
                  {step > n ? <Check size={18} /> : n}
                </div>
                <span className="text-xs text-[#5C6660]">{['Servicio', 'Fecha', 'Datos'][n - 1]}</span>
              </div>
              {n < 3 && <div className={`flex-1 h-0.5 mx-2 ${step > n ? 'bg-[#14B8A6]' : 'bg-[#CCEFE9]'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-[#CCEFE9] p-6 md:p-8">
          {/* Step 1: Service */}
          {step === 1 && (
            <div className="space-y-3" data-testid="step-service">
              <h2 className="font-heading text-xl text-[#134E4A] mb-4">Elige un servicio</h2>
              {services.map((s) => (
                <button key={s.id} onClick={() => set('serviceId', s.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-colors ${data.serviceId === s.id ? 'border-[#14B8A6] bg-[#14B8A6]/5' : 'border-[#CCEFE9] hover:border-[#14B8A6]/50'}`}
                  data-testid={`select-service-${s.id}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${data.serviceId === s.id ? 'border-[#14B8A6] bg-[#14B8A6]' : 'border-gray-300'}`}>
                      {data.serviceId === s.id && <Check size={12} className="text-white" />}
                    </div>
                    <div>
                      <p className="font-medium text-[#134E4A]">{s.name}</p>
                      <p className="text-xs text-[#5C6660] flex items-center gap-1"><Clock size={12} /> {s.duration} min</p>
                    </div>
                  </div>
                  <span className="font-heading text-lg text-[#14B8A6]">{formatCLP(s.price)}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div data-testid="step-datetime">
              <h2 className="font-heading text-xl text-[#134E4A] mb-4">Elige fecha y hora</h2>
              <label className="block text-sm font-medium text-[#134E4A] mb-2"><CalIcon size={16} className="inline mr-1" /> Fecha</label>
              <input type="date" min={minDate()} value={data.date} onChange={(e) => set('date', e.target.value)}
                className="w-full border border-[#CCEFE9] rounded-xl px-4 py-3 mb-6 focus:border-[#14B8A6] focus:outline-none" data-testid="date-input" />
              <label className="block text-sm font-medium text-[#134E4A] mb-3"><Clock size={16} className="inline mr-1" /> Hora disponible</label>
              <div className="grid grid-cols-3 gap-3">
                {TIME_SLOTS.map((t) => (
                  <button key={t} onClick={() => set('time', t)}
                    className={`py-3 rounded-xl border text-sm font-medium transition-colors ${data.time === t ? 'border-[#14B8A6] bg-[#14B8A6] text-white' : 'border-[#CCEFE9] text-[#134E4A] hover:border-[#14B8A6]'}`}
                    data-testid={`slot-${t}`}>{t}</button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Data */}
          {step === 3 && (
            <div className="space-y-4" data-testid="step-data">
              <h2 className="font-heading text-xl text-[#134E4A] mb-2 flex items-center gap-2"><PawPrint size={20} className="text-[#14B8A6]" /> Datos de la mascota y tutor</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input value={data.petName} onChange={(e) => set('petName', e.target.value)} placeholder="Nombre de la mascota *" className="border border-[#CCEFE9] rounded-xl px-4 py-3 focus:border-[#14B8A6] focus:outline-none" data-testid="pet-name" />
                <input value={data.petBreed} onChange={(e) => set('petBreed', e.target.value)} placeholder="Raza (opcional)" className="border border-[#CCEFE9] rounded-xl px-4 py-3 focus:border-[#14B8A6] focus:outline-none" data-testid="pet-breed" />
                <input value={data.ownerName} onChange={(e) => set('ownerName', e.target.value)} placeholder="Tu nombre *" className="border border-[#CCEFE9] rounded-xl px-4 py-3 focus:border-[#14B8A6] focus:outline-none" data-testid="owner-name" />
                <input value={data.phone} onChange={(e) => set('phone', e.target.value)} placeholder="Teléfono / WhatsApp *" className="border border-[#CCEFE9] rounded-xl px-4 py-3 focus:border-[#14B8A6] focus:outline-none" data-testid="owner-phone" />
              </div>
              {/* Summary */}
              <div className="bg-[#F0FDFA] rounded-xl p-5 mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#5C6660]">Servicio</span><span className="font-medium text-[#134E4A]">{service?.name}</span></div>
                <div className="flex justify-between"><span className="text-[#5C6660]">Fecha</span><span className="font-medium text-[#134E4A] capitalize">{formatDate(data.date)} · {data.time}</span></div>
                <div className="flex justify-between pt-2 border-t border-[#CCEFE9]"><span className="text-[#5C6660]">Total</span><span className="font-heading text-lg text-[#14B8A6]">{formatCLP(service?.price)}</span></div>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#CCEFE9]">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 text-sm text-[#5C6660] hover:text-[#134E4A]" data-testid="prev-step-btn"><ArrowLeft size={16} /> Atrás</button>
            ) : <span />}
            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} disabled={!canNext()} className="inline-flex items-center gap-2 bg-[#14B8A6] text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-[#0D9488] transition-colors disabled:opacity-40 disabled:cursor-not-allowed" data-testid="next-step-btn">
                Continuar <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={handleConfirm} disabled={!canNext()} className="inline-flex items-center gap-2 bg-[#134E4A] text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-[#0B3B38] transition-colors disabled:opacity-40 disabled:cursor-not-allowed" data-testid="confirm-booking-btn">
                Confirmar cita <Check size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}

const Row = ({ label, value, mono, cap }) => (
  <div className="flex justify-between">
    <span className="text-[#5C6660]">{label}</span>
    <span className={`font-medium text-[#134E4A] ${mono ? 'font-mono' : ''} ${cap ? 'capitalize' : ''}`}>{value}</span>
  </div>
);
