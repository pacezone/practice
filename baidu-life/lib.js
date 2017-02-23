/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-23 14:02:30
 * @version $Id$
 */
function addEvent(el,event,fn) {
	if (el.addEventListener) {
		return el.addEventListener(event,fn,false)
	} else if (el.attatchEvent) {
		return el.attatchEvent('on'+event,fn)
	} else {
		return el['on'+event] = fn;
	}
}
