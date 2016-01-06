/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-23 16:52:39
 * @version $Id$
 */
window.onload=function emailTextHide () {
	$("#address").focus(function() {
		if ($("#address").val()=="请输入你的邮箱地址") {
			$(this).val("");
		};
	})
	$("#address").blur(function() {
		if ($(this).val()=="") {
			$(this).val("请输入你的邮箱地址")
		};
	})
	$("#password").focus(function() {
		if ($(this).val()=="请输入你的密码") {
			$(this).val("");
		};
	})
	$("password").blur(function() {
		if ($(this).val()=="") {
			$(this).val("请输入你的密码");
		};
	})
}

