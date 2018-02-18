// MOVEMENT W, S, A, D
// User doesn't move but other environment including other players move
// screen position != global position

bunnies = [];
function hitTest(r1, r2){
  //Define the variables we'll need to calculate
 let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

 //hit will determine whether there's a collision
 hit = false;

 //Find the center points of each sprite
 r1.centerX = r1.x + r1.width / 2;
 r1.centerY = r1.y + r1.height / 2;
 r2.centerX = r2.x + r2.width / 2;
 r2.centerY = r2.y + r2.height / 2;

 //Find the half-widths and half-heights of each sprite
 r1.halfWidth = r1.width / 2;
 r1.halfHeight = r1.height / 2;
 r2.halfWidth = r2.width / 2;
 r2.halfHeight = r2.height / 2;

 //Calculate the distance vector between the sprites
 vx = r1.centerX - r2.centerX;
 vy = r1.centerY - r2.centerY;

 //Figure out the combined half-widths and half-heights
 combinedHalfWidths = r1.halfWidth + r2.halfWidth;
 combinedHalfHeights = r1.halfHeight + r2.halfHeight;

 //Check for a collision on the x axis
 if (Math.abs(vx) < combinedHalfWidths) {

   //A collision might be occuring. Check for a collision on the y axis
   if (Math.abs(vy) < combinedHalfHeights) {

     //There's definitely a collision happening
     hit = true;
   } else {

     //There's no collision on the y axis
     hit = false;
   }
 } else {

   //There's no collision on the x axis
   hit = false;
 }

 //`hit` will be either `true` or `false`
 return hit;
}

function collision(){
  for(var i in players){
    if(user.username !== players[i].username){
      if(hitTest(user.sprite, players[i].sprite)){
        // clue
        for(var j in user.clue){
          if(user.clue[j] === players[i].username){
            players[i].rank--;
          }
        }

        // bribery
        if(user.rank > players[i].rank){
          user.credit += 10*(user.rank - players[i].rank);
          players[i].credit -= 10*(user.rank - players[i].rank);
        } else if(user.rank < players[i].rank){
          user.credit -= 10*(user.rank - players[i].rank);
          players[i].credit += 10*(user.rank - players[i].rank);
        }

        generateClue(players[i].username, user.username);
      }
    }
  }

  // TODO: server update
}
function generateClue(player1, player2){
  var bunny = PIXI.Sprite.fromImage('res/clue.png')

  p1 = new PIXI.Text(player1);
  p1.position.set(user.x, user.y+bunny.height);
  app.stage.addChild(p1);
  p2 = new PIXI.Text(player2);
  p2.position.set(user.x+p1.width, user.y+bunny.height);
  app.stage.addChild(p2);

  // center the sprite's anchor point
  bunny.anchor.set(0.5);
  bunny.position.set(user.x, user.y)
  bunny.scale = new PIXI.Point(0.4, 0.4);
  bunnies.push(bunny);
  app.stage.addChild(bunny);

  app.ticker.add(function(delta){
    bunny.rotation += 0.1 * delta;
  });
}

function clueCollected(){
  if(hitTest(user.sprite, bunny)){
    app.stage.removeChild(bunny);
    if(p1 !== user.username){
      user.clue.push(p1);
    }
    if(p2 !== user.username){
      user.clue.push(p2);
    }
    app.stage.removeChild(p1);
    app.stage.removeChild(p2);
  }
}

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
  clueCollected();
  collision();
  // other players move (position)
  user.x += user.vx;
  user.y += user.vy;

  for(var i in players){
    players[i].sprite.x = players[i].x - user.x + window.innerWidth/2;
    players[i].sprite.y = players[i].y - user.y + window.innerHeight/2;
  }

  // Credits Change
  msg_credit.text = "Money: " + user.credit;
  if(user.rank < 1 || user.credit < 0){
    state = end;
  }

  // TODO: clue is also moving
  for(var i in bunnies){
    bunnies[i].x = bunnies[i].x - user.x + window.innerWidth/2;
    bunnies[i].y = bunnies[i].y - user.y + window.innerHeight/2;
  }

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
  // TODO: SEVER GAME OVER
  app.stage.removeChild(user.sprite);
  user = {};
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
  message = new PIXI.Text("GameOver", gameOverStyle);
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
  msg_credit = new PIXI.Text("Money: " + user.credit, style);
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

  state = play;

  app.ticker.add(delta => gameLoop(delta));


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
    if (user !== undefined) {
      players[i].sprite = new PIXI.Sprite(
        PIXI.loader.resources["res/rank" + players[i].rank + ".png"].texture
      );
      players[i].sprite.scale = new PIXI.Point(0.15, 0.15);
      app.stage.addChild(players[i].sprite);
    }

/**
    nametag = new PIXI.Text(players[i].username);
    nametag.position.set(players[i].sprite.x, players[i].sprite.y+players[i].sprite.height);
    app.stage.addChild(nametag);
    */

    // Find user.
    if (players[i].username === username) {
      user = players[i];
    }
  }
}
