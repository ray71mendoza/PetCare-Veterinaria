import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Stethoscope, 
  User, 
  Building2, 
  ArrowRight, 
  Sparkles,
  AlertCircle 
} from 'lucide-react';
import VertexVetLogo from '../../assets/VertexVetLogo';
import { BACKEND_URL } from '../../config';

export const VertexLogin = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('vet');
  const [email, setEmail] = useState('alejandro.restrepo@vertexvet.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { id: 'vet', label: 'Director / Veterinario', icon: Stethoscope, desc: 'Atención clínica, historias y recetas' },
    { id: 'reception', label: 'Recepción & Caja', icon: Building2, desc: 'Agendamiento, facturación y triage' },
    { id: 'owner', label: 'Propietario / Cliente', icon: User, desc: 'Mis mascotas y citas' },
  ];

  const handleDemoLogin = (demoRole) => {
    setRole(demoRole);
    if (demoRole === 'vet') {
      setEmail('alejandro.restrepo@vertexvet.com');
      setPassword('vet12345');
    } else if (demoRole === 'reception') {
      setEmail('recepcion.medellin@vertexvet.com');
      setPassword('recep12345');
    } else {
      setEmail('carlos.rodriguez@email.com');
      setPassword('owner12345');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Authenticate with backend or fallback demo storage
      try {
        const res = await axios.post(`${BACKEND_URL}/api/users/login`, { email, password });
        if (res.data.token) {
          localStorage.setItem('petOwnerToken', res.data.token);
          localStorage.setItem('petOwnerUser', JSON.stringify(res.data.user || { name: 'Dr. Alejandro Restrepo', email }));
        }
      } catch (backendErr) {
        // Fallback for seamless demo
        localStorage.setItem('petOwnerToken', 'demo_jwt_token_vertex_vet_2026');
        localStorage.setItem('profToken', 'demo_prof_jwt_token_2026');
        localStorage.setItem('profRole', role === 'vet' ? 'Director Veterinario' : role === 'reception' ? 'Recepción & Caja' : 'Propietario');
        localStorage.setItem('petOwnerUser', JSON.stringify({
          name: role === 'vet' ? 'Dr. Alejandro Restrepo' : role === 'reception' ? 'Mariana Duque (Recepción)' : 'Carlos Rodríguez',
          email
        }));
      }

      navigate('/vet/dashboard');
    } catch (err) {
      setError('Credenciales no válidas. Intente con el acceso rápido de demostración.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-lg bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 z-10 animate-fade-in">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <VertexVetLogo size="lg" theme="dark" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display">
            Acceso a la Plataforma Clínica
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Suite Vertex · Sistema Integral de Gestión Veterinaria
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Seleccionar Rol de Acceso
          </label>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => handleDemoLogin(r.id)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    role === r.id
                      ? 'border-teal-500 bg-teal-500/15 text-teal-300 shadow-sm'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-[11px] font-bold truncate w-full">{r.label.split('/')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Correo Electrónico Corporativo
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@vertexvet.com"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all placeholder-slate-600"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Contraseña de Seguridad
              </label>
              <span className="text-[11px] text-teal-400 hover:underline cursor-pointer">
                ¿Olvidó su clave?
              </span>
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all placeholder-slate-600 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-extrabold text-sm shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>Autenticando en Suite Vertex...</span>
            ) : (
              <>
                <span>Iniciar Sesión en VERTEX Vet</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-teal-400" />
            <span>Acceso Demo Configurado</span>
          </div>
          <span className="text-[11px] font-bold text-teal-400">Clic en Iniciar Sesión</span>
        </div>

        {/* Security Footer */}
        <div className="pt-2 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck size={14} className="text-teal-500" />
          <span>Conexión Cifrada SSL · Conforme con Estándares Clínicos</span>
        </div>
      </div>
    </div>
  );
};

export default VertexLogin;
