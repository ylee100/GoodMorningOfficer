// Dictionary holding player objects.
var players = {};

// Instantiate new player in this server.
exports.instantiate_player = function (username) {
	var p = {}	// New player object.

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

exports.remove_player = function (username) {
	if (players[username]) {
		players[username] = undefined;
	}
}
