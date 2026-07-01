import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, PackageCheck, Clock, Truck, CheckCircle2, XCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCLP } from '@/lib/format';
import { Page } from '@/components/PageTransition';

const nf = (n) => Number(n).toLocaleString('es-CL', { maximumFractionDigits: 2 });

const STEPS = [
  { key: 'recibido', label: 'Solicitud recibida', icon: PackageCheck },
  { key: 'en_proceso', label: 'En proceso', icon: Truck },
  { key: 'pagado', label: 'Pagado al destinatario', icon: CheckCircle2 },
];
const rank = { pendiente: 0, recibido: 0, en_proceso: 1, pagado: 2 };

export default function Tracking() {
  const { transfers } = useApp();
  const [params] = useSearchParams();
  const [code, setCode] = useState(params.get('codigo') || '');
  const [query, setQuery] = useState(params.get('codigo') || '');

  const transfer = query ? transfers.find((t) => t.id.toLowerCase() === query.trim().toLowerCase()) : null;
  const currentRank = transfer ? rank[transfer.status] ?? 1 : -1;

  return (
    <Page className="max-w-2xl mx-auto px-6 py-12 md:py-16">
      <div data-testid="tracking-page">
        <h1 className="text-3xl font-bold tracking-tight text-[#0A2540] mb-2">Seguir mi envío</h1>
        <p className="text-[#5A6B85] mb-8">Ingresa tu número de seguimiento para ver el estado.</p>

        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A6B85]" />
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Ej: ENV-12345678" className="w-full border border-[#E4E9F2] rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#00B37E] bg-white" data-testid="tracking-input" />
          </div>
          <button onClick={() => setQuery(code)} className="bg-[#00B37E] text-white px-6 rounded-xl text-sm font-semibold hover:bg-[#009E6E] transition-colors" data-testid="tracking-search-btn">Buscar</button>
        </div>

        {query && !transfer && (
          <div className="bg-white border border-[#E4E9F2] rounded-2xl p-8 text-center" data-testid="tracking-notfound">
            <XCircle size={40} className="mx-auto text-red-400 mb-3" />
            <p className="font-semibold text-[#0A2540] mb-1">No encontramos ese envío</p>
            <p className="text-sm text-[#5A6B85]">Verifica el código. Debe tener el formato ENV-XXXXXXXX.</p>
          </div>
        )}

        {transfer && (
          <div className="bg-white border border-[#E4E9F2] rounded-2xl p-6 md:p-8" data-testid="tracking-result">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#E4E9F2]">
              <div>
                <p className="text-xs text-[#5A6B85]">N° de seguimiento</p>
                <p className="font-mono font-bold text-[#0A2540]">{transfer.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#5A6B85]">Recibe</p>
                <p className="font-bold text-[#00B37E]">{transfer.symbol} {nf(transfer.received)}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {STEPS.map((s, i) => {
                const done = i <= currentRank;
                const active = i === currentRank;
                const Icon = s.icon;
                return (
                  <div key={s.key} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${done ? 'bg-[#00B37E] text-white' : 'bg-[#F0F3F8] text-[#9AA7BD]'}`}><Icon size={18} /></div>
                      {i < STEPS.length - 1 && <div className={`w-0.5 h-8 ${i < currentRank ? 'bg-[#00B37E]' : 'bg-[#E4E9F2]'}`} />}
                    </div>
                    <div className="pt-2">
                      <p className={`font-semibold ${done ? 'text-[#0A2540]' : 'text-[#9AA7BD]'}`}>{s.label}</p>
                      {active && <p className="text-xs text-[#00B37E] font-medium mt-0.5">Estado actual</p>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E4E9F2] grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-[#5A6B85] text-xs">Destino</p><p className="font-medium text-[#0A2540]">{transfer.flag} {transfer.countryName}</p></div>
              <div><p className="text-[#5A6B85] text-xs">Método</p><p className="font-medium text-[#0A2540]">{transfer.methodLabel}</p></div>
              <div><p className="text-[#5A6B85] text-xs">Destinatario</p><p className="font-medium text-[#0A2540]">{transfer.recipient?.fullName}</p></div>
              <div><p className="text-[#5A6B85] text-xs">Enviaste</p><p className="font-medium text-[#0A2540]">{formatCLP(transfer.total)}</p></div>
            </div>
          </div>
        )}

        {!query && (
          <p className="text-center text-sm text-[#9AA7BD]">¿Aún no envías? <Link to="/envialo/enviar" className="text-[#00B37E] font-semibold hover:underline">Envía dinero ahora</Link></p>
        )}
      </div>
    </Page>
  );
}
