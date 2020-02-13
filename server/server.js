const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const { Nuxt, Builder } = require('nuxt')
const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

const api = require('./api')
const { StartGame, GetImagesPath, GetNextImage, BlurImage, UnblurImage } = require('./images')

// Import API Routes
app.use('/api', api)

// We instantiate Nuxt.js with the options
const config = require('../nuxt.config.js')
config.dev = !isProd

const nuxt = new Nuxt(config)
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)

// Listen the server
server.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port) // eslint-disable-line no-console

// Socket.io
const messages = []
io.on('connection', (socket) => {
  
  socket.on('start', function() {
    let data = StartGame()
    socket.emit('start', data)
    socket.broadcast.emit('start', data)
  })

  socket.on('next-image', function() {
    let data = GetNextImage()
    socket.emit('next-image', data)
    socket.broadcast.emit('next-image', data)
  })

  socket.on('blur-image', function() {
    let data = BlurImage()
    socket.emit('blur-image', data)
    socket.broadcast.emit('blur-image', data)
  })

  socket.on('unblur-image', function() {
    let data = UnblurImage()
    socket.emit('unblur-image', data)
    socket.broadcast.emit('unblur-image', data)
  })

  socket.on('show-image', function() {
    socket.emit('show-image')
    socket.broadcast.emit('show-image')
  })
})
