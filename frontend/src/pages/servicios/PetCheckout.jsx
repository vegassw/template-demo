import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, ArrowLeft, Lock, ShieldCheck, PawPrint } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCLP } from '@/lib/format';
import { Page } from '@/components/PageTransition';

const MP_BLUE = '#009EE3';

export default function PetCheckout() {
  const { petCart, petCartTotal, clearPetCart } = useApp();
  const [step, setStep] = useState('form');
  const [orderId] = useState(() => `MP-${Date.now().toString().slice(-8)}`);
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', direccion: '', ciudad: '', metodo: 'tarjeta' });

  const shipping = petCartTotal > 30000 ? 0 : 3990;
  const total = petCartTotal + shipping;

  if (petCart.length === 0 && step !== 'success') {
    return (
      <Page className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="font-heading text-3xl text-[#134E4A] mb-4">No hay productos para pagar</h1>
        <Link to="/servicios/tienda" className="text-[#14B8A6] hover:underline">Ir a la tienda</Link>
      </Page>
    );
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => { clearPetCart(); setStep('success'); }, 2800);
  };

  if (step === 'processing') {
    return (
      <Page className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center max-w-sm" data-testid="pet-checkout-processing">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: `${MP_BLUE}15` }}>
            <Loader2 size={36} className="animate-spin" style={{ color: MP_BLUE }} />
          </div>
          <p className="font-heading text-2xl text-[#134E4A] mb-2">Procesando tu pago…</p>
          <p className="text-[#5C6660] text-sm">Conectando con Mercado Pago de forma segura. No cierres esta ventana.</p>
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400"><Lock size={14} /> Pago protegido · Demo simulada</div>
        </div>
      </Page>
    );
  }

  if (step === 'success') {
    return (
      <Page className="min-h-[70vh] flex items-center justify-center px-6 py-16">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md" data-testid="pet-checkout-success">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="w-20 h-20 rounded-full bg-[#14B8A6]/15 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-[#14B8A6]" />
          </motion.div>
          <h1 className="font-heading text-3xl md:text-4xl text-[#134E4A] mb-3">¡Pago aprobado!</h1>
          <p className="text-[#5C6660] mb-6">Tu compra fue procesada con éxito. Recibirás un correo con los detalles de tu pedido.</p>
          <div className="bg-white border border-[#CCEFE9] rounded-2xl p-6 mb-8 text-left">
            <div className="flex justify-between text-sm mb-2"><span className="text-[#5C6660]">N° de orden</span><span className="font-mono font-semibold">{orderId}</span></div>
            <div className="flex justify-between text-sm mb-2"><span className="text-[#5C6660]">Total pagado</span><span className="font-semibold text-[#14B8A6]">{formatCLP(total)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-[#5C6660]">Método</span><span className="font-medium">Mercado Pago</span></div>
          </div>
          <Link to="/servicios/tienda" className="inline-flex items-center gap-2 bg-[#134E4A] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#0B3B38] transition-colors" data-testid="pet-back-shop-btn">
            Volver a la tienda
          </Link>
        </motion.div>
      </Page>
    );
  }

  return (
    <Page className="max-w-6xl mx-auto px-6 md:px-10 py-12">
      <div data-testid="pet-checkout-page">
        <Link to="/servicios/carrito" className="inline-flex items-center gap-2 text-sm text-[#5C6660] hover:text-[#14B8A6] mb-8"><ArrowLeft size={16} /> Volver al carrito</Link>
        <h1 className="font-heading text-4xl md:text-5xl text-[#134E4A] mb-10">Finalizar compra</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="font-heading text-xl text-[#134E4A] mb-5">Datos de contacto y envío</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input required value={form.nombre} onChange={set('nombre')} placeholder="Nombre completo" className="border border-[#CCEFE9] rounded-xl px-4 py-3 focus:border-[#14B8A6] focus:outline-none sm:col-span-2" data-testid="pet-input-nombre" />
                <input required type="email" value={form.email} onChange={set('email')} placeholder="Correo electrónico" className="border border-[#CCEFE9] rounded-xl px-4 py-3 focus:border-[#14B8A6] focus:outline-none" data-testid="pet-input-email" />
                <input required value={form.telefono} onChange={set('telefono')} placeholder="Teléfono" className="border border-[#CCEFE9] rounded-xl px-4 py-3 focus:border-[#14B8A6] focus:outline-none" data-testid="pet-input-telefono" />
                <input required value={form.direccion} onChange={set('direccion')} placeholder="Dirección" className="border border-[#CCEFE9] rounded-xl px-4 py-3 focus:border-[#14B8A6] focus:outline-none sm:col-span-2" data-testid="pet-input-direccion" />
                <input required value={form.ciudad} onChange={set('ciudad')} placeholder="Ciudad" className="border border-[#CCEFE9] rounded-xl px-4 py-3 focus:border-[#14B8A6] focus:outline-none sm:col-span-2" data-testid="pet-input-ciudad" />
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-[#134E4A] mb-5">Método de pago</h2>
              <div className="border-2 rounded-2xl overflow-hidden" style={{ borderColor: MP_BLUE }}>
                <div className="flex items-center gap-3 px-5 py-4" style={{ background: `${MP_BLUE}10` }}>
                  <span className="font-bold text-lg" style={{ color: MP_BLUE }}>Mercado Pago</span>
                  <span className="ml-auto text-xs text-gray-500 flex items-center gap-1"><ShieldCheck size={14} /> Pago seguro</span>
                </div>
                <div className="p-5 space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-[#CCEFE9] rounded-xl cursor-pointer hover:border-[#14B8A6]">
                    <input type="radio" name="metodo" checked={form.metodo === 'tarjeta'} onChange={() => setForm((f) => ({ ...f, metodo: 'tarjeta' }))} />
                    <span className="text-sm font-medium">Tarjeta de crédito / débito</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-[#CCEFE9] rounded-xl cursor-pointer hover:border-[#14B8A6]">
                    <input type="radio" name="metodo" checked={form.metodo === 'saldo'} onChange={() => setForm((f) => ({ ...f, metodo: 'saldo' }))} />
                    <span className="text-sm font-medium">Dinero en cuenta Mercado Pago</span>
                  </label>
                  <p className="text-xs text-gray-400 pt-1">⚠️ Pasarela simulada para demostración. No se realizará ningún cobro real.</p>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-[#CCEFE9] rounded-2xl p-8 sticky top-28">
              <h2 className="font-heading text-xl text-[#134E4A] mb-6 flex items-center gap-2"><PawPrint size={20} className="text-[#14B8A6]" /> Tu pedido</h2>
              <div className="space-y-3 mb-6 max-h-64 overflow-auto">
                {petCart.map((i) => (
                  <div key={i.id} className="flex justify-between text-sm gap-3">
                    <span className="text-[#5C6660]">{i.qty}× {i.name}</span>
                    <span className="font-medium whitespace-nowrap">{formatCLP(i.price * i.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-[#CCEFE9] pt-4 mb-6">
                <div className="flex justify-between"><span className="text-[#5C6660]">Subtotal</span><span>{formatCLP(petCartTotal)}</span></div>
                <div className="flex justify-between"><span className="text-[#5C6660]">Envío</span><span>{shipping === 0 ? 'Gratis' : formatCLP(shipping)}</span></div>
                <div className="flex justify-between pt-2 border-t border-[#CCEFE9] text-base"><span className="font-semibold">Total</span><span className="font-heading text-xl text-[#14B8A6]">{formatCLP(total)}</span></div>
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-full text-sm font-bold tracking-wide uppercase transition-opacity hover:opacity-90" style={{ background: MP_BLUE }} data-testid="pet-pay-btn">
                <Lock size={16} /> Pagar {formatCLP(total)}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Page>
  );
}
