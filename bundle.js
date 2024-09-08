/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DIRECTIONS: () => (/* reexport safe */ _player_computerPlayer_directions__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   GAMEBOAED_SHIP_TYPES: () => (/* binding */ GAMEBOAED_SHIP_TYPES),
/* harmony export */   GAMEBOARD_SIZE: () => (/* binding */ GAMEBOARD_SIZE),
/* harmony export */   SHIP_DIRECTIONS: () => (/* binding */ SHIP_DIRECTIONS)
/* harmony export */ });
/* harmony import */ var _player_computerPlayer_directions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player/computerPlayer/directions */ "./src/player/computerPlayer/directions.js");
const GAMEBOARD_SIZE = 10;
const SHIP_DIRECTIONS = ['horizontal', 'vertical'];
const GAMEBOAED_SHIP_TYPES = [{
  length: 4,
  count: 1
}, {
  length: 3,
  count: 2
}, {
  length: 2,
  count: 3
}, {
  length: 1,
  count: 4
}];


/***/ }),

/***/ "./src/game/game.js":
/*!**************************!*\
  !*** ./src/game/game.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
class Game {
  #players;
  #currentPlayer;
  #enemyPlayer;
  constructor(firstPlayer, secondPlayer) {
    this.#players = [firstPlayer, secondPlayer];
    this.#currentPlayer = firstPlayer;
    this.#enemyPlayer = secondPlayer;
  }
  get players() {
    return this.#players;
  }
  get currentPlayer() {
    return this.#currentPlayer;
  }
  performCurrentPlayerHit(coords) {
    return this.#currentPlayer.performHit(this.#enemyPlayer, coords);
  }
  swapPlayerTurn() {
    const tempPlayer = this.#currentPlayer;
    this.#currentPlayer = this.#enemyPlayer;
    this.#enemyPlayer = tempPlayer;
  }
  removeShips() {
    this.#currentPlayer.removeShips();
    this.#enemyPlayer.removeShips();
  }
  addShips() {
    this.#currentPlayer.addRandomlyPlacedShips();
    this.#enemyPlayer.addRandomlyPlacedShips();
  }
  isGameOver() {
    return this.#currentPlayer.isGameOver() || this.#enemyPlayer.isGameOver();
  }
}

/***/ }),

/***/ "./src/gameboard/gameboard.js":
/*!************************************!*\
  !*** ./src/gameboard/gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./src/helpers.js");
/* harmony import */ var _ship_ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ship/ship */ "./src/ship/ship.js");



class Gameboard {
  #ships = [];
  #hits = [];
  getUnavailableCoords() {
    const shipsCoords = [];
    const outerCirclesCoords = [];
    this.#ships.forEach(ship => {
      shipsCoords.push(...ship.shipCoords);
      outerCirclesCoords.push(...ship.outerCircle);
    });
    return [shipsCoords, outerCirclesCoords];
  }
  getAvailableCoords() {
    const unavailableCoords = this.getUnavailableCoords(this.#ships).flat();
    const availvableCoords = [];
    for (let i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_SIZE; i++) {
      for (let j = 0; j < _constants__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_SIZE; j++) {
        const currentCoords = [i, j];
        if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.isCoordsPairInArray)(currentCoords, unavailableCoords)) {
          availvableCoords.push(currentCoords);
        }
      }
    }
    return availvableCoords;
  }
  getShipsCoords() {
    const shipsCoords = this.#ships.reduce((acc, ship) => {
      acc.push(ship.shipCoords);
      return acc;
    }, []);
    return shipsCoords.flat();
  }
  getHitsCoords() {
    return this.#hits;
  }
  placeShip(ship, coords, direction) {
    const shipCoords = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getShipCoords)(ship, coords, direction, this.getAvailableCoords());
    if (!shipCoords) return false;
    const outerCircle = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getOuterCircleCoords)(shipCoords);
    const placedShip = Object.assign(ship, {
      shipCoords
    }, {
      outerCircle
    });
    this.#ships.push(placedShip);
    return true;
  }
  addRandomlyPlacedShips() {
    for (let i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.GAMEBOAED_SHIP_TYPES.length; i++) {
      const currentShipType = _constants__WEBPACK_IMPORTED_MODULE_0__.GAMEBOAED_SHIP_TYPES[i];
      for (let j = 0; j < currentShipType.count; j++) {
        const randomDirection = Math.floor(Math.random() * 2);
        let isShipPlaced;
        do {
          isShipPlaced = this.placeShip(new _ship_ship__WEBPACK_IMPORTED_MODULE_2__["default"](currentShipType.length), (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getRandomCoords)(), randomDirection);
        } while (!isShipPlaced);
      }
    }
  }
  removeShips() {
    this.#ships = [];
  }
  getHit(coords) {
    const hitInfo = {
      error: true,
      hit: false,
      miss: false
    };
    if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.isCell)(coords) || (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.isCoordsPairInArray)(coords, this.#hits)) {
      return hitInfo;
    }
    hitInfo.error = false;
    hitInfo.miss = true;
    this.#ships.forEach(ship => {
      if ((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.isCoordsPairInArray)(coords, ship.shipCoords)) {
        ship.getHit();
        hitInfo.hit = true;
        hitInfo.miss = false;
        if (ship.isSunk()) this.#hits.push(...ship.outerCircle);
      }
    });
    this.#hits.push(coords);
    return hitInfo;
  }
  isGameOver() {
    return this.#ships.every(ship => ship.isSunk());
  }
}

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   delay: () => (/* binding */ delay),
/* harmony export */   getOuterCircleCoords: () => (/* binding */ getOuterCircleCoords),
/* harmony export */   getRandomCoords: () => (/* binding */ getRandomCoords),
/* harmony export */   getRandomNumberInRange: () => (/* binding */ getRandomNumberInRange),
/* harmony export */   getShipCoords: () => (/* binding */ getShipCoords),
/* harmony export */   isCell: () => (/* binding */ isCell),
/* harmony export */   isCoordsPairInArray: () => (/* binding */ isCoordsPairInArray)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

function isCell(coords) {
  return coords.every(coord => coord >= 0 && coord < _constants__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_SIZE);
}
function isCoordsPairInArray(coordsPair, coordsArray) {
  return coordsArray.some(coords => coords.every((coord, index) => coord === coordsPair[index]));
}
function getShipCoords(ship, coords, direction, availvableCoords) {
  const {
    length
  } = ship;
  const [x, y] = coords;
  const shipCoords = [];
  let currentCoords;
  for (let i = 0; i < length; i++) {
    switch (_constants__WEBPACK_IMPORTED_MODULE_0__.SHIP_DIRECTIONS[direction]) {
      case 'vertical':
        currentCoords = [x + i, y];
        break;
      case 'horizontal':
      default:
        currentCoords = [x, y + i];
        break;
    }
    if (!isCell(currentCoords) || !isCoordsPairInArray(currentCoords, availvableCoords)) {
      return false;
    }
    shipCoords.push(currentCoords);
  }
  return shipCoords;
}
function getOuterCircleCoords(shipCoords) {
  const outerCircle = [];
  shipCoords.forEach(coords => {
    const [x, y] = coords;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        const targetCoords = [i, j];
        if (isCell(targetCoords) && !isCoordsPairInArray(targetCoords, shipCoords) && !isCoordsPairInArray(targetCoords, outerCircle)) {
          outerCircle.push(targetCoords);
        }
      }
    }
  });
  return outerCircle;
}
function getRandomCoords() {
  const row = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_SIZE);
  const col = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_SIZE);
  return [row, col];
}
function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
async function delay() {
  let ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGameboards: () => (/* binding */ renderGameboards)
/* harmony export */ });
/* harmony import */ var _game_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game/game */ "./src/game/game.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");
/* harmony import */ var _player_computerPlayer_computerPlayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player/computerPlayer/computerPlayer */ "./src/player/computerPlayer/computerPlayer.js");
/* harmony import */ var _player_realPlayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player/realPlayer */ "./src/player/realPlayer.js");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");







