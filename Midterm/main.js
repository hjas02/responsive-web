var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var dx = 0; // x축 이동 속도
var dy = 0; // y축 이동 속도
var HP = 3;
const Enmeys = [];
var a = 1;
var t=false;
var time=0;
var sX=1;
var sY=1;
var count=0;
var x;
lists = {
    "0": [true, true, false, true, true, true, true],
    "1": [false, true, false, false, false, true, false],
    "2": [true, true, true, false, true, false, true],
    "3": [true, true, true, false, false, true, true],
    "4": [false, true, true, true, false, true, false],
    "5": [true, false, true, true, false, true, true],
    "6": [false, false, true, true, true, true, true],
    "7": [true, true, false, true, false, true, false],
    "8": [true, true, true, true, true, true, true],
    "9": [true, true, true, true, false, true, false],
}
function drawNum(num)
{
    var on = "Black";
    var off = "#dee2e6";
    var digitList = lists[num.toString()];

    //상단
    ctx.beginPath()
    ctx.strokeStyle = digitList[0] ? on : off;
    ctx.moveTo(x +10 , 10)
    ctx.lineTo(x + 60, 10)
    ctx.stroke();
    ctx.closePath();

    //상단 우측
    ctx.beginPath()
    ctx.strokeStyle = digitList[1] ? on : off;
    ctx.moveTo(x +60 , 15)
    ctx.lineTo(x + 60, 60)
    ctx.stroke();
    ctx.closePath();

    //중앙
    ctx.beginPath()
    ctx.strokeStyle = digitList[2] ? on : off;
    ctx.moveTo(x +60 , 65)
    ctx.lineTo(x +10 , 65)
    ctx.stroke();
    ctx.closePath();

    //상단 좌측
    ctx.beginPath()
    ctx.strokeStyle = digitList[3] ? on : off;
    ctx.moveTo(x +10 , 15)
    ctx.lineTo(x +10, 60)
    ctx.stroke();
    ctx.closePath();

    //하단 좌측
    ctx.beginPath()
    ctx.strokeStyle = digitList[4] ? on : off;
    ctx.moveTo(x +10 , 70)
    ctx.lineTo(x +10, 120)
    ctx.stroke();
    ctx.closePath();

    //하단 우측
    ctx.beginPath()
    ctx.strokeStyle = digitList[5] ? on : off;
    ctx.moveTo(x +60 , 70)
    ctx.lineTo(x +60, 120)
    ctx.stroke();
    ctx.closePath();

    //하단
    ctx.beginPath()
    ctx.strokeStyle = digitList[6] ? on : off;
    ctx.moveTo(x +10 , 125)
    ctx.lineTo(x +60, 125)
    ctx.stroke();
    ctx.closePath();

    x -= 70;
}
function drawStar(cx, cy, spikes, outerRadius, innerRadius, rotation) {
    var rot = (Math.PI / 2) * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;
    ctx.save();
    ctx.translate(centerX, centerY); // 중심을  이동
    ctx.rotate(rotation); // 원하는 각도만큼 회전
    ctx.scale(sX,sY);
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
    centerX += dx;
    centerY += dy;
}

canvas.addEventListener('click', (event) => {
    t=true;
});
document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 37: // 왼쪽 화살표
        case 65: // 'A' 키
            dx = -5;
            break;
        case 38: // 위쪽 화살표
        case 87: // 'W' 키
            dy = -5;
            break;
        case 39: // 오른쪽 화살표
        case 68: // 'D' 키
            dx = 5;
            break;
        case 40: // 아래쪽 화살표
        case 83: // 'S' 키
            dy = 5;
            break;
    }
});

document.addEventListener('keyup', function(event) {
    switch(event.keyCode) {
        case 37: 
        case 65: 
        case 39: 
        case 68: 
            dx = 0;
            break;
        case 38: 
        case 87: 
        case 40: 
        case 83: 
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
        this.speed = 0.5;
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
        // 정지할 임계 거리 정의 (원하는 값으로 조정 가능)
        const thresholdDistance = 200;
    
        var x = centerX - this.positionX;
        var y = centerY - this.positionY;
    
        const distance = Math.sqrt(x ** 2 + y ** 2);
    
        if (distance > thresholdDistance) {
            // 목표까지의 거리가 임계 거리보다 클 때만 방향을 계산하고 업데이트
            x /= distance; // 정규화
            y /= distance; // 정규화
    
            // 방향 저장 (한번만 계산하여 저장)
            this.directionX = x;
            this.directionY = y;
        }
    
        // 벡터를 이용하여 적의 이동 (계산된 방향으로 계속 이동)
        this.positionX += this.directionX * this.speed;
        this.positionY += this.directionY * this.speed;
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
       if(!t){
        HP--;
        }
        count++

        console.log(count);
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
function heartCheckCollision(x1, y1, r1, x2, y2, r2) {
    // 두 원의 중심 간 거리 계산
    var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  
    // 두 원의 반지름 길이 합 계산
    var radiusSum = r1 + r2;
  
    // 두 원이 충돌한 경우
    if (distance < radiusSum) {
        heartPositionX = Math.random() * (canvas.width - 6) + 3;
        heartPositionY = Math.random() * (canvas.height - 6) + 3;
        HP++;
        return true;
    }
      return false;
}

function render() {
    a += 0.05;
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    // Adjust canvas position based on star movement
    var canvasX = canvas.width / 2 - centerX;
    var canvasY = canvas.height / 2 - centerY;
    ctx.translate(canvasX, canvasY);

    for (let i = 0; i < Enmeys.length; i++) {
        Enmeys[i].update(); 
        Enmeys[i].draw(); 
        checkCollision(centerX, centerY, 20 * sX, Enmeys[i].positionX, Enmeys[i].positionY, Enmeys[i].radius);
    }
    if(t){
        sX += 0.05;
        sY += 0.05;
        time += 0.1;
        if(time > 10){
            sX = 1;
            sY = 1;
            t = false;
            time = 0;
        }
    }
    heartCheckCollision(centerX, centerY, 20, heartPositionX- centerX, heartPositionY- centerY, 20);
    drawStar(0, 0, 5, 50, 20, a); // Draw star at (0, 0)

    // Draw player position relative to the star
    ctx.beginPath();
    for(var i = 0; i <= 360; i++){
        ctx.lineTo((Math.cos(Math.PI / 180 * i)) * 20 * sX + centerX, (Math.sin(Math.PI / 180 * i)) * 20 * sY + centerY);
    }
    ctx.closePath();
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.stroke();

    drawHeart(heartPositionX - centerX, heartPositionY - centerY, 3); // Draw heart relative to the star

    ctx.beginPath();
    for(var i = 0; i <= 360; i++){
        ctx.lineTo((Math.cos(Math.PI / 180 * i)) * 20 + heartPositionX- centerX, (Math.sin(Math.PI / 180 * i)) * 20 + heartPositionY- centerY);
    }
    ctx.closePath();
    ctx.fillStyle = 'red'; 
    ctx.fill();

    checkCollision(centerX, centerY, 20, heartPositionX, heartPositionY, 20);
    if (HP <= 0) {
        endGame();
    } else {
        requestAnimationFrame(render);
    }
    moveStar();

    // Reset translation to the original position
    ctx.translate(-canvasX, -canvasY);

    x = 400;

    var studentIDs = count.toString();
    for (var i = studentIDs.length - 1; i >= 0; i--) {
        drawNum(studentIDs[i]);
    }
}

   

function resetGame() {
    HP = 3; 
    Enmeys.length = 0;
    count =0;
    dx=0;
    dy=0;
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
