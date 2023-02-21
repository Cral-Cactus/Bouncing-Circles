const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// Set the canvas dimensions to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define a variable to store the number of circles to generate
const numCircles = Math.floor(Math.random() * 51) + 50;

// Set the maximum radius of the circles
const maxRadius = Math.min(canvas.width, canvas.height) * 0.05;

// Define a Circle class to encapsulate each circle's properties
class Circle {
  constructor(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  // Draw the circle on the canvas
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }

  // Update the circle's position and velocity
  update() {
    // Reverse the direction of the velocity if the circle hits the border
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.dx = -this.dx;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.dy = -this.dy;
    }

    // Update the circle's position based on its velocity
    this.x += this.dx;
    this.y += this.dy;

    // Check if the circle is touching the edge of the canvas
    if (this.x < this.radius || this.x > canvas.width - this.radius || this.y < this.radius || this.y > canvas.height - this.radius) {
      // Change the circle color to a random color
      this.color = getRandomColor();
    }
  }
}

// Create an array to hold the circles
const circles = [];

// Populate the array with randomly generated circles
for (let i = 0; i < numCircles; i++) {
  const x = Math.random() * (canvas.width - 2 * maxRadius) + maxRadius;
  const y = Math.random() * (canvas.height - 2 * maxRadius) + maxRadius;
  const radius = Math.random() * maxRadius;
  const dx = (Math.random() - 0.5) * 5;
  const dy = (Math.random() - 0.5) * 5;
  const color = getRandomColor();
  circles.push(new Circle(x, y, radius, dx, dy, color));
}

// Define a function to animate the circles
function animate() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Draw and update each circle
  circles.forEach((circle) => {
    circle.draw();
    circle.update();
  });

  // Call the animate function recursively to create an animation loop
  requestAnimationFrame(animate);
}

// Define a function to get a random color
function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

// Call the animate function to start the animation loop
animate();