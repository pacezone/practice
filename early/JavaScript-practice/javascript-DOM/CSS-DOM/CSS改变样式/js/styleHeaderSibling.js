/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-07 21:35:06
 * @version $Id$
 */




// function styleHeaderSibling () {
// 	var header = document.getElementsByTagName('h1');
// 	for (var i =0; i<header.length; i++) {
// 		var header_next = getNextElement(header[i].nextSibling);
// 		header_next.style.fontWeight = 'bold';
// 		header_next.style.fontSize = '1.2em';
// 	}
// }
// function styleHeaderSibling() {
// 	var headers = document.getElementsByTagName('h1');
// 	var elem;
// 	for (var i = 0; i < headers.length; i++) {
// 		elem = getNextElement(headers[i].nextSibling);
// 		elem.style.fontWeight = 'bold';
// 		elem.style.fontSize = '1.2em';
// 	};
// };  用改变样式的方法
// 用改变css类的方法
function styleHeaderSibling() {
	var headers = document.getElementsByTagName('h1');
	var elem;
	for (var i = 0; i < headers.length; i++) {
		elem = getNextElement(headers[i].nextSibling);
		addClass(elem, 'intro');
	};
};



addLoadEvent(styleHeaderSibling);
