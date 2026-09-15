# Matriz de permisos

Completa esta matriz antes de habilitar acciones de un agente. Una accion no declarada debe considerarse prohibida hasta consultar. Esta matriz corresponde al Bloque 1 aprobado (setup + documentacion inicial).

| Accion | Estado | Alcance o justificacion |
|---|---|---|
| Leer archivos del proyecto | Permitida | Contexto permanente del proyecto |
| Buscar rutas y simbolos | Permitida | Navegacion interna del proyecto |
| Editar archivos previstos | Permitida | README.md, GDD.md, docs/especificacion.md, docs/plan.md, docs/matriz-permisos.md, docs/registro-intervencion.md, .gitignore |
| Crear archivos previstos | Permitida | package.json, index.html, src/main.js; se generan package-lock.json y dist/ por herramientas |
| Ejecutar scripts documentados | Permitida | npm run dev, npm run build, npm run preview |
| Instalar dependencias | Permitida (solo este bloque) | Unicamente phaser@4.2.1 y vite via npm |
| Usar red | Permitida (solo este bloque) | Exclusivamente para la instalacion de npm indicada arriba |
| Publicar o subir cambios | Prohibida | Solo el estudiante con git push manual y autorizacion |
| Acceder a secretos o credenciales | Prohibida | No corresponde al trabajo |

## Condiciones de detencion

- Si la instalacion de phaser@4.2.1 falla o presenta incompatibilidad que impida continuar, detener y consultar. No reemplazar la version de Phaser por otra automaticamente.
- Si una accion requiere modificar un archivo fuera de los autorizados, detener y consultar.
- Ante un error de herramienta sin causa comprendida, registrar y consultar.
