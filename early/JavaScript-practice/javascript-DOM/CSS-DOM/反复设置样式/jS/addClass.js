/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-08 06:00:26
 * @version $Id$
 */
function addClass (element, value) {
	if (!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}
