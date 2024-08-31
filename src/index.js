import Game from './game/game';
import { GAMEBOARD_SIZE } from './constants';
import { isCoordsPairInArray } from './helpers';
import ComputerPlayer from './player/computerPlayer/computerPlayer';
import RealPlayer from './player/realPlayer';
import './styles.css';

/*
  UI:
    - make ships' drag and drop system
    - make computer smarter
      - render computer hit each time
*/

let game;

const popup = document.querySelector('.popup');
const startBtn = document.querySelector('.start');
const shuffleBtn = document.querySelector('.shuffle');
const startNewGameBtn = document.querySelector('.start-new-game');

function toggleGameButtons() {
  startBtn.hidden = !startBtn.hidden;
  shuffleBtn.hidden = !shuffleBtn.hidden;
}

function toggleGameOverElements() {
  popup.hidden = !popup.hidden;
  startNewGameBtn.hidden = !startNewGameBtn.hidden;
}

function renderGameboards() {
  const tables = document.querySelector('.tables');
  tables.innerHTML = '';

  const players = game.players;

  players.forEach((player, index) => {
    const table = document.createElement('table');
    table.setAttribute('data-is-enemy-table', index);

    const shipsCoords = player.getShipsCoords();
    const hitsCoords = player.getHitsCoords();

    for (let i = 0; i < GAMEBOARD_SIZE; i++) {
      const row = document.createElement('tr');
      row.setAttribute('data-row', i);

      for (let j = 0; j < GAMEBOARD_SIZE; j++) {
        const col = document.createElement('td');
        col.style.position = 'relative';
        col.setAttribute('data-column', j);

        if (
          isCoordsPairInArray([i, j], shipsCoords) &&
          isCoordsPairInArray([i, j], hitsCoords)
        ) {
          col.insertAdjacentHTML(
            'beforeend',
            '<svg class="ship-hit" fill="#ff0000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 94.926 94.926" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0 c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096 c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476 c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62 s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"></path> </g> </g></svg>'
          );
        } else if (isCoordsPairInArray([i, j], shipsCoords) && index === 0) {
          col.classList.add('ship');
        } else if (isCoordsPairInArray([i, j], hitsCoords)) {
          const dot = document.createElement('div');
          dot.classList.add('hit');

          col.append(dot);
        }

        row.append(col);
      }

      table.append(row);
    }

    tables.append(table);
  });
}

function isGameOver() {
  if (!game.isGameOver()) return false;

  renderGameboards();
  toggleGameOverElements();
  popup.innerHTML = `${game.currentPlayer.name} player wins`;

  return true;
}

function addEnemyPlayerTableHitListener() {
  const enemyPlayerTable = document.querySelector('[data-is-enemy-table="1"]');

  enemyPlayerTable.addEventListener('click', (event) => {
    const td = event.target.closest('td');

    if (!td) return;

    const col = +td.dataset.column;
    const row = +td.parentElement.dataset.row;

    const hitInfo = game.performCurrentPlayerHit([row, col]);

    if (isGameOver()) return;

    if (!hitInfo.error && !hitInfo.isShipHit) {
      game.swapPlayerTurn();

      game.performCurrentPlayerHit();

      if (isGameOver()) return;

      game.swapPlayerTurn();
    }

    renderGameboards();
    addEnemyPlayerTableHitListener();
  });
}

function createNewGame() {
  game = new Game(new RealPlayer(), new ComputerPlayer());

  game.addShips();
  renderGameboards();
}

startBtn.addEventListener('click', () => {
  toggleGameButtons();
  addEnemyPlayerTableHitListener();
});

shuffleBtn.addEventListener('click', () => {
  game.removeShips();
  game.addShips();

  renderGameboards();
});

startNewGameBtn.addEventListener('click', () => {
  toggleGameOverElements();
  toggleGameButtons();

  createNewGame();
});

createNewGame();
