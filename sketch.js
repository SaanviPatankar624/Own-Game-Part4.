
var asteroids, asteroids_img1, asteroids_img2;
var back_img, spacecraft_img, spacecraft;
var asteroidsGroup, bulletGroup, bullet;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var score = 0;
var gameover, restart, gameoverImg, restartImg;

function preload(){
	 
	asteroids_img1 = loadImage("asteroids-2.jpg");
	asteroids_img2 = loadImage("asteroids-3.jpg");
	back_img = loadImage("background-2.jpg");
	spacecraft_img = loadImage("jet.jpg");
	gameoverImg = loadImage("gameover.png");
	restartImg = loadImage("restart.jpg");
}

function setup() {
	createCanvas(1300, 700);

	//Create the Bodies Here.

	backgroundImg = createSprite(500, 500, 1300, 700);
	backgroundImg.addImage("moving", back_img);
	backgroundImg.velocityX = -6;
	backgroundImg.scale = 1;
	backgroundImg.x = backgroundImg.width/2;
	backgroundImg.visible = true;
	console.log(backgroundImg.x);

	spacecraft = createSprite(100, 300, 200);
	spacecraft.addImage(spacecraft_img);
	spacecraft.scale = 0.5;

	gameover = createSprite(650, 200);
	gameover.addImage(gameoverImg);
	gameover.scale = 0.20;
	gameover.visible = false;

	restart = createSprite(650, 300);
	restart.addImage(restartImg);
	restart.scale = 0.20;
	restart.visible = false;

	asteroidsGroup = new Group();
	bulletGroup = new Group();

	score = 0;
}


function draw() {
  rectMode(CENTER);
  background(back_img);

  if(gamestate === PLAY){

  if (backgroundImg.x < 0){	
	backgroundImg.x=backgroundImg.width/2;
	backgroundImg.velocityX = -4;
}

   spacecraft.y = World.mouseY;

  if(bulletGroup.isTouching(asteroidsGroup)){
	 score = score +2;
	 asteroidsGroup.destroyEach();
	 bulletGroup.destroyEach();
  }

  if(keyDown("space")){
	 createBullet();
  }

  if(spacecraft.isTouching(asteroidsGroup)){
	 asteroidsGroup.velocityX = 0;
  }

  if(spacecraft.isTouching(asteroidsGroup)){
	 spacecraft.destroy();
	 asteroidsGroup.destroyEach();
	 gamestate = END;
	 
    }
} 
  else if(gamestate === END){
	  gameover.visible = true;
	  restart.visible = true;

	//set velcity of each game object to 0
	  spacecraft.velocityX = 0;
	  backgroundImg.velocityX = 0;
	  bulletGroup.setVelocityXEach(0);
	  asteroidsGroup.setVelocityXEach(0);

	//set lifetime of the game objects so that they are never destroyed
	  bulletGroup.setLifetimeEach(-1);
	  asteroidsGroup.setLifetimeEach(-1);

	  if(mousePressedOver(restart)) {
		reset();
	  }
	
}


  backgroundImg.display();

  spacecraft.display();

  spawnAsteroids();

  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + " " + score, 800, 50);

}

function spawnAsteroids() {

	if(frameCount%100 === 0){
        var asteroids = createSprite(1000,120,70);
		//asteroids.debug = true;
		asteroids.velocityX = -6;

		var obstacles = Math.round(random(0, 650));
		asteroids.y = obstacles;

        var rand = Math.round(random(1,2));
        switch(rand){
        case 1:  asteroids.addImage(asteroids_img1);
        break;
         
        case 2:  asteroids.addImage(asteroids_img2);
        break;

        default: break;
     }

		asteroids.scale = 0.20;
		asteroids.lifetime = 200;

		asteroidsGroup.add(asteroids);
		
	}

}

function createBullet(){
	 
    bullet = createSprite(80, 320, 20, 20);
	bullet.shapeColor = "red";
	bullet.x = 360;
    bullet.y=spacecraft.y;
    bullet.velocityX = +4;
    bullet.lifetime = 600;
    bullet.scale = 0.3;
    bulletGroup.add(bullet);
    return bullet;
  
}

function reset(){
	gamestate = PLAY;

	gameover.visible = false;
	restart.visible = false;

	bulletGroup.destroyEach();
	asteroidsGroup.destroyEach();
	
	score = 0;

}



