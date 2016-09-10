/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-04 11:03:52
 * @version $Id$
 */
function $(id) {
	return document.getElementById(id);
}
function add(num1, num2) {
	return num1 + num2;
}

function renderResult(result) {
	$("result").innerHTML = result;
}
function addEventHandle() {
	var num1 = $("number1").value;
	var num2 = $("number2").value;
	var result = add(num1, num2);
	renderResult(result);
}
function initEvent() {
	$("addbtn").addEventListener("click", addEventHandle, false);
}
initEvent();