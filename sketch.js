var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground;
var survivalTime=0;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided=loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(100,200,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.1;
  
  
  ground=createSprite(0,350,900,20);
  ground.velocityX=-3;

  bananaGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
  background(255);
   monkey.collide(ground);
  
  
  if(gameState===PLAY){
    survivalTime=Math.ceil(frameCount/frameRate());
    
  if(keyDown("space")) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(obstacleGroup.isTouching(monkey)){
     gameState=END;
     }

  food();
  obstacles();
    if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    }
    
    
  if(obstacleGroup.isTouching(monkey)){
     gameState=END;}
  }
  
  if(gameState===END){
  if(obstacleGroup.isTouching(monkey))
     bananaGroup.destroyEach();
     obstacleGroup.destroyEach();
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     text("GAMEOVER",150,200);
     
     monkey.velocityX=0;
     monkey.changeAnimation("collided",monkey_collided);
     ground.velocityX=0;
  
    
  }
  
   
  
  
drawSprites();
  
  textSize(20);
  text("survivalTime:"+survivalTime,100,50);
}

function food(){
if(frameCount%80===0){
    banana = createSprite(400,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.setLifetime=150;
  
    bananaGroup.add(banana);

}

}

function obstacles(){
if(frameCount%300 === 0) {
     obstacle = createSprite(370,320,10,40);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.1;
     obstacle.lifetime = 150;
     obstacle.velocityX=-3;
    
    obstacleGroup.add(obstacle);
}

}

