import React, { createContext, useContext, useEffect, useState } from 'react';
import { seedProducts, seedCategories, seedServices, seedPetProducts, seedPetCategories } from '@/data/seedData';

const STORAGE_KEYS = {
  products: 'aurum_products_v1',
  categories: 'aurum_categories_v1',
  cart: 'aurum_cart_v1',
  auth: 'aurum_admin_auth_v1',
  bookings: 'patitas_bookings_v1',
  petCart: 'patitas_cart_v1',
};

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // ignore
  }
}

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(() => load(STORAGE_KEYS.products, seedProducts));
  const [categories, setCategories] = useState(() => load(STORAGE_KEYS.categories, seedCategories));
  const [cart, setCart] = useState(() => load(STORAGE_KEYS.cart, []));
  const [isAdmin, setIsAdmin] = useState(() => load(STORAGE_KEYS.auth, false));
  const [bookings, setBookings] = useState(() => load(STORAGE_KEYS.bookings, []));
  const [petCart, setPetCart] = useState(() => load(STORAGE_KEYS.petCart, []));
  // services & pet products are static for mockup
  const [services] = useState(seedServices);
  const [petProducts] = useState(seedPetProducts);
  const [petCategories] = useState(seedPetCategories);

  useEffect(() => save(STORAGE_KEYS.products, products), [products]);
  useEffect(() => save(STORAGE_KEYS.categories, categories), [categories]);
  useEffect(() => save(STORAGE_KEYS.cart, cart), [cart]);
  useEffect(() => save(STORAGE_KEYS.auth, isAdmin), [isAdmin]);
  useEffect(() => save(STORAGE_KEYS.bookings, bookings), [bookings]);
  useEffect(() => save(STORAGE_KEYS.petCart, petCart), [petCart]);

  // CART
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.salePrice ?? product.price,
          image: product.images?.[0] || '',
          qty,
        },
      ];
    });
  };
  const updateQty = (id, qty) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };
  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  // PET CART (PATITAS store)
  const addToPetCart = (product, qty = 1) => {
    setPetCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id: product.id, name: product.name, price: product.salePrice ?? product.price, image: product.images?.[0] || '', qty }];
    });
  };
  const updatePetQty = (id, qty) => {
    if (qty < 1) { removeFromPetCart(id); return; }
    setPetCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };
  const removeFromPetCart = (id) => setPetCart((prev) => prev.filter((i) => i.id !== id));
  const clearPetCart = () => setPetCart([]);
  const petCartTotal = petCart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const petCartCount = petCart.reduce((sum, i) => sum + i.qty, 0);

  // PRODUCTS CRUD
  const saveProduct = (product) => {
    setProducts((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) return prev.map((p) => (p.id === product.id ? product : p));
      return [...prev, { ...product, id: product.id || `p-${Date.now()}` }];
    });
  };
  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  // CATEGORIES CRUD
  const saveCategory = (cat) => {
    setCategories((prev) => {
      const existing = prev.find((c) => c.id === cat.id);
      if (existing) return prev.map((c) => (c.id === cat.id ? cat : c));
      return [...prev, { ...cat, id: cat.id || `cat-${Date.now()}` }];
    });
  };
  const deleteCategory = (id) => setCategories((prev) => prev.filter((c) => c.id !== id));

  // AUTH (mock)
  const login = (email, password) => {
    if (email === 'admin@demo.com' && password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };
  const logout = () => setIsAdmin(false);

  // BOOKINGS
  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: `bk-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'confirmada',
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const resetDemoData = () => {
    setProducts(seedProducts);
    setCategories(seedCategories);
    setCart([]);
    setBookings([]);
    setPetCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        products, categories, services, cart, isAdmin, bookings,
        petProducts, petCategories, petCart,
        cartTotal, cartCount,
        petCartTotal, petCartCount,
        addToCart, updateQty, removeFromCart, clearCart,
        addToPetCart, updatePetQty, removeFromPetCart, clearPetCart,
        saveProduct, deleteProduct,
        saveCategory, deleteCategory,
        login, logout,
        addBooking,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
