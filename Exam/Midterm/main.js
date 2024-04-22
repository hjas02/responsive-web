// Canvas Element 가져오기
var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

// 캔버스의 중앙 좌표 계산
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

// 별의 크기 설정
var starSize = 50;

// 별의 색상 설정
ctx.fillStyle = "yellow";

// 별 그리기 함수
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
    ctx.strokeStyle = 'black'; // 별 테두리 색상
    ctx.stroke();
    ctx.fillStyle = 'yellow'; // 별 채우기 색상
    ctx.fill();
}

// 별 생성 및 그리기
drawStar(centerX, centerY, 5, starSize, starSize / 2);
