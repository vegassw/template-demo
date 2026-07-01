import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check, ArrowLeft, ArrowRight, ChevronDown, Loader2, CheckCircle2, ShieldCheck,
  Landmark, Banknote, Wallet, Smartphone, CreditCard, Copy,
} from 'lucide-react';
import { seedCountries, payoutMethods, venezuelaBanks, paymentMethods } from '@/data/seedData';
import { useApp } from '@/context/AppContext';
import { formatCLP } from '@/lib/format';
import { Page } from '@/components/PageTransition';

const nf = (n, d = 2) => Number(n).toLocaleString('es-CL', { maximumFractionDigits: d });
const payoutIcon = { Landmark, Banknote, Wallet, Smartphone };
const payIcon = { Landmark, CreditCard, Banknote };

export default function SendMoney() {
  const navigate = useNavigate();
  const { addTransfer } = useApp();
  const [params] = useSearchParams();

  const [step, setStep] = useState(1);
  const [code, setCode] = useState(params.get('pais') || 'VE');
  const [amount, setAmount] = useState(params.get('monto') || '100000');
  const [method, setMethod] = useState('');
  const [recipient, setRecipient] = useState({});
  const [payment, setPayment] = useState('');
  const [phase, setPhase] = useState('form'); // form | processing | success
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step, phase]);

  const country = seedCountries.find((c) => c.code === code);
  const amt = Number(amount) || 0;
  const fee = amt >= 200000 ? 0 : 2990;
  const total = amt + fee;
  const received = amt * (country?.rate || 0);
  const availableMethods = country ? country.methods : [];

  const setR = (k, v) => setRecipient((r) => ({ ...r, [k]: v }));

  const recipientValid = () => {
    if (!recipient.fullName) return false;
    if (method === 'bank') return recipient.bank && recipient.accountNumber && recipient.docId;
    if (method === 'cash') return recipient.docId && recipient.phone;
    if (method === 'wallet') return recipient.phone;
    if (method === 'pagomovil') return recipient.bankCode && recipient.phone && recipient.docId;
    return false;
  };

  const canNext = () => {
    if (step === 1) return !!country && amt > 0;
    if (step === 2) return !!method;
    if (step === 3) return recipientValid();
    if (step === 4) return !!payment;
    return false;
  };

  const handleConfirm = () => {
    setPhase('processing');
    setTimeout(() => {
      const t = addTransfer({
        countryCode: code, countryName: country.name, flag: country.flag,
        currency: country.currency, symbol: country.symbol,
        amount: amt, fee, total, received,
        method, methodLabel: payoutMethods[method].label,
        recipient,
        payment, paymentLabel: paymentMethods.find((p) => p.id === payment).label,
      });
      setConfirmed(t);
      setPhase('success');
    }, 2600);
  };

  // ---- Processing ----
  if (phase === 'processing') {
    return (
      <Page className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center max-w-sm" data-testid="send-processing">
          <div className="w-16 h-16 rounded-full bg-[#00B37E]/10 flex items-center justify-center mx-auto mb-8"><Loader2 size={34} className="animate-spin text-[#00B37E]" /></div>
          <p className="text-2xl font-bold text-[#0A2540] mb-2">Procesando tu envío…</p>
          <p className="text-[#5A6B85] text-sm">Validando la transacción de forma segura. No cierres esta ventana.</p>
        </div>
      </Page>
    );
  }

  // ---- Success ----
  if (phase === 'success' && confirmed) {
    return (
      <Page className="min-h-[70vh] flex items-center justify-center px-6 py-16">
        <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md w-full" data-testid="send-success">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="w-20 h-20 rounded-full bg-[#00B37E]/10 flex items-center justify-center mx-auto mb-7"><CheckCircle2 size={46} className="text-[#00B37E]" /></motion.div>
          <h1 className="text-3xl font-bold text-[#0A2540] mb-2">¡Envío realizado!</h1>
          <p className="text-[#5A6B85] mb-6">Tu dinero está en camino a {confirmed.countryName}. Guarda tu número de seguimiento.</p>
          <div className="bg-white border border-[#E4E9F2] rounded-2xl p-6 text-left space-y-3 mb-7">
            <div className="flex justify-between items-center"><span className="text-[#5A6B85] text-sm">N° de seguimiento</span><span className="font-mono font-bold text-[#0A2540]">{confirmed.id}</span></div>
            <div className="flex justify-between text-sm"><span className="text-[#5A6B85]">Recibe</span><span className="font-semibold text-[#00B37E]">{confirmed.symbol} {nf(confirmed.received)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-[#5A6B85]">Método</span><span className="font-medium text-[#0A2540]">{confirmed.methodLabel}</span></div>
            <div className="flex justify-between text-sm"><span className="text-[#5A6B85]">Estado</span><span className="inline-flex items-center gap-1.5 font-medium text-amber-600"><span className="w-2 h-2 rounded-full bg-amber-500" /> En proceso</span></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to={`/envialo/seguimiento?codigo=${confirmed.id}`} className="flex-1 inline-flex items-center justify-center gap-2 bg-[#00B37E] text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-[#009E6E] transition-colors" data-testid="go-tracking-btn">Seguir mi envío</Link>
            <Link to="/envialo" className="flex-1 inline-flex items-center justify-center border border-[#E4E9F2] text-[#0A2540] py-3.5 rounded-xl text-sm font-semibold hover:bg-white transition-colors">Volver al inicio</Link>
          </div>
        </motion.div>
      </Page>
    );
  }

  return (
    <Page className="max-w-3xl mx-auto px-6 py-10 md:py-14">
      <div data-testid="send-money-page">
        <Link to="/envialo" className="inline-flex items-center gap-2 text-sm text-[#5A6B85] hover:text-[#0A2540] mb-6"><ArrowLeft size={16} /> Volver</Link>
        <h1 className="text-3xl font-bold tracking-tight text-[#0A2540] mb-8">Enviar dinero</h1>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {['Monto', 'Entrega', 'Destinatario', 'Pago'].map((label, i) => {
            const n = i + 1;
            return (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${step >= n ? 'bg-[#00B37E] text-white' : 'bg-[#E4E9F2] text-[#5A6B85]'}`}>{step > n ? <Check size={16} /> : n}</div>
                  <span className="text-[11px] text-[#5A6B85] hidden sm:block">{label}</span>
                </div>
                {n < 4 && <div className={`flex-1 h-0.5 mx-1.5 ${step > n ? 'bg-[#00B37E]' : 'bg-[#E4E9F2]'}`} />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E9F2] p-6 md:p-8">
          {/* Step 1: amount + country */}
          {step === 1 && (
            <div data-testid="step-monto">
              <h2 className="text-xl font-bold text-[#0A2540] mb-5">¿Cuánto quieres enviar?</h2>
              <label className="block text-xs font-medium text-[#5A6B85] mb-1.5">Envías desde Chile</label>
              <div className="flex items-center gap-3 border border-[#E4E9F2] rounded-xl px-4 py-3 mb-4 bg-[#F6F8FB]">
                <span className="text-xl">🇨🇱</span>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="flex-1 bg-transparent text-lg font-bold text-[#0A2540] focus:outline-none" data-testid="send-amount" />
                <span className="text-sm font-semibold text-[#5A6B85]">CLP</span>
              </div>
              <label className="block text-xs font-medium text-[#5A6B85] mb-1.5">País destino</label>
              <div className="relative mb-5">
                <select value={code} onChange={(e) => setCode(e.target.value)} className="w-full appearance-none border border-[#E4E9F2] rounded-xl pl-4 pr-10 py-3 bg-white font-semibold text-[#0A2540] focus:outline-none focus:border-[#00B37E]" data-testid="send-country">
                  {seedCountries.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.currency})</option>)}
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6B85] pointer-events-none" />
              </div>
              <div className="rounded-xl bg-[#F6F8FB] p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#5A6B85]">Tipo de cambio</span><span className="font-medium text-[#0A2540]">1 CLP = {nf(country?.rate, 4)} {country?.currency}</span></div>
                <div className="flex justify-between"><span className="text-[#5A6B85]">Comisión</span><span className="font-medium text-[#0A2540]">{fee === 0 ? 'Gratis' : formatCLP(fee)}</span></div>
                <div className="flex justify-between"><span className="text-[#5A6B85]">Total a pagar</span><span className="font-semibold text-[#0A2540]">{formatCLP(total)}</span></div>
                <div className="flex justify-between pt-2 border-t border-[#E4E9F2]"><span className="text-[#5A6B85]">Recibe</span><span className="font-bold text-[#00B37E] text-base">{country?.symbol} {nf(received)}</span></div>
              </div>
            </div>
          )}

          {/* Step 2: delivery method */}
          {step === 2 && (
            <div data-testid="step-entrega">
              <h2 className="text-xl font-bold text-[#0A2540] mb-5">¿Cómo lo recibe en {country?.name}?</h2>
              <div className="space-y-3">
                {availableMethods.map((mId) => {
                  const m = payoutMethods[mId];
                  const Icon = payoutIcon[m.icon] || Landmark;
                  const active = method === mId;
                  return (
                    <button key={mId} onClick={() => setMethod(mId)} className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-colors ${active ? 'border-[#00B37E] bg-[#00B37E]/5' : 'border-[#E4E9F2] hover:border-[#00B37E]/50'}`} data-testid={`method-${mId}`}>
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${active ? 'bg-[#00B37E] text-white' : 'bg-[#F6F8FB] text-[#0A2540]'}`}><Icon size={20} /></div>
                      <div className="flex-1">
                        <p className="font-semibold text-[#0A2540] flex items-center gap-2">{m.label}{mId === 'pagomovil' && <span className="text-[10px] bg-[#0A2540] text-white px-2 py-0.5 rounded-full">VENEZUELA</span>}</p>
                        <p className="text-xs text-[#5A6B85]">{m.desc} · <span className="text-[#00B37E] font-medium">{m.time}</span></p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${active ? 'border-[#00B37E] bg-[#00B37E]' : 'border-gray-300'}`}>{active && <Check size={12} className="text-white" />}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: recipient */}
          {step === 3 && (
            <div data-testid="step-destinatario">
              <h2 className="text-xl font-bold text-[#0A2540] mb-1">Datos del destinatario</h2>
              <p className="text-sm text-[#5A6B85] mb-5">{payoutMethods[method]?.label} · {country?.name}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <input value={recipient.fullName || ''} onChange={(e) => setR('fullName', e.target.value)} placeholder="Nombre completo *" className="sm:col-span-2 border border-[#E4E9F2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#00B37E]" data-testid="rec-fullname" />

                {method === 'bank' && (<>
                  <input value={recipient.bank || ''} onChange={(e) => setR('bank', e.target.value)} placeholder="Banco *" className="border border-[#E4E9F2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#00B37E]" data-testid="rec-bank" />
                  <input value={recipient.accountNumber || ''} onChange={(e) => setR('accountNumber', e.target.value)} placeholder="N° de cuenta *" className="border border-[#E4E9F2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#00B37E]" data-testid="rec-account" />
                  <input value={recipient.docId || ''} onChange={(e) => setR('docId', e.target.value)} placeholder="Documento de identidad *" className="sm:col-span-2 border border-[#E4E9F2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#00B37E]" data-testid="rec-doc" />
                </>)}

                {method === 'cash' && (<>
                  <input value={recipient.docId || ''} onChange={(e) => setR('docId', e.target.value)} placeholder="Documento de identidad *" className="border border-[#E4E9F2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#00B37E]" data-testid="rec-doc" />
                  <input value={recipient.phone || ''} onChange={(e) => setR('phone', e.target.value)} placeholder="Teléfono *" className="border border-[#E4E9F2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#00B37E]" data-testid="rec-phone" />
                </>)}

                {method === 'wallet' && (
                  <input value={recipient.phone || ''} onChange={(e) => setR('phone', e.target.value)} placeholder="Teléfono o email de la billetera *" className="sm:col-span-2 border border-[#E4E9F2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#00B37E]" data-testid="rec-phone" />
                )}

                {method === 'pagomovil' && (<>
                  <div className="sm:col-span-2 bg-[#00B37E]/5 border border-[#00B37E]/20 rounded-xl p-3 text-xs text-[#0A2540]">
                    <b>Pago Móvil</b> usa 3 datos: banco (código de 4 dígitos), teléfono vinculado y cédula/RIF. El dinero llega en segundos.
                  </div>
                  <div className="relative">
                    <select value={recipient.bankCode || ''} onChange={(e) => setR('bankCode', e.target.value)} className="w-full appearance-none border border-[#E4E9F2] rounded-xl pl-4 pr-10 py-3 bg-white focus:outline-none focus:border-[#00B37E]" data-testid="rec-bankcode">
                      <option value="">Banco (código) *</option>
                      {venezuelaBanks.map((b) => <option key={b.code} value={b.code}>{b.code} · {b.name}</option>)}
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6B85] pointer-events-none" />
                  </div>
                  <input value={recipient.phone || ''} onChange={(e) => setR('phone', e.target.value)} placeholder="Teléfono (04XX...) *" className="border border-[#E4E9F2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#00B37E]" data-testid="rec-phone" />
                  <input value={recipient.docId || ''} onChange={(e) => setR('docId', e.target.value)} placeholder="Cédula o RIF *" className="sm:col-span-2 border border-[#E4E9F2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#00B37E]" data-testid="rec-doc" />
                </>)}
              </div>
            </div>
          )}

          {/* Step 4: payment */}
          {step === 4 && (
            <div data-testid="step-pago">
              <h2 className="text-xl font-bold text-[#0A2540] mb-5">¿Cómo quieres pagar?</h2>
              <div className="space-y-3 mb-6">
                {paymentMethods.map((p) => {
                  const Icon = payIcon[p.icon] || CreditCard;
                  const active = payment === p.id;
                  return (
                    <button key={p.id} onClick={() => setPayment(p.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-colors ${active ? 'border-[#00B37E] bg-[#00B37E]/5' : 'border-[#E4E9F2] hover:border-[#00B37E]/50'}`} data-testid={`pay-${p.id}`}>
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${active ? 'bg-[#00B37E] text-white' : 'bg-[#F6F8FB] text-[#0A2540]'}`}><Icon size={20} /></div>
                      <div className="flex-1"><p className="font-semibold text-[#0A2540]">{p.label}</p><p className="text-xs text-[#5A6B85]">{p.desc}</p></div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${active ? 'border-[#00B37E] bg-[#00B37E]' : 'border-gray-300'}`}>{active && <Check size={12} className="text-white" />}</div>
                    </button>
                  );
                })}
              </div>
              <div className="rounded-xl bg-[#F6F8FB] p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#5A6B85]">Destino</span><span className="font-medium text-[#0A2540]">{country?.flag} {country?.name}</span></div>
                <div className="flex justify-between"><span className="text-[#5A6B85]">Envías</span><span className="font-medium text-[#0A2540]">{formatCLP(amt)}</span></div>
                <div className="flex justify-between"><span className="text-[#5A6B85]">Comisión</span><span className="font-medium text-[#0A2540]">{fee === 0 ? 'Gratis' : formatCLP(fee)}</span></div>
                <div className="flex justify-between"><span className="text-[#5A6B85]">Recibe {recipient.fullName}</span><span className="font-bold text-[#00B37E]">{country?.symbol} {nf(received)}</span></div>
                <div className="flex justify-between pt-2 border-t border-[#E4E9F2] text-base"><span className="font-semibold text-[#0A2540]">Total a pagar</span><span className="font-bold text-[#0A2540]">{formatCLP(total)}</span></div>
              </div>
              <p className="flex items-center gap-2 text-xs text-[#9AA7BD] mt-4"><ShieldCheck size={14} /> Pasarela simulada · No se realizará ningún cobro real.</p>
            </div>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E4E9F2]">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 text-sm text-[#5A6B85] hover:text-[#0A2540]" data-testid="prev-btn"><ArrowLeft size={16} /> Atrás</button>
            ) : <span />}
            {step < 4 ? (
              <button onClick={() => { if (step === 2) setRecipient({}); setStep(step + 1); }} disabled={!canNext()} className="inline-flex items-center gap-2 bg-[#00B37E] text-white px-7 py-3 rounded-xl text-sm font-semibold hover:bg-[#009E6E] transition-colors disabled:opacity-40" data-testid="next-btn">Continuar <ArrowRight size={16} /></button>
            ) : (
              <button onClick={handleConfirm} disabled={!canNext()} className="inline-flex items-center gap-2 bg-[#0A2540] text-white px-7 py-3 rounded-xl text-sm font-semibold hover:bg-[#0B2A4A] transition-colors disabled:opacity-40" data-testid="confirm-send-btn">Pagar {formatCLP(total)}</button>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
