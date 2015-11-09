'use strict';

class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static getDistance(coord1, coord2) {
    return Math.sqrt(
      Math.pow(coord1.x - coord2.x, 2),
      Math.pow(coord1.y - coord2.y, 2)
    );
  }
}
