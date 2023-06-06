var ball,imageball,Nave,NaveImage,Fundo,FundoImage;
var borda;
var alienGroup;
var countAlien;
var score = 0;
var gamestate = "serve";
var vidas = 3;
function preload(){
    imageball = loadImage("ball.png");
    NaveImage = loadImage("Nave.png");
    FundoImage = loadImage("bg.jpg");
    blueImage = loadImage("blue.png")
    greenImage = loadImage("green.png")
    redImage = loadImage("red.png")
    yellowImage = loadImage("yellow.png")

}
function setup() {
  createCanvas(500, 500);
  ball = createSprite(200,400,40,40); 
  Nave = createSprite(200,450,40,40);
  Nave.addImage("Nave", NaveImage);            
  Nave.scale = 0.08;
  ball.addImage("ball", imageball);
  ball.scale = 0.04;

  alienGroup = createGroup()
  createAlien(100, redImage)
  createAlien(100+65, blueImage)
  createAlien(100+65+65, greenImage)
  createAlien(100+65+65+65, yellowImage)

  borda = createEdgeSprites() 
}

function createAlien(y,alienImage){
    var x = 80
    for(var i=0;i<6;i++){
        var alien = createSprite(x,y,50,25)
        x+=alien.width + 40
        alien.addImage("corAlien", alienImage)
        alien.scale = 0.05
        alienGroup.add(alien)
    }
}

function alienHit(ball,alienGroup){
    alienGroup.remove();
    score = score + 5;
}

function gameplay(){
    Nave.x = mouseX;    

    if(Nave.x < 60){
        Nave.x = 60;
    }

    if(Nave.x > 650){
        Nave.x = 650;
    }

        
    ball.bounceOff(borda[0]);
    ball.bounceOff(borda[1]);
    ball.bounceOff(borda[2]);
    ball.bounceOff(borda[3]);
    ball.bounceOff(Nave)
    ball.bounceOff(alienGroup,alienHit);
    Nave.bounceOff(ball)

    if(ball.isTouching(borda[3])){
        Lifeover();
    }
}

function draw() { 
  background(FundoImage); 

  textSize(25);
  fill("Blue");
  text("score: " + score,10,25)
  text("lives: " + vidas,10,50)

  if(gamestate=="serve"){
    text("pressione a tecla espaço para começar!", 50,350);
    ball.velocityX = 0;
    ball.velocityY = 0;
    
  if(keyDown("space")){
    gamestate = "play"
    ball.velocityX = -7;
    ball.velocityY = -7;
    alienGroup.setVelocityYEach(0.2);
   }
    
  }
  else if(gamestate == "end"){
    text("Fim de jogo!!", 300, 370);
    ball.remove;
  }else{
    gameplay();
  }
  drawSprites();
}
function Lifeover(){
    vidas = vidas - 1;
    if(vidas>=1){
        gamestate = "serve";
    }
    else{
        gamestate = "end";
    }
}