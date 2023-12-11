// Define a Ball class
var Ball = /** @class */ (function () {
    function Ball(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityY = 0;
    }
    Ball.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
    return Ball;
}());
// Initialize canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var start = document.getElementById('start');
// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Ball array to store multiple balls
var balls = [];
// Handle click event to spawn a ball
var addBall = function (event) {
    var ball = new Ball(event.clientX, event.clientY, 20, getRandomColor());
    balls.push(ball);
};
canvas.addEventListener("click", addBall);
start.addEventListener("click", function (event) {
    start.style.display = 'none';
});
// Function to get a random color
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// Game loop
var lastTime = 0;
function tick(currentTime) {
    // if (balls.length > 15)
    //     canvas.removeEventListener("click", addBall, false);
    var deltaTime = (currentTime - lastTime) / 1000; // convert to seconds
    // Update each ball
    balls.forEach(function (ball) {
        // Apply gravity
        ball.velocityY += 9.8 * deltaTime;
        // Update position
        ball.y += ball.velocityY;
        // Bounce on the bottom of the screen
        if (ball.y + ball.radius > canvas.height) {
            ball.y = canvas.height - ball.radius;
            ball.velocityY *= -0.8; // Dampening effect
        }
        // Draw the ball
        ball.draw(ctx);
    });
    // Clear canvas
    setTimeout(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 0);
    // Request next frame
    lastTime = currentTime;
    requestAnimationFrame(tick);
}
// Start the game loop
requestAnimationFrame(tick);
