user = undefined;
username = undefined;
players = {};
function clickme(){
  username = document.getElementById("userinput").value;

  document.getElementById("userform").remove();

  request_new_user(username);

  createStage();
  loadSprite();
}
