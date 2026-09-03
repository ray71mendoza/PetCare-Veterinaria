import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  PawPrint, 
  Stethoscope, 
  Pill, 
  Receipt, 
  BarChart3, 
  Settings, 
  Users, 
  Store,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import VertexVetLogo from '../../assets/VertexVetLogo';

export const VertexSidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const location = useLocation();

  const navigationGroups = [
    {
      title: 'Principal',
      items: [
        { name: 'Dashboard', path: '/vet/dashboard', icon: LayoutDashboard, badge: 'En Vivo' },
        { name: 'Agenda & Citas', path: '/vet/agenda', icon: Calendar },
        { name: 'Pacientes & Mascotas', path: '/vet/pacientes', icon: PawPrint },
      ],
    },
    {
      title: 'Atención Médica',
      items: [
        { name: 'Consultas Clínicas', path: '/vet/consultas', icon: Stethoscope },
        { name: 'Farmacia & Insumos', path: '/vet/farmacia', icon: Pill },
      ],
    },
    {
      title: 'Comercial & Finanzas',
      items: [
        { name: 'Facturación & Caja', path: '/vet/facturacion', icon: Receipt },
        { name: 'Pet Shop / Tienda', path: '/vet/tienda', icon: Store },
      ],
    },
    {
      title: 'Gestión & Análisis',
      items: [
        { name: 'Reportes & Métricas', path: '/vet/reportes', icon: BarChart3 },
        { name: 'Equipo & Usuarios', path: '/vet/usuarios', icon: Users },
        { name: 'Configuración', path: '/vet/configuracion', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-slate-900 border-r border-slate-800 text-slate-300 transition-all duration-300 ease-in-out flex flex-col justify-between ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 bg-slate-950/40">
          <NavLink to="/vet/dashboard" className="flex items-center gap-2 overflow-hidden">
            <VertexVetLogo 
              size={collapsed ? 'sm' : 'md'} 
              variant={collapsed ? 'icon' : 'full'} 
              theme="dark" 
            />
          </NavLink>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navigationGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {!collapsed && (
                <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  {group.title}
                </p>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-teal-600/15 text-teal-400 border border-teal-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                    }`}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon
                      size={20}
                      className={`shrink-0 transition-colors ${
                        isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    {!collapsed && (
                      <div className="flex-1 flex items-center justify-between truncate">
                        <span className="truncate">{item.name}</span>
                        {item.badge && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Clinic & User Badge Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
              <Building2 size={18} />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">Sede Central Medellín</p>
                <div className="flex items-center gap-1 text-[11px] text-teal-400">
                  <ShieldCheck size={12} />
                  <span>Clínica 24h</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default VertexSidebar;
