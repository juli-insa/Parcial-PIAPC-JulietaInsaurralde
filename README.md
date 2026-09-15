# Plantilla PIAPC para repositorios individuales

Esta plantilla prepara un repositorio publico e individual para proyectos academicos de videojuegos. Es independiente del motor, lenguaje y tipo de juego.

## Como usarla

1. Crea un repositorio individual desde esta plantilla y conserva el commit inicial.
2. Completa los datos de este archivo y de `GDD.md` cuando la consigna defina el problema de diseno.
3. Agrega el proyecto creado con el motor elegido, sin mezclar archivos de otros motores.
4. Incorpora al `.gitignore` las reglas oficiales o recomendadas para ese motor.
5. Completa los documentos de `docs/` en el orden indicado por `docs/README.md`.
6. Conserva commits pequenos y revisables durante el desarrollo.

## Datos del proyecto

- Estudiante: Julieta Insaurralde
- Materia, comision y anio: [PENDIENTE]
- Nombre del proyecto: Captura a la Reina
- Motor y version: Phaser 4.2.1
- Estado: En desarrollo

## Descripcion

El jugador controla la lengua de un oso hormiguero que se introduce dentro de un hormiguero con estructura de laberinto. El objetivo es recorrer correctamente el laberinto y llegar hasta la hormiga reina antes de que se agote el tiempo. Existe un escarabajo que actua como obstaculo; al tocarlo se descuentan 5 segundos del temporizador. El tiempo representa el efecto del veneno de las hormigas sobre el oso.

## Requisitos y ejecucion

- Motor: Phaser 4.2.1
- Build tool: Vite
- Plataforma: navegador web
- Lenguaje: JavaScript (ES modules)
- Requisitos: Node.js >= 18, npm

Pasos:
1. Clonar el repositorio
2. Ejecutar `npm install`
3. Ejecutar `npm run dev` para iniciar el servidor de desarrollo
4. Abrir la URL mostrada en el navegador (por defecto `http://localhost:5173`)

## Controles

- Flechas ↑ ↓ ← →: mover la lengua en 4 direcciones
- ENTER: avanzar entre pantallas, reiniciar partida
- No se permite movimiento diagonal

## Creditos

[TODAVIA NO HAY ASSETS DECLARADOS]

## Entrega o demostracion

[PENDIENTE]
