/**
 * 

 * @authors Your Name (you@example.org)
 * @date    2016-08-02 17:25:16
 * @version $Id$
 */
window.onload = function() {
	var b = new Array();
	isArray(b);
	isFunction(b);
	simpleTrim(str1);
	
}
function isArray(arr) {
	var aaa = arr instanceof Array;
	// console.log(aaa)
}
function isFunction(fn) {
	var aaa = fn instanceof Function;
	// console.log(aaa)
}


//ex1;

function cloneObject(src) {
	if (src instanceof Function || src instanceof RegExp) {
		return;
	} else {
		var result = src instanceof Array ? [] : {};
		
	}
   	
   	for (var key in src) {
   		if (typeof src[key] == 'object') {
   			result[key] = cloneObject(src[key]);
   		} else {
   			result[key] = src[key];
   		}
   		
   	}
   	return result;
}


var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

// console.log(abObj.a);
// console.log(abObj.b.b1[0]);

// console.log(tarObj.a);      // 1
// console.log(tarObj.b.b1[0]);    // "hello"

//ex 2;




// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
    	if (result.indexOf(arr[i]) == '-1') {
    		result.push(arr[i]);
    	} 
    }
    return result;
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
// console.log(b); // [1, 3, 5, 7]

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，
//并且删掉他们，最后返回一个完成去除的字符串d
var str1 = '   hi!  ';
function simpleTrim(str) {
   var i;
   var j;
   for (i = 0; i < str.length; i++) {
   	    if (str.charAt(i) !== ' '&&str.charAt(i)!=='/t') {

   	   	   break;
   	    }
   }

   for (j = str.length - 1; j >= 0; j--) {
   	    if (str.charAt(j) !== ' '&&str.charAt(j)!=='/t') {
   	    	
   	   	   break;
   	    } 
   }
   return  str.slice(i, j+1);
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
}

// 使用示例
var str = '   hi!  ';
str = trim(str);

// console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (key in arr) {
    	fn(arr[key],key)
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    // console.log(item)
}
each(arr, output);  // java, c, php, html

//使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    // console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	return Object.keys(obj).length;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3



// 判断是否为邮箱地址
function isEmail(emailStr) {
    var reg =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return reg.test(emailStr);
}
console.log(isEmail('a1111'))

// 判断是否为手机号
function isMobilePhone(phone) {
    var reg =  /^((\d3)|(\d{3}\-))?13[0-9]\d{8}|15[89]\d{8}/;
    return reg.test(phone);
}



// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
  var oldClassName = element.className;
  element.className = oldClassName === ''? newClassName: newClassName+' '+oldClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var originClass = element.className;
    var reg = new RegExp('\\b' + oldClassName + '\\b');
    element.className = originClass.replace(reg, '');
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
	return element.parentNode === siblingNode.parentNode;
	
    
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var offsetLeft = function () {
    	var actrualLeft = element.offsetLeft;
    	var current = element.offsetParent;
    	while (current !== null) {
    		actrualLeft += current.offsetLeft;
    		current = current.offsetParent;
    	} 
    	return actrualLeft;
    }
    var offsetTop = function () {
    	var actrualTop = element.offsetTop;
    	var current = element.offsetParent;
    	while (current !== null) {
    		actrualTop += current.offsetTop;
    		current = current.offsetParent;
    	}
    	return actrualTop;
    }
    var borderLeft = parseInt(element.style.borderLeft);
    var borderTop = parseInt(element.style.borderTop);
    var scrollTop = parseInt(element.scrollTop);
    var scrollLeft = parseInt(element.scrollLeft);
    return {
    	x: parseInt(offsetLeft) - scrollLeft + borderLeft,
    	y: parseInt(offsetTop) - scrollTop + borderTop
    }
}



