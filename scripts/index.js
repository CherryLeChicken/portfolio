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
    mouse.x = e.x;
    mouse.y = e.y;

    mouse.y -= document.querySelector('.hero-text').offsetHeight / 2;

    for (let i = 0; i < 5; i++) {
        particles.push(new Particle());
    }
});

class Particle {
    constructor() {
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
        this.size *= 0.95; 
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
            particles.splice(i, 1); 
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");  
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");   

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height); 

    handleParticles();
    requestAnimationFrame(animate);
}

animate();
