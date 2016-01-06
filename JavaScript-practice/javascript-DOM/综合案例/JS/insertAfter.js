/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-10 15:05:40
 * @version $Id$
 */
function insertAfter (newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}
