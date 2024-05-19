var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var dx = 0; // x축 이동 속도
var dy = 0; // y축 이동 속도
var HP = 3;
const Enmeys = [];
var a = 1;

function drawStar(cx, cy, spikes, outerRadius, innerRadius, rotation) {
    var rot = (Math.PI / 2) * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;



    ctx.save();
    ctx.translate(centerX, centerY); // 중심을 (starX, starY)로 이동
    ctx.rotate(rotation); // 원하는 각도만큼 회전
    ctx.beginPath();
    ctx.moveTo(0, -outerRadius);
    for (i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outerRadius;
        y = Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
        
        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(0, -outerRadius);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black'; 
    ctx.stroke();
    ctx.fillStyle = 'yellow'; 
    ctx.fill();
    ctx.restore();
}
function moveStar() {
    // 별의 새로운 위치 계산
    var newCenterX = centerX + dx;
    var newCenterY = centerY + dy;

    // 새로운 위치가 캔버스 경계를 벗어나는지 확인
    if (newCenterX - 20 >= 0 && newCenterX + 20 <= canvas.width && newCenterY - 20 >= 0 && newCenterY + 20 <= canvas.height) {
        // 새로운 위치가 캔버스 경계 내에 있는 경우에만 위치를 업데이트
        centerX = newCenterX;
        centerY = newCenterY;
    }
}

document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 37: // 왼쪽 화살표
            dx = -1;
            break;
        case 38: // 위쪽 화살표
            dy = -1;
            break;
        case 39: // 오른쪽 화살표
            dx = 1;
            break;
        case 40: // 아래쪽 화살표
            dy = 1;
            break;
    }
});
document.addEventListener('keyup', function(event) {
    switch(event.keyCode) {
        case 37: // 왼쪽 화살표
        case 39: // 오른쪽 화살표
            dx = 0;
            break;
        case 38: // 위쪽 화살표
        case 40: // 아래쪽 화살표
            dy = 0;
            break;
    }
});

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
        this.speed = 1;
    }
    draw(){
        ctx.beginPath();
        for(var i = 0; i <= 360; i++){
            ctx.lineTo((Math.cos(Math.PI / 180 * i)) * this.radius + this.positionX, (Math.sin(Math.PI / 180 * i)) * this.radius + this.positionY);
        }
        ctx.closePath();
        ctx.fillStyle = 'black'; 
        ctx.fill();
    }
    update() {
        var x = centerX - this.positionX;
        var y = centerY - this.positionY;
        
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
    }
}
function checkCollision(x1, y1, r1, x2, y2, r2) {
    // 두 원의 중심 간 거리 계산
    var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  
    // 두 원의 반지름 길이 합 계산
    var radiusSum = r1 + r2;
  
    // 두 원이 충돌한 경우
    if (distance < radiusSum) {
       HP--;
       for (let i = 0; i < Enmeys.length; i++) {
        if (Enmeys[i].positionX === x2 && Enmeys[i].positionY === y2) {
            Enmeys.splice(i, 1); // 해당 적 제거
        }
    }
      return true;
    }
    // 두 원이 충돌하지 않은 경우
    return false;
}

function render() {
    a += 0.05;
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    for (let i = 0; i < Enmeys.length; i++) {
        Enmeys[i].update(); 
        Enmeys[i].draw(); 
        checkCollision(centerX, centerY, 20, Enmeys[i].positionX, Enmeys[i].positionY, Enmeys[i].radius);
    }

    drawStar(centerX, centerY, 5, 50, 20, a);

    ctx.beginPath();
    for(var i = 0; i <= 360; i++){
        ctx.lineTo((Math.cos(Math.PI / 180 * i)) * 20 + centerX, (Math.sin(Math.PI / 180 * i)) * 20 + centerY);
    }
    ctx.closePath();
    ctx.fillStyle = 'red'; 
    ctx.fill();
    drawHeart(heartPositionX, heartPositionY, 3);

    if (HP <= 0) {
        endGame();
    } else {
        requestAnimationFrame(render);
    }
    moveStar();
}

function resetGame() {
    HP = 3; 
    Enmeys.length = 0;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    heartPositionX = Math.random() * (canvas.width - 6) + 3;
    heartPositionY = Math.random() * (canvas.height - 6) + 3;
    createEnmey1(); 
    render();
}

function endGame() {
    document.getElementById("GameScreenCanvas").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "block";
}
function init(){
    setInterval(createEnmey1, 1000);
}


render();
