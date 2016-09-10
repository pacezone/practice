/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-07 18:42:56
 * @version $Id$
 */
function displayBlockquote () {
	var quotes = document.getElementsByTagName('blockquote');
	for (var i= 0; i<quotes.length; i++) {
		var url = quotes[i].getAttribute('cite');
		var quotesChild = quotes[i].getElementsByTagName('*');
		var elem = quotesChild[quotesChild.length - 1];
		var link = document.createElement('a');
		var link_text = document.createTextNode('来源');
		link.appendChild(link_text);
		link.setAttribute('href', url);
		var superscript = document.createElement('sup');
		superscript.appendChild(link);
		elem.appendChild(superscript);
	}
}


addLoadEvent(displayBlockquote);