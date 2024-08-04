import Ship from '../ship/ship';
import Gameboard from './gameboard';

describe('gameboard class testing', () => {
  it('is gameboard', () => {
    expect(new Gameboard()).toEqual({
      ships: [],
      hits: [],
    });
  });

  it('place ship', () => {
    const gameboard = new Gameboard();

    expect(gameboard.placeShip(new Ship(2), [0, 0], 'h')).toBe(true);
  });

  it('gameboard after placing ship', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(new Ship(2), [0, 0], 'h');

    expect(gameboard.ships).toEqual([
      {
        length: 2,
        hits: 0,
        shipCoords: [
          [0, 0],
          [1, 0],
        ],
        outerCircle: [
          [0, 1],
          [1, 1],
          [2, 0],
          [2, 1],
        ],
      },
    ]);
  });

  it('place ship out of bounds', () => {
    const gameboard = new Gameboard();

    expect(gameboard.placeShip(new Ship(3), [-1, 0], 'h')).toBe(false);
  });

  it('place ship out of bounds', () => {
    const gameboard = new Gameboard();

    expect(gameboard.placeShip(new Ship(1), [8, 0])).toBe(false);
  });

  it('place ship out of bounds', () => {
    const gameboard = new Gameboard();

    expect(gameboard.placeShip(new Ship(3), [0, -1], 'v')).toBe(false);
  });

  it('place ship out of bounds', () => {
    const gameboard = new Gameboard();

    expect(gameboard.placeShip(new Ship(1), [0, 8])).toBe(false);
  });

  it('place ship to go out of bounds', () => {
    const gameboard = new Gameboard();

    expect(gameboard.placeShip(new Ship(3), [6, 0], 'h')).toBe(false);
  });

  it('place ship to go out of bounds', () => {
    const gameboard = new Gameboard();

    expect(gameboard.placeShip(new Ship(3), [0, 6], 'v')).toBe(false);
  });

  it('place ship to overlap with another one', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(new Ship(2), [0, 0], 'h');

    expect(gameboard.placeShip(new Ship(1), [1, 0])).toBe(false);
  });

  it('place ship to overlap with outer circle of another one', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(new Ship(1), [0, 0]);

    expect(gameboard.placeShip(new Ship(1), [1, 1])).toBe(false);
  });

  it('get hit', () => {
    const gameboard = new Gameboard();

    expect(gameboard.getHit([0, 0])).toBe(true);
  });

  it('gameboard after getting hit', () => {
    const gameboard = new Gameboard();
    gameboard.getHit([0, 0]);

    expect(gameboard).toEqual({
      ships: [],
      hits: [[0, 0]],
    });
  });

  it('get hit out of bounds', () => {
    const gameboard = new Gameboard();

    expect(gameboard.getHit([-1, 0])).toBe(false);
  });

  it('get hit out of bounds', () => {
    const gameboard = new Gameboard();

    expect(gameboard.getHit([0, -1])).toBe(false);
  });

  it('get hit out of bounds', () => {
    const gameboard = new Gameboard();

    expect(gameboard.getHit([8, 0])).toBe(false);
  });

  it('get hit out of bounds', () => {
    const gameboard = new Gameboard();

    expect(gameboard.getHit([0, 8])).toBe(false);
  });

  it('hit ship', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(new Ship(2), [0, 0], 'h');
    gameboard.getHit([0, 0]);

    expect(gameboard).toEqual({
      ships: [
        {
          length: 2,
          hits: 1,
          shipCoords: [
            [0, 0],
            [1, 0],
          ],
          outerCircle: [
            [0, 1],
            [1, 1],
            [2, 0],
            [2, 1],
          ],
        },
      ],
      hits: [[0, 0]],
    });
  });

  it('game over', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(new Ship(1), [0, 0]);
    gameboard.getHit([0, 0]);

    expect(gameboard.isGameOver()).toBe(true);
  });
});
