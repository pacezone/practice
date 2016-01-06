/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-21 19:44:09
 * @version $Id$
 */
//$("body div").css("background", "#bbffaa");
//后代元素里面的所有元素，包括div里面的div等


//$("body > div").css("background", "#bbffaa");
//仅后代元素，不包括里面的元素

//$(".one + div").css("background", "#bbffaa")
//仅改变one这个元素的下一个元素，不包括里面的元素

//$("#two ~ div").css("background", "#bbffaa")
//在DOM里面，只要与#two后面的所有div都变色

$("div:hidden").show(1000);
$("div:visible")
	.css("background", "#ff6500");