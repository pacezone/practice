function addEvent(el,event,fn){
	if (el.addEventLister) {
		el.addEventLister(event,fn,false)
	} else if(el.attachEvent) {
		el.attachEvent('on'+event,fn)
	} else {
		el['on'+event] = fn;
	}
};

var textNum = function (num) {
	var reg = new RegExp(/^[0-9]*?$/g);
	if (!num.length>0) return;
	if (list.getArr().length>50) {
		alert('只能输入50个数字');
	} else if (!reg.test(num)) {
		alert("请输入正确的数字");	
	} else if (num>100||num<10) {
		alert('请输入10~100之间的数字');
	} else {
		return true;	
	}
		
}
var $ = function(el) {
	return document.getElementById(el)
}

function list(wrapper) {	
	this.wrapper = document.getElementById(wrapper);
	// this.speend = document.getElementById(spend)
	this.html = '';
	this.arr = [];
	this.colmun = [];


}
list.prototype =  {
	//随机生成数组
	rondomNum : function() {
		this.arr = [];
		for (var i = 0; i < 30; i++) {
			var rondom = parseInt(Math.random()*100);
			var arrNum = (rondom>=10&&rondom<=100) ? rondom : 25;
			this.arr.push(arrNum);
		}
		return this.arr;
	},
	//渲染数组
	renderArr : function(arr) {
		var html = "";
		for (var i = 0; i < arr.length; i++) {
			html += this.getColumn(arr[i])
		}

		this.wrapper.innerHTML = html;
	},
	//从显示框中获取数组
	getArr : function() {
		for (var i = 0; i < this.wrapper.length; i++) {
			this.arr.push(this.wrapper.childNodes[i].innerHTML) 
		}
		return this.arr;
	},
	getColumn : function(num) {
		return '<p style="height:'+num*3+'px">'+num+'</p>'
	},
	getHeight:function(el) {
		var height = el.style.height;
		height.replace('px','');
		return parseInt(height);
	},
 
	swap:function(el1,el2) {
		var text = el1.innerHTML;
		el1.innerHTML = el2.innerHTML;
		el2.innerHTML = text;
		var temp = el1.style.height;
		// el1.offsetHeight = el2.offsetHeight;
    	el1.style.height = el2.style.height;
    	el2.style.height = temp;
    	
    	
	},

	bubbleSort:function(arr,speed) {
		var reg = new RegExp(/^[0-9]*?$/g);
		var delay =  (reg.test(speed))? speed:150;
		this.colmun  = arr;
		var len = this.colmun.length;
		var i = len - 1;
		var j=0;

		list.timer = setInterval(function() {
			if (i>0&&j<i) {
				if (list.colmun[j].offsetHeight>list.colmun[(j+1)].offsetHeight) {
					list.swap(list.colmun[j],list.colmun[(j+1)]);

				}
				j++;
				// list.colmun[j].className = 'active';
    // 			list.colmun[(j+1)].className = list.colmun[(j+1)].className.replace('active','');
			};
			if(j===i) {
				--i;
            	j = 0;
			}
			if (i===-1) {
				clearInterval(list.timer)
			}
		},delay)
		
	}

	
};

var list = new list("show")	;



addEvent($('randomNum'),'click',function(){
	list.renderArr(list.rondomNum());

});
addEvent($('leftIn'),'click',function() {
	var arr = list.getArr();
	if (textNum(input.value)) {
		arr.unshift(parseInt(input.value));
		list.renderArr(arr);
	};
});
addEvent($('rightIn'),'click',function() {
	var arr = list.getArr();
	if (textNum(input.value)) {
		arr.push(parseInt(input.value));
		list.renderArr(arr);
	};
});
addEvent($('leftRemove'),'click',function() {
	var arr = list.getArr();
	arr.shift();
	list.renderArr(arr);
});
addEvent($('rightRemove'),'click',function() {
	var arr = list.getArr();
	arr.pop();
	list.renderArr(arr);
});
addEvent($('show'),'click',function(e) {
	if (e.target && e.target.nodeName == 'P') {
		this.removeChild(e.target)
	}
});

addEvent($('bubble'),'click',function(){
	if (list.timer) {
		alert('aaaa')
	} else {
		list.bubbleSort($('show').getElementsByTagName('p'),parseInt($('speed').value))
	}
	
})