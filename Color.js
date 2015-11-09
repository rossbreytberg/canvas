'use strict';

class Color {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  brightness(factor) {
    this.r *= factor;
    this.g *= factor;
    this.b *= factor;
    return this;
  }

  desaturate() {
    const averageValue = (this.r + this.g + this.b) / 3;
    this.r = averageValue;
    this.g = averageValue;
    this.b = averageValue;
    return this;
  }

  invert() {
    this.r = 255 - r;
    this.g = 255 - g;
    this.b = 255 - b;
    return this;
  }

  static getAverage(colors, weights) {
    var sumR = 0;
    var sumG = 0;
    var sumB = 0;
    var sumA = 0;
    colors.forEach((color, index) => {
      var weight = weights ? weights[index] : 1;
      sumR += color.r * weight;
      sumG += color.g * weight;
      sumB += color.b * weight;
      sumA += color.a * weight;
    });
    return new Color(
      Math.round(sumR / colors.length),
      Math.round(sumG / colors.length),
      Math.round(sumB / colors.length),
      Math.round(sumA / colors.length)
    );
  }

  static getRandom() {
    return new Color(
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      255
    );
  }

  static getStdDeviation(colors) {
    const averageColor = Color.getAverage(colors);
    var sumSqDiffR = 0;
    var sumSqDiffG = 0;
    var sumSqDiffB = 0;
    colors.forEach((color) => {
      sumSqDiffR += Math.pow(color.r - averageColor.r, 2);
      sumSqDiffG += Math.pow(color.g - averageColor.g, 2);
      sumSqDiffB += Math.pow(color.b - averageColor.b, 2);
    });
    return new Color(
      Math.sqrt(sumSqDiffR / colors.length),
      Math.sqrt(sumSqDiffG / colors.length),
      Math.sqrt(sumSqDiffB / colors.length),
      255
    );
  }
}
