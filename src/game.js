// Rose Adventure Game - Main Game Logic
// 3D Open World with Character Movement using Three.js
import * as THREE from 'three';

class RoseAdventureGame {
    constructor() {
        this.canvas = document.getElementById('renderCanvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.player = null;
        this.ground = null;
        
        // Movement state
        this.inputMap = {};
        this.playerSpeed = 0.15;
        this.playerRunSpeed = 0.3;
        this.playerJumpPower = 0.3;
        this.gravity = -0.015;
        this.playerVelocity = new THREE.Vector3(0, 0, 0);
        this.isGrounded = false;
        this.isRunning = false;
        
        // Camera settings
        this.cameraConfig = {
            distance: 10,
            height: 5,
            angle: 0
        };
        
        this.init();
    }

    async init() {
        await this.createScene();
        this.setupInputs();
        this.startGameLoop();
        
        // Hide loading screen
        document.getElementById('loading').classList.add('hidden');
    }

    async createScene() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Sky blue
        this.scene.fog = new THREE.FogExp2(0xB0D8F0, 0.008);
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        
        // Create lighting
        this.createLights();
        
        // Create player character
        this.createPlayer();
        
        // Create open world environment
        this.createEnvironment();
        
        // Position camera
        this.updateCamera();
    }

    createLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Directional light (sun)
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(50, 50, 50);
        dirLight.castShadow = true;
        dirLight.shadow.camera.left = -50;
        dirLight.shadow.camera.right = 50;
        dirLight.shadow.camera.top = 50;
        dirLight.shadow.camera.bottom = -50;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        this.scene.add(dirLight);
    }

    createPlayer() {
        // Create player group
        this.player = new THREE.Group();
        
        // Player body (capsule shape using cylinder + spheres)
        const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 16);
        const bodyMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xff66b3,  // Pink
            metalness: 0.3,
            roughness: 0.7
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.castShadow = true;
        body.receiveShadow = true;
        this.player.add(body);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.4, 16, 16);
        const headMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffccdd,  // Light pink
            metalness: 0.2,
            roughness: 0.8
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.3;
        head.castShadow = true;
        head.receiveShadow = true;
        this.player.add(head);
        
        // Face direction indicator
        const faceGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.3);
        const faceMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const face = new THREE.Mesh(faceGeometry, faceMaterial);
        face.position.set(0, 1.3, 0.45);
        face.castShadow = true;
        this.player.add(face);
        
        // Position player
        this.player.position.set(0, 2, 0);
        this.scene.add(this.player);
    }

    createEnvironment() {
        // Create large ground for open world
        const groundGeometry = new THREE.PlaneGeometry(200, 200, 50, 50);
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4CAF50,  // Grass green
            metalness: 0.0,
            roughness: 0.9
        });
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        this.ground.rotation.x = -Math.PI / 2;
        this.ground.receiveShadow = true;
        
        // Add terrain variation
        const positions = groundGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const z = positions.getZ(i);
            positions.setZ(i, z + Math.random() * 2);
        }
        positions.needsUpdate = true;
        groundGeometry.computeVertexNormals();
        
        this.scene.add(this.ground);
        
        // Add decorations
        this.createDecorations();
    }

    createDecorations() {
        // Create trees
        for (let i = 0; i < 30; i++) {
            const x = (Math.random() - 0.5) * 180;
            const z = (Math.random() - 0.5) * 180;
            
            // Skip if too close to player spawn
            if (Math.abs(x) < 10 && Math.abs(z) < 10) continue;
            
            // Tree trunk
            const trunkGeometry = new THREE.CylinderGeometry(0.4, 0.5, 4, 8);
            const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
            const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
            trunk.position.set(x, 2, z);
            trunk.castShadow = true;
            trunk.receiveShadow = true;
            this.scene.add(trunk);
            
            // Tree foliage
            const foliageGeometry = new THREE.SphereGeometry(2, 8, 8);
            const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
            const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
            foliage.position.set(x, 5, z);
            foliage.castShadow = true;
            foliage.receiveShadow = true;
            this.scene.add(foliage);
        }
        
        // Create rocks
        for (let i = 0; i < 40; i++) {
            const x = (Math.random() - 0.5) * 180;
            const z = (Math.random() - 0.5) * 180;
            
            if (Math.abs(x) < 10 && Math.abs(z) < 10) continue;
            
            const rockGeometry = new THREE.DodecahedronGeometry(Math.random() * 1.2 + 0.4);
            const rockMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x808080,
                metalness: 0.1,
                roughness: 0.95
            });
            const rock = new THREE.Mesh(rockGeometry, rockMaterial);
            rock.position.set(x, 0.5, z);
            rock.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            rock.castShadow = true;
            rock.receiveShadow = true;
            this.scene.add(rock);
        }
    }

    setupInputs() {
        // Keyboard input handling
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            this.inputMap[key] = true;
            
            if (e.key === 'Shift') {
                this.isRunning = true;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();
            this.inputMap[key] = false;
            
            if (e.key === 'Shift') {
                this.isRunning = false;
            }
        });
        
        // Mouse movement for camera rotation
        let isMouseDown = false;
        let lastMouseX = 0;
        
        this.canvas.addEventListener('mousedown', (e) => {
            if (e.button === 2) { // Right click
                isMouseDown = true;
                lastMouseX = e.clientX;
            }
        });
        
        this.canvas.addEventListener('mouseup', () => {
            isMouseDown = false;
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            if (isMouseDown) {
                const deltaX = e.clientX - lastMouseX;
                this.cameraConfig.angle -= deltaX * 0.005;
                lastMouseX = e.clientX;
            }
        });
        
        // Prevent context menu on right click
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    updatePlayerMovement() {
        if (!this.player) return;
        
        // Calculate movement direction based on camera angle
        const forward = new THREE.Vector3(
            Math.sin(this.cameraConfig.angle),
            0,
            Math.cos(this.cameraConfig.angle)
        );
        const right = new THREE.Vector3(
            Math.cos(this.cameraConfig.angle),
            0,
            -Math.sin(this.cameraConfig.angle)
        );
        
        // Calculate movement
        let moveDirection = new THREE.Vector3(0, 0, 0);
        
        if (this.inputMap['w']) {
            moveDirection.add(forward);
        }
        if (this.inputMap['s']) {
            moveDirection.add(forward.clone().multiplyScalar(-1));
        }
        if (this.inputMap['a']) {
            moveDirection.add(right.clone().multiplyScalar(-1));
        }
        if (this.inputMap['d']) {
            moveDirection.add(right);
        }
        
        // Normalize diagonal movement
        if (moveDirection.length() > 0) {
            moveDirection.normalize();
            
            // Apply speed
            const speed = this.isRunning ? this.playerRunSpeed : this.playerSpeed;
            this.playerVelocity.x = moveDirection.x * speed;
            this.playerVelocity.z = moveDirection.z * speed;
            
            // Rotate player to face movement direction
            const angle = Math.atan2(moveDirection.x, moveDirection.z);
            this.player.rotation.y = angle;
        } else {
            // Decelerate
            this.playerVelocity.x *= 0.8;
            this.playerVelocity.z *= 0.8;
        }
        
        // Jump handling
        if (this.inputMap[' '] && this.isGrounded) {
            this.playerVelocity.y = this.playerJumpPower;
            this.isGrounded = false;
        }
        
        // Apply gravity
        this.playerVelocity.y += this.gravity;
        
        // Apply velocity to player position
        this.player.position.add(this.playerVelocity);
        
        // Ground collision
        if (this.player.position.y <= 2) {
            this.player.position.y = 2;
            this.playerVelocity.y = 0;
            this.isGrounded = true;
        } else {
            this.isGrounded = false;
        }
        
        // Keep player within bounds
        const boundary = 95;
        this.player.position.x = Math.max(-boundary, Math.min(boundary, this.player.position.x));
        this.player.position.z = Math.max(-boundary, Math.min(boundary, this.player.position.z));
        
        // Update UI
        this.updateUI();
    }

    updateCamera() {
        if (!this.player || !this.camera) return;
        
        // Position camera behind and above player
        const cameraOffset = new THREE.Vector3(
            Math.sin(this.cameraConfig.angle + Math.PI) * this.cameraConfig.distance,
            this.cameraConfig.height,
            Math.cos(this.cameraConfig.angle + Math.PI) * this.cameraConfig.distance
        );
        
        this.camera.position.copy(this.player.position).add(cameraOffset);
        this.camera.lookAt(this.player.position.clone().add(new THREE.Vector3(0, 1, 0)));
    }

    updateUI() {
        const posInfo = document.getElementById('position-info');
        if (posInfo && this.player) {
            const pos = this.player.position;
            posInfo.textContent = `Posición: (${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)})`;
        }
    }

    startGameLoop() {
        const animate = () => {
            requestAnimationFrame(animate);
            
            this.updatePlayerMovement();
            this.updateCamera();
            this.renderer.render(this.scene, this.camera);
        };
        
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// Initialize game when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    const game = new RoseAdventureGame();
});