/*
  UI:
    - make ships' drag and drop system
    + make bot smarter
      + implement new bot algorithm
      + render computer hit each time with a delay
      + fix not rendering miss when bot hits ship
      + fix clicks not working when bot misses don't render and bot hits errors
      + use random direction for botHit
      + refactor
        + implement 3 states for gameboard getting hit
        + fix clicks work on previous hits
        + prevent extra hit after computer wins
        + make computerPlayer performHit function DRY
        + check other modules out
        + eslint
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
function renderGameboards(players) {
  const tables = document.querySelector('.tables');
  tables.innerHTML = '';
  players.forEach((player, index) => {
    const table = document.createElement('table');
    table.setAttribute('data-is-enemy-table', index);
    const shipsCoords = player.getShipsCoords();
    const hitsCoords = player.getHitsCoords();
    for (let i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_1__.GAMEBOARD_SIZE; i++) {
      const row = document.createElement('tr');
      row.setAttribute('data-row', i);
      for (let j = 0; j < _constants__WEBPACK_IMPORTED_MODULE_1__.GAMEBOARD_SIZE; j++) {
        const col = document.createElement('td');
        col.style.position = 'relative';
        col.setAttribute('data-column', j);
        if ((0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isCoordsPairInArray)([i, j], shipsCoords) && (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isCoordsPairInArray)([i, j], hitsCoords)) {
          col.insertAdjacentHTML('beforeend', '<svg class="ship-hit" fill="#ff0000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 94.926 94.926" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0 c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096 c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476 c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62 s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"></path> </g> </g></svg>');
        } else if ((0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isCoordsPairInArray)([i, j], shipsCoords) && index === 0) {
          col.classList.add('ship');
        } else if ((0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isCoordsPairInArray)([i, j], hitsCoords)) {
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
function renderGameOver() {
  renderGameboards(game.players);
  toggleGameOverElements();
  popup.innerHTML = `${game.currentPlayer.name} player wins`;
}
function addEnemyPlayerTableHitListener() {
  const enemyPlayerTable = document.querySelector('[data-is-enemy-table="1"]');
  enemyPlayerTable.addEventListener('click', async event => {
    const td = event.target.closest('td');
    if (!td) return;
    const col = +td.dataset.column;
    const row = +td.parentElement.dataset.row;
    const hitInfo = game.performCurrentPlayerHit([row, col]);
    if (game.isGameOver()) {
      renderGameOver();
      return;
    }
    if (hitInfo.miss) {
      game.swapPlayerTurn();
      await game.performCurrentPlayerHit();
      if (game.isGameOver()) {
        renderGameOver();
        return;
      }
      game.swapPlayerTurn();
    }
    renderGameboards(game.players);
    addEnemyPlayerTableHitListener();
  });
}
function createNewGame() {
  game = new _game_game__WEBPACK_IMPORTED_MODULE_0__["default"](new _player_realPlayer__WEBPACK_IMPORTED_MODULE_4__["default"](), new _player_computerPlayer_computerPlayer__WEBPACK_IMPORTED_MODULE_3__["default"]());
  game.addShips();
  renderGameboards(game.players);
}
startBtn.addEventListener('click', () => {
  toggleGameButtons();
  addEnemyPlayerTableHitListener();
});
shuffleBtn.addEventListener('click', () => {
  game.removeShips();
  game.addShips();
  renderGameboards(game.players);
});
startNewGameBtn.addEventListener('click', () => {
  toggleGameOverElements();
  toggleGameButtons();
  createNewGame();
});
createNewGame();

/***/ }),

/***/ "./src/player/computerPlayer/botHit.js":
/*!*********************************************!*\
  !*** ./src/player/computerPlayer/botHit.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BotHit)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./src/constants.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers */ "./src/helpers.js");


class BotHit {
  #directions = _constants__WEBPACK_IMPORTED_MODULE_0__.DIRECTIONS;
  #usedDirections = [];
  #currentDirection;
  #isShipDirectionKnown;
  #isFirstTailEnd;
  get isShipDirectionKnown() {
    return this.#isShipDirectionKnown;
  }
  set isShipDirectionKnown(arg) {
    this.#isShipDirectionKnown = arg;
  }
  get isFirstTailEnd() {
    return this.#isFirstTailEnd;
  }
  set isFirstTailEnd(arg) {
    this.#isFirstTailEnd = arg;
  }
  getOppositeDirection() {
    this.#currentDirection = this.#currentDirection.getOppositeDirection();
  }
  getNextCoordsToAttack() {
    return this.#currentDirection.getNextCoords();
  }
  getRandomDirectionToAttack() {
    if (this.#currentDirection) this.#currentDirection.restoreHitCoords();
    let randomIndex;
    do {
      randomIndex = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getRandomNumberInRange)(0, 3);
    } while (this.#usedDirections.includes(randomIndex));
    this.#currentDirection = this.#directions[randomIndex];
    this.#usedDirections.push(randomIndex);
  }
  setFirstHitCoords(firstHitCoords) {
    this.#currentDirection.setFirstHitCoords(firstHitCoords);
  }
}

/***/ }),

/***/ "./src/player/computerPlayer/computerPlayer.js":
/*!*****************************************************!*\
  !*** ./src/player/computerPlayer/computerPlayer.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ComputerPlayer)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../.. */ "./src/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers */ "./src/helpers.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../player */ "./src/player/player.js");
/* harmony import */ var _botHit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./botHit */ "./src/player/computerPlayer/botHit.js");




class ComputerPlayer extends _player__WEBPACK_IMPORTED_MODULE_2__["default"] {
  #botHit;
  #errorCount = 0;
  constructor() {
    super('Computer');
  }
  clearProperties() {
    this.#botHit = null;
    this.#errorCount = 0;
  }
  setFirstTailFound() {
    this.#botHit.isFirstTailEnd = true;
    this.#botHit.getOppositeDirection();
  }
  async performNewHit(enemyPlayer) {
    this.clearProperties();
    await this.performHit(enemyPlayer);
  }
  async performHit(enemyPlayer) {
    if (!this.#botHit) {
      this.#botHit = new _botHit__WEBPACK_IMPORTED_MODULE_3__["default"]();
      const hitCoords = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getRandomCoords)();
      const hitInfo = enemyPlayer.getHit(hitCoords);
      if (hitInfo.hit) {
        if (enemyPlayer.isGameOver()) return;
        (0,___WEBPACK_IMPORTED_MODULE_0__.renderGameboards)([enemyPlayer, this]);
        this.#botHit.getRandomDirectionToAttack();
        this.#botHit.setFirstHitCoords(hitCoords);
        await (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.delay)();
      } else if (hitInfo.error) {
        await this.performNewHit(enemyPlayer);
        return;
      } else {
        this.clearProperties();
        return;
      }
    }
    while (true) {
      const hitInfo = enemyPlayer.getHit(this.#botHit.getNextCoordsToAttack());
      if (hitInfo.hit) {
        if (enemyPlayer.isGameOver()) return;
        (0,___WEBPACK_IMPORTED_MODULE_0__.renderGameboards)([enemyPlayer, this]);
        this.#botHit.isShipDirectionKnown = true;
        await (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.delay)();
      }
      if (hitInfo.error) {
        if (this.#botHit.isShipDirectionKnown) {
          if (this.#botHit.isFirstTailEnd) {
            await this.performNewHit(enemyPlayer);
            return;
          }
          this.setFirstTailFound();
        } else {
          this.#errorCount++;
          if (this.#errorCount === 4) {
            await this.performNewHit(enemyPlayer);
            return;
          }
          this.#botHit.getRandomDirectionToAttack();
        }
      }
      if (hitInfo.miss) {
        if (this.#botHit.isShipDirectionKnown) {
          this.setFirstTailFound();
          return;
        }
        this.#botHit.getRandomDirectionToAttack();
        return;
      }
    }
  }
}

/***/ }),

/***/ "./src/player/computerPlayer/directions.js":
/*!*************************************************!*\
  !*** ./src/player/computerPlayer/directions.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Direction {
  static firstHitCoords;
  static hitCoords;
  setFirstHitCoords(firstHitCoords) {
    Direction.firstHitCoords = firstHitCoords;
    Direction.hitCoords = firstHitCoords;
  }
  restoreHitCoords() {
    Direction.hitCoords = Direction.firstHitCoords;
  }
}
class LeftDirection extends Direction {
  getNextCoords() {
    const [row, col] = Direction.hitCoords;
    Direction.hitCoords = [row, col - 1];
    return Direction.hitCoords;
  }
  getOppositeDirection() {
    Direction.hitCoords = Direction.firstHitCoords;
    return new RightDirection();
  }
}
class RightDirection extends Direction {
  getNextCoords() {
    const [row, col] = Direction.hitCoords;
    Direction.hitCoords = [row, col + 1];
    return Direction.hitCoords;
  }
  getOppositeDirection() {
    Direction.hitCoords = Direction.firstHitCoords;
    return new LeftDirection();
  }
}
class TopDirection extends Direction {
  getNextCoords() {
    const [row, col] = Direction.hitCoords;
    Direction.hitCoords = [row - 1, col];
    return Direction.hitCoords;
  }
  getOppositeDirection() {
    Direction.hitCoords = Direction.firstHitCoords;
    return new BottomDirection();
  }
}
class BottomDirection extends Direction {
  getNextCoords() {
    const [row, col] = Direction.hitCoords;
    Direction.hitCoords = [row + 1, col];
    return Direction.hitCoords;
  }
  getOppositeDirection() {
    Direction.hitCoords = Direction.firstHitCoords;
    return new TopDirection();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([new LeftDirection(), new RightDirection(), new TopDirection(), new BottomDirection()]);

/***/ }),

/***/ "./src/player/player.js":
/*!******************************!*\
  !*** ./src/player/player.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../gameboard/gameboard */ "./src/gameboard/gameboard.js");

class Player {
  #name;
  #gameboard = new _gameboard_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
  constructor(name) {
    this.#name = name;
  }
  get name() {
    return this.#name;
  }
  getShipsCoords() {
    return this.#gameboard.getShipsCoords();
  }
  getHitsCoords() {
    return this.#gameboard.getHitsCoords();
  }
  getHit(coords) {
    return this.#gameboard.getHit(coords);
  }
  placeShip(ship, coords, direction) {
    return this.#gameboard.placeShip(ship, coords, direction);
  }
  addRandomlyPlacedShips() {
    this.#gameboard.addRandomlyPlacedShips();
  }
  removeShips() {
    this.#gameboard.removeShips();
  }
  isGameOver() {
    return this.#gameboard.isGameOver();
  }
}

/***/ }),

/***/ "./src/player/realPlayer.js":
/*!**********************************!*\
  !*** ./src/player/realPlayer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RealPlayer)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player/player.js");

class RealPlayer extends _player__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super('Real');
  }
  performHit(enemyPlayer, coords) {
    return enemyPlayer.getHit(coords);
  }
}

/***/ }),

