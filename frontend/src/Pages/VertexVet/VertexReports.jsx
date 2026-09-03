import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download, 
  DollarSign, 
  Stethoscope, 
  PawPrint, 
  Users, 
  Printer, 
  FileSpreadsheet,
  PieChart as PieIcon,
  Filter
} from 'lucide-react';
import VertexAppShell from '../../Component/VertexVetLayout/VertexAppShell';

export const VertexReports = () => {
  const [period, setPeriod] = useState('month');

  const stats = [
    { title: 'Ingresos Totales (Mes)', value: '$18.450.000 COP', change: '+14.2% vs mes anterior', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Consultas Médicas Atendidas', value: '142 Pacientes', change: '+8 citas nuevas', icon: Stethoscope, color: 'text-teal-600 bg-teal-50' },
    { title: 'Cirugías & Quirófano', value: '28 Procedimientos', change: '100% éxito clínico', icon: PawPrint, color: 'text-indigo-600 bg-indigo-50' },
    { title: 'Nuevos Propietarios Registrados', value: '36 Clientes', change: '+22% recurrencia', icon: Users, color: 'text-violet-600 bg-violet-50' },
  ];

  const topDiagnostics = [
    { name: 'Dermatitis alérgica & Atopías', count: 48, percentage: '34%' },
    { name: 'Gastroenteritis bacteriana / viral', count: 32, percentage: '22%' },
    { name: 'Profilaxis & Limpieza Dental', count: 26, percentage: '18%' },
    { name: 'Controles de Vacunación Anual', count: 22, percentage: '16%' },
    { name: 'Traumatología & Ortopedia', count: 14, percentage: '10%' },
  ];

  const revenueByService = [
    { service: 'Consultas Médicas & Urgencias', revenue: '$6.390.000', share: '35%' },
    { service: 'Cirugías & Hospitalización', revenue: '$5.535.000', share: '30%' },
    { service: 'Farmacia & Medicamentos', revenue: '$3.690.000', share: '20%' },
    { service: 'Grooming & Estética Canina', revenue: '$2.835.000', share: '15%' },
  ];

  return (
    <VertexAppShell breadcrumbs={['Reportes & Métricas', 'Analítica Clínica']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Reportes & Analítica Clínica
            </h1>
            <p className="text-sm text-slate-500">
              Métricas de rendimiento médico, diagnósticos frecuentes y flujo financiero.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-all"
            >
              <Printer size={15} />
              <span>Exportar PDF</span>
            </button>
            <button className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all">
              <Download size={15} />
              <span>Descargar Excel</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-700">Período de Análisis:</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {[
                { id: 'today', label: 'Hoy' },
                { id: 'week', label: 'Esta Semana' },
                { id: 'month', label: 'Este Mes (Agosto)' },
                { id: 'year', label: 'Año 2026' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPeriod(p.id)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    period === p.id ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <span className="text-xs text-teal-700 font-bold hidden sm:block">
            Datos Sincronizados · Sede Medellín
          </span>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.title}</span>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                    <Icon size={18} />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-display">{item.value}</span>
                  <p className="text-xs font-semibold text-emerald-600 mt-1">{item.change}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Medical Diagnoses */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-800 font-display">Diagnósticos Clínicos más Frecuentes</h3>
                <p className="text-xs text-slate-500">Distribución de patologías atendidas</p>
              </div>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-md">142 Casos</span>
            </div>

            <div className="space-y-3">
              {topDiagnostics.map((d, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-800 font-semibold">{d.name}</span>
                    <span className="text-slate-500 font-bold">{d.count} casos ({d.percentage})</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div 
                      className="h-full bg-teal-600 rounded-full transition-all" 
                      style={{ width: d.percentage }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Distribution */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-800 font-display">Ingresos por Línea de Servicio</h3>
                <p className="text-xs text-slate-500">Aporte porcentual al balance general</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">100% Liquidado</span>
            </div>

            <div className="space-y-3">
              {revenueByService.map((s, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-800">{s.service}</p>
                    <p className="text-emerald-700 font-extrabold text-sm">{s.revenue}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold shadow-2xs">
                    {s.share}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </VertexAppShell>
  );
};

export default VertexReports;
