const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
	path: '/socket',
	pingTimeout: 3000
});

app.use(express.static('frontend'));

server.listen(3000, ()=>console.log('Example app listening on port 3000'));
