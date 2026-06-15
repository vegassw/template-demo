import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, Tags, Store, LogOut, Lock, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

const AdminLogin = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handle = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success('Bienvenido al panel');
    } else {
      setError('Credenciales incorrectas. Usa admin@demo.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] flex items-center justify-center px-6" data-testid="admin-login">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="font-heading text-3xl text-white">AURUM <span className="text-[#C9A227]">& CO.</span></span>
          <p className="text-gray-400 text-sm mt-2 tracking-wide">Panel de Administración</p>
        </div>
        <form onSubmit={handle} className="bg-[#141417] border border-white/10 rounded-xl p-8 space-y-5">
          <div className="flex items-center gap-2 text-[#C9A227] text-sm mb-2"><Lock size={16} /> Acceso restringido</div>
          <div>
            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="admin@demo.com" className="w-full bg-[#1c1c20] border border-white/10 text-white px-4 py-3 rounded focus:border-[#C9A227] focus:outline-none" data-testid="admin-email" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Contraseña</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full bg-[#1c1c20] border border-white/10 text-white px-4 py-3 rounded focus:border-[#C9A227] focus:outline-none" data-testid="admin-password" />
          </div>
          {error && <p className="text-red-400 text-sm" data-testid="admin-error">{error}</p>}
          <button type="submit" className="w-full bg-[#C9A227] text-black py-3 rounded font-semibold tracking-wide uppercase text-sm hover:bg-[#b8911f] transition-colors" data-testid="admin-login-btn">Ingresar</button>
          <p className="text-center text-xs text-gray-500">Demo: admin@demo.com / admin123</p>
        </form>
        <Link to="/ecommerce" className="block text-center text-gray-500 text-sm mt-6 hover:text-[#C9A227]">← Volver a la tienda</Link>
      </motion.div>
    </div>
  );
};

const navItems = [
  { to: '/ecommerce/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/ecommerce/admin/productos', icon: Package, label: 'Productos' },
  { to: '/ecommerce/admin/categorias', icon: Tags, label: 'Categorías' },
];

export default function AdminLayout() {
  const { isAdmin, logout } = useApp();
  const navigate = useNavigate();

  if (!isAdmin) return <AdminLogin />;

  const handleLogout = () => {
    logout();
    toast('Sesión cerrada');
    navigate('/ecommerce/admin');
  };

  return (
    <div className="min-h-screen bg-[#f6f6f7] flex" data-testid="admin-layout">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c0c0e] text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-white/10">
          <span className="font-heading text-xl">AURUM <span className="text-[#C9A227]">& CO.</span></span>
          <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${isActive ? 'bg-[#C9A227] text-black font-medium' : 'text-gray-300 hover:bg-white/5'}`}
              data-testid={`admin-nav-${item.label.toLowerCase()}`}>
              <item.icon size={18} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link to="/ecommerce" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/5"><Store size={18} /> Ver tienda</Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/5" data-testid="admin-logout-btn"><LogOut size={18} /> Cerrar sesión</button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 ml-64 p-8 md:p-10">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6"><ShieldCheck size={14} className="text-[#C9A227]" /> Demo simulada — datos guardados en localStorage</div>
        <Outlet />
      </main>
    </div>
  );
}
