# ORVYX HYBRID GAMES — GitHub Pages

Portal estático listo para GitHub Pages. Incluye recorrido interactivo, seis fichas de referencia y explorador muscular. No necesita instalar dependencias ni ejecutar una compilación.

## Publicar

1. Crea o elige un repositorio en tu cuenta de GitHub. Nombre sugerido: `orvyx-hybrid-games`. Si tu cuenta es GitHub Free, debe ser público; el código será visible.
2. Extrae el ZIP y sube su contenido a la raíz del repositorio, no el archivo ZIP ni una carpeta contenedora. Conserva `index.html`, ambos CSS, ambos JS y `.nojekyll`.
3. En el repositorio, abre **Settings → Pages**. En **Source**, elige **Deploy from a branch**. Selecciona **main** y **/(root)** y guarda. Si elegiste otra rama principal, usa esa rama.
4. Espera a que GitHub indique que la publicación terminó y usa el enlace que muestre. El formato normal para un proyecto es `https://TU_USUARIO.github.io/NOMBRE_REPOSITORIO/`. Este formato es un ejemplo, no un sitio ya publicado.

## Pendientes del contenido

La página conserva los avisos de revisión: falta el logo original y validar la ficha definitiva de las seis estaciones, su orden y los tramos inicial y final. Las zonas musculares son orientativas; no muestran porcentajes de activación ni representan dolor.

## Archivos

- `index.html`: página.
- `styles.css`, `muscles.css`: diseño adaptable.
- `app.js`: recorrido interactivo.
- `muscles.js`: mapa muscular y sincronización.
- `.nojekyll`: permite servir los archivos estáticos directamente.

Las rutas de los recursos son relativas para que funcionen tanto en un sitio raíz como dentro de la carpeta de un proyecto. La copia no contiene credenciales ni configuración interna del alojamiento anterior.

Documentación: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
