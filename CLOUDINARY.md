# Imágenes a generar (Cloudinary)

Sube cada imagen a Cloudinary y pega la URL resultante en la clave indicada de
**`src/lib/images.ts`**. La columna **Clave** es el nombre exacto en ese
archivo. No hace falta tocar componentes: en cuanto una clave tiene URL, el
placeholder se reemplaza solo.

> Recomendación general: exporta en **PNG** o **WebP**, optimiza con las
> transformaciones de Cloudinary (`f_auto,q_auto`) y mantén el ratio indicado
> para que no haya recortes raros.

## 📱 Screenshots de la app — ratio **9 : 19.5** (pantalla iPhone)

Tamaño recomendado: **1170 × 2532 px** (o cualquier múltiplo del ratio 9:19.5).

| Clave (`IMAGES.…`)                | Dónde aparece                          | Contenido sugerido                    |
| --------------------------------- | -------------------------------------- | ------------------------------------- |
| `screenshot_alarm_hero`           | Hero (marco iPhone flotante)           | Pantalla de la alarma activa          |
| `screenshot_camara_squats`        | Showcase de screenshots                | Cámara contando squats                |
| `screenshot_entrena`              | Showcase de screenshots                | Brenda Fitness — Entrena              |
| `screenshot_nutricion_planes`     | Showcase de screenshots                | Brenda Fitness — Nutrición (planes)   |
| `screenshot_nutricion_recetas`    | Showcase de screenshots                | Brenda Fitness — Recetas              |
| `screenshot_nutricion_suplementos`| Showcase de screenshots                | Brenda Fitness — Suplementos          |

## 📷 Fotos de Brenda

| Clave (`IMAGES.…`) | Ratio   | Tamaño recomendado | Dónde aparece                     |
| ------------------ | ------- | ------------------ | --------------------------------- |
| `brenda_about`     | **4:5** | 1080 × 1350 px     | Sección "Desbloquea Brenda Fitness" |
| `brenda_hero`      | **1:1** | 1080 × 1080 px     | (Reservada / uso futuro)          |

## 🎨 Icono y redes sociales

| Clave (`IMAGES.…`) | Ratio    | Tamaño recomendado | Uso                                         |
| ------------------ | -------- | ------------------ | ------------------------------------------- |
| `app_icon`         | **1:1**  | 1024 × 1024 px     | Icono de la app (uso futuro)                |
| `og_image`         | **1.91:1** | 1200 × 630 px    | Open Graph / Twitter Card (compartir links) |

### Después de subir la OG image

Además de `src/lib/images.ts`, pega la URL de `og_image` en `index.html`
(dos lugares):

```html
<meta property="og:image" content="https://res.cloudinary.com/.../og.png" />
<meta name="twitter:image" content="https://res.cloudinary.com/.../og.png" />
```

## Resumen rápido — 10 imágenes

1. `screenshot_alarm_hero` — 9:19.5
2. `screenshot_camara_squats` — 9:19.5
3. `screenshot_entrena` — 9:19.5
4. `screenshot_nutricion_planes` — 9:19.5
5. `screenshot_nutricion_recetas` — 9:19.5
6. `screenshot_nutricion_suplementos` — 9:19.5
7. `brenda_about` — 4:5
8. `brenda_hero` — 1:1 *(opcional / futuro)*
9. `app_icon` — 1:1 *(opcional / futuro)*
10. `og_image` — 1200×630
