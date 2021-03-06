var apple = {//apple object
  x: 0,
  y: 0
};
var snake = {//snake object
  x: [100],
  y: [100],
  xV: [10],
  yV: [0]
};
var lastKey = 0;
var keys = [];
var gameOver = false;
var gameMode = "normal";
var highScore = [0,0,0,0,0];
//var hack = 0;

function setup() {
  createCanvas(500, 500);
  frameRate(15);
  apple.x = floor(random(0,490)/10)*10;
  apple.y = floor(random(0,490)/10)*10;
}

function draw() {
  if(gameMode === "easy" && frameRate() !== 10){
    frameRate(10);
  }
  if(gameMode === "normal" && frameRate() !== 15){
    frameRate(15);
  }
  if(gameMode === "hard" && frameRate() !== 20){
    frameRate(20);
  }
  if(gameMode === "INSANE" && frameRate() !== 60){
    frameRate(60);
  }
  if(gameMode === "demented"){
    frameRate(floor(random(10,150)));
  }
  background(0, 0, 0);
	stroke(50);
	noFill();
  rect(0, 0, 499, 499);
  if(gameOver === false){
    /*hack ++;
    if(hack > 1000){
      snake.x.push(snake.x[snake.x.length-1]);
      snake.y.push(snake.y[snake.y.length-1]);
      snake.xV.push(0);
      snake.yV.push(0);
    }*/
		if(keys[39] && lastKey !== 37){
      lastKey = 39;
    }else{
      if(keys[38] && lastKey !== 40){
        lastKey = 38;
      }else{
        if(keys[37] && lastKey !== 39){
          lastKey = 37;
        }else{
          if(keys[40] && lastKey !== 38){
            lastKey = 40;
          }
        }
      }
    }
    if(keys[82]){
      gameOver = true;
    }
    if(lastKey === 39){//right
      snake.xV[0] = 10;
      snake.yV[0] = 0;
    }
    if(lastKey === 37){//left
      snake.xV[0] = -10;
      snake.yV[0] = 0;
    }
    if(lastKey === 38){//up
      snake.xV[0] = 0;
      snake.yV[0] = -10;
    }
    if(lastKey === 40){//down
      snake.xV[0] = 0;
      snake.yV[0] = 10;
    }
    noStroke();
    fill(255,0,0);
    rect(apple.x,apple.y,10,10);//apple
    fill(0,255,0);
    for(var i = snake.x.length-1;i >= 0;i --){
      rect(snake.x[i] + 4*(i/(snake.x.length)),snake.y[i] + 4*(i/(snake.x.length)),10 - 8*(i/(snake.x.length)),10 - 8*(i/(snake.x.length)));
      snake.x[i] += snake.xV[i];
      snake.y[i] += snake.yV[i];
      if(i > 0){
        snake.xV[i] = snake.xV[i-1];
        snake.yV[i] = snake.yV[i-1];
      }else{
        for(var u = 0;u < snake.x.length;u ++){
          if(snake.x[i] === snake.x[u] && snake.y[i] === snake.y[u] && i !== u){
            gameOver = true;//die
          }
        }
        if(snake.x[i] === apple.x && snake.y[i] === apple.y){
          for(var t = 0;t < 3;t ++){
            snake.x.push(snake.x[snake.x.length-1]);
            snake.y.push(snake.y[snake.y.length-1]);
            snake.xV.push(0);
            snake.yV.push(0);
          }
          apple.x = floor(random(0,490)/10)*10;
          apple.y = floor(random(0,490)/10)*10;
        }
      }
      if(snake.x[i] > 490){
        snake.x[i] = 0;
      }
      if(snake.x[i] < 0){
        snake.x[i] = floor(490/10)*10;
      }
      if(snake.y[i] > 490){
        snake.y[i] = 0;
      }
      if(snake.y[i] < 0){
        snake.y[i] = floor(490/10)*10;
      }
    }
    fill(255,255,255);
    if(gameMode === "easy"){
      text("High score: "+highScore[0],250,100);
      if(highScore[0] < snake.x.length){
        highScore[0] = snake.x.length;
      }
    }
    if(gameMode === "normal"){
      text("High score: "+highScore[1],250,100);
      if(highScore[1] < snake.x.length){
        highScore[1] = snake.x.length;
      }
    }
    if(gameMode === "hard"){
      text("High score: "+highScore[2],250,100);
      if(highScore[2] < snake.x.length){
        highScore[2] = snake.x.length;
      }
    }
    if(gameMode === "INSANE"){
      fill(255,10,10);
      text("High score: "+highScore[3],250,100);
      if(highScore[3] < snake.x.length){
        highScore[3] = snake.x.length;
      }
    }
    if(gameMode === "demented"){
      fill(255,10,10);
      text("High score: "+highScore[4],250,100);
      fill(255,50,140);
      text("High score: "+highScore[4],253,103);
      if(highScore[4] < snake.x.length){
        highScore[4] = snake.x.length;
      }
    }
    textSize(20);
    fill(255,255,255);
    textAlign(CENTER);
    text("Score: "+snake.x.length,250,130);
  }
  if(gameOver === true){
    textAlign(CENTER);
    fill(255,255,255);
    textSize(20);
    text("Game Mode: "+gameMode+"\n1-5 to change modes",250,50);
    if(keys[49]){
      gameMode = "easy";
    }
    if(keys[50]){
      gameMode = "normal";
    }
    if(keys[51]){
      gameMode = "hard";
    }
    if(keys[52]){
      gameMode = "INSANE";
    }
    if(keys[53]){
      gameMode = "demented";
    }
    if(gameMode === "easy"){
      text("High score: "+highScore[0],250,100);
    }
    if(gameMode === "normal"){
      text("High score: "+highScore[1],250,100);
    }
    if(gameMode === "hard"){
      text("High score: "+highScore[2],250,100);
    }
    if(gameMode === "INSANE"){
      fill(255,10,10);
      text("High score: "+highScore[3],250,100);
    }
    if(gameMode === "demented"){
      fill(255,10,10);
      text("High score: "+highScore[4],250,100);
      fill(255,50,140);
      text("High score: "+highScore[4],253,103);
    }
    fill(255,255,255);
    text("Score: "+snake.x.length,250,130);
    textSize(50);
    text("Game\nOver",250,250-80);
    textSize(30);
    text("Press space\nto try again",250,250+100);
    if(keys[32]){
      gameOver = false;
      lastKey = 0;
      apple = {//apple object
        x: floor(random(0,490)/10)*10,
        y: floor(random(0,490)/10)*10
      };
      snake = {//snake object
        x: [100],
        y: [100],
        xV: [10],
        yV: [0]
      };
    }
  }
}

function keyPressed(){
  keys[keyCode] = true;
}

function keyReleased(){
  keys[keyCode] = false;
  /*if(hack < 1000){
    hack = 0;
  }*/
}
