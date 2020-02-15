const fs = require('fs')

// Characters folder
const pathCharactersEasy = './static/images/character/easy'
const pathCharactersHard = './static/images/character/hard'
const pathGameEasy = './static/images/game/easy'
const pathGameHard = './static/images/game/hard'
const pathImage = 'images/'
const pathEasy = 'easy/'
const pathHard = 'hard/'

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
    // Extract Characters
    fs.readdirSync(pathCharactersEasy).forEach((file) => {
      images.push("character/".concat(pathEasy).concat(file))
    })
    fs.readdirSync(pathCharactersHard).forEach((file) => {
      images.push("character/".concat(pathHard).concat(file))
    })
    fs.readdirSync(pathGameEasy).forEach((file) => {
      images.push("game/".concat(pathEasy).concat(file))
    })
    fs.readdirSync(pathGameHard).forEach((file) => {
      images.push("game/".concat(pathHard).concat(file))
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
    return null
    currentImageIdx = 0
  }
  reso = MaxReso
  pixelateObj[0].resolution = reso
  console.log("Current IDX: ",currentImageIdx)
  console.log("Total IDX: ",images.length)
  console.log("image: ", images[currentImageIdx])
  let pathArray = images[currentImageIdx].split("/")
  let type = pathArray[0]
  let difficulty = pathArray[1]
  let name = pathArray[2].slice(0, -4)
  name = name.replace(/_/g, " ");
  let data = {
    imageSrc: pathImage.concat(images[currentImageIdx]),
    pixelateObj: pixelateObj,
    imageName: capitalizeFirstLetter(name),
    imageType: type,
    difficulty: difficulty
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
