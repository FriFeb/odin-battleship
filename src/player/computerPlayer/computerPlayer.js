import { getRandomCoords } from '../../helpers';
import Player from '../player';
import BotHit from './botHit';

export default class ComputerPlayer extends Player {
  #botHit;
  #hitInfo;
  #errorCount = 0;
  #hitCoords;

  constructor() {
    super('Computer');
  }

  clearData() {
    this.#errorCount = 0;
    this.#botHit = null;
  }

  performHit(enemyPlayer) {
    if (!this.#botHit) {
      debugger;
      this.#botHit = new BotHit();

      this.#hitCoords = getRandomCoords();

      this.#hitInfo = enemyPlayer.getHit(this.#hitCoords);

      if (this.#hitInfo.isShipHit) {
        this.#botHit.getRandomDirectionToAttack();
        this.#botHit.setCurrentDirectionFirstHitCoords(this.#hitCoords);
      } else if (this.#hitInfo.error) {
        this.clearData();
        this.performHit(enemyPlayer);
        return;
      } else {
        this.clearData();
        return;
      }
    }

    while (true) {
      this.#hitInfo = enemyPlayer.getHit(this.#botHit.getNextCoordsToAttack());

      if (this.#hitInfo.isShipHit) {
        this.#botHit.isShipDirectionKnown = true;
      }

      if (this.#hitInfo.error) {
        if (this.#botHit.isShipDirectionKnown) {
          if (this.#botHit.isFirstTailEnd) {
            // the ship is sunk
            debugger;
            this.clearData();
            this.performHit(enemyPlayer);
            return;
          }

          this.#botHit.isFirstTailEnd = true;
          this.#botHit.getOppositeDirection();
        } else {
          this.#errorCount++;

          if (this.#errorCount === 4) {
            // the ship is sunk
            this.clearData();
            this.performHit(enemyPlayer);
            return;
          }

          this.#botHit.getRandomDirectionToAttack();
        }
      }

      if (!this.#hitInfo.error && !this.#hitInfo.isShipHit) {
        if (this.#botHit.isShipDirectionKnown) {
          this.#botHit.isFirstTailEnd = true;
          this.#botHit.getOppositeDirection();
          return;
        }
        this.#botHit.getRandomDirectionToAttack();
        return;
      }
    }
  }
}
