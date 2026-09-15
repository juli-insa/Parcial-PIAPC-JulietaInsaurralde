# GDD simplificado

## Juego y experiencia

- Genero y situacion de juego: Juego de habilidad y laberinto en tiempo real. El jugador navega un hormiguero laberinto de 30×20 controlando la lengua de un oso hormiguero con el objetivo de alcanzar a la hormiga reina antes de que se agote el tiempo.
- Rol del jugador: Controla la lengua del oso hormiguero dentro del laberinto.
- Experiencia buscada: Tension por el limite de tiempo. El jugador debe planificar la ruta y decidir entre avanzar o retroceder ante un callejon sin salida, sabiendo que cada segundo cuenta y que los escarabajos le restaran tiempo si los toca.

## Comportamiento a resolver

- Entidad: La lengua del oso hormiguero dentro del laberinto.
- Problema resuelto: El jugador navega un laberinto con tiempo limitado y obstaculos moviles, con retroalimentacion temporal (descuento de 5 s por contacto) ademas del costo temporal de cada decision.
- Comportamiento esperado: La lengua recorre el laberinto siguiendo las cavidades y evitando paredes, esquiva a los cuatro escarabajos (o pierde 5 segundos si toca a uno), y llega a la reina antes de que el temporizador llegue a 0.

## Reglas

- Estados, condiciones o eventos relevantes: Pantalla de titulo, pantalla de controles, partida en curso (con temporizador activo), victoria, derrota.
- Accion del jugador: Mover la lengua con flechas en 4 direcciones (sin diagonales). ENTER para avanzar entre pantallas y reiniciar.
- Escarabajos: Hay 4 escarabajos, cada uno con un recorrido predefinido propio y distribuido en distintos sectores del laberinto. Cada nuevo contacto con un escarabajo descuenta 5 segundos; el contacto sostenido descuenta una sola vez hasta que la lengua se separa y vuelve a contactar.
- Resultado esperado: Victoria al tocar la reina con tiempo restante. Derrota al llegar a 0 segundos.
- Caso limite: La lengua colisiona con un escarabajo cuando quedan menos de 5 segundos. El temporizador se fija en 0 y la partida termina en derrota. El tiempo nunca queda en negativo.

## Limites

- Fuera de alcance: Multiples niveles, generacion procedural de laberintos, nuevas especies de bichos, sistema de puntuacion/ranking, vidas, power-ups, dificultad progresiva, pausa, settings, guardado, multijugador, touch, gamepad, red, autenticacion.
  - Nota historica: `audio/musica` y `animaciones complejas` estuvieron originalmente fuera de alcance y luego se incorporaron (con autorizacion) en la fase final: el juego cuenta con musica y efectos de sonido procedurales (Web Audio) y animaciones decorativas simples (tweens) en las pantallas.
- Restricciones tecnicas: Phaser 4.2.1, JavaScript (ES modules), Vite 7.3.6, Node.js 22.12.0, navegador web, teclado unicamente, sin assets externos (graficos y audio generados por codigo).
- Criterios de aceptacion: Ver `docs/especificacion.md` para los criterios verificables (CA-01 a CA-13).

El GDD delimita la intencion de diseno. La especificacion y el plan convierten esa intencion en una intervencion tecnica verificable.