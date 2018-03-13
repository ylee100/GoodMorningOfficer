var socket = io();

// Echo log from socket.io server.
socket.on('log', (data) => console.log(data));

socket.on('players', syncPlayers);

function request_new_user(username) {
  socket.emit('newuser', username);
}

function request_move_x(v) {
  socket.emit('movex', {"username": username, "v": v});
}

function request_move_y(v) {
  socket.emit('movey', {"username": username, "v": v});
}
