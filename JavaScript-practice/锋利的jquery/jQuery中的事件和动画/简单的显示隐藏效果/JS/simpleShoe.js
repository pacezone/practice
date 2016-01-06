/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-24 16:23:03
 * @version $Id$
 */
// $(function() {
// 	$("#panel h5.head").bind("mouseover", function(){
// 		$(this).next().show()
// 	}).bind("mouseout", function() {
// 		$(this).next().hide()
// 	})
// })

// $(function() {
// 	$(".head").hover(function() {
// 		$(this).next().show()
// 	},function() {
// 		$(this).next().hide()
// 	})
// })
$(function() {
		$(.#panel h5.head).toggle(function() {
		$(this).next().addClass("highlight");
		$(this).next().show();
	},function() {
		$(this).next().removeClass("highlight");
		$(this).next().hide();
	});
});