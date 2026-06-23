import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Minus, Plus, ShoppingBag, ChevronRight, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCLP } from '@/lib/format';
import { PetProductCard } from '@/components/servicios/PetProductCard';
import { Page } from '@/components/PageTransition';

export default function PetProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { petProducts, petCategories, addToPetCart } = useApp();
  const product = petProducts.find((p) => p.slug === slug);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <Page className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="font-heading text-3xl text-[#134E4A] mb-4">Producto no encontrado</h1>
        <Link to="/servicios/tienda" className="text-[#14B8A6] hover:underline">Volver a la tienda</Link>
      </Page>
    );
  }

  const category = petCategories.find((c) => c.id === product.categoryId);
  const price = product.salePrice ?? product.price;
  const related = petProducts.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  const outOfStock = product.stock === 0;

  const handleAdd = () => { addToPetCart(product, qty); toast.success(`${product.name} agregado al carrito`); };
  const handleBuyNow = () => { addToPetCart(product, qty); navigate('/servicios/carrito'); };

  return (
    <Page className="max-w-6xl mx-auto px-6 md:px-10 py-10">
      <div data-testid="pet-product-detail">
        <nav className="flex items-center gap-2 text-xs text-[#5C6660] mb-8">
          <Link to="/servicios/tienda" className="hover:text-[#14B8A6]">Tienda</Link>
          <ChevronRight size={12} />
          <span className="text-[#134E4A]">{category?.name}</span>
          <ChevronRight size={12} />
          <span className="text-[#134E4A]">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-square overflow-hidden rounded-[2rem] bg-[#F0FDFA]">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" data-testid="pet-main-image" />
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-[#5C6660] uppercase mb-3">{product.sku}</p>
            <h1 className="font-heading text-3xl md:text-4xl text-[#134E4A] mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-heading text-3xl text-[#14B8A6]">{formatCLP(price)}</span>
              {product.salePrice && <span className="text-lg text-gray-400 line-through">{formatCLP(product.price)}</span>}
            </div>
            <p className="text-[#5C6660] leading-relaxed mb-6">{product.description}</p>

            <div className="mb-6">
              {outOfStock ? (
                <span className="text-red-500 text-sm font-medium">Sin stock</span>
              ) : (
                <span className="inline-flex items-center gap-2 text-[#14B8A6] text-sm font-medium"><Check size={16} /> Disponible ({product.stock} unidades)</span>
              )}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-[#CCEFE9] rounded-full">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:text-[#14B8A6]" data-testid="pet-qty-minus"><Minus size={16} /></button>
                <span className="w-10 text-center font-medium" data-testid="pet-qty-value">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))} className="p-3 hover:text-[#14B8A6]" data-testid="pet-qty-plus"><Plus size={16} /></button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button onClick={handleAdd} disabled={outOfStock} className="flex-1 inline-flex items-center justify-center gap-2 bg-[#14B8A6] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#0D9488] transition-colors disabled:opacity-40 disabled:cursor-not-allowed" data-testid="pet-add-to-cart-btn">
                <ShoppingBag size={18} /> Agregar al carrito
              </button>
              <button onClick={handleBuyNow} disabled={outOfStock} className="flex-1 border-2 border-[#134E4A] text-[#134E4A] px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#134E4A] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed" data-testid="pet-buy-now-btn">
                Comprar ahora
              </button>
            </div>

            <div className="border-t border-[#CCEFE9] pt-6">
              <h3 className="font-heading text-lg text-[#134E4A] mb-4">Detalles</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.specs.map((s) => (
                  <div key={s.key} className="flex justify-between border-b border-[#CCEFE9]/60 py-2 text-sm">
                    <dt className="text-[#5C6660]">{s.key}</dt>
                    <dd className="text-[#134E4A] font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-heading text-2xl md:text-3xl text-[#134E4A] mb-8">También te puede interesar</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {related.map((p, i) => <PetProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}
