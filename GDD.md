# GDD simplificado

## Juego y experiencia

- Genero y situacion de juego: Juego de habilidad y laberinto en tiempo real. El jugador navega un hormiguero laberinto controlando la lengua de un oso hormiguero con el objetivo de alcanzar a la hormiga reina antes de que se agote el tiempo.
- Rol del jugador: Controla la lengua del oso hormiguero dentro del laberinto.
- Experiencia buscada: Tension por el limite de tiempo. El jugador debe planificar la ruta y decidir entre avanzar o retroceder ante un callejon sin salida, sabiendo que cada segundo cuenta y que el escarabajo le restara tiempo si lo toca.

## Comportamiento a resolver

- Entidad: La lengua del oso hormiguero dentro del laberinto.
- Problema actual: El jugador necesita navegar un laberinto con tiempo limitado y obstaculos moviles, sin retroalimentacion de error mas alla del costo temporal de cada desicion.
- Comportamiento esperado: La lengua recorre el laberinto evitando paredes, esquiva al escarabajo (o pierde 5 segundos si lo toca), y llega a la reina antes de que el temporizador llegue a 0.

## Reglas

- Estados, condiciones o eventos relevantes: Pantalla de titulo, pantalla de controles, partida en curso (con temporizador activo), victoria, derrota.
- Accion del jugador: Mover la lengua con flechas en 4 direcciones. ENTER para avanzar entre pantallas y reiniciar.
- Resultado esperado: Victoria al tocar la reina con tiempo restante. Derrota al llegar a 0 segundos.
- Caso limite: El escarabajo colisiona con la lengua cuando quedan menos de 5 segundos. El temporizador se fija en 0 y la partida termina en derrota. El tiempo nunca queda en negativo.

## Limites

- Fuera de alcance: Multiples niveles, generacion procedural de laberintos, mas tipos de bichos, sistema de puntuacion/ranking, vidas, power-ups, dificultad progresiva, pausa, settings, guardado, multijugador, touch, gamepad, audio/musica, animaciones complejas, red, autenticacion.
- Restricciones tecnicas: Phaser 4.2.1, JavaScript (ES modules), Vite, navegador web, teclado unicamente.
- Criterios de aceptacion: Ver `docs/especificacion.md` para los criterios verificables (CA-01 a CA-13).

El GDD delimita la intencion de diseno. La especificacion y el plan convierten esa intencion en una intervencion tecnica verificable.
