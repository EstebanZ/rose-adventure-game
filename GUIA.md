# 🎮 Guía de Juego - Rose Adventure Game

## 🌸 ¡Bienvenido al Mundo de Rose!

Este es un juego de aventura en 3D de mundo abierto inspirado en Rosé de BLACKPINK. Explora un hermoso mundo 3D con tu personaje protagonista.

## 🕹️ Controles del Juego

### Movimiento del Personaje
- **W** - Mover hacia adelante
- **A** - Mover hacia la izquierda
- **S** - Mover hacia atrás
- **D** - Mover hacia la derecha
- **ESPACIO** - Saltar
- **SHIFT** - Correr (velocidad doble)

### Control de Cámara
- **Click Derecho del Mouse + Arrastrar** - Rotar la vista de la cámara alrededor del personaje

## 🎨 Características del Juego

- **Personaje Protagonista**: Un personaje rosado que representa el tema de Rosé
- **Mundo Abierto**: Un terreno de 200x200 unidades para explorar libremente
- **Entorno 3D**: Árboles, rocas y terreno variado
- **Física Realista**: Sistema de gravedad y colisiones
- **Cámara en Tercera Persona**: Sigue suavemente al personaje

## 🚀 Cómo Ejecutar el Juego

### Opción 1: Con Docker (Recomendado)

Docker instala todo automáticamente. Solo ejecuta:

```bash
# Desarrollo (puerto 8080)
docker compose up dev

# Producción (puerto 80)
docker compose up prd
```

**Nota:** La primera vez descargará imágenes e instalará dependencias automáticamente.

### Opción 2: Sin Docker
```bash
# Instalar dependencias
npm install

# Iniciar el servidor
npm start

# Abrir en el navegador
# http://localhost:3000
```

## 🛠️ Tecnologías Utilizadas

- **Three.js**: Motor 3D para renderizado
- **Express**: Servidor web
- **JavaScript ES6**: Lógica del juego
- **HTML5 Canvas**: Elemento de renderizado

## 📝 Notas para Desarrolladores

### Estructura del Proyecto
```
rose-adventure-game/
├── public/          # Archivos estáticos (HTML)
├── src/             # Código fuente del juego
│   └── game.js      # Lógica principal del juego
├── server/          # Servidor Express
│   └── server.js    # Configuración del servidor
├── package.json     # Dependencias
└── docker-compose.yml # Configuración Docker
```

### Modificar el Juego

**Cambiar la velocidad del personaje:**
```javascript
// En src/game.js, línea ~16-17
this.playerSpeed = 0.15;      // Velocidad de caminar
this.playerRunSpeed = 0.3;    // Velocidad de correr
```

**Cambiar el tamaño del mundo:**
```javascript
// En src/game.js, línea ~164
const groundGeometry = new THREE.PlaneGeometry(200, 200, 50, 50);
```

**Agregar más decoraciones:**
```javascript
// En src/game.js, líneas ~184 y ~207
for (let i = 0; i < 30; i++) { // Cambiar el número de árboles
for (let i = 0; i < 40; i++) { // Cambiar el número de rocas
```

## 🎯 Próximas Características Planeadas

- [ ] Añadir música de fondo
- [ ] Implementar sistema de misiones/trivias
- [ ] Agregar más personajes o NPCs
- [ ] Mejoras en el modelo del personaje
- [ ] Soporte para dispositivos móviles táctiles
- [ ] Sistema de puntuación
- [ ] Guardado del progreso

## 💖 Créditos

Creado con amor por Esteban y Milena para aprender y divertirse programando.
Inspirado en Rosé de BLACKPINK.

---

¡Disfruta explorando el mundo de Rose Adventure! 🌸✨
