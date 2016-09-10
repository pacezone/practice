/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-19 19:04:11
 * @version $Id$
 */
var btn = document.getElementById('btn');
btn.onclick = function numberInput () {
	var numberInput = new Array;
	var items = document.getElementsByName('check');//获取name为check的一组元素(checkbox)
	for (var i = 0; i < items.length; i++) {
		if (items[i].checked) {                     //判断是否选中
			numberInput.push(items[i].value);       //把符合条件的数据
		};
	}
	alert("checked's number is:"+numberInput.length)
}
