export class Game {
  constructor(firstPlayer, secondPlayer) {
    // this.players = {
    //   realPlayer: new RealPlayer(),
    //   computerPlayer: new ComputerPlayer(),
    // };

    // this.currentPlayer = this.players.realPlayer;
    // this.enemyPlayer = this.players.computerPlayer;

    this._currentPlayer = firstPlayer;
    this._enemyPlayer = secondPlayer;

    this._isGameStarted = false;
  }

  get isGameStarted() {
    return this._isGameStarted;
  }

  set isGameStarted(value) {
    this._isGameStarted = value;
  }

  swapPlayerTurn() {
    this._currentPlayer =
      this._currentPlayer === this._currentPlayer
        ? this._enemyPlayer
        : this._currentPlayer;

    this._enemyPlayer =
      this._enemyPlayer === this._currentPlayer
        ? this._enemyPlayer
        : this._currentPlayer;
  }

  shuffleShips() {
    this._currentPlayer.removeShips();
    this._enemyPlayer.removeShips();

    this._currentPlayer.addRandomlyPlacedShips();
    this._enemyPlayer.addRandomlyPlacedShips();
  }

  isGameOver() {
    // return Array.from(this.players).some((player) =>
    //   player.gameboard.isGameOver()
    // );
    return this._currentPlayer.isGameOver() || this._enemyPlayer.isGameOver();
  }
}
