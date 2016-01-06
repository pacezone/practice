/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-10-03 21:33:34
 * @version $Id$
 */
$(function(){
	var linkcss =$(".linkcss")
	$(".skin li").click(function() {
		var newlink = this.id;
		linkcss.attr('href', "CSS/"+newlink+".css")
	})
})
