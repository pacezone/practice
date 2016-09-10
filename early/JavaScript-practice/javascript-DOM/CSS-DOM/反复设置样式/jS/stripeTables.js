/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-07 23:28:47
 * @version $Id$
 */
function stripeTable () {
	var tables = document.getElementsByTagName('table');
	var jishuo, rows;
	for (var i = 0; i < tables.length; i++) {
		jishuo = false;
		rows = tables[i].getElementsByTagName('tr');
		for (var j = 0; j < rows.length; j++) {
			if (jishuo == true) {
				addClass(rows[j], 'odd');
				jishuo = false;
			} else  {
				jishuo = true;
			}
		};
	};
}

addLoadEvent(stripeTable);
