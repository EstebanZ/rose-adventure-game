# 🐳 Docker Setup - Rose Adventure Game

## Problema Resuelto / Problem Solved

### El Problema / The Problem
Cuando se ejecutaba el juego con Docker, aparecía el siguiente error:
```
GET http://localhost:8080/node_modules/three/build/three.module.js net::ERR_ABORTED 404 (Not Found)
```

When running the game with Docker, this error appeared:
```
GET http://localhost:8080/node_modules/three/build/three.module.js net::ERR_ABORTED 404 (Not Found)
```

### La Causa / The Root Cause
El problema era que en `docker-compose.yml`, la configuración de volúmenes no preservaba correctamente el directorio `node_modules` del contenedor:

The problem was that in `docker-compose.yml`, the volume configuration didn't properly preserve the container's `node_modules` directory:

```yaml
# ANTES / BEFORE (❌ No funcionaba / Didn't work)
volumes:
  - .:/app
  - /app/node_modules  # Anonymous volume - se perdía / would get lost
```

### La Solución / The Solution
Se cambió a un volumen nombrado que persiste correctamente:

Changed to a named volume that persists properly:

```yaml
# DESPUÉS / AFTER (✅ Funciona / Works!)
volumes:
  - .:/app
  - node_modules:/app/node_modules  # Named volume - se preserva / is preserved

volumes:
  node_modules:  # Declaración del volumen / Volume declaration
```

## Cómo Usar Docker / How to Use Docker

### Desarrollo / Development
```bash
docker compose up dev
```
- Puerto / Port: 8080
- Hot reload activado / Hot reload enabled
- Abrir / Open: http://localhost:8080

### Producción / Production
```bash
docker compose up prd
```
- Puerto / Port: 80
- Optimizado / Optimized
- Abrir / Open: http://localhost

## Comandos Útiles / Useful Commands

### Construir sin cache / Build without cache
```bash
docker compose build --no-cache dev
```

### Ver logs / View logs
```bash
docker compose logs -f dev
```

### Detener servicios / Stop services
```bash
docker compose down
```

### Limpiar volúmenes / Clean volumes
```bash
docker compose down -v
```

### Reconstruir todo / Rebuild everything
```bash
docker compose down -v
docker compose build --no-cache
docker compose up dev
```

## Verificación / Verification

Para verificar que el setup está correcto:
To verify the setup is correct:

```bash
./test-docker.sh
```

## Estructura de Volúmenes / Volume Structure

### Antes del Fix / Before the Fix (❌)
```
Host Machine              Docker Container
    |                           |
    ├── package.json ──────────> /app/package.json
    ├── src/ ──────────────────> /app/src/
    ├── public/ ───────────────> /app/public/
    └── (no node_modules) ────> /app/node_modules (❌ VACÍO / EMPTY)
                                     |
                                     └── three/ (❌ NO EXISTE / DOESN'T EXIST)
```

### Después del Fix / After the Fix (✅)
```
Host Machine              Docker Container         Named Volume
    |                           |                         |
    ├── package.json ──────────> /app/package.json       |
    ├── src/ ──────────────────> /app/src/               |
    ├── public/ ───────────────> /app/public/            |
    └── (no node_modules)       /app/node_modules <──────┘
                                     |                    (Persisted)
                                     └── three/ (✅ EXISTE / EXISTS)
                                         └── build/
                                             └── three.module.js ✅
```

### Detalles / Details

```
Container:
/app
├── node_modules/        ← Named volume (persisted)
│   └── three/
│       └── build/
│           └── three.module.js  ← Este archivo ahora existe / This file now exists
├── public/              ← From host (hot reload)
├── src/                 ← From host (hot reload)
└── server/              ← From host (hot reload)
```

## Troubleshooting

### Si el error persiste / If the error persists:

1. **Limpiar y reconstruir / Clean and rebuild:**
```bash
docker compose down -v
docker compose build --no-cache dev
docker compose up dev
```

2. **Verificar que Three.js está instalado / Verify Three.js is installed:**
```bash
docker compose exec dev ls -la /app/node_modules/three/build/
```

3. **Ver logs del servidor / View server logs:**
```bash
docker compose logs -f dev
```

4. **Verificar la configuración / Verify configuration:**
```bash
docker compose config
```

## Notas Técnicas / Technical Notes

- El volumen nombrado `node_modules` se crea automáticamente / The named volume `node_modules` is created automatically
- Los cambios en el código se reflejan inmediatamente (dev) / Code changes are reflected immediately (dev)
- El volumen persiste entre reinicios / The volume persists between restarts
- Para reset completo, usar `docker compose down -v` / For complete reset, use `docker compose down -v`
