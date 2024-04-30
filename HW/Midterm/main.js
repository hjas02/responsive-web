var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
const Enmeys = [];

function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    var rot = (Math.PI / 2) * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black'; 
    ctx.stroke();
    ctx.fillStyle = 'yellow'; 
    ctx.fill();
}

var heartPositionX = Math.random() * (canvas.width - 6) + 3; 
var heartPositionY = Math.random() * (canvas.height - 6) + 3;
function drawHeart(positionX, positionY, radius) {
    ctx.beginPath();
    for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -13 * Math.cos(t) + 5 * Math.cos(2 * t) + 2 * Math.cos(3 * t) + Math.cos(4 * t);
        ctx.lineTo(x * radius + positionX, y * radius + positionY);
    }
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

class Enmey {
    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.radius = 10; 
        this.speed= 1;
    }
    draw(){
        ctx.beginPath();
        for(var i=0; i<=360; i++){
            ctx.lineTo((Math.cos(Math.PI/180*i)) * this.radius + this.positionX, (Math.sin(Math.PI/180*i)) * this.radius + this.positionY);
        }
        ctx.closePath();
        ctx.fillStyle = 'black'; 
        ctx.fill();
    }
    update() {
        var x= centerX - this.positionX;
        var y= centerY - this.positionY;
        
        const distance = Math.sqrt(x ** 2 + y ** 2);
        x /= distance; // 정규화
        y /= distance; // 정규화

        // 벡터를 이용하여 적의 이동
        this.positionX += x * this.speed;
        this.positionY += y * this.speed;
    }
}
var numberOfEnemies;
function createEnmey(){
    const positions = [
        { x: canvas.width + 20, y: Math.random() * canvas.height }, // 우측
        { x: -20, y: Math.random() * canvas.height }, // 좌측
        { x: Math.random() * canvas.width, y: canvas.height + 20 }, // 하단
        { x: Math.random() * canvas.width, y: -20 } // 상단
    ];
    for (let i = 0; i < positions.length; i++) {
        const enmey = new Enmey(positions[i].x, positions[i].y);
        Enmeys.push(enmey);
    }
}
function createEnmey1(){
    numberOfEnemies = Math.floor(Math.random() * 11) + 5;
    for (let i = 0; i < numberOfEnemies; i++) {
        createEnmey();
        console.log(numberOfEnemies);
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    for (let i = 0; i < Enmeys.length; i++) {
        Enmeys[i].update(); 
        Enmeys[i].draw(); 
    }
    drawStar(centerX, centerY, 5, 50, 20);
    drawHeart(heartPositionX, heartPositionY, 3);
    requestAnimationFrame(render);
}
setInterval(createEnmey1, 1000);

render();
