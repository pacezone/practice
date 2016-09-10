/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-02 17:46:51
 * @version $Id$
 */
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}//通用函数，页面加载完毕，运行函数。
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}//通用函数，在目标元素节点之后插入新的节点
function preparePlaceHolder() {
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById('imagegallery')) return false;
	var placeholder = document.createElement('img');
	placeholder.setAttribute('id', 'placeholder');
	placeholder.setAttribute('src', 'images/jump.jpg');
	placeholder.setAttribute('alt', 'my image gallery');
	var description = document.createElement('p');
	description.setAttribute('id', 'description');
	var descripte = document.createTextNode('文本解释区域');
	description.appendChild(descripte);
	var gallery = document.getElementById('imagegallery');
	insertAfter(placeholder, gallery);
	insertAfter(description, placeholder);
}
function prepareGallery() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById('imagegallery')) return false;
	var gallery = document.getElementById('imagegallery');
	var links = gallery.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return showPic(this);
		}
	}
}
function showPic(whichpic) {
	if (!document.getElementById('palceholder')) return true;
	var source = whichpic.getAttribute('href');
	var palceholder = document.getElementById("palceholder");
	palceholder.setAttribute('src', source);
	if (!document.getElementById('description')) return false;
	if (whichpic.getAttribute('title')) {
		var text = whichpic.getAttribute("title");
		} else {
			var text = "";
		}
		var description = document.getElementById('description');
		if (description.firstChild.nodeType == 3) {
			description.firstChild.nodeValue = text;
		};
	return false;
}

addLoadEvent(preparePlaceHolder);
addLoadEvent(prepareGallery);