export default class Ship {
  #hits = 0;

  #length;

  constructor(length) {
    this.#length = length;
  }

  get length() {
    return this.#length;
  }

  getHit() {
    this.#hits += 1;
  }

  isSunk() {
    return this.#hits === this.#length;
  }
}
