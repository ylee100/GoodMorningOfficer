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
  antialias: true,
  }
);
app.renderer.view.style.position = "absolute";
app.renderer.autoResize = true;
window.onresize = resizeGame;
window.onload = resizeGame;

document.body.appendChild(app.view);

//let texture = PIXI.utils.TextureCache["../res/rank1.png"];
//let sprite = new PIXI.Sprite(texture);

function setup(){
  // load fininsh for image
  let rank1 = new PIXI.Sprite(
    PIXI.loader.resources["../res/rank1.png"].texture
  );

  app.stage.addChild(rank1);
}

PIXI.loader
  .add([
    "../res/rank1.png",
    "../res/rank2.png",
    "../res/rank3.png",
    "../res/rank4.png",
    "../res/rank5.png",
    "../res/rank6.png",
    "../res/rank7.png",
  ])
  .load(setup);
