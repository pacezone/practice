/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-21 23:53:59
 * @version $Id$
 */
$(function() {
	var Category = $(".SubCategoryBox ul li:gt(7):not(:last)");
	Category.hide();
 	var showBtn = $("div.showmore>a");
 	showBtn.click(function() {
		if (Category.is(':visible')) {
			Category.hide(1000);
			$(this).find('span').css("background", "url(../images/down.gif) no-repeat")
 			  					.text("显示全部品牌");
 			$(".SubCategoryBox ul li").filter(":contains('佳能'),:contains('爱国者'),:contains('松下')")
 								  .removeClass('change');
		} else {
			Category.show(1000);
			$(this).find('span').css("background", "url(../images/up.gif) no-repeat")
							    .text("精简显示品牌");
	 		$("ul li").filter(":contains('佳能'),:contains('爱国者'),:contains('松下')")
				  .addClass('change');
		}
		return false;
	})
})



