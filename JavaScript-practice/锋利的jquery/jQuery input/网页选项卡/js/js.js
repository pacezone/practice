/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-10-03 14:41:21
 * @version $Id$
 */
$(function(){
	var clickLi = $("div.tab_menu ul li");
	clickLi.click(function() {
		$(this).addClass("selected")
			   .siblings().removeClass("selected");

		var liNum = clickLi.index(this);
		$("div.tab_box div").eq(liNum).show().siblings().hide();
	})
})
