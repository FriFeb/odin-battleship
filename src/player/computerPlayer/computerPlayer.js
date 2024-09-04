import { renderGameboards } from '../..';
import { delay, getRandomCoords } from '../../helpers';
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

  async performHit(enemyPlayer) {
    if (!this.#botHit) {
      this.#botHit = new BotHit();

      this.#hitCoords = getRandomCoords();

      this.#hitInfo = enemyPlayer.getHit(this.#hitCoords);

      if (this.#hitInfo.isShipHit) {
        this.#botHit.getRandomDirectionToAttack();
        this.#botHit.setCurrentDirectionFirstHitCoords(this.#hitCoords);
        renderGameboards([enemyPlayer, this]);
        await delay();
      } else if (this.#hitInfo.error) {
        this.clearData();
        await this.performHit(enemyPlayer);
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
        renderGameboards([enemyPlayer, this]);

        await delay();
      }

      if (this.#hitInfo.error) {
        if (this.#botHit.isShipDirectionKnown) {
          if (this.#botHit.isFirstTailEnd) {
            // the ship is sunk
            this.clearData();
            await this.performHit(enemyPlayer);
            return;
          }

          this.#botHit.isFirstTailEnd = true;
          this.#botHit.getOppositeDirection();
        } else {
          this.#errorCount++;

          if (this.#errorCount === 4) {
            // the ship is sunk
            this.clearData();
            await this.performHit(enemyPlayer);
            return;
          }

          this.#botHit.getRandomDirectionToAttack();
        }
      }

      // miss
      if (!this.#hitInfo.error && !this.#hitInfo.isShipHit) {
        if (this.#botHit.isShipDirectionKnown) {
          debugger;
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
