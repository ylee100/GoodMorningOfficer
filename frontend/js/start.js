user = {};
players = {};
function clickme(){
  // Initialize the user
  user.username = document.getElementById("userinput").value;
  user.rank = 1;
  user.x = 0;   // global x
  user.y = 0;   // global y
  user.vx = 0;
  user.vy = 0;
  user.credit = 100;
  user.clue = {};

  document.getElementById("userform").remove();

  request_new_user(user.username);
  players[user.username] = user;

  createStage();
  loadSprite();
}
