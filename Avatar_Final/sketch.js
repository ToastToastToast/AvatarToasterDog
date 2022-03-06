

//stars
let numStars = 50;
let stars = [];

//toasterSwitch
let interval = 10000;
let prevTime;
let cookingPos = 0;
let toasterOn = false;
let toastHeight = 0;

//toast burn marks
let currentTime;
let toastColorR = 255;
let toastColorG = 204;
let toastColorB = 138;

//asteroids
let asteroid1;

//centering sketch in html

var canvas;

function setup() {

canvas = createCanvas(500, 500);
//canvas.position(700,300);


angleMode(degrees);
frameRate(60);

//microphone setup
mic = new p5.AudioIn();
mic.start();

//creates stars in background
starField();

//sets the reset timer to current time for lever
prevTime = millis();

//background asteroids
asteroid1 = new Asteroid();
asteroid2 = new Asteroid();

}


function draw() {
  angleMode(DEGREES);
  background(0);
  noStroke();

  //calling stars
  for(let i = 0; i < stars.length;i++){
    stars[i].move();
    stars[i].show();
  }

  //call asteroids
  asteroid1.move();
  asteroid1.showCustom();
  asteroid2.move();
  asteroid2.showTriangle();

  ToasterDog();


  //microphone setup
  micLevel = mic.getLevel();

  //Test mic is working
  //print('mic level is' + micLevel);

  //dev tool
  //coordinates();
}


