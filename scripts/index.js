const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];

canvas.width = window.innerWidth;
canvas.height = document.getElementById("hero-graphic").offsetHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = document.getElementById("hero-graphic").offsetHeight;
});

const mouse = {
    x: null,
    y: null,
};

window.addEventListener("mousemove", (e) => {
    // Adjust mouse position calculation to ensure it’s aligned correctly with the canvas.
    mouse.x = e.x;
    mouse.y = e.y;

    // Adjust the offset based on the font and canvas position
    // If the text height is causing an issue, this adjustment should correct the offset
    mouse.y -= document.querySelector('.hero-text').offsetHeight / 2;

    for (let i = 0; i < 5; i++) {
        particles.push(new Particle());
    }
});

class Particle {
    constructor() {
        // Use the adjusted mouse coordinates
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = "rgba(255, 82, 212, 0.8)";
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.95; // Shrink size over time
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size < 0.5) {
            particles.splice(i, 1); // Remove particles that are too small
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw light beam from the center of the mouse position
    const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");  // White glow effect
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");    // Fade to transparency

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Apply the gradient across the canvas

    handleParticles();
    requestAnimationFrame(animate);  // Repeat animation
}

animate();
