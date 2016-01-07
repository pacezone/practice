/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-07 09:13:43
 * @version $Id$
 */
var points = {},
	scale = 3,
	x = -1,
	y = -1;

function loadDemo () {
	document.getElementById('reset').onclick = Reset; //获取reset按钮，点击重新

	canvas = document.getElementById('milkyMap');
	ctx = canvas.getContext('2d');
	ctx.globalAlpha = 0.2;
	ctx.globalCompositeOperation = "lighter";    //定义画布的属性，透明度为0.2，且可以两个画布一起显示

	function sample() {
		if (x != -1) {
			addToPoint(x, y)
		}
		setTimeout(sample, 100);
	}                                          //每100毫秒调取一次函数，改变x，y坐标

	ctx.onmousemove = function (e) {
		x = e.clientX - e.target.offsetLeft;
		y = e.clientY - e.target.offsetTop;
		addToPoint(x, y); 
						//当鼠标滑过的时候，传入x，y的数据给addToPoint();    
	}
	sample();                             //再次调取sample()函数；            
}

function Reset() {
	points = {};
	ctx.clearRect(0,0,600,400);
	x = -1;
	y = -1;                                   //reset函数
}

function getColor(intensity) {
	var colors = ["#072933", "#2e4045", "#8c593b", "#b2814e", "#fac268", "#fad237"];
	return colors[Math.floor(intensity/2)];             //传入最大整数，选取颜色
}

function drawPoint (x,y,radius) {
	ctx.fillStyle = getColor(radius);
	radius = Math.sqrt(radius)*6;   //返回正平方根的数值乘以6

	ctx.beginPath();					//开始追踪画笔
	ctx.arc(x, y, radius, 0, Math.PI*2, true);  //画笔是圆形的，画圆

	ctx.closePath();                     //结束追踪画笔
	ctx.fill();							//填充
}


function addToPoint(x,y) {
	x = Math.floor(x/scale);           //对鼠标的偏移量再得出，x，y
	y = Math.floor(y/scale);

	if (!points[[x,y]]) {			
		points[[x,y]] = 1;
	} else if(points[[x,y]] == 10){
		return
	} else{
		points[[x,y]]++;
	}
	drawPoint(x*scale,y*scale,points[[x,y]]);   //对鼠标的圆的大小还是要控制。。。我已经疯了，hack都错了，而且完全不知道自己哪里错了，，，kao
}

window.addEventListener("load", loadDemo, true);