import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '@/context/AppContext';
import { formatCLP } from '@/lib/format';

export const PetProductCard = ({ product, index = 0 }) => {
  const { addToPetCart } = useApp();
  const price = product.salePrice ?? product.price;

  const quickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToPetCart(product, 1);
    toast.success(`${product.name} agregado al carrito`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.06 }}
    >
      <Link to={`/servicios/producto/${product.slug}`} className="group block bg-white rounded-2xl border border-[#E8E0D5] overflow-hidden hover:shadow-md transition-shadow" data-testid={`pet-product-card-${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-[#FAF7F2]">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          {product.salePrice && (
            <span className="absolute top-3 left-3 bg-[#7BAE8F] text-white px-3 py-1 text-xs font-bold rounded-full tracking-wide">OFERTA</span>
          )}
          {product.stock === 0 && (
            <span className="absolute top-3 right-3 bg-[#2E3A35] text-white px-3 py-1 text-xs font-bold rounded-full">AGOTADO</span>
          )}
          <button onClick={quickAdd} disabled={product.stock === 0} className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-[#7BAE8F] text-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#6B9E7F] disabled:opacity-0" data-testid={`pet-quickadd-${product.id}`} aria-label="Agregar al carrito">
            <Plus size={20} />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-[#2E3A35] mb-2 line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="font-heading text-lg text-[#7BAE8F]">{formatCLP(product.salePrice)}</span>
                <span className="text-sm text-gray-400 line-through">{formatCLP(product.price)}</span>
              </>
            ) : (
              <span className="font-heading text-lg text-[#2E3A35]">{formatCLP(price)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PetProductCard;
