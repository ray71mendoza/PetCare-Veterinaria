# Auditoría UX/UI - VERTEX Vet

## 1. Evaluación de Usabilidad y Experiencia Actual

### Hallazgos Principales
* **Jerarquía Visual Débil**: Las pantallas anteriores presentan contrastes desiguales, tipografías no estandarizadas y ausencia de un sistema de espaciado coherente.
* **Falta de Accionabilidad en Dashboards**: Las pantallas de inicio funcionaban principalmente como listas tabulares o banners promocionales en lugar de paneles de control clínico en tiempo real.
* **Carga Cognitiva en la Ficha de Mascota**: La información médica, vacunas, datos del propietario y antecedentes se presentaban dispersos o en formularios planos sin pestañas de contexto ni línea de tiempo clínica.
* **Flujos de Creación Extensos**: Agendar una cita o ingresar un paciente requería múltiples pantallas sin atajos globales.

---

## 2. Matriz Heurística (Nielsen Norman Group)

| Heurística | Estado Actual | Corrección en VERTEX Vet |
| :--- | :--- | :--- |
| **Visibilidad del Estado del Sistema** | Baja; mensajes de éxito/error no uniformes. | Toasts centralizados, indicadores de estado semánticos (chips de color y texto) y badges de carga. |
| **Relación con el Mundo Real** | Interfaz orientada a base de datos (CRUD simple). | Flujo clínico estructurado (Historia Clínica SOAP, Ficha 360°, Constantes Vitales). |
| **Control y Libertad del Usuario** | Difícil navegación de regreso entre fichas. | Breadcrumbs activos, modales no bloqueantes con escape y panel de búsqueda global (`Ctrl+K`). |
| **Consistencia y Estándares** | Diseños dispares entre módulo de clientes y doctores. | Sistema de componentes y tokens de diseño unificados en toda la Suite Vertex. |
| **Prevención y Recuperación de Errores** | Validaciones al enviar formulario completo. | Validación en tiempo real campo a campo con mensajes de ayuda y estados de foco visibles. |
| **Eficiencia y Flexibilidad de Uso** | Pasos repetitivos para tareas comunes. | Botón de Acción Rápida (`+ Nueva Acción`) y atajos de teclado para búsqueda y creación. |

---

## 3. Principios de la Nueva Experiencia VERTEX Vet
1. **Claridad Clínica**: La información vital de la mascota (alergias, condición, última consulta) siempre visible en cabecera.
2. **Eficiencia Operativa**: Reducción de clics para recepción de pacientes y asignación de citas.
3. **Estética Empresarial SaaS**: Paleta equilibrada, modo oscuro preparado y tipografía de alta legibilidad.
