/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-13 01:37:07
 * @version $Id$
 */
function highlightPage () {
	var header = document.getElementsByTagName('header');
	var navigation = header[0].getElementsByTagName('nav');
	var links = navigation[0].getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		var links_text;
		for (var i = 0; i < links.length; i++) {
			links_text = links[i].getAttribute('href');
			if (window.location.href.indexOf(links_text) != -1) {
			links[i].className = 'here';
			};
		}
	}
}
addLoadEvent(highlightPage);
