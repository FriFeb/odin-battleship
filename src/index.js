import { PLAYER_TYPES } from './constants';
import { Player } from './player/player';
import { Ship } from './ship/ship';
import './styles.css';

/*
  + hide enemy ships placement
  + stop hits after real player wins
  + implement start game button
  + show winner after game ends
  - add the ability to place ships randomly
  - add the ability to place ships manually

*/

function isCoordsPairInArray(coordsPair, coordsArray) {
  return coordsArray.some((coords) => {
    return coords.every((coord, index) => {
      return coord === coordsPair[index];
    });
  });
}

function isShipCoord(coordPair, player) {
  return isCoordsPairInArray(coordPair, player.gameboard.getShipsCoords());
}

function isHitCoord(coordPair, player) {
  return isCoordsPairInArray(coordPair, player.gameboard.getHitsCoords());
}

function showGameOver(player) {
  const div = document.createElement('div');
  div.classList.add('popup');
  div.innerHTML = `${PLAYER_TYPES[player.playerTypeIndex]} player wins`;

  document.querySelector('.main').append(div);
}

function proceedGameOver(enemyPlayer, winnerPlayer) {
  if (enemyPlayer.gameboard.isGameOver()) {
    showGameOver(winnerPlayer);
    return true;
  }
}

function getRandomCoords() {
  const row = Math.floor(Math.random() * 8);
  const col = Math.floor(Math.random() * 8);

  return [row, col];
}

function performBotHit() {
  while (!enemyPlayer.gameboard.getHit(getRandomCoords())) continue;
}

function performPlayerHit(coords) {
  const [row, col] = coords;

  return enemyPlayer.gameboard.getHit([row, col]);
}

function swapPlayerTurn(players) {
  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  enemyPlayer = enemyPlayer === players[1] ? players[0] : players[1];
}

function proceedHits(players, coords) {
  if (!performPlayerHit(coords)) return;
  renderGameboards(players);
  if (proceedGameOver(enemyPlayer, currentPlayer)) return;
  swapPlayerTurn(players);

  performBotHit();
  renderGameboards(players);
  proceedGameOver(enemyPlayer, currentPlayer);
  swapPlayerTurn(players);
}

function renderGameboards(players) {
  const tables = document.querySelector('.tables');
  tables.innerHTML = '';

  players.forEach((player, index) => {
    const table = document.createElement('table');
    table.setAttribute('data-is-enemy-table', index);

    for (let i = 0; i < 8; i++) {
      const row = document.createElement('tr');
      row.setAttribute('data-row', i);

      for (let j = 0; j < 8; j++) {
        const col = document.createElement('td');
        col.style.position = 'relative';
        col.setAttribute('data-column', j);

        if (isShipCoord([i, j], player) && isHitCoord([i, j], player)) {
          col.insertAdjacentHTML(
            'beforeend',
            '<svg class="ship-hit" fill="#ff0000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 94.926 94.926" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0 c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096 c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476 c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62 s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"></path> </g> </g></svg>'
          );
        } else if (isShipCoord([i, j], player) && index === 0) {
          col.classList.add('ship');
        } else if (isHitCoord([i, j], player)) {
          const circle = document.createElement('div');
          circle.classList.add('hit');

          col.append(circle);
        }

        row.append(col);
      }

      table.append(row);
    }

    if (!players.some((player) => player.gameboard.isGameOver())) {
      if (index === 1) {
        table.addEventListener('click', (event) => {
          const td = event.target.closest('td');

          if (!td) return;

          const col = +td.dataset.column;
          const row = +td.parentElement.dataset.row;

          proceedHits(players, [row, col]);
        });
      }
    }

    tables.append(table);
  });
}

function addShips(gameboard) {
  gameboard.placeShip(new Ship(2), [0, 6]);
  // gameboard.placeShip(new Ship(3), [1, 1]);
  // gameboard.placeShip(new Ship(2), [4, 4]);
  // gameboard.placeShip(new Ship(4), [6, 1]);
  // gameboard.placeShip(new Ship(1), [7, 7]);
  // gameboard.placeShip(new Ship(1), [3, 1]);
}

let players = [new Player(0), new Player(1)];

let currentPlayer = players[0],
  enemyPlayer = players[1];

addShips(currentPlayer.gameboard);
addShips(enemyPlayer.gameboard);

renderGameboards(players);

document.querySelector('button').addEventListener('click', () => {
  players = [new Player(0), new Player(1)];
  currentPlayer = players[0];
  enemyPlayer = players[1];

  addShips(currentPlayer.gameboard);
  addShips(enemyPlayer.gameboard);

  renderGameboards(players);

  document.querySelector('.main').lastElementChild.remove();
});
