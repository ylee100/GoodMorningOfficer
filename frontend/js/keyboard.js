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
    for(var i in players){
      if(players[i] != user){
        players[i].sprite.x -= user.sprite.vx;
        players[i].sprite.y -= user.sprite.vy;
      }
    }

}

// PIXI.Sprite sprite
function initKey(sprite){
  let left = keyboard(65),
      up = keyboard(87),
      right = keyboard(68),
      down = keyboard(83);

  left.press = () => {
    sprite.vx = -5;
    sprite.vy = 0;
  };

  left.release = () => {
    if(!right.isDown && sprite.vy === 0){
      sprite.vx = 0;
    }
  };

  up.press = () => {
    sprite.vy = -5;
    sprite.vx = 0;
  };

  up.release = () => {
    if(!down.isDown && sprite.vx === 0){
      sprite.vy = 0;
    }
  };

  right.press = () => {
    sprite.vx = 5;
    sprite.vy = 0;
  };

  right.release = () => {
    if(!left.isDown && sprite.vy === 0){
      sprite.vx = 0;
    }
  }

  down.press = () => {
    sprite.vx = 0;
    sprite.vy = 5;
  };

  down.release = () => {
    if(!up.isDown && sprite.vx === 0){
      sprite.vy = 0;
    }
  };
}

let state;
function setup(){
  // load fininsh for image
  // TODO: JSON from server
  players = {
    "Alice": user,
    "Bob": {
      username : "Bob",
      rank : 1,
      x : 100,   // global x
      y : 100,   // global y
      credit : 100,
      clue : {}
    },
    "Coco": {
      username : "Bob",
      rank : 1,
      x : 800,   // global x
      y : 100,   // global y
      credit : 100,
      clue : {}
    },
    "David": {
      username : "Bob",
      rank : 1,
      x : -400,   // global x
      y : 300,   // global y
      credit : 100,
      clue : {}
    }
  };

  for(var i in players){
    players[i].sprite = new PIXI.Sprite(
      PIXI.loader.resources["res/rank" + players[i].rank + ".png"].texture
    );
    players[i].sprite.x = (players[i].x - user.x) + window.innerWidth/2;
    players[i].sprite.y = (players[i].y - user.y) + window.innerHeight/2;

    players[i].sprite.scale = new PIXI.Point(0.15, 0.15);

    players[i].sprite.vx = 0;
    players[i].sprite.vy = 0;

    app.stage.addChild(players[i].sprite);
  }

  initKey(user.sprite);


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
    ])
    .load(setup);
}