# Evidencia de pruebas

Aplica el proceso de auditoria a la evidencia real del proyecto. Un criterio "cumplido" requiere combinacion coherente de evidencias segun su tipo.

## Tipos de evidencia usados

| Tipo | Descripcion |
|---|---|
| Headless (logica) | Scripts de Node temporales (fuera del repositorio) que ejecutan la logica pura (Maze, MazePath, level1, simulacion de Bug) sin Phaser y devuelven resultados verificables (conteos, metros, estados). |
| Build | Salida de `npm run build` exitosa (16 modulos). |
| Dev | Servidor `npm run dev` responde HTTP 200 sobre los archivos solicitados en navegador. |
| Bootstrap headless en navegador | Edge en modo headless carga la app servida por `npm run dev` y se inspecciona la consola en el arranque: sin excepciones JS. No requiere entrada de teclado (TitleScene dibuja sola al cargar). |
| Captura headless (analisis de pixeles) | PNG 900×600 obtenido del navegador headless; se comprueba por muestreo de pixeles (colores distintos, luminancia, desvio) que la escena renderiza contenido grafico real y no una pagina en blanco. No permite leer texto ni juzgar estetica ni sonido. |
| Manual pendiente | Comprobacion en navegador con capturas/videos todavia no realizada o no cargada al repositorio: requiere interaccion con teclado, oido y vista humanos. |

Nota metodologica: las pruebas headless validan logica y render, no el comportamiento interactivo completo del juego. Por eso los criterios de pantalla, apariencia y sonido quedan **pendientes de comprobacion manual** aunque la logica subyacente esté verificada.

## Criterios de aceptacion

| CA | Criterio | Evidencia disponible | Tipo | Estado |
|---|---|---|---|---|
| CA-01 | Al cargar la URL se muestra la pantalla de titulo con "Captura a la Reina" | Escena TitleScene registrada en main.js y renderizada al arranque; dev HTTP 200 del index.html; arranque en Edge headless sin excepciones JS; captura real de 900×600 con 508 colores distintos (33 750 muestras) y R media 98 → **render confirmado objetivamente** | Dev + Bootstrap headless + Captura | Render de la TitleScene confirmado; lectura del texto y valoracion estetica: **comprobacion visual manual pendiente** |
| CA-02 | ENTER en titulo lleva a controles | Flujo `TitleScene → ControlsScene` en escenas; sonido inicial (AudioController.init) enganchado al ENTER | Dev | Logica verificada; **comprobacion manual pendiente** |
| CA-03 | ENTER en controles inicia la partida sin cuenta regresiva | GameScene inicia `create` directamente al pasar de ControlsScene | Dev | Logica verificada; **comprobacion manual pendiente** |
| CA-04 | Movimiento continuo en 4 direcciones sin diagonal | Tongue.update usa 4 teclas exclusivas y velocidad constante 220 px/s; telepono de direcciones determinadas por flecha; la logica de retroceso y avance por cavidades validada en MazePath (119/119) | Headless (logica de rutas) + codigo | Logica verificada; **comprobacion manual pendiente** |
| CA-05 | La lengua no atraviesa paredes | Colision por celda (GameScene.canPlace) contra paredes; MazePath verifica que todo camino usado pasa por corredores libres; en la simulacion headless de escarabajos 160 000 pasos permanecieron en corredores | Headless (logica) | Logica verificada; **comprobacion manual pendiente** |
| CA-06 | Laberinto 30×20 fijo visible con entrada y reina | level1.matar: 30×20 (119 corredores / 481 paredes), entrada fija `{1,1}` y reina fija `{28,18}`; BFS headless alcanza todos los corredores y calcula el camino a la reina (44) | Headless (logica) | Logica verificada; **captura del render manual pendiente** |
| CA-07 | Temporizador muestra 60 s y cuenta hacia abajo | Replica headless del update del timer: 60 s iniciales, decremento por frame/time, nunca negativo, derrota en 0 | Headless (logica) | Logica verificada; **video manual pendiente** |
| CA-08 | Callejon sin salida no derrota y permite retroceder | Dead ends del nivel = 10; BFS reversible (si hay camino dentada→X hay camino X→dentrada); MazePath permite retroceder sobre la ruta | Headless (logica) | Logica verificada; **comprobacion manual pendiente** |
| CA-09 | Cuatro escarabajos patrullan los pasillos con rutas propias | Bug.ROUTES: R1 (fila 1, cols 2-9), R2 (col 21, filas 3-16), R3 (fila 13, cols 9-25), R4 (fila 4, cols 5-9 + bajada); simulacion headless 160 000 pasos: todos permanecen en corredores y en sus rutas | Headless (logica) | Logica verificada; **video manual pendiente** |
| CA-10 | Colision con escarabajo descuenta 5 s por contacto independiente y nunca deja el tiempo en negativo | Simulacion headless: contacto sostenido = 1 descuento; recontacto = nuevo descuento; destructivo llevar a 0 = derrota inmediata; nunca negativos | Headless (logica) | **Verificado (headless)**; video manual pendiente |
| CA-11 | Derrota por tiempo = 0 | Replica headless del update: al llegar a 0 se finaliza la partida como derrota | Headless (logica) | Logica verificada; **video manual pendiente** |
| CA-12 | Victoria al alcanzar la reina con tiempo restante | Logica de GameScene (victoryChecked, t > 0); ResultScene muestra `timeRemaining.toFixed(1)` | Codigo | Logica verificada; **video manual pendiente** |
| CA-13 | Reinicio con ENTER con 60 s y estado inicial | Replica headless: al reiniciar se restablecen 60 s, escarabajos en posicion inicial, contacto auxiliario vacio, TILE constante | Headless (logica) | Logica verificada; **comprobacion manual pendiente** |

