export class Game {
  constructor(firstPlayer, secondPlayer) {
    this._currentPlayer = firstPlayer;
    this._enemyPlayer = secondPlayer;
  }

  get currentPlayer() {
    return this._currentPlayer;
  }

  get enemyPlayer() {
    return this._enemyPlayer;
  }

  swapPlayerTurn() {
    const tempPlayer = this._currentPlayer;
    this._currentPlayer = this._enemyPlayer;
    this._enemyPlayer = tempPlayer;
  }

  refreshGameboard() {
    this._currentPlayer.refreshGameboard();
    this._enemyPlayer.refreshGameboard();
  }

  shuffleShips() {
    this._currentPlayer.removeShips();
    this._enemyPlayer.removeShips();

    this._currentPlayer.addRandomlyPlacedShips();
    this._enemyPlayer.addRandomlyPlacedShips();
  }

  isEnemyPlayerLost() {
    return this._enemyPlayer.isGameOver();
  }

  isGameOver() {
    return this._currentPlayer.isGameOver() || this._enemyPlayer.isGameOver();
  }
}
