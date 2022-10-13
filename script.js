'use strict';
// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
// for using only id we can use this
const score1El = document.getElementById('score--1'); //special for id function
const current0El = document.getElementById('current--0'); //special for id function
const current1El = document.getElementById('current--1'); //special for id function

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
// for hiding something we use hidden class
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activeplayer = 0;
let playing = true;

const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0; // it's means if player 1 hoga player 2 ke pass shift hona h vice-versa
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled 1 : if true , switch to other play
    if (dice !== 1) {
      // add dice to current score
      currentScore = currentScore + dice; // also currentscore += dice ;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; // change later
    } else {
      // switch to next player
      switchplayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activeplayer] += currentScore; // scores[1] = scores[1] + currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];

    // 2. Check if player's score is >= 100
    if (scores[activeplayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner'); //form css
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      // if not then switch next player
      switchplayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  scores = [0, 0];
  currentScore = 0;
  activeplayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  playing = true;
});
