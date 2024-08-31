import { DIRECTIONS } from '../../constants';

export default class BotHit {
  // #firstHitCoords;
  // #currentHitCoords;

  #directions = DIRECTIONS;
  #directionIndex = 0;
  #currentDirection;

  #isShipDirectionKnown;
  #isFirstTailEnd;

  // set firstHitCoords(coords) {
  //   this.#firstHitCoords = coords;
  // }

  // get currentHitCoords() {
  //   return this.#currentHitCoords;
  // }

  // set currentHitCoords(coords) {
  //   this.#currentHitCoords = coords;
  // }

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
    if (this.#currentDirection) {
      this.#currentDirection.setHitCoordsToBeFirstHitCoords();
    }

    this.#currentDirection = this.#directions[this.#directionIndex];
    this.#directionIndex++;
  }

  setCurrentDirectionFirstHitCoords(firstHitCoords) {
    this.#currentDirection.setFirstHitCoords(firstHitCoords);
  }
}
