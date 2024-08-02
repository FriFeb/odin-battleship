import { Gameboard } from '../gameboard/gameboard';
import { getRandomCoords } from '../helpers';

class Player {
  constructor(name) {
    this.gameboard = new Gameboard();
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getShipsCoords() {
    return this.gameboard.getShipsCoords();
  }

  getHitsCoords() {
    return this.gameboard.getHitsCoords();
  }

  getHit(coords) {
    return this.gameboard.getHit(coords);
  }

  placeShip(ship, coords, direction) {
    return this.gameboard.placeShip(ship, coords, direction);
  }

  addRandomlyPlacedShips() {
    this.gameboard.addRandomlyPlacedShips();
  }

  removeShips() {
    this.gameboard.removeShips();
  }

  refreshGameboard() {
    this.gameboard.refreshGameboard();
  }

  isGameOver() {
    return this.gameboard.isGameOver();
  }
}

export class RealPlayer extends Player {
  constructor() {
    super('Real');
  }

  performHit(coords, enemyPlayer) {
    return enemyPlayer.getHit(coords);
  }
}

export class ComputerPlayer extends Player {
  constructor() {
    super('Computer');
  }

  performHit(enemyPlayer) {
    let hitInfo;

    do {
      hitInfo = enemyPlayer.getHit(getRandomCoords());
    } while (hitInfo.error || (hitInfo.isShipHit && !enemyPlayer.isGameOver()));
  }
}
