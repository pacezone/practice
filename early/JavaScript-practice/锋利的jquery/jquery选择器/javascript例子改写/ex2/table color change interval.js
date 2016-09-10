/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-18 23:47:01
 * @version $Id$
 */
window.onload = function changeColor () {
	var tablePage = document.getElementById('tb');
	var tbody = tablePage.getElementsByTagName('tbody');
	var items = tbody[0].getElementsByTagName('tr');
	for (var i = 0; i < items.length; i++) {
		if (i%2 == 0) {
			items[i].style.backgroundColor = "#888";
		}
	};
}

