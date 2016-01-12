/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-08 09:52:07
 * @version $Id$
 */

var img = new Image();
img.src = "1.png";
var canvas = document.getElementById('card');
var w = canvas.offsetWidth;
var h = canvas.offsetHeight;
img.onload = function () {
	var ctx;
	var touchstart = false;
	function cover(ctx) {
		ctx.fillStyle = "gray";
		ctx.fillRect(0, 0, w, h);
	}

	function touchStart (e) {
		e.preventDefault();
		touchstart = true;
	}
	function touchEnd (e) {
		e.preventDefault();
		touchstart = false;
		var transArray = [];
		var pixels = ctx.getImageData(0,h/2,w,3);
		var i;
		var f = i*4+3;
		f<400;
		for (f in pixels.data) {
			if (pixels.data[f] == 0) {
				transArray.push(pixels.data[f]);
			};		
		}		
		if (transArray.length/pixels.data.length>0.6) {
			alert("message");
			window.location.reload() 
		};
	}
	
	function touchMove (e) {
		e.preventDefault();
		if (touchstart) {
			 if(e.changedTouches){
                 e=e.changedTouches[e.changedTouches.length-1];
             }
			var x = e.clientX-e.target.offsetLeft;
			var y = e.clientY-e.target.offsetTop;
			
			ctx.beginPath();
			ctx.fillStyle = "red";
			ctx.arc(x, y, 20, 0, Math.PI * 2);
			ctx.fill();	
			
		}
	}

	canvas.width = w;
	canvas.height = h;
	ctx = canvas.getContext('2d');
	canvas.style.backgroundImage='url('+img.src+')';
	
	cover(ctx);
	ctx.restore();
	ctx.globalCompositeOperation = "destination-out";
	canvas.addEventListener('touchstart', touchStart);
	canvas.addEventListener('touchmove', touchMove);
	canvas.addEventListener('touchend', touchEnd);
	canvas.addEventListener('mousedown', touchStart);
	canvas.addEventListener('mousemove', touchMove);
	canvas.addEventListener('mouseup', touchEnd);
}
	


// window.onload = function() {
// 	test();
// }
