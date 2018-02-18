user = {};
function clickme(){
  createStage();
  var me = document.getElementById("userinput").value;

  // Initialize the user
  user.username = me;
  user.rank = 1;
  user.x = 0;   // global x
  user.y = 0;   // global y
  user.credit = 100;
  user.clue = {};
}
