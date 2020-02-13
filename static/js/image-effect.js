/* eslint-disable no-unused-vars */
;(function (window, undefined) {
  //
  'use strict'

  // util vars
  const TWO_PI = Math.PI * 2
  const QUARTER_PI = Math.PI * 0.25
  const PIXELATE = 0
  const ZOOM = 1
  const BLUR = 2

  // utility functions
  function isArray (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  }

  function isObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  const console = window.console

  // check for canvas support
  const canvas = document.createElement('canvas')
  const isCanvasSupported = canvas.getContext && canvas.getContext('2d')

  // don't proceed if canvas is no supported
  if (!isCanvasSupported) {
    return
  }

  function ImageEffect (img, options) {
    this.img = img
    // creat canvas
    const canvas = (this.canvas = document.createElement('canvas'))
    this.ctx = canvas.getContext('2d')
    // copy attributes from img to canvas
    canvas.className = img.className
    canvas.id = img.id

    this.width = this.canvas.width = this.img.width
    this.height = this.canvas.height = this.img.height

    this.render(options)
    // replace image with canvas
    img.parentNode.replaceChild(canvas, img)
  }

  ImageEffect.prototype.render = function (options) {
    this.options = options
    // get the scale
    const scale = Math.min(
      this.canvas.width / this.img.width,
      this.canvas.height / this.img.height
    )
    // get the top left position of the image
    const x = this.canvas.width / 2 - (this.img.width / 2) * scale
    const y = this.canvas.height / 2 - (this.img.height / 2) * scale
    // set size
    this.width = this.canvas.width = this.img.width
    this.height = this.canvas.height = this.img.height

    // draw image on canvas
    this.ctx.drawImage(
      this.img,
      x,
      y,
      this.img.width * scale,
      this.img.height * scale
    )
    // get imageData
    try {
      this.imgData = this.ctx.getImageData(
        x,
        y,
        this.img.width,
        this.img.height
      ).data

      console.log(x, y, this.img.width, this.img.height)
    } catch (error) {
      if (console) {
        console.error(error)
      }
      return
    }

    this.clear()

    for (let i = 0, len = options.length; i < len; i++) {
      this.renderEffects(options[i])
    }
  }

  ImageEffect.prototype.renderOriginal = function (options) {
    this.clear()
    // get the scale
    const scale = Math.min(
      this.canvas.width / this.img.width,
      this.canvas.height / this.img.height
    )
    // get the top left position of the image
    const x = this.canvas.width / 2 - (this.img.width / 2) * scale
    const y = this.canvas.height / 2 - (this.img.height / 2) * scale
    // draw image on canvas
    this.ctx.drawImage(
      this.img,
      x,
      y,
      this.img.width * scale,
      this.img.height * scale
    )
  }

  ImageEffect.prototype.renderEffects = function (opts) {
    // Todo: Separate each effects
    // effects : 'pixelate', 'zoom', 'blur'
    this.renderPixels(opts)
  }

  ImageEffect.prototype.renderPixels = function (opts) {
    // get the scale
    const scale = Math.min(
      this.canvas.width / this.img.width,
      this.canvas.height / this.img.height
    )
    // get the top left position of the image
    const xi = this.canvas.width / 2 - (this.img.width / 2) * scale
    const yi = this.canvas.height / 2 - (this.img.height / 2) * scale

    const w = this.img.width
    const h = this.img.height
    const ctx = this.ctx
    const imgData = this.imgData

    // option defaults
    const res = opts.resolution || 16
    const size = opts.size || res
    const alpha = opts.alpha || 1
    const offset = opts.offset || 0
    let offsetX = 0
    let offsetY = 0
    const cols = w / res + 1
    const rows = h / res + 1
    const halfSize = size / 2
    const diamondSize = size / Math.SQRT2
    const halfDiamondSize = diamondSize / 2

    if (isObject(offset)) {
      offsetX = offset.x || 0
      offsetY = offset.y || 0
    } else if (isArray(offset)) {
      offsetX = offset[0] || 0
      offsetY = offset[1] || 0
    } else {
      offsetX = offsetY = offset
    }

    let row, col, x, y, pixelY, pixelX, pixelIndex, red, green, blue, pixelAlpha

    for (row = 0; row < rows; row++) {
      y = (row - 0.5) * res + offsetY
      // normalize y so shapes around edges get color
      pixelY = Math.max(Math.min(y, h - 1), 0)

      for (col = 0; col < cols; col++) {
        x = (col - 0.5) * res + offsetX
        // normalize y so shapes around edges get color
        pixelX = Math.max(Math.min(x, w - 1), 0)
        pixelIndex = (pixelX + pixelY * w) * 4
        red = imgData[pixelIndex + 0]
        green = imgData[pixelIndex + 1]
        blue = imgData[pixelIndex + 2]
        pixelAlpha = alpha * (imgData[pixelIndex + 3] / 255)

        ctx.fillStyle =
          'rgba(' + red + ',' + green + ',' + blue + ',' + pixelAlpha + ')'

        switch (opts.shape) {
          case 'circle':
            ctx.beginPath()
            ctx.arc(x, y, halfSize, 0, TWO_PI, true)
            ctx.fill()
            ctx.closePath()
            break
          case 'diamond':
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate(QUARTER_PI)
            ctx.fillRect(
              -halfDiamondSize,
              -halfDiamondSize,
              diamondSize,
              diamondSize
            )
            ctx.restore()
            break
          default:
            // square
            ctx.fillRect(x - halfSize, y - halfSize, size, size)
        } // switch
      } // col
    } // row
  }

  ImageEffect.prototype.clear = function () {
    const w = this.canvas.width
    const h = this.canvas.height
    this.ctx.clearRect(0, 0, w, h)
  }

  ImageEffect.prototype.changeImage = function (img) {
    this.img = img
    this.width = this.canvas.width = this.img.width
    this.height = this.canvas.height = this.img.height
    this.clear()
    this.render([
      {
        resolution: 100
      }
    ])
  }

  // put in global namespace
  window.ImageEffect = ImageEffect
})(window)
