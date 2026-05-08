const gameArea = document.querySelector("#gameArea");
const sprite = document.querySelector("#sprite");
const obstacleTop = document.querySelector("#obstacleTop");
const obstacleBot = document.querySelector("#obstacleBot");
const scoreElement = document.querySelector("#score")

let spriteY = 0;  //  Starting point of sprite. Close to the top.
let obstacleX = 660; // Starting point right edge of the game area
let velocityY = 1.3; // speed of sprite falling and jumping
let gapY = 120;  // Starting position of gap between vertical obstacles. Modify this to make game easier or harder 

const spriteX = 100; // sprite is fixed on 100px on the X axis. 
const spriteWidth = 40; // sprite is 40px in width
const spriteHeight = 40; // sprite is 40px in height

const gravity = 0.09; // pulls sprite down by 0.
const jumpPower = -2.9; // negative up positive down
const floorY = 560; // floor coordinate at 560.

const obstacleSpeed = 5; // 3px per frame speed
const obstacleWidth = 60; // 60px
const gapSize = 150; // 

let score = 0; 
let gameOver = false; 

function updateSprite(){             
  velocityY += gravity; // this simulates falling 
  spriteY += velocityY;  

  if (spriteY >= floorY) { // If the sprite bigger or = to floor coordinate. Stop velocity + game over.
    spriteY = floorY;
    velocityY = 0;
    gameOver = true;
    console.log("Game Over");
  }

  sprite.style.left = spriteX + "px"; // This turns int into px in CSS. int + string = string
  sprite.style.top = spriteY + "px";  // Same ^^ 
}

function jump(event) {
  if (event.code === "Space" && !gameOver) {  // if space is pressed and gameOver is false, apply jumpPower to velocityY
    velocityY = jumpPower;
  }
}

function updateObstacle() {// 
  obstacleX -= obstacleSpeed;

  if (obstacleX < -obstacleWidth) {  // left side of obstacleX needs to fully leave the screen if so, restart from 660px even though our width is 400px bc it feels slower (personal preference). 
    obstacleX = 660;
    gapY = Math.floor(Math.random() * 250) + 80;

    if (!gameOver) {
      score++;
      scoreElement.innerText = score;
    }
}

  // Math.floor(Math.random()) randomises a coordinate from 0 to 1. + 80 is a buffer of 80px to stop it being too small  }

  const topHeight = gapY; // 
  const bottomY = gapY + gapSize;  /// 
  const bottomHeight = floorY - bottomY + spriteHeight;  

  obstacleTop.style.left = obstacleX + "px";         /// this animates the obstacle movement
  obstacleTop.style.top = "0px";
  obstacleTop.style.width = obstacleWidth + "px";
  obstacleTop.style.height = topHeight + "px";

  obstacleBot.style.left = obstacleX + "px";
  obstacleBot.style.top = bottomY + "px";
  obstacleBot.style.width = obstacleWidth + "px";
  obstacleBot.style.height = bottomHeight + "px";
}

function isColliding(object1, object2) {       // function returns a boolean. If collisions happens between 2 objects on
  return (
    object1.x < object2.x + object2.width &&    
    object1.x + object1.width > object2.x &&
    object1.y < object2.y + object2.height &&
    object1.y + object1.height > object2.y
  );
}

function checkCollision() { // create o
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

  const obstacleBotObj = {                       // 
    x: obstacleX,
    y: gapY + gapSize,
    width: obstacleWidth,
    height: floorY - (gapY + gapSize) + spriteHeight
  };

  if (
    isColliding(spriteObj, obstacleTopObj) ||      // only one of these needs to be true for isColliding to be true
    isColliding(spriteObj, obstacleBotObj)
  ) {
    velocityY = 0;
    gameOver = true;
    console.log("Game Over");
  }
}

function gameLoop() {     
  if (gameOver) return;

  updateSprite();
  updateObstacle();
  checkCollision();

  requestAnimationFrame(gameLoop); // 
}

window.addEventListener("keydown", jump);   //.window ia a global browser object is not necessary to prefix. Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/window

gameLoop();