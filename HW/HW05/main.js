//Canvas Element 불러오기
var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

draw();
//setInterval(draw, 1000.0/60.0)

var rotAngle = 0;
var rotAngleE = 0;
var rotAngleE2 = 0;
var rotAngleM = 0;
//setInterval(draw, 1000.0/60.0);

function draw()
{
    //태양
    rotAngle += Math.PI / 100;
    ctx.save();
    ctx.fillStyle = "Yellow";
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.clearRect(-canvas.width/2.0, -canvas.height/2.0, canvas.width, canvas.height);
    ctx.rotate(rotAngle);
    ctx.fillRect(-50,-50,100,100);
    ctx.restore();

    //지구
    rotAngleE += Math.PI / 200;
    rotAngleE2+= Math.PI / 150;
    ctx.save();
    ctx.fillStyle = "blue";
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.rotate(rotAngleE);
    ctx.translate(250,0);
    ctx.rotate(rotAngleE2);
    ctx.fillRect(-40,-40,80,80);
    ctx.restore();

    //달
    var moonX = canvas.width / 2 + 250 * Math.cos(rotAngleE);
    var moonY = canvas.height / 2 + 250 * Math.sin(rotAngleE);
    rotAngleM += Math.PI / 80;
    ctx.save();
    ctx.fillStyle = "Gray";
    ctx.translate(moonX, moonY);
    ctx.rotate(rotAngleM);
    ctx.translate(100,0);
    ctx.rotate(rotAngle);
    ctx.fillRect(-20,-20,40,40);
    ctx.restore();

    requestAnimationFrame(draw);
}

// // 다음 프레임 요청(requestAnimationFrame 안쓸때)
// setInterval(draw, 1000.0/60.0);

// 다음 프레임 요청(setInterval 안쓸때)
//requestAnimationFrame(draw);
