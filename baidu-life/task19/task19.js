/**
 * 
 * @authors pace Zhou (wweymgfz@163.com)
 * @date    2017-02-10 18:52:18
 * @version 001
 */
function list(arr) {
	this.arr = arr;

}
var $=function(el){
	return document.getElementById(el)
}
list.prototype = {
	randomNum:function(){
		var arr = [];
		var str='';
		for (var i=0;i<25;i++) {
			var number = parseInt((Math.random()+0.15)*85);
			arr.push(number);
		str += ('<span style="height:'+(number*2)+'px">'+number+'</span>');
		}
		$('show').innerHTML = str;
	}
};
var list = new list(arr)


$('randomNum').onclick = function() {
	list.randomNum()
}

var arr = $('show').getElementsByTagName('span');

function getArr(arr) {
	var getArr = [];
	for (var i = 0; i < arr.length; i++) {
		getArr[i] = parseInt(arr[i].style.height.replace(/px/g,''));
		
	}
	return getArr;
}

function swap(el1,el2) {
	var d = el1.style.height;
	el1.style.height = el2.style.height;
	el2.style.height = d;
	
}
var timer;
function bubbleSort(arr,numArr){
	var z = j+1;
	var j =0;
	var len = 5;
	timer = setInterval(function(){
		if (len>0&&j<len) {
			if (numArr[j]>numArr[z]) {
				swap(arr[j],arr[z]);
			};
			j++;
		}
		if(j===(len-1)) {
			j = 0;
			--len;
		}
		if (len===0) {
			clearInterval(timer)
		}
	},50)
	
}
function selectSort(arr,numArr){

}

$('bubble').onclick = function() {

	bubbleSort(arr,getArr(arr));
	
}