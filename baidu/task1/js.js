/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-12-24 17:19:31
 * @version $Id$
 */

// function isArray (arr) {
// 	var result = arr instanceof Array;
// 	console.log(result);
// }
// var a = new Function();
// function isFunction (fn) {
// 	var result = fn instanceof Function;
// 	console.log(result);
// }

function cloneObject(src) {
	var result,objType;
	objType = function (obj) {
		if (obj === null) {
			return "Null"
		};
		if (obj === undefined) {
			return "Undefined"
		};
		return Object.prototype.toString.call(obj);
	}
	
	for(i in src) {
		if (objType(src) ==="[object Array]") {
			result = [];
			result[i] = cloneObject(src[i]);
		} else if (objType(src) === "[object Object]") {
			result = {};
			result[i] = cloneObject(src[i]);
		} else {
			result = src[i]; 
		}
	}
	return result;
}

var srcObj = {
	a: 1,
	b: {
		b1: ["hello", "hi"],
		b2: "javascript"
	}
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);
srcObj.a = 2;
srcObj.b.b1[0] = "Hello";
console.log(abObj.a);
console.log(abObj.b.b1[0]);
console.log(tarObj.a);
console.log(tarObj.b.b1[0]);


window.onload = function(){
	
}