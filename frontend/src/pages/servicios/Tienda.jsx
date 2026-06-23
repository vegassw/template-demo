import React, { useMemo, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PetProductCard } from '@/components/servicios/PetProductCard';
import { Page } from '@/components/PageTransition';
import { Search } from 'lucide-react';

export default function Tienda() {
  const { petProducts, petCategories } = useApp();
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    let list = [...petProducts];
    if (cat !== 'all') {
      const c = petCategories.find((x) => x.slug === cat);
      if (c) list = list.filter((p) => p.categoryId === c.id);
    }
    if (q.trim()) {
      const query = q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    }
    return list;
  }, [petProducts, petCategories, cat, q]);

  return (
    <Page className="max-w-6xl mx-auto px-6 md:px-10 py-12">
      <div data-testid="pet-tienda-page">
        <div className="text-center mb-10">
          <p className="text-[#14B8A6] text-sm tracking-[0.2em] uppercase mb-3 font-medium">Tienda</p>
          <h1 className="font-heading text-4xl md:text-5xl text-[#134E4A] mb-3">Todo para tu mascota</h1>
          <p className="text-[#5C6660] max-w-lg mx-auto">Alimento, juguetes, higiene y accesorios seleccionados con amor. Agrega al carrito y paga en línea.</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#14B8A6]" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar productos…" className="w-full bg-white border border-[#CCEFE9] rounded-full pl-11 pr-4 py-3 text-sm focus:border-[#14B8A6] focus:outline-none" data-testid="pet-search-input" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button onClick={() => setCat('all')} className={`px-5 py-2 rounded-full text-sm transition-colors ${cat === 'all' ? 'bg-[#14B8A6] text-white' : 'bg-white border border-[#CCEFE9] text-[#134E4A] hover:border-[#14B8A6]'}`} data-testid="pet-filter-all">Todos</button>
          {petCategories.map((c) => (
            <button key={c.id} onClick={() => setCat(c.slug)} className={`px-5 py-2 rounded-full text-sm transition-colors ${cat === c.slug ? 'bg-[#14B8A6] text-white' : 'bg-white border border-[#CCEFE9] text-[#134E4A] hover:border-[#14B8A6]'}`} data-testid={`pet-filter-${c.slug}`}>{c.name}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-[#5C6660] py-20">No encontramos productos con esos filtros.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {filtered.map((p, i) => <PetProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </Page>
  );
}
