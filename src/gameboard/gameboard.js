import { GAMEBOARD_SIZE } from '../constants';
import {
  getOuterCircleCoords,
  getShipCoords,
  isCell,
  isCoordsPairInArray,
} from '../helpers';

export class Gameboard {
  constructor() {
    this.ships = [];
    this.hits = [];
  }

  getUnavailableCoords() {
    const shipsCoords = [];
    const outerCirclesCoords = [];

    this.ships.forEach((ship) => {
      shipsCoords.push(...ship.shipCoords);
      outerCirclesCoords.push(...ship.outerCircle);
    });

    return [shipsCoords, outerCirclesCoords];
  }

  getAvailableCoords() {
    const unavailableCoords = this.getUnavailableCoords(this.ships).flat();
    const availvableCoords = [];

    for (let i = 0; i < GAMEBOARD_SIZE; i++) {
      for (let j = 0; j < GAMEBOARD_SIZE; j++) {
        const currentCoords = [i, j];

        if (isCoordsPairInArray(currentCoords, unavailableCoords)) continue;

        availvableCoords.push(currentCoords);
      }
    }

    return availvableCoords;
  }

  placeShip(ship, coords, direction) {
    const shipCoords = getShipCoords(
      ship,
      coords,
      direction,
      this.getAvailableCoords()
    );

    if (!shipCoords) return false;

    const outerCircle = getOuterCircleCoords(shipCoords);

    ship = Object.assign(ship, { shipCoords }, { outerCircle });

    this.ships.push(ship);

    return true;
  }

  getHit(coords) {
    if (!isCell(coords)) return false;
    if (isCoordsPairInArray(coords, this.hits)) return false;

    this.ships.forEach((ship) => {
      if (isCoordsPairInArray(coords, ship.shipCoords)) {
        ship.getHit();

        if (ship.isSunk()) this.hits.push(...ship.outerCircle);
      }
    });

    this.hits.push(coords);

    return true;
  }

  isGameOver() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
