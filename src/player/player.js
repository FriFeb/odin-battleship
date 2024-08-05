import Gameboard from '../gameboard/gameboard';

export default class Player {
  #name;

  #gameboard = new Gameboard();

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
