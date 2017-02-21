/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-18 14:11:46
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

function list(input,wrapper) {
	this.wrapper = document.getElementById(wrapper);
	this.data = document.getElementById(input);

	this.arr = [];
	
}
list.prototype = {
	dataVal:function() {
		this.arr = (this.getArr()[0] != undefined)? this.getArr():[];
		var str = this.data.value.trim();
		if (str) {
			var arr = str.split(/[^a-zA-Z0-9\u4e00-\u9fa5]+/).filter(function(e) {
				if (e!= null&&e.length!=0) {
					return true;
				} else {
					return false;
				}
			});
			this.arr = this.limit(this.unique(arr.concat(this.arr)));
		}
	},
	getArr:function(){
		var arr = [];
		this.wrapper.childNodes.forEach(function(d){
			arr.push(d.innerHTML)
		})
		return arr;
	},
	unique:function(arr) {
		var newArr = arr.filter(function(e,index){
			if (arr.indexOf(e) == index) {
				return true;
			} else {
				return false
			}	
		})
		return newArr;
	},
	limit :function(arr) {
		var len = arr.length;
		if (len>10) {
			arr.splice(10,(len-10));
		} 
		return arr;
	},
	render:function(){
		var html = '';
		html = this.arr.map(function(e){
			return '<p>'+e+'</p>'
		}).join('');
		this.wrapper.innerHTML = html; 
		this.getArr()
		
	}
	// del:function(){

	// }
	
	
}
var tag = new list('Tag','dispalyTag');
var hobby = new list('textarea','dispalyHobby')
addEvent($('Tag'),'keydown',function(e) {
	var e = e || window.event;
	if (e.keyCode == 13||e.keyCode ==32||e.keyCode ==188) {
		tag.dataVal();
		tag.render();
	}
});
addEvent($('hobbyBtn'),'click',function() {
	hobby.dataVal();
	hobby.render()
});
var divArea = document.getElementsByTagName('div');

var del = function(wrapper){
	addEvent(wrapper,'mouseover',function(e) {
	var e = e || window.event;
	if (e.target&&e.target.nodeName == 'P') {
		var html = e.target.innerHTML;
		e.target.innerHTML = '<span>删除:</span>'+html;
		addEvent(e.target,'mouseout',function(){
			var context = this.innerHTML.replace('<span>删除:</span>','');
			this.innerHTML = context;
		});

	}

	})
addEvent(wrapper,'click',function(e){
	var self = this;
	var e = e || window.event;
	if (e.target&&e.target.nodeName == 'P') {
		self.removeChild(e.target);
	}
})
}


del($('dispalyTag'))
del($('dispalyHobby'))




 
