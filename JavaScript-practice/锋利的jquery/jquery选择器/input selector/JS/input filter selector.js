/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-21 21:15:13
 * @version $Id$
 */
var inputste = $("input:checked").length;
console.log("选中的多选框有：" + inputste + "个");

var selectNum = $("select :selected").text();
console.log("选中的菜单有：" + selectNum )