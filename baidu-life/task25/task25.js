/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-25 13:32:32
 * @version $Id$
 */
function TreeNode(obj) {
	this.parent = obj.parent;
	this.childs = obj.childs||[];
	this.data = obj.data||'';
	this.element = obj.element;
	this.element.TreeNode = this;  

}
TreeNode.prototype = {
	constructor: TreeNode,
	addChild:function(text) {
		if (typeof text !== 'string'||text.trim() =='' ) {
			return this
		}
		var newNode = document.createElement('div');
		var html = '<label class="node_title"><i></i><span>'+text.trim()+'</span><b></b><del></del>';
		newNode.innerHTML = html;
		this.element.appendChild(newNode);
		this.childs.push(new TreeNode({
			parent:this,childs:[],data:text,element:newNode
		}))
		this.unfold()
		this.render(true)
		return this;
	},
	render:function(arrow,highlight,del,add){
		if (arrow) {
			if (this.isFold()) {
				this.element.querySelectorAll('label')[0].querySelector('i').className = 'left_arrows';
			} else {
				this.element.querySelectorAll('label')[0].querySelector('i').className = 'down_arrows';
			}
		} else {
			this.removeClass('i','left_arrows').removeClass('i','down_arrows')
		}
		if (highlight) {
			this.addClass('span','highlight')
			if (this.isFold()) {this.addClass('i','highlight1')}
			else {this.addClass('i','highlight2')}
		} else {
			this.removeClass('span','highlight')
			this.removeClass('i','highlight1').removeClass('i','highlight2')
		}
		if (this.childs.length == 0){
			this.removeClass('i','highlight1').removeClass('i','highlight2')
			this.removeClass('i','down_arrows').removeClass('i','left_arrows')
		}
		
		if (del) {
			this.addClass('del','del')
		} else {
			this.removeClass('del','del')
		}
		if (add) {
			this.addClass('b','add')
		} else {
			this.removeClass('b','add')
		}
	},
	isFold:function(){
		if (this.childs.length == 0) return false;
		return this.childs[0].element.className.indexOf('unvisible') !== -1;
	},
	addClass:function(el,className){
		if (this.hasClass(el,className)) return this;
		if (this.element.className == 'root'&&el == 'del') {
			return this;
		}
		var element = this.element.querySelectorAll(el)[0];
		var OldClass = element.className.split(' ');
		OldClass.push(className);
		
		var newClass = OldClass.join(' ');
		element.className = newClass;
	
		return this;
	},
	removeClass:function(el,className) {
		if (!this.hasClass(el,className)) return this;
		var element = this.element.querySelectorAll(el)[0];
		element.className = element.className.replace(className,'')
		return this;
	},
	fold:function() {
		this.childs.forEach(function(d){
			d.element.className = 'unvisible';
		})
		this.render(true)
	},
	unfold:function() {
		this.childs.forEach(function(d){
			d.element.className = d.element.className.replace('unvisible','')
		})
		this.render(true)
	},
	hasClass:function(el,className) {
		var element = this.element.querySelectorAll(el);
		if (element[0].className.indexOf(className) !== -1) {
			return true
		} else {
			return false;
		}
	},
	delNode:function() {
		var i;
		if (!this) return; 
        if(this.childs.length !== 0){
            for(i=0;i<this.childs.length;i++){
                this.childs[i].delNode();
            }
        }
      
        this.parent.element.removeChild(this.element);
        for (i = 0; i < this.parent.childs.length; i++) { 
            if (this.parent.childs[i] == this) {
                this.parent.childs.splice(i, 1);
                break;
            }
        }
        this.parent.render(true, false);
	},
	traver:function(arr,root){
		arr.push(root)
		if (root.childs) {
			for (var i = 0; i < root.childs.length; i++) {
				this.traver(arr,root.childs[i])
			}
		
		}
	}
};
(function(){
	var root =new TreeNode({
		parent:null,
		childs:[],
		data:'小排球',
		element: document.querySelector('.root')
	})
	var searchBtn = document.querySelector('button'),
		searchInput = document.querySelector('.search_input'),
		arr = [];
	root.addChild('乌野高中').addChild('青叶城西').addChild('音驹高中');
	root.childs[0].addChild('日向翔阳').addChild('影山飞雄').addChild('月岛蛍');
	root.childs[1].addChild('及川彻').addChild('金田一勇太郎').addChild('金田一勇太郎');
	root.childs[2].addChild('孤爪研磨').addChild('黒尾鉄朗').addChild('灰羽列夫');
	root.childs[0].childs[0].addChild('出身：雪之丘中学').addChild('所属：乌野高中 1年级1组')
	addEvent(root.element,'mouseover',function(event) {
		var e = event||window.event;
		if (e.target.parentNode.className.indexOf('node_title') !== -1) {
			var divNode = e.target.parentNode.parentNode;
			if (divNode.nodeName == 'DIV') {
				var DivTree = divNode.TreeNode;
				DivTree.render(true,true,true,true);
				
				addEvent(divNode,'mouseout',function(event) {
					DivTree.render(true,false,false,false)
				});
			}
		}
	})
	addEvent(root.element,'click',function(event){
		var e = event||window.event;
		if (e.target.nodeName == 'DEL') {
			console.log(e.target)
			var divNode = e.target.parentNode.parentNode.TreeNode
			divNode.delNode()
		}			
	});
	addEvent(root.element,'click',function(event){
		var e = event||window.event;
		if (e.target.nodeName == 'B') {
			var data = prompt('请输入信息','')
			var divNode = e.target.parentNode.parentNode.TreeNode
			divNode.addChild(data)
		}			
	});
	addEvent(root.element,'click',function(event){
		var e = event||window.event;
		if (e.target.nodeName == 'SPAN'||e.target.nodeName == 'I') {
			var divNode = e.target.parentNode.parentNode.TreeNode
			if (!divNode.isFold()) {
				divNode.fold()
			} else {
				divNode.unfold()
			}
		}			
	});
	addEvent(searchBtn,'click',function(){
		var text = searchInput.value.trim();
		if (!text||text.length ==0) return
		root.traver(arr,root);
		var newArr = arr.filter(function(d){
			return d.data == text;
		})
		if (newArr.length == 0) {
			alert('暂时未找到数据')
		} else {
			alert('找到'+newArr.length+'份数据')
			newArr.forEach(function(d){
				d.render(true,true)
			})
		}
		arr = []
		
	})
})()