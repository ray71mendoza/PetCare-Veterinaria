import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  User, 
  PawPrint, 
  Filter, 
  CheckCircle2, 
  Stethoscope,
  Scissors,
  GraduationCap
} from 'lucide-react';
import VertexAppShell from '../../Component/VertexVetLayout/VertexAppShell';
import VertexNewAppointmentModal from './VertexNewAppointmentModal';

export const VertexAgendaCalendar = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('week');
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [newAppointmentOpen, setNewAppointmentOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 18)); // August 18, 2026

  const doctors = [
    { id: 'all', name: 'Todos los Especialistas' },
    { id: 'doc_1', name: 'Dr. Alejandro Restrepo (Cirugía)', icon: Stethoscope },
    { id: 'doc_2', name: 'Dra. Valentina Ríos (Dermatología)', icon: Stethoscope },
    { id: 'groom_1', name: 'Camilo Osorio (Grooming)', icon: Scissors },
    { id: 'train_1', name: 'Esteban Morales (Etología)', icon: GraduationCap }
  ];

  const mockAppointments = [
    {
      id: 'APT-1',
      day: 'Martes 18',
      time: '08:30 AM',
      pet: 'Luna',
      breed: 'Golden Retriever',
      owner: 'Carlos Rodríguez',
      doctor: 'Dr. Alejandro Restrepo',
      doctorId: 'doc_1',
      service: 'Control Vacunación Séxtuple',
      type: 'vet',
      status: 'en_espera',
      badge: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      id: 'APT-2',
      day: 'Martes 18',
      time: '10:00 AM',
      pet: 'Rocky',
      breed: 'Bulldog Francés',
      owner: 'Mariana Duque',
      doctor: 'Dra. Valentina Ríos',
      doctorId: 'doc_2',
      service: 'Consulta Dermatológica Especializada',
      type: 'vet',
      status: 'en_consulta',
      badge: 'bg-teal-100 text-teal-800 border-teal-300',
    },
    {
      id: 'APT-3',
      day: 'Martes 18',
      time: '02:00 PM',
      pet: 'Simba',
      breed: 'Gato Persa',
      owner: 'Felipe Jaramillo',
      doctor: 'Dr. Alejandro Restrepo',
      doctorId: 'doc_1',
      service: 'Cirugía de Esterilización (Quirófano 1)',
      type: 'vet',
      status: 'programada',
      badge: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    },
    {
      id: 'APT-4',
      day: 'Miércoles 19',
      time: '09:00 AM',
      pet: 'Max',
      breed: 'Siamés',
      owner: 'Laura Gómez',
      doctor: 'Dra. Valentina Ríos',
      doctorId: 'doc_2',
      service: 'Revisión Posquirúrgica',
      type: 'vet',
      status: 'programada',
      badge: 'bg-slate-100 text-slate-700 border-slate-300',
    },
    {
      id: 'APT-5',
      day: 'Miércoles 19',
      time: '11:30 AM',
      pet: 'Kira',
      breed: 'Pastor Alemán',
      owner: 'Elena Cardona',
      doctor: 'Camilo Osorio',
      doctorId: 'groom_1',
      service: 'Grooming & Baño Medicado',
      type: 'groomer',
      status: 'programada',
      badge: 'bg-sky-100 text-sky-800 border-sky-300',
    },
    {
      id: 'APT-6',
      day: 'Jueves 20',
      time: '03:00 PM',
      pet: 'Toby',
      breed: 'Beagle',
      owner: 'Andrés Morales',
      doctor: 'Esteban Morales',
      doctorId: 'train_1',
      service: 'Sesión de Socialización y Conducta',
      type: 'trainer',
      status: 'programada',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    }
  ];

  const daysOfWeek = ['Lunes 17', 'Martes 18', 'Miércoles 19', 'Jueves 20', 'Viernes 21', 'Sábado 22'];

  const filteredAppointments = mockAppointments.filter(
    (apt) => selectedDoctor === 'all' || apt.doctorId === selectedDoctor
  );

  return (
    <VertexAppShell breadcrumbs={['Agenda Médica', 'Calendario de Citas']}>
      <div className="space-y-6">
        {/* Top Header & Calendar Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Agenda Médica & Citas
            </h1>
            <p className="text-sm text-slate-500">
              Programación de consultas, cirugías, turnos y disponibilidad de especialistas.
            </p>
          </div>

          <button
            onClick={() => setNewAppointmentOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm flex items-center gap-2 self-start sm:self-auto transition-all"
          >
            <Plus size={18} />
            <span>Nueva Cita</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Date Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button className="p-1.5 rounded-lg hover:bg-white text-slate-600 shadow-2xs transition-all">
                <ChevronLeft size={16} />
              </button>
              <span className="px-3 text-xs font-bold text-slate-800 font-display">Semana 17 - 22 Ago 2026</span>
              <button className="p-1.5 rounded-lg hover:bg-white text-slate-600 shadow-2xs transition-all">
                <ChevronRight size={16} />
              </button>
            </div>

            <button 
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Hoy
            </button>
          </div>

          {/* Doctor / Specialist Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 flex-1 md:flex-initial">
              <Filter size={16} className="text-slate-400" />
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full md:w-64 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 focus:bg-white focus:border-teal-500 outline-none"
              >
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {['dia', 'week', 'mes'].map((m) => (
                <button
                  key={m}
                  onClick={() => setViewMode(m)}
                  className={`px-3 py-1 rounded-lg capitalize transition-all ${
                    viewMode === m ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {m === 'week' ? 'Semana' : m === 'dia' ? 'Día' : 'Mes'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly View Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {daysOfWeek.map((dayName, idx) => {
            const isToday = dayName.includes('18');
            const dayAppointments = filteredAppointments.filter((a) => a.day === dayName);

            return (
              <div
                key={idx}
                className={`rounded-3xl border p-3.5 min-h-[500px] flex flex-col justify-between transition-all ${
                  isToday 
                    ? 'bg-teal-50/40 border-teal-300 ring-2 ring-teal-500/20' 
                    : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <div>
                  {/* Day Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <span className={`text-xs font-bold font-display ${isToday ? 'text-teal-900' : 'text-slate-800'}`}>
                      {dayName}
                    </span>
                    {isToday && (
                      <span className="px-1.5 py-0.5 rounded-md bg-teal-600 text-white text-[9px] font-extrabold uppercase">
                        Hoy
                      </span>
                    )}
                  </div>

                  {/* Appointments Cards List */}
                  <div className="space-y-2.5">
                    {dayAppointments.length === 0 ? (
                      <p className="text-[11px] text-slate-400 text-center py-8">Sin citas</p>
                    ) : (
                      dayAppointments.map((apt) => (
                        <div
                          key={apt.id}
                          onClick={() => navigate('/vet/consultas', { state: { appointment: apt } })}
                          className={`p-3 rounded-2xl border text-xs shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-1.5 ${apt.badge}`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className="flex items-center gap-1">
                              <Clock size={11} /> {apt.time}
                            </span>
                            <span className="capitalize text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-white/70">
                              {apt.status.replace('_', ' ')}
                            </span>
                          </div>

                          <div>
                            <p className="font-extrabold text-slate-900">{apt.pet}</p>
                            <p className="text-[11px] text-slate-600 truncate">{apt.service}</p>
                          </div>

                          <div className="pt-1 border-t border-black/5 text-[10px] text-slate-500 flex items-center justify-between">
                            <span className="truncate">{apt.doctor}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Day Footer Action */}
                <button
                  onClick={() => setNewAppointmentOpen(true)}
                  className="w-full py-2 mt-3 rounded-xl border border-dashed border-slate-300 hover:border-teal-500 text-[11px] font-bold text-slate-500 hover:text-teal-700 transition-all flex items-center justify-center gap-1"
                >
                  <Plus size={13} />
                  <span>Agendar</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <VertexNewAppointmentModal
        isOpen={newAppointmentOpen}
        onClose={() => setNewAppointmentOpen(false)}
      />
    </VertexAppShell>
  );
};

export default VertexAgendaCalendar;
