# Guess The Game / Character
![PixelChallenge image](https://github.com/lanets/pixelchallenge/blob/master/static/pixelchallenge.png)
This is a super fun game to play on the Lan ETS event. This app is realy helpfull to manage the game.

- Manage all the assets needed for this game, as Images and Sounds
- Gives a nice game frontend so players can see the image with the effect
- Also gives an admin panel so the game admin can easily change the current image, apply effect or manage players and teams scores.

## Build Setup

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev:server

Note: `npm run dev` will just run nuxt (client), it will be much more helpful to run both client and server. You may be interested in the design pattern being used on the socket.io server. As long as you have `.js` files in your `server/channels` directory and make sure to export a function named `Svc`, the `server.js` will automatically register it. This is somewhat analagous to the automatic routing of pages that you place in your `pages` folder.

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## CONTRIBUTE

If you want to contribute, please do not code or push directly in `Master` branch. Instead, use `dev` branch or fork from `dev` branch.

## TODOS

- add Admin panel to add images and manage current game
