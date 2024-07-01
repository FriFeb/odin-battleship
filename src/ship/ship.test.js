import { Ship } from './ship';

describe('ship class testing', () => {
  it('is ship', () => {
    expect(new Ship(2)).toEqual({
      length: 2,
      hits: 0,
    });
  });

  it('get hit', () => {
    const ship = new Ship(2);
    ship.getHit();

    expect(ship).toEqual({
      length: 2,
      hits: 1,
    });
  });

  it('is sunk', () => {
    const ship = new Ship(2);
    ship.getHit();
    ship.getHit();

    expect(ship.isSunk()).toBe(true);
  });
});
