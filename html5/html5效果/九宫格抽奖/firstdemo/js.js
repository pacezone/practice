/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-15 10:27:55
 * @version $Id$
 */
window.onload = function () {
	var count = [];
	var img = new Image();
	var imgs = ['1.jpg', '2.jpg', '3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg'];
	for (var i = 0; i < 8; i++) {
		img.src = imgs[i];
		$('#couponWrapper').find('li').eq(i).addClass('rotate');
		$('#couponWrapper').find('li').eq(i).append('<img src = '+img.src+'>');
		
	};
	$('#btn').click(function(event) {
		$('#couponWrapper').find('li').removeClass('rotate');
		$('#couponWrapper').find('li').find('img').remove();
	});
	function unique(arr) {
		arr = arr || [];
		var a = {};
		len = arr.length;
		for (var i = 0; i < len; i++) {
			var v = arr[i];
			if (typeof(a[v]) == 'undefined') {
				a[v] = 1;
			};
		};
		arr.length = 0;
		for (var i in a) {
			arr[arr.length] = i
		}
		return arr;
	}
	$('#couponWrapper').find('li').click(function(abc) {
		var abc = $('#couponWrapper').find('li').index(this);
		var num = Math.floor(Math.random()*10);
		
		count.push(abc);
		unique(count);
		console.log(count);
		$(this).addClass('rotate');
		setTimeout(function () {

			changeColor(abc);
		},1500);

		if (count.length > 4) {
			alert("抽奖超过次数");
			return false;
		};
		function changeColor(abc) {
		if ($("#couponWrapper").find("li").eq(abc).find('img').length==1) {
			return false
		} else {
			$("#couponWrapper").find("li").eq(abc).append('<img src = '+imgs[num]+'>');
			
			}
		}	
	})
}
	
