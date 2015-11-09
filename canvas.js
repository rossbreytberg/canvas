'use strict';

window.onload = function() {
  getInputElement().onchange = onInputChange;

  var resetButton = document.createElement('button');
  resetButton.innerText = 'Reset';
  resetButton.onclick = onInputChange;
  getFilterButtonContainer().appendChild(resetButton);

  Object.getOwnPropertyNames(Filters).forEach((filterName) => {
    var filterButton = document.createElement('button');
    filterButton.innerText = filterName;
    filterButton.onclick = () => {
      applyFilterToCanvas(Filters[filterName]);
    };
    getFilterButtonContainer().appendChild(filterButton);
  });
}

function onInputChange() {
  const inputElement = getInputElement();
  const imageBlob = inputElement.files[0];
  const imageObject = new Image();
  imageObject.src = URL.createObjectURL(imageBlob);
  imageObject.onload = onImageLoad;
}

function onImageLoad(event) {
  const imageObject = event.target;

  // Adjust the canvas to the image dimensions
  const canvasElement = getCanvasElement();
  canvasElement.width = imageObject.width;
  canvasElement.height = imageObject.height;

  // Draw image on the canvas
  getCanvasContext().drawImage(imageObject, 0, 0);
}

function applyFilterToCanvas(filter) {
  const canvasElement = getCanvasElement();
  const imageData = getCanvasContext().getImageData(
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );
  const imageDataContainer = new ImageDataContainer(imageData);
  imageDataContainer.map(filter);
  getCanvasContext().putImageData(imageDataContainer.getImageData(), 0, 0);
}

function getCanvasContext() {
  return getCanvasElement().getContext('2d');
}

function getCanvasElement() {
  return document.getElementById('canvas');
}

function getInputElement() {
  return document.getElementById('fileInput');
}

function getFilterButtonContainer() {
  return document.getElementById('filterButtons');
}

function getResetButton() {
  return document.getElementById('')
}
