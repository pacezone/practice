/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-13 18:26:49
 * @version $Id$
 */

function moveElement (fanil_x, fanil_y, interval) {
	var slidePic = document.getElementById('slidePic');
	if (slidePic.movement) {
		clearTimeout(slidePic.movement);
	}
	if (!slidePic.style.left) {
		slidePic.style.left = '0px';
	};
	if (!slidePic.style.top) {
		slidePic.style.top = '0px';
	};
	var xpos = parseInt(slidePic.style.left);
	var ypos = parseInt(slidePic.style.top);
	if (xpos == fanil_x && ypos == fanil_y) {
		return true;
	}
	if (fanil_x > xpos) {
		var dist = Math.ceil((fanil_x-xpos)/10);
		xpos = xpos + dist ;
	}
	if (fanil_x < xpos) {
		var dist = Math.ceil((xpos-fanil_x)/10);
		xpos = xpos - dist;
	}
	if (fanil_y > ypos) {
		var dist = Math.ceil((fanil_y-ypos)/10);
		ypos = ypos + dist ;
	}
	if (fanil_y < ypos) {
		var dist = Math.ceil((ypos-fanil_y)/10);
		ypos = ypos - dist;
	}
	slidePic.style.left = xpos + "px";
	slidePic.style.top = ypos + "px";
	var repeat = "moveElement('+fanil_x+', '+fanil_y+', '+interval+')";
	slidePic.movement = setTimeout(repeat, interval);
}