// Dictionary holding player objects.
var players = {};

// Instantiate new player in this server.
function instantiate_player(username) {
  var p = {}  // New player object.

  // Initialize member variables.
  p.username = username;
  p.x = 0;
  p.y = 0;
  p.vx = 0;
  p.vy = 0;
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

function decrease_credit(interval){

}
setInterval(function(){
  for(var i in players){
    players[i].credit--;
  }
}, 1000);


exports.sync_players = function (io) {
  console.log('Syncing players.');
  io.local.emit('players', players);
}

exports.on_connect = function (socket) {
  socket.emit('log', 'Connection successful!');

  socket.on('newuser', function (data) {
    if (instantiate_player(data)) {
      console.log('A new user ' + data + ' is created.');
    }
  });

  socket.on('movex', function (data) {
    console.log(data.username + ' is moving at ' + data.v + ' in x direction.');
    players[data.username].vx = data.v;
    socket.broadcast.emit('movex', data);
  });

  socket.on('movey', function (data) {
    console.log(data.username + ' is moving at ' + data.v + ' in y direction.');
    players[data.username].vy = data.v;
    socket.broadcast.emit('movey', data);
  });
}
