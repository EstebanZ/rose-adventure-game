# Copilot Instructions for BP-Game

## Project Overview
BP-Game is a web-based 3D adventure game inspired by Blackpink, centered on member Rose. It features single-player exploration of recreated music video scenarios, interactive trivia about the band/Rose, and music-based challenges using rhythm and audio synchronization.

## Architecture
- **Frontend (3D Engine)**: Babylon.js for 3D scenes, cameras, lighting, and meshes. Scenes are built in `src/game.js` with modular functions for preload, create, and update.
- **Audio System**: Howler.js for background music and sound effects; Tone.js for rhythm challenges and synthesis (e.g., note sequences in `startMusicChallenge`).
- **Trivia System**: Vanilla JS arrays for questions (e.g., `triviaQuestions` in `src/game.js`), integrated with Babylon.js actions for UI triggers.
- **Backend**: Node.js with Express and Socket.io for server-side logic and potential multiplayer expansion.
- **Data Flow**: User interactions (clicks on meshes) trigger trivia or challenges; audio state managed via Howler/Tone; progress stored locally or via future DB.
- **Key Files**:
  - `public/index.html`: Canvas setup and script imports.
  - `src/game.js`: Core game logic, scene creation, and integrations.
  - `server/server.js`: Server for hosting and real-time features.

## Developer Workflows
- **Build/Run**: `npm install` for dependencies; `node server/server.js` to start local server; open `http://localhost:3000` in browser.
- **Debugging**: Use browser dev tools for 3D rendering; console logs in `game.js` for trivia/audio states; Babylon.js Inspector (enable via `scene.debugLayer.show()`) for scene debugging.
- **Testing**: Manual playtesting for mechanics; no automated tests yet—focus on validating trivia answers and audio timing in `startMusicChallenge`.
- **Assets**: Place images/audio in `public/assets/`; load via Babylon.js Texture/Howl src paths.

## Conventions and Patterns
- **3D Models/Scenes**: Use MeshBuilder for primitives (e.g., spheres for placeholders); import GLTF for complex models via `SceneLoader.ImportMesh`.
- **Audio Integration**: Initialize Tone.js with `await Tone.start()` for user gesture compliance; use Howl for loops and volume control.
- **Trivia Logic**: Store questions as objects with `question`, `options`, `answer` index; trigger via Babylon.js `ActionManager` on mesh picks.
- **Modular Code**: Keep game logic in `src/` with ES6 imports; avoid global variables—use scene objects for state.
- **Mobile Optimization**: Enable camera controls with `camera.attachControls(canvas, true)`; test on devices for WebGL performance.

## Dependencies and Integrations
- **Core Libs**: Babylon.js (3D), Howler.js (audio), Tone.js (music synthesis)—install via npm.
- **External APIs**: None yet; potential for Spotify API for real tracks (respect copyrights).
- **Cross-Component**: Trivia and audio tied to scene interactions; server for future multiplayer (e.g., shared challenges via Socket.io).

## Best Practices
- Always preload assets in `preload` function to avoid runtime lags.
- For music challenges, schedule Tone.js events with `Tone.Transport` for precise timing.
- Validate trivia answers client-side; expand to server for anti-cheat if multiplayer.
- Reference Babylon.js docs for advanced features like physics (via Cannon.js plugin).

## i18n Requirements
The project requires internationalization (i18n) support for easy translation to multiple languages. Extract key strings (e.g., trivia questions, UI texts) to a separate file like `src/i18n.js` using objects per language. Example: `const strings = { es: { welcome: "¡Bienvenido!" }, en: { welcome: "Welcome!" } };`. Implement language switching in the game UI.