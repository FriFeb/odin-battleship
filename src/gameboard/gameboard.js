import { GAMEBOAED_SHIP_TYPES, GAMEBOARD_SIZE } from '../constants';
import {
  getOuterCircleCoords,
  getRandomCoords,
  getShipCoords,
  isCell,
  isCoordsPairInArray,
} from '../helpers';
import { Ship } from '../ship/ship';

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

        if (!isCoordsPairInArray(currentCoords, unavailableCoords)) {
          availvableCoords.push(currentCoords);
        }
      }
    }

    return availvableCoords;
  }

  getShipsCoords() {
    const shipsCoords = this.ships.reduce((acc, ship) => {
      acc.push(ship.shipCoords);
      return acc;
    }, []);

    return shipsCoords.flat();
  }

  getHitsCoords() {
    return this.hits;
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

    const placedShip = Object.assign(ship, { shipCoords }, { outerCircle });

    this.ships.push(placedShip);

    return true;
  }

  addRandomlyPlacedShips() {
    for (let i = 0; i < GAMEBOAED_SHIP_TYPES.length; i++) {
      const currentShipType = GAMEBOAED_SHIP_TYPES[i];

      for (let j = 0; j < currentShipType.count; j++) {
        const randomDirection = Math.floor(Math.random() * 2);

        let isShipPlaced;
        do {
          isShipPlaced = this.placeShip(
            new Ship(currentShipType.length),
            getRandomCoords(),
            randomDirection
          );
        } while (!isShipPlaced);
      }
    }
  }

  removeShips() {
    this.ships = [];
  }

  getHit(coords) {
    const hitInfo = { error: true, isShipHit: false };

    if (!isCell(coords) || isCoordsPairInArray(coords, this.hits)) {
      return hitInfo;
    }

    hitInfo.error = false;

    this.ships.forEach((ship) => {
      if (isCoordsPairInArray(coords, ship.shipCoords)) {
        ship.getHit();
        hitInfo.isShipHit = true;

        if (ship.isSunk()) this.hits.push(...ship.outerCircle);
      }
    });

    this.hits.push(coords);

    return hitInfo;
  }

  isGameOver() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
