var path,pathImg;

var mainCyclist;

var mainRacerImg1,mainRacerImg2;

var obstacle1,obstacle2,obstacle3;
var obstacle1Img, obstacle2Img,obstacle3Img;

var oppoPink1,oppoPink2;
var oppoPink1Img,oppoPink2Img;

var oppoYellow1,oppoYellow2;
var oppoYellow1Img,oppoYellow2Img;

var oppoRed1,oppoRed2;
var oppoRed1Img,oppoRed2Img;

var PinkCG,YellowCG,RedCG;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");

  oppoPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppoPink2Img = loadAnimation("images/opponent3.png");
  
  oppoYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppoYellow2Img = loadAnimation("images/opponent6.png");
  
  oppoRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppoRed2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
gameOver = createSprite(250,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5  ;
gameOver.visible = false;
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();

  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150); 
    
    if(keyDown("space")) {
    cycleBell.play();
  }  
   var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
    
    if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppoPink2Img);
    }
  }
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppoYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppoRed2Img);
    }
    
    
  } else if (gameState === END) {
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press up arrow to Restart the game!", 100,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
  
} 
}


function pinkCyclists(){
    player1 =createSprite(1100,Math.round(random(50, 250)));
    player1.scale =0.06;
    player1.velocityX = -(6 + 2*distance/150);
    player1.addAnimation("opponentPlayer1",oppoPink1Img);
    player1.setLifetime=170;
    pinkCG.add(player1);
}

function yellowCyclists(){
    player2 =createSprite(1100,Math.round(random(50, 250)));
    player2.scale =0.06;
    player2.velocityX = -(6 + 2*distance/150);
    player2.addAnimation("opponentPlayer2",oppoYellow1Img);
    player2.setLifetime=170;
    yellowCG.add(player2);
}

function redCyclists(){
    player3 =createSprite(1100,Math.round(random(50,250)));
    player3.scale =0.06;
    player3.velocityX = -(6 + 2*distance/150);
    player3.addAnimation("opponentPlayer3",oppoRed1Img);
    player3.setLifetime=170;
    redCG.add(player3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
}

