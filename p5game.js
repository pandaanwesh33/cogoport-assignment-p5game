let paddle_x, paddle_y, paddle_width, paddle_height, paddle_dx;
let ball_x, ball_y, ball_diameter, ball_dx, ball_dy;
let brick_width, brick_height;
//since total 20 bricks
const num_rows = 4;
const num_bricks_per_row = 5;
let bricks = [];
let score = 0;

function setup() {
  createCanvas(400, 400);
  background("black");
  paddle_width = 100;
  paddle_x = (width / 2) - (paddle_width / 2);
  paddle_y = height - 25;
  paddle_height = 15;
  
  ball_diameter = 20;
  ball_dx = 1;
  ball_dy = 2;
  paddle_dx = 3;
  ball_x = (width / 2) - (ball_diameter / 2);
  ball_y = (height / 2) - (ball_diameter / 2);
  
  brick_width = 75;
  brick_height = 25;
  
  // Creating bricks
  for (let row = 0; row < num_rows; row++) {
    for (let col = 0; col < num_bricks_per_row; col++) {
      bricks.push({
        x: col * (brick_width + 5) + 20, // added this 5 for spacing between bricks
        y: row * (brick_height + 5) + 20, // added 5 for spacing between rows
        width: brick_width,
        height: brick_height,
        isBroken: false
      });
    }
  }
}

function draw() {
  background("black");
  
  if (ball_x + (ball_diameter / 2) > width || ball_x - (ball_diameter / 2) < 0) {
    ball_dx = -ball_dx;
  }
  
  if (ball_y - (ball_diameter / 2) < 0) {
    ball_dy = -ball_dy;
  }
  
  if (ball_y + (ball_diameter / 2) > height) {
    ball_dy = 0;
    ball_dx = 0;
  }
  
  ball_x = ball_x + ball_dx;
  ball_y = ball_y + ball_dy;
  
  if (keyIsDown(LEFT_ARROW)) {
    if (paddle_x > 0) {
      paddle_x = paddle_x - paddle_dx;
    }
  }
  
  if (keyIsDown(RIGHT_ARROW)) {
    if (paddle_x + paddle_width < width) {
      paddle_x = paddle_x + paddle_dx;
    }
  }
 
  if (ball_y - (ball_diameter / 2) < paddle_y && ball_y + (ball_diameter / 2) > paddle_y && ball_x >= paddle_x && ball_x <= paddle_x + paddle_width) {
    ball_dy = -ball_dy;
  }
  
  // Check collision with bricks
  for (let i = bricks.length - 1; i >= 0; i--) {
    let brick = bricks[i];
    if (!brick.isBroken && ball_x >= brick.x && ball_x <= brick.x + brick.width && ball_y - (ball_diameter / 2) <= brick.y + brick.height) {
      brick.isBroken = true;
      //change direction
      ball_dy = -ball_dy;
      score++;
    }
  }
  
  circle(ball_x, ball_y, ball_diameter);
  rect(paddle_x, paddle_y, paddle_width, paddle_height);
  
  // Draw bricks
  for (let i = 0; i < bricks.length; i++) {
    if (!bricks[i].isBroken) {
      rect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height);
    }
  }
  
  // Score
  textSize(18);
  fill('white');
  text('Score: ' + score, 175, 15);
}
