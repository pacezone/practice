/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-31 22:08:19
 * @version $Id$
 */
		var contain = document.getElementById('contain');
var startNode = $('#contain li:first').clone(true);
var endNode = $('#contain li:last').clone(true);
var l = 0;

$('#contain').append(startNode)
$('#contain').prepend(endNode);
var contents = $('#contain').find('li');
var len = contents.length;
var conW = $('#contain').width();
$(document).ready(function() {


var init = function(){
	for (var i = 0; i < contents.length; i++) {
	contents[i].style.transform= 'translate3d('+(i-1)*(conW)+'px,0px,0px)';
	}
	contain.style.transform = 'translate3d(500px,0px,0px)';
}();


});
var getTransitionX = function(el) {
	console.log(el)
	var curStyle = window.getComputedStyle(el, null);
if (window.WebKitCSSMatrix) {
	var curTransform = curStyle.transform || curStyle.webkitTransform;
	if (curTransform.split(',').length > 6) {
        curTransform = curTransform.split(', ').map(function(a) {
            return a.replace(',', '.');
            }).join(', ');
      	}
    transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
 } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
    }
 if (window.WebKitCSSMatrix) {
 	curTransform = transformMatrix.m41;
 } else if (matrix.length === 16) {
 	curTransform = parseFloat(matrix[12]);
 } else {
 	curTransform = parseFloat(matrix[4]);
 }
    return curTransform || 0;
}






var setloop = function(el) { 
	var w = getTransitionX(el);
	if (Math.round(-w/conW) == (len-2)) {
		setTransition(el,0,0);
	} else if (Math.round(w/conW)==0) {
		var x= (len-2)*(-conW)
		setTransition(el,x,0);
	}
}
var setTransition = function(el,l,duration) {
	duration = duration + 'ms';
	el.style.transitionDuration= duration;
	el.style.transform='translate3d('+l+'px,0px,0px)';


}
var slideNext = function() {
	var l = Math.round(getTransitionX(contain)-conW);
	setTransition(contain,l,350);
};
var slidePre = function() {
	var l = Math.round(getTransitionX(contain)+conW);
	setTransition(contain,l,350);	
};


$('#next').click(function(){
	setloop(contain);
	slideNext()
	
})
$('#pre').click(function() {
	setloop(contain);
	slidePre()
})