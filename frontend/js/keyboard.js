// MOVEMENT W, S, A, D
// User doesn't move but other environment including other players move
// screen position != global position

function keyboard(keyCode){
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  key.downHandler = event => {
    if (event.keyCode === key.code){
      if(key.isUp && key.press){
        key.press();
      }
      key.isDown = true;
      key.isUp = false;
    }
  }
  key.upHandler = event => {
    if(event.keyCode === key.code){
      if(key.isDown && key.release){
        key.release();
      }
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  window.addEventListener(
    "keydown",
    key.downHandler.bind(key),
    false
  );
  window.addEventListener(
    "keyup",
    key.upHandler.bind(key),
    false
  );
  return key;
}

// TODO: recieve player(s) info from the server
var dict = {};

function gameLoop(delta){
  state(delta);
}

function play(delta){
  // other players move (position)
  user.x += user.vx;
  user.y += user.vy;

  for(var i in players){
    players[i].sprite.x = players[i].x - user.x + window.innerWidth/2;
    players[i].sprite.y = players[i].y - user.y + window.innerHeight/2;
  }

  // TODO: clue is also moving


}

// PIXI.Sprite sprite
function initKey(){
  let left = keyboard(65),
      up = keyboard(87),
      right = keyboard(68),
      down = keyboard(83);

  left.press = () => {
    user.vx = -5;
    request_move_x(-5);
  };

  left.release = () => {
    if(!right.isDown){
      user.vx = 0;
      request_move_x(0);
    }
  };

  up.press = () => {
    user.vy = -5;
    request_move_y(-5);
  };

  up.release = () => {
    if(!down.isDown){
      user.vy = 0;
      request_move_y(0);
    }
  };

  right.press = () => {
    user.vx = 5;
    request_move_x(5);
  };

  right.release = () => {
    if(!left.isDown){
      user.vx = 0;
      request_move_x(0);
    }
  }

  down.press = () => {
    user.vy = 5;
    request_move_y(5);
  };

  down.release = () => {
    if(!up.isDown){
      user.vy = 0;
      request_move_y(0);
    }
  };
}

function end() {
  gameOverScene.visible = true;
}


let state;
function setup(){
  // load fininsh for image
  // TODO: JSON from server

  gameOverScene = new PIXI.Container();
  app.stage.addChild(gameOverScene);

  gameOverScene.visible = false;
  let gameOverStyle = new PIXI.TextStyle({
    fontFamily: "Futura",
    fontSize: 64,
    fill: "white"
  });
  message = new PIXI.Text("The End!", gameOverStyle);
  message.x = 120;
  message.y = app.stage.height / 2 - 32;
  gameOverScene.addChild(message);


  let style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fill: "white",
    stroke: '#ff3300',
    strokeThickness: 4,
  });

  // prints out the values
  let msg_credit = new PIXI.Text("Money: " + user.credit, style);
  app.stage.addChild(msg_credit);
  msg_credit.position = "absolute";
  msg_credit.position.set(user.x, user.y);

  let msg_clue = new PIXI.Text("Clue - ", style);
  app.stage.addChild(msg_clue);
  msg_clue.position = "absolute";
  msg_clue.position.set(user.x, user.y+40);
  for(var i in user.clue){
    let temp_clue = new PIXI.Text(i + ": " + user.clue[i], style);
    app.stage.addChild(temp_clue);
    temp_clue.position = "absolute";
    temp_clue.position.set(user.x+(i * 15), user.y+40);
  }


  initKey();


 /*
  var bunny = PIXI.Sprite.fromImage('res/clue.png')

  // center the sprite's anchor point
  bunny.anchor.set(0.5);

  // move the sprite to the center of the screen
  bunny.x = app.screen.width / 2 + 200;
  bunny.y = app.screen.height / 2;

  bunny.scale = new PIXI.Point(0.4, 0.4);

  app.stage.addChild(bunny);

  */

  state = play;
  if(user.rank < 1 || user.credit < 0){
    state = end;
  }

  app.ticker.add(delta => gameLoop(delta));
/*
  app.ticker.add(function(delta){
    bunny.rotation += 0.1 * delta;
  });
  */
}

function loadSprite(){
  PIXI.loader
    .add([
      "res/rank1.png",
      "res/rank2.png",
      "res/rank3.png",
      "res/rank4.png",
      "res/rank5.png",
      "res/rank6.png",
      "res/rank7.png",
      "res/clue.png"
    ])
    .load(setup);
}

function syncPlayers(newPlayers){
  for(var i in players){
    app.stage.removeChild(players[i].sprite);
  }
  players = {};
  players = newPlayers;

  for(var i in players){
    // Create new sprites.
    players[i].sprite = new PIXI.Sprite(
      PIXI.loader.resources["res/rank" + players[i].rank + ".png"].texture
    );
    players[i].sprite.scale = new PIXI.Point(0.15, 0.15);
    app.stage.addChild(players[i].sprite);

    // Find user.
    if (players[i].username === username) user = players[i];
  }
}
