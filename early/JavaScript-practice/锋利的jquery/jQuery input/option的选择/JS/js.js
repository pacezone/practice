/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-10-02 13:37:57
 * @version $Id$
 */
$(function() {
	$("#add").click(function() {
		var select1 = $("#select1 option:selected");
		// var removeOption = select1.remove();
		// removeOption.appendTo("#select2");
		//  $("#select1").remove(select1);
		$("#select2").append(select1);
	});
	$("#add_all").click(function() {
		var option_all = $("#select1 option");
		$("#select2").append(option_all);
	});
	$("#select1").dblclick(function() {
		var option = $("option:selected",this);
		$("#select2").append(option);
	});

	
})
