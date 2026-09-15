# Captura a la Reina

Proyecto académico individual de videojuego desarrollado sobre la plantilla PIAPC (Phaser + Vite, JavaScript).

## Datos del proyecto

- Estudiante: Julieta Insaurralde
- Materia, comision y anio: [PENDIENTE - lo define la catedra]
- Nombre del proyecto: Captura a la Reina
- Motor y version: Phaser 4.2.1
- Build tool: Vite 7.3.6
- Node.js probado: 22.12.0
- Estado: **Completo (v1.0 final)**

## Descripcion

El jugador controla la lengua de un oso hormiguero que se introduce dentro de un hormiguero con estructura de laberinto de 30×20. El objetivo es recorrer correctamente el laberinto y llegar hasta la hormiga reina antes de que se agote el tiempo. Hay **cuatro escarabajos** que patrullan recorridos propios; cada contacto con uno descuenta 5 segundos del temporizador. El tiempo representa el efecto del veneno de las hormigas sobre el oso.

## Requisitos y ejecucion

- Motor y version: Phaser 4.2.1
- Build tool: Vite 7.3.6 (requiere Node.js ^20.19.0 o >=22.12.0)
- Probado con: Node.js 22.12.0 y npm
- Plataforma: navegador web
- Lenguaje: JavaScript (ES modules)
- Graficos y audio: generados en tiempo de ejecucion (Phaser Graphics + Web Audio), sin assets externos

Pasos:

1. Clonar el repositorio
2. Ejecutar `npm install`
3. Ejecutar `npm run dev` para iniciar el servidor de desarrollo
4. Abrir la URL mostrada en el navegador (por defecto `http://localhost:5173`)
5. Para generar la version de produccion: `npm run build` (salida en `dist/`)
6. Para previsualizar el build: `npm run preview`

## Controles

- Flechas ↑ ↓ ← →: mover la lengua en 4 direcciones (sin diagonales)
- ENTER: avanzar entre pantallas y reiniciar la partida
- El oso hormiguero permanece siempre mirando a la derecha; solo se mueve la lengua

## Graficos y audio

- **Graficos**: 100% procedurales con `Phaser.GameObjects.Graphics` (fondo, laberinto, personajes, pantallas). No hay imagenes externas.
- **Audio**: 100% procedural con Web Audio (`src/audio/AudioController.js`): musica de fondo generativa (loop a 105 BPM) y efectos sonoros (avance entre pantallas, golpe de escarabajo, choque contra pared, fanfarria de victoria y derrota). No hay archivos de audio externos.

## Arquitectura de codigo

- `src/main.js`: configuracion de Phaser y registro de escenas
- `src/scenes/` — TitleScene, ControlsScene, GameScene, ResultScene
- `src/objects/` — Anteater, Tongue, Bug, QueenAnt
- `src/game/` — Maze (laberinto y colisiones), MazePath (camino de la lengua por los corredores)
- `src/levels/level1.js` — nivel unico: laberinto fijo 30×20 (119 corredores / 481 paredes), entrada `{1,1}`, reina `{28,18}`
- `src/audio/AudioController.js` — audio procedural

## Creditos

- Assets externos: **ninguno** (graficos y audio generados por codigo)
- Librerias: Phaser 4.2.1, Vite 7.3.6

## Entrega o demostracion

[PENDIENTE - fecha y modalidad de entrega definida por la catedra]