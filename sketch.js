var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ghost, ghostImg;

var tower, towerImg;

var door, doorImg, doorGroup;

var climber, climberImg, climberGroup;

var invisibleClimber,invisibleClimberGroup;

var invisibleGround;

var gameOver,gameOverImg;

var spooky;

score=0;

function preload(){
  ghostImg=loadImage("ghost-standing.png");
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  gameOverImg=loadImage("gameOver.png");
  spooky=loadSound("spooky.wav");
}
function setup(){
  createCanvas(windowWidth, windowHeight);
  
  tower=createSprite(width/2,0);
  tower.addImage("tower",towerImg);
  
  ghost=createSprite(width/2,height/2,10,10);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.30;
  ghost.setCollider("rectangle",33,20,235,265);
  ghost.debug = true;
  
  gameOver=createSprite(width/2,height/2);
  gameOver.addImage("gameOver",gameOverImg);
  
  invisibleGround=createSprite(width/2,height-5,1000,10);
  gameOver.addImage("gameOver",gameOverImg);
  invisibleGround.visible = false;
  
  invisibleClimberGroup=new Group();
  climberGroup=new Group();
  doorGroup=new Group();
}
function draw() {
  
  background(0);
  
  if(gameState == PLAY){
     score = score + Math.round(frameRate()/30);
     gameOver.visible = false;
     ghost.collide(climberGroup);
    if (tower.y < 100){
        tower.y = tower.height/2;
      }

    tower.velocityY = -(2 + score/100);

    Door_Y_climber();

    ghost_x_y();

    ghost.velocityY = ghost.velocityY + 0.8;

    if(invisibleClimberGroup.isTouching(ghost)||
      invisibleGround.isTouching(ghost)){
      gameState=END;
    }
    
     }
  if (gameState==END){
    tower.velocityY = 0;
    ghost.velocityY = 0;
    gameOver.visible = true;
    doorGroup.setLifetimeEach(-1);
    climberGroup.setLifetimeEach(-1);
    invisibleClimberGroup.setLifetimeEach(-1);
    doorGroup.setVelocityYEach(0);
    climberGroup.setVelocityYEach(0);
    invisibleClimberGroup.setVelocityYEach(0);
    if (keyDown("SPACE")&&gameState==END) {
      gameState = PLAY;
      doorGroup.destroyEach();
      climberGroup.destroyEach();
      invisibleClimberGroup.destroyEach();
      ghost.x=width/2;
      ghost.y=height/2;
      score=0;
    }
  }
  drawSprites();
  textSize(22);
  fill(255);
  text("Score: "+ score+"\n (¬‿¬)",width/2,height/6);
  console.log("score:\n  "+score);
}
function Door_Y_climber(){
  if (frameCount % 240 === 0){
  door=createSprite(width,height-700);
  door.addImage("door",doorImg);
  door.x=Math.round(random(100,350));
  door.velocityY = +(2 + score/100);
  door.lifetime = 850;
  doorGroup.add(door);
    
  climber=createSprite(width,height-640);
  climber.addImage("climber",climberImg);
  climber.x=door.x;
  climber.velocityY = +(2 + score/100);
  climber.lifetime = 850;
  climberGroup.add(climber);
    
  invisibleClimber=createSprite(width,height-630,100,10);
  invisibleClimber.x=door.x;
  invisibleClimber.velocityY = +(2 + score/100);
  invisibleClimber.lifetime = 850;
  invisibleClimber
  invisibleClimberGroup.add(invisibleClimber);
    
  ghost.depth = door.depth;
  ghost.depth = ghost.depth + 1;
}
}
function ghost_x_y(){
  if (keyDown("left_arrow")) {
    ghost.x=ghost.x-2.5;
  }
  if (keyDown("right_arrow")) {
    ghost.x=ghost.x+3.5;
  }
  if (keyDown("SPACE")) {
    ghost.velocityY=-6;
  }
}