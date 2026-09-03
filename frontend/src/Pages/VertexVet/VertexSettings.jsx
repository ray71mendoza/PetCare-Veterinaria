import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  ShieldCheck, 
  Bell, 
  Stethoscope, 
  CreditCard, 
  Database, 
  Save, 
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';
import VertexAppShell from '../../Component/VertexVetLayout/VertexAppShell';

export const VertexSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    clinicName: 'VERTEX Vet · Hospital & Centro Médico Veterinario',
    nit: '901.482.918-4',
    email: 'contacto@vertexvet.com',
    phone: '+57 (4) 448 9182',
    address: 'Carrera 43A # 1-50, El Poblado, Medellín, Colombia',
    consultationDuration: '30',
    allowOnlineBooking: true,
    sendSmsReminders: true,
    sendWhatsAppReminders: true,
    enableSoapAudit: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <VertexAppShell breadcrumbs={['Gestión & Análisis', 'Configuración General']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Centro de Configuración & Parámetros
            </h1>
            <p className="text-sm text-slate-500">
              Ajustes de sedes, políticas de seguridad clínica, notificaciones y reglas de agendamiento.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm flex items-center gap-2 self-start sm:self-auto transition-all"
          >
            <Save size={16} />
            <span>Guardar Ajustes</span>
          </button>
        </div>

        {saved && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>¡Configuración guardada y sincronizada correctamente en todos los módulos de Suite Vertex!</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'general', label: 'Datos de la Clínica', icon: Building2 },
            { id: 'branches', label: 'Sedes & Quirófanos', icon: Globe },
            { id: 'clinical', label: 'Parámetros Médicos', icon: Stethoscope },
            { id: 'security', label: 'Seguridad & Auditoría', icon: ShieldCheck },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  activeTab === t.id
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={16} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
          {activeTab === 'general' && (
            <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
              <h3 className="text-base font-bold text-slate-900 font-display">Identidad Corporativa de la Organización</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Comercial de la Clínica</label>
                  <input
                    type="text"
                    value={settings.clinicName}
                    onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">NIT / Identificación Fiscal</label>
                  <input
                    type="text"
                    value={settings.nit}
                    onChange={(e) => setSettings({ ...settings, nit: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Principal de Contacto</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono PBX / WhatsApp</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Dirección Sede Principal</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-teal-500 outline-none"
                />
              </div>
            </form>
          )}

          {activeTab === 'branches' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-base font-bold text-slate-900 font-display">Sedes Físicas Habilitadas</h3>
              <div className="space-y-3">
                {[
                  { name: 'Sede Principal (Medellín - El Poblado)', rooms: '4 Consultorios · 2 Quirófanos · 8 Jaulas Hospitalarias', status: 'Principal / Operativa' },
                  { name: 'Sede Norte (Bello)', rooms: '2 Consultorios · Farmacia · Estética Canina', status: 'Operativa' },
                  { name: 'Hospital de Urgencias 24 Horas', rooms: '3 Quirófanos · Unidad de Cuidados Intensivos (UCI)', status: 'Operativa 24/7' },
                ].map((b, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{b.name}</p>
                      <p className="text-xs text-slate-500">{b.rooms}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'clinical' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-base font-bold text-slate-900 font-display">Políticas de Atención y Citas</h3>
              <div className="space-y-3 text-xs text-slate-700">
                <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowOnlineBooking}
                    onChange={(e) => setSettings({ ...settings, allowOnlineBooking: e.target.checked })}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Permitir reservas y agendamiento en línea desde la app</p>
                    <p className="text-slate-500 text-[11px]">Los propietarios podrán solicitar citas según disponibilidad médica.</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.sendWhatsAppReminders}
                    onChange={(e) => setSettings({ ...settings, sendWhatsAppReminders: e.target.checked })}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Recordatorios automáticos de citas por WhatsApp & SMS</p>
                    <p className="text-slate-500 text-[11px]">Envío automático 24 horas y 2 horas antes de la cita programada.</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-base font-bold text-slate-900 font-display">Seguridad Clínica & Trazabilidad de Auditoría</h3>
              <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 text-xs space-y-2">
                <div className="flex items-center gap-2 text-teal-900 font-bold">
                  <ShieldCheck size={18} className="text-teal-600" />
                  <span>Módulo de Auditoría Activo (Registro Inmutable)</span>
                </div>
                <p className="text-teal-800 leading-relaxed">
                  Toda apertura, modificación, prescripción o cierre de historia clínica queda registrada con sello de tiempo, ID de profesional y dirección IP conforme a los estándares de historia clínica veterinaria.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </VertexAppShell>
  );
};

export default VertexSettings;
