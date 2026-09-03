# Auditoría de Base de Datos - VERTEX Vet

## 1. Estructura de Datos Actual (MongoDB / Mongoose)

### Colecciones y Esquemas Existentes
1. `users`: Información de propietarios, credenciales, ciudad y teléfono con índice único en email.
2. `admins`: Cuentas de administración general del sistema.
3. `professionals`: Veterinarios, peluqueros y entrenadores con ID único, rol y calificaciones.
4. `pets`: Mascotas vinculadas a `userId` con array embebido `medicalRecords`.
5. `appointments`: Citas con índice compuesto `{ doctorId: 1, appointmentDate: 1, appointmentTime: 1 }` para evitar colisiones.
6. `products`, `orders`, `adoptablepets`, `events`: Módulos de comercio electrónico y gestión comunitaria.

---

## 2. Plan de Normalización y Evolución Progresiva
* **Preservación Total**: Ningún registro preexistente se destruye.
* **Extensión de `Pet`**: Soporte para campos clínicos ampliados (microchip, alergias, antecedentes, estado reproductivo, condición corporal y alertas).
* **Indexación Óptima**: Índices en `petId`, `name`, `doctorId`, `appointmentDate` y `status` para búsquedas y filtros en tiempo real sub-100ms.
