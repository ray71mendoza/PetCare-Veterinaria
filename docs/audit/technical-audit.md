# Auditoría Técnica - VERTEX Vet (Legacy System Assessment)

## 1. Resumen Ejecutivo
El sistema analizado corresponde a una plataforma web de gestión veterinaria y cuidado de mascotas construida con arquitectura desacoplada (MERN stack). Presenta una base funcional con cobertura de casos de uso (mascotas, citas, tienda de productos, adopciones y eventos), pero con dispersión arquitectónica en la capa frontend (dos aplicaciones Vite independientes) y modelos de autenticación desarticulados.

---

## 2. Inventario y Stack Tecnológico

### Backend API
* **Runtime**: Node.js v20+ / Express 4.21.2 (ES Modules)
* **Persistencia**: MongoDB Atlas con Mongoose 8.13.3
* **Seguridad / Criptografía**: `bcrypt` / `bcryptjs`, `jsonwebtoken` (JWT), `express-rate-limit`
* **Almacenamiento de Archivos**: Cloudinary con `multer-storage-cloudinary`
* **Pasarela de Pagos**: Stripe API SDK v18.0.0
* **Mensajería**: Nodemailer v6.10.1

### Frontend Principal (`frontend/`)
* **Framework**: React 19.0.0 con Vite 6.3.3
* **Estilizado**: Tailwind CSS v4.0.17
* **Enrutamiento**: React Router DOM v7.4.0
* **Animaciones e Iconografía**: Framer Motion 12.10.5, Lucide React 0.484.0, React Icons 5.5.0
* **Visualización & PDF**: Chart.js 4.4.9, jsPDF 3.0.1, jsPDF-AutoTable 5.0.2

### Interfaz del Veterinario (`docterInterface/`)
* Proyecto React Vite independiente para la gestión de historial médico y consultas, requiriendo unificación en la suite principal.

---

## 3. Diagnóstico por Módulo

| Módulo | Componentes Clave | Estado | Hallazgo Técnico | Acción |
| :--- | :--- | :--- | :--- | :--- |
| **Mascotas** | `Pet.js`, `petRoutes.js`, `PetRegister.jsx` | Funcional | Historial médico embebido en array; carece de categorización SOAP y alertas de alergias visibles. | `MEJORAR` & `REDISEÑAR` |
| **Citas & Agenda** | `Appointment.js`, `appointmentRoutes.js` | Funcional | Validación de colisiones de horario por profesional y estados de cita (`scheduled`, `completed`, `cancelled`). | `MEJORAR` & `REDISEÑAR` |
| **Clínica Veterinaria** | `PetDetailsPage.jsx` (`docterInterface`) | Funcional pero aislado | Reportes médicos y recetas operan en una app Vite separada. | `REFACTORIZAR` & `UNIFICAR` |
| **Tienda / Farmacia** | `productModel.js`, `orderModel.js`, `cartRoute.js` | Funcional | Soporta catálogo, carrito y pagos vía Stripe. | `CONSERVAR` & `MEJORAR` |
| **Adopciones & Eventos** | `AdoptablePet.js`, `Event.js`, `Registration.js` | Funcional | Flujo de registro y generación de tickets en PDF. | `CONSERVAR` |

---

## 4. Deuda Técnica y Recomendaciones de Modernización
1. **Unificación de Shell**: Integrar todos los flujos bajo el App Shell de VERTEX Vet con navegación por roles (RBAC).
2. **Estructuración SOAP en Historias Clínicas**: Estandarizar anamnesis, constantes fisiológicas, diagnóstico y prescripción.
3. **Consolidación de Tokens Visuales**: Implementar variables CSS centralizadas (`--vet-*`) para garantizar consistencia visual y soporte responsive WCAG 2.2 AA.
