# Especificacion

## Problema

El juego academico "Captura a la Reina" requiere una mecánica de navegación por laberinto con limite de tiempo y obstaculos moviles. El jugador debe poder controlar la lengua de un oso hormiguero dentro de un hormiguero, percibir el costo temporal de sus desiciones y completar el objetivo antes de que el tiempo se agote.

## Resultado esperado

El jugador llega a la hormiga reina antes de que el temporizador llegue a 0, esquivando o tolerando al escarabajo, y obtiene una pantalla de victoria con el tiempo restante. Si el tiempo llega a 0, se muestra una pantalla de derrota. Desde ambas pantallas, ENTER inicia una nueva partida.

## Alcance

- Incluye: Pantalla de titulo, pantalla de controles, un unico nivel con laberinto fijo, movimiento continuo de la lengua en 4 direcciones con colision contra paredes, temporizador de 60 segundos visible, un escarabajo con patron predefinido que descuenta 5 segundos al ser tocado, hormiga reina como meta, pantallas de victoria y derrota, reinicio con ENTER.
- No incluye: Multiples niveles, generacion procedural, mas bichos, puntuacion/ranking, vidas, power-ups, dificultad progresiva, pausa, settings, guardado, multijugador, touch, gamepad, audio, animaciones complejas, red, autenticacion.

## Restricciones

- Tecnicas: Phaser 4.2.1, JavaScript (ES modules), Vite como build tool, navegador web, teclado.
- Operativas: `node_modules/` y `dist/` ignorados por git; no publicar sin autorizacion; no modificar `AGENTS.md`.
- De calidad: Verificacion de criterios CA-01 a CA-13 mediante `npm run dev` y pruebas manuales en navegador.

## Casos y criterios de aceptacion

| Caso | Dado | Cuando | Entonces | Evidencia |
|---|---|---|---|---|
| Titulo | La pagina carga | Se abre la URL | Se muestra la pantalla de titulo con "Captura a la Reina" | Captura / CA-01 |
| Titulo a controles | Pantalla de titulo visible | Se presiona ENTER | Se muestra la pantalla de controles | Captura / CA-02 |
| Controles a juego | Pantalla de controles visible | Se presiona ENTER | La partida comienza de inmediato sin cuenta regresiva | Video / CA-03 |
| Movimiento | Partida en curso | Se presionan flechas 4 dir | La lengua se mueve de forma continua en 4 direcciones sin diagonal | Video / CA-04 |
| Colision pared | Lengua junto a una pared | Se intenta avanzar hacia la pared | La lengua no atraviesa la pared | Video / CA-05 |
| Laberinto fijo | Inicio de partida | Se inicia un nivel | El laberinto completo es visible con entrada y reina fijas | Captura / CA-06 |
| Temporizador | Partida iniciada | Se entra al nivel | El temporizador muestra 60 s y cuenta hacia abajo | Video / CA-07 |
| Callejon sin salida | Lengua en callejon sin salida | Se entra al callejon | No hay derrota y la lengua puede retroceder | Video / CA-08 |
| Escarabajo | Partida en curso | La partida transcurre | Al menos un escarabajo se mueve por un pasillo con patron predefinido | Video / CA-09 |
| Colision escarabajo | Lengua toca al escarabajo | Ocurre la colision | Se descuentan 5 s (si quedan menos de 5 s se fija en 0); sin derrota inmediata; el escarabajo continua | Video / CA-10 |
| Derrota | Temporizador en 0 | Llega a 0 | La partida termina en derrota y se muestra la pantalla de derrota | Video / CA-11 |
| Victoria | Lengua alcanza a la reina | Con tiempo > 0 | La partida termina en victoria y se muestra el tiempo restante | Video / CA-12 |
| Reinicio | Pantalla de victoria o derrota | Se presiona ENTER | Nueva partida con 60 s, lengua en la entrada y escarabajo en estado inicial | Video / CA-13 |

## Invariantes

- La lengua nunca atraviesa paredes.
- El temporizador comienza en 60 en cada partida y nunca se muestra en negativo.
- El laberinto (muros, entrada, reina, posicion inicial de la lengua y del escarabajo) es identico en cada partida.
- Una partida termina solo por victoria (reina alcanzada con tiempo > 0) o por derrota (tiempo = 0).

## Preguntas abiertas

- [PENDIENTE] No hay preguntas abiertas de diseno en este alcance. Informacion administrativa (materia, comision, anio) pendiente de confirmacion de la catedra.
