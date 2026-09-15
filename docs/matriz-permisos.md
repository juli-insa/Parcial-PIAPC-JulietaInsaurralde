# Matriz de permisos

Esta matriz describe las acciones autorizadas para el agente a lo largo del proyecto completo. Se actualizo al estado final; durante el desarrollo cada bloque amplio el alcance de archivos con autorizacion explicita del estudiante. Una accion no declarada debe considerarse prohibida hasta consultar.

| Accion | Estado | Alcance o justificacion |
|---|---|---|
| Leer archivos del proyecto | Permitida | Contexto permanente del proyecto |
| Buscar rutas y simbolos | Permitida | Navegacion interna del proyecto |
| Editar archivos del juego | Permitida (por bloque, con autorizacion) | `src/main.js`, `src/scenes/`, `src/objects/`, `src/game/`, `src/levels/`, `src/audio/` segun el alcance aprobado de cada bloque |
| Crear archivos del juego | Permitida (por bloque) | `src/objects/`, `src/game/MazePath.js`, `src/audio/AudioController.js` (aprobados en sus bloques) |
| Editar documentacion | Permitida | README.md, GDD.md, docs/especificacion.md, docs/plan.md, docs/matriz-permisos.md, docs/registro-intervencion.md, docs/evidencia-pruebas.md, docs/informe-final.md, docs/auditoria-repositorio.md |
| Ejecutar scripts documentados | Permitida | `npm run dev`, `npm run build`, `npm run preview` |
| Ejecutar validaciones headless | Permitida | Scripts temporales de Node (fuera del repositorio) que importan la logica pura (Maze, MazePath, Bug, level1) para verificar rutas y colisiones |
| Instalar dependencias | Permitida solo en el Bloque 1 | Unicamente `phaser@4.2.1` y `vite` via npm; no se instalaron dependencias en bloques posteriores |
| Usar red | Permitida solo en el Bloque 1 | Exclusivamente para la instalacion de npm indicada arriba |
| Publicar o subir cambios | Prohibida | Solo el estudiante con git push manual y autorizacion |
| Crear commits | Prohibida para el agente | El historial de git (11 commits) fue gestionado por el estudiante |
| Acceder a secretos o credenciales | Prohibida | No corresponde al trabajo |
| Agregar assets externos (imagenes/audio/fuentes) | Prohibida | Graficos y audio son procedurales (Phaser Graphics + Web Audio) |

## Condiciones de detencion

- Si una accion requiere modificar un archivo fuera de los autorizados para el bloque en curso, detener y consultar.
- Ante un error de herramienta sin causa comprendida, registrar y consultar (ejemplo en el historial: error `g.translate is not a function` en ResultScene, corregido en el Bloque 13).
- No reemplazar la version de Phaser por otra automaticamente.