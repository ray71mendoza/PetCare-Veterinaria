import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, PawPrint, User, Calendar, Stethoscope, X, ArrowRight } from 'lucide-react';

export const VertexGlobalSearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Mock search index integrating pets, owners, and clinical appointments
  const mockIndex = [
    { id: 'p1', title: 'Luna', subtitle: 'Golden Retriever · Propietario: Carlos Rodríguez', type: 'patient', path: '/vet/pacientes' },
    { id: 'p2', title: 'Max', subtitle: 'Gato Siamés · Propietaria: Laura Gómez', type: 'patient', path: '/vet/pacientes' },
    { id: 'p3', title: 'Rocky', subtitle: 'Bulldog Francés · Alergia a Penicilina', type: 'patient', path: '/vet/pacientes' },
    { id: 'u1', title: 'Carlos Rodríguez', subtitle: 'CC 102049281 · 2 Mascotas registradas', type: 'owner', path: '/vet/pacientes' },
    { id: 'u2', title: 'Laura Gómez', subtitle: 'CC 43902182 · Tel: 300 482 9182', type: 'owner', path: '/vet/pacientes' },
    { id: 'a1', title: 'Cirugía de Esterilización - Luna', subtitle: 'Hoy 14:30 · Dr. Juan Camilo (Quirófano 1)', type: 'appointment', path: '/vet/agenda' },
    { id: 'a2', title: 'Control Dermatológico - Rocky', subtitle: 'Mañana 10:00 · Dra. Valentina Ríos', type: 'appointment', path: '/vet/agenda' },
    { id: 'c1', title: 'Protocolo Vacunación Séxtuple Canina', subtitle: 'Guía Clínica & Catálogo Farmacológico', type: 'clinical', path: '/vet/consultas' },
  ];

  const filteredResults = searchTerm.trim() === ''
    ? mockIndex.slice(0, 5)
    : mockIndex.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'patient': return <PawPrint className="text-teal-500" size={18} />;
      case 'owner': return <User className="text-indigo-500" size={18} />;
      case 'appointment': return <Calendar className="text-amber-500" size={18} />;
      default: return <Stethoscope className="text-emerald-500" size={18} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por paciente, propietario, microchip, cita o medicamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="flex-1 text-slate-800 placeholder-slate-400 text-base outline-none bg-transparent"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results list */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-1">
          <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {searchTerm.trim() ? 'Resultados encontrados' : 'Acceso Rápido Reciente'}
          </p>

          {filteredResults.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              No se encontraron registros para "<span className="text-slate-600 font-medium">{searchTerm}</span>"
            </div>
          ) : (
            filteredResults.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.path)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500">{item.subtitle}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Presiona <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 shadow-2xs text-[10px] font-mono text-slate-600">ESC</kbd> para cerrar</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Índice Clínico Sincronizado
          </span>
        </div>
      </div>
    </div>
  );
};

export default VertexGlobalSearchModal;
