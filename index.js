const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  pingTimeout: 3000
});
const game = require('./game-server.js');

io.on('connection', game.on_connect);
setInterval(() => game.sync_players(io), 100);

app.use(express.static('frontend'));

server.listen(80, ()=>console.log('Example app listening on port 3000'));
