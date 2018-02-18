// Dictionary holding player objects.
var players = {};

// Instantiate new player in this server.
function instantiate_player(username) {
  var p = {}  // New player object.

  // Initialize member variables.
  p.username = username;
  p.x = 0;
  p.y = 0;
  p.rank = 1;
  p.credit = 100;
  p.clue = 0;

  // Put the new player into dictionary.
  if (players[username]) {
    // If username already exists in dict
    return false;
  } else {
    // If username does not exist in dict
    players[username] = p;
    return true;
  }
}

function remove_player(username) {
  if (players[username]) {
    players[username] = undefined;
  }
}

exports.sync_players = function (io) {
  io.local.emit('players', players);
}

exports.on_connect = function (socket) {
  socket.emit('log', 'Connection successful!');

  socket.on('newuser', function (data) {
    if (instantiate_player(data)) {
      console.log('A new user ' + data + ' is created.');
    }
  });
}
