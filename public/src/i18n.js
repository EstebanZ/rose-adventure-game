// Basic i18n for strings
const strings = {
  en: {
    welcome: "Welcome to Rose Adventure!",
    triviaComplete: "Trivia complete!",
    correct: "Correct!",
    wrong: "Wrong, try again.",
    rhythmChallenge: "Listen and sync to the rhythm!"
  },
  es: {
    welcome: "¡Bienvenido a Rose Adventure!",
    triviaComplete: "¡Trivia completa!",
    correct: "¡Correcto!",
    wrong: "Incorrecto, intenta de nuevo.",
    rhythmChallenge: "¡Escucha y sincroniza con el ritmo!"
  }
};

let currentLang = 'en'; // Default to English

export function getString(key) {
  return strings[currentLang][key] || key;
}

export function setLanguage(lang) {
  if (strings[lang]) {
    currentLang = lang;
  }
}