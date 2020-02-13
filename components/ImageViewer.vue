<template>
  <div class="container">
    <div>
      <h2 class="title">Guess the {{imageType}} - <span v-bind:class="[imageDifficulty]">{{imageDifficulty}}</span></h2>
    </div>
    <img id="portrait-image">
    <h2 id="imageName" class="title">{{imageName}}</h2>
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
      imageDifficulty: 'easy'
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
  },
  mounted () {
    if (process.browser && window) {
      socket.emit('start')
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
      this.showName(false)
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
      this.showName(false)
      this.myPixelation.render(data.pixelateObj)
    },
    unblurImage(data) {
      this.showName(false)
      this.myPixelation.render(data.pixelateObj)
    },
    showImage(){
      this.myPixelation.renderOriginal()
      this.showName(true)
    },
    showName(visible) {
      if (visible === true){
        document.getElementById("imageName").style.display = "block"
      } else {
        document.getElementById("imageName").style.display = "none"
      }
    }
  }
}
</script>

<style>
#portrait-image {
  /* width: 100%; */
  /* max-width: 1000px; */
  min-width: 200px;
  height: 600px;
  /* max-height: 600px; */
}

#imageName {
  display: none
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
