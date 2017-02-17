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
    var btns         = document.querySelectorAll("button"),
        lin          = btns[0],
        rin          = btns[1],
        lout         = btns[2],
        rout         = btns[3],
        messBtn      = btns[4],
        bubbleBtn    = btns[5],
        selectionBtn = btns[6],
        insertionBtn    = btns[7],
        queue        = document.querySelector("ul");

    addHandler(lin, "click", leftIn);
    addHandler(rin, "click", rightIn);
    addHandler(lout, "click", leftOut);
    addHandler(rout, "click", rightOut);
    addHandler(queue, "click", deleteEle);
    addHandler(messBtn, "click", function() {
        init(queue, lin);
    });
    addHandler(bubbleBtn, "click", function() {
        bubbleSort(queue);
    });
    addHandler(selectionBtn, "click", function() {
        slectionSort(queue);
    });
    addHandler(insertionBtn, "click", function() {
        insertionSort(queue);
    });

    init(queue, lin);
})();

function leftIn() {
    var queue  = document.querySelector("ul"),
        input  = document.querySelector("input"),
        newEle = document.createElement("li"),
        oldEle = queue.querySelectorAll("li")[0],
        temp;

    if(!(temp = transValue(input))) {
        return false;
    }
    newEle.style.height = temp + "px";
    if(queueLength(queue) >= 60) {
        alert("队列满了");
    } else if(!oldEle) {
        queue.appendChild(newEle);
    } else {
        queue.insertBefore(newEle, oldEle);
    }
};

function rightIn() {
    var newEle = document.createElement("li"),
        queue  = document.querySelector("ul"),
        input  = document.querySelector("input"),
        temp;

    if(!(temp = transValue(input))) {
        return false;
    }
    newEle.style.height = temp + "px";
    if(queueLength(queue) >= 60) {
        alert("队列满了");
    } else {
        queue.appendChild(newEle);
    }
};

function leftOut() {
    var queue  = document.querySelector("ul"),
        oldEle = queue.querySelectorAll("li")[0];

    if(!oldEle) {
        alert("队列空了");
    } else {
        alert(oldEle.offsetHeight);
        queue.removeChild(oldEle);
    }
};

function rightOut() {
    var queue  = document.querySelector("ul"),
        oldEle = queue.lastChild;

    if(!oldEle) {
        alert("队列空了");
    } else {
        alert(oldEle.offsetHeight);
        queue.removeChild(oldEle);
    }
};

function deleteEle(event) {
    var oldEle = getTarget(event),
        queue  = document.querySelector("ul");

    if(oldEle.tagName == "LI") {
        queue.removeChild(oldEle);
    }
};

/**
 * the number of elements in queue
 */
function queueLength(queue) {
    return queue.querySelectorAll("li").length;
};

function transValue(input) {
    var result = parseInt(input.value.replace(/\D/g, ""), 10);

    if(result > 100 || result < 10) {
        input.value = "必须为10-100的整数！";
        return false;
    }
    return result;
};

function swap(ele1, ele2) {
    var temp = ele1.offsetHeight;

    ele1.offsetHeight = ele2.offsetHeight;
    ele1.style.height = ele2.offsetHeight + "px";
    ele2.offsetHeight = temp;
    ele2.style.height = temp + "px";

    // 如果只是相邻元素swap，可以使用下面这个方法直接交换dom元素
    // 但是考虑到非冒泡排序算法使用swap时不一定是交换相邻元素(比
    // 如插入排序)，所以使用交换高度的方法。注意ele.style.height
    // 和ele.offsetHeight都需要互换

    // ele1.parentNode.insertBefore(ele2, ele1);
};

