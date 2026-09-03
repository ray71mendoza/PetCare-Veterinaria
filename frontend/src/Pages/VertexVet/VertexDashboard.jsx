import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar, 
  PawPrint, 
  Stethoscope, 
  Pill, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ChevronRight, 
  Activity, 
  ShieldAlert,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import VertexAppShell from '../../Component/VertexVetLayout/VertexAppShell';
import { BACKEND_URL } from '../../config';

export const VertexDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);

  // Mock initial appointments and clinical records for high-fidelity interactive experience
  const initialAppointments = [
    {
      id: 'APT-101',
      petName: 'Luna',
      petBreed: 'Golden Retriever',
      ownerName: 'Carlos Rodríguez',
      doctor: 'Dr. Alejandro Restrepo',
      time: '09:00 AM',
      type: 'Consulta General & Vacunación',
      status: 'en_espera',
      statusLabel: 'En Sala de Espera',
      statusBadge: 'bg-amber-50 text-amber-700 border-amber-200',
      urgent: false,
    },
    {
      id: 'APT-102',
      petName: 'Rocky',
      petBreed: 'Bulldog Francés',
      ownerName: 'Mariana Duque',
      doctor: 'Dra. Valentina Ríos',
      time: '10:30 AM',
      type: 'Control Dermatológico',
      status: 'en_consulta',
      statusLabel: 'En Consulta',
      statusBadge: 'bg-teal-50 text-teal-700 border-teal-200',
      urgent: true,
      urgentReason: 'Alergia a Penicilina'
    },
    {
      id: 'APT-103',
      petName: 'Simba',
      petBreed: 'Gato Persa',
      ownerName: 'Felipe Jaramillo',
      doctor: 'Dr. Alejandro Restrepo',
      time: '02:00 PM',
      type: 'Esterilización Programada',
      status: 'programada',
      statusLabel: 'Quirófano 1',
      statusBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      urgent: false,
    },
    {
      id: 'APT-104',
      petName: 'Kira',
      petBreed: 'Pastor Alemán',
      ownerName: 'Elena Cardona',
      doctor: 'Camilo Osorio',
      time: '03:30 PM',
      type: 'Grooming & Profilaxis',
      status: 'programada',
      statusLabel: 'Agendada',
      statusBadge: 'bg-slate-100 text-slate-700 border-slate-200',
      urgent: false,
    }
  ];

  const criticalAlerts = [
    { id: 1, title: '3 Vacunas séxtuples próximas a vencer', subtitle: 'Pacientes: Luna, Max, Toby', type: 'warning' },
    { id: 2, title: 'Stock crítico de Amoxicilina Clavulánica (4 uds)', subtitle: 'Se requiere reabastecimiento en Farmacia', type: 'danger' },
    { id: 3, title: 'Paciente en observación posoperatoria (Jaula 02)', subtitle: 'Rocky · Signos vitales estables', type: 'info' }
  ];

  useEffect(() => {
    // Try fetching appointments and pets from backend if available
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('petOwnerToken');
        const resApt = await axios.get(`${BACKEND_URL}/api/appointments/my-appointments`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (resApt.data && resApt.data.length > 0) {
          setAppointments(resApt.data);
        } else {
          setAppointments(initialAppointments);
        }
      } catch (err) {
        setAppointments(initialAppointments);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStartConsultation = (apt) => {
    navigate('/vet/consultas', { state: { appointment: apt } });
  };

  return (
    <VertexAppShell breadcrumbs={['Dashboard General']}>
      <div className="space-y-6">
        {/* Welcome & Live Status Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>VERTEX Vet · Centro Médico Operativo Activo</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
                Panel de Control Clínico & Operativo
              </h1>
              <p className="text-slate-300 text-sm max-w-xl">
                Supervisión en tiempo real de citas, atención médica, hospitalización y flujo de caja diario.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/vet/agenda')}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-teal-900/40 flex items-center gap-2"
              >
                <Calendar size={16} />
                <span>Ver Agenda de Hoy</span>
              </button>
              <button
                onClick={() => navigate('/vet/pacientes')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
              >
                <PawPrint size={16} />
                <span>Directorio Pacientes</span>
              </button>
            </div>
          </div>
        </div>

        {/* Actionable Clinical KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Citas Hoy</span>
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Calendar size={18} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-800 font-display">12</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center">
                +3 vs ayer
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">4 en sala de espera</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Hospitalización</span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Activity size={18} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-800 font-display">3 / 8</span>
              <span className="text-xs font-semibold text-slate-500">Jaulas ocupadas</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">1 en estado de observación</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Cirugías Programadas</span>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Stethoscope size={18} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-800 font-display">2</span>
              <span className="text-xs font-semibold text-teal-600">Quirófano listo</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Próxima a las 02:00 PM</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Ingresos del Día</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign size={18} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-800 font-display">$840.000</span>
              <span className="text-xs font-semibold text-emerald-600">COP</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">6 transacciones liquidadas</p>
          </div>
        </div>

        {/* Clinical Alerts Strip */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <AlertTriangle size={18} className="text-amber-600" />
              <span>Alertas Clínicas & Notificaciones de Farmacia</span>
            </div>
            <span className="text-xs font-semibold text-amber-700 cursor-pointer hover:underline">
              Ver todas las alertas ({criticalAlerts.length})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {criticalAlerts.map((alert) => (
              <div key={alert.id} className="bg-white p-3 rounded-xl border border-amber-200/60 shadow-2xs text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <p className="font-bold text-slate-800 truncate">{alert.title}</p>
                </div>
                <p className="text-slate-500 pl-4">{alert.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Split: Appointments Table & Live Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Today's Appointments with Direct Clinical Actions */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800 font-display">Agenda Médica del Día</h3>
                <p className="text-xs text-slate-500">Pacientes programados y en atención</p>
              </div>
              <button
                onClick={() => navigate('/vet/agenda')}
                className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                <span>Ver calendario completo</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {appointments.map((apt) => (
                <div key={apt.id || apt._id} className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 font-black text-sm shrink-0">
                      <PawPrint size={20} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-800">{apt.petName || apt.userName}</span>
                        <span className="text-xs text-slate-400">· {apt.petBreed || 'Canino'}</span>
                        {apt.urgent && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold">
                            <ShieldAlert size={10} /> {apt.urgentReason}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        Propietario: <span className="font-semibold text-slate-700">{apt.ownerName || apt.userName}</span> · Médico: <span className="text-slate-700">{apt.doctor || 'Dr. Alejandro Restrepo'}</span>
                      </p>
                      <div className="flex items-center gap-2 pt-0.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                          <Clock size={12} className="text-slate-400" />
                          {apt.time || apt.appointmentTime || '10:00 AM'}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-teal-700 font-medium">{apt.type || apt.appointmentType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-semibold border ${apt.statusBadge || 'bg-teal-50 text-teal-700 border-teal-200'}`}>
                      {apt.statusLabel || 'Confirmada'}
                    </span>
                    <button
                      onClick={() => handleStartConsultation(apt)}
                      className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-2xs transition-all flex items-center gap-1"
                    >
                      <Stethoscope size={14} />
                      <span>Atender</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Hospitalization & Quick Patient Roster */}
          <div className="space-y-6">
            {/* Hospitalization Board */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="text-teal-600" size={18} />
                  <h4 className="text-sm font-bold text-slate-800 font-display">Monitoreo de Hospitalización</h4>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700">3 Activos</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { cage: 'JAULA 01', pet: 'Luna (Golden)', status: 'Estable · Recuperación', badge: 'bg-emerald-50 text-emerald-700' },
                  { cage: 'JAULA 02', pet: 'Max (Siamés)', status: 'Observación Posquirúrgica', badge: 'bg-amber-50 text-amber-700' },
                  { cage: 'JAULA 03', pet: 'Rocky (Bulldog)', status: 'Tratamiento Intravenoso', badge: 'bg-indigo-50 text-indigo-700' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">{item.cage}</span>
                      <p className="text-xs font-bold text-slate-800">{item.pet}</p>
                      <p className="text-[11px] text-slate-500">{item.status}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${item.badge}`}>
                      En jaula
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Shortcuts Banner */}
            <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-3xl p-5 shadow-lg space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-teal-200" />
                <h4 className="text-sm font-bold font-display">Suite Vertex AI Copilot</h4>
              </div>
              <p className="text-xs text-teal-100 leading-relaxed">
                Asistencia para estructuración de prescripciones y resumen cronológico de expedientes clínicos.
              </p>
              <button 
                onClick={() => navigate('/vet/consultas')}
                className="w-full py-2.5 px-4 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5"
              >
                <span>Explorar Módulo Clínico</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </VertexAppShell>
  );
};

export default VertexDashboard;
