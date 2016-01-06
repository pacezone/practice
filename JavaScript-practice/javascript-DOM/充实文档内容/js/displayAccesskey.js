/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-07 20:09:42
 * @version $Id$
 */
function displayAccesskey () {
	var navigation = document.getElementById('nav');
	var links = navigation.getElementsByTagName('a');
	for (var i= 0; i<links.length; i++) {
		var links_text = links[i].lastChild.nodeValue;
		var links_accesskey = links[i].getAttribute('accesskey');
		var ulist = document.createElement('ul');
		var lilist = document.createElement('li');
		var lilist_text = document.createTextNode(links_accesskey + ":" + links_text);
		lilist.appendChild(lilist_text);
		ulist.appendChild(lilist);
		document.body.appendChild(ulist);
	};
}
addLoadEvent(displayAccesskey);