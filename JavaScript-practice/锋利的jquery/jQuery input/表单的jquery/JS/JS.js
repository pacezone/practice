/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-26 22:48:02
 * @version $Id$
 */
$(function() {
	var comment = $("#comment");
	$(".bigger").bind("click", function() {
		if (!comment.is(":animated")) {
		comment.animate({width: "+=50px"}, 'normal')
		return false;
		};
	})
	$(".down").bind("click", function() {
		if (!comment.is(":animated")) {
			comment.animate({scrollTop: "+=50"}, 'normal');
			return false;
		}
	})	
	
});

$(function() {
	$("#checkAll").click( function(){
		$("input[name=items]:checkbox").attr('checked', this.checked);
		}
	);
	$("#checkNo").bind('click', function() {
		$("input[name=items]:checkbox").attr('checked', false);
	})
});