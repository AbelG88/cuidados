# Gurises

App web (PWA) para organizar el cuidado de los chicos: calendario, pendientes y enlaces a documentación, todo en un solo lugar y pensada para usar desde el celu.

Antes se llamaba "Cuidados" y estaba hecha solo para Dante. Ahora es familiar: al abrirla se elige el hijo (hoy Dante, Porotx e Isa) y cada uno tiene su propia información, separada.

## Uso

- URL: https://abelg88.github.io/cuidados/
- En el celular se puede instalar en la pantalla de inicio ("Agregar a la pantalla de inicio") y se abre como una app.
- Al abrirla aparece un menú para elegir el hijo. Cada hijo se abre con `?fam=<id>` (por ejemplo `?fam=dante`).
- Sin PIN la app es de solo lectura. Para editar, se desbloquea desde el menú con el PIN de edición; queda guardado en ese dispositivo.

## Qué incluye

Por cada hijo:

- **Calendario**: actividades y bloques de cuidado, con plantillas de eventos recurrentes, resumen semanal y mensual, cobertura del mes y detección (y corrección) de superposiciones.
- **Pendientes**: lista tipo to-do con título, detalle y fecha. Las tareas tildadas se archivan y dejan de verse.
- **Documentos**: enlaces a documentación importante.
- **Historia clínica**: solo enlaces, para tener todo ordenado.

Otras funciones:

- Exportar un rango de fechas en PDF.
- Borrar eventos por rango de fechas.
- Respaldo completo y restauración de datos (archivo JSON).

## Tecnología

- Un único `index.html` con HTML, CSS y JavaScript, sin build ni dependencias que instalar.
- Datos en Firebase Firestore (SDK por CDN). Cada hijo es un documento de la colección `familias`.
- PDF con jsPDF y jsPDF-AutoTable (por CDN).
- PWA: `manifest.json` e íconos en `icons/`.
- `sw.js`: service worker con estrategia "red primero, caché como respaldo", así los datos siempre intentan ir a la red.

## Correrlo en local

No hay nada que instalar. Servir la carpeta con cualquier servidor estático y abrir en el navegador:

```
python3 -m http.server 8000
# http://localhost:8000/?fam=dante
```

Necesita conexión a internet (Firestore y las librerías por CDN). Ojo: apunta a la base real, así que lo que se edite en local se guarda en producción.

## Estructura del repo

```
index.html      App completa
manifest.json   Configuración de la PWA (nombre, colores, íconos)
sw.js           Service worker
icons/          Íconos de la app
```

## Publicación

El sitio se publica solo con GitHub Pages: cada cambio que se sube a `main` queda online.

Cuando se cambian archivos que cachea el service worker, conviene subir la versión de `CACHE_NAME` en `sw.js` para que los celulares tomen la actualización.

## Agregar un hijo

Sumarlo a la lista `HIJOS` en `index.html` (`id`, `nombre`, `emoji`). El `id` es el nombre del documento en Firestore.

## Notas

- El módulo de pañales se quitó de esta app y se retoma por separado como **Nappy**.
- El PIN de edición está en el código del cliente y la config de Firebase es pública: sirve para evitar ediciones accidentales, no como seguridad real. La protección de verdad depende de las reglas de Firestore.
