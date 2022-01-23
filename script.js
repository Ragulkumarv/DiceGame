const player1TotalScore = document.getElementById('score--0');
const player2TotalScore = document.getElementById('score--1');
const player1Section = document.querySelector('.player--0');
const player2Section = document.querySelector('.player--1');
const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player1CurrentScore = document.getElementById('current--0');
const player2CurrentScore = document.getElementById('current--1');
//on app load start

let scores,
  currentScore,
  activePlayer = 0,
  isGameOver = true;
//on app load end
const resetGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isGameOver = true;
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;
  player1TotalScore.textContent = 0;
  player2TotalScore.textContent = 0;
  diceImg.classList.add('hidden');
  player1Section.classList.add('player--active');
  player2Section.classList.remove('player--active');
  player1Section.classList.remove('player--winner');
  player2Section.classList.remove('player--winner');
};
resetGame();
const switchPlayer = function () {
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player1Section.classList.toggle('player--active');
  player2Section.classList.toggle('player--active');
};
btnRoll.addEventListener('click', function () {
  if (isGameOver) {
    const randomRoll = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${randomRoll}.png`;
    //update current for player 1 if dice value other than 1
    if (randomRoll !== 1) {
      currentScore = currentScore + randomRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switching user if dice value is 1
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (isGameOver) {
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      isGameOver = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', resetGame);
