/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-08 00:51:59
 * @version $Id$
 */
function highlightRow () {
	var rows = document.getElementsByTagName('tr');
	for (var i = 0; i < rows.length; i++) {
		rows[i].onmouseover = function() {
			this.style.fontWeight = 'bold';
		}
		rows[i].onmouseout = function() {
			this.style.fontWeight = 'normal';
		}; 
	};
}
addLoadEvent(highlightRow);
