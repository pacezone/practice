/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-18 14:12:56
 * @version $Id$
 */

function uniqArray(arr) {
	arr = arr || [];
	var a = {};
	len = arr.length;
	for (var i = 0; i < len; i++) {
		var v = arr[i];
		
		if (typeof(a[v]) == 'undefined') {
			a[v] = 1;
		};
		// console.log(a[v]);
	};
	arr.length = 0;
	
	for (var i in a) {
		arr[arr.length] = i
		// console.log(v);
	}
	return arr;
}


function uniqArray2(arr)
{
	var n = {},r=[]; //n为hash表，r为临时数组
	for(var i = 0; i < arr.length; i++) //遍历当前数组
	{
		console.log(n[arr[i]]);
		if (!n[arr[i]]) //如果hash表中没有当前项
		{
			n[arr[i]] = true; //存入hash表
			r.push(arr[i]); //把当前数组的当前项push到临时数组里面
		}
	}
	return r;
}




var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray2(a);
console.log(b);

