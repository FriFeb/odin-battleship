import { renderGameboards } from '../..';
import { delay, getRandomCoords } from '../../helpers';
import Player from '../player';
import BotHit from './botHit';

export default class ComputerPlayer extends Player {
  #botHit;

  #errorCount = 0;

  constructor() {
    super('Computer');
  }

  clearProperties() {
    this.#botHit = null;
    this.#errorCount = 0;
  }

  setFirstTailFound() {
    this.#botHit.isFirstTailEnd = true;
    this.#botHit.getOppositeDirection();
  }

  async performNewHit(enemyPlayer) {
    this.clearProperties();
    await this.performHit(enemyPlayer);
  }

  async performHit(enemyPlayer) {
    if (!this.#botHit) {
      this.#botHit = new BotHit();

      const hitCoords = getRandomCoords();

      const hitInfo = enemyPlayer.getHit(hitCoords);

      if (hitInfo.hit) {
        if (enemyPlayer.isGameOver()) return;

        renderGameboards([enemyPlayer, this]);

        this.#botHit.getRandomDirectionToAttack();
        this.#botHit.setFirstHitCoords(hitCoords);

        await delay();
      } else if (hitInfo.error) {
        await this.performNewHit(enemyPlayer);
        return;
      } else {
        this.clearProperties();
        return;
      }
    }

    while (true) {
      const hitInfo = enemyPlayer.getHit(this.#botHit.getNextCoordsToAttack());

      if (hitInfo.hit) {
        if (enemyPlayer.isGameOver()) return;

        renderGameboards([enemyPlayer, this]);

        this.#botHit.isShipDirectionKnown = true;

        await delay();
      }

      if (hitInfo.error) {
        if (this.#botHit.isShipDirectionKnown) {
          if (this.#botHit.isFirstTailEnd) {
            await this.performNewHit(enemyPlayer);
            return;
          }

          this.setFirstTailFound();
        } else {
          this.#errorCount++;

          if (this.#errorCount === 4) {
            await this.performNewHit(enemyPlayer);
            return;
          }

          this.#botHit.getRandomDirectionToAttack();
        }
      }

      if (hitInfo.miss) {
        if (this.#botHit.isShipDirectionKnown) {
          this.setFirstTailFound();
          return;
        }

        this.#botHit.getRandomDirectionToAttack();
        return;
      }
    }
  }
}
