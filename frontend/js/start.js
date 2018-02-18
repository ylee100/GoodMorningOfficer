user = {};
function clickme(){
  // Initialize the user
  user.username = document.getElementById("userinput").value;
  user.rank = 1;
  user.x = 0;   // global x
  user.y = 0;   // global y
  user.credit = 100;
  user.clue = {};

  document.getElementById("userform").remove();

  createStage();
  loadSprite();
}
