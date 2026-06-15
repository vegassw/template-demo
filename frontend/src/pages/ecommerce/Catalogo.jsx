import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ecommerce/ProductCard';
import { Page } from '@/components/PageTransition';

export default function Catalogo() {
  const { products, categories } = useApp();
  const [params, setParams] = useSearchParams();
  const cat = params.get('cat') || 'all';
  const q = (params.get('q') || '').toLowerCase();
  const sort = params.get('sort') || 'relevance';

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && value !== 'all') next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat !== 'all') {
      const category = categories.find((c) => c.slug === cat);
      if (category) list = list.filter((p) => p.categoryId === category.id);
    }
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    if (sort === 'price-asc') list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    if (sort === 'price-desc') list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, categories, cat, q, sort]);

  return (
    <Page className="max-w-7xl mx-auto px-6 md:px-12 py-12" >
      <div data-testid="catalogo-page">
        <div className="mb-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-2">Catálogo</h1>
          <p className="text-gray-500 text-sm">{filtered.length} producto(s){q ? ` para "${q}"` : ''}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setParam('cat', 'all')} className={`px-4 py-2 text-sm tracking-wide transition-colors ${cat === 'all' ? 'bg-[#1a1a1a] text-white' : 'bg-[#F5F5F5] text-[#1a1a1a] hover:bg-gray-200'}`} data-testid="filter-cat-all">Todos</button>
            {categories.map((c) => (
              <button key={c.id} onClick={() => setParam('cat', c.slug)} className={`px-4 py-2 text-sm tracking-wide transition-colors ${cat === c.slug ? 'bg-[#1a1a1a] text-white' : 'bg-[#F5F5F5] text-[#1a1a1a] hover:bg-gray-200'}`} data-testid={`filter-cat-${c.slug}`}>{c.name}</button>
            ))}
          </div>
          <select value={sort} onChange={(e) => setParam('sort', e.target.value)} className="border border-gray-200 px-4 py-2 text-sm focus:border-[#C9A227] focus:outline-none bg-white" data-testid="sort-select">
            <option value="relevance">Relevancia</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 mb-4">No encontramos productos con esos filtros.</p>
            <Link to="/ecommerce/catalogo" className="text-[#C9A227] font-medium hover:underline">Limpiar filtros</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </Page>
  );
}
