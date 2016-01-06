/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-14 19:17:30
 * @version $Id$
 */

function onclickPic () {
	var header = document.getElementsByTagName('header');
	var navigator = header[0].getElementsByTagName('nav');
	var links = navigator[0].getElementsByTagName('a');
	var destination;
	for (var i = 0; i < links.length; i++) {
		links[0].onmouseover = function () {
			destination = this.getAttribute('href');
			if (destination.indexOf('index.html') != -1) {
				moveElement(0, 0, 10);
			}
			if (destination.indexOf('about.html') != -1) {
				moveElement(-293.5, 0, 10);
			}
			if (destination.indexOf('Photo.html') != -1) {
				moveElement(-587, 0, 10);
			}
			if (destination.indexOf('Live.html') != -1) {
				moveElement(-880.5, 0, 10);
			}
			if (destination.indexOf('contact.html') != -1) {
				moveElement(-1174, 0, 10);
			}

		}
	}
}
addLoadEvent(onclickPic);