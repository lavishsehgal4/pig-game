'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentscore = 0;
let activeplayer = 0;
let playing = true;

// rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentscore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
    } else {
      //switch next player
      document.getElementById(`current--${activeplayer}`).textContent = 0;
      currentscore = 0;
      activeplayer = activeplayer === 0 ? 1 : 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

// add permanent score
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activeplayer] += currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];

    // finish game score>=100
    if (scores[activeplayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
    } else {
      //switch to next player
      document.getElementById(`current--${activeplayer}`).textContent = 0;
      currentscore = 0;
      activeplayer = activeplayer === 0 ? 1 : 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

//reset game
btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentscore = 0;
  if (playing) {
    if (activeplayer === 1) {
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  } else {
    playing = true;
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
    document
      .querySelector(`.player--${activeplayer}`)
      .classList.remove('player--winner');
  }
  playing = true;
  activeplayer = 0;
  diceEl.classList.add('hidden');
  scores[0] = 0;
  scores[1] = 0;
});
