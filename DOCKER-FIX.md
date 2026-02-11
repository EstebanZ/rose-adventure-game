# 🔧 Quick Fix Reference - Docker 404 Error

## El Error / The Error
```
GET http://localhost:8080/node_modules/three/build/three.module.js 
net::ERR_ABORTED 404 (Not Found)
```

## La Solución Rápida / Quick Solution

### 1. Verificar el archivo / Check the file
`docker-compose.yml` debe tener / should have:
```yaml
volumes:
  - .:/app
  - node_modules:/app/node_modules  # ✅ Named volume

volumes:
  node_modules:  # ✅ Add at the end
```

### 2. Reconstruir / Rebuild
```bash
docker compose down -v
docker compose build --no-cache dev
docker compose up dev
```

### 3. Abrir / Open
```
http://localhost:8080
```

## ¿Por qué funciona? / Why does it work?

❌ **Antes / Before**: El volumen anónimo `/app/node_modules` se perdía
✅ **Ahora / Now**: El volumen nombrado `node_modules` persiste

## Más ayuda / More help
Ver / See: [DOCKER.md](DOCKER.md)

## Comandos útiles / Useful commands

```bash
# Ver logs
docker compose logs -f dev

# Verificar que Three.js existe
docker compose exec dev ls /app/node_modules/three/build/

# Limpiar todo y empezar de nuevo
docker compose down -v && docker compose build --no-cache && docker compose up dev
```

## Estado / Status
✅ **RESUELTO / SOLVED** - El juego ahora carga correctamente con Docker
✅ **RESOLVED / SOLVED** - Game now loads correctly with Docker
