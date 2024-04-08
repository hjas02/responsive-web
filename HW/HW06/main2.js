var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

var colors = ["#C7C5FF", "black", "blue", "magenta", "pink", "cyan", "orange"]; 
var hearts = [];
var isMouse = false; //처음 마우스 확인

class HeartObject {
    constructor(colorIndex, radius, positionX, positionY, speedX, speedY, rotate1, rotateSpeed) {
        this.color = colors[colorIndex];
        this.radius = radius;
        this.positionX = positionX;
        this.positionY = positionY;
        this.speedX = speedX;
        this.speedY = speedY;
        this.rotate1 = rotate1;
        this.rotateSpeed = rotateSpeed; 
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.positionX, this.positionY);
        ctx.rotate(this.rotate1); 
        ctx.beginPath();
        for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -13 * Math.cos(t) + 5 * Math.cos(2 * t) + 2 * Math.cos(3 * t) + Math.cos(4 * t);
            if (t === 0) {
                ctx.moveTo(x * this.radius, y * this.radius);
            } else {
                ctx.lineTo(x * this.radius, y * this.radius);
            }
        }
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    
    update() {
        this.positionX += this.speedX;
        this.positionY += this.speedY;
        this.rotate1 += this.rotateSpeed; 
    }
}

var mouseX = canvas.width / 2;
var mouseY = canvas.height / 2;

canvas.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    isMouse = true; 
});

function createHeart() {
    if (!isMouse) return; // 마우스가 움직이기 전에는 하트 생성하지 않음

    if (hearts.length >= 100) {
        hearts.splice(0, 1); // 첫 번째로 생성된 하트 삭제
    }
    const colorIndex = Math.floor(Math.random() * colors.length);//색
    const radius = Math.random() * 2 + 3; //크기
    const positionX = mouseX + (Math.random() - 0.5) * 50;
    const positionY = mouseY + (Math.random() - 0.5) * 50; //위치
    const speedX = (Math.random() - 0.5) * 5; // 속도
    const speedY = (Math.random() - 0.5) * 5; 
    const rotate1 = Math.random() * Math.PI * 2; // 돌아간 위치
    const rotateSpeed = (Math.random() - 0.5) * 0.2; // 회전 
    const heart = new HeartObject(colorIndex, radius, positionX, positionY, speedX, speedY, rotate1, rotateSpeed);
    hearts.push(heart);
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 화면을 clear
    
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].update(); // 하트 위치 
        hearts[i].draw(); // 하트 그리기
    }
    
    requestAnimationFrame(render); 
}

setInterval(createHeart, 200); //생성 0.2초
// 첫 프레임 시작
requestAnimationFrame(render);
