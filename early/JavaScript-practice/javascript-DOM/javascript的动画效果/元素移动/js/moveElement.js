/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-08 06:27:54
 * @version $Id$
 */
// function moveMessage() {
// 	var elem = document.getElementById('message');
// 	var xpx = parseInt(elem.style.left);
// 	var ypx = parseInt(elem.style.top);
// 	if (xpx == 100 && ypx == 200){
// 		return true;
// 	} else {
// 		xpx++;
// 		ypx++; 
// 	}
// }

// function moveMessage() {
// 	var elem = document.getElementById('message');
// 	var xpx = parseInt(elem.style.left);
// 	var ypx = parseInt(elem.style.top);
// 	if (xpx == 200 && ypx == 100){
// 		return true;
// 	}
// 	if (xpx < 200) {
// 		xpx++;
// 	}
// 	if (xpx > 200) {
// 		xpx--;
// 	}
// 	if (ypx < 100) {
// 		ypx++;
// 	}
// 	if (ypx > 100) {
// 		ypx--
// 	}
// 	elem.style.left = xpx +"px";
// 	elem.style.top = ypx + "px";
// 	movement = setTimeout('moveMessage()', 10);
// }
// 匿名函数改写移动函数

// function moveMessage(element_ID, final_x, final_y, interval) {
// 	var elem = document.getElementById(element_ID);
// 	var xpx = parseInt(elem.style.left);
// 	var ypx = parseInt(elem.style.top);
// 	if (xpx == final_x && ypx == final_y) {
// 		return true;
// 	}
// 	if (xpx < final_x) {
// 		xpx++;
// 	}
// 	if (xpx > final_x) {
// 		xpx--;
// 	}
// 	if (ypx < final_y) {
// 		ypx++;
// 	}
// 	if (ypx > final_y) {
// 		ypx--;
// 	}
// 	elem.style.left = xpx + "px";
// 	elem.style.top = ypx + "px";
// 	var repeat = "moveMessage("+element_ID+", "+final_x+", "+final_y+", "+interval+")";
// 	// var movement = setTimeout('moveMessage(elementID, final_x, final_y, interval)', interval);
// 	var movement = setTimeout(repeat,interval);
// };
function moveElement(final_x, final_y,interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById('message')) return false;
	var elems = document.getElementById('message');
	var xpox = parseInt(elems.style.left);
	var ypox = parseInt(elems.style.top);
	 	if (xpox == final_x && ypox == final_y) {
			return true;
		}
		if (xpox < final_x) {
			xpox++;
		}
		if (xpox > final_x) {
			xpox--;
		}
		if (ypox < final_y) {
			ypox++;
		}
		if (ypox > final_y) {
			ypox--;
		}
		elems.style.left = xpox + 'px';
		elems.style.top = ypox + 'px';
		var repeat = "moveElement("+final_x+", "+final_y+", "+interval+")";
		// var movement = setTimeout('moveMessage(elementID, final_x, final_y, interval)', interval);
		var movement = setTimeout(repeat,interval);
	}