/***/ "./src/ship/ship.js":
/*!**************************!*\
  !*** ./src/ship/ship.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  #hits = 0;
  #length;
  constructor(length) {
    this.#length = length;
  }
  get length() {
    return this.#length;
  }
  getHit() {
    this.#hits += 1;
  }
  isSunk() {
    return this.#hits === this.#length;
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  padding: 0;
  margin: 0;
}

body {
  height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
}

table {
  border: 1px solid;
}

td {
  border: 1px solid;
  padding: 24px;
}

.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.tables {
  display: flex;
  gap: 2rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.buttons {
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

button {
  font-size: large;
  font-family: monospace;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: grey;
  color: white;
  transition: 0.2s;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 3px black;
}

button:hover:active {
  transform: translateY(3px);
  box-shadow: none;
}

.start,
.start-new-game {
  background: white;
  border: 1px solid black;
  color: black;
  font-size: x-large;
}

.ship {
  background-color: gray;
}

.hit {
  background-color: black;
  border-radius: 50%;
  width: 30%;
  height: 30%;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

.ship-hit {
  position: absolute;
  background-color: grey;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.popup {
  position: absolute;
  font-size: xxx-large;
  top: 10%;
  font-family: monospace;
}
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,SAAS;AACX;;AAEA;EACE,aAAa;EACb,yCAAyC;AAC3C;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;EACjB,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,yBAAyB;EACzB,mBAAmB;AACrB;AACA;EACE,aAAa;EACb,SAAS;EACT,kBAAkB;EAClB,SAAS;EACT,QAAQ;EACR,gCAAgC;AAClC;;AAEA;EACE,oBAAoB;EACpB,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,gBAAgB;EAChB,sBAAsB;EACtB,aAAa;EACb,mBAAmB;EACnB,YAAY;EACZ,gBAAgB;EAChB,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE,2BAA2B;EAC3B,uBAAuB;AACzB;;AAEA;EACE,0BAA0B;EAC1B,gBAAgB;AAClB;;AAEA;;EAEE,iBAAiB;EACjB,uBAAuB;EACvB,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,UAAU;EACV,WAAW;EACX,kBAAkB;EAClB,gCAAgC;EAChC,SAAS;EACT,QAAQ;AACV;;AAEA;EACE,kBAAkB;EAClB,sBAAsB;EACtB,WAAW;EACX,YAAY;EACZ,MAAM;EACN,OAAO;AACT;;AAEA;EACE,kBAAkB;EAClB,oBAAoB;EACpB,QAAQ;EACR,sBAAsB;AACxB","sourcesContent":["* {\n  padding: 0;\n  margin: 0;\n}\n\nbody {\n  height: 100vh;\n  font-family: Arial, Helvetica, sans-serif;\n}\n\ntable {\n  border: 1px solid;\n}\n\ntd {\n  border: 1px solid;\n  padding: 24px;\n}\n\n.main {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  align-items: center;\n}\n.tables {\n  display: flex;\n  gap: 2rem;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.buttons {\n  padding-bottom: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n\nbutton {\n  font-size: large;\n  font-family: monospace;\n  padding: 12px;\n  border-radius: 12px;\n  border: none;\n  background: grey;\n  color: white;\n  transition: 0.2s;\n}\n\nbutton:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 3px black;\n}\n\nbutton:hover:active {\n  transform: translateY(3px);\n  box-shadow: none;\n}\n\n.start,\n.start-new-game {\n  background: white;\n  border: 1px solid black;\n  color: black;\n  font-size: x-large;\n}\n\n.ship {\n  background-color: gray;\n}\n\n.hit {\n  background-color: black;\n  border-radius: 50%;\n  width: 30%;\n  height: 30%;\n  position: absolute;\n  transform: translate(-50%, -50%);\n  left: 50%;\n  top: 50%;\n}\n\n.ship-hit {\n  position: absolute;\n  background-color: grey;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.popup {\n  position: absolute;\n  font-size: xxx-large;\n  top: 10%;\n  font-family: monospace;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNiQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2dhbWUvZ2FtZS5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL3BsYXllci9jb21wdXRlclBsYXllci9ib3RIaXQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL3BsYXllci9jb21wdXRlclBsYXllci9jb21wdXRlclBsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvcGxheWVyL2NvbXB1dGVyUGxheWVyL2RpcmVjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL3BsYXllci9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL3BsYXllci9yZWFsUGxheWVyLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9zaGlwL3NoaXAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvc3R5bGVzLmNzcz80NGIyIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBHQU1FQk9BUkRfU0laRSA9IDEwO1xuZXhwb3J0IGNvbnN0IFNISVBfRElSRUNUSU9OUyA9IFsnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCddO1xuZXhwb3J0IGNvbnN0IEdBTUVCT0FFRF9TSElQX1RZUEVTID0gW1xuICB7IGxlbmd0aDogNCwgY291bnQ6IDEgfSxcbiAgeyBsZW5ndGg6IDMsIGNvdW50OiAyIH0sXG4gIHsgbGVuZ3RoOiAyLCBjb3VudDogMyB9LFxuICB7IGxlbmd0aDogMSwgY291bnQ6IDQgfSxcbl07XG5leHBvcnQgeyBkZWZhdWx0IGFzIERJUkVDVElPTlMgfSBmcm9tICcuL3BsYXllci9jb21wdXRlclBsYXllci9kaXJlY3Rpb25zJztcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICAjcGxheWVycztcblxuICAjY3VycmVudFBsYXllcjtcblxuICAjZW5lbXlQbGF5ZXI7XG5cbiAgY29uc3RydWN0b3IoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikge1xuICAgIHRoaXMuI3BsYXllcnMgPSBbZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcl07XG4gICAgdGhpcy4jY3VycmVudFBsYXllciA9IGZpcnN0UGxheWVyO1xuICAgIHRoaXMuI2VuZW15UGxheWVyID0gc2Vjb25kUGxheWVyO1xuICB9XG5cbiAgZ2V0IHBsYXllcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3BsYXllcnM7XG4gIH1cblxuICBnZXQgY3VycmVudFBsYXllcigpIHtcbiAgICByZXR1cm4gdGhpcy4jY3VycmVudFBsYXllcjtcbiAgfVxuXG4gIHBlcmZvcm1DdXJyZW50UGxheWVySGl0KGNvb3Jkcykge1xuICAgIHJldHVybiB0aGlzLiNjdXJyZW50UGxheWVyLnBlcmZvcm1IaXQodGhpcy4jZW5lbXlQbGF5ZXIsIGNvb3Jkcyk7XG4gIH1cblxuICBzd2FwUGxheWVyVHVybigpIHtcbiAgICBjb25zdCB0ZW1wUGxheWVyID0gdGhpcy4jY3VycmVudFBsYXllcjtcbiAgICB0aGlzLiNjdXJyZW50UGxheWVyID0gdGhpcy4jZW5lbXlQbGF5ZXI7XG4gICAgdGhpcy4jZW5lbXlQbGF5ZXIgPSB0ZW1wUGxheWVyO1xuICB9XG5cbiAgcmVtb3ZlU2hpcHMoKSB7XG4gICAgdGhpcy4jY3VycmVudFBsYXllci5yZW1vdmVTaGlwcygpO1xuICAgIHRoaXMuI2VuZW15UGxheWVyLnJlbW92ZVNoaXBzKCk7XG4gIH1cblxuICBhZGRTaGlwcygpIHtcbiAgICB0aGlzLiNjdXJyZW50UGxheWVyLmFkZFJhbmRvbWx5UGxhY2VkU2hpcHMoKTtcbiAgICB0aGlzLiNlbmVteVBsYXllci5hZGRSYW5kb21seVBsYWNlZFNoaXBzKCk7XG4gIH1cblxuICBpc0dhbWVPdmVyKCkge1xuICAgIHJldHVybiB0aGlzLiNjdXJyZW50UGxheWVyLmlzR2FtZU92ZXIoKSB8fCB0aGlzLiNlbmVteVBsYXllci5pc0dhbWVPdmVyKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdBTUVCT0FFRF9TSElQX1RZUEVTLCBHQU1FQk9BUkRfU0laRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQge1xuICBnZXRPdXRlckNpcmNsZUNvb3JkcyxcbiAgZ2V0UmFuZG9tQ29vcmRzLFxuICBnZXRTaGlwQ29vcmRzLFxuICBpc0NlbGwsXG4gIGlzQ29vcmRzUGFpckluQXJyYXksXG59IGZyb20gJy4uL2hlbHBlcnMnO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi4vc2hpcC9zaGlwJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgI3NoaXBzID0gW107XG5cbiAgI2hpdHMgPSBbXTtcblxuICBnZXRVbmF2YWlsYWJsZUNvb3JkcygpIHtcbiAgICBjb25zdCBzaGlwc0Nvb3JkcyA9IFtdO1xuICAgIGNvbnN0IG91dGVyQ2lyY2xlc0Nvb3JkcyA9IFtdO1xuXG4gICAgdGhpcy4jc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgc2hpcHNDb29yZHMucHVzaCguLi5zaGlwLnNoaXBDb29yZHMpO1xuICAgICAgb3V0ZXJDaXJjbGVzQ29vcmRzLnB1c2goLi4uc2hpcC5vdXRlckNpcmNsZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gW3NoaXBzQ29vcmRzLCBvdXRlckNpcmNsZXNDb29yZHNdO1xuICB9XG5cbiAgZ2V0QXZhaWxhYmxlQ29vcmRzKCkge1xuICAgIGNvbnN0IHVuYXZhaWxhYmxlQ29vcmRzID0gdGhpcy5nZXRVbmF2YWlsYWJsZUNvb3Jkcyh0aGlzLiNzaGlwcykuZmxhdCgpO1xuICAgIGNvbnN0IGF2YWlsdmFibGVDb29yZHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR0FNRUJPQVJEX1NJWkU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBHQU1FQk9BUkRfU0laRTsgaisrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb29yZHMgPSBbaSwgal07XG5cbiAgICAgICAgaWYgKCFpc0Nvb3Jkc1BhaXJJbkFycmF5KGN1cnJlbnRDb29yZHMsIHVuYXZhaWxhYmxlQ29vcmRzKSkge1xuICAgICAgICAgIGF2YWlsdmFibGVDb29yZHMucHVzaChjdXJyZW50Q29vcmRzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhdmFpbHZhYmxlQ29vcmRzO1xuICB9XG5cbiAgZ2V0U2hpcHNDb29yZHMoKSB7XG4gICAgY29uc3Qgc2hpcHNDb29yZHMgPSB0aGlzLiNzaGlwcy5yZWR1Y2UoKGFjYywgc2hpcCkgPT4ge1xuICAgICAgYWNjLnB1c2goc2hpcC5zaGlwQ29vcmRzKTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIHNoaXBzQ29vcmRzLmZsYXQoKTtcbiAgfVxuXG4gIGdldEhpdHNDb29yZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2hpdHM7XG4gIH1cblxuICBwbGFjZVNoaXAoc2hpcCwgY29vcmRzLCBkaXJlY3Rpb24pIHtcbiAgICBjb25zdCBzaGlwQ29vcmRzID0gZ2V0U2hpcENvb3JkcyhcbiAgICAgIHNoaXAsXG4gICAgICBjb29yZHMsXG4gICAgICBkaXJlY3Rpb24sXG4gICAgICB0aGlzLmdldEF2YWlsYWJsZUNvb3JkcygpXG4gICAgKTtcblxuICAgIGlmICghc2hpcENvb3JkcykgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3Qgb3V0ZXJDaXJjbGUgPSBnZXRPdXRlckNpcmNsZUNvb3JkcyhzaGlwQ29vcmRzKTtcblxuICAgIGNvbnN0IHBsYWNlZFNoaXAgPSBPYmplY3QuYXNzaWduKHNoaXAsIHsgc2hpcENvb3JkcyB9LCB7IG91dGVyQ2lyY2xlIH0pO1xuXG4gICAgdGhpcy4jc2hpcHMucHVzaChwbGFjZWRTaGlwKTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYWRkUmFuZG9tbHlQbGFjZWRTaGlwcygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdBTUVCT0FFRF9TSElQX1RZUEVTLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50U2hpcFR5cGUgPSBHQU1FQk9BRURfU0hJUF9UWVBFU1tpXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjdXJyZW50U2hpcFR5cGUuY291bnQ7IGorKykge1xuICAgICAgICBjb25zdCByYW5kb21EaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcblxuICAgICAgICBsZXQgaXNTaGlwUGxhY2VkO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgaXNTaGlwUGxhY2VkID0gdGhpcy5wbGFjZVNoaXAoXG4gICAgICAgICAgICBuZXcgU2hpcChjdXJyZW50U2hpcFR5cGUubGVuZ3RoKSxcbiAgICAgICAgICAgIGdldFJhbmRvbUNvb3JkcygpLFxuICAgICAgICAgICAgcmFuZG9tRGlyZWN0aW9uXG4gICAgICAgICAgKTtcbiAgICAgICAgfSB3aGlsZSAoIWlzU2hpcFBsYWNlZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlU2hpcHMoKSB7XG4gICAgdGhpcy4jc2hpcHMgPSBbXTtcbiAgfVxuXG4gIGdldEhpdChjb29yZHMpIHtcbiAgICBjb25zdCBoaXRJbmZvID0geyBlcnJvcjogdHJ1ZSwgaGl0OiBmYWxzZSwgbWlzczogZmFsc2UgfTtcblxuICAgIGlmICghaXNDZWxsKGNvb3JkcykgfHwgaXNDb29yZHNQYWlySW5BcnJheShjb29yZHMsIHRoaXMuI2hpdHMpKSB7XG4gICAgICByZXR1cm4gaGl0SW5mbztcbiAgICB9XG5cbiAgICBoaXRJbmZvLmVycm9yID0gZmFsc2U7XG4gICAgaGl0SW5mby5taXNzID0gdHJ1ZTtcblxuICAgIHRoaXMuI3NoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGlmIChpc0Nvb3Jkc1BhaXJJbkFycmF5KGNvb3Jkcywgc2hpcC5zaGlwQ29vcmRzKSkge1xuICAgICAgICBzaGlwLmdldEhpdCgpO1xuICAgICAgICBoaXRJbmZvLmhpdCA9IHRydWU7XG4gICAgICAgIGhpdEluZm8ubWlzcyA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB0aGlzLiNoaXRzLnB1c2goLi4uc2hpcC5vdXRlckNpcmNsZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLiNoaXRzLnB1c2goY29vcmRzKTtcblxuICAgIHJldHVybiBoaXRJbmZvO1xuICB9XG5cbiAgaXNHYW1lT3ZlcigpIHtcbiAgICByZXR1cm4gdGhpcy4jc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBHQU1FQk9BUkRfU0laRSwgU0hJUF9ESVJFQ1RJT05TIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNDZWxsKGNvb3Jkcykge1xuICByZXR1cm4gY29vcmRzLmV2ZXJ5KChjb29yZCkgPT4gY29vcmQgPj0gMCAmJiBjb29yZCA8IEdBTUVCT0FSRF9TSVpFKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29vcmRzUGFpckluQXJyYXkoY29vcmRzUGFpciwgY29vcmRzQXJyYXkpIHtcbiAgcmV0dXJuIGNvb3Jkc0FycmF5LnNvbWUoKGNvb3JkcykgPT5cbiAgICBjb29yZHMuZXZlcnkoKGNvb3JkLCBpbmRleCkgPT4gY29vcmQgPT09IGNvb3Jkc1BhaXJbaW5kZXhdKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hpcENvb3JkcyhzaGlwLCBjb29yZHMsIGRpcmVjdGlvbiwgYXZhaWx2YWJsZUNvb3Jkcykge1xuICBjb25zdCB7IGxlbmd0aCB9ID0gc2hpcDtcbiAgY29uc3QgW3gsIHldID0gY29vcmRzO1xuICBjb25zdCBzaGlwQ29vcmRzID0gW107XG4gIGxldCBjdXJyZW50Q29vcmRzO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBzd2l0Y2ggKFNISVBfRElSRUNUSU9OU1tkaXJlY3Rpb25dKSB7XG4gICAgICBjYXNlICd2ZXJ0aWNhbCc6XG4gICAgICAgIGN1cnJlbnRDb29yZHMgPSBbeCArIGksIHldO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnaG9yaXpvbnRhbCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjdXJyZW50Q29vcmRzID0gW3gsIHkgKyBpXTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgIWlzQ2VsbChjdXJyZW50Q29vcmRzKSB8fFxuICAgICAgIWlzQ29vcmRzUGFpckluQXJyYXkoY3VycmVudENvb3JkcywgYXZhaWx2YWJsZUNvb3JkcylcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzaGlwQ29vcmRzLnB1c2goY3VycmVudENvb3Jkcyk7XG4gIH1cblxuICByZXR1cm4gc2hpcENvb3Jkcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE91dGVyQ2lyY2xlQ29vcmRzKHNoaXBDb29yZHMpIHtcbiAgY29uc3Qgb3V0ZXJDaXJjbGUgPSBbXTtcblxuICBzaGlwQ29vcmRzLmZvckVhY2goKGNvb3JkcykgPT4ge1xuICAgIGNvbnN0IFt4LCB5XSA9IGNvb3JkcztcblxuICAgIGZvciAobGV0IGkgPSB4IC0gMTsgaSA8PSB4ICsgMTsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0geSAtIDE7IGogPD0geSArIDE7IGorKykge1xuICAgICAgICBjb25zdCB0YXJnZXRDb29yZHMgPSBbaSwgal07XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlzQ2VsbCh0YXJnZXRDb29yZHMpICYmXG4gICAgICAgICAgIWlzQ29vcmRzUGFpckluQXJyYXkodGFyZ2V0Q29vcmRzLCBzaGlwQ29vcmRzKSAmJlxuICAgICAgICAgICFpc0Nvb3Jkc1BhaXJJbkFycmF5KHRhcmdldENvb3Jkcywgb3V0ZXJDaXJjbGUpXG4gICAgICAgICkge1xuICAgICAgICAgIG91dGVyQ2lyY2xlLnB1c2godGFyZ2V0Q29vcmRzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG91dGVyQ2lyY2xlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tQ29vcmRzKCkge1xuICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBHQU1FQk9BUkRfU0laRSk7XG4gIGNvbnN0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEdBTUVCT0FSRF9TSVpFKTtcblxuICByZXR1cm4gW3JvdywgY29sXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbU51bWJlckluUmFuZ2UobWluLCBtYXgpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxheShtcyA9IDUwMCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUvZ2FtZSc7XG5pbXBvcnQgeyBHQU1FQk9BUkRfU0laRSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IGlzQ29vcmRzUGFpckluQXJyYXkgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IENvbXB1dGVyUGxheWVyIGZyb20gJy4vcGxheWVyL2NvbXB1dGVyUGxheWVyL2NvbXB1dGVyUGxheWVyJztcbmltcG9ydCBSZWFsUGxheWVyIGZyb20gJy4vcGxheWVyL3JlYWxQbGF5ZXInO1xuaW1wb3J0ICcuL3N0eWxlcy5jc3MnO1xuXG4vKlxuICBVSTpcbiAgICAtIG1ha2Ugc2hpcHMnIGRyYWcgYW5kIGRyb3Agc3lzdGVtXG4gICAgKyBtYWtlIGJvdCBzbWFydGVyXG4gICAgICArIGltcGxlbWVudCBuZXcgYm90IGFsZ29yaXRobVxuICAgICAgKyByZW5kZXIgY29tcHV0ZXIgaGl0IGVhY2ggdGltZSB3aXRoIGEgZGVsYXlcbiAgICAgICsgZml4IG5vdCByZW5kZXJpbmcgbWlzcyB3aGVuIGJvdCBoaXRzIHNoaXBcbiAgICAgICsgZml4IGNsaWNrcyBub3Qgd29ya2luZyB3aGVuIGJvdCBtaXNzZXMgZG9uJ3QgcmVuZGVyIGFuZCBib3QgaGl0cyBlcnJvcnNcbiAgICAgICsgdXNlIHJhbmRvbSBkaXJlY3Rpb24gZm9yIGJvdEhpdFxuICAgICAgKyByZWZhY3RvclxuICAgICAgICArIGltcGxlbWVudCAzIHN0YXRlcyBmb3IgZ2FtZWJvYXJkIGdldHRpbmcgaGl0XG4gICAgICAgICsgZml4IGNsaWNrcyB3b3JrIG9uIHByZXZpb3VzIGhpdHNcbiAgICAgICAgKyBwcmV2ZW50IGV4dHJhIGhpdCBhZnRlciBjb21wdXRlciB3aW5zXG4gICAgICAgICsgbWFrZSBjb21wdXRlclBsYXllciBwZXJmb3JtSGl0IGZ1bmN0aW9uIERSWVxuICAgICAgICArIGNoZWNrIG90aGVyIG1vZHVsZXMgb3V0XG4gICAgICAgICsgZXNsaW50XG4qL1xuXG5sZXQgZ2FtZTtcblxuY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKTtcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0Jyk7XG5jb25zdCBzaHVmZmxlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNodWZmbGUnKTtcbmNvbnN0IHN0YXJ0TmV3R2FtZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1uZXctZ2FtZScpO1xuXG5mdW5jdGlvbiB0b2dnbGVHYW1lQnV0dG9ucygpIHtcbiAgc3RhcnRCdG4uaGlkZGVuID0gIXN0YXJ0QnRuLmhpZGRlbjtcbiAgc2h1ZmZsZUJ0bi5oaWRkZW4gPSAhc2h1ZmZsZUJ0bi5oaWRkZW47XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUdhbWVPdmVyRWxlbWVudHMoKSB7XG4gIHBvcHVwLmhpZGRlbiA9ICFwb3B1cC5oaWRkZW47XG4gIHN0YXJ0TmV3R2FtZUJ0bi5oaWRkZW4gPSAhc3RhcnROZXdHYW1lQnRuLmhpZGRlbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckdhbWVib2FyZHMocGxheWVycykge1xuICBjb25zdCB0YWJsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGVzJyk7XG4gIHRhYmxlcy5pbm5lckhUTUwgPSAnJztcblxuICBwbGF5ZXJzLmZvckVhY2goKHBsYXllciwgaW5kZXgpID0+IHtcbiAgICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XG4gICAgdGFibGUuc2V0QXR0cmlidXRlKCdkYXRhLWlzLWVuZW15LXRhYmxlJywgaW5kZXgpO1xuXG4gICAgY29uc3Qgc2hpcHNDb29yZHMgPSBwbGF5ZXIuZ2V0U2hpcHNDb29yZHMoKTtcbiAgICBjb25zdCBoaXRzQ29vcmRzID0gcGxheWVyLmdldEhpdHNDb29yZHMoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR0FNRUJPQVJEX1NJWkU7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JywgaSk7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgR0FNRUJPQVJEX1NJWkU7IGorKykge1xuICAgICAgICBjb25zdCBjb2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICBjb2wuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICBjb2wuc2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicsIGopO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBpc0Nvb3Jkc1BhaXJJbkFycmF5KFtpLCBqXSwgc2hpcHNDb29yZHMpICYmXG4gICAgICAgICAgaXNDb29yZHNQYWlySW5BcnJheShbaSwgal0sIGhpdHNDb29yZHMpXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICAgICAgICc8c3ZnIGNsYXNzPVwic2hpcC1oaXRcIiBmaWxsPVwiI2ZmMDAwMFwiIHZlcnNpb249XCIxLjFcIiBpZD1cIkNhcGFfMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB2aWV3Qm94PVwiMCAwIDk0LjkyNiA5NC45MjZcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPjxnIGlkPVwiU1ZHUmVwb19iZ0NhcnJpZXJcIiBzdHJva2Utd2lkdGg9XCIwXCI+PC9nPjxnIGlkPVwiU1ZHUmVwb190cmFjZXJDYXJyaWVyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PC9nPjxnIGlkPVwiU1ZHUmVwb19pY29uQ2FycmllclwiPiA8Zz4gPHBhdGggZD1cIk01NS45MzEsNDcuNDYzTDk0LjMwNiw5LjA5YzAuODI2LTAuODI3LDAuODI2LTIuMTY3LDAtMi45OTRMODguODMzLDAuNjJDODguNDM2LDAuMjI0LDg3Ljg5NiwwLDg3LjMzNSwwIGMtMC41NjIsMC0xLjEwMSwwLjIyNC0xLjQ5OCwwLjYyTDQ3LjQ2MywzOC45OTRMOS4wODksMC42MmMtMC43OTUtMC43OTUtMi4yMDItMC43OTQtMi45OTUsMEwwLjYyMiw2LjA5NiBjLTAuODI3LDAuODI3LTAuODI3LDIuMTY3LDAsMi45OTRsMzguMzc0LDM4LjM3M0wwLjYyMiw4NS44MzZjLTAuODI3LDAuODI3LTAuODI3LDIuMTY3LDAsMi45OTRsNS40NzMsNS40NzYgYzAuMzk3LDAuMzk2LDAuOTM2LDAuNjIsMS40OTgsMC42MnMxLjEtMC4yMjQsMS40OTctMC42MmwzOC4zNzQtMzguMzc0bDM4LjM3NCwzOC4zNzRjMC4zOTcsMC4zOTYsMC45MzcsMC42MiwxLjQ5OCwwLjYyIHMxLjEwMS0wLjIyNCwxLjQ5OC0wLjYybDUuNDczLTUuNDc2YzAuODI2LTAuODI3LDAuODI2LTIuMTY3LDAtMi45OTRMNTUuOTMxLDQ3LjQ2M3pcIj48L3BhdGg+IDwvZz4gPC9nPjwvc3ZnPidcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQ29vcmRzUGFpckluQXJyYXkoW2ksIGpdLCBzaGlwc0Nvb3JkcykgJiYgaW5kZXggPT09IDApIHtcbiAgICAgICAgICBjb2wuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQ29vcmRzUGFpckluQXJyYXkoW2ksIGpdLCBoaXRzQ29vcmRzKSkge1xuICAgICAgICAgIGNvbnN0IGRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGRvdC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcblxuICAgICAgICAgIGNvbC5hcHBlbmQoZG90KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJvdy5hcHBlbmQoY29sKTtcbiAgICAgIH1cblxuICAgICAgdGFibGUuYXBwZW5kKHJvdyk7XG4gICAgfVxuXG4gICAgdGFibGVzLmFwcGVuZCh0YWJsZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJHYW1lT3ZlcigpIHtcbiAgcmVuZGVyR2FtZWJvYXJkcyhnYW1lLnBsYXllcnMpO1xuICB0b2dnbGVHYW1lT3ZlckVsZW1lbnRzKCk7XG4gIHBvcHVwLmlubmVySFRNTCA9IGAke2dhbWUuY3VycmVudFBsYXllci5uYW1lfSBwbGF5ZXIgd2luc2A7XG59XG5cbmZ1bmN0aW9uIGFkZEVuZW15UGxheWVyVGFibGVIaXRMaXN0ZW5lcigpIHtcbiAgY29uc3QgZW5lbXlQbGF5ZXJUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWlzLWVuZW15LXRhYmxlPVwiMVwiXScpO1xuXG4gIGVuZW15UGxheWVyVGFibGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICBjb25zdCB0ZCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCd0ZCcpO1xuXG4gICAgaWYgKCF0ZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgY29sID0gK3RkLmRhdGFzZXQuY29sdW1uO1xuICAgIGNvbnN0IHJvdyA9ICt0ZC5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93O1xuXG4gICAgY29uc3QgaGl0SW5mbyA9IGdhbWUucGVyZm9ybUN1cnJlbnRQbGF5ZXJIaXQoW3JvdywgY29sXSk7XG5cbiAgICBpZiAoZ2FtZS5pc0dhbWVPdmVyKCkpIHtcbiAgICAgIHJlbmRlckdhbWVPdmVyKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGhpdEluZm8ubWlzcykge1xuICAgICAgZ2FtZS5zd2FwUGxheWVyVHVybigpO1xuXG4gICAgICBhd2FpdCBnYW1lLnBlcmZvcm1DdXJyZW50UGxheWVySGl0KCk7XG5cbiAgICAgIGlmIChnYW1lLmlzR2FtZU92ZXIoKSkge1xuICAgICAgICByZW5kZXJHYW1lT3ZlcigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGdhbWUuc3dhcFBsYXllclR1cm4oKTtcbiAgICB9XG5cbiAgICByZW5kZXJHYW1lYm9hcmRzKGdhbWUucGxheWVycyk7XG4gICAgYWRkRW5lbXlQbGF5ZXJUYWJsZUhpdExpc3RlbmVyKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXdHYW1lKCkge1xuICBnYW1lID0gbmV3IEdhbWUobmV3IFJlYWxQbGF5ZXIoKSwgbmV3IENvbXB1dGVyUGxheWVyKCkpO1xuXG4gIGdhbWUuYWRkU2hpcHMoKTtcbiAgcmVuZGVyR2FtZWJvYXJkcyhnYW1lLnBsYXllcnMpO1xufVxuXG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgdG9nZ2xlR2FtZUJ1dHRvbnMoKTtcbiAgYWRkRW5lbXlQbGF5ZXJUYWJsZUhpdExpc3RlbmVyKCk7XG59KTtcblxuc2h1ZmZsZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgZ2FtZS5yZW1vdmVTaGlwcygpO1xuICBnYW1lLmFkZFNoaXBzKCk7XG5cbiAgcmVuZGVyR2FtZWJvYXJkcyhnYW1lLnBsYXllcnMpO1xufSk7XG5cbnN0YXJ0TmV3R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgdG9nZ2xlR2FtZU92ZXJFbGVtZW50cygpO1xuICB0b2dnbGVHYW1lQnV0dG9ucygpO1xuXG4gIGNyZWF0ZU5ld0dhbWUoKTtcbn0pO1xuXG5jcmVhdGVOZXdHYW1lKCk7XG4iLCJpbXBvcnQgeyBESVJFQ1RJT05TIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGdldFJhbmRvbU51bWJlckluUmFuZ2UgfSBmcm9tICcuLi8uLi9oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm90SGl0IHtcbiAgI2RpcmVjdGlvbnMgPSBESVJFQ1RJT05TO1xuXG4gICN1c2VkRGlyZWN0aW9ucyA9IFtdO1xuXG4gICNjdXJyZW50RGlyZWN0aW9uO1xuXG4gICNpc1NoaXBEaXJlY3Rpb25Lbm93bjtcblxuICAjaXNGaXJzdFRhaWxFbmQ7XG5cbiAgZ2V0IGlzU2hpcERpcmVjdGlvbktub3duKCkge1xuICAgIHJldHVybiB0aGlzLiNpc1NoaXBEaXJlY3Rpb25Lbm93bjtcbiAgfVxuXG4gIHNldCBpc1NoaXBEaXJlY3Rpb25Lbm93bihhcmcpIHtcbiAgICB0aGlzLiNpc1NoaXBEaXJlY3Rpb25Lbm93biA9IGFyZztcbiAgfVxuXG4gIGdldCBpc0ZpcnN0VGFpbEVuZCgpIHtcbiAgICByZXR1cm4gdGhpcy4jaXNGaXJzdFRhaWxFbmQ7XG4gIH1cblxuICBzZXQgaXNGaXJzdFRhaWxFbmQoYXJnKSB7XG4gICAgdGhpcy4jaXNGaXJzdFRhaWxFbmQgPSBhcmc7XG4gIH1cblxuICBnZXRPcHBvc2l0ZURpcmVjdGlvbigpIHtcbiAgICB0aGlzLiNjdXJyZW50RGlyZWN0aW9uID0gdGhpcy4jY3VycmVudERpcmVjdGlvbi5nZXRPcHBvc2l0ZURpcmVjdGlvbigpO1xuICB9XG5cbiAgZ2V0TmV4dENvb3Jkc1RvQXR0YWNrKCkge1xuICAgIHJldHVybiB0aGlzLiNjdXJyZW50RGlyZWN0aW9uLmdldE5leHRDb29yZHMoKTtcbiAgfVxuXG4gIGdldFJhbmRvbURpcmVjdGlvblRvQXR0YWNrKCkge1xuICAgIGlmICh0aGlzLiNjdXJyZW50RGlyZWN0aW9uKSB0aGlzLiNjdXJyZW50RGlyZWN0aW9uLnJlc3RvcmVIaXRDb29yZHMoKTtcblxuICAgIGxldCByYW5kb21JbmRleDtcblxuICAgIGRvIHtcbiAgICAgIHJhbmRvbUluZGV4ID0gZ2V0UmFuZG9tTnVtYmVySW5SYW5nZSgwLCAzKTtcbiAgICB9IHdoaWxlICh0aGlzLiN1c2VkRGlyZWN0aW9ucy5pbmNsdWRlcyhyYW5kb21JbmRleCkpO1xuXG4gICAgdGhpcy4jY3VycmVudERpcmVjdGlvbiA9IHRoaXMuI2RpcmVjdGlvbnNbcmFuZG9tSW5kZXhdO1xuICAgIHRoaXMuI3VzZWREaXJlY3Rpb25zLnB1c2gocmFuZG9tSW5kZXgpO1xuICB9XG5cbiAgc2V0Rmlyc3RIaXRDb29yZHMoZmlyc3RIaXRDb29yZHMpIHtcbiAgICB0aGlzLiNjdXJyZW50RGlyZWN0aW9uLnNldEZpcnN0SGl0Q29vcmRzKGZpcnN0SGl0Q29vcmRzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgcmVuZGVyR2FtZWJvYXJkcyB9IGZyb20gJy4uLy4uJztcbmltcG9ydCB7IGRlbGF5LCBnZXRSYW5kb21Db29yZHMgfSBmcm9tICcuLi8uLi9oZWxwZXJzJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi4vcGxheWVyJztcbmltcG9ydCBCb3RIaXQgZnJvbSAnLi9ib3RIaXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wdXRlclBsYXllciBleHRlbmRzIFBsYXllciB7XG4gICNib3RIaXQ7XG5cbiAgI2Vycm9yQ291bnQgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCdDb21wdXRlcicpO1xuICB9XG5cbiAgY2xlYXJQcm9wZXJ0aWVzKCkge1xuICAgIHRoaXMuI2JvdEhpdCA9IG51bGw7XG4gICAgdGhpcy4jZXJyb3JDb3VudCA9IDA7XG4gIH1cblxuICBzZXRGaXJzdFRhaWxGb3VuZCgpIHtcbiAgICB0aGlzLiNib3RIaXQuaXNGaXJzdFRhaWxFbmQgPSB0cnVlO1xuICAgIHRoaXMuI2JvdEhpdC5nZXRPcHBvc2l0ZURpcmVjdGlvbigpO1xuICB9XG5cbiAgYXN5bmMgcGVyZm9ybU5ld0hpdChlbmVteVBsYXllcikge1xuICAgIHRoaXMuY2xlYXJQcm9wZXJ0aWVzKCk7XG4gICAgYXdhaXQgdGhpcy5wZXJmb3JtSGl0KGVuZW15UGxheWVyKTtcbiAgfVxuXG4gIGFzeW5jIHBlcmZvcm1IaXQoZW5lbXlQbGF5ZXIpIHtcbiAgICBpZiAoIXRoaXMuI2JvdEhpdCkge1xuICAgICAgdGhpcy4jYm90SGl0ID0gbmV3IEJvdEhpdCgpO1xuXG4gICAgICBjb25zdCBoaXRDb29yZHMgPSBnZXRSYW5kb21Db29yZHMoKTtcblxuICAgICAgY29uc3QgaGl0SW5mbyA9IGVuZW15UGxheWVyLmdldEhpdChoaXRDb29yZHMpO1xuXG4gICAgICBpZiAoaGl0SW5mby5oaXQpIHtcbiAgICAgICAgaWYgKGVuZW15UGxheWVyLmlzR2FtZU92ZXIoKSkgcmV0dXJuO1xuXG4gICAgICAgIHJlbmRlckdhbWVib2FyZHMoW2VuZW15UGxheWVyLCB0aGlzXSk7XG5cbiAgICAgICAgdGhpcy4jYm90SGl0LmdldFJhbmRvbURpcmVjdGlvblRvQXR0YWNrKCk7XG4gICAgICAgIHRoaXMuI2JvdEhpdC5zZXRGaXJzdEhpdENvb3JkcyhoaXRDb29yZHMpO1xuXG4gICAgICAgIGF3YWl0IGRlbGF5KCk7XG4gICAgICB9IGVsc2UgaWYgKGhpdEluZm8uZXJyb3IpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5wZXJmb3JtTmV3SGl0KGVuZW15UGxheWVyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jbGVhclByb3BlcnRpZXMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zdCBoaXRJbmZvID0gZW5lbXlQbGF5ZXIuZ2V0SGl0KHRoaXMuI2JvdEhpdC5nZXROZXh0Q29vcmRzVG9BdHRhY2soKSk7XG5cbiAgICAgIGlmIChoaXRJbmZvLmhpdCkge1xuICAgICAgICBpZiAoZW5lbXlQbGF5ZXIuaXNHYW1lT3ZlcigpKSByZXR1cm47XG5cbiAgICAgICAgcmVuZGVyR2FtZWJvYXJkcyhbZW5lbXlQbGF5ZXIsIHRoaXNdKTtcblxuICAgICAgICB0aGlzLiNib3RIaXQuaXNTaGlwRGlyZWN0aW9uS25vd24gPSB0cnVlO1xuXG4gICAgICAgIGF3YWl0IGRlbGF5KCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChoaXRJbmZvLmVycm9yKSB7XG4gICAgICAgIGlmICh0aGlzLiNib3RIaXQuaXNTaGlwRGlyZWN0aW9uS25vd24pIHtcbiAgICAgICAgICBpZiAodGhpcy4jYm90SGl0LmlzRmlyc3RUYWlsRW5kKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBlcmZvcm1OZXdIaXQoZW5lbXlQbGF5ZXIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuc2V0Rmlyc3RUYWlsRm91bmQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLiNlcnJvckNvdW50Kys7XG5cbiAgICAgICAgICBpZiAodGhpcy4jZXJyb3JDb3VudCA9PT0gNCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wZXJmb3JtTmV3SGl0KGVuZW15UGxheWVyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLiNib3RIaXQuZ2V0UmFuZG9tRGlyZWN0aW9uVG9BdHRhY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaGl0SW5mby5taXNzKSB7XG4gICAgICAgIGlmICh0aGlzLiNib3RIaXQuaXNTaGlwRGlyZWN0aW9uS25vd24pIHtcbiAgICAgICAgICB0aGlzLnNldEZpcnN0VGFpbEZvdW5kKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4jYm90SGl0LmdldFJhbmRvbURpcmVjdGlvblRvQXR0YWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIERpcmVjdGlvbiB7XG4gIHN0YXRpYyBmaXJzdEhpdENvb3JkcztcblxuICBzdGF0aWMgaGl0Q29vcmRzO1xuXG4gIHNldEZpcnN0SGl0Q29vcmRzKGZpcnN0SGl0Q29vcmRzKSB7XG4gICAgRGlyZWN0aW9uLmZpcnN0SGl0Q29vcmRzID0gZmlyc3RIaXRDb29yZHM7XG4gICAgRGlyZWN0aW9uLmhpdENvb3JkcyA9IGZpcnN0SGl0Q29vcmRzO1xuICB9XG5cbiAgcmVzdG9yZUhpdENvb3JkcygpIHtcbiAgICBEaXJlY3Rpb24uaGl0Q29vcmRzID0gRGlyZWN0aW9uLmZpcnN0SGl0Q29vcmRzO1xuICB9XG59XG5cbmNsYXNzIExlZnREaXJlY3Rpb24gZXh0ZW5kcyBEaXJlY3Rpb24ge1xuICBnZXROZXh0Q29vcmRzKCkge1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBEaXJlY3Rpb24uaGl0Q29vcmRzO1xuICAgIERpcmVjdGlvbi5oaXRDb29yZHMgPSBbcm93LCBjb2wgLSAxXTtcblxuICAgIHJldHVybiBEaXJlY3Rpb24uaGl0Q29vcmRzO1xuICB9XG5cbiAgZ2V0T3Bwb3NpdGVEaXJlY3Rpb24oKSB7XG4gICAgRGlyZWN0aW9uLmhpdENvb3JkcyA9IERpcmVjdGlvbi5maXJzdEhpdENvb3JkcztcblxuICAgIHJldHVybiBuZXcgUmlnaHREaXJlY3Rpb24oKTtcbiAgfVxufVxuXG5jbGFzcyBSaWdodERpcmVjdGlvbiBleHRlbmRzIERpcmVjdGlvbiB7XG4gIGdldE5leHRDb29yZHMoKSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IERpcmVjdGlvbi5oaXRDb29yZHM7XG4gICAgRGlyZWN0aW9uLmhpdENvb3JkcyA9IFtyb3csIGNvbCArIDFdO1xuXG4gICAgcmV0dXJuIERpcmVjdGlvbi5oaXRDb29yZHM7XG4gIH1cblxuICBnZXRPcHBvc2l0ZURpcmVjdGlvbigpIHtcbiAgICBEaXJlY3Rpb24uaGl0Q29vcmRzID0gRGlyZWN0aW9uLmZpcnN0SGl0Q29vcmRzO1xuXG4gICAgcmV0dXJuIG5ldyBMZWZ0RGlyZWN0aW9uKCk7XG4gIH1cbn1cblxuY2xhc3MgVG9wRGlyZWN0aW9uIGV4dGVuZHMgRGlyZWN0aW9uIHtcbiAgZ2V0TmV4dENvb3JkcygpIHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gRGlyZWN0aW9uLmhpdENvb3JkcztcbiAgICBEaXJlY3Rpb24uaGl0Q29vcmRzID0gW3JvdyAtIDEsIGNvbF07XG5cbiAgICByZXR1cm4gRGlyZWN0aW9uLmhpdENvb3JkcztcbiAgfVxuXG4gIGdldE9wcG9zaXRlRGlyZWN0aW9uKCkge1xuICAgIERpcmVjdGlvbi5oaXRDb29yZHMgPSBEaXJlY3Rpb24uZmlyc3RIaXRDb29yZHM7XG5cbiAgICByZXR1cm4gbmV3IEJvdHRvbURpcmVjdGlvbigpO1xuICB9XG59XG5cbmNsYXNzIEJvdHRvbURpcmVjdGlvbiBleHRlbmRzIERpcmVjdGlvbiB7XG4gIGdldE5leHRDb29yZHMoKSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IERpcmVjdGlvbi5oaXRDb29yZHM7XG4gICAgRGlyZWN0aW9uLmhpdENvb3JkcyA9IFtyb3cgKyAxLCBjb2xdO1xuXG4gICAgcmV0dXJuIERpcmVjdGlvbi5oaXRDb29yZHM7XG4gIH1cblxuICBnZXRPcHBvc2l0ZURpcmVjdGlvbigpIHtcbiAgICBEaXJlY3Rpb24uaGl0Q29vcmRzID0gRGlyZWN0aW9uLmZpcnN0SGl0Q29vcmRzO1xuXG4gICAgcmV0dXJuIG5ldyBUb3BEaXJlY3Rpb24oKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBbXG4gIG5ldyBMZWZ0RGlyZWN0aW9uKCksXG4gIG5ldyBSaWdodERpcmVjdGlvbigpLFxuICBuZXcgVG9wRGlyZWN0aW9uKCksXG4gIG5ldyBCb3R0b21EaXJlY3Rpb24oKSxcbl07XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4uL2dhbWVib2FyZC9nYW1lYm9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICAjbmFtZTtcblxuICAjZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLiNuYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLiNuYW1lO1xuICB9XG5cbiAgZ2V0U2hpcHNDb29yZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2dhbWVib2FyZC5nZXRTaGlwc0Nvb3JkcygpO1xuICB9XG5cbiAgZ2V0SGl0c0Nvb3JkcygpIHtcbiAgICByZXR1cm4gdGhpcy4jZ2FtZWJvYXJkLmdldEhpdHNDb29yZHMoKTtcbiAgfVxuXG4gIGdldEhpdChjb29yZHMpIHtcbiAgICByZXR1cm4gdGhpcy4jZ2FtZWJvYXJkLmdldEhpdChjb29yZHMpO1xuICB9XG5cbiAgcGxhY2VTaGlwKHNoaXAsIGNvb3JkcywgZGlyZWN0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuI2dhbWVib2FyZC5wbGFjZVNoaXAoc2hpcCwgY29vcmRzLCBkaXJlY3Rpb24pO1xuICB9XG5cbiAgYWRkUmFuZG9tbHlQbGFjZWRTaGlwcygpIHtcbiAgICB0aGlzLiNnYW1lYm9hcmQuYWRkUmFuZG9tbHlQbGFjZWRTaGlwcygpO1xuICB9XG5cbiAgcmVtb3ZlU2hpcHMoKSB7XG4gICAgdGhpcy4jZ2FtZWJvYXJkLnJlbW92ZVNoaXBzKCk7XG4gIH1cblxuICBpc0dhbWVPdmVyKCkge1xuICAgIHJldHVybiB0aGlzLiNnYW1lYm9hcmQuaXNHYW1lT3ZlcigpO1xuICB9XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVhbFBsYXllciBleHRlbmRzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCdSZWFsJyk7XG4gIH1cblxuICBwZXJmb3JtSGl0KGVuZW15UGxheWVyLCBjb29yZHMpIHtcbiAgICByZXR1cm4gZW5lbXlQbGF5ZXIuZ2V0SGl0KGNvb3Jkcyk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAjaGl0cyA9IDA7XG5cbiAgI2xlbmd0aDtcblxuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLiNsZW5ndGggPSBsZW5ndGg7XG4gIH1cblxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLiNsZW5ndGg7XG4gIH1cblxuICBnZXRIaXQoKSB7XG4gICAgdGhpcy4jaGl0cyArPSAxO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLiNoaXRzID09PSB0aGlzLiNsZW5ndGg7XG4gIH1cbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xufVxuXG5ib2R5IHtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG59XG5cbnRhYmxlIHtcbiAgYm9yZGVyOiAxcHggc29saWQ7XG59XG5cbnRkIHtcbiAgYm9yZGVyOiAxcHggc29saWQ7XG4gIHBhZGRpbmc6IDI0cHg7XG59XG5cbi5tYWluIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLnRhYmxlcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMnJlbTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA1MCU7XG4gIHRvcDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbn1cblxuLmJ1dHRvbnMge1xuICBwYWRkaW5nLWJvdHRvbTogMnJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAycmVtO1xufVxuXG5idXR0b24ge1xuICBmb250LXNpemU6IGxhcmdlO1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICBwYWRkaW5nOiAxMnB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQ6IGdyZXk7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgdHJhbnNpdGlvbjogMC4ycztcbn1cblxuYnV0dG9uOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICBib3gtc2hhZG93OiAwIDNweCBibGFjaztcbn1cblxuYnV0dG9uOmhvdmVyOmFjdGl2ZSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgzcHgpO1xuICBib3gtc2hhZG93OiBub25lO1xufVxuXG4uc3RhcnQsXG4uc3RhcnQtbmV3LWdhbWUge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gIGNvbG9yOiBibGFjaztcbiAgZm9udC1zaXplOiB4LWxhcmdlO1xufVxuXG4uc2hpcCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XG59XG5cbi5oaXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB3aWR0aDogMzAlO1xuICBoZWlnaHQ6IDMwJTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgbGVmdDogNTAlO1xuICB0b3A6IDUwJTtcbn1cblxuLnNoaXAtaGl0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG59XG5cbi5wb3B1cCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZm9udC1zaXplOiB4eHgtbGFyZ2U7XG4gIHRvcDogMTAlO1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFVBQVU7RUFDVixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHlCQUF5QjtFQUN6QixtQkFBbUI7QUFDckI7QUFDQTtFQUNFLGFBQWE7RUFDYixTQUFTO0VBQ1Qsa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxRQUFRO0VBQ1IsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsU0FBUztBQUNYOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSwwQkFBMEI7RUFDMUIsZ0JBQWdCO0FBQ2xCOztBQUVBOztFQUVFLGlCQUFpQjtFQUNqQix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsZ0NBQWdDO0VBQ2hDLFNBQVM7RUFDVCxRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxZQUFZO0VBQ1osTUFBTTtFQUNOLE9BQU87QUFDVDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixvQkFBb0I7RUFDcEIsUUFBUTtFQUNSLHNCQUFzQjtBQUN4QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG50YWJsZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZDtcXG59XFxuXFxudGQge1xcbiAgYm9yZGVyOiAxcHggc29saWQ7XFxuICBwYWRkaW5nOiAyNHB4O1xcbn1cXG5cXG4ubWFpbiB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4udGFibGVzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDJyZW07XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA1MCU7XFxuICB0b3A6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbn1cXG5cXG4uYnV0dG9ucyB7XFxuICBwYWRkaW5nLWJvdHRvbTogMnJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAycmVtO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgZm9udC1zaXplOiBsYXJnZTtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICBwYWRkaW5nOiAxMnB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQ6IGdyZXk7XFxuICBjb2xvcjogd2hpdGU7XFxuICB0cmFuc2l0aW9uOiAwLjJzO1xcbn1cXG5cXG5idXR0b246aG92ZXIge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xcbiAgYm94LXNoYWRvdzogMCAzcHggYmxhY2s7XFxufVxcblxcbmJ1dHRvbjpob3ZlcjphY3RpdmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDNweCk7XFxuICBib3gtc2hhZG93OiBub25lO1xcbn1cXG5cXG4uc3RhcnQsXFxuLnN0YXJ0LW5ldy1nYW1lIHtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBjb2xvcjogYmxhY2s7XFxuICBmb250LXNpemU6IHgtbGFyZ2U7XFxufVxcblxcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxufVxcblxcbi5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB3aWR0aDogMzAlO1xcbiAgaGVpZ2h0OiAzMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRvcDogNTAlO1xcbn1cXG5cXG4uc2hpcC1oaXQge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG59XFxuXFxuLnBvcHVwIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGZvbnQtc2l6ZTogeHh4LWxhcmdlO1xcbiAgdG9wOiAxMCU7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5vcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsiR0FNRUJPQVJEX1NJWkUiLCJTSElQX0RJUkVDVElPTlMiLCJHQU1FQk9BRURfU0hJUF9UWVBFUyIsImxlbmd0aCIsImNvdW50IiwiZGVmYXVsdCIsIkRJUkVDVElPTlMiLCJHYW1lIiwicGxheWVycyIsImN1cnJlbnRQbGF5ZXIiLCJlbmVteVBsYXllciIsImNvbnN0cnVjdG9yIiwiZmlyc3RQbGF5ZXIiLCJzZWNvbmRQbGF5ZXIiLCJwZXJmb3JtQ3VycmVudFBsYXllckhpdCIsImNvb3JkcyIsInBlcmZvcm1IaXQiLCJzd2FwUGxheWVyVHVybiIsInRlbXBQbGF5ZXIiLCJyZW1vdmVTaGlwcyIsImFkZFNoaXBzIiwiYWRkUmFuZG9tbHlQbGFjZWRTaGlwcyIsImlzR2FtZU92ZXIiLCJnZXRPdXRlckNpcmNsZUNvb3JkcyIsImdldFJhbmRvbUNvb3JkcyIsImdldFNoaXBDb29yZHMiLCJpc0NlbGwiLCJpc0Nvb3Jkc1BhaXJJbkFycmF5IiwiU2hpcCIsIkdhbWVib2FyZCIsInNoaXBzIiwiaGl0cyIsImdldFVuYXZhaWxhYmxlQ29vcmRzIiwic2hpcHNDb29yZHMiLCJvdXRlckNpcmNsZXNDb29yZHMiLCJmb3JFYWNoIiwic2hpcCIsInB1c2giLCJzaGlwQ29vcmRzIiwib3V0ZXJDaXJjbGUiLCJnZXRBdmFpbGFibGVDb29yZHMiLCJ1bmF2YWlsYWJsZUNvb3JkcyIsImZsYXQiLCJhdmFpbHZhYmxlQ29vcmRzIiwiaSIsImoiLCJjdXJyZW50Q29vcmRzIiwiZ2V0U2hpcHNDb29yZHMiLCJyZWR1Y2UiLCJhY2MiLCJnZXRIaXRzQ29vcmRzIiwicGxhY2VTaGlwIiwiZGlyZWN0aW9uIiwicGxhY2VkU2hpcCIsIk9iamVjdCIsImFzc2lnbiIsImN1cnJlbnRTaGlwVHlwZSIsInJhbmRvbURpcmVjdGlvbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImlzU2hpcFBsYWNlZCIsImdldEhpdCIsImhpdEluZm8iLCJlcnJvciIsImhpdCIsIm1pc3MiLCJpc1N1bmsiLCJldmVyeSIsImNvb3JkIiwiY29vcmRzUGFpciIsImNvb3Jkc0FycmF5Iiwic29tZSIsImluZGV4IiwieCIsInkiLCJ0YXJnZXRDb29yZHMiLCJyb3ciLCJjb2wiLCJnZXRSYW5kb21OdW1iZXJJblJhbmdlIiwibWluIiwibWF4IiwiZGVsYXkiLCJtcyIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsIkNvbXB1dGVyUGxheWVyIiwiUmVhbFBsYXllciIsImdhbWUiLCJwb3B1cCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0YXJ0QnRuIiwic2h1ZmZsZUJ0biIsInN0YXJ0TmV3R2FtZUJ0biIsInRvZ2dsZUdhbWVCdXR0b25zIiwiaGlkZGVuIiwidG9nZ2xlR2FtZU92ZXJFbGVtZW50cyIsInJlbmRlckdhbWVib2FyZHMiLCJ0YWJsZXMiLCJpbm5lckhUTUwiLCJwbGF5ZXIiLCJ0YWJsZSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJoaXRzQ29vcmRzIiwic3R5bGUiLCJwb3NpdGlvbiIsImluc2VydEFkamFjZW50SFRNTCIsImNsYXNzTGlzdCIsImFkZCIsImRvdCIsImFwcGVuZCIsInJlbmRlckdhbWVPdmVyIiwibmFtZSIsImFkZEVuZW15UGxheWVyVGFibGVIaXRMaXN0ZW5lciIsImVuZW15UGxheWVyVGFibGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJ0ZCIsInRhcmdldCIsImNsb3Nlc3QiLCJkYXRhc2V0IiwiY29sdW1uIiwicGFyZW50RWxlbWVudCIsImNyZWF0ZU5ld0dhbWUiLCJCb3RIaXQiLCJkaXJlY3Rpb25zIiwidXNlZERpcmVjdGlvbnMiLCJjdXJyZW50RGlyZWN0aW9uIiwiaXNTaGlwRGlyZWN0aW9uS25vd24iLCJpc0ZpcnN0VGFpbEVuZCIsImFyZyIsImdldE9wcG9zaXRlRGlyZWN0aW9uIiwiZ2V0TmV4dENvb3Jkc1RvQXR0YWNrIiwiZ2V0TmV4dENvb3JkcyIsImdldFJhbmRvbURpcmVjdGlvblRvQXR0YWNrIiwicmVzdG9yZUhpdENvb3JkcyIsInJhbmRvbUluZGV4IiwiaW5jbHVkZXMiLCJzZXRGaXJzdEhpdENvb3JkcyIsImZpcnN0SGl0Q29vcmRzIiwiUGxheWVyIiwiYm90SGl0IiwiZXJyb3JDb3VudCIsImNsZWFyUHJvcGVydGllcyIsInNldEZpcnN0VGFpbEZvdW5kIiwicGVyZm9ybU5ld0hpdCIsImhpdENvb3JkcyIsIkRpcmVjdGlvbiIsIkxlZnREaXJlY3Rpb24iLCJSaWdodERpcmVjdGlvbiIsIlRvcERpcmVjdGlvbiIsIkJvdHRvbURpcmVjdGlvbiIsImdhbWVib2FyZCJdLCJzb3VyY2VSb290IjoiIn0=