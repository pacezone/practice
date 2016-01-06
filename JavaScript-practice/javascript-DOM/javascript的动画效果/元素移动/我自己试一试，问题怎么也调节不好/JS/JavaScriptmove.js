/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-08 16:24:21
 * @version $Id$
 */
function moveElement (elementID, final_x, final_y, interval ) {
	var elem = document.getElementById(elementID);
	var xpx = elem.style.left;
	var ypx = elem.style.top;
	if (xpx == final_x && ypx == final_y) {
		return true;
	}
	if (xpx < final_x) {
		xpx++;
	}
	if (xpx > final_x) {
		xpx--;
	}
	if (ypx < final_y) {
		ypx++;
	}
	if (ypx > final_y) {
		ypx--;
	}
	elem.style.left = xpx + "px";
	elem.style.top = ypx + "px";
	var repeat = "moveElement("+elementID+", "+final_x+", "+final_y+", "+interval+")"
	// var movement = setTimeout('moveMessage(elementID, final_x, final_y, interval)', interval);
	var movement = setTimeout(repeat,interval)
}
addLoadEvent(moveElement('moveba', 200, 100, 10));