// Get a reference to the canvas element and its 2D drawing context
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

// Set initial canvas width and height to match the window size
var vx = window.innerWidth;
var ty = window.innerHeight;
canvas.width = vx;
canvas.height = ty;

// Variables to track mouse position
var mousex = 0;
var mousey = 0;

// Gravity constant
var grav = 0.99;

// Function to generate a random color
function randomColor() {
  return (
    "rgba(" +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.ceil(Math.random() * 10) / 10 +
    ")"
  );
}

// Event listener for mouse movement
addEventListener("mousemove", function(event) {
  mousex = event.clientX;
  mousey = event.clientY;
});

// Ball class to encapsulate ball properties and behavior
class Ball {
  constructor() {
    this.color = randomColor();
    this.radius = Math.random() * 20 + 14;
    this.startradius = this.radius;
    this.x = Math.random() * (vx - this.radius * 2) + this.radius;
    this.y = Math.random() * (ty - this.radius);
    this.dy = Math.random() * 2;
    this.dx = Math.round((Math.random() - 0.5) * 10);
    this.vel = Math.random() / 5;
  }

  update() {
    // Draw the ball on the canvas
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
  }
}

// Create an array to hold Ball objects
var balls = [];
for (var i = 0; i < 50; i++) {
  balls.push(new Ball());
}

// Animation function
function animate() {
  // Check if the window size has changed and update canvas size accordingly
  if (vx != window.innerWidth || ty != window.innerHeight) {
    vx = window.innerWidth;
    ty = window.innerHeight;
    canvas.width = vx;
    canvas.height = ty;
  }
  requestAnimationFrame(animate);
  c.clearRect(0, 0, vx, ty);

  for (var i = 0; i < balls.length; i++) {
    // Update and draw each ball
    balls[i].update();
    balls[i].y += balls[i].dy;
    balls[i].x += balls[i].dx;

    // Apply gravity and bounce when a ball hits the canvas bottom
    if (balls[i].y + balls[i].radius >= ty) {
      balls[i].dy = -balls[i].dy * grav;
    } else {
      balls[i].dy += balls[i].vel;
    }

    // Make balls bounce off the canvas edges
    if (balls[i].x + balls[i].radius > vx || balls[i].x - balls[i].radius < 0) {
      balls[i].dx = -balls[i].dx;
    }

    // Enlarge a ball when the mouse is near it, within a certain radius
    if (
      mousex > balls[i].x - 20 &&
      mousex < balls[i].x + 20 &&
      mousey > balls[i].y - 50 &&
      mousey < balls[i].y + 50 &&
      balls[i].radius < 70
    ) {
      balls[i].radius += 5;
    } else {
      // Shrink the ball back to its original size
      if (balls[i].radius > balls[i].startradius) {
        balls[i].radius -= 5;
      }
    }
  }
}

// Start the animation loop
animate();

// Add and remove balls at a set interval
setInterval(function() {
  balls.push(new Ball());
  balls.splice(0, 1);
}, 400);
