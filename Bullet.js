const BU_SPEED = 3.5,
      BU_WIDTH = 3,
      BU_HEIGHT = 10;

class Bullet {
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  draw() {
    fill(150, 100, 0);
    rect(this.x, this.y, BU_WIDTH, BU_HEIGHT);
    
    this.y -= BU_SPEED;
    
    return this.y + BU_HEIGHT <= 0;
  }
}