function bubbleSort(queue) {
    var eles = queue.querySelectorAll("li"),
        len  = eles.length, i, j = 0, delay = 50, timer;

    i = len - 1;
    timer = setInterval(function() {
        if(i < 1) {
            clearInterval(timer);
        }
        if(j == i) {
            --i;
            j = 0;
        }
        if (eles[j].offsetHeight > eles[j+1].offsetHeight) {
            swap(eles[j], eles[j+1]);
        }
        ++j;
    }, delay);
};

function slectionSort(queue) {
    var eles = queue.querySelectorAll("li"),
        len  = eles.length, i = 0, j = 1, min = 0, delay = 50, timer;

    timer = setInterval(function() {
        if(i == len - 1) {
            clearInterval(timer);
        }
        if(j == len) {
            swap(eles[i], eles[min]);
            ++i;
            min = i;
            j = i + 1;
        }
        if(eles[j] && eles[j].offsetHeight < eles[min].offsetHeight) {
            min = j;
        }
        ++j;
    }, delay);
};

/**
 * 用两个变量控制内外循环
 */
function insertionSort(queue) {
    var eles = queue.querySelectorAll("li"),
        len  = eles.length,
        temp, i = 1, j = 0, timer, delay = 100, outer = true, inner = false;

    timer = setInterval(function() {
        if(outer) {
            if(i == len) {
                clearInterval(timer);
                return ;
            }
            if(eles[i].offsetHeight < eles[i-1].offsetHeight) {
                temp = eles[i].offsetHeight;
                j = i - 1;
                outer = false;
                inner = true;
            } else {
                i++;
            }
        }
        if(inner) {
            if(j < 0 || eles[j].offsetHeight < temp) {
                eles[j+1].style.height = temp + "px";
                eles[j+1].offsetHeight = temp;
                i++;
                inner = false;
                outer = true;
            } else {
                eles[j+1].style.height = eles[j].style.height;
                eles[j+1].offsetHeight = eles[j].offsetHeight;
                j--;
            }
        }
    }, delay);
};







(function() {
    //获取元素
    let input_container = document.getElementById('input-container'),
        left_in = document.getElementById('left-in'),
        right_in = document.getElementById('right-in'),
        left_out = document.getElementById('left-out'),
        right_out = document.getElementById('right-out'),
        sort_btn = document.getElementById('sort-btn'),
        data_container = document.querySelector('#data-list ul');

    // 初始化数字列表数据
    let data_queue = [34,79,64,10,20,14,50];

    // 初始化渲染列表
    initRender(data_container,data_queue);

    // 灰置添加删除按钮
    function unclickable() {
        left_in.setAttribute('disabled','true');
        right_in.setAttribute('disabled','true');
        left_out.setAttribute('disabled','true');
        right_out.setAttribute('disabled','true');
    };

    function clickable() {
        left_in.removeAttribute('disabled');
        right_in.removeAttribute('disabled');
        left_out.removeAttribute('disabled');
        right_out.removeAttribute('disabled');
    };

    //////////
    // 事件绑定 //
    //////////

    // 队列元素点击事件代理
    data_container.addEventListener("click",e => {
      if(e.target && e.target.nodeName.toUpperCase() == "LI") {
          let node_index;
          let data_list = data_container.children;
          for(let i = 0; i < data_list.length; i++){
              if(data_list[i] == e.target){
                  node_index = i;
                  break;
              }
          }
          if(node_index >= 0){
              data_queue.splice(node_index,1);
              data_container.removeChild(e.target);
              alert('移除元素内数值为 ' + e.target.dataset.number + ', 位置为为 ' + (++node_index));
          }else{
              alert('移除元素失败');
              console.error('移除元素失败');
          }
      }
    });

    // 左侧入
    left_in.addEventListener('click',() => {
        const data = getInputValue(input_container);
        queue_unshift(data_container,data,data_queue);
    });

    // 右侧入
    right_in.addEventListener('click',() => {
        const data = getInputValue(input_container);
        queue_push(data_container,data,data_queue);
    });

    // 左侧出
    left_out.addEventListener('click',() => {
        queue_shift(data_container,data_queue);
    });

    // 右侧出
    right_out.addEventListener('click',() => {
        queue_pop(data_container,data_queue);
    });

    // 插入排序
    sort_btn.addEventListener('click',() => {
        unclickable();
        insertionSort(data_container,data_queue,clickable);
    });
}())

