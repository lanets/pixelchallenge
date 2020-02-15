<template>
  <div class="container">
    <div>
      <h2 class="title">Guess the {{imageType}} - <span v-bind:class="[imageDifficulty]">{{imageDifficulty}}</span></h2>
    </div>
    <img id="portrait-image" v-if="!gameOver">
    <h1 v-if="gameOver" class="gameover">GAME OVER</h1>
    <div class="horizontal">
      <b-button id="btnShow" variant="outline-dark">
        SHOW
      </b-button>
      <b-button id="btnUnblur" variant="outline-dark">
        UNBLUR
      </b-button>
      <b-button id="btnBlur" variant="outline-dark">
        BLUR
      </b-button>
      <b-button id="btnNext" variant="outline-dark">
        NEXT
      </b-button>
    </div>
    <h2>{{imageName}}</h2>
  </div>
</template>

<script>
import socket from '~/plugins/socket.io.js'

export default {
  data() {
    return {
      myPixelation: null,
      imgElement: null,
      imageName: '',
      imageType: 'Character',
      imageDifficulty: 'easy',
      gameOver: false
    }
  },
  beforeMount () {
    socket.on('start', (data) => {
      this.start(data)
    })
    socket.on('next-image', (data) => {
      this.nextImage(data)
    })
    socket.on('blur-image', (data) => {
      this.blurImage(data)
    })
    socket.on('unblur-image', (data) => {
      this.unblurImage(data)
    })
    socket.on('show-image', () => {
      this.showImage()
    })
    socket.on('end-game', () => {
      this.endGame()
    })
  },
  mounted () {
    if (process.browser && window) {
      const btnUnblur = document.getElementById('btnUnblur')
      const btnBlur = document.getElementById('btnBlur')
      const btnShow = document.getElementById('btnShow')
      const btnNext = document.getElementById('btnNext')
      socket.emit('start')

      btnShow.onclick = (evt) => {
        socket.emit('show-image')
      }

      btnNext.onclick = (evt) => {
        socket.emit('next-image')
      }

      btnBlur.onclick = (evt) => {
        socket.emit('blur-image')
      }

      btnUnblur.onclick = (evt) => {
        socket.emit('unblur-image')
      }
    }
  },
  methods: {
    start(data) {
      /* eslint-disable no-undef */
      this.imgElement = document.getElementById('portrait-image')
      this.imgElement.src = data.imageSrc
      this.myPixelation = new ImageEffect(this.imgElement, data.pixelateObj)
      this.myPixelation.render(data.pixelateObj)
    },
    nextImage(data) {
      this.imageName = data.imageName
      this.imageType = data.imageType
      this.imageDifficulty = data.difficulty
      const img = new Image()
      img.src = data.imageSrc
      img.id = 'portrait-image'
      img.onload = (evt) => {
        this.myPixelation.changeImage(img)
        this.myPixelation.render(data.pixelateObj)
      }
    },
    blurImage(data) {
      this.myPixelation.render(data.pixelateObj)
    },
    unblurImage(data) {
      this.myPixelation.render(data.pixelateObj)
    },
    showImage(){
      this.myPixelation.renderOriginal()
    },
    endGame() {
      this.gameOver = true;
    }
  }
}
</script>

<style>
.gameover {
  padding: 20px;
  color: blue;
}

#portrait-image {
  /* width: 100%; */
  /* max-width: 1000px; */
  min-width: 200px;
  height: 600px;
  /* max-height: 600px; */
}

.container {
  margin: 0 auto;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 4rem;
  color: #35495e;
  letter-spacing: 1px;
}

.horizontal {
  width: 100%;
  max-width: 400px;
  margin: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex-direction: row;
}
b-button {
  border: 1px solid #ff7b00;
}

.hard {
  padding: 0px 5px 0px 5px;
  border: 2px solid #ff0000;
  color: #ff0000;
}

.easy {
  padding: 0px 5px 0px 5px;
  border: 2px solid #33ff00;
  color: #33ff00;
}
</style>
