import { GAMEBOARD_SIZE, SHIP_DIRECTIONS } from './constants';
import { Ship } from './ship/ship';

export function isCell(coords) {
  return coords.every((coord) => coord >= 0 && coord < GAMEBOARD_SIZE);
}

export function isCoordsPairInArray(coordsPair, coordsArray) {
  return coordsArray.some((coords) =>
    coords.every((coord, index) => coord === coordsPair[index])
  );
}

export function getShipCoords(ship, coords, direction, availvableCoords) {
  const { length } = ship;
  const [x, y] = coords;
  const shipCoords = [];
  let currentCoords;

  for (let i = 0; i < length; i++) {
    switch (SHIP_DIRECTIONS[direction]) {
      case 'vertical':
        currentCoords = [x + i, y];
        break;

      case 'horizontal':
      default:
        currentCoords = [x, y + i];
        break;
    }

    if (
      !isCell(currentCoords) ||
      !isCoordsPairInArray(currentCoords, availvableCoords)
    )
      return false;

    shipCoords.push(currentCoords);
  }

  return shipCoords;
}

export function getOuterCircleCoords(shipCoords) {
  const outerCircle = [];

  shipCoords.forEach((coords) => {
    const [x, y] = coords;

    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        const targetCoords = [i, j];

        if (!isCell(targetCoords)) continue;
        if (isCoordsPairInArray(targetCoords, shipCoords)) continue;
        if (isCoordsPairInArray(targetCoords, outerCircle)) continue;

        outerCircle.push(targetCoords);
      }
    }
  });

  return outerCircle;
}

export function getRandomCoords() {
  const row = Math.floor(Math.random() * GAMEBOARD_SIZE);
  const col = Math.floor(Math.random() * GAMEBOARD_SIZE);

  return [row, col];
}

export function isGameOver(players) {
  return players.some((player) => player.gameboard.isGameOver());
}

export function addRandomlyPlacedShips(gameboard) {
  gameboard.ships = [];
  const shipTypes = 4;

  for (let i = 0; i < shipTypes; i++) {
    for (let j = 0; j <= i; j++) {
      const currentShipTypeLength = shipTypes - i;
      const randomDirection = Math.floor(Math.random() * 2);

      while (
        !gameboard.placeShip(
          new Ship(currentShipTypeLength),
          getRandomCoords(),
          randomDirection
        )
      )
        continue;
    }
  }
}
