import React, { useState } from 'react';
import { 
  Store, 
  Search, 
  Plus, 
  Filter, 
  ShoppingCart, 
  Star, 
  Package, 
  Tag, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import VertexAppShell from '../../Component/VertexVetLayout/VertexAppShell';

export const VertexStore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [cartCount, setCartCount] = useState(0);

  const [products, setProducts] = useState([
    {
      id: 'PROD-01',
      name: 'Alimento Prescription Diet c/d Multicare Feline',
      brand: 'Hill\'s Prescription',
      category: 'Nutrición Clínica',
      price: '$145.000 COP',
      stock: 14,
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80',
      description: 'Nutrición clínica para el cuidado urinario y disolución de cálculos en gatos.'
    },
    {
      id: 'PROD-02',
      name: 'Alimento Gastrointestinal Puppy & Adult Canino',
      brand: 'Royal Canin Veterinary',
      category: 'Nutrición Clínica',
      price: '$180.000 COP',
      stock: 8,
      image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=400&q=80',
      description: 'Fórmula de alta digestibilidad con prebióticos para perros con desórdenes digestivos.'
    },
    {
      id: 'PROD-03',
      name: 'Champú Medicado Clorhexidina 2% + Ketoconazol',
      brand: 'Dermavet Care',
      category: 'Higiene & Dermatología',
      price: '$42.000 COP',
      stock: 25,
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80',
      description: 'Tratamiento antimicótico y antiséptico para dermatitis y seborreas caninas.'
    },
    {
      id: 'PROD-04',
      name: 'Snacks Dentales Oral Care Canino',
      brand: 'Virbac C.E.T.',
      category: 'Suplementos & Snacks',
      price: '$28.000 COP',
      stock: 30,
      image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=400&q=80',
      description: 'Láminas masticables enzimáticas para prevención de sarro y control de placa bacteriana.'
    }
  ]);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    setCartCount(prev => prev + 1);
  };

  return (
    <VertexAppShell breadcrumbs={['Comercial', 'Pet Shop & Alimentos Especializados']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Pet Shop & Nutrición Clínica
            </h1>
            <p className="text-sm text-slate-500">
              Alimentos medicados, suplementos, accesorios y productos de bienestar animal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold flex items-center gap-2">
              <ShoppingCart size={16} />
              <span>Carrito: {cartCount} artículos</span>
            </div>
            <button className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-sm flex items-center gap-2 transition-all">
              <Plus size={16} />
              <span>Nuevo Producto</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar alimentos, marcas, suplementos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:border-teal-500 focus:bg-white outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <Filter size={16} className="text-slate-400 shrink-0 hidden sm:block" />
            {[
              { id: 'all', label: 'Todos' },
              { id: 'Nutrición Clínica', label: 'Nutrición Clínica' },
              { id: 'Higiene & Dermatología', label: 'Higiene & Champús' },
              { id: 'Suplementos & Snacks', label: 'Suplementos' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setCategoryFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  categoryFilter === f.id
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xl hover:border-teal-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-full h-48 rounded-2xl bg-slate-100 overflow-hidden mb-4 relative">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                    {prod.stock} en stock
                  </span>
                </div>

                <span className="text-[10px] uppercase font-bold text-teal-700 tracking-wider">
                  {prod.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug group-hover:text-teal-700 transition-colors">
                  {prod.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {prod.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-base font-black text-slate-900 font-display">
                  {prod.price}
                </span>
                <button
                  onClick={() => handleAddToCart(prod)}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-2xs transition-all flex items-center gap-1"
                >
                  <ShoppingCart size={13} />
                  <span>Vender</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </VertexAppShell>
  );
};

export default VertexStore;
