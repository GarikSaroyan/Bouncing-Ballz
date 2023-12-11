// Define a Ball class
class Ball {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocityY: number;

    constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityY = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Initialize canvas and context
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const start = document.getElementById('start');


// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ball array to store multiple balls
const balls: Ball[] = [];

// Handle click event to spawn a ball
let addBall = (event: { clientX: number; clientY: number; }) => {
    const ball = new Ball(event.clientX, event.clientY, 20, getRandomColor());

    balls.push(ball);
};
canvas.addEventListener("click", addBall);
start.addEventListener("click", (event) => {
    start.style.display = 'none'
})

// Function to get a random color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Game loop
let lastTime = 0;

function tick(currentTime: number) {
    // if (balls.length > 15)
    //     canvas.removeEventListener("click", addBall, false);


    const deltaTime = (currentTime - lastTime) / 1000; // convert to seconds
    // Update each ball
    balls.forEach((ball) => {
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
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 0)

    // Request next frame
    lastTime = currentTime;
    requestAnimationFrame(tick);
}

// Start the game loop
requestAnimationFrame(tick);
