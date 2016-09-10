/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-03 13:21:24
 * @version $Id$
 */
window.onload = function () {
	var para = document.createElement('p');
	var testdiv = document.getElementById('testdiv');
	testdiv.appendChild(para);
	var text1 = document.createTextNode('This is');
	para.appendChild(text1);
	var newem = document.createElement('em');
	var newem_text = document.createTextNode('my');
	para.appendChild(newem.appendChild(newem_text));
	var text2 = document.createTextNode('content');
	para.appendChild(text2);
}

