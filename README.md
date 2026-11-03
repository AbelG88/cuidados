# Gurises

App web (PWA) para organizar el cuidado de los chicos: calendario, pendientes y enlaces a documentación, todo en un solo lugar y pensada para usar desde el celu.

Antes se llamaba "Cuidados" y estaba hecha solo para Dante. Ahora es familiar: al abrirla se elige el hijo y cada uno tiene su propia información, separada.

## Uso

- URL: https://abelg88.github.io/cuidados/
- En el celular se puede instalar en la pantalla de inicio ("Agregar a la pantalla de inicio") y se abre como una app.
- Al abrirla aparece un menú para elegir el hijo.

## Qué incluye

Por cada hijo:

- **Calendario**: actividades y bloques de cuidado, con plantillas de eventos recurrentes, resumen semanal y mensual, cobertura del mes y detección de superposiciones.
- **Pendientes**: lista tipo to-do con título, detalle y fecha. Las tareas tildadas se archivan y dejan de verse.
- **Documentos**: enlaces a documentación importante.
- **Historia clínica**: solo enlaces, para tener todo ordenado.

Otras funciones:

- Exportar un rango de fechas.
- Borrar eventos por rango de fechas.
- Respaldo y restauración de datos.
- La edición está protegida con un PIN; sin el PIN la app es de solo lectura.

## Tecnología

- Un único `index.html` con HTML, CSS y JavaScript, sin build ni dependencias que instalar.
- Datos en Firebase (Firestore).
- PWA: `manifest.json` e íconos en `icons/`.
- `sw.js`: service worker con estrategia "red primero, caché como respaldo", así los datos siempre intentan ir a la red.

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

## Desarrollo local

No hace falta instalar nada. Para probarla con service worker, servir la carpeta con cualquier servidor estático:

```bash
python3 -m http.server 8000
```

Y abrir http://localhost:8000.
