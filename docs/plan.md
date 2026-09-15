# Plan de intervencion

## Objetivo del plan

Implementar "Captura a la Reina" cumpliendo los criterios CA-01 a CA-13 de `docs/especificacion.md`, avanzando por bloques de menor a mayor riesgo y sin ampliar el alcance definido en `GDD.md`.

## Cambios propuestos

Bloque actual: **Bloque 1 - setup + documentacion inicial** (aprobado). Los bloques siguientes se proponen y se ejecutan solo con autorizacion.

| Paso | Cambio minimo | Archivos previstos | Verificacion | Riesgo | Condicion de detencion |
|---:|---|---|---|---|---|
| 1 | Scaffolding Vite + Phaser 4.2.1 | package.json, package-lock.json, index.html, src/main.js, .gitignore | npm run build y npm run dev abren sin errores | Bajo | Si phaser@4.2.1 no es instalable, detener y consultar |
| 2 | Flujo de pantallas | src/scenes/TitleScene.js, ControlsScene.js, ResultScene.js | Transiciones titulo->controles->juego->resultado | Bajo | Error de Phaser sin causa comprendida |
| 3 | Laberinto fijo | src/levels/level1.js, src/game/Maze.js | Render correcto de la matriz | Medio | Diseño de mapa sin ruta valida entrada->reina |
| 4 | Lengua (movimiento + colision) | src/objects/Anteater.js, src/objects/Tongue.js | CA-04 y CA-05 verifican | Alto | La lengua atraviesa paredes sin causa clara |
| 5 | Temporizador | src/scenes/GameScene.js | CA-07 y CA-11 verifican | Bajo | - |
| 6 | Escarabajo | src/objects/Bug.js | CA-09 y CA-10 verifican | Medio | - |
| 7 | Reina y victoria | src/objects/QueenAnt.js | CA-12 verifica | Bajo | - |
| 8 | Integracion y reinicio | src/scenes/GameScene.js, ResultScene.js | CA-13 verifica y flujo completo CA-01 a CA-13 | Bajo | - |

## Orden de implementacion

Se construye primero lo que sustenta al resto (setup, flujo de pantallas, laberinto verificable visualmente) antes de la mecanica de mayor riesgo (lengua con colision continua). Cada bloque se valida antes de avanzar al siguiente.

## Fuera de alcance

- Gameplay en el bloque 1 (no se crean escenas de juego funcionales ni objetos del juego).
- Multiples niveles, generacion procedural, mas bichos, puntuacion, vidas, power-ups, dificultad, pausa, settings, guardado, multijugador, touch, gamepad, audio, animaciones, red, autenticacion.
- Modificacion de `AGENTS.md`.
- Commits y publicacion sin autorizacion explicita.