## Otras verificaciones realizadas

| Verificacion | Resultado |
|---|---|
| `npm run build` | OK, 16 modulos, sin errores |
| `npm run dev` + peticiones HTTP | 200 OK sobre index.html y los 13 modulos de `src/` (escenas, objetos, game, levels, audio) |
| Arranque en Edge headless (TitleScene) | Sin excepciones JS en la consola del navegador durante la carga |
| Captura headless de TitleScene | PNG 900×600; 508 colores distintos en 33 750 muestras; R media 98,1; desvio 39,8 (una pagina en blanco daria ~1 color) → render grafico real |
| MazePath (BFS lengua por cavidades) | 119/119 corredores alcanzables; camino entrada→reina de 44 pasos; casos de borde cubiertos |
| Simulacion de colisiones (Bloque 11) | 4 rutas validas; 160 000 pasos; descuentos correctos y derrota por 0 |

## Pruebas manuales pendientes en navegador

Protocolo a ejecutar por una persona en `npm run dev` → abrir `http://localhost:5173/`. Marcar el resultado y adjuntar la captura/video indicada para completar la evidencia de los criterios.

| # | Que hacer | Resultado esperado | CA asociado | Registro recomendado | Resultado |
|---|---|---|---|---|---|
| 1 | Cargar la URL y revisar la pantalla de titulo | Se ve "Captura a la Reina" y la escena decorada (mound, reina, oso, particulas, pulso) | CA-01 | Captura TitleScene | [PENDIENTE] |
| 2 | Presionar ENTER en el titulo | Pasa a pantalla de controles; arranca la musica (AudioContext creado en el primer ENTER) | CA-02 + audio | Captura ControlsScene + audio | [PENDIENTE] |
| 3 | Presionar ENTER en controles | La partida inicia de inmediato, sin cuenta regresiva; musica continua | CA-03 | Captura inicio de partida | [PENDIENTE] |
| 4 | Mover con flechas ↑ ↓ ← → | La lengua se mueve de forma continua y solo en las 4 direcciones; **sin diagonal al combinar teclas** | CA-04 | Video breve | [PENDIENTE] |
| 5 | Acercar la lengua a una pared e intentar avanzar | La lengua no atraviesa la pared | CA-05 | Video | [PENDIENTE] |
| 6 | Recorrer el laberinto (incluido dar vueltas cerca de la entrada) y llegar hasta la reina | Laberinto 30×20 visible; entrada y reina en posiciones fijas; la lengua dibujada sigue las cavidades en las curvas; al entrar en un callejon sin salida la lengua puede retroceder sin perder la partida | CA-06, CA-08 | Captura laberinto completo + video | [PENDIENTE] |
| 7 | Observar el timer | Muestra 60 s y desciende sin saltos ni valores negativos | CA-07 | Video | [PENDIENTE] |
| 8 | Observar los 4 escarabajos ~30 s | Los 4 patrullan sus corredores (fila 1 cols 2-9; col 21 filas 3-16; fila 13 cols 9-25; fila 4 cols 5-9 y bajada) | CA-09 | Video | [PENDIENTE] |
| 9 | Tocar a un escarabajo y mantener contacto | Descuenta 5 s **una sola vez** hasta que la lengua se separa; al volver a tocar descuenta de nuevo; si el descuento lleva el timer a 0, derrota inmediata | CA-10 | Video | [PENDIENTE] |
| 10 | Dejar que el timer llegue a 0 | Pantalla de derrota (reloj, hormiguero vacio) | CA-11 | Captura + video | [PENDIENTE] |
| 11 | Volver a jugar y llegar a la reina con tiempo > 0 | Pantalla de victoria con el tiempo restante | CA-12 | Captura + video | [PENDIENTE] |
| 12 | Desde victoria o derrota, presionar ENTER | Nueva partida con 60 s, lengua en la entrada y escarabajos en estado inicial | CA-13 | Video | [PENDIENTE] |
| 13 | Repetir varias veces el ciclo Title→Controls→Game→Result, presionando ENTER en bucle rapido | La partida se reinicia correctamente y el juego no pierde capacidad de respuesta; sin comportamientos duplicados | CA-13 + **P1** (listener de teclado) | Video del ciclo repetido | [PENDIENTE] |
| 14 | Revisar sonido en todo el flujo | Musica continuando tras el segundo ENTER; efectos: clic de ENTER, golpe de escarabajo, choque contra pared (sin repeticion excesiva), fanfarrias de victoria y derrota | audio | Grabar con audio | [PENDIENTE] |
| 15 | Revisar estetica de Title, Controls, Game y Result | Coherencia visual (fondo, paleta cartoon, decorados, medalla/reloj, d-pad) | CA-01 a CA-03, CA-11 a CA-13 | Capturas de las 4 escenas | [PENDIENTE] |

Puede darse por completada la comprobacion manual cuando todos los "Resultado" queden como "OK (con evidencia adjunta)".

### Pendientes de cierre (no son pruebas)

- Datos administrativos para `README.md`, `docs/informe-final.md`, `docs/auditoria-repositorio.md`: materia, comision y anio.
- Fecha y modalidad de entrega en `README.md`.
- Confirmar en la plataforma el texto de entrega (URL del repo, hash del commit evaluable, herramienta/modelo, comandos validados y declaracion de privacidad).