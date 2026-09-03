import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Bell, 
  Menu, 
  Building, 
  ChevronDown, 
  LogOut, 
  User, 
  Shield, 
  Moon, 
  CheckCircle2,
  AlertTriangle,
  Clock
} from 'lucide-react';
import VertexGlobalSearchModal from './VertexGlobalSearchModal';
import VertexQuickActionModal from './VertexQuickActionModal';

export const VertexHeader = ({ onToggleMobileSidebar, onOpenNewAppointment, onOpenNewPatient }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('Sede Principal - Medellín');

  const navigate = useNavigate();

  // Active user data from localStorage (or fallback demo profile)
  let userData = {};
  try {
    const rawUser = localStorage.getItem('petOwnerUser');
    userData = rawUser && rawUser !== 'undefined' ? JSON.parse(rawUser) : {};
  } catch {
    userData = {};
  }
  const profRole = localStorage.getItem('profRole') || 'Director Veterinario';
  const userName = userData.name || 'Dr. Alejandro Restrepo';
  const userEmail = userData.email || 'alejandro.restrepo@vertexvet.com';

  const mockNotifications = [
    { id: 1, title: 'Paciente en Sala de Espera', desc: 'Luna (Golden Retriever) ha arribado para consulta.', time: 'Hace 5 min', icon: Clock, color: 'text-teal-600 bg-teal-50' },
    { id: 2, title: 'Alerta de Medicamento', desc: 'Amoxicilina + Ác. Clavulánico tiene 4 unidades restantes.', time: 'Hace 25 min', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
    { id: 3, title: 'Cirugía Exitosa', desc: 'Rocky ha salido de quirófano a recuperación.', time: 'Hace 1 hora', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('petOwnerToken');
    localStorage.removeItem('petOwnerUser');
    localStorage.removeItem('profToken');
    localStorage.removeItem('profRole');
    navigate('/vet/login');
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shadow-2xs">
        {/* Left: Mobile trigger & Branch Selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          >
            <Menu size={22} />
          </button>

          {/* Branch Pill Selector */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200/80 text-xs font-medium text-slate-700">
            <Building size={14} className="text-teal-600" />
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-transparent font-semibold outline-none cursor-pointer text-slate-800"
            >
              <option value="Sede Principal - Medellín">Sede Principal (Medellín)</option>
              <option value="Sede Norte - Bello">Sede Norte (Bello)</option>
              <option value="Hospital 24h - El Poblado">Hospital 24h (El Poblado)</option>
            </select>
          </div>
        </div>

        {/* Center: Global Search Trigger Button */}
        <div className="flex-1 max-w-md mx-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/90 hover:bg-slate-100 border border-slate-200/80 text-slate-400 text-xs sm:text-sm font-normal transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Search size={16} className="text-slate-400 group-hover:text-teal-600 transition-colors" />
              <span className="truncate">Buscar paciente, dueño, microchip o cita...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-white border border-slate-200 shadow-2xs text-[10px] font-mono text-slate-500">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right: Actions & User Dropdown */}
        <div className="flex items-center gap-2.5">
          {/* Quick Action Button */}
          <button
            onClick={() => setQuickActionOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-teal-600/20 transition-all cursor-pointer"
          >
            <Plus size={16} className="stroke-[2.5]" />
            <span className="hidden sm:inline">Nueva Acción</span>
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileDropdownOpen(false);
              }}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white" />
            </button>

            {/* Notification Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-in">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Notificaciones Clínicas</span>
                  <span className="text-[11px] font-medium text-teal-600 cursor-pointer hover:underline">Marcar leídas</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {mockNotifications.map((n) => {
                    const Icon = n.icon;
                    return (
                      <div key={n.id} className="p-3.5 hover:bg-slate-50/80 transition-colors flex gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.color}`}>
                          <Icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                          <p className="text-xs text-slate-500 truncate">{n.desc}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                {userName.charAt(0)}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-800 leading-tight">{userName}</span>
                <span className="text-[10px] text-teal-600 font-medium">{profRole}</span>
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Menu Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-fade-in">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-800">{userName}</p>
                  <p className="text-[11px] text-slate-500 truncate">{userEmail}</p>
                  <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 text-[10px] font-semibold border border-teal-200">
                    <Shield size={10} />
                    <span>Licencia Suite Vertex Pro</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    navigate('/vet/configuracion');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <User size={15} className="text-slate-400" />
                  <span>Mi Perfil & Ajustes</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut size={15} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Search Dialog */}
      <VertexGlobalSearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />

      {/* Quick Action Dialog */}
      <VertexQuickActionModal 
        isOpen={quickActionOpen} 
        onClose={() => setQuickActionOpen(false)}
        onOpenNewAppointment={onOpenNewAppointment}
        onOpenNewPatient={onOpenNewPatient}
      />
    </>
  );
};

export default VertexHeader;
