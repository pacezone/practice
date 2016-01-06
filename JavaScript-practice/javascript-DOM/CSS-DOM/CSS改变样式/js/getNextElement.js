/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-08 05:55:18
 * @version $Id$
 */
function getNextElement(node) {
	if(node.nodeType == 1) {
		return node;
	}
	if (node.nextSibling) {
		return getNextElement(node.nextSibling);
	}
	return null;
}
