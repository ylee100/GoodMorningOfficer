var socket = io('http://good-morning-officer.herokuapp.com');

// Echo log from socket.io server.
socket.on('log', (data) => console.log(data));

socket.on('players', syncPlayers);

function request_new_user(username) {
  socket.emit('newuser', username);
}