function ToasterDog()  {
  //current functions...
  //Toaster, DogHead, Tail
  Tail();
  Toaster();
  DogHead();
  }


  function Toaster(){
    //current functions...Bread, Feet, BodyToaster
    //BREAD: rgb crust, rgb bread, burn marks, xy coords; start colors:255 204,138
    //FEET: rgb
    //BODYTOASTER: rgb body, rgb rim

    Bread(148, 118, 78, toastColorR - 5, toastColorG + 20, toastColorB + 60, toastColorR, toastColorG, toastColorB, 0, 0);
    Feet(224, 158, 0); //rgb
    BodyToaster(113, 245, 245, 200, 200, 200);
    toasterSwitch();
    }

  function DogHead(){
    //current functions... Head, Ears, Eyes, Nose, Mouth
    //INPUTS: r, g, b colors unless otherwise stated - 3 parameters
    //EYES: rgb color outer circle, rgb highlight circle - 6 parameters
    //MOUTH: rgb color, stroke, strokeWeight - 5 parameters

     let headCheck = false;
     if(mouseX > 320 && mouseX < 460){
      if(mouseY > 150 && mouseY < 230){
          headCheck = true;
        }
        else{
          headCheck = false;
        }
     }
      else{
        headCheck = false;
    }

     Head(224,158,0);
     Ears(156, 110, 0);
     Eyes(0,0,0, 255,255,255,headCheck);
     Nose(0, 0 ,0);
     Mouth(0,0,0,0,4);

  }

  function Tail(){
   //current functions...tipTail, baseTail
   //rgb parameters

     let tailHeadPat = false;
     if(mouseX > 320 && mouseX < 460){
      if(mouseY > 150 && mouseY < 230){
          tailHeadPat = true;
        }
        else{
          tailHeadPat = false;
        }
     }
      else{
        tailHeadPat = false;
    }

    tipTail(255, 255, 255,tailHeadPat);
    baseTail(224, 158, 0,tailHeadPat);
  }


  //Section for the TOASTER

    function Bread(r, g, b, rr, gg, bb, rrr, ggg, bbb, x,y){
      push();
    //Crust
      fill(r, g, b);
      rect(width*0.2,height*0.33 + toastHeight,width*0.57,height*0.3,2);
   //Lumps on top of bread;  243 middle coords

      translate(x,y);

      beginShape();
      curveVertex(width * 0.2,height * 0.5 + toastHeight);
      curveVertex(width * 0.2,height * 0.332 + toastHeight);
      curveVertex(width * 0.342,height * 0.26 + toastHeight);
      curveVertex(width * 0.512,height * 0.33 + toastHeight);
      curveVertex(width * 0.512,height * 0.5 + toastHeight);
      endShape();

      beginShape();
      curveVertex(width * 0.46,height * 0.5 + toastHeight);
      curveVertex(width * 0.46,height * 0.344 + toastHeight);
      curveVertex(width * 0.627,height * 0.26 + toastHeight);
      curveVertex(width * 0.772,height * 0.337 + toastHeight);
      curveVertex(width * 0.776,height * 0.5 + toastHeight);
      endShape();

      //Bread
      fill(rr, gg, bb); //bread color
      rect(width*0.22,height*0.35 + toastHeight,width*0.53,height*0.25,5);

      beginShape();
      curveVertex(width * 0.22,height * 0.46 + toastHeight);
      curveVertex(width * 0.22,height * 0.356 + toastHeight);
      curveVertex(width * 0.342,height * 0.29 + toastHeight);
      curveVertex(width * 0.52,height * 0.356 + toastHeight);
      curveVertex(width * 0.52,height * 0.5 + toastHeight);
      endShape();

       beginShape();
      curveVertex(width * 0.47,height * 0.5 + toastHeight);
      curveVertex(width * 0.47,height * 0.356 + toastHeight);
      curveVertex(width * 0.627,height * 0.29 + toastHeight);
      curveVertex(width * 0.75,height * 0.356 + toastHeight);
      curveVertex(width * 0.75,height * 0.5 + toastHeight);
      endShape();

      //cook marks, realized I didn't like them
      //fill(rrr, ggg, bbb,160);
      //rect(width * 0.25, height * 0.36 + toastHeight, width * 0.15, height * 0.22, width * 0.02);
      //rect(width * 0.415, height * 0.36 + toastHeight, width * 0.15, height * 0.22, width * 0.02);
      //rect(width * 0.58, height * 0.36 + toastHeight, width * 0.15, height * 0.22, width * 0.02);

      //moving toast downward and changing color

      if(toasterOn == true){

        toastHeight = 30;
        if(frameCount % 160 == 0){
          //starting at rgb 255 204 138
          toastColorR = toastColorR - 7;
          toastColorG = toastColorG - 14;
          toastColorB = toastColorB - 27;
        }
      }
      else{
        toastHeight = -30;
      }

       pop();
    }

    function Feet(r, g, b){
      //Feet
      fill(r,g,b);
      rect(width*0.24,height*0.8,width*0.1,height*0.1,0,0,5,5);
      rect(width*0.58,height*0.8,width*0.1,height*0.1,0,0,5,5);
    }

    function BodyToaster(r, g, b, rr, gg, bb){
       //Body Toaster
      fill(r, g, b); //first 3 para
      rect(width*0.14,height*0.4,width*0.64,height*0.4,20);
      fill(rr,gg,bb)//second 3 para
      rect(width*0.12,height*0.76,width*0.7,height*0.04);
    }


  function toasterSwitch(){
      //lever hole
      push();
        fill(100,100,100)
        rect(width * 0.425, height * 0.64, width * 0.05, height * 0.1);
      pop();
    //toaster click switch
      if(mouseX > width * 0.34 && mouseX < width * 0.6){
        if(mouseY > height * 0.65 && mouseY < height * 0.75){
          if(mouseIsPressed === true){
            //reset the toast color
            toastColorR = 255;
            toastColorG = 204;
            toastColorB = 138;
            print('Toaster On');
            prevTime = millis();
            toasterOn = true;
          }
        }
      }

    //timer
      if(toasterOn == true){
         cookingPos = 20;
        if(millis() > prevTime + interval){
          cookingPos = 0;
          toasterOn = !toasterOn;
          print('Toast is done!');
          interval = random(7000,16000);
          prevTime = millis();

        }
      }

    //drawing the toaster switch
      push();
        stroke(50, 151, 168);
        strokeWeight(1);
        fill(220,220,220);
        arc(width * 0.45, (height * 0.7) + cookingPos,width * 0.32, height * 0.1,180,360,CHORD);
      pop();
    }


  //Section for the HEAD


    function Head(r, g, b){
       //Head
      //fill(224, 158, 0); orange
      fill(r, g, b);
      rect(width*0.58,height*0.32,width*0.34,height*0.3);
      fill(240,240,240);
      rect(width*0.71,height*0.32,width*0.08,height*0.3);
    quad(width*0.58,height*0.62,width*0.71,height*0.48,width*0.79,height*0.48,width*0.92,height*0.62);
    }

  //EARS

    function Ears(r, g, b){
       //Left Ear
      //fill(156, 110, 0); dark brown
      fill(r, g, b);

  //microphone for Left Ear
   push();
      micLevel = mic.getLevel();
      let xLargeLeft = width*0.48;
      let yLargeLeft = height*0.3;
      let xSmallLeft = width*0.51;
      let ySmallLeft = height*0.28;
      let angle = 0;
      angle = angle + getLevelEase(micLevel);

    push();
      //print('height of ear is'+micLevel);
      translate(xLargeLeft + 30, yLargeLeft);
      rotate(angle);
      rect(width * -0.06,0,width*0.14,height*0.26); //large part
    pop();

    rect(xSmallLeft,ySmallLeft,width*0.16,height*0.12); //smaller part
  pop();


  //Right Ear
  rect(width*0.88,height*0.28,width*0.1,height*0.3);
  rect(width*0.83,height*0.27,width*0.12,height*0.08);

    }
  function Eyes(r, g, b, rr,gg,bb, HeadCheck){

//Eyes
  fill(r, g, b);
  //function to change the state of the eyes
    if(HeadCheck == true){
  //if(mouseX > 320 && mouseX < 460){
    //if(mouseY > 150 && mouseY < 230){
      push();
      strokeWeight(3);
      stroke(3);
      fill(0,0,0);
      line(width*0.62,height*0.44,width* 0.7, height* 0.44 );
      line(0.8 * width,height * 0.44,width * 0.88,height * 0.44);
      pop();
    }
    else{
        ellipse(width*0.66,height*0.44,width*0.05,height*0.06);
        ellipse(width*0.84,height*0.44,width*0.05,height*0.06);
        //white highlight
        fill(rr,gg,bb);
        ellipse(width*0.85,height*0.43,width*0.02,height*0.02);
        ellipse(width*0.67,height*0.43,width*0.02,height*0.02);
      }
   //}
    //else{
    // ellipse(width*0.66,height*0.44,width*0.05,height*0.06);
     //ellipse(width*0.84,height*0.44,width*0.05,height*0.06);
      //white highlight
     // fill(rr,gg,bb);
    //ellipse(width*0.85,height*0.43,width*0.02,height*0.02);
   // ellipse(width*0.67,height*0.43,width*0.02,height*0.02);
    //}
  }

