/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-23 23:50:25
 * @version $Id$
 */
// $(function () {
// 	$(".imgtip").mousemove(function(e){
// 		var bigImg = $("<img id=bigImg />");
// 		bigImg.attr("src", this.href);
// 		$("body").append(bigImg);
// 		$("#bigImg")
// 			.css({
// 				"position": "absolute",
// 				"left": e.pageX + "px",
// 				"top": e.pageY + "px"
// 			}).show();
// 	}).mouseout(function() {
// 		$("bigImg").remove()
// 	}).mousemove(function(e) {
// 		$("#bigImg")
// 			.css({
// 				"position": "absolute",
// 				"left": e.pageX + "px",
// 				"top": e.pageY + "px"
// 			})
// 	})
// })
$(function () {
	var x = 10;
	var y = 20;
	$("a.imgtip").bind('mousemove',(function(e){
		this.mytitle = this.title;
		this.title = "";
		var bigTip = "<div id = bigTip><img src='"+this.href+"'/></div>";
		$("body").append(bigTip);
		$("#bigTip").css({
			"position":"absolute",
			"left": (e.pageX+x) + "px",
			"top" : (e.pageY+y) + "px"
		}).show("fast");
	})).bind('mouseout',(function() {
		this.title = this.mytitle; 
		$("#bigTip").remove();	
	})).bind('mousemove',(function(e){
			$("#bigTip").css({
			"position":"absolute",
			"left": (e.pageX+x) + "px",
			"top" : (e.pageY+y) + "px"
		})
	}))
})