export default class Game {
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
