function createStage(){
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

}
