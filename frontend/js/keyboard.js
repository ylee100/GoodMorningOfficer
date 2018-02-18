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

// Assuming rank 1 is opponent and rank7 is the user
let state;

function setup(){
  // load fininsh for image
  // JSON from server

  // TODO: Other players

  for(i in players){

  }
  let rank1 = new PIXI.Sprite(
    PIXI.loader.resources["res/rank1.png"].texture
  );
  // TODO: Input of User

  rank1.scale = new PIXI.Point(0.15, 0.15);
  rank7.scale = new PIXI.Point(0.15, 0.15);

  user.x = window.innerWidth/2;
  rank7.y = window.innerHeight/2;

  rank1.vx = 0;
  rank1.vy = 0;

  app.stage.addChild(rank1);
  app.stage.addChild(rank7);

  initKey(rank1);
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


//test
loadSprite();
