class Star{
  constructor(){
    this.xPos = random(width);
    this.yPos = random(height);
    this.radius = random(1,4);
    this.speed = random(0.5,2);
    this.color = 255;
  }
  
  move(){
    this.xPos = this.xPos + this.speed;
    if(this.xPos > width){
      this.xPos=0;
    }
  }
  
  show(){
    fill(this.color,250,250);
    circle(this.xPos, this.yPos, this.radius);
  }
}