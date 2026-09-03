import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  PawPrint, 
  ArrowLeft, 
  ShieldAlert, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Activity, 
  Heart, 
  Thermometer, 
  Scale, 
  Clock, 
  Plus, 
  Stethoscope, 
  Pill, 
  FileText, 
  Printer, 
  CheckCircle2, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import VertexAppShell from '../../Component/VertexVetLayout/VertexAppShell';
import { BACKEND_URL } from '../../config';

export const VertexPatientProfile360 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('summary');
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [recordType, setRecordType] = useState('Medical');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [temp, setTemp] = useState('38.5');
  const [heartRate, setHeartRate] = useState('110');
  const [medPrescription, setMedPrescription] = useState('');

  // Initial patient fallback
  const passedPatient = location.state?.patient;
  const [patient, setPatient] = useState(passedPatient || {
    id: id || 'PET-1001',
    name: 'Luna',
    species: 'Canino',
    breed: 'Golden Retriever',
    gender: 'Hembra Esterilizada',
    birthYear: 2022,
    weight: '24.6 kg',
    microchip: '981098102938472',
    ownerName: 'Carlos Rodríguez',
    ownerPhone: '300 482 9182',
    ownerEmail: 'carlos.rodriguez@email.com',
    ownerAddress: 'Calle 10 # 43E-20, Medellín',
    criticalAllergy: 'Alergia a Penicilina & Derivados Beta-lactámicos',
    status: 'Estable',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
    assignedVet: 'Dr. Alejandro Restrepo (Cirugía & Medicina Interna)',
    medicalRecords: [
      {
        id: 'REC-01',
        date: '18/08/2026',
        type: 'Medical',
        vet: 'Dr. Alejandro Restrepo',
        title: 'Consulta General & Chequeo Preventivo',
        vitals: { temp: '38.4 °C', hr: '105 bpm', rr: '22 rpm', weight: '24.6 kg' },
        diagnosis: 'Dermatitis alérgica leve por contacto en zona ventral.',
        treatment: 'Baños medicados con clorhexidina 2% dos veces por semana.',
        prescription: 'Apoquel 16mg — 1 comp cada 24 horas por 10 días.',
      },
      {
        id: 'REC-02',
        date: '12/08/2026',
        type: 'vaccination',
        vet: 'Dra. Valentina Ríos',
        title: 'Refuerzo Vacunación Séxtuple Canina',
        vitals: { temp: '38.6 °C', hr: '112 bpm', rr: '24 rpm', weight: '24.5 kg' },
        diagnosis: 'Esquema de inmunización anual al día.',
        treatment: 'Vacuna Nobivac DHPPi + L4 aplicada por vía subcutánea.',
        prescription: 'Próximo refuerzo: Agosto 2027.',
      },
      {
        id: 'REC-03',
        date: '04/07/2026',
        type: 'Grooming',
        vet: 'Camilo Osorio',
        title: 'Grooming Higiénico & Profilaxis',
        vitals: { weight: '24.3 kg' },
        diagnosis: 'Limpieza de oídos, corte de uñas y vaciado de glándulas anales.',
        treatment: 'Sin novedades patológicas en conducto auditivo.',
        prescription: 'N/A',
      }
    ],
    vaccines: [
      { name: 'Rabia Canina', date: '12/08/2026', nextDue: '12/08/2027', lot: 'RAB-9921', status: 'Vigente' },
      { name: 'Séxtuple (DHPPi+L)', date: '12/08/2026', nextDue: '12/08/2027', lot: 'SEX-8812', status: 'Vigente' },
      { name: 'Tos de las Perreras (KC)', date: '15/02/2026', nextDue: '15/02/2027', lot: 'KC-7721', status: 'Vigente' },
      { name: 'Desparasitación Interna', date: '01/08/2026', nextDue: '01/11/2026', lot: 'DRON-101', status: 'Próxima' },
    ]
  });

  const handleAddConsultation = (e) => {
    e.preventDefault();
    const newRecord = {
      id: `REC-0${patient.medicalRecords.length + 1}`,
      date: new Date().toLocaleDateString('es-CO'),
      type: recordType,
      vet: 'Dr. Alejandro Restrepo',
      title: recordType === 'Medical' ? 'Consulta Médica Especializada' : 'Procedimiento Preventivo',
      vitals: { temp: `${temp} °C`, hr: `${heartRate} bpm`, rr: '24 rpm', weight: patient.weight },
      diagnosis: diagnosis || 'Revisión clínica satisfactoria.',
      treatment: treatment || 'Observación preventiva.',
      prescription: medPrescription || 'Sin prescripción farmacológica adicional.',
    };

    setPatient({
      ...patient,
      medicalRecords: [newRecord, ...patient.medicalRecords]
    });

    setShowAddRecordModal(false);
    setDiagnosis('');
    setTreatment('');
    setMedPrescription('');
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <VertexAppShell breadcrumbs={['Pacientes', patient.name, 'Ficha 360°']}>
      <div className="space-y-6">
        {/* Back and Quick Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/vet/pacientes')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Volver al Directorio</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrintSummary}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-all"
            >
              <Printer size={15} />
              <span>Imprimir Ficha PDF</span>
            </button>
            <button
              onClick={() => setShowAddRecordModal(true)}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Plus size={16} />
              <span>Nueva Consulta / Nota SOAP</span>
            </button>
          </div>
        </div>

        {/* 360 Clinical Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            {/* Left: Avatar & Vital Identity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={patient.image}
                alt={patient.name}
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-slate-100 shadow-md"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
                    {patient.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                    {patient.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 font-medium">
                  {patient.species} · {patient.breed} · {patient.gender}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="font-mono bg-slate-100 px-2 py-0.5 rounded-md font-semibold text-slate-700">
                    Chip: {patient.microchip}
                  </span>
                  <span>·</span>
                  <span className="font-bold text-teal-700">Peso: {patient.weight}</span>
                  <span>·</span>
                  <span>Edad: {new Date().getFullYear() - patient.birthYear} años</span>
                </div>
              </div>
            </div>

            {/* Right: Owner CRM Summary */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 w-full lg:w-96 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Propietario Responsable</span>
                <span className="text-[11px] font-semibold text-teal-700">Cliente Verificado</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <User size={14} className="text-slate-400" />
                  {patient.ownerName}
                </p>
                <p className="text-slate-600 flex items-center gap-1.5">
                  <Phone size={13} className="text-slate-400" />
                  {patient.ownerPhone}
                </p>
                <p className="text-slate-500 flex items-center gap-1.5">
                  <Mail size={13} className="text-slate-400" />
                  {patient.ownerEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Critical Allergy Warning Banner */}
          {patient.criticalAllergy && (
            <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200/90 text-rose-900 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <ShieldAlert size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-rose-700">Alerta Clínica Crítica</p>
                <p className="text-sm font-semibold text-rose-900">{patient.criticalAllergy}</p>
              </div>
            </div>
          )}

          {/* Sub-Navigation Tabs */}
          <div className="mt-8 border-t border-slate-100 pt-4 flex items-center gap-2 overflow-x-auto">
            {[
              { id: 'summary', label: 'Resumen Clínico 360°', icon: Activity },
              { id: 'timeline', label: `Historia Médica (${patient.medicalRecords.length})`, icon: Clock },
              { id: 'vaccines', label: `Vacunación & Preventiva (${patient.vaccines.length})`, icon: Pill },
              { id: 'prescriptions', label: 'Prescripciones & Recetas', icon: Stethoscope },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Summary */}
        {activeTab === 'summary' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Left 2 Cols: Vitals & History Highlights */}
            <div className="lg:col-span-2 space-y-6">
              {/* Latest Vital Signs Grid */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs">
                <h3 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Activity size={16} className="text-teal-600" />
                  Últimas Constantes Fisiológicas Registradas (18/08/2026)
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100">
                    <div className="flex items-center justify-between text-teal-700 mb-1">
                      <span className="text-[11px] font-bold">Temperatura</span>
                      <Thermometer size={16} />
                    </div>
                    <span className="text-xl font-extrabold text-teal-900 font-display">38.4 °C</span>
                    <p className="text-[10px] text-teal-600 mt-0.5">Rango normal</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
                    <div className="flex items-center justify-between text-rose-700 mb-1">
                      <span className="text-[11px] font-bold">Frec. Cardíaca</span>
                      <Heart size={16} />
                    </div>
                    <span className="text-xl font-extrabold text-rose-900 font-display">105 bpm</span>
                    <p className="text-[10px] text-rose-600 mt-0.5">Rítmico</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                    <div className="flex items-center justify-between text-indigo-700 mb-1">
                      <span className="text-[11px] font-bold">Frec. Resp.</span>
                      <Activity size={16} />
                    </div>
                    <span className="text-xl font-extrabold text-indigo-900 font-display">22 rpm</span>
                    <p className="text-[10px] text-indigo-600 mt-0.5">Eupneico</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
                    <div className="flex items-center justify-between text-amber-700 mb-1">
                      <span className="text-[11px] font-bold">Peso Corporal</span>
                      <Scale size={16} />
                    </div>
                    <span className="text-xl font-extrabold text-amber-900 font-display">24.6 kg</span>
                    <p className="text-[10px] text-amber-600 mt-0.5">Condición 3/5</p>
                  </div>
                </div>
              </div>

              {/* Recent Consultations Preview */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider">
                    Evolución Clínica Reciente
                  </h3>
                  <button 
                    onClick={() => setActiveTab('timeline')}
                    className="text-xs font-semibold text-teal-600 hover:underline"
                  >
                    Ver historial completo
                  </button>
                </div>

                <div className="space-y-3">
                  {patient.medicalRecords.slice(0, 2).map((rec) => (
                    <div key={rec.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-teal-800">{rec.title}</span>
                        <span className="text-[11px] text-slate-400 font-medium">{rec.date}</span>
                      </div>
                      <p className="text-xs text-slate-700"><span className="font-semibold text-slate-900">Diagnóstico:</span> {rec.diagnosis}</p>
                      <p className="text-xs text-slate-600"><span className="font-semibold text-slate-800">Tratamiento:</span> {rec.treatment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Preventive Care & Assigned Vet */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider">
                  Médico Tratante Principal
                </h3>
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-teal-50/50 border border-teal-100">
                  <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                    AR
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Dr. Alejandro Restrepo</p>
                    <p className="text-[11px] text-teal-700">M.V. U. de Antioquia · Cirugía</p>
                  </div>
                </div>
              </div>

              {/* Vaccines Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider">
                    Plan de Vacunación
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                    Esquema Al Día
                  </span>
                </div>

                <div className="space-y-2">
                  {patient.vaccines.map((v, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-800">{v.name}</p>
                        <p className="text-[11px] text-slate-500">Próxima: {v.nextDue}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                        v.status === 'Vigente' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {v.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Timeline */}
        {activeTab === 'timeline' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs animate-fade-in space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 font-display">Línea de Tiempo Médica & Evolución Clínica</h3>
                <p className="text-xs text-slate-500">Historial cronológico completo de atenciones e intervenciones</p>
              </div>
              <button
                onClick={() => setShowAddRecordModal(true)}
                className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
              >
                <Plus size={15} />
                <span>Añadir Registro</span>
              </button>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-teal-200">
              {patient.medicalRecords.map((rec, idx) => (
                <div key={rec.id || idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-teal-600 flex items-center justify-center shadow-xs">
                    <div className="w-2 h-2 rounded-full bg-teal-600" />
                  </div>

                  {/* Record Box */}
                  <div className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-2xs transition-all space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{rec.title}</span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-100 text-teal-800 uppercase font-mono">
                          {rec.type}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">{rec.date} · {rec.vet}</span>
                    </div>

                    {rec.vitals && (
                      <div className="flex flex-wrap gap-3 text-xs">
                        {rec.vitals.temp && <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700">🌡️ Temp: <strong>{rec.vitals.temp}</strong></span>}
                        {rec.vitals.hr && <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700">❤️ FC: <strong>{rec.vitals.hr}</strong></span>}
                        {rec.vitals.weight && <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700">⚖️ Peso: <strong>{rec.vitals.weight}</strong></span>}
                      </div>
                    )}

                    <div className="text-xs space-y-1.5">
                      <p className="text-slate-800"><strong className="text-slate-900">Diagnóstico:</strong> {rec.diagnosis}</p>
                      <p className="text-slate-700"><strong className="text-slate-900">Tratamiento / Procedimiento:</strong> {rec.treatment}</p>
                      {rec.prescription && rec.prescription !== 'N/A' && (
                        <p className="text-teal-900 bg-teal-50/60 p-2.5 rounded-xl border border-teal-100">
                          <strong className="text-teal-950">Prescripción Farmacológica:</strong> {rec.prescription}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Vaccines */}
        {activeTab === 'vaccines' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs animate-fade-in space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 font-display">Plan de Vacunación e Inmunización</h3>
                <p className="text-xs text-slate-500">Registro oficial de biológicos aplicados y próximos refuerzos</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="pb-3">Biológico / Vacuna</th>
                    <th className="pb-3">Fecha Aplicación</th>
                    <th className="pb-3">Lote Fabricante</th>
                    <th className="pb-3">Próximo Refuerzo</th>
                    <th className="pb-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {patient.vaccines.map((v, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-3.5 font-bold text-slate-800">{v.name}</td>
                      <td className="py-3.5 text-slate-600">{v.date}</td>
                      <td className="py-3.5 font-mono text-slate-500">{v.lot}</td>
                      <td className="py-3.5 text-teal-700 font-bold">{v.nextDue}</td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Prescriptions */}
        {activeTab === 'prescriptions' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs animate-fade-in space-y-6">
            <h3 className="text-base font-bold text-slate-800 font-display">Historial de Fórmulas y Prescripciones Médicas</h3>
            <div className="space-y-3">
              {patient.medicalRecords.filter(r => r.prescription && r.prescription !== 'N/A').map((r, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 flex items-start justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <p className="font-bold text-teal-950 text-sm">{r.prescription}</p>
                    <p className="text-teal-800">Indicado por: <span className="font-semibold">{r.vet}</span> el {r.date}</p>
                    <p className="text-slate-500 text-[11px]">Asociado a: {r.diagnosis}</p>
                  </div>
                  <button 
                    onClick={handlePrintSummary}
                    className="px-3 py-1.5 bg-white border border-teal-200 text-teal-700 rounded-xl font-semibold shadow-2xs hover:bg-teal-50"
                  >
                    Imprimir Receta
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Nueva Consulta / Nota SOAP */}
      {showAddRecordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Stethoscope className="text-teal-600" size={18} />
                <h3 className="text-base font-bold text-slate-800 font-display">Registrar Atención Médica (SOAP)</h3>
              </div>
              <button 
                onClick={() => setShowAddRecordModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddConsultation} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Temperatura (°C)</label>
                  <input
                    type="text"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Frecuencia Cardíaca (bpm)</label>
                  <input
                    type="text"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Diagnóstico Clínico (SOAP) *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Describa el diagnóstico principal..."
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-teal-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tratamiento & Procedimientos Realizados</label>
                <textarea
                  rows={2}
                  placeholder="Medicamentos administrados en consulta, curaciones..."
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-teal-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fórmula Farmacológica / Receta Domiciliaria</label>
                <textarea
                  rows={2}
                  placeholder="Medicamento, concentración, dosis, frecuencia y duración..."
                  value={medPrescription}
                  onChange={(e) => setMedPrescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-teal-500 outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddRecordModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs"
                >
                  Guardar en Historia Clínica
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </VertexAppShell>
  );
};

export default VertexPatientProfile360;
