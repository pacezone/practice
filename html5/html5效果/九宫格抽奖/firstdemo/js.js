/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-15 10:27:55
 * @version $Id$
 */
window.onload = function () {
	$('#couponWrapper').find('li').click(function(abc) {
		var abc = $('#couponWrapper').find('li').index(this);
		var img = new Image();
		var imgs = ['1.jpg', '2.jpg', '3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg'];
		var num = Math.floor(Math.random()*10)
		console.log(num);

		img.src = imgs[num];
		$(this).addClass('rotate');
		
		
		setTimeout(function () {
			changeColor(abc);
		},1500);

		
		function changeColor(abc) {
			$("#couponWrapper").find("li").eq(abc).append('<img src = '+img.src+'>');

		}	
	})
}
	
