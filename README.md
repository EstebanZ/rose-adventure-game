# BP-Game

A web-based 3D adventure game inspired by Blackpink, centered on Rose. Features single-player exploration of recreated music video scenarios, interactive trivia about the band/Rose, and music-based challenges using rhythm and audio synchronization.

## Setup

Ensure Docker is installed on your system.

## Run

### Development

```bash
docker-compose up dev
```

Open `http://localhost:8080` in your browser.

### Production

```bash
docker-compose up prd
```

Open `http://localhost` in your browser.

## Dev Workflow

- Add assets (images, audio) to `public/assets/`.
- Update game logic in `src/`.
- Server code in `server/`.
- This README will be updated constantly as the project evolves.

## Features

- 3D scenes with Babylon.js
- Trivia system with questions about Rose/Blackpink
- Audio integration: Howler.js for background music, Tone.js for rhythm challenges
- i18n support for multiple languages
- Basic server with Express and Socket.io (ready for multiplayer expansion)

## TODO

- Add more trivia questions and UI
- Implement full music challenge mechanics
- Add real audio files and textures
- Expand to multiplayer features
- Optimize for mobile

(This README will be updated frequently.)
