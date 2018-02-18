var socket = io('http://localhost:3000');

// Echo log from socket.io server.
socket.on('log', (data) => console.log(data));

socket.on('players', syncPlayers);

function request_new_user(username) {
  socket.emit('newuser', username);
}
