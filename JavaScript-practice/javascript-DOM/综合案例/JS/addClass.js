/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-10 15:08:39
 * @version $Id$
 */
function addClass (element, value) {
	if (!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName+= " "; 
		newClassName+=value;
		element.className = newClassName;
	}
}
