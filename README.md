# ROCKSPACEHN — sitio completo desde cero


## Enfoque principal de esta versión

La **RCL1005 AI Photo Sticker Printer and Cutter** es el centro de la experiencia: aparece en el hero del Home, tiene página propia en `/stickers`, tutorial integrado, galería, ficha técnica, flujo de uso, consumible SD21 y preguntas frecuentes. Las plotters MINI ZV2, ZC1 Max y ZC5 quedan como línea complementaria de protección bajo demanda.

Proyecto nuevo de **Rock Space Honduras** construido con **Next.js 16.3.3 + React 19.2.8 + TypeScript**, usando App Router y CSS propio (sin Tailwind ni librerías visuales externas).

## Qué incluye

- Home premium y responsive.
- Catálogo de máquinas: MINI ZV2, ZC1 Max y ZC5.
- Página individual por máquina.
- Tutorial integrado dentro de cada ficha.
- Pasos rápidos de funcionamiento.
- Especificaciones técnicas.
- Preguntas frecuentes.
- Página de láminas.
- Centro general de tutoriales.
- Centro de soporte con Benjamín Leiva.
- CTA a WhatsApp en todo el sitio.
- Instagram de ROCKSPACEHN.
- SEO base, `sitemap.xml` y `robots.txt`.
- Diseño responsive para móvil, tablet y desktop.
- Accesibilidad básica y soporte para `prefers-reduced-motion`.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Comprobar antes de publicar

```bash
npm run typecheck
npm run build
```

## Desplegar en Vercel

1. Cree un repositorio nuevo o reemplace el proyecto anterior con este contenido.
2. Suba el proyecto a GitHub.
3. En Vercel: **Add New → Project → Import Git Repository**.
4. Framework Preset: **Next.js**.
5. Build Command: `npm run build`.
6. Output: automático.
7. Después del primer deploy, agregue `rockspacehn.com` y `www.rockspacehn.com` en **Settings → Domains** y copie exactamente los DNS que Vercel indique en su proveedor de dominio.

## Publicar en DreamHost

El proyecto está configurado con `output: "export"`. Después de ejecutar `npm run build`, la carpeta `out/` contiene el sitio estático completo que debe cargarse en el directorio web de `rockspacehn.com`.

## Videos tutoriales

El componente `components/VideoEmbed.tsx` ya está listo para YouTube.

En `data/machines.ts` cada máquina acepta:

```ts
youtubeId: "ID_DEL_VIDEO"
```

- **RCL1005**: `ZOMDXgjyqPk`.
- **MINI ZV2**: `oPZsBVUgjLY`.
- **ZC1 Max**: `rGq9mg1-HHo`.
- **ZC5**: `HBQ9hVbiN1Y`.
- Los cuatro IDs fueron comprobados mediante la información pública de YouTube antes del build final.
- Cuando ROCKSPACEHN grabe tutoriales propios en español, simplemente cambie/agregue el `youtubeId` en `data/machines.ts`.

Esto es intencional: es mejor dejar un slot correcto que incrustar un video equivocado.

## Datos de contacto centralizados

Edite `lib/site.ts` para cambiar una sola vez:

- WhatsApp
- Instagram
- nombre del asesor
- dominio

Actualmente configurado:

- WhatsApp: `+504 9465-9287`
- Instagram: `@rockspacehn`
- Asesor técnico: `Benjamín Leiva`
- Dominio: `https://rockspacehn.com`

## Imágenes

Las imágenes oficiales de productos y láminas están guardadas localmente en `/public/images/products`. Esto evita roturas por URLs externas y permite que Next/Image entregue tamaños optimizados según la pantalla. Antes de publicar, confirme que ROCKSPACEHN cuenta con autorización de marca para alojarlas.

## Fuentes técnicas utilizadas

- MINI ZV2: https://www.rockspacediy.com/products/mini-zv2-smart-plotter/
- ZC1 Max: https://es.rockspacediy.com/products/zc1-smart-protective-film-plotter/
- ZC5: https://www.rockspacediy.com/products/zc5-smart-protective-film-plotter/
- Catálogo de películas: https://www.rockspacediy.com/products/

## Estructura

```text
app/
  maquinas/
    [slug]/page.tsx
    page.tsx
  laminas/page.tsx
  tutoriales/page.tsx
  soporte/page.tsx
  globals.css
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
data/
lib/
public/
```

## Antes de producción

- Confirmar que la versión suministrada del logo de ROCK SPACE Honduras sea la definitiva para producción.
- Verificar inventario y disponibilidad comercial antes de publicar afirmaciones de stock.
- Sustituir los videos oficiales por tutoriales propios en español cuando estén disponibles, si el equipo lo desea.
- Probar WhatsApp en móvil.
- Configurar dominio en Vercel.
