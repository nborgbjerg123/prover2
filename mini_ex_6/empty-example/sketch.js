var flowers = [];
var stars = [];
var heartX = 10;
var heartY = 150;
var song;
var img;

function preload() { //loading the files beforehand, so it all appears together
  song = loadSound('Meadow.mp3');
  img = loadImage('willowtrans.png')
}

function setup() {
  createCanvas(windowWidth, 900);
  background(10);
  song.play();

  for (var i = 0; i < 8; i++) { //a forloop making all the flowers appear
    var x = 90 + 300 * i;
    var maxHeight = random(1100, 900); //the flowers start at different points, so they would grow at the exact same Y-position all together
    flowers[i] = new Flower(x, 900, maxHeight);
  }

  for (var s = 0; s < 50; s++) { //a for loop making all the stars appear on screnen
    stars[s] = new Star (random(width), random(height), random(3));
  }
}

function draw () {
  push();
  fill(10, 70);
  noStroke();
  rect(0,0, windowWidth, 200);
  pop(); // a transparent rectangle at the top making, making the trail for the heartbeat animation

  push();
  fill(10);
  noStroke();
  rect(0,200, windowWidth, 700);
  pop(); //a non transparent rectangle, so there wouldnt be a trail when the flowers grow, also helps the trees transparency

  push();
  scale(1.2); //sizing the tree
  image(img, windowWidth/2-410, 200);
  pop();

  for (var i = 0; i < flowers.length; i++) { //through all flowers, all aspects of the class are set in motion
    flowers[i].grow();
    flowers[i].stem();
    flowers[i].bloom();
  }

  for (var s = 0; s < stars.length; s++) { //through all the stars, all aspects of the class appear
    stars[s].shimmer();
    stars[s].sky();
  }

  heartBeat(); //the heartrate/heartbeat animation, described in the function beneath
}

class Flower {
  constructor (x, y, maxHeight) {
    this.x = x;
    this.y = y;
    this.maxHeight = maxHeight;
    this.speed = 0.2;
  }

  grow () {
    this.maxHeight = this.maxHeight - this.speed; //the speed of the flowers growth
    if (this.maxHeight <= 650) { //if it reaches a certain height, make the flower grow down
        this.speed = -0.2;
      } else if (this.maxHeight >= 900) { //if it goes to the bottom make it grow upwards
        this.speed = 0.2;
      }
  }

  stem() {
    stroke(200);
    strokeWeight(3);
    line(this.x, this.y, this.x, this.maxHeight); //the stem is a line, where the second y-position is the maxHeight, the one that is "animated"
  }

  bloom() {
    fill(200);
    push();
    translate(this.x, this.maxHeight); //translating the coordinate system to the end of the stem
    noStroke();
    for (var i = 0; i < 10; i++) { //making the flower petals using ellipses and rotating them
      ellipse(0, 1, 10, 50);
      rotate(PI/5);
    }
    pop(); //making sure it isnt the entire class that is rotated :-)
  }
}

function heartBeat() {
  heartX = heartX + 3; //speed of the ellipse x-position

  if (heartX > width) { //if it reaches the end, reset to start position
    heartX = 0;
  }

  if (heartX >= windowWidth/2-55 && heartX <= windowWidth/2-45) { //all of these set the heartbeat itself, the "mountains" in the middle, setting the Y-position due to certain x-positions
    heartY -= 8; //here it decreases in height
  } else if (heartX >= windowWidth/2-45 && heartX <= windowWidth/2-35) {
    heartY += 8; //here it increases in height
  } else if (heartX >= windowWidth/2-35 && heartX <= windowWidth/2-10) {
    heartY -= 8;
  } else if (heartX >= windowWidth/2-10 && heartX <= windowWidth/2+25) {
    heartY += 8;
  } else if (heartX >= windowWidth/2+25 && heartX <= windowWidth/2+50) {
    heartY -= 8;
  } else if (heartX >= windowWidth/2+50 && heartX <= windowWidth/2+60) {
    heartY += 8;
  } else if (heartX >= windowWidth/2+60 && heartX <= windowWidth) {
    heartY = 150; //the end of the "mountains"
  }

  fill(255);
  ellipse(heartX, heartY, 5);
}

class Star {
  constructor (x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.bri = -1;
    this.dim = random(1, 3);
  }

  shimmer () { //this is what makes the stars appear and disappear at random places - brightness is slowly increased and decreased
    if (this.bri < 0) {
      this.x = random(width);
      this.y = random(height);
      this.size = random(3);
      this.bri = 0;
      this.dim = random(1, 3);
    }

    this.bri = this.bri + this.dim;

    if (this.bri > 255) { //make it decrease when it reaches max brightness
      this.bri = 255;
      this.dim = random(-1, -3);
    }
  }

  sky () {
    fill(this.bri);
    ellipse(this.x, this.y, this.size);
  }

}
