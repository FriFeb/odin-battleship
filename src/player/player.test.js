import { Player } from './player';

describe('player class tests', () => {
  it('is player', () => {
    expect(new Player(0)).toEqual({
      gameboard: {
        ships: [],
        hits: [],
      },
      playerTypeIndex: 0,
    });
  });
});
