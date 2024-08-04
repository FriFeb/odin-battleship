export default class Game {
  #currentPlayer;

  #enemyPlayer;

  constructor(firstPlayer, secondPlayer) {
    this.#currentPlayer = firstPlayer;
    this.#enemyPlayer = secondPlayer;
  }

  get currentPlayer() {
    return this.#currentPlayer;
  }

  get enemyPlayer() {
    return this.#enemyPlayer;
  }

  performCurrentPlayerHit(coords) {
    return this.#currentPlayer.performHit(this.#enemyPlayer, coords);
  }

  swapPlayerTurn() {
    const tempPlayer = this.#currentPlayer;
    this.#currentPlayer = this.#enemyPlayer;
    this.#enemyPlayer = tempPlayer;
  }

  refreshGameboard() {
    this.#currentPlayer.refreshGameboard();
    this.#enemyPlayer.refreshGameboard();
  }

  shuffleShips() {
    this.#currentPlayer.removeShips();
    this.#enemyPlayer.removeShips();

    this.#currentPlayer.addRandomlyPlacedShips();
    this.#enemyPlayer.addRandomlyPlacedShips();
  }

  isGameOver() {
    return this.#currentPlayer.isGameOver() || this.#enemyPlayer.isGameOver();
  }
}
