var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

var centerX = canvas.width / 2;
var centerY = canvas.height / 2-100;
var a = 200;
var x2 = centerX - a;
var y2 = centerY + a;
var x3 = centerX + a;
var y3 = centerY + a;
var color = "yellow";
var rotationAngle = 0; 

function drawTriangle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var triangleCenterX = (centerX + x2 + x3) / 3;
    var triangleCenterY = (centerY + y2 + y3) / 3;

    ctx.save(); 
    ctx.translate(triangleCenterX, triangleCenterY);
    ctx.rotate(rotationAngle); 
    ctx.translate(-triangleCenterX, -triangleCenterY); 

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.restore(); 
    rotationAngle +=0.05; 
}

canvas.addEventListener('click', function (event) {
    var clickX = event.offsetX;
    var clickY = event.offsetY;

    var b = x2 - x3 
    var height =y2 - centerY; 
    
    var A = 0.5 * b * height; // 삼각형의 넓이
    var s = (centerY * x3 - centerX * y3 + (y3 - centerY) * clickX + (centerX - x3) * clickY) * -1;
    var t = (centerX * y2 - centerY * x2 + (centerY - y2) * clickX + (x2 - centerX) * clickY) * -1;
    if (s > 0 && t > 0 && (s + t) < 2 * A * -1) {
        color = "red";
    } else {
        color = "yellow";
    }
});

setInterval(drawTriangle, 10);
