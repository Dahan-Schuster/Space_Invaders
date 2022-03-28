const aliens = [],
      bullets = [];

let player,
    atariFont,
    gameState = 'running',
    score = 0,
    highscore = 0;

function setup() {
  createCanvas(Config.WINDOW_WIDTH, Config.WINDOW_HEIGHT);
  atariFont = loadFont('atari.ttf');
  textFont(atariFont);
  
  initObjects();
}

function initObjects() {
  score = 0;
  player = new Player();
  
  aliens.splice(0, aliens.length);
  bullets.splice(0, bullets.length);
  
  for (i = 0; i < Config.ALIEN_ROWS; i++) {
    for (j = 0; j < Config.ALIEN_COLS; j++) {
      aliens.push(new Alien(i, j));
    }
  }
}

function draw() {
  background(15, 0, 25);
  
  if (gameState === 'running')
    runGame();
  else if (gameState === 'gameover')
    endGame();
  else if (gameState === 'gamewon')
    winGame();
}

function runGame() {
  player.draw();
  
  for(i = 0; i < bullets.length; i++) {
    const gone = bullets[i].draw();
    if (gone) bullets.splice(i, 1);
  }
  
  let aliensSpeed = getAliensSpeed();
  for(j = 0; j < aliens.length; j++) {
    const { gameover, alienDead } = aliens[j].move(bullets, player, aliensSpeed);
    
    if (alienDead) {
      aliens.splice(j, 1);
      aliensSpeed = getAliensSpeed();
      score++;
      
      if (aliens.length === 0)
        gameState = 'gamewon';
    }
    
    if (gameover) {
      gameState = 'gameover';
    }
  }
  
  drawScore();
  drawSpeed(aliensSpeed);
  listenEvents();
}

function endGame() {
  highscore = score > highscore ? score : highscore;
  
  textAlign(CENTER);
  fill(255, 255, 255);
  
  textSize(50);
  text('GAME OVER',
       Config.WINDOW_WIDTH / 2,
       Config.WINDOW_HEIGHT / 2);
  
  textSize(30);
  text('Score: ' + score,
       Config.WINDOW_WIDTH / 2,
       Config.WINDOW_HEIGHT / 2 + 60);
  
  text('Highscore: ' + highscore,
       Config.WINDOW_WIDTH / 2,
       Config.WINDOW_HEIGHT / 2 + 100);
  
  
  textSize(15);
  text('Press enter to try again',
       Config.WINDOW_WIDTH / 2,
       Config.WINDOW_HEIGHT / 2 + 140);
}

function winGame() {
  highscore = score > highscore ? score : highscore;
  
  textAlign(CENTER);
  fill(255, 255, 255);
  
  textSize(50);
  text('YOU WIN!',
       Config.WINDOW_WIDTH / 2,
       Config.WINDOW_HEIGHT / 2);
  
  textSize(30);
  text('Score: ' + score,
       Config.WINDOW_WIDTH / 2,
       Config.WINDOW_HEIGHT / 2 + 60);
  
  text('Highscore: ' + highscore,
       Config.WINDOW_WIDTH / 2,
       Config.WINDOW_HEIGHT / 2 + 100);
  
  
  textSize(15);
  text('Press enter to play again',
       Config.WINDOW_WIDTH / 2,
       Config.WINDOW_HEIGHT / 2 + 140);
}

function getAliensSpeed() {
  let speed = Config.ALIEN_SPEED_NUMERATOR / aliens.length;
  if (speed > Config.ALIEN_MAX_SPEED)
    speed = Config.ALIEN_MAX_SPEED;
  
  return speed;
}

function listenEvents() {
  if (keyIsDown(LEFT_ARROW)) {
    player.moveLeft();
  }
  
  if (keyIsDown(RIGHT_ARROW)) {
    player.moveRight();
  }
}

function keyPressed() {
  if (gameState === 'running') {
    if (keyCode === 32) // spacebar
        bullets.push(player.shoot());
  } else {
    if (keyCode === 13) // enter
      restartGame();
  }
}

function restartGame() {
  initObjects();
  gameState = 'running';
}

function drawScore() {
  textSize(15);
  textAlign(LEFT);
  fill(255, 255, 255);

  text('Score: ' + score, 10, Config.WINDOW_HEIGHT - 10);
}

function drawSpeed(speed) {
  textSize(15);
  textAlign(LEFT);
  fill(255, 255, 255);

  text('Speed: ' + speed.toFixed(2), Config.WINDOW_WIDTH - 180, Config.WINDOW_HEIGHT - 10);
}
