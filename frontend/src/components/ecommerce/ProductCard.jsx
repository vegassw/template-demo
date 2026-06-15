import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCLP } from '@/lib/format';

export const ProductCard = ({ product, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.06 }}
    >
      <Link
        to={`/ecommerce/producto/${product.slug}`}
        className="group block"
        data-testid={`product-card-${product.id}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-[#F5F5F5]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.salePrice && (
            <span className="absolute top-4 left-4 bg-[#C9A227] text-black px-3 py-1 text-xs font-bold tracking-wide">
              OFERTA
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute top-4 right-4 bg-[#1a1a1a] text-white px-3 py-1 text-xs font-bold tracking-wide">
              AGOTADO
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="block w-full text-center bg-[#1a1a1a] text-white py-3 text-xs font-semibold tracking-widest uppercase">
              Ver producto
            </span>
          </div>
        </div>
        <h3 className="font-body font-medium text-[#1a1a1a] mb-2">{product.name}</h3>
        <div className="flex items-center gap-3">
          {product.salePrice ? (
            <>
              <span className="font-semibold text-[#C9A227]">{formatCLP(product.salePrice)}</span>
              <span className="text-sm text-gray-400 line-through">{formatCLP(product.price)}</span>
            </>
          ) : (
            <span className="font-semibold text-[#1a1a1a]">{formatCLP(product.price)}</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
