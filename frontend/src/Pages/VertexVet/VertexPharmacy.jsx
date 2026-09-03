import React, { useState } from 'react';
import { 
  Pill, 
  Search, 
  Plus, 
  Filter, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  TrendingDown, 
  Package,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import VertexAppShell from '../../Component/VertexVetLayout/VertexAppShell';

export const VertexPharmacy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [inventory, setInventory] = useState([
    {
      id: 'MED-001',
      name: 'Amoxicilina + Ácido Clavulánico',
      activeIngredient: 'Amoxicilina / Clavulanato',
      presentation: 'Comprimidos 500mg / 125mg',
      category: 'Antibiótico',
      stock: 4,
      minStock: 10,
      lot: 'LOTE-AMX-2026',
      expiryDate: '15/10/2026',
      unitPrice: '$4.500 COP',
      status: 'critico',
      statusLabel: 'Stock Crítico (4 uds)',
      statusBadge: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      id: 'MED-002',
      name: 'Apoquel (Oclacitinib)',
      activeIngredient: 'Oclacitinib maleato',
      presentation: 'Comprimidos 16mg x 20',
      category: 'Dermatológico',
      stock: 18,
      minStock: 5,
      lot: 'LOTE-APQ-8821',
      expiryDate: '30/11/2027',
      unitPrice: '$12.000 COP',
      status: 'optimo',
      statusLabel: 'Stock Óptimo',
      statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'MED-003',
      name: 'Meloxicam Gotas 0.5%',
      activeIngredient: 'Meloxicam',
      presentation: 'Frasco gotero 15ml',
      category: 'Antiinflamatorio / Analgésico',
      stock: 12,
      minStock: 6,
      lot: 'LOTE-MLX-4412',
      expiryDate: '10/09/2026',
      unitPrice: '$28.000 COP',
      status: 'proximo_vencer',
      statusLabel: 'Vence en 23 días',
      statusBadge: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'MED-004',
      name: 'Nobivac DHPPi + L4 (Séxtuple)',
      activeIngredient: 'Antígenos combinados caninos',
      presentation: 'Frasco monodosis liofilizado',
      category: 'Biológico / Vacuna',
      stock: 35,
      minStock: 15,
      lot: 'LOTE-NBV-9921',
      expiryDate: '15/06/2027',
      unitPrice: '$45.000 COP',
      status: 'optimo',
      statusLabel: 'Stock Óptimo',
      statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'MED-005',
      name: 'Bravecto (Fluralaner 20-40kg)',
      activeIngredient: 'Fluralaner',
      presentation: 'Tableta masticable 1000mg',
      category: 'Antiparasitario',
      stock: 22,
      minStock: 8,
      lot: 'LOTE-BRV-3310',
      expiryDate: '20/04/2028',
      unitPrice: '$115.000 COP',
      status: 'optimo',
      statusLabel: 'Stock Óptimo',
      statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'MED-006',
      name: 'Suero Fisiológico NaCl 0.9%',
      activeIngredient: 'Cloruro de Sodio',
      presentation: 'Bolsa infusora 500ml',
      category: 'Fluidoterapia',
      stock: 6,
      minStock: 12,
      lot: 'LOTE-SAL-7711',
      expiryDate: '01/12/2027',
      unitPrice: '$8.000 COP',
      status: 'bajo',
      statusLabel: 'Stock Bajo (6 uds)',
      statusBadge: 'bg-amber-50 text-amber-700 border-amber-200',
    }
  ]);

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.activeIngredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lot.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <VertexAppShell breadcrumbs={['Farmacia & Insumos', 'Inventario Transaccional']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Farmacia Clínica & Medicamentos
            </h1>
            <p className="text-sm text-slate-500">
              Control de existencias, principio activo, trazabilidad de lotes y alertas de vencimiento.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm flex items-center gap-2 self-start sm:self-auto transition-all"
          >
            <Plus size={18} />
            <span>Registrar Medicamento</span>
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Ítems en Catálogo</span>
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Pill size={18} />
              </div>
            </div>
            <span className="text-2xl font-black text-slate-900 font-display mt-2 block">186 Productos</span>
            <p className="text-xs text-slate-500 mt-1">6 categorías clínicas</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Stock Crítico & Reposición</span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle size={18} />
              </div>
            </div>
            <span className="text-2xl font-black text-rose-600 font-display mt-2 block">3 Medicamentos</span>
            <p className="text-xs text-rose-500 mt-1">Requiere orden a proveedor</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Próximos a Vencer (30 días)</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock size={18} />
              </div>
            </div>
            <span className="text-2xl font-black text-amber-700 font-display mt-2 block">2 Lotes</span>
            <p className="text-xs text-amber-600 mt-1">Revisión obligatoria</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, principio activo, lote..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:border-teal-500 focus:bg-white outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <Filter size={16} className="text-slate-400 shrink-0 hidden sm:block" />
            {[
              { id: 'all', label: 'Todos' },
              { id: 'Antibiótico', label: 'Antibióticos' },
              { id: 'Antiinflamatorio / Analgésico', label: 'Analgésicos' },
              { id: 'Biológico / Vacuna', label: 'Vacunas' },
              { id: 'Antiparasitario', label: 'Antiparasitarios' },
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

        {/* Inventory Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-5">Medicamento / Presentación</th>
                  <th className="py-3.5 px-4">Principio Activo</th>
                  <th className="py-3.5 px-4">Lote Fabricante</th>
                  <th className="py-3.5 px-4">Vencimiento</th>
                  <th className="py-3.5 px-4">Stock Disponible</th>
                  <th className="py-3.5 px-4">Precio Unitario</th>
                  <th className="py-3.5 px-4">Estado</th>
                  <th className="py-3.5 px-5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                          <Pill size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                          <p className="text-[11px] text-slate-500">{item.presentation} · <span className="text-teal-700 font-semibold">{item.category}</span></p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-semibold">{item.activeIngredient}</td>
                    <td className="py-4 px-4 font-mono text-slate-600">{item.lot}</td>
                    <td className="py-4 px-4 text-slate-600">{item.expiryDate}</td>
                    <td className="py-4 px-4">
                      <span className="font-extrabold text-sm text-slate-900">{item.stock}</span>
                      <span className="text-slate-400 text-[10px] ml-1">/ mín {item.minStock}</span>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-800">{item.unitPrice}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${item.statusBadge}`}>
                        {item.statusLabel}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button 
                        onClick={() => alert(`Dispensación rápida para: ${item.name}`)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-700 text-xs font-bold transition-all"
                      >
                        Dispensar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </VertexAppShell>
  );
};

export default VertexPharmacy;
