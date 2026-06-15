import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCLP } from '@/lib/format';
import { Page } from '@/components/PageTransition';

export default function PetCart() {
  const { petCart, updatePetQty, removeFromPetCart, petCartTotal } = useApp();
  const navigate = useNavigate();
  const shipping = petCartTotal > 30000 || petCartTotal === 0 ? 0 : 3990;

  if (petCart.length === 0) {
    return (
      <Page className="max-w-3xl mx-auto px-6 py-32 text-center">
        <div data-testid="pet-cart-empty">
          <ShoppingBag size={48} className="mx-auto text-[#7BAE8F]/40 mb-6" />
          <h1 className="font-heading text-3xl text-[#2E3A35] mb-3">Tu carrito está vacío</h1>
          <p className="text-[#5C6660] mb-8">Agrega productos para consentir a tu mascota.</p>
          <Link to="/servicios/tienda" className="inline-flex items-center gap-2 bg-[#7BAE8F] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#6B9E7F] transition-colors">
            Ir a la tienda <ArrowRight size={16} />
          </Link>
        </div>
      </Page>
    );
  }

  return (
    <Page className="max-w-6xl mx-auto px-6 md:px-10 py-12">
      <div data-testid="pet-cart-page">
        <h1 className="font-heading text-4xl md:text-5xl text-[#2E3A35] mb-10">Carrito</h1>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {petCart.map((item) => (
              <div key={item.id} className="flex gap-5 pb-6 border-b border-[#E8E0D5]" data-testid={`pet-cart-item-${item.id}`}>
                <div className="w-24 h-24 bg-[#FAF7F2] rounded-xl overflow-hidden flex-shrink-0">
                  {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <h3 className="font-medium text-[#2E3A35]">{item.name}</h3>
                    <button onClick={() => removeFromPetCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors" data-testid={`pet-remove-${item.id}`}><Trash2 size={18} /></button>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-[#E8E0D5] rounded-full">
                      <button onClick={() => updatePetQty(item.id, item.qty - 1)} className="p-2 hover:text-[#7BAE8F]"><Minus size={14} /></button>
                      <span className="w-10 text-center text-sm" data-testid={`pet-qty-${item.id}`}>{item.qty}</span>
                      <button onClick={() => updatePetQty(item.id, item.qty + 1)} className="p-2 hover:text-[#7BAE8F]"><Plus size={14} /></button>
                    </div>
                    <span className="font-semibold text-[#2E3A35]">{formatCLP(item.price * item.qty)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#E8E0D5] p-8 sticky top-28">
              <h2 className="font-heading text-xl text-[#2E3A35] mb-6">Resumen</h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between"><span className="text-[#5C6660]">Subtotal</span><span className="font-medium">{formatCLP(petCartTotal)}</span></div>
                <div className="flex justify-between"><span className="text-[#5C6660]">Envío</span><span className="font-medium">{shipping === 0 ? 'Gratis' : formatCLP(shipping)}</span></div>
                <div className="flex justify-between pt-3 border-t border-[#E8E0D5] text-base"><span className="font-semibold">Total</span><span className="font-heading text-xl text-[#7BAE8F]">{formatCLP(petCartTotal + shipping)}</span></div>
              </div>
              <button onClick={() => navigate('/servicios/checkout')} className="w-full inline-flex items-center justify-center gap-2 bg-[#7BAE8F] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#6B9E7F] transition-colors" data-testid="pet-checkout-btn">
                Finalizar compra <ArrowRight size={16} />
              </button>
              <Link to="/servicios/tienda" className="block text-center text-sm text-[#5C6660] hover:text-[#7BAE8F] mt-4">Seguir comprando</Link>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
