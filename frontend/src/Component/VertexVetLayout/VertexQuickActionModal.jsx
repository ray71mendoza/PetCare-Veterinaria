import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarPlus, 
  PawPrint, 
  Stethoscope, 
  Pill, 
  FileSpreadsheet, 
  UserPlus, 
  X,
  Sparkles
} from 'lucide-react';

export const VertexQuickActionModal = ({ isOpen, onClose, onOpenNewAppointment, onOpenNewPatient }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const actions = [
    {
      title: 'Nueva Cita Médica',
      description: 'Programar consulta general, cirugía o vacunación',
      icon: CalendarPlus,
      color: 'bg-teal-500/10 text-teal-600 border-teal-200',
      action: () => {
        onClose();
        if (onOpenNewAppointment) onOpenNewAppointment();
        else navigate('/vet/agenda');
      },
    },
    {
      title: 'Registrar Mascota',
      description: 'Crear nueva ficha de paciente y asociar propietario',
      icon: PawPrint,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
      action: () => {
        onClose();
        if (onOpenNewPatient) onOpenNewPatient();
        else navigate('/vet/pacientes');
      },
    },
    {
      title: 'Iniciar Consulta SOAP',
      description: 'Aperturar atención médica y registro de constantes',
      icon: Stethoscope,
      color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
      action: () => {
        onClose();
        navigate('/vet/consultas');
      },
    },
    {
      title: 'Dispensar Medicamento',
      description: 'Salida de farmacia y control de recetas',
      icon: Pill,
      color: 'bg-amber-500/10 text-amber-600 border-amber-200',
      action: () => {
        onClose();
        navigate('/vet/farmacia');
      },
    },
    {
      title: 'Nuevo Propietario / Cliente',
      description: 'Dar de alta cliente en el CRM veterinario',
      icon: UserPlus,
      color: 'bg-sky-500/10 text-sky-600 border-sky-200',
      action: () => {
        onClose();
        navigate('/vet/pacientes');
      },
    },
    {
      title: 'Emitir Factura / Cobro',
      description: 'Registrar pago de servicios, tienda o consulta',
      icon: FileSpreadsheet,
      color: 'bg-violet-500/10 text-violet-600 border-violet-200',
      action: () => {
        onClose();
        navigate('/vet/facturacion');
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 font-display">Acciones Rápidas</h3>
              <p className="text-xs text-slate-500">Operaciones clínicas y comerciales inmediatas</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Action Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[70vh] overflow-y-auto">
          {actions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="flex items-start gap-3.5 p-4 rounded-2xl border border-slate-200/80 hover:border-teal-500 hover:bg-teal-50/30 text-left transition-all group shadow-2xs hover:shadow-md"
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${item.color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VertexQuickActionModal;
