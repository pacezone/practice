/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-02 21:58:12
 * @version $Id$
 */
function addLoadEvent(func) {
	var oldload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function () {
			oldload();
			func();
		}
	}
}
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibing);
	}
}
function prepareTabpic() {
	var replace_area = document.createElement('img');
	replace_area.setAttribute('id', 'replace_area');
	replace_area.setAttribute('src', 'images/jump.jpg');
	var description = document.createElement('p');
	description.setAttribute('id', 'description');
	var descripte = document.createTextNode('详细介绍');
	description.appendChild(descripte);
	insertAfter(replace_area, list_pic);
	insertAfter(description,replace_area);
}
function tabPicE() {
	var gallery = document.getElementById('list_pic');
	var links = gallery.getElementsByTagName('a');
	for(var i=0; i<links.length; i++) {
		links[i].onclick = function() {
			tabPic(this);
			return false;
		}
	}
}
function tabPic(replac_pic) {
	var resource = replac_pic.getAttribute('href');
	var replace_area = document.getElementById('replace_area');
	replace_area.setAttribute('src', resource);
	var text = replac_pic.getAttribute('name');
	document.getElementById('description').firstChild.nodeValue  = text;
}

addLoadEvent(tabPicE);
addLoadEvent(prepareTabpic);
