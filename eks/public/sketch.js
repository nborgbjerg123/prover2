var socket;
var square = true;

function setup() {
  createCanvas(500, 500);
  background(250);

  socket = io.connect('http://localhost:3000')
  socket.on('mouse', newSquare);
}


 function newSquare(data) {
     if (data.square = true) {
      noStroke();
     fill(255, 250, 10);
     rect(140, 140, 50, 50);
     }

    if (data.x > 100 && data.x < 200) {
      noStroke();
     fill(250);
     rect(140, 140, 50, 50);
     }
 }

function draw() {
  noStroke();
  fill(0, 255, 10);
  rect(50, 50, 40, 40);
}

function mousePressed() {
  if (mouseX > 50 && mouseX < 100) {
    square = true;
    noStroke();
    fill(255, 0, 10);
    rect(140, 140, 50, 50);
  }

  if (mouseX > 100 && mouseX < 200) {
    if (square = true) {
    square = false;
    noStroke();
    fill(250);
    rect(140, 140, 50, 50);
  }
  }
    console.log(square);
    console.log('Sending: ' + mouseX + ',' + mouseY);

     var data = {
       x: mouseX,
       y: mouseY
    }
    socket.emit('mouse', data);
}
