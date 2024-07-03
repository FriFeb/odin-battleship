import { GAMEBOARD_SIZE } from '../constants';

export class Gameboard {
  constructor() {
    this.ships = [];
    this.hits = [];
  }

  _isCell(coords) {
    return coords.every((coord) => {
      return coord >= 0 && coord < GAMEBOARD_SIZE;
    });
  }

  _getShipCoords(ship, coords, direction) {
    const { length } = ship;
    const [x, y] = coords;
    const shipCoords = [];

    for (let i = 0; i < length; i++) {
      switch (direction) {
        case 'h':
          shipCoords.push([x + i, y]);
          break;

        case 'v':
        default:
          shipCoords.push([x, y + i]);

          break;
      }
    }

    return shipCoords;
  }

  _isCoordsPairInArray(shipCoords, coordsPair) {
    return shipCoords.some((coords) => {
      return coords.every((coord, index) => {
        return coord === coordsPair[index];
      });
    });
  }

  _getOuterCircleCoords(shipCoords) {
    const outerCircle = [];

    shipCoords.forEach((coords) => {
      const [x, y] = coords;

      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          const targetCoords = [i, j];

          if (!this._isCell(targetCoords)) continue;
          if (this._isCoordsPairInArray(shipCoords, targetCoords)) continue;
          if (this._isCoordsPairInArray(outerCircle, targetCoords)) continue;

          outerCircle.push(targetCoords);
        }
      }
    });

    return outerCircle;
  }

  placeShip(ship, coords, direction) {
    /*
    get ship coords
      if coords out of bounds
      if coords overlap with another ship coords
      if coords overlap with another ship outerCircle
        return false
        
    get outerCircle coords
    assign these coords to the ship obj
    push new ship obj to this.ships array
    return true
    */

    const shipCoords = this._getShipCoords(ship, coords, direction);

    const outerCircle = this._getOuterCircleCoords(shipCoords);

    ship = Object.assign(ship, { shipCoords }, { outerCircle });

    this.ships.push(ship);

    return true;
  }

  getHit() {}

  isGameOver() {}
}
