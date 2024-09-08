class Direction {
  static firstHitCoords;

  static hitCoords;

  setFirstHitCoords(firstHitCoords) {
    Direction.firstHitCoords = firstHitCoords;
    Direction.hitCoords = firstHitCoords;
  }

  restoreHitCoords() {
    Direction.hitCoords = Direction.firstHitCoords;
  }
}

class LeftDirection extends Direction {
  getNextCoords() {
    const [row, col] = Direction.hitCoords;
    Direction.hitCoords = [row, col - 1];

    return Direction.hitCoords;
  }

  getOppositeDirection() {
    Direction.hitCoords = Direction.firstHitCoords;

    return new RightDirection();
  }
}

class RightDirection extends Direction {
  getNextCoords() {
    const [row, col] = Direction.hitCoords;
    Direction.hitCoords = [row, col + 1];

    return Direction.hitCoords;
  }

  getOppositeDirection() {
    Direction.hitCoords = Direction.firstHitCoords;

    return new LeftDirection();
  }
}

class TopDirection extends Direction {
  getNextCoords() {
    const [row, col] = Direction.hitCoords;
    Direction.hitCoords = [row - 1, col];

    return Direction.hitCoords;
  }

  getOppositeDirection() {
    Direction.hitCoords = Direction.firstHitCoords;

    return new BottomDirection();
  }
}

class BottomDirection extends Direction {
  getNextCoords() {
    const [row, col] = Direction.hitCoords;
    Direction.hitCoords = [row + 1, col];

    return Direction.hitCoords;
  }

  getOppositeDirection() {
    Direction.hitCoords = Direction.firstHitCoords;

    return new TopDirection();
  }
}

export default [
  new LeftDirection(),
  new RightDirection(),
  new TopDirection(),
  new BottomDirection(),
];
