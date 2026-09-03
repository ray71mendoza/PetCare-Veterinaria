import React, { useState } from 'react';
import VertexSidebar from './VertexSidebar';
import VertexHeader from './VertexHeader';
import VertexNewAppointmentModal from '../../Pages/VertexVet/VertexNewAppointmentModal';
import VertexPatientNewModal from '../../Pages/VertexVet/VertexPatientNewModal';

export const VertexAppShell = ({ children, activeTitle = 'VERTEX Vet', breadcrumbs = [] }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newAppointmentOpen, setNewAppointmentOpen] = useState(false);
  const [newPatientOpen, setNewPatientOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Persistent Sidebar */}
      <VertexSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Top Header */}
        <VertexHeader
          onToggleMobileSidebar={() => setMobileOpen(!mobileOpen)}
          onOpenNewAppointment={() => setNewAppointmentOpen(true)}
          onOpenNewPatient={() => setNewPatientOpen(true)}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          {/* Breadcrumbs / Page Header Meta if provided */}
          {breadcrumbs.length > 0 && (
            <nav className="mb-4 flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>VERTEX Vet</span>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-slate-300">/</span>
                  <span className={idx === breadcrumbs.length - 1 ? 'text-slate-800 font-semibold' : ''}>
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          )}

          {children}
        </main>

        {/* Modals for Direct Quick Actions */}
        <VertexNewAppointmentModal 
          isOpen={newAppointmentOpen} 
          onClose={() => setNewAppointmentOpen(false)} 
        />
        <VertexPatientNewModal 
          isOpen={newPatientOpen} 
          onClose={() => setNewPatientOpen(false)} 
        />
      </div>
    </div>
  );
};

export default VertexAppShell;