/**
 * 创建数据列表元素结点
 * @param  {Number} data 数字数据
 * @return {Object}      节点对象
 */
function _createItemElement(data) {
    let node = document.createElement("li");
    node.className = "data-list__item";
    node.setAttribute("data-number",data);
    node.setAttribute("title",data);
    node.style.height = data * 5 + 'px';
    return node;
}

/**
 * 初始化数据列表dom
 * @param  {Object}     list_element 数据列表容器元素对象
 * @param  {Array}      data_queue   数据列表
 * @return {Boolean}                      运行是否成功
 */
function initRender(list_element,data_queue) {
    if(data_queue.length >= 0){
        data_queue.map(data => {
            let node = _createItemElement(data);
            list_element.appendChild(node);
        });
        return true;
    }else{
        alert('初始化列表出错，列表格式错误');
        console.error('初始化列表出错，列表格式错误');
        return false;
    }
}

/**
 * 向列表头部添加新的数据
 * @param  {Object} list_element 数据列表容器元素对象
 * @param  {Number} data         添加的数据
 * @param  {Array} data_queue    数据列表
 * @return {Array}              新的数据列表
 */
function queue_unshift(list_element,data,data_queue) {
    if(data_queue.length >= 60){
        alert('列表元素上限为60个，添加元素失败');
        return data_queue;
    }
    if(data){
        data_queue.unshift(data);
        let node = _createItemElement(data);
        list_element.insertBefore(node,list_element.getElementsByTagName('li')[0]);
        return data_queue;
    }
    return data_queue;
}

/**
 * 向列表尾部添加新的数据
 * @param  {Object} list_element 数据列表容器元素对象
 * @param  {Number} data         添加的数据
 * @param  {Array} data_queue    数据列表
 * @return {Array}              新的数据列表
 */
function queue_push(list_element,data,data_queue) {
    if(data_queue.length >= 60){
        alert('列表元素上限为60个，添加元素失败');
        return data_queue;
    }
    if(data){
        data_queue.push(data);
        let node = _createItemElement(data);
        list_element.appendChild(node);
        return data_queue;
    }
    return data_queue;
}

/**
 * 移除列表头部数据
 * @param  {Object} list_element 数据列表容器元素对象
 * @param  {Array} data_queue    数据列表
 * @return {Array}              新的数据列表
 */
function queue_shift(list_element,data_queue) {
    let length = data_queue.length;
    if(length == 0){
        alert('列表已空，移除失败');
        console.error('列表已空，移除失败');
        return data_queue;
    }else{
        alert('移除的元素内数值为: ' + data_queue[0]);
        data_queue.shift();
        list_element.removeChild(list_element.children[0]);
        return data_queue;
    }
}

/**
 * 移除列表尾部数据
 * @param  {Object} list_element 数据列表容器元素对象
 * @param  {Array} data_queue    数据列表
 * @return {Array}              新的数据列表
 */
function queue_pop(list_element,data_queue) {
    let length = data_queue.length;
    if(length == 0){
        alert('列表已空，移除失败');
        console.error('列表已空，移除失败');
        return data_queue;
    }else{
        alert('移除的元素内数值为: ' + data_queue[length - 1]);
        data_queue.pop();
        list_element.removeChild(list_element.children[length - 1]);
        return data_queue;
    }
}

/**
 * 获取Input里的数据
 * @param  {Object} element 元素对象
 * @return {Number}         输入框数据
 */
