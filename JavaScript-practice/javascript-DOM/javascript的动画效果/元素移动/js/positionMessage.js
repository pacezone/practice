/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-08 06:25:04
 * @version $Id$
 */
function positionMessage() {
	var elem = document.getElementById("message");
	elem.style.position = 'absolute';
	elem.style.left = '50px';
	elem.style.top = '100px';
	moveElement(200, 100, 10);
};
addLoadEvent(positionMessage);
