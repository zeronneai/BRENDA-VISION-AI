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

## Descarga de la app

- **Android** → botón principal que abre un **modal con instrucciones** para
  instalar el **APK directo** (descarga desde el GitHub Release de ECOBRENDA).
- **iOS** → **"Próximamente en App Store"** (informativo, sin link): la app está
  en revisión final de Apple. Al tocar muestra un aviso; no abre modal.
- Botón secundario "**¿Cómo instalar?**" → selector iOS/Android (iOS muestra el
  aviso "próximamente", Android abre el modal del APK).

### URLs en `src/lib/links.ts`

| Clave | Uso | Estado |
|-------|-----|--------|
| `ios_app_store` | App Store oficial | en revisión de Apple (sin link público) |
| `android_apk` | APK directo | ✅ activo (GitHub Release) |
| `android_play_store` | Google Play oficial | placeholder |

**Actualizar el APK:** cambia `android_apk` por la URL del nuevo GitHub Release.
`ANDROID_APK_READY` detecta si es un placeholder para mostrar un toast en su
lugar.

El contenido de los pasos de Android vive en **`src/lib/install.ts`**. Los
modales (`src/components/install/`) son accesibles: ESC, focus trap, click-fuera
para cerrar y soporte para `prefers-reduced-motion`.

Un badge sutil "🚧 Beta abierta" aparece en el Hero y en Precios.

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