function getInputValue(element) {
    let data = Number(element.value);
    if(!data){
        alert('请在输入框内填入数据');
        console.error('请在输入框内填入数据');
        return null;
    }else if(data < 10 || data >100){
        alert('请输入10 - 100 范围内的数字。');
        console.error('请输入10 - 100 范围内的数字。');
        return null;
    }else{
        return data;
    }
}

/**
 * 插入排序
 * @param  {Object} list_element 数据列表容器元素对象
 * @param  {Array} data_queue    数据列表
 * @param  {Function}   cb       回调
 * @return {[type]}              [description]
 */
function insertionSort(list_element,data_queue,cb) {
    let length = data_queue.length,
        ele_arr = list_element.children,
        i = 0,
        temp,
        j;

    let animation = setInterval(() => {
        if(i >= length){
            cb();
            clearInterval(animation);
            setTimeout(() => {
                for(let n = 0;n < length; n++){
                    ele_arr[n].className = 'data-list__item finish';
                    (function(index){
                        setTimeout(() => {
                            ele_arr[index].className = 'data-list__item';
                        },500);
                    }(n))
                }
            },200);
            return;
        }
        j = i;
        temp = data_queue[i];
        while(j>0 && data_queue[j-1] >= temp){
            list_element.replaceChild(_createItemElement(data_queue[j-1]), ele_arr[j]);
            data_queue[j] = data_queue[j-1];
            ele_arr[j].className = 'data-list__item change';
            (function(index){
                setTimeout(() => {
                    ele_arr[index].className = 'data-list__item';
                },200);
            }(j))
            j--;
        }
        list_element.replaceChild(_createItemElement(temp), ele_arr[j]);
        data_queue[j] = temp;
        i++;
    },200);
}







 $ = function (el) { return document.querySelector(el); };
    $$ = function (el) { return document.querySelectorAll(el); };
    var data = [];
    var sizeFactor = 5; // 大，大，大
    var aniQue = delay(function(){}, 0); // = animationQueue
    var inAnimation = false; // true: 不要动，举起手来，离开鼠标和键盘
    var renderInterval = 150; // 设成10才是真快感

    /* delay还是queue？ */
    function delay(fn, t) {
      var queue = [], self, timer;
      function schedule(fn, t) {
        timer = setTimeout(function() {
          timer = null;
          fn();
          if (queue.length) {
            var next = queue.shift();
            schedule(next.fn, next.t);
          }
        }, t);
      }
      self = {
        delay: function(fn, t) {
          if (queue.length || timer) {
            queue.push({fn: fn, t: t});
          } else {
            schedule(fn, t);
          }
          return self;
        },
        cancel: function() {
          clearTimeout(timer);
          queue = [];
        }
      }
      return self.delay(fn, t);
    }

    /* 为什么你怎么快 */
    function sort_partition(left, right) {
      var p = data[left];
      renderSortRange(left, right, false);
      while (left < right) {
        renderSort(right);
        while (left < right && data[right] >= p) {
          right--;
          renderSort(right);
        }
        data[left] = data[right];
        renderSort(left, data[left]);
        while (left < right && data[left] <= p) {
          left++;
          renderSort(left);
        }
        data[right] = data[left];
        renderSort(right, data[right]);
      }
      data[left] = p
      renderSort(left, data[left]);
      renderSortRange(left, right, true);
      return left;
    }

    /* 为什么你怎么快 */
    function sort(left, right) {
      if (left >= right) return;

      var idx = sort_partition(left, right);
      if (left < idx - 1) {
        sort(left, idx - 1);
      }
      if (idx < right) {
        sort(idx + 1, right);
      }
    }

    /* 动起来，哈压库哈压库 */
    function renderSort(idx, value) {
      aniQue.delay(function() {
        $$('#result div')[idx].className = 'blue';
      }, 0);

      if (value != null) {
        aniQue.delay(function() {
          $$('#result div')[idx].style.height = value * sizeFactor + 'px';
          $$('#result div')[idx].title = value.toString();
        }, 0);
      }

      aniQue.delay(function() {
        $$('#result div')[idx].className = 'red';
      }, renderInterval);
    }

    /* 就决定排你们了 */
    function renderSortRange(start, end, cancel) {
      aniQue.delay(function() {
        for (var i = start; i <= end; i++) {
          $$('#result div')[i].className = cancel ? 'red' : 'green';
        }
      }, 0);
    }

    /* 天赐神数 */
    function randomForTest() {
      if (inAnimation) {
        alert('in animation');
        return;
      }
      data = [];
      for (var i = 0; i < 50; i++) {
        data.push(Math.floor(Math.random() * 91 + 10));
      }
      render();
    }

    /* 我要看所有的 */
    function render() {
      $('#result').innerHTML =
        data.map(function(d) { return "<div class='red' style='height:" + d * sizeFactor + "px' title='" + d + "'></div>"; })
          .join('');
    }

    /* 帮我绑定好回调。sort和random要插进去就太丑了，暂时舍弃 */
    function deal(func, succ) {
      var args = [].slice.call(arguments, 2);
      return function(e) {
        if (inAnimation) {
          alert('in animation');
          return;
        }

        try {
          var arg = args.map(function(item) {
            return typeof item === "function" ? item(e) : item;
          });
          var result = func.apply(data, arg);

          if (succ != null) {
            succ(result);
          }
        } catch (ex) {
          if (ex.message != '')
            alert(ex.message);
        }
        render();
      };
    }

    /* 你输了什么？ */
    function getInputValue() {
      var numStr = $('input').value;
      if (!validateStr(numStr)) throw new Error('input error');
      if (data.length > 59) throw new Error('no room');
      var val = parseInt(numStr);
      if (val < 10 || val > 100) throw new Error('out of range');
      return val;
    }

    /* 你单击了什么？ */
    function getClickIndex(e) {
      var node = e.target;
      if (node.id == "result") throw new Error(''); // 中断你们，破坏流程，毁灭世界
      return [].indexOf.call(node.parentNode.children, node);
    }

    /* 不要太勤奋，lazy */
    function getLastIndex() {
      return data.length - 1;
    }

    /* 过滤掉万恶的QA和小白 */
    function validateStr(str) {
      return /\d+/.test(str);
    }

    /* 全部都绑起来 */
    $('#left-in').onclick = deal([].unshift, null, getInputValue);
    $('#right-in').onclick = deal([].push, null, getInputValue);
    $('#left-out').onclick = deal([].shift, window.alert);
    $('#right-out').onclick = deal([].pop, window.alert);
    $('#result').onclick = deal([].splice, null, getClickIndex, 1);
    $('#sort').onclick = function(){
      if (inAnimation) {
        alert('in animation');
        return;
      }
      inAnimation = true;
      renderInterval = parseInt($('#renderInterval').value);
      renderInterval = renderInterval || 150;
      sort(0, getLastIndex());
      aniQue.delay(function(){
        inAnimation = false;
      }, 0);
    };
    $('#random').onclick = randomForTest;








function updata(){
		container.innerHTML="";
		for(i=0;i<=data.length-1;i++){
			var lielement=document.createElement("li");
			lielement.innerText=data[i];
			lielement.style.height=data[i]*1.6;
			lielement.style.backgroundColor=rancolor();
			lielement.setAttribute("id","li-"+i);
			container.appendChild(lielement);
		}
		document.getElementById("inputbox").value="";
	}


	
    document.getElementById("sortdata").onclick=function(){
		var i = 0,j = 1,temp;
				len = data.length;
				timer = null;
		timer = setInterval(run,25);
		function run() {
			if (i < len) {
				if (j < len) {
					if (data[i] > data[j]) {
						temp = data[i];
						data[i] = data[j];
						data[j] = temp;
						updata();
					}
					j++;
				} else {
					i++;
					j = i + 1;
				}
			} else {
				clearInterval(timer);
				return;
			}
		}