'use strict';

var Filters = {
  Blur: (imageDataContainer, coord) => {
    return Color.getAverage(imageDataContainer.getSurroundingColors(coord));
  },

  Brighter: (imageDataContainer, coord) => {
    return imageDataContainer.getColor(coord).brightness(2);
  },

  Desaturate: (imageDataContainer, coord) => {
    return imageDataContainer.getColor(coord).desaturate();
  },

  Edge: (imageDataContainer, coord) => {
    return Color.getStdDeviation(
      imageDataContainer.getSurroundingColors(coord)
    );
  },

  Gradient: (imageDataContainer, coord) => {
    return Color.getAverage(
      [
        imageDataContainer.getColor(coord),
        new Color(
          (coord.x / imageDataContainer.getWidth()) * 255,
          (coord.y / imageDataContainer.getHeight()) * 255,
          Math.sin(coord.x + coord.y) * 255,
          255
        ),
      ],
      [
        1.25,
        0.8,
      ]
    );
  },

  Noise: (imageDataContainer, coord) => {
    return Color.getAverage(
      [
        imageDataContainer.getColor(coord),
        Color.getRandom(),
      ],
      [
        1.25,
        0.8,
      ]
    );
  },
};
