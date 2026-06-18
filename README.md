# Booty Alarm — Landing Page

Landing page para **Booty Alarm**, la alarma fitness que no se apaga hasta que
haces squats reales detectados por cámara, con el contenido premium de
**Brenda Fitness**.

> Creadora: Brenda Jazmín · Compañía: Purple Roots Agency
> Diseñado y desarrollado por **ZERONNE**

## Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + **TypeScript**
- [TailwindCSS](https://tailwindcss.com/) (paleta y fuentes de marca)
- [Framer Motion](https://www.framer.com/motion/) (animaciones al scroll)
- [Lucide React](https://lucide.dev/) (iconos)

## Estructura

```
src/
├── components/   # Bloques reutilizables (Button, GlassCard, IPhoneFrame, etc.)
├── sections/     # Cada sección de la landing (Hero, Pricing, Footer, ...)
├── lib/          # Datos centralizados (images, links, content, motion)
├── App.tsx       # Ensambla todas las secciones
├── main.tsx      # Punto de entrada
└── index.css     # Tailwind + estilos base (aurora, glassmorphism)
public/
└── robots.txt
```

## Desarrollo local (opcional)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/ (build de producción)
npm run preview  # sirve el build localmente
```

## Cómo reemplazar las imágenes (Cloudinary)

Todas las imágenes están centralizadas en **`src/lib/images.ts`**. Cada valor
está vacío por ahora y la UI muestra un placeholder con estilo. Para activar
una imagen real, pega su URL de Cloudinary en la clave correspondiente:

```ts
export const IMAGES = {
  screenshot_alarm_hero: 'https://res.cloudinary.com/.../alarm-hero.png',
  // ...
}
```

No hay que tocar ningún componente: en cuanto una clave tiene URL, el
placeholder se reemplaza automáticamente por la imagen (con lazy-loading).

La lista exacta de imágenes a generar, con tamaños/ratios recomendados, está
en **[`CLOUDINARY.md`](./CLOUDINARY.md)**.

## Links de las stores

En **`src/lib/links.ts`**:

- `app_store`: URL de App Store (se confirma cuando Apple apruebe).
- `google_play`: `'#'` por ahora → los botones de Android se muestran
  deshabilitados con la nota "Próximamente" y un toast. En cuanto pongas una
  URL real, los botones se activan automáticamente.

## Deploy en Vercel

1. Entra a [vercel.com](https://vercel.com) → **Add New… → Project**.
2. Importa el repositorio de GitHub.
3. Vercel detecta **Vite** automáticamente. Si necesitas confirmarlo:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Pulsa **Deploy**. No se requieren variables de entorno (es 100% estático).
5. (Opcional) Conecta tu dominio y actualiza el `Sitemap` en `public/robots.txt`
   y las metaetiquetas `og:image` en `index.html` con la URL de Cloudinary.

Cada push a la rama conectada redepliega automáticamente.
