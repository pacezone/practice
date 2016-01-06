/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-09-07 18:42:05
 * @version $Id$
 */
function displayAbbreviations () {
	if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
	// 取得所有缩略词
	var abbreviations =document.getElementsByTagName('abbr');
	if (abbreviations.length<1) return false;
	var defs = new Array();
	// 遍历所有缩略词，并保存缩略词和解释
	for (var i= 0; i<abbreviations.length; i++) {
		var current_abbre = abbreviations[i];
		var abbre_title = current_abbre.getAttribute('title');
		var key = current_abbre.lastChild.nodeValue;
		defs[key] = abbre_title; 
	}
	// 创建列表dl
	var dlist =  document.createElement('dl');
	for (key in defs) {
		var abbre_title = defs[key];
		var dtlist = document.createElement('dt');
		var dtlist_text = document.createTextNode(key);
		dtlist.appendChild(dtlist_text);
		var ddlist = document.createElement('dd');
		var ddlist_text = document.createTextNode(abbre_title);
		ddlist.appendChild(ddlist_text);
		dlist.appendChild(dtlist);
		dlist.appendChild(ddlist);
	}
	var header = document.createElement("h2");
	var header_text = document.createTextNode("abbreviations");
	header.appendChild(header_text);
	document.body.appendChild(header);
	document.body.appendChild(dlist);
}
addLoadEvent(displayAbbreviations);