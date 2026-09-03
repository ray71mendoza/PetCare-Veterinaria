# Sistema de Diseño - VERTEX Vet

## 1. Fundamentos & Tokens de Marca

El sistema de diseño de **VERTEX Vet** combina la sobriedad tecnológica de la **Suite Vertex** con una identidad cromática clínica especializada (Teal médico y Esmeralda de vitalidad).

### Tokens de Color (CSS Custom Properties)

```css
:root {
  /* Suite Vertex Core */
  --vertex-slate-900: #0f172a;
  --vertex-slate-800: #1e293b;
  --vertex-slate-700: #334155;
  --vertex-slate-600: #475569;
  --vertex-slate-500: #64748b;
  --vertex-slate-400: #94a3b8;
  --vertex-slate-200: #e2e8f0;
  --vertex-slate-100: #f1f5f9;
  --vertex-slate-50: #f8fafc;
  --vertex-indigo-600: #4f46e5;
  --vertex-indigo-700: #4338ca;

  /* VERTEX Vet Vertical Accent */
  --vet-primary: #0d9488;         /* Teal 600 */
  --vet-primary-hover: #0f766e;   /* Teal 700 */
  --vet-primary-light: #ccfbf1;   /* Teal 100 */
  --vet-accent: #10b981;          /* Emerald 500 */
  --vet-accent-hover: #059669;    /* Emerald 600 */
  --vet-accent-light: #d1fae5;    /* Emerald 100 */

  /* Semántica & Alertas Clínicas */
  --vet-success: #10b981;
  --vet-warning: #f59e0b;
  --vet-danger: #ef4444;
  --vet-info: #0284c7;

  /* Superficies y Bordes */
  --vet-bg: #f8fafc;
  --vet-surface: #ffffff;
  --vet-surface-elevated: #ffffff;
  --vet-border: #e2e8f0;
  --vet-border-subtle: #f1f5f9;

  /* Tipografía */
  --vet-font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --vet-font-display: 'Outfit', var(--vet-font-sans);
}
```

---

## 2. Componentes Principales
1. **Cards & Contenedores Clínicos**: Fondo blanco puro, borde sutil (`#e2e8f0`), sombra suave (`0 1px 3px rgba(0,0,0,0.05)`).
2. **Badges de Estado**:
   * *Crítico/Urgente*: Fondo rojo claro con texto carmesí y punto pulsante.
   * *En Observación*: Fondo ámbar claro con texto tabaco.
   * *Estable/Completado*: Fondo verde esmeralda suave con texto verde oscuro.
   * *Programado*: Fondo azul cielo con texto azul profesional.
3. **Botones de Acción**:
   * *Primario*: Fondo `--vet-primary` (#0d9488), texto blanco, transiciones suaves y foco accesible.
   * *Secundario*: Fondo blanco con borde slate-200 y hover a slate-50.
4. **Header y Sidebar**: Sidebar de tono slate profundo con iconos limpios y estado activo resaltado con acento teal.
