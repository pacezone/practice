/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-09 19:34:40
 * @version $Id$
 */
// window.onload = function() {
// 	var list = {

// 	}
// }


// function appendBefor(parentNode,targetNode) {
// 	parentNode.insertBefore(targetNode,parentNode.firstChild)
// }


// $('leftIn').addEventListener('click',function(){
// 	appendBefor($('show'),testNum());
// }) 
	
// $('rightIn').onclick = function(){
// 	var number = $('input').value;
// 	$('show').appendChild(testNum())
// }
// $('leftRemove').onclick = function() {
// 	$('show').removeChild($('show').getElementsByTagName('span')[0]);
// }
// $('rightRemove').onclick = function() {
// 	var len = $('show').getElementsByTagName('span').length;
// 	$('show').removeChild($('show').getElementsByTagName('span')[len-1]);
// }


// var testNum = function () {
// 	var newNum;
// 	var number = $('input').value;
// 	var reg = new RegExp('^[0-9]*?$');
// 	if (!reg.test(number)) return;
// 	newNum = newNum||document.createElement('span');
// 	newNum.innerHTML = number;
// 	return newNum;
// };
function $(id){
	var reselt={};
	reselt = document.getElementById(id);
	return reselt;
}
var input = document.getElementById('input');
var btn = document.getElementsByTagName('button');
function addEvent(element,event,listener) {
	if (element.addEventListener) {
		element.addEventListener(event,listener,false)
	} else if (element.attchEvend) {
		element.attchEvend('on'+event,listener)
	} else {
		element['on'+event] = listener;
	}
}
function each(arr, fn) {
    for (var cur = 0; cur < arr.length; cur++) {
        fn(arr[cur], cur);
    }
}

window.onload = function (){
	var list = {
		str:[],
		leftIn:function(num) {
			this.str.unshift(num);
			this.paint();
		},
		rigthIn:function(num){
			this.str.push(num);
			this.paint();
		},
		leftRemove:function(){
			this.str.splice(0,1);
			this.paint();
		},
		rigthRemove:function(){
			this.str.pop();
			this.paint();
		},
		paint:function() {
			var str='';
			this.str.sort();
			each(this.str,function(item){
				str += ('<span>'+parseInt(item)+'</span>');
			});
			$('show').innerHTML = str;
			console.log($('show'))
			delEvent($('show').childNodes);
		},
		delNum:function(id) {
			this.str.splice(id,1);
			console.log(this.str);
			this.paint();
		},

	}


	function delEvent(arr){
		for (var i = 0;i<arr.length;i++) {
			addEvent(arr[i],'click',function(i){
				return function(){
					return list.delNum(i);
				}
			}(i))
		}
	}
	var testNum = function () {
		var newNum;
		var number = $('input').value;
		var reg = new RegExp('^[0-9]*?$');
		if (!reg.test(number)) return;
		// newNum = newNum||"";
		return newNum;
	};


	function isRoght(){
		var number = $('input').value;
		var reg = new RegExp('^[0-9]*?$');
		if (reg.test(number) && number.length>0) {
			return number;
		} else {
			alert('pleace input the right number')
		}
	}
	addEvent(btn[0],'click',function(){
		list.leftIn(isRoght());
		
	});
	addEvent(btn[1],'click',function(){
		var number = input.value;
		var reg = new RegExp('^[0-9]*?$');
		if (reg.test(number) && number.length>0) {
			list.rigthIn(number);
		} else {
			alert('pleace input the right number')
		}
	})
	addEvent(btn[2],'click',function(){
		list.leftRemove();
	})
	addEvent(btn[3],'click',function(){
		list.rightRemove();
	})

}


// $('leftIn').onclick = function() {
// 	var number = input.value;
// 	if (number.length === 0) return;
// 	str.push(number);
// 	var bb="";
// 	each(str,function(item){bb += ("<span>" + item +"</span>");})
// 	$('show').innerHTML = bb;
// 	// each(str,function(item){str += ("<div>" + parseInt(item) + "</div>")})
	
// }

