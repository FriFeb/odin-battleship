export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  getHit() {
    this.hits++;
  }

  isSunk() {
    return this.hits === this.length;
  }
}
