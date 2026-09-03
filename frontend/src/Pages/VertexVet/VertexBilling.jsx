import React, { useState } from 'react';
import { 
  Receipt, 
  Search, 
  Plus, 
  Filter, 
  DollarSign, 
  CreditCard, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Download, 
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import VertexAppShell from '../../Component/VertexVetLayout/VertexAppShell';

export const VertexBilling = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [invoices, setInvoices] = useState([
    {
      id: 'FAC-2026-1082',
      date: '18/08/2026',
      patientName: 'Luna',
      ownerName: 'Carlos Rodríguez',
      ownerDoc: 'CC 102049281',
      items: 'Consulta General + Vacuna Séxtuple',
      total: '$90.000 COP',
      paymentMethod: 'Tarjeta de Crédito / Datáfono',
      status: 'pagada',
      statusLabel: 'Pagada',
      statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'FAC-2026-1081',
      date: '18/08/2026',
      patientName: 'Rocky',
      ownerName: 'Mariana Duque',
      ownerDoc: 'CC 43902182',
      items: 'Consulta Dermatológica + Apoquel 16mg',
      total: '$165.000 COP',
      paymentMethod: 'Transferencia Bancaria / QR',
      status: 'pagada',
      statusLabel: 'Pagada',
      statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'FAC-2026-1080',
      date: '18/08/2026',
      patientName: 'Simba',
      ownerName: 'Felipe Jaramillo',
      ownerDoc: 'CC 71928401',
      items: 'Anticipo Cirugía de Esterilización',
      total: '$180.000 COP',
      paymentMethod: 'Efectivo',
      status: 'pendiente',
      statusLabel: 'Pendiente Saldo',
      statusBadge: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'FAC-2026-1079',
      date: '17/08/2026',
      patientName: 'Max',
      ownerName: 'Laura Gómez',
      ownerDoc: 'CC 32901842',
      items: 'Grooming Canino + Baño Medicado',
      total: '$45.000 COP',
      paymentMethod: 'Efectivo',
      status: 'pagada',
      statusLabel: 'Pagada',
      statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  ]);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = 
      inv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.items.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <VertexAppShell breadcrumbs={['Comercial & Finanzas', 'Facturación & Caja']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Facturación & Control de Caja
            </h1>
            <p className="text-sm text-slate-500">
              Liquidación de servicios médicos, recibos de caja, medios de pago y cuentas por cobrar.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => window.print()}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-all"
            >
              <Printer size={15} />
              <span>Cuadre del Día</span>
            </button>
            <button className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-sm flex items-center gap-2 transition-all">
              <Plus size={16} />
              <span>Nueva Factura / Cobro</span>
            </button>
          </div>
        </div>

        {/* Financial KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Facturado Hoy</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign size={18} />
              </div>
            </div>
            <span className="text-2xl font-black text-slate-900 font-display mt-2 block">$480.000 COP</span>
            <p className="text-xs text-emerald-600 font-semibold mt-1">4 transacciones aprobadas</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Cuentas por Cobrar</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock size={18} />
              </div>
            </div>
            <span className="text-2xl font-black text-amber-700 font-display mt-2 block">$180.000 COP</span>
            <p className="text-xs text-amber-600 mt-1">1 saldo pendiente de liquidar</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Medios de Pago</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <CreditCard size={18} />
              </div>
            </div>
            <div className="mt-2 text-xs space-y-1 font-semibold text-slate-700">
              <div className="flex justify-between"><span>Datáfono / Tarjetas:</span> <span className="font-bold text-slate-900">$255.000</span></div>
              <div className="flex justify-between"><span>Efectivo en Caja:</span> <span className="font-bold text-slate-900">$225.000</span></div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por Nº factura, cliente, paciente o concepto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:border-teal-500 focus:bg-white outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <Filter size={16} className="text-slate-400 shrink-0 hidden sm:block" />
            {[
              { id: 'all', label: 'Todas' },
              { id: 'pagada', label: 'Pagadas' },
              { id: 'pendiente', label: 'Pendientes' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  statusFilter === f.id
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-5">Nº Factura / Fecha</th>
                  <th className="py-3.5 px-4">Paciente & Propietario</th>
                  <th className="py-3.5 px-4">Conceptos Facturados</th>
                  <th className="py-3.5 px-4">Medio de Pago</th>
                  <th className="py-3.5 px-4">Total</th>
                  <th className="py-3.5 px-4">Estado</th>
                  <th className="py-3.5 px-5 text-right">Recibo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5">
                      <p className="font-mono font-bold text-slate-900 text-sm">{inv.id}</p>
                      <p className="text-[11px] text-slate-400">{inv.date}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-slate-900">{inv.patientName}</p>
                      <p className="text-[11px] text-slate-500">{inv.ownerName} ({inv.ownerDoc})</p>
                    </td>
                    <td className="py-4 px-4 text-slate-700 max-w-xs truncate">{inv.items}</td>
                    <td className="py-4 px-4 text-slate-600">{inv.paymentMethod}</td>
                    <td className="py-4 px-4 font-black text-slate-900 text-sm">{inv.total}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${inv.statusBadge}`}>
                        {inv.statusLabel}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button 
                        onClick={() => window.print()}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-700 text-xs font-bold transition-all inline-flex items-center gap-1"
                      >
                        <Printer size={13} />
                        <span>Imprimir</span>
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

export default VertexBilling;
