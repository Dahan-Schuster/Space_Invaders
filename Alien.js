const AL_WIDTH = 50,
      AL_HEIGHT = 36,
      AL_SPEEDY = AL_HEIGHT / 4,
      AL_MAX_LIFE = 100,
      AL_BASE_DAMAGE = 20;

class Alien {
  
  constructor(row, col) {
    this.wallXRight = (col + 1) * (Config.WINDOW_WIDTH / Config.ALIEN_COLS) - AL_WIDTH;
    this.wallXLeft = (col) * (Config.WINDOW_WIDTH / Config.ALIEN_COLS);
    
    this.x = this.wallXLeft;
    this.y = row * ( AL_HEIGHT + 20 );
    
    this.image = loadImage('res/alien.png');
    
    this.life = AL_MAX_LIFE;
    
    this.delta = 1; // movement direction (1: right, -1: left);
  }
  
  draw() {
    image(this.image, this.x, this.y, AL_WIDTH, AL_HEIGHT);
    this.drawLifebar();
  }
  
  drawLifebar() {
    fill(255, 255, 255);
    rect(this.x, this.y + AL_HEIGHT + 5, AL_WIDTH, 5);
    
    fill(0, 255, 0);
    rect(this.x, this.y + AL_HEIGHT + 5, this.life * (AL_WIDTH / AL_MAX_LIFE), 5);
  }
  
  move(bullets, player, speedX) {
    let gameover = false;
    let dead = false;
    
    const newX = this.x + (speedX * this.delta);
    
    if (newX >= this.wallXRight || newX < this.wallXLeft) {
      this.delta *= -1; 
      this.y += AL_SPEEDY;
      
      if (this.y + AL_HEIGHT >= Config.WINDOW_HEIGHT)
        gameover = true;
    }
    
    this.x += speedX * this.delta;
    
    if (player) {
      if (this.collidesWith(player)) {
        gameover = true;
      }
    }
    
    for (i = 0; i < bullets.length; i++) {
      if (this.collidesWith(bullets[i])) {
        
        bullets.splice(i, 1);
        dead = this.takeDamage();

        if (dead) break;
      }
    }
    
    this.draw();
    
    return { gameover, alienDead: dead };
  }
  
  collidesWith(obj) {
    if (obj.x == undefined || obj.y == undefined)
      return false; 
    
    return obj.x >= this.x && obj.x <= this.x + AL_WIDTH &&
           obj.y >= this.y && obj.y < this.y + AL_HEIGHT;
  }
  
  takeDamage() {
    this.life -= AL_BASE_DAMAGE;
    if (this.life < 0) this.life = 0;
    
    return this.life <= 0;
  }
}
