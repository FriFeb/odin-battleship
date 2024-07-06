import { Gameboard } from '../gameboard/gameboard';

export class Player {
  constructor(playerTypeIndex) {
    this.gameboard = new Gameboard();
    this.playerTypeIndex = playerTypeIndex;
  }
}
