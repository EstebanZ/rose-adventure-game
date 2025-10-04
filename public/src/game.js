const { Engine, Scene, ArcRotateCamera, HemisphericLight, MeshBuilder, StandardMaterial, Texture } = BABYLON;
const Howl = window.Howl;

const canvas = document.getElementById('renderCanvas');
const engine = new Engine(canvas, true);

// Trivia questions about Rose/Blackpink
const triviaQuestions = [
  { question: "What is Rose's real name?", options: ["Park Chaeyoung", "Kim Jisoo", "Lalisa Manoban", "Jennie Kim"], answer: 0 },
  { question: "Which Blackpink song features Rose prominently?", options: ["Kill This Love", "How You Like That", "DDU-DU DDU-DU", "Ice Cream"], answer: 1 }
];

let currentQuestion = 0;

// Audio: Background music
const music = new Howl({
  src: ['assets/placeholder.mp3'], // Placeholder audio file
  loop: true,
  volume: 0.5
});

// Music challenge with Tone.js
async function startMusicChallenge() {
  await Tone.start(); // Required for Web Audio
  const synth = new Tone.Synth().toDestination();
  
  // Play note sequence for rhythm challenge
  const notes = ['C4', 'D4', 'E4', 'F4'];
  notes.forEach((note, index) => {
    Tone.Transport.schedule(() => {
      synth.triggerAttackRelease(note, '8n');
    }, index * 0.5);
  });
  
  Tone.Transport.start();
  music.play(); // Play background music
  alert('Listen and sync to the rhythm!'); // Placeholder for challenge logic
}

function showTrivia() {
  if (currentQuestion < triviaQuestions.length) {
    const q = triviaQuestions[currentQuestion];
    alert(`${q.question}\n${q.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}`);
    // In a real UI, use Babylon.js GUI or HTML overlay
    const userAnswer = prompt('Enter the number of your answer:');
    if (parseInt(userAnswer) - 1 === q.answer) {
      alert('Correct!');
      currentQuestion++;
    } else {
      alert('Wrong, try again.');
    }
  } else {
    alert('Trivia complete!');
  }
}

function createScene() {
  const scene = new Scene(engine);
  
  // Camera for exploring scenarios
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);
  
  // Basic light
  const light = new HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene);
  
  // Ground for music video scenario
  const ground = MeshBuilder.CreateGround('ground', { width: 20, height: 20 }, scene);
  const groundMaterial = new StandardMaterial('groundMat', scene);
  groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5); // Placeholder; load texture later
  ground.material = groundMaterial;
  
  // Placeholder for Rose (sphere)
  const rose = MeshBuilder.CreateSphere('rose', { diameter: 1 }, scene);
  rose.position.y = 1;
  
  // Add action to ground for trivia trigger
  ground.actionManager = new BABYLON.ActionManager(scene);
  ground.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
    showTrivia();
  }));
  
  // Add action to Rose for music challenge
  rose.actionManager = new BABYLON.ActionManager(scene);
  rose.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
    startMusicChallenge();
  }));
  
  return scene;
}

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener('resize', () => {
  engine.resize();
});