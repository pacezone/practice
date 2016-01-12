/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-11 15:45:59
 * @version $Id$
 */
function initCircle() {
	
	var canvas = document.getElementById('circleBg');
	
	w = canvas.width;
	canvas.height = w;
	var ctx = canvas.getContext('2d');
	createCircle (ctx,w);
	createText(ctx,w);
	var btn = document.getElementById('pointerBg');
	btn.style.left = (w/2-5) + "px";
	btn.style.top = (w/2) + "px";
	var canvas3 = document.getElementById('circlePointer');
	canvas3.height = w;
	var ctx3 = canvas3.getContext('2d');
	ctx3.translate(w/2,w/2);
	createPoninter(ctx3,w);
}

function createCircle (ctx,w) {
	var colors = ['#FFB5C5','#A2B5CD','#BCEE68','#7B68EE','#7AC5CD','#7A67EE','#00CDCD','#4876FF','#71C671'];
	
	var startAngle = 0,
		endAngle = 0,
		radius = null;
	for (var i = 0; i < 9; i++) {
		ctx.save();
		ctx.beginPath();
		startAngle = Math.PI*(2/9*i+1/18);
		endAngle = startAngle+Math.PI*(2/9);
		radius = w*5/16;
		ctx.arc(w/2, w/2, radius, startAngle, endAngle, false);
		ctx.lineWidth = w*3/8;
		ctx.strokeStyle = colors[i];
		ctx.stroke();
		ctx.restore();
	};
}
var info = ["一等奖","二等奖","三等奖","四等奖","五等奖","六等奖","七等奖","八等奖","谢谢参与"];

function createText(ctx,w) {
	ctx.font = "Bold 20px Arial"; // 设置字体
	ctx.textAlign='start';//文本水平对齐方式
	ctx.textBaseline='middle';//文本垂直方向，基线位置 
	var step = 2 * Math.PI / 9;
	for (var i = 0; i < 9; i++) {
		ctx.save();
	    ctx.beginPath();
	    ctx.translate(w/2, w/2);
	    ctx.rotate (i * step);
	    ctx.font = " 20px Microsoft YaHei";
	    ctx.fillStyle = '#fff';
	    ctx.fillText(info[i],-30, -w*2/5,60);
	    ctx.closePath();
	    ctx.restore();
	};
	
}

function createPoninter(ctx,w) {
	// ctx2.save();
	// ctx2.beginPath();
	// ctx2.arc(0, 0, w/6, 0, Math.PI*2, false);
	// ctx2.fillStyle = "#FF4350";
	// ctx2.fill();
	// ctx2.restore();
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(w/-15, 0);
	ctx.lineTo(0, w/-4);
	ctx.lineTo(w/15, 0);
	ctx.closePath();
	ctx.fillStyle = "#FF4350";
	ctx.fill();
	ctx.restore();

}

function rotateCircle() {
	// body...
}
window.onload = function () {
	initCircle();
}