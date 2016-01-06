/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-25 00:48:58
 * @version $Id$
 */
$(function() {
	var page = 1;
	var i = 4;
	$(".e_left a").bind("click", function() {
		var v_parent = $(this).parents('.v_show');
		var v_content = $(v_parent).find(".v_content");//
		var v_window = $(v_parent).find(".v_window");


		var v_width = v_window.width();
		var lenz = $("li").length;
		var page_current = Math.ceil(lenz/i)
		if(page == page_current) {
			v_content.animate({left: '0px'}, "slow");
			page = 1;
		} else {
			v_content.animate({left: '-='+ v_width}, "slow");
			page++;
		}
		$("span").eq(page-1).addClass("current").siblings().removeClass("current");
		return false;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
	})
	$(".e_right").bind("click" function() {
		
	})
})
