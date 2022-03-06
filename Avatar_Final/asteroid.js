class Asteroid{
  constructor(){
    this.xPos = random(220,250);
    this.yPos = random(250,270);
    this.width = random(70,100);
    this.height = random(70,100);
    this.speedX = random(0.5,1);
    this.speedY = random(0.3,0.5);
    this.rotate = random(50,70);
  }
  
  move(){
    this.xPos = this.xPos + this.speedX;
    this.yPos = this.yPos + this.speedY;
    if(this.xPos > width + 300){
      this.xPos=-400;
    }
    if(this.yPos > height + 300){
      this.yPos=-400;
      this.rotate = -this.rotate;
    }
    
    this.rotate = this.rotate + this.speedX/10;
  }
  
  setAsteroidSpeed(x,y){
    this.speedX = x;
    this.speedY = y;
  }
  
  showCustom(){
    push();
    translate(this.xPos, this.yPos);
    fill(122, 72, 15);
    stroke(0);
    strokeWeight(2);
    rotate(this.rotate);
    beginShape();
    vertex(this.xPos + 20, this.yPos - 260);
    vertex(this.xPos + 100, this.yPos - 270);
    vertex(this.xPos + 110, this.yPos - 240);
    vertex(this.xPos + 120, this.yPos - 220);
    vertex(this.xPos + 100, this.yPos - 210);
    vertex(this.xPos + 80, this.yPos - 180);
    vertex(this.xPos + 50, this.yPos - 180);
    vertex(this.xPos + 40, this.yPos - 180);
    vertex(this.xPos -30, this.yPos - 160);
    vertex(this.xPos -60, this.yPos - 220);
    vertex(this.xPos - 40, this.yPos - 250);
    vertex(this.xPos + 20, this.yPos - 260);
    endShape();
    
    
    
    fill(56, 37, 15);
    pop();
  }
  
  showTriangle(){
    push();
    translate(this.xPos,this.yPos);
    fill(122, 72, 15);
    rotate(this.rotate);
    triangle(this.xPos, this.yPos, this.xPos + 80, this.yPos - 50, this.xPos +30, this.yPos + 30);
    
    pop();
  }
}