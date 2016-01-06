/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-18 23:39:28
 * @version $Id$
 */
function addEvent () {
	var items = document.getElementsByTagName('p');
	for (var i = 0; i < items.length; i++) {
		items[i].onclick = function() {
			//doing something
		}
	};
}
