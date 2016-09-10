/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-10-03 13:33:46
 * @version $Id$
 */
$(function(){	
	$("form :input.required").each(function() {
		var $required = $("<strong class='highlight'>*</strong>");
		$(this).parent().append($required);
	});
	$("form:input").click(function(){
		var parent = $(this).parent();
		if ($(this).is('#username')) {
			if (this.value=="" || this.value.length<6) {
				var errorMsg = '请输入至少6位的用户名';
				parent.append("<span class='onError'> + errorMsg + </span>")
			} else {
				var okMsg = '输入正确';
				parent.append("<span class='onSuccess'> + okMsg + </span>")
			}
		};

		if ($(this).is('#email')) {
			if (this.value=="" || (this.value!=""&&!/.+@.+\.[a-zA-Z]{2,4}$/test(this.value))) {
				var errorMsg = '请输入正确的E-mail地址';
				parent.append("<span class='onError'> + errorMsg + </span>");
			} else {
				var okMsg = '输入正确';
				parent.append("<span class='onSuccess'> + okMsg + </span>")
			}
		};
	})
})