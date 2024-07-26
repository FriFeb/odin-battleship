import { GAMEBOARD_SIZE, SHIP_DIRECTIONS } from '../constants';

export class Gameboard {
  constructor() {
    this.ships = [];
    this.hits = [];
  }

  _isCell(coords) {
    return coords.every((coord) => coord >= 0 && coord < GAMEBOARD_SIZE);
  }

  _isCoordsPairInArray(coordsPair, coordsArray) {
    return coordsArray.some((coords) =>
      coords.every((coord, index) => coord === coordsPair[index])
    );
  }

  _getUnavailableCoords() {
    const unavailableCoords = [];

    this.ships.forEach((ship) => {
      unavailableCoords.push(...ship.shipCoords);
      unavailableCoords.push(...ship.outerCircle);
    });

    return unavailableCoords;
  }

  _isShipCoord(coords) {
    return !!(
      this._isCell(coords) &&
      !this._isCoordsPairInArray(coords, this._getUnavailableCoords())
    );
  }

  _getShipCoords(ship, coords, direction) {
    const { length } = ship;
    const [x, y] = coords;
    const shipCoords = [];
    let currentCoords;

    for (let i = 0; i < length; i++) {
      switch (SHIP_DIRECTIONS[direction]) {
        case 'horizontal':
          currentCoords = [x + i, y];
          break;

        case 'vertical':
        default:
          currentCoords = [x, y + i];
          break;
      }

      if (!this._isShipCoord(currentCoords)) return false;

      shipCoords.push(currentCoords);
    }

    return shipCoords;
  }

  _getOuterCircleCoords(shipCoords) {
    const outerCircle = [];

    shipCoords.forEach((coords) => {
      const [x, y] = coords;

      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          const targetCoords = [i, j];

          if (!this._isCell(targetCoords)) continue;
          if (this._isCoordsPairInArray(targetCoords, shipCoords)) continue;
          if (this._isCoordsPairInArray(targetCoords, outerCircle)) continue;

          outerCircle.push(targetCoords);
        }
      }
    });

    return outerCircle;
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
    const shipCoords = this._getShipCoords(ship, coords, direction);

    if (!shipCoords) return false;

    const outerCircle = this._getOuterCircleCoords(shipCoords);

    ship = Object.assign(ship, { shipCoords }, { outerCircle });

    this.ships.push(ship);

    return true;
  }

  getHit(coords) {
    if (!this._isCell(coords)) return false;
    if (this._isCoordsPairInArray(coords, this.hits)) return false;

    this.ships.forEach((ship) => {
      if (this._isCoordsPairInArray(coords, ship.shipCoords)) {
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
