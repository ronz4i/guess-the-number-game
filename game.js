const mistakeDisplay = document.getElementById('mistake');
const statsText = document.getElementById('stats-text');
const numberBox = document.getElementById('number-box');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('but-submit');
const playAgainButton = document.getElementById('but-play-again');
const difficultyBox = document.getElementById('difficulty-box');

let maxMistakes = 5;

if (difficultyBox) {
  let diffText = difficultyBox.textContent.toUpperCase();
  
  if (diffText.includes('HARD')) {
    maxMistakes = 1;
  } else if (diffText.includes('MEDIUM')) {
    maxMistakes = 3;
  } else if (diffText.includes('EASY')) {
    maxMistakes = 5;
  }
}

let unknownNumber = Math.floor(Math.random() * 100) + 1;
let mistakes = 0;
let gameOver = false;

if (submitButton) {
  submitButton.addEventListener('click', checkGuess);
}

if (guessInput) {
  guessInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      checkGuess();
    }
  });
}

function checkGuess() {
  if (gameOver) return;

  let playerGuess = parseInt(guessInput.value, 10);

  if (isNaN(playerGuess)) {
    statsText.textContent = 'ENTER 1 - 100!';
    return;
  }

  if (playerGuess < 1) {
    statsText.textContent = 'ENTER 1 - 100!';
    return;
  }

  if (playerGuess > 100) {
    statsText.textContent = 'ENTER 1 - 100!';
    return;
  }

  mistakes = mistakes + 1;
  mistakeDisplay.textContent = mistakes + ' MISTAKE(S)';

  if (mistakes >= maxMistakes) {
    gameOver = true;
    numberBox.textContent = unknownNumber;
    statsText.textContent = 'You Lost!';
    statsText.classList = 'stats-text lose';
    endGame();
  } else {
    if (playerGuess > unknownNumber) {
      statsText.textContent = 'TOO HIGH!';
    } else {
      statsText.textContent = 'TOO LOW!';
    }
    statsText.classList = 'stats-text hint';
  }
}

function endGame() {
    guessInput.disabled = true;
    submitButton.classList.add('hidden');
    playAgainButton.classList.remove('hidden');
}

if (playAgainButton) {
    playAgainButton.addEventListener('click', function() {
        location.reload();
    });
}