import { GAMEBOARD_SIZE, SHIP_DIRECTIONS } from './constants';

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
    ) {
      return false;
    }

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

        if (
          isCell(targetCoords) &&
          !isCoordsPairInArray(targetCoords, shipCoords) &&
          !isCoordsPairInArray(targetCoords, outerCircle)
        ) {
          outerCircle.push(targetCoords);
        }
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

export function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function delay(ms = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
