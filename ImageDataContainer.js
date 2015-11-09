'use strict';

class ImageDataContainer {
  constructor(imageData) {
    this._imageData = imageData;
  }

  copy() {
    return new ImageDataContainer(
      new ImageData(
        new Uint8ClampedArray(
          this.getImageData().data
        ),
        this.getWidth(),
        this.getHeight()
      )
    );
  }

  getColor(coord) {
    var dataIndex = this._getDataIndex(coord);
    if (dataIndex === null) {
      return null;
    }
    return new Color(
      this.getImageData().data[dataIndex],
      this.getImageData().data[dataIndex + 1],
      this.getImageData().data[dataIndex + 2],
      this.getImageData().data[dataIndex + 3]
    );
  }

  // Returns list of colors including the one at the coordinate and all the
  // surrounding ones.
  getSurroundingColors(coord) {
    var colors = [];
    for (var x = coord.x - 1; x <= coord.x + 1; x++) {
      for (var y = coord.y - 1; y <= coord.y + 1; y++) {
        var color = this.getColor(new Coord(x, y));
        if (color !== null) {
          colors.push(color);
        }
      }
    }
    return colors;
  }

  setColor(coord, color) {
    var dataIndex = this._getDataIndex(coord);
    this.getImageData().data[dataIndex] = color.r;
    this.getImageData().data[dataIndex + 1] = color.g;
    this.getImageData().data[dataIndex + 2] = color.b;
    this.getImageData().data[dataIndex + 3] = color.a;
    return this;
  }

  getWidth() {
    return this.getImageData().width;
  }

  getHeight() {
    return this.getImageData().height;
  }

  getImageData() {
    return this._imageData;
  }

  // Takes in a function and calls it on every pixel coordinate in the image.
  // Updates the image with the color returned by the function.
  map(calculateColorFunc) {
    var imageDataContainerCopy = this.copy();
    for (var x = 0; x < this.getWidth(); x++) {
      for (var y = 0; y < this.getHeight(); y++) {
        var coord = new Coord(x, y);
        var color = calculateColorFunc(this, coord);
        imageDataContainerCopy.setColor(coord, color);
      }
    }
    this._imageData = imageDataContainerCopy.getImageData();
    return this;
  }

  // Returns data index of the coord or null if the coord is invalid.
  _getDataIndex(coord) {
    if (coord.x < 0 || coord.x > this.getWidth() - 1 ||
        coord.y < 0 || coord.y > this.getHeight() - 1) {
      return null;
    }
    // Image data is stored as a one-dimensional array of colors in rgba order
    // with integer values between 0 and 255 (included).
    // Index 0 (x = 0, y = 0) is at the top left corner of the image.
    return ((this.getWidth() * coord.y) + coord.x) * 4;
  }
}
