import { getRandomCoords } from '../helpers';
import Player from './player';

export default class ComputerPlayer extends Player {
  constructor() {
    super('Computer');
  }

  performHit(enemyPlayer) {
    let hitInfo;

    do {
      hitInfo = enemyPlayer.getHit(getRandomCoords());
    } while (hitInfo.error || (hitInfo.isShipHit && !enemyPlayer.isGameOver()));
  }
}
