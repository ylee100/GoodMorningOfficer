const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  pingTimeout: 3000
});
const game = require('./game-server.js');
const port = process.env.PORT || 3000;

io.on('connection', game.on_connect);
setInterval(() => game.sync_players(io), 1000);

app.use(express.static('frontend'));

server.listen(port, ()=>console.log('Example app listening on port ' + port));
