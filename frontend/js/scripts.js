let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas";
}
PIXI.utils.sayHello(type);

// Resizing the window
function resizeGame(){
  app.renderer.resize(window.innerWidth, window.innerHeight);
}

//Create a PIXI Application
let app = new PIXI.Application({
  backgroundColor: 0xffcc00,
  antialias: false,
  }
);
app.renderer.view.style.position = "absolute";
app.renderer.autoResize = true;
window.onresize = resizeGame;
window.onload = resizeGame;

document.body.appendChild(app.view);


// Put Image
function setup(){
  // load fininsh for image
  let rank1 = new PIXI.Sprite(
    PIXI.loader.resources["res/rank1.png"].texture
  );
  let rank7 = new PIXI.Sprite(
    PIXI.loader.resources["res/rank7.png"].texture
  );
  rank1.scale = new PIXI.Point(0.15, 0.15);
  rank7.scale = new PIXI.Point(0.15, 0.15);

  rank7.x = 50;
  rank7.y = 50;
  app.stage.addChild(rank1);
  app.stage.addChild(rank7);
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