//Nose
    function Nose(r, g, b){
      fill(r, g, b);

quad(width*0.72,height*0.52,width*0.78,height*0.52,width*0.76,height*0.55,width*0.74,height*0.55);
    }

//Mouth
    function Mouth(r, g, b, s, sw){
    //mouth rgb, stroke, weight
      fill(r,g,b);
      stroke(s);
      noFill();
      strokeWeight(sw);
    curve(width*0.65,height*0.45,width*0.7,height*0.58,width*0.75,height*0.55,width*0.75,height*0.4);
  curve(width*0.85,height*0.45,width*0.8,height*0.58,width*0.75,height*0.55,width*0.75,height*0.4);

    }


 //Section for the TAIL


  function tipTail(r, g, b,tailHeadPat){
    strokeWeight(0);
    fill(r, g, b);
    let x1 = 0;
    let x2 = 0;
    let x3 = 0;
    let y1 = 0;
    let y2 = 0;
    let y3 = 0;

    push();
      if(tailHeadPat == true){
        x1 = width * 0.02;
        x2 = width * 0.14;
        x3 = width * 0.14;
        y1 = height * 0.58;
        y2 = height * 0.5;
        y3 = height * 0.58;
      }

    else{
        x1 = width * 0.02;
        x2 = width * 0.14;
        x3 = width * 0.14;
        y1 = height * 0.38;
        y2 = height * 0.46;
        y3 = height * 0.58;
    }
      triangle(x1, y1, x2, y2, x3, y3);
    pop();
  }

  function baseTail(r, g, b,tailHeadPat){
    fill(r, g, b);
    let x1 = 0;
    let x2 = 0;
    let x3 = 0;
    let x4 = 0;
    let y1 = 0;
    let y2 = 0;
    let y3 = 0;
    let y4 = 0;

    push();
      if(tailHeadPat == true){
        x1 = width * 0.08; //top left
        x2 = width * 0.14; //top right
        x3 = width * 0.14; //bottom right
        x4 = width * 0.07; //bottom left
        y1 = height * 0.54;
        y2 = height * 0.5;
        y3 = height * 0.58;
        y4 = height * 0.58;
      }

    else{
        x1 = width * 0.08;
        x2 = width * 0.14;
        x3 = width * 0.14;
        x4 = width * 0.07;
        y1 = height * 0.42;
        y2 = height * 0.46;
        y3 = height * 0.58;
        y4 = height * 0.46;
    }
    quad(x1, y1, x2, y2, x3, y3, x4, y4);
    pop();
  }

//Stars

function starField(){

    for(let i = 0; i<numStars; i++){
      stars[i] = new Star();
    }


  }

 //Returns 1 of 18 values of microphone volume to remove decimals.
 function getLevelEase(volume){
   let volumeInputs = [0,5,10,15,20,25,30,35,40,45,50,60,70,80,90,110,110,120,130,150];
   if(volume<0.05){
     return volumeInputs[0];
   }
   if(volume<0.10){
     return volumeInputs[1];
   }
    if(volume<0.15){
     return volumeInputs[2]
   }
   if(volume<0.2){
     return volumeInputs[3];
   }
   if(volume<0.25){
     return volumeInputs[4]
   }
   if(volume<0.3){
     return volumeInputs[5]
   }
   if(volume<0.35){
     return volumeInputs[6];
   }
   if(volume<0.40){
     return volumeInputs[7]
   }
   if(volume<0.45){
     return volumeInputs[8]
   }
   if(volume<0.5){
     return volumeInputs[9];
   }
   if(volume<0.55){
     return volumeInputs[10]
   }
   if(volume<0.6){
     return volumeInputs[11];
   }
   if(volume<0.65){
     return volumeInputs[12]
   }
   if(volume<0.7){
     return volumeInputs[13]
   }
   if(volume<0.75){
     return volumeInputs[14]
   }
   if(volume<0.8){
     return volumeInputs[15]
   }
   if(volume<0.85){
     return volumeInputs[16];
   }
   if(volume<0.9){
     return volumeInputs[17];
   }
   if(volume<0.925){
     return volumeInputs[18]
   }
   if(volume<0.95){
     return volumeInputs[19];
   }
   else{
     return 170;
   }
// }



}



//for development purposes
function coordinates(){
  //for development purposes
  fill(255,0,0);
  noStroke();
  text("("+mouseX+","+mouseY+")", mouseX, mouseY);
}
