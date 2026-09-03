import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  PawPrint, 
  Search, 
  Plus, 
  Filter, 
  User, 
  Phone, 
  Calendar, 
  ShieldAlert, 
  ChevronRight, 
  Activity,
  Sparkles,
  FileText
} from 'lucide-react';
import VertexAppShell from '../../Component/VertexVetLayout/VertexAppShell';
import VertexPatientNewModal from './VertexPatientNewModal';
import { BACKEND_URL } from '../../config';

export const VertexPatientsDirectory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('all');
  const [newPatientOpen, setNewPatientOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  const mockPatients = [
    {
      id: 'PET-1001',
      name: 'Luna',
      species: 'Canino',
      breed: 'Golden Retriever',
      gender: 'Hembra',
      birthYear: 2022,
      weight: '24.6 kg',
      microchip: '981098102938472',
      ownerName: 'Carlos Rodríguez',
      ownerPhone: '300 482 9182',
      lastVisit: '18/08/2026',
      criticalAllergy: 'Alergia a Penicilina',
      status: 'Activo',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80',
      activeTreatments: 1,
    },
    {
      id: 'PET-1002',
      name: 'Max',
      species: 'Felino',
      breed: 'Siamés Clásico',
      gender: 'Macho',
      birthYear: 2021,
      weight: '4.2 kg',
      microchip: '981098102938473',
      ownerName: 'Laura Gómez',
      ownerPhone: '312 901 8273',
      lastVisit: '10/08/2026',
      criticalAllergy: null,
      status: 'En Observación',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80',
      activeTreatments: 2,
    },
    {
      id: 'PET-1003',
      name: 'Rocky',
      species: 'Canino',
      breed: 'Bulldog Francés',
      gender: 'Macho',
      birthYear: 2023,
      weight: '11.8 kg',
      microchip: '981098102938474',
      ownerName: 'Mariana Duque',
      ownerPhone: '315 782 1928',
      lastVisit: '04/08/2026',
      criticalAllergy: 'Intolerancia a Ketamina',
      status: 'Hospitalizado',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=300&q=80',
      activeTreatments: 1,
    },
    {
      id: 'PET-1004',
      name: 'Simba',
      species: 'Felino',
      breed: 'Persa Blanco',
      gender: 'Macho',
      birthYear: 2020,
      weight: '5.1 kg',
      microchip: '981098102938475',
      ownerName: 'Felipe Jaramillo',
      ownerPhone: '320 849 2019',
      lastVisit: '15/07/2026',
      criticalAllergy: null,
      status: 'Activo',
      image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=300&q=80',
      activeTreatments: 0,
    },
    {
      id: 'PET-1005',
      name: 'Kira',
      species: 'Canino',
      breed: 'Pastor Alemán',
      gender: 'Hembra',
      birthYear: 2019,
      weight: '29.3 kg',
      microchip: '981098102938476',
      ownerName: 'Elena Cardona',
      ownerPhone: '310 982 3451',
      lastVisit: '02/08/2026',
      criticalAllergy: null,
      status: 'Activo',
      image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=300&q=80',
      activeTreatments: 0,
    }
  ];

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('petOwnerToken');
      const res = await axios.get(`${BACKEND_URL}/api/pets/my-pets`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.data && res.data.length > 0) {
        // Map backend pets
        const mapped = res.data.map((p, idx) => ({
          id: p.petId || `PET-${1000 + idx}`,
          name: p.name,
          species: p.species || 'Canino',
          breed: p.breed,
          gender: p.gender,
          birthYear: p.petBYear,
          weight: p.weight || '15.0 kg',
          microchip: p.microchip || `981098102938${idx}`,
          ownerName: p.ownerName || 'Carlos Rodríguez',
          ownerPhone: p.ownerPhone || '300 123 4567',
          lastVisit: '18/08/2026',
          criticalAllergy: p.specialNotes?.includes('Alergia') ? p.specialNotes : null,
          status: 'Activo',
          image: p.petimage || mockPatients[0].image,
          activeTreatments: p.medicalRecords?.length || 1,
          raw: p
        }));
        setPatients(mapped);
      } else {
        setPatients(mockPatients);
      }
    } catch (err) {
      setPatients(mockPatients);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.microchip.includes(searchTerm);

    const matchesSpecies = speciesFilter === 'all' || p.species.toLowerCase() === speciesFilter.toLowerCase();

    return matchesSearch && matchesSpecies;
  });

  const getAge = (year) => {
    const age = new Date().getFullYear() - year;
    return `${age} ${age === 1 ? 'año' : 'años'}`;
  };

  const handleOpenProfile = (patient) => {
    navigate(`/vet/pacientes/${patient.id}`, { state: { patient } });
  };

  return (
    <VertexAppShell breadcrumbs={['Pacientes & Mascotas', 'Directorio']}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Directorio Clínico de Pacientes
            </h1>
            <p className="text-sm text-slate-500">
              Fichas médicas 360°, trazabilidad de propietarios y antecedentes veterinarios.
            </p>
          </div>

          <button
            onClick={() => setNewPatientOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm flex items-center gap-2 self-start sm:self-auto transition-all"
          >
            <Plus size={18} />
            <span>Registrar Nuevo Paciente</span>
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, microchip, raza o dueño..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:border-teal-500 focus:bg-white outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Filter size={16} className="text-slate-400 shrink-0 hidden sm:block" />
            {[
              { id: 'all', label: 'Todos' },
              { id: 'Canino', label: 'Perros 🐕' },
              { id: 'Felino', label: 'Gatos 🐈' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSpeciesFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  speciesFilter === f.id
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => handleOpenProfile(patient)}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xl hover:border-teal-500/60 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Chip */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    {patient.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    patient.status === 'Hospitalizado'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : patient.status === 'En Observación'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {patient.status}
                  </span>
                </div>

                {/* Patient Avatar & Basic Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={patient.image}
                    alt={patient.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-teal-500/40 transition-all shadow-xs"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 font-display transition-colors">
                      {patient.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {patient.breed} · {patient.gender}
                    </p>
                    <p className="text-xs text-teal-700 font-semibold mt-0.5">
                      {getAge(patient.birthYear)} · {patient.weight}
                    </p>
                  </div>
                </div>

                {/* Critical Alert Pill if any */}
                {patient.criticalAllergy && (
                  <div className="mt-3.5 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                    <ShieldAlert size={14} className="text-rose-600 shrink-0" />
                    <span className="truncate">{patient.criticalAllergy}</span>
                  </div>
                )}

                {/* Owner & Meta Information */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-700 font-medium">
                      <User size={13} className="text-slate-400" />
                      {patient.ownerName}
                    </span>
                    <span className="text-[11px] text-slate-400">{patient.ownerPhone}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Última consulta:</span>
                    <span className="font-semibold text-slate-600">{patient.lastVisit}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-600 group-hover:text-teal-700">
                <span className="flex items-center gap-1">
                  <FileText size={14} />
                  <span>Ver Ficha Clínica 360°</span>
                </span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <VertexPatientNewModal
        isOpen={newPatientOpen}
        onClose={() => setNewPatientOpen(false)}
        onCreated={fetchPatients}
      />
    </VertexAppShell>
  );
};

export default VertexPatientsDirectory;
