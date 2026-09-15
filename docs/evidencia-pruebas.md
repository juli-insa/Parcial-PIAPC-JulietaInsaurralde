# Evidencia de pruebas

Aplica el proceso de auditoria a la evidencia real del proyecto. Un criterio "cumplido" requiere combinacion coherente de evidencias segun su tipo.

## Tipos de evidencia usados

| Tipo | Descripcion |
|---|---|
| Headless (logica) | Scripts de Node temporales (fuera del repositorio) que ejecutan la logica pura (Maze, MazePath, level1, simulacion de Bug) sin Phaser y devuelven resultados verificables (conteos, metros, estados). |
| Build | Salida de `npm run build` exitosa (16 modulos). |
| Dev | Servidor `npm run dev` responde HTTP 200 sobre los archivos solicitados en navegador. |
| Manual pendiente | Comprobacion en navegador con capturas/videos todavia no realizada o no cargada al repositorio. |

Nota metodologica: las pruebas headless validan logica, no la representacion visual ni el comportamiento del runtime de Phaser en el navegador. Por eso los criterios de pantalla, apariencia y sonido quedan **pendientes de comprobacion manual** aunque la logica subyacente esté verificada.

## Criterios de aceptacion

| CA | Criterio | Evidencia disponible | Tipo | Estado |
|---|---|---|---|---|
| CA-01 | Al cargar la URL se muestra la pantalla de titulo con "Captura a la Reina" | Escena TitleScene registrada en main.js y renderizada al arranque; dev HTTP 200 del index.html | Dev | Logica verificada; **comprobacion visual manual pendiente** |
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
| `npm run dev` + peticiones HTTP | 200 OK sobre los archivos modificados en cada bloque |
| MazePath (BFS lengua por cavidades) | 119/119 corredores alcanzables; camino entrada→reina de 44 pasos; casos de borde cubiertos |
| Simulacion de colisiones (Bloque 11) | 4 rutas validas; 160 000 pasos; descuentos correctos y derrota por 0 |

## Pruebas manuales pendientes en navegador

1. Flujo completo con sonido: arranque de la musica en el segundo ENTER (AudioContext creado en primer ENTER).
2. Efectos de sonido: golpe de escarabajo, choque contra pared (throttle), fanfarrias de victoria y derrota.
3. Lengua dibujada siguiendo las cavidades al dar vueltas cerca de la entrada.
4. Apariencia visual de TitleScene, ControlsScene y ResultScene (decorados, tweens, medalla, reloj).
5. CA-01 a CA-13 en navegador con capturas y videos.
6. Verificacion del punto pendiente P1: listener de teclado no duplicado tras repetidos ciclos Title→Controls→Game→Result (presionar ENTER en bucle).