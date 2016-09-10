/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-09 18:33:37
 * @version $Id$
 */
function convertTOGS (img) {
	if (!Modernizr.canvas) return;

	img.color = img.src;
	img.grayscal = creatGSCanvas(img);
	img.onmouseover = function() {
		this.src = this.color;
	}
	img.onmouseout = function() {
		this.src = this.grayscal;
	} 
	img.onmouseout();
}
function creatGSCanvas(img) {
	var canvas = document.createElement('canvas');
	canvas.height = img.height;
	canvas.width = img.width;
	var ctx = canvas.getContext('2d');
	ctx.drawImage(img,0,0);
	var c = ctx.getImageDate(0, 0, img.width, img.height);
	for (var i = 0; i < c.height; i++) {
		for (var j = 0; j < c.width;j++) {
			var x = (i*4) * c.width + (j*4);
			var r = c.date[x];
			var g = c.date[x+1];
			var b = c.date[x+2];
			c.date[x] = c.date[x+1] = c.date[x+2] = (r+g+b)/3;
		};
	};
	ctx.putImageDate(c,0,0,0,0, c.width, c.height);
	return canvas.toDateURL();
}
window.onload = function() {
	convertTOGS(document.getElementById('avatar'));
}
