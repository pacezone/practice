/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-08 18:55:04
 * @version $Id$
 */
function prepareSlideshow() {
	// <div id="slideshow">
	// 	<img src="images/topics.gif" alt="building blocks of web design" id="preview">
	// </div>
	var slideshow = document.createElement('div');
	slideshow.setAttribute('id', 'slideshow');
	var preview = document.createElement('img');
	preview.setAttribute('id', 'preview');
	preview.setAttribute('src', 'images/topics.gif');
	preview.setAttribute('alt', "building blocks of web design");
	slideshow.appendChild(preview);
	document.body.appendChild(slideshow);
	preview.style.position = 'absolute';
	var linklist = document.getElementById('linklist');
	var links = linklist.getElementsByTagName('a');
	links[0].onmouseover = function() {
		moveElement(-100,0,10);
	} 
	links[1].onmouseover = function() {
		moveElement(-200,0,10);
	} 
	links[2].onmouseover = function() {
		moveElement(-300,0,10);
	} 
}


addLoadEvent(prepareSlideshow);