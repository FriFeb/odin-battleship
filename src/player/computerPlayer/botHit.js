import { DIRECTIONS } from '../../constants';
import { getRandomNumberInRange } from '../../helpers';

export default class BotHit {
  #directions = DIRECTIONS;

  #usedDirections = [];

  #currentDirection;

  #isShipDirectionKnown;

  #isFirstTailEnd;

  get isShipDirectionKnown() {
    return this.#isShipDirectionKnown;
  }

  set isShipDirectionKnown(arg) {
    this.#isShipDirectionKnown = arg;
  }

  get isFirstTailEnd() {
    return this.#isFirstTailEnd;
  }

  set isFirstTailEnd(arg) {
    this.#isFirstTailEnd = arg;
  }

  getOppositeDirection() {
    this.#currentDirection = this.#currentDirection.getOppositeDirection();
  }

  getNextCoordsToAttack() {
    return this.#currentDirection.getNextCoords();
  }

  getRandomDirectionToAttack() {
    if (this.#currentDirection) this.#currentDirection.restoreHitCoords();

    let randomIndex;

    do {
      randomIndex = getRandomNumberInRange(0, 3);
    } while (this.#usedDirections.includes(randomIndex));

    this.#currentDirection = this.#directions[randomIndex];
    this.#usedDirections.push(randomIndex);
  }

  setFirstHitCoords(firstHitCoords) {
    this.#currentDirection.setFirstHitCoords(firstHitCoords);
  }
}
