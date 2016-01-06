/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-23 21:59:28
 * @version $Id$
 */
$(function () {
	var x = 10;
	var y = 20;
	$("a.tooltip").mousemove(function(e){
		this.mytitle = this.title;
		this.title = "";
		var bigTip = "<div id = bigTip>"+this.mytitle+"</div>";
		$("body").append(bigTip);
		$("#bigTip").css({
			"position":"absolute",
			"left": (e.pageX+x) + "px",
			"top" : (e.pageY+y) + "px"
		}).show("fast");
	}).mouseout(function() {
		this.title = this.mytitle; 
		$("#bigTip").remove();	
	}).mousemove(function(e){
			$("#bigTip").css({
			"position":"absolute",
			"left": (e.pageX+x) + "px",
			"top" : (e.pageY+y) + "px"
		})
	})
})