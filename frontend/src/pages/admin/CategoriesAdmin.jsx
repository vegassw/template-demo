import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { slugify } from '@/lib/format';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const emptyCat = { id: '', name: '', image: '' };

export default function CategoriesAdmin() {
  const { categories, products, saveCategory, deleteCategory } = useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(emptyCat);
  const [deleteId, setDeleteId] = useState(null);

  const openNew = () => { setEditing({ ...emptyCat }); setOpen(true); };
  const openEdit = (c) => { setEditing({ ...c }); setOpen(true); };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editing.name) { toast.error('El nombre es obligatorio'); return; }
    const payload = {
      ...editing,
      id: editing.id || `cat-${Date.now()}`,
      slug: editing.slug || slugify(editing.name),
      image: editing.image || 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=85&auto=format',
      order: editing.order || categories.length + 1,
    };
    saveCategory(payload);
    toast.success(editing.id ? 'Categoría actualizada' : 'Categoría creada');
    setOpen(false);
  };

  const confirmDelete = () => {
    const count = products.filter((p) => p.categoryId === deleteId).length;
    if (count > 0) {
      toast.error(`No se puede eliminar: tiene ${count} producto(s) asociados`);
      setDeleteId(null);
      return;
    }
    deleteCategory(deleteId);
    toast.success('Categoría eliminada');
    setDeleteId(null);
  };

  return (
    <div data-testid="admin-categories">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#1a1a1a]">Categorías</h1>
          <p className="text-gray-500 text-sm mt-1">{categories.length} categorías</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-[#C9A227] hover:text-black transition-colors" data-testid="add-category-btn">
          <Plus size={18} /> Nueva categoría
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((c) => {
          const count = products.filter((p) => p.categoryId === c.id).length;
          return (
            <div key={c.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden group" data-testid={`category-card-${c.id}`}>
              <div className="h-32 overflow-hidden">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-lg text-[#1a1a1a]">{c.name}</h3>
                <p className="text-xs text-gray-400 mb-3">{count} producto(s)</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(c)} className="flex-1 inline-flex items-center justify-center gap-1 text-sm border border-gray-200 rounded py-2 hover:border-[#C9A227]" data-testid={`edit-cat-${c.id}`}><Pencil size={14} /> Editar</button>
                  <button onClick={() => setDeleteId(c.id)} className="p-2 border border-gray-200 rounded text-gray-500 hover:text-red-500 hover:border-red-200" data-testid={`delete-cat-${c.id}`}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md" data-testid="category-dialog">
          <DialogHeader><DialogTitle>{editing.id ? 'Editar categoría' : 'Nueva categoría'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nombre *</label>
              <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full mt-1 border border-gray-200 rounded px-3 py-2 focus:border-[#C9A227] focus:outline-none" data-testid="cat-field-name" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">URL de imagen</label>
              <input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="https://…" className="w-full mt-1 border border-gray-200 rounded px-3 py-2 focus:border-[#C9A227] focus:outline-none" data-testid="cat-field-image" />
            </div>
            <DialogFooter>
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">Cancelar</button>
              <button type="submit" className="bg-[#1a1a1a] text-white px-5 py-2 rounded text-sm font-medium hover:bg-[#C9A227] hover:text-black transition-colors" data-testid="save-category-btn">Guardar</button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar categoría?</AlertDialogTitle>
            <AlertDialogDescription>Solo se puede eliminar si no tiene productos asociados.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600" data-testid="confirm-delete-cat-btn">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
