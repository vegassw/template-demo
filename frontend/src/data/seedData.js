// Seed mock data for AURUM & CO. e-commerce

export const seedCategories = [
  {
    id: 'cat-hogar',
    name: 'Hogar',
    slug: 'hogar',
    image: 'https://images.unsplash.com/photo-1760072513357-9d450e935a80?w=800&q=85&auto=format',
    order: 1,
  },
  {
    id: 'cat-tecnologia',
    name: 'Tecnología',
    slug: 'tecnologia',
    image: 'https://images.unsplash.com/photo-1759588071845-3864bd8cc9d3?w=800&q=85&auto=format',
    order: 2,
  },
  {
    id: 'cat-accesorios',
    name: 'Accesorios',
    slug: 'accesorios',
    image: 'https://images.unsplash.com/photo-1558038785-4fe65c791c99?w=800&q=85&auto=format',
    order: 3,
  },
  {
    id: 'cat-herramientas',
    name: 'Herramientas',
    slug: 'herramientas',
    image: 'https://images.unsplash.com/photo-1745426863308-308b92bff031?w=800&q=85&auto=format',
    order: 4,
  },
];

export const seedProducts = [
  // HOGAR
  {
    id: 'p-001', name: 'Lámpara Moderna LED', slug: 'lampara-moderna-led', sku: 'AUR-HOG-001',
    description: 'Lámpara LED de diseño minimalista con tres niveles de intensidad. Perfecta para escritorio o velador. Acabado en metal mate y base estable.',
    price: 45990, salePrice: 35990, stock: 24, categoryId: 'cat-hogar', featured: true,
    images: [
      'https://images.unsplash.com/photo-1766756388111-e3d5cb5edafb?w=900&q=85&auto=format',
      'https://images.unsplash.com/photo-1760072513357-9d450e935a80?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Material', value: 'Metal + Acrílico' },
      { key: 'Voltaje', value: '110-240V' },
      { key: 'Garantía', value: '12 meses' },
      { key: 'Color', value: 'Negro mate' },
    ],
  },
  {
    id: 'p-002', name: 'Set Organizadores Premium', slug: 'set-organizadores', sku: 'AUR-HOG-002',
    description: 'Set de 4 organizadores apilables en bambú y acero. Ideales para baño, oficina o cocina.',
    price: 29990, salePrice: 24990, stock: 40, categoryId: 'cat-hogar', featured: true,
    images: [
      'https://images.unsplash.com/photo-1758995115785-d13726ac93f0?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Piezas', value: '4 unidades' },
      { key: 'Material', value: 'Bambú + Acero' },
      { key: 'Garantía', value: '6 meses' },
    ],
  },
  {
    id: 'p-003', name: 'Florero Cerámica Minimal', slug: 'florero-ceramica', sku: 'AUR-HOG-003',
    description: 'Florero artesanal de cerámica de alta temperatura. Pieza única con acabado mate.',
    price: 19990, salePrice: null, stock: 18, categoryId: 'cat-hogar', featured: false,
    images: [
      'https://images.unsplash.com/photo-1760072513442-9872656c1b07?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Material', value: 'Cerámica' },
      { key: 'Altura', value: '28cm' },
    ],
  },
  {
    id: 'p-004', name: 'Cojines Decorativos Set 4', slug: 'cojines-set-4', sku: 'AUR-HOG-004',
    description: 'Set de 4 cojines en lino premium 45x45cm. Tonos neutros para complementar cualquier ambiente.',
    price: 39990, salePrice: 29990, stock: 30, categoryId: 'cat-hogar', featured: false,
    images: [
      'https://images.unsplash.com/photo-1765862835326-14b5070fdde9?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Tamaño', value: '45x45 cm' },
      { key: 'Material', value: 'Lino 100%' },
      { key: 'Unidades', value: '4' },
    ],
  },

  // TECNOLOGÍA
  {
    id: 'p-005', name: 'Audífonos Bluetooth Pro', slug: 'audifonos-bluetooth-pro', sku: 'AUR-TEC-001',
    description: 'Audífonos inalámbricos con cancelación activa de ruido (ANC), 30hrs de batería y carga rápida USB-C.',
    price: 89990, salePrice: null, stock: 15, categoryId: 'cat-tecnologia', featured: true,
    images: [
      'https://images.unsplash.com/photo-1760462787799-eccd2ccdb2dd?w=900&q=85&auto=format',
      'https://images.unsplash.com/photo-1759588071845-3864bd8cc9d3?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Batería', value: '30 horas' },
      { key: 'Conectividad', value: 'Bluetooth 5.3' },
      { key: 'ANC', value: 'Sí, activo' },
      { key: 'Garantía', value: '12 meses' },
    ],
  },
  {
    id: 'p-006', name: 'Smartwatch Sport Elite', slug: 'smartwatch-elite', sku: 'AUR-TEC-002',
    description: 'Reloj inteligente con monitor cardíaco, GPS, sumergible 50m y 7 días de batería.',
    price: 129990, salePrice: 99990, stock: 12, categoryId: 'cat-tecnologia', featured: true,
    images: [
      'https://images.unsplash.com/photo-1655742785144-c0a8017a7296?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Pantalla', value: 'AMOLED 1.4"' },
      { key: 'Batería', value: '7 días' },
      { key: 'GPS', value: 'Sí' },
      { key: 'Sumergible', value: '50m' },
    ],
  },
  {
    id: 'p-007', name: 'Parlante Portátil Premium', slug: 'parlante-portatil', sku: 'AUR-TEC-003',
    description: 'Parlante bluetooth con sonido 360°, IPX7 y 24 horas de reproducción continua.',
    price: 59990, salePrice: 49990, stock: 22, categoryId: 'cat-tecnologia', featured: false,
    images: [
      'https://images.unsplash.com/photo-1759588071845-3864bd8cc9d3?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Resistencia', value: 'IPX7' },
      { key: 'Batería', value: '24 horas' },
      { key: 'Potencia', value: '30W' },
    ],
  },
  {
    id: 'p-008', name: 'Cargador Inalámbrico Qi', slug: 'cargador-qi', sku: 'AUR-TEC-004',
    description: 'Cargador inalámbrico de carga rápida 15W compatible con todos los dispositivos Qi.',
    price: 24990, salePrice: null, stock: 50, categoryId: 'cat-tecnologia', featured: false,
    images: [
      'https://images.unsplash.com/photo-1655742785144-c0a8017a7296?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Potencia', value: '15W' },
      { key: 'Estándar', value: 'Qi' },
    ],
  },

  // ACCESORIOS
  {
    id: 'p-009', name: 'Reloj Análogo Clásico', slug: 'reloj-analogo', sku: 'AUR-ACC-001',
    description: 'Reloj análogo unisex con caja en acero inoxidable y correa de cuero genuino. Movimiento japonés de cuarzo.',
    price: 69990, salePrice: 54990, stock: 16, categoryId: 'cat-accesorios', featured: true,
    images: [
      'https://images.unsplash.com/photo-1558038785-4fe65c791c99?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Movimiento', value: 'Cuarzo japonés' },
      { key: 'Material caja', value: 'Acero inoxidable' },
      { key: 'Resistencia agua', value: '3 ATM' },
    ],
  },
  {
    id: 'p-010', name: 'Billetera Cuero Italiano', slug: 'billetera-cuero', sku: 'AUR-ACC-002',
    description: 'Billetera de cuero italiano genuino, con 8 ranuras, compartimento de billetes y porta documentos.',
    price: 34990, salePrice: null, stock: 28, categoryId: 'cat-accesorios', featured: false,
    images: [
      'https://images.unsplash.com/photo-1558038785-4fe65c791c99?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Material', value: 'Cuero italiano' },
      { key: 'Ranuras', value: '8' },
    ],
  },
  {
    id: 'p-011', name: 'Lentes Sol Premium', slug: 'lentes-sol', sku: 'AUR-ACC-003',
    description: 'Lentes de sol con protección UV400 y marco ligero en titanio. Estuche incluido.',
    price: 44990, salePrice: 34990, stock: 20, categoryId: 'cat-accesorios', featured: true,
    images: [
      'https://images.unsplash.com/photo-1758995115785-d13726ac93f0?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Protección', value: 'UV400' },
      { key: 'Marco', value: 'Titanio' },
    ],
  },
  {
    id: 'p-012', name: 'Mochila Urbana', slug: 'mochila-urbana', sku: 'AUR-ACC-004',
    description: 'Mochila urbana resistente al agua con compartimento acolchado para laptop 15" y puerto USB.',
    price: 49990, salePrice: 39990, stock: 25, categoryId: 'cat-accesorios', featured: false,
    images: [
      'https://images.unsplash.com/photo-1558038785-4fe65c791c99?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Capacidad', value: '22L' },
      { key: 'Laptop', value: 'Hasta 15.6"' },
      { key: 'USB', value: 'Sí' },
    ],
  },

  // HERRAMIENTAS
  {
    id: 'p-013', name: 'Kit Herramientas 52pcs', slug: 'kit-herramientas-52', sku: 'AUR-HER-001',
    description: 'Kit completo de 52 piezas: destornilladores, llaves, alicates y accesorios. Estuche resistente.',
    price: 79990, salePrice: 59990, stock: 18, categoryId: 'cat-herramientas', featured: true,
    images: [
      'https://images.unsplash.com/photo-1745571479305-fc943d218520?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Piezas', value: '52 unidades' },
      { key: 'Material', value: 'Acero al carbono' },
      { key: 'Estuche', value: 'Incluido' },
    ],
  },
  {
    id: 'p-014', name: 'Taladro Inalámbrico 20V', slug: 'taladro-inalambrico', sku: 'AUR-HER-002',
    description: 'Taladro percutor inalámbrico 20V con 2 baterías de ion-litio, cargador rápido y maletín.',
    price: 149990, salePrice: 119990, stock: 10, categoryId: 'cat-herramientas', featured: true,
    images: [
      'https://images.unsplash.com/photo-1745426863308-308b92bff031?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Voltaje', value: '20V' },
      { key: 'Baterías', value: '2 unidades' },
      { key: 'Garantía', value: '24 meses' },
    ],
  },
  {
    id: 'p-015', name: 'Set Destornilladores Pro', slug: 'set-destornilladores', sku: 'AUR-HER-003',
    description: 'Set de 12 destornilladores profesionales con mangos ergonómicos y puntas magnéticas.',
    price: 24990, salePrice: null, stock: 35, categoryId: 'cat-herramientas', featured: false,
    images: [
      'https://images.unsplash.com/photo-1745571479305-fc943d218520?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Piezas', value: '12' },
      { key: 'Puntas', value: 'Magnéticas' },
    ],
  },
  {
    id: 'p-016', name: 'Caja Organizadora Tools', slug: 'caja-organizadora', sku: 'AUR-HER-004',
    description: 'Caja organizadora de herramientas con compartimentos ajustables y asa reforzada.',
    price: 19990, salePrice: 14990, stock: 0, categoryId: 'cat-herramientas', featured: false,
    images: [
      'https://images.unsplash.com/photo-1745426863308-308b92bff031?w=900&q=85&auto=format',
    ],
    specs: [
      { key: 'Material', value: 'Plástico reforzado' },
      { key: 'Compartimentos', value: 'Ajustables' },
    ],
  },
];

