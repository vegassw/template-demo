import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Send, Lock, LayoutDashboard, LogOut, ArrowUpRight, DollarSign, Receipt, Calendar,
  Eye, ShieldCheck,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCLP } from '@/lib/format';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';

const nf = (n) => Number(n).toLocaleString('es-CL', { maximumFractionDigits: 2 });

const STATUS = {
  pendiente: { label: 'Pendiente', cls: 'bg-gray-100 text-gray-600' },
  en_proceso: { label: 'En proceso', cls: 'bg-amber-100 text-amber-700' },
  pagado: { label: 'Pagado', cls: 'bg-emerald-100 text-emerald-700' },
};

const Login = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (login(email, password)) toast.success('Bienvenido');
    else setError('Credenciales incorrectas. Usa admin@demo.com / admin123');
  };
  return (
    <div className="min-h-screen bg-[#0A2540] flex items-center justify-center px-6" data-testid="envialo-admin-login">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-white text-2xl font-bold"><Send size={22} className="text-[#00B37E]" /> Envíalo</span>
          <p className="text-white/50 text-sm mt-2">Panel de administración</p>
        </div>
        <form onSubmit={submit} className="bg-white rounded-2xl p-8 space-y-5">
          <div className="flex items-center gap-2 text-[#00B37E] text-sm"><Lock size={16} /> Acceso restringido</div>
          <div>
            <label className="block text-xs font-medium text-[#5A6B85] mb-1.5">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="admin@demo.com" className="w-full border border-[#E4E9F2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#00B37E]" data-testid="admin-email" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#5A6B85] mb-1.5">Contraseña</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full border border-[#E4E9F2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#00B37E]" data-testid="admin-password" />
          </div>
          {error && <p className="text-red-500 text-sm" data-testid="admin-error">{error}</p>}
          <button type="submit" className="w-full bg-[#00B37E] text-white py-3 rounded-xl font-semibold hover:bg-[#009E6E] transition-colors" data-testid="admin-login-btn">Ingresar</button>
          <p className="text-center text-xs text-[#9AA7BD]">Demo: admin@demo.com / admin123</p>
        </form>
        <Link to="/envialo" className="block text-center text-white/50 text-sm mt-6 hover:text-white">← Volver al sitio</Link>
      </div>
    </div>
  );
};

const Stat = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-2xl border border-[#E4E9F2] p-5" data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm text-[#5A6B85]">{label}</span>
      <div className="w-9 h-9 rounded-lg bg-[#00B37E]/10 flex items-center justify-center"><Icon size={18} className="text-[#00B37E]" /></div>
    </div>
    <p className="text-2xl font-bold text-[#0A2540]">{value}</p>
  </div>
);

