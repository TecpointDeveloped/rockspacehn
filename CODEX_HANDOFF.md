# CODEX HANDOFF — ROCKSPACEHN

## Objetivo
Continuar y terminar ROCKSPACEHN como sitio oficial de Rock Space Honduras, partiendo de este proyecto existente.

## Prioridad visual
La protagonista del sitio es la **RCL1005 AI Photo Sticker Printer and Cutter**.
El sitio debe vender primero la idea de personalización:
- stickers personalizados
- photo stickers
- skins traseras
- fotos
- impresión + corte

Después se presentan como línea complementaria:
- MINI ZV2
- ZC1 Max
- ZC5

## Regla principal
**El usuario no debe ser enviado a otras páginas para aprender sobre los productos.**
Todo el contenido comercial, técnico y educativo debe vivir dentro de ROCKSPACEHN.

Se permite salir únicamente para:
- WhatsApp, como cierre de venta/soporte
- redes sociales cuando sea explícitamente necesario

## Tutoriales
Cada producto debe tener tutoriales reproducibles dentro de su propia página.

Productos:
1. RCL1005
2. MINI ZV2
3. ZC1 Max
4. ZC5

Mantener los reproductores embebidos y evitar enlaces tipo “ver tutorial en YouTube”.

Crear una experiencia tipo centro de aprendizaje:
- Cómo funciona
- Configuración inicial
- Primer trabajo
- Mantenimiento
- Solución de problemas

Si actualmente solo existe un video por máquina, mantenerlo y dejar la estructura preparada para agregar más.

## RCL1005
Debe seguir siendo EL CENTRO del Home.

Jerarquía recomendada:
1. Hero RCL1005
2. Qué puede crear
3. Ejemplos visuales de stickers/skins/fotos
4. Cómo funciona
5. Video tutorial integrado
6. Flujo foto → IA → impresión → corte → resultado
7. Consumible SD21
8. FAQ
9. CTA a asesoría/WhatsApp
10. Plotters de protección como línea complementaria

## Diseño
Dirección visual:
- premium
- tecnológica
- editorial
- alto impacto
- no parecer plantilla genérica
- no parecer una web corporativa aburrida
- inspirada en páginas de lanzamiento de hardware premium, sin copiar marcas

Usar:
- tipografía grande
- imágenes de producto protagonistas
- secciones full-width
- profundidad visual
- microanimaciones suaves
- transiciones al hacer scroll
- cards solo cuando aporten jerarquía
- muy buen responsive móvil

Evitar:
- exceso de tarjetas pequeñas
- texto técnico amontonado
- páginas vacías
- grandes áreas sin imagen
- gradients genéricos usados como relleno
- botones que llevan al fabricante

## Imágenes
Revisar que TODAS las páginas tengan imágenes.
No deben existir secciones principales con placeholders o imágenes rotas.

Prioridad:
- RCL1005: varias imágenes y resultados reales
- MINI ZV2: producto + uso
- ZC1 Max: producto + formatos grandes
- ZC5: producto + funciones inteligentes
- láminas: mostrar textura/uso cuando existan recursos

Optimizar imágenes con Next/Image cuando sea conveniente.
Configurar correctamente next.config si hay imágenes remotas.
Agregar alt text descriptivo.

## Navegación
Orden recomendado:
- Stickers
- Máquinas
- Láminas
- Tutoriales
- Soporte

La Home debe comunicar rápidamente que Rock Space Honduras ofrece:
**personalización + protección bajo demanda para negocios.**

## Soporte
Mantener:
- Benjamín Leiva como asesor técnico
- CTA a WhatsApp de ROCKSPACEHN

WhatsApp configurado actualmente:
+504 9465-9287

Antes de producción, dejar el número centralizado en una sola constante/configuración.

## Tecnología
Revisar el proyecto antes de modificar:
- framework
- versión de Next.js
- estructura de routes
- TypeScript
- Tailwind/CSS
- componentes existentes

No reescribir innecesariamente lo que ya funciona.

## Calidad antes de entregar
Ejecutar:
- npm install
- npm run build
- lint/typecheck disponible en el proyecto

Corregir:
- errores TypeScript
- errores de build
- imágenes rotas
- rutas rotas
- hidratación
- responsive
- overflow horizontal
- enlaces incorrectos
- videos que no carguen

## SEO
Revisar:
- title
- description
- metadata por producto
- Open Graph
- robots
- sitemap
- headings semánticos

## Entregable
Al terminar:
1. Resumir archivos modificados.
2. Explicar las mejoras visuales.
3. Confirmar que el build pasa.
4. Indicar cualquier asset que todavía necesite ser proporcionado por el equipo.
5. No reemplazar contenido real por placeholders solo para “terminar”.

## Contexto importante
Este proyecto se implementará **desde cero** como la nueva web de ROCKSPACEHN. La versión actual de este ZIP es la base aprobada en concepto, pero debe pulirse como producto listo para producción.
