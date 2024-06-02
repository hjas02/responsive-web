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

function sign(p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

function pointInTriangle(pt, v1, v2, v3) {
    var d1, d2, d3;
    var has_neg, has_pos;

    d1 = sign(pt, v1, v2);
    d2 = sign(pt, v2, v3);
    d3 = sign(pt, v3, v1);

    has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

    return !(has_neg && has_pos);
}

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

    var pt = {x: clickX, y: clickY};
    var v1 = {x: centerX, y: centerY};
    var v2 = {x: x2, y: y2};
    var v3 = {x: x3, y: y3};

    if (pointInTriangle(pt, v1, v2, v3)) {
        color = "red";
    } else {
        color = "yellow";
    }
});

setInterval(drawTriangle, 10);