export default function EnvialoAdmin() {
  const { isAdmin, logout, transfers, updateTransferStatus } = useApp();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);

  if (!isAdmin) return <Login />;

  const totalSent = transfers.reduce((s, t) => s + (t.amount || 0), 0);
  const totalFees = transfers.reduce((s, t) => s + (t.fee || 0), 0);
  const today = new Date().toDateString();
  const todayCount = transfers.filter((t) => new Date(t.createdAt).toDateString() === today).length;

  const handleLogout = () => { logout(); toast('Sesión cerrada'); navigate('/envialo'); };

  return (
    <div className="min-h-screen bg-[#F6F8FB]" data-testid="envialo-admin">
      {/* Top bar */}
      <header className="bg-[#0A2540] text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-bold"><Send size={18} className="text-[#00B37E]" /> Envíalo <span className="text-white/40 text-sm font-normal ml-1">· Admin</span></span>
          <div className="flex items-center gap-4">
            <Link to="/envialo" className="text-white/70 text-sm hover:text-white">Ver sitio</Link>
            <button onClick={handleLogout} className="inline-flex items-center gap-1.5 text-white/70 text-sm hover:text-white" data-testid="admin-logout-btn"><LogOut size={16} /> Salir</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-8">
        <div className="flex items-center gap-2 text-xs text-[#9AA7BD] mb-6"><ShieldCheck size={14} className="text-[#00B37E]" /> Demo simulada — datos guardados en localStorage</div>
        <h1 className="text-2xl font-bold text-[#0A2540] mb-1">Dashboard</h1>
        <p className="text-sm text-[#5A6B85] mb-6">Transacciones y pedidos entrantes</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Stat icon={Receipt} label="Envíos totales" value={transfers.length} />
          <Stat icon={DollarSign} label="Total enviado" value={formatCLP(totalSent)} />
          <Stat icon={ArrowUpRight} label="Comisiones" value={formatCLP(totalFees)} />
          <Stat icon={Calendar} label="Envíos hoy" value={todayCount} />
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E9F2] overflow-x-auto">
          <div className="px-6 py-4 border-b border-[#E4E9F2]"><h2 className="font-bold text-[#0A2540]">Transacciones</h2></div>
          {transfers.length === 0 ? (
            <div className="px-6 py-16 text-center text-[#5A6B85]">
              <Receipt size={36} className="mx-auto text-[#CBD5E1] mb-3" />
              Aún no hay envíos. Realiza uno desde el <Link to="/envialo/enviar" className="text-[#00B37E] font-semibold hover:underline">sitio</Link>.
            </div>
          ) : (
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-[#9AA7BD] border-b border-[#E4E9F2]">
                  <th className="px-6 py-3 font-medium">Código</th>
                  <th className="px-6 py-3 font-medium">Destinatario</th>
                  <th className="px-6 py-3 font-medium">Destino</th>
                  <th className="px-6 py-3 font-medium">Envía</th>
                  <th className="px-6 py-3 font-medium">Recibe</th>
                  <th className="px-6 py-3 font-medium">Estado</th>
                  <th className="px-6 py-3 font-medium text-right">Acción</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((t) => (
                  <tr key={t.id} className="border-b border-[#F0F3F8] hover:bg-[#F6F8FB]" data-testid={`transfer-row-${t.id}`}>
                    <td className="px-6 py-3 font-mono text-xs text-[#0A2540]">{t.id}</td>
                    <td className="px-6 py-3 text-[#0A2540]">{t.recipient?.fullName}</td>
                    <td className="px-6 py-3">{t.flag} {t.countryName}</td>
                    <td className="px-6 py-3 text-[#0A2540]">{formatCLP(t.total)}</td>
                    <td className="px-6 py-3 font-medium text-[#00B37E]">{t.symbol} {nf(t.received)}</td>
                    <td className="px-6 py-3">
                      <select value={t.status} onChange={(e) => { updateTransferStatus(t.id, e.target.value); toast.success('Estado actualizado'); }} className={`text-xs font-medium rounded-lg px-2.5 py-1.5 border-0 focus:outline-none cursor-pointer ${STATUS[t.status]?.cls}`} data-testid={`status-${t.id}`}>
                        <option value="pendiente">Pendiente</option>
                        <option value="en_proceso">En proceso</option>
                        <option value="pagado">Pagado</option>
                      </select>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button onClick={() => setDetail(t)} className="p-2 text-[#5A6B85] hover:text-[#00B37E] hover:bg-[#F6F8FB] rounded-lg" data-testid={`view-${t.id}`}><Eye size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Detail dialog */}
      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="max-w-md" data-testid="transfer-detail">
          <DialogHeader>
            <DialogTitle>Detalle del envío</DialogTitle>
            <DialogDescription>{detail?.id}</DialogDescription>
          </DialogHeader>
          {detail && (
            <div className="space-y-3 text-sm">
              <Row k="Estado" v={STATUS[detail.status]?.label} />
              <Row k="Destino" v={`${detail.flag} ${detail.countryName}`} />
              <Row k="Envía" v={formatCLP(detail.amount)} />
              <Row k="Comisión" v={detail.fee === 0 ? 'Gratis' : formatCLP(detail.fee)} />
              <Row k="Total pagado" v={formatCLP(detail.total)} />
              <Row k="Recibe" v={`${detail.symbol} ${nf(detail.received)}`} />
              <Row k="Método de entrega" v={detail.methodLabel} />
              <Row k="Método de pago" v={detail.paymentLabel} />
              <div className="pt-3 mt-2 border-t border-[#E4E9F2]">
                <p className="font-semibold text-[#0A2540] mb-2">Destinatario</p>
                {Object.entries(detail.recipient || {}).map(([k, v]) => (
                  <Row key={k} k={labelFor(k)} v={v} />
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const Row = ({ k, v }) => (
  <div className="flex justify-between gap-4"><span className="text-[#5A6B85]">{k}</span><span className="font-medium text-[#0A2540] text-right">{v}</span></div>
);

const labelFor = (k) => ({ fullName: 'Nombre', bank: 'Banco', accountNumber: 'N° cuenta', docId: 'Documento', phone: 'Teléfono', bankCode: 'Código banco' }[k] || k);
