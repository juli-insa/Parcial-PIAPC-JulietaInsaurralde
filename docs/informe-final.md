# Informe final

## Descripcion del juego

"Captura a la Reina" es un juego de habilidad y laberinto en tiempo real. El jugador controla la lengua de un oso hormiguero que se introduce en el hormiguero para capturar a la hormiga reina. El hormiguero es un laberinto fijo de 30×20 celdas y el tiempo es el recurso central: si se agota, la partida termina en derrota.

## Objetivo

Llegar con la lengua hasta la hormiga reina antes de que el temporizador (60 s) llegue a 0, evitando a los cuatro escarabajos que patrullan el laberinto, cada contacto con un escarabajo descuenta 5 segundos.

## Tecnologias

- Motor: Phaser 4.2.1
- Build tool: Vite 7.3.6 (requiere Node ^20.19.0 o >=22.12.0)
- Runtime de desarrollo: Node.js 22.12.0
- Lenguaje: JavaScript (ES modules)
- Plataforma: navegador web, teclado
- Graficos y audio: 100% procedurales (Phaser Graphics + Web Audio); sin assets externos

## Arquitectura

- `src/main.js`: configuracion de Phaser (canvas 900×600) y registro de las cuatro escenas.
- `src/scenes/`: TitleScene (titulo → ENTER), ControlsScene (controles → ENTER), GameScene (partida), ResultScene (victoria/derrota → ENTER reinicia).
- `src/objects/`: Anteater (oso fijo mirando a la derecha, hocico y "flor" creados por codigo), Tongue (lengua; colisionador solo en la punta), Bug (escarabajo con rutas predefinidas), QueenAnt (reina).
- `src/game/`: Maze (matriz del laberinto, colision por celda), MazePath (camino de la lengua por las cavidades mediante BFS cacheado).
- `src/levels/level1.js`: unico nivel: laberinto fijo 30×20 con 119 corredores y 481 paredes, entrada `{1,1}`, reina `{28,18}`.
- `src/audio/AudioController.js`: audio procedural Web Audio (musica y efectos).

## Mecanicas

- Movimiento continuo de la lengua en 4 direcciones (sin diagonales) mediante flechas, con colision contra paredes.
- Cuerpo de la lengua que sigue las cavidades del laberinto por BFS sobre la matriz de corredores (MazePath), manteniendo siempre los giros dentro de los pasillos.
- Temporizador de 60 s visible; descuento de 5 s por cada contacto independiente con un escarabajo.
- Victoria condicionada a alcanzar la reina con tiempo > 0; el tiempo restante se muestra en la pantalla de resultado.
- Reinicio completo con ENTER desde cualquier pantalla de resultado.

## Nivel

Unico nivel con laberinto fijo 30×20 (119 corredores sobre 481 celdas de muro), entrada en `{1,1}` (esquina superior izquierda) y reina en `{28,18}` (sector central-inferior). Los callejones sin salida permiten retroceder sin penalizacion, generando la decision de planificacion de ruta.

## Enemigos

Cuatro escarabajos de la misma especie, cada uno con patron de recorrido predefinido propio:

| Escarabajo | Recorrido |
|---|---|
| E1 | Fila 1, columnas 2-9 |
| E2 | Columna 21, filas 3-16 |
| E3 | Fila 13, columnas 9-25 |
| E4 | Fila 4, columnas 5-9, descendiendo por la columna 9 hasta la fila 7 |

Cada nuevo contacto descuenta 5 s una sola vez (el contacto sostenido no repetido); si el descuento lleva el tiempo a 0, la partida termina en derrota.

## Audio

Audio 100% procedural generado con Web Audio (sin archivos): bucle de musica generativo (melodia y bajo a 105 BPM), sonidos de interfaz (ENTER), golpe de escarabajo, choque contra pared (limitado para evitar repeticion excesiva) y fanfarrias de victoria y derrota. El contexto de audio se inicializa en el primer ENTER para respetar la politica de autoplay del navegador.

## Apartado visual

Toda la representacion se construye por codigo con Phaser Graphics y Text (sin imagenes). Paleta cartoon calida compartida entre pantallas: fondo de hierba, hormiguero coronado por un mound, oso hormiguero, reina, escarabajos, d-pad y tarjetas de controles, medalla con "tune" y reloj de arena en la pantalla de derrota, partitulas y tweens decorativos. En el Bloque 13 se corrigio un error de runtime (`g.translate` no existia en Graphics de Phaser 4.2.1) dibujando en coordenadas absolutas.

## Pruebas realizadas

- Build: `npm run build` exitoso (16 modulos) a lo largo de todos los bloques.
- Dev: `npm run dev` con respuestas HTTP 200 sobre index.html y los 13 modulos de `src/`.
- Navegador headless (Edge): arranque de la TitleScene sin excepciones JS en consola y captura real de 900×600; el analisis de pixeles (508 colores distintos, R media 98) confirma render grafico real de la escena.
- Headless (logica pura, scripts temporales de Node): BFS del laberinto (119/119 corredores alcanzables, camino entrada→reina de 44 pasos); MazePath (caminos validos por corredores y retroceso); simulacion de los 4 escarabajos (160 000 pasos dentro de corredores y de sus rutas); simulacion de colisiones (descuento por contacto independiente, derrota por 0, nunca negativos); replica del temporizador (60 s, sin valores negativos); replica del reinicio (estado inicial restaurado).

## Resultados

- El juego cumple logica y estructuralmente CA-01 a CA-13 de `docs/especificacion.md`: ver detalle por criterio en `docs/evidencia-pruebas.md`.
- Estado del repositorio: rama `main` con historial gestionado por el estudiante, working tree limpio; `.gitignore` correcto.
- Pendientes: ver abajo.

## Criterios de aceptacion

Los 13 criterios (CA-01 a CA-13) estan definidos en `docs/especificacion.md`. Todos tienen logica verificada; la comprobacion manual en navegador con captura/video esta pendiente (ver `docs/evidencia-pruebas.md`).

## Limitaciones / puntos pendientes

- Comprobacion manual en navegador (capturas/videos) para CA-01 a CA-13, incluida la verificacion de arranque de musica en el segundo ENTER y los efectos de sonido.
- Verificacion de que el listener de teclado no se duplica tras ciclos repetidos de ENTER (punto pendiente P1).
- Datos administrativos (materia, comision, anio) y fecha de entrega: [PENDIENTE].
- El contacto de los escarabajos se resuelve solo contra la punta de la lengua (cuerpo puramente visual): decision aprobada y documentada.

## Instrucciones de ejecucion

```
npm install
npm run dev        # servidor de desarrollo
npm run build      # build de produccion en dist/
npm run preview    # previsualizar el build
```

## Conclusion tecnica

El proyecto demuestra un ciclo completo de desarrollo de videojuego en Phaser 4.2.1 con JavaScript: diseno de especificacion, plan por bloques, implementacion por escenas/objetos, validacion dual (simulaciones headless de la logica + verificacion en navegador) y documentacion del proceso. Las decisiones de arquitectura clave fueron separar la logica pura (Maze, MazePath, rutas de Bug) del runtime de Phaser para permitir pruebas headless, y mantener graficos y audio procedurales para evitar dependencias de assets. Aprendizajes tecnicos: Phaser 4.2.1 no expone transformaciones de Graphics (`g.translate/scale/save`), y la simulacion por celdas desacoplada del motor permite verificar mecanicas de colision y rutas con alta cobertura antes de la prueba visual.