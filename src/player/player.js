import { Gameboard } from '../gameboard/gameboard';

export class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }

  getShipsCoords() {
    const shipsCoords = this.gameboard.ships.reduce((acc, ship) => {
      acc.push(ship.shipCoords);
      return acc;
    }, []);

    return shipsCoords.flat();
  }

  getHitsCoords() {
    return this.gameboard.hits;
  }
}

// need 2 child classes BotPlayer and HumanPlayer
// each to have own getHit method
