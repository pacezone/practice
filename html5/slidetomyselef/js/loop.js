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
for (var i = 0; i < contents.length; i++) {
	contents[i].style.transform= 'translate3d('+(i-1)*(conW)+'px,0px,0px)';
}
$('#contain').css('transform', 'translate3d(0px,0px,0px)');


var getTransitionX = function(el) {
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






var setTransition = function(el,l) {
	el.css('transform', 'translate3d('+l+'px,0px,0px)').css('transition-duration','900ms');
	if (Math.round(-l/conW) == (len-1)) {
		console.log('111')
		el.css('transform', 'translate3d(0px,0px,0px)').css('transition-duration','0ms');
	} else if (Math.round(l/conW)==1) {
		
		el.css('transform', 'translate3d('+(len-2)*(-conW)+'px,0px,0px)').css('transition-duration','0ms');
	}
	
}

var slidePre = function() {
	var l = Math.round(getTransitionX(contain)+conW);
	setTransition($('#contain'),l)
	// console.log(l)
};
var slideNext = function() {
	var l = Math.round(getTransitionX(contain)-conW);
	setTransition($('#contain'),l)
	// console.log(l)
	
};

$('#next').click(function(){

	slideNext()
})
$('#pre').click(function() {
	slidePre()
})
// setInterval(slideNext,2000);
// $('#pre').click(function() {
// 	k--;
// 	$('#contain').css('transform', 'translate3d('+(-k)*devW+'px,0px,0px)');
// });