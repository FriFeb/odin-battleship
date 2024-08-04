import Player from './player';

export default class RealPlayer extends Player {
  constructor() {
    super('Real');
  }

  performHit(enemyPlayer, coords) {
    return enemyPlayer.getHit(coords);
  }
}
