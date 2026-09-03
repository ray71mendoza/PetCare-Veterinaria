<div align="center">

<!-- HEADER BANNER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=180&section=header&text=PetCare%20Veterinaria&fontSize=36&desc=Sistema%20Integral%20de%20Gesti%C3%B3n%20Veterinaria%2C%20Consultas%20y%20Marketplace&descSize=16" alt="PetCare Header Banner" width="100%" />

<!-- BADGES -->
[![Status](https://img.shields.io/badge/STATUS-ACTIVE%20%26%20MAINTAINED-brightgreen?style=for-the-badge&logo=git&logoColor=white)](https://github.com/ray71mendoza/PetCare-Veterinaria)
[![Version](https://img.shields.io/badge/VERSION-1.0.0-blue?style=for-the-badge&logo=semver&logoColor=white)](https://github.com/ray71mendoza/PetCare-Veterinaria)
[![License](https://img.shields.io/badge/LICENSE-MIT-yellow?style=for-the-badge&logo=open-source-initiative&logoColor=white)](LICENSE)
[![React](https://img.shields.io/badge/REACT-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![NodeJS](https://img.shields.io/badge/NODE.JS-EXPRESS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MONGODB-DATABASE-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/STRIPE-PAYMENTS-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

<br/>

<p align="center">
  <b>PetCare Veterinaria</b> es una plataforma full-stack de grado empresarial diseñada para modernizar y optimizar la gestión de centros clínicos veterinarios, spas de mascotas y tiendas especializadas. Integra en un solo ecosistema el historial clínico 360°, agenda médica interactiva, teleconsultas, pasarela de pagos, inventario y marketplace digital.
</p>

---

### 🚀 Stack Tecnológico

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,vite,nodejs,express,mongodb,tailwind,javascript,postman,git,github" alt="Skill Icons" />
  </a>
</p>

</div>

---

## 🌟 Características y Módulos del Sistema

| Módulo / Funcionalidad | Descripción Detallada | Estado |
| :--- | :--- | :---: |
| 🩺 **VertexVet - Portal Clínico** | Suite integral para profesionales veterinarios con agenda médica, gestión de consultas en tiempo real y módulo de farmacia con control de inventario y recetas. | ✅ |
| 🐾 **Gestión de Pacientes (Perfil 360°)** | Registro biométrico y médico de mascotas: vacunas, historial clínico, alergias, citas previas, cirugías y reportes diagnósticos exportables. | ✅ |
| 📅 **Agenda y Citas Multiprofesional** | Sistema inteligente de reservaciones para veterinarios, entrenadores y estilistas (groomers), con validación de horarios, estados de consulta y recordatorios. | ✅ |
| 🛒 **E-Commerce & Marketplace** | Tienda digital para productos veterinarios, alimentos, accesorios y medicamentos, con carrito dinámico, cálculo de stock y seguimiento de pedidos. | ✅ |
| 💳 **Pasarela de Pagos Stripe** | Procesamiento transaccional seguro para agendamiento de citas y compras en tienda con soporte para reembolsos y verificación bancaria. | ✅ |
| 🐕 **Red de Rescate & Adopciones** | Módulo comunitario para publicación y búsqueda de mascotas extraviadas (Lost & Found), adopciones responsables y registro de eventos caninos. | ✅ |
| 📄 **Reportes y Facturación Digital** | Generación automatizada de reportes clínicos, facturas y recetas en formatos PDF de alta resolución (jsPDF) y exportación de datos a Excel (XLSX). | ✅ |
| 🛡️ **Seguridad y Control de Acceso (RBAC)** | Autenticación robusta basada en JSON Web Tokens (JWT) y roles diferenciados: Propietario de Mascota, Profesional de la Salud, Staff y Super Administrador. | ✅ |

---

## 🏗️ Arquitectura y Estructura del Proyecto

```text
PetCare-Veterinaria/
├── backend/                  # Servidor REST API (Node.js, Express, MongoDB)
│   ├── config/               # Configuraciones (MongoDB, Cloudinary, Mailer)
│   ├── controllers/          # Lógica de negocio (Citas, Pagos, Usuarios, Tienda)
│   ├── middleware/           # Autenticación JWT, validaciones y RBAC
│   ├── models/               # Esquemas y modelos Mongoose (ODM)
│   ├── routes/               # Enrutadores modulares de la API
│   ├── utils/                # Utilidades (Nodemailer, Tokens, Helpers)
│   └── server.js             # Punto de entrada del servidor Backend
├── frontend/                 # Aplicación Web Principal (React 19 + Vite + TailwindCSS)
│   ├── src/
│   │   ├── assets/           # Recursos estáticos, imágenes y vectores
│   │   ├── components/       # Componentes reutilizables de UI
│   │   ├── context/          # Context API (Estado global de tienda y sesión)
│   │   ├── Pages/            # Vistas (Dashboard, Citas, Tienda, Perfiles)
│   │   │   └── VertexVet/    # Módulo Clínico Avanzado para Veterinarios
│   │   └── styles/           # Tokens de diseño y estilos personalizados
│   └── vite.config.js        # Configuración de empaquetado Vite
├── docterInterface/          # Portal complementario para especialistas y médicos
├── docs/                     # Documentación técnica, esquemas y diagramas
├── .gitignore                # Reglas de exclusión para Git y control de versiones
└── README.md                 # Documentación principal del repositorio
```

---

## ⚡ Puesta en Marcha e Instalación

### 📋 Prerrequisitos

Asegúrate de contar con el siguiente entorno instalado:
- **Node.js** `>= 18.0.0`
- **npm** `>= 9.0.0` o **yarn**
- Base de datos **MongoDB** (Local o MongoDB Atlas)
- Cuenta activa en **Stripe** y **Cloudinary** (para pagos y almacenamiento multimedia)

---

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/ray71mendoza/PetCare-Veterinaria.git
cd PetCare-Veterinaria
```

---

### 2️⃣ Configurar Variables de Entorno

Crea un archivo `.env` dentro de la carpeta `backend/` tomando como base la siguiente estructura:

```env
# Servidor
PORT=5000
NODE_ENV=development

# Base de Datos
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/petcare?retryWrites=true&w=majority

# Seguridad JWT
JWT_SECRET=tu_clave_secreta_jwt_super_segura
JWT_EXPIRES_IN=7d

# Pasarela de Pagos Stripe
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta_stripe
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret

# Almacenamiento Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Servicio de Correo Electrónico (Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_password_de_aplicacion
```

En la carpeta `frontend/`, crea un archivo `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_tu_clave_publica_stripe
```

---

### 3️⃣ Instalación de Dependencias

Ejecuta la instalación en cada módulo del proyecto:

```bash
# Instalar dependencias del Backend
cd backend
npm install

# Instalar dependencias del Frontend
cd ../frontend
npm install

# (Opcional) Instalar dependencias de Doctor Interface
cd ../docterInterface
npm install
```

---

### 4️⃣ Ejecución en Modo Desarrollo

Inicia los servicios en terminales independientes:

```bash
# Terminal 1: Iniciar Backend API (Puerto 5000)
cd backend
npm run dev

# Terminal 2: Iniciar Frontend Client (Puerto 5173)
cd frontend
npm run dev
```

Accede a la aplicación en tu navegador en `http://localhost:5173`.

---

## 📡 Endpoints Principales de la API REST

| Método | Endpoint | Descripción | Acceso |
| :---: | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Registro de nuevos usuarios y propietarios | Público |
| `POST` | `/api/auth/login` | Autenticación y emisión de token JWT | Público |
| `GET` | `/api/pets` | Listado de mascotas del usuario autenticado | Usuario |
| `POST` | `/api/pets` | Registro de nueva mascota con historial clínico | Usuario |
| `GET` | `/api/appointments` | Consulta de citas médicas y estéticas | Usuario / Doctor |
| `POST` | `/api/appointments` | Reserva y agendamiento de nueva cita | Usuario |
| `POST` | `/api/orders/checkout` | Creación de sesión de pago con Stripe | Usuario |
| `GET` | `/api/doctor/patients` | Directorio de pacientes clínicos para doctores | Especialista / Admin |
| `GET` | `/api/admin/reports` | Métricas y reportes globales de ventas y citas | Super Admin |

---

## 📄 Licencia y Créditos

Este proyecto se distribuye bajo la licencia **MIT**. Para más detalles, consulta el archivo [LICENSE](LICENSE).

<div align="center">

Desarrollado con ❤️ y dedicación por **[Ray Mendoza](https://github.com/ray71mendoza)** y colaboradores.  
*PetCare Veterinaria — Cuidando a quienes más quieres con tecnología de vanguardia.*

</div>
