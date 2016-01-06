/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-10 15:03:02
 * @version $Id$
 */

function addLoadEvent (func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}