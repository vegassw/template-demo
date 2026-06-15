import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCLP } from '@/lib/format';
import { Page } from '@/components/PageTransition';

export default function Cart() {
  const { cart, updateQty, removeFromCart, cartTotal } = useApp();
  const navigate = useNavigate();
  const shipping = cartTotal > 50000 || cartTotal === 0 ? 0 : 4990;

  if (cart.length === 0) {
    return (
      <Page className="max-w-3xl mx-auto px-6 py-32 text-center">
        <div data-testid="cart-empty">
          <ShoppingBag size={48} className="mx-auto text-gray-300 mb-6" />
          <h1 className="font-heading text-3xl mb-3">Tu carrito está vacío</h1>
          <p className="text-gray-500 mb-8">Agrega productos para continuar con tu compra.</p>
          <Link to="/ecommerce/catalogo" className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-[#C9A227] hover:text-black transition-all">
            Ir al catálogo <ArrowRight size={16} />
          </Link>
        </div>
      </Page>
    );
  }

  return (
    <Page className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div data-testid="cart-page">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-10">Carrito</h1>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-5 pb-6 border-b border-gray-100" data-testid={`cart-item-${item.id}`}>
                <div className="w-24 h-28 bg-[#F5F5F5] overflow-hidden flex-shrink-0">
                  {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <h3 className="font-medium text-[#1a1a1a]">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors" data-testid={`remove-${item.id}`}><Trash2 size={18} /></button>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-gray-200">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-2 hover:bg-gray-100"><Minus size={14} /></button>
                      <span className="w-10 text-center text-sm" data-testid={`qty-${item.id}`}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-2 hover:bg-gray-100"><Plus size={14} /></button>
                    </div>
                    <span className="font-semibold text-[#1a1a1a]">{formatCLP(item.price * item.qty)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#FAFAFA] p-8 sticky top-28">
              <h2 className="font-heading text-xl mb-6">Resumen</h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-medium">{formatCLP(cartTotal)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Envío</span><span className="font-medium">{shipping === 0 ? 'Gratis' : formatCLP(shipping)}</span></div>
                <div className="flex justify-between pt-3 border-t border-gray-200 text-base"><span className="font-semibold">Total</span><span className="font-bold text-[#C9A227] text-lg">{formatCLP(cartTotal + shipping)}</span></div>
              </div>
              <button onClick={() => navigate('/ecommerce/checkout')} className="w-full inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-[#C9A227] hover:text-black transition-all" data-testid="checkout-btn">
                Finalizar compra <ArrowRight size={16} />
              </button>
              <Link to="/ecommerce/catalogo" className="block text-center text-sm text-gray-500 hover:text-[#C9A227] mt-4">Seguir comprando</Link>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
