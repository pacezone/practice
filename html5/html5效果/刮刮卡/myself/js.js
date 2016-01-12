/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-07 11:31:33
 * @version $Id$
 */




function drawPaint(){
	'use strict';
	var canvas = document.getElementById('Pic');
	var ctx;
	console.log(canvas);
	var mousedown = false;

	function layer (ctx) {
		ctx.fillStyle = "gray";
		ctx.fillRect(0, 0, 600, 300);
	}

	function touchStart(e) {
		e.preventDefault();
		mousedown = true;
	}

	function touchEnd (e) {
		e.preventDefault();
		mousedown = false;
	}
	
	function touchMove(e) {
		e.preventDefault();
		if (mousedown) {
			if (e.changedTouches) {
				e = e.changedTouches[e.changedTouches.length-1]
			};
			var x = e.pageX,
				y = e.pageY;
			console.log(x);
			ctx.beginPath();
			ctx.arc(x, y, 30, 0, Math.PI*2);
			ctx.fill();
			}
		}

	ctx = canvas.getContext('2d');
	
	layer(ctx);

	ctx.globalCompositeOperation = "destination-out";
	canvas.addEventListener('touchstart', touchStart);
	canvas.addEventListener('touchmove', touchMove);
	canvas.addEventListener('touchEnd', touchEnd);
	 canvas.addEventListener('mousedown', touchStart);
    canvas.addEventListener('mouseup', touchEnd);
    canvas.addEventListener('mousemove', touchMove);
}

window.addEventListener('load', drawPaint);