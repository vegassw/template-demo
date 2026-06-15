import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Tags, DollarSign, AlertTriangle, RefreshCw } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCLP } from '@/lib/format';
import { toast } from 'sonner';

const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100" data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-500 text-sm">{label}</span>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${accent}15` }}>
        <Icon size={20} style={{ color: accent }} />
      </div>
    </div>
    <p className="font-heading text-3xl font-bold text-[#1a1a1a]">{value}</p>
  </div>
);

export default function Dashboard() {
  const { products, categories, resetDemoData } = useApp();
  const stockValue = products.reduce((sum, p) => sum + (p.salePrice ?? p.price) * p.stock, 0);
  const lowStock = products.filter((p) => p.stock <= 12);

  const handleReset = () => {
    resetDemoData();
    toast.success('Datos de demo restaurados');
  };

  return (
    <div data-testid="admin-dashboard">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#1a1a1a]">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Resumen general de tu tienda</p>
        </div>
        <button onClick={handleReset} className="inline-flex items-center gap-2 text-sm border border-gray-200 bg-white px-4 py-2 rounded-lg hover:border-[#C9A227] transition-colors" data-testid="reset-demo-btn">
          <RefreshCw size={16} /> Restaurar demo
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard icon={Package} label="Productos" value={products.length} accent="#C9A227" />
        <StatCard icon={Tags} label="Categorías" value={categories.length} accent="#7B61FF" />
        <StatCard icon={DollarSign} label="Valor inventario" value={formatCLP(stockValue)} accent="#16A34A" />
        <StatCard icon={AlertTriangle} label="Stock bajo" value={lowStock.length} accent="#EA580C" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-heading text-lg">Productos con stock bajo</h2>
          <Link to="/ecommerce/admin/productos" className="text-sm text-[#C9A227] hover:underline">Ver todos</Link>
        </div>
        <table className="w-full text-sm min-w-[480px]">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-50">
              <th className="px-6 py-3 font-medium">Producto</th>
              <th className="px-6 py-3 font-medium">SKU</th>
              <th className="px-6 py-3 font-medium">Precio</th>
              <th className="px-6 py-3 font-medium text-right">Stock</th>
            </tr>
          </thead>
          <tbody>
            {lowStock.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">Todo el inventario en buen nivel.</td></tr>
            ) : lowStock.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-6 py-3 font-medium text-[#1a1a1a]">{p.name}</td>
                <td className="px-6 py-3 text-gray-500 font-mono text-xs">{p.sku}</td>
                <td className="px-6 py-3">{formatCLP(p.salePrice ?? p.price)}</td>
                <td className="px-6 py-3 text-right"><span className={`font-semibold ${p.stock === 0 ? 'text-red-500' : 'text-orange-500'}`}>{p.stock}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