function $(selector) {
    var allTag = document.body.getElementsByTagName('*');
    var getId = function(id) {
       return document.getElementById(id);
    }
    var getClass = function(className, parentNode) {
      var node = null;
      if (parentNode != undefined) {
        node = parentNode;
      } else {
        node = document.body
      }
      var classTag = node.getElementsByTagName('*');

      for (var i = 0; i < classTag.length; i++) {
        if (classTag[i].getAttribute('class') == className){    
          return classTag[i];
        }
      }
    }
    var getAtrr = function(attrName) {
      for (var i = 0; i < allTag.length; i++) {
        if (allTag[i].getAttribute(attrName)=='') {
          return allTag[i];
        }
      }
    }
    var getAtrrName = function(attrName, name) {
  

      for (var i = 0; i < allTag.length; i++) {
        if (allTag[i].getAttribute(attrName)==name) {
          return allTag[i];
        }
      }
    }

    if (selector.charAt(0) == '#') {
       if (selector.indexOf('.')=='-1') {
        return document.getElementById(selector.slice(1));;
       } else {
        var temps = selector.split(' ');
        var parentNode = document.getElementById(temps[0].slice(1));
        return getClass(temps[1].slice(1), parentNode);
       }
    } else if (selector.charAt(0) == '.') {
      return getClass(selector.slice(1));
    } else if (selector.charAt(0) == '[') {
      if (selector.indexOf('=') == '-1') {
        return getAtrr(selector.slice(1, selector.length-1));
      } else {
        var ArrAtrr = selector.slice(1, selector.length-1).split('=');
        return getAtrrName(ArrAtrr[0],ArrAtrr[1]);
      }
      
    } else {
      return document.getElementsByTagName(selector);
    }
}



// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象



// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
      element.addEventListener('event',listener);
    } else if (element.attachEvent) {
      element.attachEvent('on'+event,listener)
    }
}

// 例如：
// function clicklistener(event) {
//     alert('aaaaa')
// }
// addEvent($("#doma"), "click", clicklistener);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
      element.removeEventListener('event',listener);
    } else if (element.detachEvent) {
      element.detachEvent('on'+event,listener);
    }
}


// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element,'click',listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
  addEvent(element,'keydown',function(event){
    if (event.keyCode == '13') {
      listener();
      }
  })
}

$.on = function(selector, event, listener) {
  addEvent($(selector),event,listener)
}
$.click = function(selector, listener) {
     addClickEvent($(selector),listener);
}

$.un = function(selector, event, listener) {
    removeEvent($(selector),event,listener);
}



function clickListener(event) {
    console.log(event);
}

function renderList() {
    $("#list").innerHTML = '<li>new item</li>';
}

// function init() {
//     each($("#list").getElementsByTagName('li'), function(item) {
//         $.click(item, clickListener);
//     });

//     $.click($("#btn"), renderList);
// }
// init();


// $.delegate(selector, tag, event, listener) {
//      addEvent($(selector),event,listener);
// }



// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var agent = navigator.userAgent.toLowerCase();
    if ((agent.indexOf('msie') != '-1')&& (agent.indexOf('opera') != '-1')) {
      return -1;
    } else {
      return 1;
    }
}


// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie = cookieName+ '=' +escape(cookieValue)+
    ((expiredays==null)?'':';expires='+exdate.toGMTString());
}
// 获取cookie值
function getCookie(cookieName) {
    if (document.cookie.length>0) { //是否存在cookie；
      var start = document.cookie.indexOf(cookieName + '=');//确认在cookie的信息中，需要的cookiename位置
      if (start != -1) {
        start = start + cookieName.length+1;
        var end = document.cookie.indexOf(';',start);
        if (end != -1) end = document.cookie.length;
          return unscape(document.cookie.substring(start,end))
      }
    }
    return ' ';
}




function ajax(url, options) {
    var xml = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var dataString = new String();
    if (typeof options.data === 'object') {
      for (var key in options.data) {
        dataString += key+'='+options.data[key]+'$';
        dataString = dataString.substring(1,dataString.length-1)  
      }
    } else {
      dataString = options.data;
    }


    if (options.type == 'GET') {
      xml.open('GET',url+dataString,true);
      xml.send(null);
      
    } else {
      xml.open('POST',url,true);
      xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xml.send(dataString);
    }
    
    xml.onreadystatechange = function() {
      if (xml.readyState == 4 && xml.status == 200) {
        options.onsuccess(xml.responseText, xml.responseXML)
      } else {
        options.onfail(request.responseText)
      }
    }  
}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);
