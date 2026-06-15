import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Minus, Plus, ShoppingBag, ChevronRight, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCLP } from '@/lib/format';
import { ProductCard } from '@/components/ecommerce/ProductCard';
import { Page } from '@/components/PageTransition';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products, categories, addToCart } = useApp();
  const product = products.find((p) => p.slug === slug);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <Page className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="font-heading text-3xl mb-4">Producto no encontrado</h1>
        <Link to="/ecommerce/catalogo" className="text-[#C9A227] hover:underline">Volver al catálogo</Link>
      </Page>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const price = product.salePrice ?? product.price;
  const related = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  const outOfStock = product.stock === 0;

  const handleAdd = () => {
    addToCart(product, qty);
    toast.success(`${product.name} agregado al carrito`);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate('/ecommerce/carrito');
  };

  return (
    <Page className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      <div data-testid="product-detail-page">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link to="/ecommerce" className="hover:text-[#C9A227]">Inicio</Link>
          <ChevronRight size={12} />
          <Link to={`/ecommerce/catalogo?cat=${category?.slug}`} className="hover:text-[#C9A227]">{category?.name}</Link>
          <ChevronRight size={12} />
          <span className="text-[#1a1a1a]">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <div className="aspect-square overflow-hidden bg-[#F5F5F5] mb-4">
              <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" data-testid="product-main-image" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-20 overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-[#C9A227]' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-gray-400 uppercase mb-3">{product.sku}</p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-heading text-3xl text-[#C9A227] font-bold">{formatCLP(price)}</span>
              {product.salePrice && <span className="text-lg text-gray-400 line-through">{formatCLP(product.price)}</span>}
              {product.salePrice && <span className="bg-[#C9A227] text-black px-2 py-1 text-xs font-bold">-{Math.round((1 - product.salePrice / product.price) * 100)}%</span>}
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            <div className="mb-6">
              {outOfStock ? (
                <span className="inline-flex items-center gap-2 text-red-600 text-sm font-medium">Sin stock</span>
              ) : (
                <span className="inline-flex items-center gap-2 text-green-600 text-sm font-medium"><Check size={16} /> En stock ({product.stock} disponibles)</span>
              )}
            </div>

            {/* Qty + actions */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-gray-200">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:bg-gray-100" data-testid="qty-minus"><Minus size={16} /></button>
                <span className="w-12 text-center font-medium" data-testid="qty-value">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))} className="p-3 hover:bg-gray-100" data-testid="qty-plus"><Plus size={16} /></button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button onClick={handleAdd} disabled={outOfStock} className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-[#C9A227] hover:text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed" data-testid="add-to-cart-btn">
                <ShoppingBag size={18} /> Agregar al carrito
              </button>
              <button onClick={handleBuyNow} disabled={outOfStock} className="flex-1 border-2 border-[#1a1a1a] text-[#1a1a1a] px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-[#1a1a1a] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed" data-testid="buy-now-btn">
                Comprar ahora
              </button>
            </div>

            {/* Specs */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-heading text-lg mb-4">Especificaciones</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.specs.map((s) => (
                  <div key={s.key} className="flex justify-between border-b border-gray-50 py-2 text-sm">
                    <dt className="text-gray-500">{s.key}</dt>
                    <dd className="text-[#1a1a1a] font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-8">También te puede gustar</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}
