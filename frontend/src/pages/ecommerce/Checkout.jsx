import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCLP } from '@/lib/format';
import { Page } from '@/components/PageTransition';

const MP_BLUE = '#009EE3';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState('form'); // form | processing | success
  const [orderId] = useState(() => `MP-${Date.now().toString().slice(-8)}`);
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', direccion: '', ciudad: '', metodo: 'tarjeta' });

  const shipping = cartTotal > 50000 ? 0 : 4990;
  const total = cartTotal + shipping;

  if (cart.length === 0 && step !== 'success') {
    return (
      <Page className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="font-heading text-3xl mb-4">No hay productos para pagar</h1>
        <Link to="/ecommerce/catalogo" className="text-[#C9A227] hover:underline">Ir al catálogo</Link>
      </Page>
    );
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      clearCart();
      setStep('success');
    }, 2800);
  };

  // ---- Processing ----
  if (step === 'processing') {
    return (
      <Page className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center max-w-sm" data-testid="checkout-processing">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: `${MP_BLUE}15` }}>
            <Loader2 size={36} className="animate-spin" style={{ color: MP_BLUE }} />
          </div>
          <p className="font-heading text-2xl text-[#1a1a1a] mb-2">Procesando tu pago…</p>
          <p className="text-gray-500 text-sm">Conectando con Mercado Pago de forma segura. No cierres esta ventana.</p>
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Lock size={14} /> Pago protegido · Demo simulada
          </div>
        </div>
      </Page>
    );
  }

  // ---- Success ----
  if (step === 'success') {
    return (
      <Page className="min-h-[70vh] flex items-center justify-center px-6 py-16">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md" data-testid="checkout-success">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-green-500" />
          </motion.div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-3">¡Pago aprobado!</h1>
          <p className="text-gray-600 mb-6">Tu compra fue procesada con éxito. Recibirás un correo con los detalles de tu pedido.</p>
          <div className="bg-[#FAFAFA] p-6 mb-8 text-left">
            <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">N° de orden</span><span className="font-mono font-semibold">{orderId}</span></div>
            <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Total pagado</span><span className="font-semibold text-[#C9A227]">{formatCLP(total)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Método</span><span className="font-medium">Mercado Pago</span></div>
          </div>
          <Link to="/ecommerce" className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-[#C9A227] hover:text-black transition-all" data-testid="back-home-btn">
            Volver a la tienda
          </Link>
        </motion.div>
      </Page>
    );
  }

  // ---- Form ----
  return (
    <Page className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div data-testid="checkout-page">
        <Link to="/ecommerce/carrito" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#C9A227] mb-8"><ArrowLeft size={16} /> Volver al carrito</Link>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-10">Finalizar compra</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            {/* Datos */}
            <section>
              <h2 className="font-heading text-xl mb-5">Datos de contacto y envío</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input required value={form.nombre} onChange={set('nombre')} placeholder="Nombre completo" className="border border-gray-200 px-4 py-3 focus:border-[#C9A227] focus:outline-none sm:col-span-2" data-testid="input-nombre" />
                <input required type="email" value={form.email} onChange={set('email')} placeholder="Correo electrónico" className="border border-gray-200 px-4 py-3 focus:border-[#C9A227] focus:outline-none" data-testid="input-email" />
                <input required value={form.telefono} onChange={set('telefono')} placeholder="Teléfono" className="border border-gray-200 px-4 py-3 focus:border-[#C9A227] focus:outline-none" data-testid="input-telefono" />
                <input required value={form.direccion} onChange={set('direccion')} placeholder="Dirección" className="border border-gray-200 px-4 py-3 focus:border-[#C9A227] focus:outline-none sm:col-span-2" data-testid="input-direccion" />
                <input required value={form.ciudad} onChange={set('ciudad')} placeholder="Ciudad" className="border border-gray-200 px-4 py-3 focus:border-[#C9A227] focus:outline-none sm:col-span-2" data-testid="input-ciudad" />
              </div>
            </section>

            {/* Pago - Mercado Pago mock */}
            <section>
              <h2 className="font-heading text-xl mb-5">Método de pago</h2>
              <div className="border-2 rounded-lg overflow-hidden" style={{ borderColor: MP_BLUE }}>
                <div className="flex items-center gap-3 px-5 py-4" style={{ background: `${MP_BLUE}10` }}>
                  <span className="font-bold text-lg" style={{ color: MP_BLUE }}>Mercado Pago</span>
                  <span className="ml-auto text-xs text-gray-500 flex items-center gap-1"><ShieldCheck size={14} /> Pago seguro</span>
                </div>
                <div className="p-5 space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:border-[#C9A227]">
                    <input type="radio" name="metodo" checked={form.metodo === 'tarjeta'} onChange={() => setForm((f) => ({ ...f, metodo: 'tarjeta' }))} />
                    <span className="text-sm font-medium">Tarjeta de crédito / débito</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:border-[#C9A227]">
                    <input type="radio" name="metodo" checked={form.metodo === 'saldo'} onChange={() => setForm((f) => ({ ...f, metodo: 'saldo' }))} />
                    <span className="text-sm font-medium">Dinero en cuenta Mercado Pago</span>
                  </label>
                  <p className="text-xs text-gray-400 pt-1">⚠️ Esta es una pasarela simulada para fines de demostración. No se realizará ningún cobro real.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#FAFAFA] p-8 sticky top-28">
              <h2 className="font-heading text-xl mb-6">Tu pedido</h2>
              <div className="space-y-3 mb-6 max-h-64 overflow-auto">
                {cart.map((i) => (
                  <div key={i.id} className="flex justify-between text-sm gap-3">
                    <span className="text-gray-600">{i.qty}× {i.name}</span>
                    <span className="font-medium whitespace-nowrap">{formatCLP(i.price * i.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatCLP(cartTotal)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Envío</span><span>{shipping === 0 ? 'Gratis' : formatCLP(shipping)}</span></div>
                <div className="flex justify-between pt-2 border-t border-gray-200 text-base"><span className="font-semibold">Total</span><span className="font-bold text-[#C9A227] text-lg">{formatCLP(total)}</span></div>
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 text-white px-8 py-4 text-sm font-bold tracking-wide uppercase transition-opacity hover:opacity-90" style={{ background: MP_BLUE }} data-testid="pay-btn">
                <Lock size={16} /> Pagar {formatCLP(total)}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Page>
  );
}
