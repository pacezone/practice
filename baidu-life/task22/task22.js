/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-22 17:55:30
 * @version $Id$
 */
function addEvent(el,event,fn) {
	if (el.addEventListener) {
		return el.addEventListener(event,fn,false)
	} else if (el.attactEvent) {
		return el.attachEvent('on'+event,fn)
	} else {
		return el['on'+event] = fn
	}
};
function Traverse(){
	this.stack = [];
	this.playing = false;
}
Traverse.prototype =  {
	preOrder:function (node) {
	
		this.stack.push(node)
		if (node.firstElementChild) {
			console.log(node)
			this.preOrder(node.firstElementChild)
			
		};
		console.log(node)
		if (node.lastElementChild) {
			this.preOrder(node.lastElementChild)
		}
		// console.log(this.stack)
	},
	inOder:function(node) {
		if (node.firstElementChild) {
			this.preOrder(node.firstElementChild)
		};
		this.stack.push(node)
		if (node.lastElementChild) {
			this.preOrder(node.lastElementChild)
		}
		
	},
	postOder:function(node) {
		if (node.firstElementChild) {
			this.preOrder(node.firstElementChild)
		};
		if (node.lastElementChild) {
			this.preOrder(node.lastElementChild)
		}
		this.stack.push(node)
		
	},
	play:function() {
		var stack = this.stack;
		this.stack = [];
		var self = this;
		var i = 0;
		if (stack.length>1&&!self.playing) {
			self.playing = true;
			var time = setInterval(function() {
				if (i<stack.length) {
					stack[i].style.background = '#EEA9B8';
				}
				if (i>0) {
					stack[i-1].style.background = '#fff';
				}
				if (i == (stack.length)) {
					self.playing = false;
					clearInterval(time);
				}
				i++;			
			},300)
		}
		

	}
};

(function() {
var traverse = new Traverse();
	
	var _root = document.querySelector('.root'),
	    btns  = document.querySelectorAll("button"),
	    preBtn = btns[0],
	    inBtn = btns[1],
	    postBtn = btns[2];

	addEvent(preBtn,'click',function() {
		traverse.preOrder(_root);
		traverse.play()
	})
	addEvent(inBtn,'click',function() {
		traverse.inOder(_root);
		traverse.play()
	})
	addEvent(postBtn,'click',function() {
		traverse.postOder(_root);
		traverse.play()
	})

})()
	






