const fs = require('fs')

// Characters folder
const pathCharacers = './static/images/character'
const pathGames = './static/images/game'
const pathImage = 'images/'
let images = [],
  currentImageIdx = 0,
  MaxReso = 200,
  ResoStep = 40,
  MinReso = 0,
  reso = MaxReso,
  pixelateObj = [
    { effect: 'pixelate', shape: 'square', resolution: reso }
  ]

function extractImagePath() {
  if( images.length <= 0 ){
    fs.readdirSync(pathCharacers).forEach((file) => {
      images.push("character/".concat(file))
    })
    fs.readdirSync(pathGames).forEach((file) => {
      images.push("game/".concat(file))
    })
    images = shuffle(images)
  }
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function StartGame() {
  extractImagePath()
  let data = {
    imageSrc: pathImage.concat(images[0]),
    pixelateObj: pixelateObj
  }
  return data
}

function GetNextImage() {
  currentImageIdx += 1
  if (currentImageIdx >= images.length) {
    currentImageIdx = 0
  }
  reso = MaxReso
  pixelateObj[0].resolution = reso
  // let name = images[currentImageIdx].split('.').slice(0, -1).toString()
  let pathArray = images[currentImageIdx].split("/")
  let type = pathArray[0]
  let name = pathArray[1].slice(0, -4)
  let data = {
    imageSrc: pathImage.concat(images[currentImageIdx]),
    pixelateObj: pixelateObj,
    imageName: capitalizeFirstLetter(name),
    imageType: type
  }
  return data
}

function BlurImage() {
  reso = MaxReso
  pixelateObj[0].resolution = reso
  let data = {
    pixelateObj: pixelateObj
  }
  return data
}

function UnblurImage() {
  reso = reso - ResoStep
  if (reso === 0) { reso = 20 }
  if (reso > MinReso) {
    pixelateObj[0].resolution = reso
  }
  let data = {
    pixelateObj: pixelateObj
  }
  return data
}

function GetImagesPath() {
  extractImagePath()
  const res = {
    path: pathImage,
    images: images
  }
  return res
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  StartGame,
  GetImagesPath,
  GetNextImage,
  BlurImage,
  UnblurImage
}
