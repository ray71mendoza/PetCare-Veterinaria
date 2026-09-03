# Arquitectura de Navegación - VERTEX Vet

## 1. Estructura de Navegación del SaaS

La arquitectura de navegación está estructurada por dominios de negocio veterinario, permitiendo una experiencia ágil con atajos de teclado y búsqueda global:

```text
VERTEX Vet
│
├── 📊 INICIO
│   └── Dashboard General Clínico & Operativo
│
├── 📅 AGENDA
│   ├── Calendario de Citas (Día / Semana / Mes)
│   ├── Programación por Veterinario / Sala
│   └── Lista de Espera y Cancelaciones
│
├── 🐾 PACIENTES
│   ├── Directorio de Mascotas
│   ├── Ficha Clínica 360°
│   └── Base de Propietarios (CRM)
│
├── 🩺 ATENCIÓN MÉDICA
│   ├── Consultas Clínicas (SOAP)
│   ├── Historial de Vacunación
│   ├── Procedimientos & Cirugías
│   └── Hospitalización & Monitoreo
│
├── 💊 FARMACIA & INVENTARIO
│   ├── Catálogo de Medicamentos & Insumos
│   ├── Alertas de Lote y Vencimiento
│   └── Tienda / Pet Shop
│
├── 💳 FACTURACIÓN & CAJA
│   ├── Registro de Facturas y Cobros
│   └── Cuadre de Caja & Pagos
│
├── 📈 REPORTES
│   ├── Estadísticas Médicas y Diagnósticos
│   └── Rendimiento Operativo
│
└── ⚙️ CONFIGURACIÓN
    ├── Sedes & Consultorios
    └── Usuarios, Roles (RBAC) & Permisos
```

---

## 2. Puntos de Interacción Globales
* **Búsqueda Global Instantánea (`Ctrl + K` / `Cmd + K`)**: Permite localizar en milisegundos pacientes, citas, propietarios o medicamentos.
* **Barra de Acciones Rápidas (`+ Nueva Acción`)**: Despliega un menú flotante para registrar inmediatamente: Nueva Cita, Nuevo Paciente, Nueva Consulta, Nuevo Medicamento o Venta en Caja.
* **Selector de Sede**: Permite conmutar la clínica activa para organizaciones multi-sede.
