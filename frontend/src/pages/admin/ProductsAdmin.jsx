import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCLP, slugify } from '@/lib/format';
import { toast } from 'sonner';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const emptyProduct = {
  id: '', name: '', sku: '', description: '', price: '', salePrice: '', stock: '',
  categoryId: '', featured: false, images: [''],
};

export default function ProductsAdmin() {
  const { products, categories, saveProduct, deleteProduct } = useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(emptyProduct);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));

  const openNew = () => { setEditing({ ...emptyProduct }); setOpen(true); };
  const openEdit = (p) => {
    setEditing({ ...p, price: String(p.price), salePrice: p.salePrice ? String(p.salePrice) : '', stock: String(p.stock), images: p.images?.length ? p.images : [''] });
    setOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editing.name || !editing.price || !editing.categoryId) {
      toast.error('Completa nombre, precio y categoría');
      return;
    }
    const payload = {
      ...editing,
      id: editing.id || `p-${Date.now()}`,
      slug: editing.slug || slugify(editing.name),
      price: Number(editing.price),
      salePrice: editing.salePrice ? Number(editing.salePrice) : null,
      stock: Number(editing.stock) || 0,
      images: editing.images.filter(Boolean).length ? editing.images.filter(Boolean) : ['https://images.unsplash.com/photo-1560343090-f0409e92791a?w=900&q=85&auto=format'],
      specs: editing.specs || [],
      featured: !!editing.featured,
    };
    saveProduct(payload);
    toast.success(editing.id ? 'Producto actualizado' : 'Producto creado');
    setOpen(false);
  };

  const confirmDelete = () => {
    deleteProduct(deleteId);
    toast.success('Producto eliminado');
    setDeleteId(null);
  };

  return (
    <div data-testid="admin-products">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#1a1a1a]">Productos</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} productos en total</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-[#C9A227] hover:text-black transition-colors" data-testid="add-product-btn">
          <Plus size={18} /> Nuevo producto
        </button>
      </div>

      <div className="relative mb-5 max-w-sm">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar producto o SKU…" className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:border-[#C9A227] focus:outline-none" data-testid="product-search" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="px-5 py-3 font-medium">Producto</th>
              <th className="px-5 py-3 font-medium hidden md:table-cell">Categoría</th>
              <th className="px-5 py-3 font-medium">Precio</th>
              <th className="px-5 py-3 font-medium">Stock</th>
              <th className="px-5 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const cat = categories.find((c) => c.id === p.categoryId);
              return (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50" data-testid={`product-row-${p.id}`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded" />
                      <div>
                        <p className="font-medium text-[#1a1a1a]">{p.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{p.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-gray-500">{cat?.name || '—'}</td>
                  <td className="px-5 py-3">{formatCLP(p.salePrice ?? p.price)}</td>
                  <td className="px-5 py-3"><span className={p.stock === 0 ? 'text-red-500 font-medium' : ''}>{p.stock}</span></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 text-gray-500 hover:text-[#C9A227] hover:bg-gray-100 rounded" data-testid={`edit-${p.id}`}><Pencil size={16} /></button>
                      <button onClick={() => setDeleteId(p.id)} className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded" data-testid={`delete-${p.id}`}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-400">Sin resultados.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Edit dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-auto" data-testid="product-dialog">
          <DialogHeader><DialogTitle>{editing.id ? 'Editar producto' : 'Nuevo producto'}</DialogTitle><DialogDescription>Completa los datos del producto. Se guardan en localStorage (demo).</DialogDescription></DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nombre *</label>
              <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 focus:border-[#C9A227] focus:outline-none" data-testid="field-name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">SKU</label>
                <input value={editing.sku} onChange={(e) => setEditing({ ...editing, sku: e.target.value })} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 focus:border-[#C9A227] focus:outline-none" data-testid="field-sku" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Categoría *</label>
                <select value={editing.categoryId} onChange={(e) => setEditing({ ...editing, categoryId: e.target.value })} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 bg-white focus:border-[#C9A227] focus:outline-none" data-testid="field-category">
                  <option value="">Seleccionar…</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Precio *</label>
                <input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 focus:border-[#C9A227] focus:outline-none" data-testid="field-price" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Oferta</label>
                <input type="number" value={editing.salePrice} onChange={(e) => setEditing({ ...editing, salePrice: e.target.value })} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 focus:border-[#C9A227] focus:outline-none" data-testid="field-saleprice" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Stock</label>
                <input type="number" value={editing.stock} onChange={(e) => setEditing({ ...editing, stock: e.target.value })} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 focus:border-[#C9A227] focus:outline-none" data-testid="field-stock" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">URL de imagen</label>
              <input value={editing.images[0] || ''} onChange={(e) => setEditing({ ...editing, images: [e.target.value] })} placeholder="https://…" className="w-full mt-1 border border-gray-200 rounded px-3 py-2 focus:border-[#C9A227] focus:outline-none" data-testid="field-image" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Descripción</label>
              <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 focus:border-[#C9A227] focus:outline-none" data-testid="field-description" />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} data-testid="field-featured" /> Destacado en home
            </label>
            <DialogFooter>
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">Cancelar</button>
              <button type="submit" className="bg-[#1a1a1a] text-white px-5 py-2 rounded text-sm font-medium hover:bg-[#C9A227] hover:text-black transition-colors" data-testid="save-product-btn">Guardar</button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer (en esta demo).</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600" data-testid="confirm-delete-btn">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
