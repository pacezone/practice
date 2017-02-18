/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-17 14:17:59
 * @version $Id$
 */
function addEvent(el,event,fn) {
	if (el.addEventListener) {
		return el.addEventListener(event,fn)
	} else if (el.attatchEvent) {
		return el.attatchEvent('on'+event,fn)
	} else {
		return el['on'+event] = fn;
	}
}
var $ = function (el) {
	return document.getElementById(el);
}
// aa
// bb
// ,bb、cc
//围绕display对象的list

function list(wrapper) {
	this.wrapper = document.getElementById(wrapper)
	this.arr =[];

}
list.prototype = {
	renderArr:function(str) {
		var html='';
		html = this.arr.map(function (d) {
			if (str != null && str.length>0) {
				console.log(d)
				d = d.replace(new RegExp(str,'g'),'<span class = "red">'+str+'</span>' );
				console.log(d)
			}

			return '<p>'+ d +'</p>';

		}).join(' ')
			//看了排名第一的代码，真是想都没想过的想法···
		this.wrapper.innerHTML = html;
	},
	content : function () {
		var arr = [];
		var str = document.getElementById('textarea').value;
		if (str) {
			str = str.replace(/(^[\s,、.。，;；]+)|([\s,、.。，;；]+$)/g,"").replace(/([\s,、.。，;；]+)/g,",");
			arr = str.split(',');	
		}	
		this.arr = arr.concat(this.arr);
		// return this.arr;
	},
}
var list = new list('display');

addEvent($('typeBtn'),'click',function() {
	list.content()
	list.renderArr();
})
addEvent($('searchBtn'),'click',function () {
	var str = $('search').value.trim();
	console.log(str)
	list.renderArr(str);
})