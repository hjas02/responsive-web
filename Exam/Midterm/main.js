// Canvas Element 가져오기
var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

// 캔버스의 중앙 좌표 계산
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

// 별의 크기 설정
var starSize = 50;

// 별의 현재 위치
var starX = centerX;
var starY = centerY;

// 별의 이동 속도
var starSpeed = 1;

function drawHeart(ctx, radius, color, rotate) {
    ctx.save();

    // 캔버스의 너비와 높이 가져오기
    var canvasWidth = ctx.canvas.width;
    var canvasHeight = ctx.canvas.height;

    // 랜덤한 x와 y 좌표 생성
    var positionX = Math.random() * (canvasWidth - 2 * radius) + radius; // 반지름을 고려하여 설정
    var positionY = Math.random() * (canvasHeight - 2 * radius) + radius; // 반지름을 고려하여 설정

    ctx.translate(positionX, positionY);
    ctx.rotate(rotate);

    ctx.beginPath();
    for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -13 * Math.cos(t) + 5 * Math.cos(2 * t) + 2 * Math.cos(3 * t) + Math.cos(4 * t);
        if (t === 0) {
            ctx.moveTo(x * radius, y * radius);
        } else {
            ctx.lineTo(x * radius, y * radius);
        }
    }
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    ctx.restore();
}
// 별 그리기 함수
function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    // 이전 위치에서 현재 위치로 이동
    starX += (centerX - starX) * starSpeed;
    starY += (centerY - starY) * starSpeed;

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
    ctx.strokeStyle = 'black'; // 별 테두리 색상
    ctx.stroke();
    ctx.fillStyle = 'yellow'; // 별 채우기 색상
    ctx.fill();
}
// 적 생성과 이동
function generateEnemy() {
    // 적의 개수 랜덤 설정 (5개에서 15개)
    var numEnemies = Math.floor(Math.random() * 11) + 5;

    // 적 생성
    for (var i = 0; i < numEnemies; i++) {
        createEnemy();
    }
}
var enemies = [];
// 적 생성 함수
function createEnemy() {
    // 적의 초기 위치 설정 (캔버스 바깥에서)
    var x = Math.random() < 0.5 ? -20 : canvas.width + 20; // 적의 초기 x 좌표를 캔버스 왼쪽 또는 오른쪽에 설정
    var y = Math.random() * canvas.height; // 적의 초기 y 좌표를 랜덤하게 설정
    var width = 20;
    var height = 20;
    var color = "blue";
    var speed = 2;
    var enemy = new Enemy(x, y, width, height, color, speed);
    enemies.push(enemy);
}

// 적이 별 쪽으로 이동하도록 설정
function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];
        // 플레이어를 추적하는 간단한 로직과 유사한 방식으로 목적지 추적
        if (starX < enemy.x) {
            enemy.x -= enemy.speed;
        } else {
            enemy.x += enemy.speed;
        }
        if (starY < enemy.y) {
            enemy.y -= enemy.speed;
        } else {
            enemy.y += enemy.speed;
        }
    }
}

// 초당 적 생성
function startEnemyGeneration() {
    intervalId = setInterval(createEnemy, 1000);
}

// 적 생성 시작
startEnemyGeneration();

// 별과 적 그리기
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStar(centerX, centerY, 5, starSize, starSize / 2);
    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
        ctx.fillStyle = enemy.color;
        ctx.fill();
        ctx.closePath();
    }
}

// 게임 루프
function gameLoop() {
    moveEnemies();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();