const gameArea = document.querySelector("#gameArea");
const sprite = document.querySelector("#sprite");
const obstacleTop = document.querySelector("#obstacleTop");
const obstacleBot = document.querySelector("#obstacleBot");

let spriteY = 0;  //  Starting point of sprite. Close to the top.
let obstacleX = 800; // Starting point right edge of the game area
let velocityY = 1.3; // speed of sprite falling and jumping
let gapY = 120;  // modify this to make game easier or harder

const spriteX = 100; // sprite is fixed on 100px on the X axis. 
const spriteWidth = 40; // sprite width
const spriteHeight = 40; // sprite height

const gravity = 0.09; // pulls sprite down by 
const jumpPower = -2.9; // negative up positive down
const floorY = 460; // floor coordinate at 460.

const obstacleSpeed = 3; // 3px per frame speed
const obstacleWidth = 40; //  40px 
const gapSize = 150;

let gameOver = false; // game starts 

function updateSprite(){      ///        
  velocityY += gravity;
  spriteY += velocityY;

  if (spriteY >= floorY) {
    spriteY = floorY;
    velocityY = 0;
    gameOver = true;
    console.log("Game Over - hit floor");
  }

  sprite.style.left = spriteX + "px"; // This turns int into px in CSS. int + string = string
  sprite.style.top = spriteY + "px";  
}

function jump(event) {
  if (event.code === "Space" && !gameOver) {
    velocityY = jumpPower;
  }
}

function updateObstacle() {// 
  obstacleX -= obstacleSpeed;

  if (obstacleX < -obstacleWidth) {
    obstacleX = 800;
    gapY = Math.floor(Math.random() * 250) + 80;
  }

  const topHeight = gapY; 
  const bottomY = gapY + gapSize;  /// how?? 
  const bottomHeight = floorY - bottomY + spriteHeight; // bottom of what?? 

  obstacleTop.style.left = obstacleX + "px";
  obstacleTop.style.top = "0px";
  obstacleTop.style.width = obstacleWidth + "px";
  obstacleTop.style.height = topHeight + "px";

  obstacleBot.style.left = obstacleX + "px";
  obstacleBot.style.top = bottomY + "px";
  obstacleBot.style.width = obstacleWidth + "px";
  obstacleBot.style.height = bottomHeight + "px";
}

function isColliding(object1, object2) {          /// reference 
  return (
    object1.x < object2.x + object2.width &&
    object1.x + object1.width > object2.x &&
    object1.y < object2.y + object2.height &&
    object1.y + object1.height > object2.y
  );
}

function checkCollision() {
  const spriteObj = {
    x: spriteX,
    y: spriteY,
    width: spriteWidth,
    height: spriteHeight
  };

  const obstacleTopObj = {
    x: obstacleX,
    y: 0,
    width: obstacleWidth,
    height: gapY
  };

  const obstacleBotObj = {
    x: obstacleX,
    y: gapY + gapSize,
    width: obstacleWidth,
    height: floorY - (gapY + gapSize) + spriteHeight
  };

  if (
    isColliding(spriteObj, obstacleTopObj) ||
    isColliding(spriteObj, obstacleBotObj)
  ) {
    velocityY = 0;
    gameOver = true;
    console.log("Game Over - hit obstacle");
  }
}

function gameLoop() {
  if (gameOver) return;

  updateSprite();
  updateObstacle();
  checkCollision();

  requestAnimationFrame(gameLoop);
}

addEventListener("keydown", jump);

gameLoop();