//Canvas Element 불러오기
var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

var studentID = 202127035;
var x=0;
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
    var on = "black";
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

    x += 70;
}

var studentIDs = studentID.toString();
for (var i = 0; i < studentIDs.length; i++) {
    drawNum(studentIDs[i]);
}