// PATITAS & CO. — Pet Spa services
export const seedServices = [
  {
    id: 'svc-001',
    name: 'Baño Premium',
    duration: 45,
    price: 15000,
    description: 'Baño con shampoo hipoalergénico premium, secado profesional y perfumado natural.',
    icon: 'droplet',
  },
  {
    id: 'svc-002',
    name: 'Corte Estético Completo',
    duration: 90,
    price: 25000,
    description: 'Corte personalizado según raza y preferencia. Incluye baño preparatorio y peinado final.',
    icon: 'scissors',
  },
  {
    id: 'svc-003',
    name: 'Manicure Canino',
    duration: 20,
    price: 8000,
    description: 'Corte y limado de uñas con técnica suave. Hidratación de almohadillas.',
    icon: 'sparkles',
  },
  {
    id: 'svc-004',
    name: 'Spa Day Completo',
    duration: 150,
    price: 40000,
    description: 'Experiencia completa: baño premium + corte + manicure + perfumado + masaje relajante.',
    icon: 'flower',
    featured: true,
  },
  {
    id: 'svc-005',
    name: 'Limpieza Dental',
    duration: 30,
    price: 12000,
    description: 'Cepillado profesional con pasta especial para perros. Refresca el aliento.',
    icon: 'smile',
  },
  {
    id: 'svc-006',
    name: 'Tratamiento Anti-pulgas',
    duration: 45,
    price: 18000,
    description: 'Baño medicado especial con productos antiparasitarios certificados.',
    icon: 'shield',
  },
];

export const petSpaImages = {
  hero: 'https://images.unsplash.com/photo-1551902750-25d3d9c48dfe?w=1200&q=85&auto=format',
  bath: 'https://images.unsplash.com/photo-1536862542715-bba7273d6cac?w=900&q=85&auto=format',
  grooming: 'https://images.unsplash.com/photo-1601299583228-1a74f6152ba7?w=900&q=85&auto=format',
  staff: 'https://images.unsplash.com/photo-1597621631164-b5f672e38bb9?w=900&q=85&auto=format',
  gallery1: 'https://images.unsplash.com/photo-1612297809147-351be66140f0?w=800&q=85&auto=format',
  gallery2: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?w=800&q=85&auto=format',
  gallery3: 'https://images.unsplash.com/photo-1547955326-921fec152788?w=800&q=85&auto=format',
};
