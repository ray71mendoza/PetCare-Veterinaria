import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stethoscope, 
  Search, 
  Plus, 
  Filter, 
  Clock, 
  PawPrint, 
  User, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert,
  ChevronRight,
  Thermometer,
  Heart,
  Activity
} from 'lucide-react';
import VertexAppShell from '../../Component/VertexVetLayout/VertexAppShell';

export const VertexConsultations = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockConsultations = [
    {
      id: 'CNS-2026-001',
      patientId: 'PET-1001',
      patientName: 'Luna',
      species: 'Canino',
      breed: 'Golden Retriever',
      ownerName: 'Carlos Rodríguez',
      doctor: 'Dr. Alejandro Restrepo',
      date: '18/08/2026',
      time: '09:00 AM',
      type: 'Consulta General & Triage',
      status: 'en_consulta',
      statusLabel: 'En Consulta',
      statusBadge: 'bg-teal-50 text-teal-700 border-teal-200',
      reason: 'Control de dermatitis en abdomen y revisión de vacuna séxtuple',
      vitals: { temp: '38.4 °C', hr: '105 bpm', weight: '24.6 kg' },
      criticalAlert: 'Alergia a Penicilina'
    },
    {
      id: 'CNS-2026-002',
      patientId: 'PET-1003',
      patientName: 'Rocky',
      species: 'Canino',
      breed: 'Bulldog Francés',
      ownerName: 'Mariana Duque',
      doctor: 'Dra. Valentina Ríos',
      date: '18/08/2026',
      time: '10:30 AM',
      type: 'Dermatología Especializada',
      status: 'en_espera',
      statusLabel: 'En Triage / Espera',
      statusBadge: 'bg-amber-50 text-amber-700 border-amber-200',
      reason: 'Prurito intenso en pliegues faciales y pabellones auriculares',
      vitals: { temp: '38.8 °C', hr: '120 bpm', weight: '11.8 kg' },
      criticalAlert: 'Intolerancia a Ketamina'
    },
    {
      id: 'CNS-2026-003',
      patientId: 'PET-1002',
      patientName: 'Max',
      species: 'Felino',
      breed: 'Siamés',
      ownerName: 'Laura Gómez',
      doctor: 'Dr. Alejandro Restrepo',
      date: '17/08/2026',
      time: '04:00 PM',
      type: 'Control Posquirúrgico',
      status: 'finalizada',
      statusLabel: 'Cerrada & Firmada',
      statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      reason: 'Revisión de herida quirúrgica y retiro de suturas',
      vitals: { temp: '38.2 °C', hr: '140 bpm', weight: '4.2 kg' },
      criticalAlert: null
    },
    {
      id: 'CNS-2026-004',
      patientId: 'PET-1005',
      patientName: 'Kira',
      species: 'Canino',
      breed: 'Pastor Alemán',
      ownerName: 'Elena Cardona',
      doctor: 'Dr. Alejandro Restrepo',
      date: '16/08/2026',
      time: '11:00 AM',
      type: 'Chequeo Preventivo',
      status: 'finalizada',
      statusLabel: 'Cerrada & Firmada',
      statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      reason: 'Chequeo geriátrico y perfil bioquímico de rutina',
      vitals: { temp: '38.5 °C', hr: '95 bpm', weight: '29.3 kg' },
      criticalAlert: null
    }
  ];

  const filteredConsultations = mockConsultations.filter((c) => {
    const matchesSearch = 
      c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.reason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <VertexAppShell breadcrumbs={['Atención Médica', 'Consultas Clínicas']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Consultas Clínicas & Atención Médica
            </h1>
            <p className="text-sm text-slate-500">
              Registro SOAP, diagnóstico diferencial, anamnesis y control de constantes fisiológicas.
            </p>
          </div>

          <button
            onClick={() => navigate('/vet/pacientes')}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm flex items-center gap-2 self-start sm:self-auto transition-all"
          >
            <Plus size={18} />
            <span>Nueva Consulta SOAP</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por paciente, motivo, código o dueño..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:border-teal-500 focus:bg-white outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <Filter size={16} className="text-slate-400 shrink-0 hidden sm:block" />
            {[
              { id: 'all', label: 'Todas' },
              { id: 'en_consulta', label: 'En Consulta' },
              { id: 'en_espera', label: 'En Espera' },
              { id: 'finalizada', label: 'Cerradas' },
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

        {/* Consultations List */}
        <div className="space-y-3.5">
          {filteredConsultations.map((consultation) => (
            <div
              key={consultation.id}
              onClick={() => navigate(`/vet/pacientes/${consultation.patientId}`)}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-teal-500/50 transition-all cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                  <Stethoscope size={22} />
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {consultation.patientName}
                    </span>
                    <span className="text-xs text-slate-500">({consultation.species} · {consultation.breed})</span>
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                      {consultation.id}
                    </span>
                    {consultation.criticalAlert && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-md">
                        <ShieldAlert size={11} />
                        {consultation.criticalAlert}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 font-medium">
                    <span className="font-semibold text-slate-900">Motivo:</span> {consultation.reason}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <User size={13} className="text-slate-400" />
                      {consultation.ownerName}
                    </span>
                    <span>·</span>
                    <span>Médico: <strong className="text-slate-700">{consultation.doctor}</strong></span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" />
                      {consultation.date} a las {consultation.time}
                    </span>
                  </div>

                  {/* Vitals preview */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="text-[11px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg text-slate-600">
                      🌡️ {consultation.vitals.temp}
                    </span>
                    <span className="text-[11px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg text-slate-600">
                      ❤️ {consultation.vitals.hr}
                    </span>
                    <span className="text-[11px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg text-slate-600">
                      ⚖️ {consultation.vitals.weight}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right status & action */}
              <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${consultation.statusBadge}`}>
                  {consultation.statusLabel}
                </span>
                <button className="px-4 py-2 rounded-xl bg-slate-100 group-hover:bg-teal-600 group-hover:text-white text-slate-700 text-xs font-bold transition-all flex items-center gap-1">
                  <span>Abrir Expediente</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </VertexAppShell>
  );
};

export default VertexConsultations;
