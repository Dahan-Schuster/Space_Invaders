const PL_WIDTH = 50
      PL_HEIGHT = 53,
      PL_SPEED = 2.5;

class Player {
  constructor() {
    this.x = (Config.WINDOW_WIDTH / 2) - (PL_WIDTH / 2);
    this.y = Config.WINDOW_HEIGHT - PL_HEIGHT;
    
    this.image = loadImage('res/ship.png');
  }
  
  draw() {
    image(this.image, this.x, this.y, PL_WIDTH, PL_HEIGHT);
  }
  
  moveRight() {
    const newX = this.x + PL_SPEED;
    
    if (newX + PL_WIDTH < Config.WINDOW_WIDTH)
      this.x = newX;
  }
  
  moveLeft() {
    const newX = this.x - PL_SPEED;
    
    if (newX > 0)
      this.x = newX;
  }
  
  shoot() {
    const middleX = this.x + (PL_WIDTH / 2);
    return new Bullet(middleX, this.y);
  }
}
