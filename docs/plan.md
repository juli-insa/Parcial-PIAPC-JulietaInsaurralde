# Plan de intervencion

## Objetivo del plan

Implementar "Captura a la Reina" cumpliendo los criterios CA-01 a CA-13 de `docs/especificacion.md`, avanzando por bloques de menor a mayor riesgo y sin ampliar el alcance definido en `GDD.md` salvo autorizacion explicita (que ocurrio para los bloques visuales y de audio).

## Bloques realizados (historial completo)

Los bloques 1 a 8 siguieron el plan original aprobado. A partir del bloque 9 se amplio el alcance, siempre con autorizacion explicita, hasta llegar al estado final documentado.

| Bloque | Objetivo | Archivos principales | Validacion | Estado |
|---:|---|---|---|---|
| 1 | Setup e instalacion (Vite + Phaser 4.2.1) y documentacion inicial | package.json, package-lock.json, index.html, src/main.js, .gitignore, README, GDD, docs/ | npm run build y npm run dev SIN errores | Completado |
| 2 | Flujo de pantallas (titulo → controles → resultado) | src/scenes/TitleScene.js, ControlsScene.js, ResultScene.js | Transiciones con ENTER | Completado |
| 3 | Laberinto fijo y configuracion de nivel | src/levels/level1.js, src/game/Maze.js | Render correcto de la matriz en navegador | Completado |
| 4 | Lengua (movimiento continuo + colision con paredes) | src/objects/Anteater.js, src/objects/Tongue.js | CA-04 y CA-05 verificadas en navegador | Completado |
| 5 | Temporizador de 60 s y logica de fin de partida | src/scenes/GameScene.js | CA-07 y CA-11 | Completado |
| 6 | Escarabajo con ruta predefinida y descuento de 5 s | src/objects/Bug.js, src/scenes/GameScene.js | CA-09 y CA-10 | Completado |
| 7 | Hormiga reina como meta y victoria con tiempo restante | src/objects/QueenAnt.js, src/scenes/GameScene.js, ResultScene.js | CA-12 | Completado |
| 8 | Integracion, reinicio con ENTER y auditoria read-only | src/scenes/GameScene.js, ResultScene.js | CA-13 y flujo completo | Completado |
| 9 | Rediseno de nivel a 30×20 (canvas 900×600, tile 30) | src/levels/level1.js, src/scenes/GameScene.js, src/main.js | Headless: 119 corredores/481 paredes, BFS conexo, camino a la reina 44 | Completado |
| 10 | Rediseno visual del gameplay (oso, lengua, escarabajo, reina, laberinto) | src/objects/Anteater.js, Tongue.js, Bug.js, QueenAnt.js, src/scenes/GameScene.js | Build + dev + regresion headless de mecanicas | Completado |
| 11 | Cuatro escarabajos con rutas independientes | src/objects/Bug.js, src/scenes/GameScene.js | Headless: rutas validas, 160 000 pasos en corredores, colisiones independientes | Completado |
| 12 | Pulido visual de TitleScene y ControlsScene | src/scenes/TitleScene.js, ControlsScene.js | Build + dev; revision manual pendiente | Completado |
| 13 | Pulido visual de ResultScene (+correccion de error g.translate) | src/scenes/ResultScene.js | Build + dev; revision manual pendiente | Completado |
| 14 | Mejoras finales: lengua por cavidades (MazePath), oso fijo a la derecha, audio procedural | src/game/MazePath.js, src/audio/AudioController.js, Tongue.js, Anteater.js, GameScene.js, TitleScene.js, ControlsScene.js | Headless: MazePath 119/119, camino a la reina 44; build + dev | Completado |
| 15 | Documentacion final del estado del proyecto (este bloque) | README.md, GDD.md, docs/*.md | npm run build sin cambios de codigo | Completado |

## Orden de implementacion

Se construyo primero lo que sustenta al resto (setup, flujo de pantallas, laberinto verificable visualmente) antes de la mecanica de mayor riesgo (lengua con colision continua). Cada bloque se valido antes de avanzar al siguiente. La sinergia de validacion usada en todos los bloques fue: `npm run dev`, `npm run build` y simulaciones headless en Node para la logica pura (rutas, colisiones, caminos del laberinto).

## Fuera de alcance

- Multiples niveles, generacion procedural de laberintos, nuevas especies de bichos, puntuacion, vidas, power-ups, dificultad, pausa, settings, guardado, multijugador, touch, gamepad, red, autenticacion.
- Modificacion de `AGENTS.md`.
- Commits y publicacion realizados por el agente sin autorizacion explicita.

## Nota historica

- `audio/musica` y `animaciones complejas` estuvieron originalmente fuera de alcance (plan original); en el bloque 14 se incorporaron musica y efectos procedurales (Web Audio) y animaciones decorativas simples con autorizacion del estudiante. La documentacion reflecta ese estado final.
- La instalacion de dependencias se realizo solo en el Bloque 1 (phaser@4.2.1 y vite). No se instalaron dependencias posteriores.