# Especificacion

## Problema

El juego academico "Captura a la Reina" requiere una mecanica de navegacion por laberinto con limite de tiempo y obstaculos moviles. El jugador debe poder controlar la lengua de un oso hormiguero dentro de un hormiguero, percibir el costo temporal de sus desiciones y completar el objetivo antes de que el tiempo se agote.

## Resultado esperado

El jugador llega a la hormiga reina antes de que el temporizador llegue a 0, esquivando o tolerando a los escarabajos, y obtiene una pantalla de victoria con el tiempo restante. Si el tiempo llega a 0, se muestra una pantalla de derrota. Desde ambas pantallas, ENTER inicia una nueva partida.

## Alcance

- Incluye: Pantalla de titulo, pantalla de controles, un unico nivel con laberinto fijo (30×20), movimiento continuo de la lengua en 4 direcciones con colision contra paredes, cuerpo de la lengua que sigue las cavidades del laberinto, temporizador de 60 segundos visible, cuatro escarabajos con patrones predefinidos propios que descuentan 5 segundos por contacto independiente, hormiga reina como meta, pantallas de victoria y derrota, reinicio con ENTER, musica y efectos de sonido procedurales (Web Audio), graficos procedurales (Phaser Graphics) y animaciones decorativas simples (tweens).
- No incluye: Multiples niveles, generacion procedural de laberintos, nuevas especies de bichos, puntuacion/ranking, vidas, power-ups, dificultad progresiva, pausa, settings, guardado, multijugador, touch, gamepad, red, autenticacion.

## Restricciones

- Tecnicas: Phaser 4.2.1, JavaScript (ES modules), Vite 7.3.6, Node.js 22.12.0, navegador web, teclado, sin assets externos.
- Operativas: `node_modules/` y `dist/` ignorados por git; no publicar sin autorizacion; no modificar `AGENTS.md`.
- De calidad: Verificacion de criterios CA-01 a CA-13 mediante `npm run dev`/`npm run build`, validaciones headless de logica y pruebas manuales en navegador.

## Casos y criterios de aceptacion

| Caso | Dado | Cuando | Entonces | Evidencia |
|---|---|---|---|---|
| Titulo | La pagina carga | Se abre la URL | Se muestra la pantalla de titulo con "Captura a la Reina" | Captura / CA-01 |
| Titulo a controles | Pantalla de titulo visible | Se presiona ENTER | Se muestra la pantalla de controles | Captura / CA-02 |
| Controles a juego | Pantalla de controles visible | Se presiona ENTER | La partida comienza de inmediato sin cuenta regresiva | Video / CA-03 |
| Movimiento | Partida en curso | Se presionan flechas 4 dir | La lengua se mueve de forma continua en 4 direcciones sin diagonal | Video / CA-04 |
| Colision pared | Lengua junto a una pared | Se intenta avanzar hacia la pared | La lengua no atraviesa la pared | Video / CA-05 |
| Laberinto fijo | Inicio de partida | Se inicia un nivel | El laberinto de 30×20 es visible, con entrada y reina fijas | Captura / CA-06 |
| Temporizador | Partida iniciada | Se entra al nivel | El temporizador muestra 60 s y cuenta hacia abajo | Video / CA-07 |
| Callejon sin salida | Lengua en callejon sin salida | Se entra al callejon | No hay derrota y la lengua puede retroceder | Video / CA-08 |
| Escarabajos | Partida en curso | La partida transcurre | Cuatro escarabajos se mueven por los pasillos con patrones predefinidos propios | Video / CA-09 |
| Colision escarabajo | Lengua toca a un escarabajo | Ocurre la colision | Se descuentan 5 s por contacto independiente; el contacto sostenido descuenta una sola vez; si el descuento lleva el tiempo a 0 la partida termina en derrota; en otro caso el escarabajo continua | Video / CA-10 |
| Derrota | Temporizador en 0 | Llega a 0 | La partida termina en derrota y se muestra la pantalla de derrota | Video / CA-11 |
| Victoria | Lengua alcanza a la reina | Con tiempo > 0 | La partida termina en victoria y se muestra el tiempo restante | Video / CA-12 |
| Reinicio | Pantalla de victoria o derrota | Se presiona ENTER | Nueva partida con 60 s, lengua en la entrada y escarabajos en estado inicial | Video / CA-13 |

## Invariantes

- La lengua nunca atraviesa paredes y su cuerpo dibujado sigue siempre los corredores del laberinto.
- El temporizador comienza en 60 en cada partida y nunca se muestra en negativo.
- El laberinto (muros, entrada, reina, posicion inicial de la lengua y de los 4 escarabajos) es identico en cada partida.
- Una partida termina solo por victoria (reina alcanzada con tiempo > 0) o por derrota (tiempo = 0).
- El oso hormiguero permanece siempre mirando a la derecha.

## Preguntas abiertas

- [PENDIENTE] No hay preguntas abiertas de diseno en este alcance. Informacion administrativa (materia, comision, anio) pendiente de confirmacion de la catedra.