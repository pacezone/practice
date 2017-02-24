/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-23 13:15:22
 * @version $Id$
 */
function Tree() {
	this.stack = [];
	this.playing = false;
	this.interator = 0;
	this.target='';
}
Tree.prototype = {
	TraverseDF : function(node){
		this.stack.push(node);
		if (node) {
			for (var i = 0; i < node.children.length; i++) {

				this.TraverseDF(node.children[i])
				
			}
		}
	},
	TraverseBF : function(node) {
		if (node) {
			this.stack.push(node);
			this.TraverseBF(node.nextElementSibling)	
			node = this.stack[this.interator++];
			this.TraverseBF(node.firstElementChild)
		}
	},
	animation : function(search) {
		var i = 0,
			stack = this.stack,
			self = this,
			len = stack.length;
		this.interator = 0;
		this.resetColor();
		this.stack = [];
		if (!self.playing) {
			self.playing = true;
			var timer = setInterval(function() {
				if (i<len) {
				stack[i].style.background = '#FFAEB9';
				}
				if (i>0) {
				stack[i-1].style.background = '#fff';
				}
				if (search) {
					if (i<len){
						if(search == stack[i].firstChild.nodeValue.trim()) {
						self.playing =false;
					
						stack[i].style.background = '#9AC0CD';
						clearInterval(timer)
						} 
					} else if (i == len) {
						self.playing =false;
						clearInterval(timer);
						alert('找不到数据')	
					};
				};
				if (i == len) {
				self.playing =false;
				clearInterval(timer);
				};
				i++;
			},500) 
		}
	},
	resetColor:function() {
		this.stack.forEach(function(d){
			d.style.background = '#fff'
		})
	},
	addEl:function(data) {
		var newNode = document.createElement('div');
		newNode.innerHTML = data;
		this.target.appendChild(newNode);
	}
};

(function(){
	var tree = new Tree();
	var btns = document.querySelectorAll('button'),
		DFBtn = btns[0],
		BFBtn = btns[1],
		DFsearchBtn = btns[2],
		BFsearchBtn = btns[3],
		addElBtn = btns[4],
		delElBtn = btns[5],
		search = document.getElementById('search'),
		addData = document.getElementById('addData'),
		root = document.querySelector('.root');


	addEvent(DFBtn,'click',function() {
		tree.TraverseDF(root)
		tree.animation()

	});
	addEvent(BFBtn,'click',function() {
		tree.TraverseBF(root)
		tree.animation()

	});
	addEvent(DFsearchBtn,'click',function() {
		if (search.value) {
			tree.TraverseDF(root)
			tree.animation(search.value)
		}
	});
	addEvent(BFsearchBtn,'click',function() {
		if (search.value) {
			tree.TraverseBF(root)
			tree.animation(search.value)
		}
	});
	addEvent(root,'click',function(event) {
		var e = event || window.event;
		tree.TraverseDF(root);
		tree.resetColor();
		if(e.target&&e.target.nodeType ==1){
			e.target.style.background = '#9F79EE'
		}
		tree.target = e.target;
		tree.stack = [];
	});
	addEvent(delElBtn,'click',function() {
		if (tree.target.className !== 'root') {
			tree.target.parentNode.removeChild(tree.target)
		} else {
			alert('不能删除根节点')
		}
		tree.target = '';
	});
	addEvent(addElBtn,'click',function(){
		if(addData.value) {
			tree.addEl(addData.value)
		} else {
			alert('请输入节点数值')
		}
		tree.target ='';
	})
})()
