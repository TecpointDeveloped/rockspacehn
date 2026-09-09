# Implementación rápida — ROCKSPACEHN

## 1. Si va a empezar de cero

Cree una carpeta vacía, copie **todo** el contenido de este proyecto y ejecute:

```bash
npm install
npm run dev
```

No necesita ejecutar `create-next-app`; este ZIP ya ES el proyecto.

## 2. Contenido que se edita normalmente

### Datos de máquinas
`data/machines.ts`

Aquí cambia:
- textos,
- especificaciones,
- imágenes,
- ID de YouTube,
- FAQs,
- pasos de tutorial.

### Contacto
`lib/site.ts`

Aquí cambia el WhatsApp comercial, el WhatsApp de soporte técnico, Instagram y dominio. El soporte público se presenta como el equipo de expertos Rock Space.

### Diseño
`app/globals.css` y `app/balanced.css`

Toda la identidad visual está centralizada ahí.

## 3. Cómo añadir un tutorial nuevo

Suba el video a YouTube y copie únicamente el ID.

Ejemplo:

`https://www.youtube.com/watch?v=ABC123XYZ`

Use:

```ts
youtubeId: "ABC123XYZ"
```

El video aparecerá automáticamente tanto en la ficha de la máquina como en `/tutoriales`.

## 4. Flujo de la web

Inicio → Máquinas → Ficha del equipo → Tutorial → Láminas → Soporte → WhatsApp.

La prioridad no es solo vender la máquina: la web funciona también como centro de aprendizaje postventa.


## Página central
- `/stickers`: RCL1005, galería, especificaciones, tutorial y consumibles.
- El Home presenta un carrusel automático con todas las máquinas y mantiene la RCL1005 como solución protagonista de personalización.
