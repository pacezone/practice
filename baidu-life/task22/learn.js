/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-22 18:50:07
 * @version $Id$
 */

 /**
 * add handler to element
 */
function addHandler(element, type, handler) {
    if(element.addEventListener) {
        addHandler = function(element, type, handler) {
            element.addEventListener(type, handler, false);
        };
    } else if (element.attachEvent) {
        addHandler = function(element, type, handler) {
            element.attachEvent("on"+type, handler);
        };
    } else {
        addHandler = function(element, type, handler) {
            element["on"+type] = handler;
        };
    }
    return addHandler(element, type, handler);
};

/**
 * get target from event
 */
function getTarget(event) {
    event = event || window.event;
    return event.target || event.srcElement;
};

/**
 * prevent default
 */
function preventDefault(event) {
    if(event.preventDefault) {
        preventDefault = function(event) {
            event.preventDefault;
        }
    } else {
        preventDefault = function(event) {
            event.returnValue = false;
        }
    }
    return preventDefault(event);
};

function init(queue, lin) {
    var randHeight, i, input = document.querySelector("input");
    queue.innerHTML = "";
    for(var i = 0; i < 10; i++) {
        input.value = Math.floor(Math.random() * 90) + 10;
        lin.click();
    }
};

function trim(word) {
    return word.replace(/^\s+|\s+$/g,"");
};

(function() {
    var treeWalker = new TreeWalker(),
        btns       = document.querySelectorAll("input"),
        preBtn     = btns[0],
        inBtn      = btns[1],
        postBtn    = btns[2],
        root       = document.querySelector(".root");

    addHandler(preBtn, "click", function() {
        treeWalker.preOrder(root);
        treeWalker.animation();
    });
    addHandler(inBtn, "click", function() {
        treeWalker.inOrder(root);
        treeWalker.animation();
    });
    addHandler(postBtn, "click", function() {
        treeWalker.postOrder(root);
        treeWalker.animation();
    });
})();

/* 遍历一颗树 */
function TreeWalker() {
    this.stack = [];
    this.isWalking = false;
};

/* 前序遍历 */
TreeWalker.prototype.preOrder =  function(node) {
    this.stack.push(node);
    if(node.firstElementChild) {
        this.preOrder(node.firstElementChild);
    }
    if(node.lastElementChild) {
        this.preOrder(node.lastElementChild);
    }
};

/* 中序遍历 */
TreeWalker.prototype.inOrder = function(node) {
    if(node.firstElementChild) {
        this.inOrder(node.firstElementChild);
    }
    this.stack.push(node);
    if(node.lastElementChild) {
        this.inOrder(node.lastElementChild);
    }
};

/* 后序遍历 */
TreeWalker.prototype.postOrder = function(node) {
    if(node.firstElementChild) {
        this.postOrder(node.firstElementChild);
    }
    if(node.lastElementChild) {
        this.postOrder(node.lastElementChild);
    }
    this.stack.push(node);
};

/* 动画方法 */
TreeWalker.prototype.animation = function() {
    var stack   = this.stack,
        speeder = document.querySelector("#speeder"),
        iter    = 0,
        self    = this,
        timer;

    self.stack = [];
    if(!self.isWalking) {
        self.isWalking = true;
        stack[iter].style.backgroundColor = "#F125C2";
        timer = setInterval(function() {
            if(iter == stack.length-1) {
                stack[iter].style.backgroundColor = "#FFFFFF";
                self.isWalking = false;
                clearInterval(timer);
            } else {
                ++iter;
                stack[iter-1].style.backgroundColor = "#FFFFFF";
                stack[iter].style.backgroundColor = "#F125C2";
            }
        }, speeder.value);
    }
};







var btn = document.getElementsByTagName('input'),
	preBtn = btn[0],
	inBtn = btn[1],
	postBtn = btn[2],
	treeRoot = document.getElementsByClassName('root')[0],
	divList = [],
	timer = null;
window.onload = function (){
	preBtn.onclick = function () {
		reset();
		preOrder(treeRoot);
		changeColor();
	}
	inBtn.onclick = function () {
		reset();
		inOrder(treeRoot);
		changeColor(); 	
	}
	postBtn.onclick = function () {
		reset();
		postOrder(treeRoot);
		changeColor();
	}
}

//前序遍历
function preOrder(node) {
	if (!(node == null)) {
		divList.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}
}

//中序遍历
function inOrder(node) {
	if (!(node == null)) {
		inOrder(node.firstElementChild);
		divList.push(node);
		inOrder(node.lastElementChild);
	}
}

//后序遍历
function postOrder(node) {
	if (!(node == null)) {
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		divList.push(node);
	}
}

//颜色变化函数
function changeColor() {
	var i = 0;
	divList[i].style.backgroundColor = 'blue'
	timer = setInterval(function (argument) {
		i++;
		if (i < divList.length) {
			divList[i-1].style.backgroundColor = '#fff';
			divList[i].style.backgroundColor = 'blue';
		} else {
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor = '#fff';
		}
	},500)
}

//初始化样式
function reset() {
	divList = [];
	clearInterval(timer);
	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.backgroundColor = '#fff';
	}
}

