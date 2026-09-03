import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  ShieldCheck, 
  Stethoscope, 
  Phone, 
  Mail, 
  Building2, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import VertexAppShell from '../../Component/VertexVetLayout/VertexAppShell';

export const VertexStaffDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const [staff, setStaff] = useState([
    {
      id: 'DOC-01',
      name: 'Dr. Alejandro Restrepo',
      role: 'Director Médico / Cirujano Principal',
      roleType: 'vet',
      specialty: 'Cirugía de Tejidos Blandos & Ortopedia',
      email: 'alejandro.restrepo@vertexvet.com',
      phone: '300 482 9182',
      branch: 'Sede Principal - Medellín',
      status: 'Activo / En Turno',
      statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
      activeCases: 6,
    },
    {
      id: 'DOC-02',
      name: 'Dra. Valentina Ríos',
      role: 'Médico Veterinario Especialista',
      roleType: 'vet',
      specialty: 'Dermatología & Nutrición Clínica',
      email: 'valentina.rios@vertexvet.com',
      phone: '315 782 1928',
      branch: 'Sede Principal - Medellín',
      status: 'Activo / En Consulta',
      statusBadge: 'bg-teal-50 text-teal-700 border-teal-200',
      avatar: 'https://images.unsplash.com/photo-1594824813682-70b5559c5d79?auto=format&fit=crop&w=300&q=80',
      activeCases: 4,
    },
    {
      id: 'STF-03',
      name: 'Mariana Duque',
      role: 'Jefa de Recepción & Admisiones',
      roleType: 'reception',
      specialty: 'Atención al Cliente & Triage',
      email: 'recepcion.medellin@vertexvet.com',
      phone: '320 849 2019',
      branch: 'Sede Principal - Medellín',
      status: 'Activo',
      statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      activeCases: 12,
    },
    {
      id: 'STF-04',
      name: 'Camilo Osorio',
      role: 'Especialista en Estética & Grooming',
      roleType: 'groomer',
      specialty: 'Grooming Canino & Felino',
      email: 'camilo.osorio@vertexvet.com',
      phone: '310 982 3451',
      branch: 'Sede Principal - Medellín',
      status: 'Activo',
      statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      activeCases: 3,
    }
  ]);

  const filteredStaff = staff.filter((s) => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'all' || s.roleType === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <VertexAppShell breadcrumbs={['Gestión & Análisis', 'Equipo & Usuarios (RBAC)']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Equipo Médico & Gestión de Usuarios
            </h1>
            <p className="text-sm text-slate-500">
              Control de roles (RBAC), turnos clínicos, veterinarios asignados y permisos de acceso.
            </p>
          </div>

          <button className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-sm flex items-center gap-2 transition-all">
            <Plus size={16} />
            <span>Añadir Miembro del Equipo</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, especialidad o cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:border-teal-500 focus:bg-white outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <Filter size={16} className="text-slate-400 shrink-0 hidden sm:block" />
            {[
              { id: 'all', label: 'Todos' },
              { id: 'vet', label: 'Médicos Veterinarios' },
              { id: 'reception', label: 'Recepción & Caja' },
              { id: 'groomer', label: 'Estética & Otros' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setRoleFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  roleFilter === f.id
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {filteredStaff.map((person) => (
            <div
              key={person.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs"
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-display">
                        {person.name}
                      </h3>
                      <p className="text-xs text-teal-700 font-semibold">{person.role}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{person.specialty}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${person.statusBadge}`}>
                    {person.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Building2 size={13} className="text-slate-400" />
                    <span>{person.branch}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={13} className="text-slate-400" />
                    <span>{person.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-slate-400" />
                    <span>{person.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">
                  {person.activeCases} pacientes / citas asignadas
                </span>
                <button className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">
                  Gestionar Permisos (RBAC)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </VertexAppShell>
  );
};

export default VertexStaffDirectory;
