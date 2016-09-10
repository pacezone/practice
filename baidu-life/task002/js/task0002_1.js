/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-16 13:25:29
 * @version $Id$
 */
// window.onload = function() {
//     task1();
// }

var btn = document.getElementById('btn');
var hobby = document.getElementById('hobby');
var textArea = document.getElementById('textArea');
var tip = document.getElementById('tip');
var valArr = [];
var textArr = [];
var getval = function () {
    var val = hobby.value;
    valArr = val.split(',');
    appendVal(unqiArr(valArr));
}  
    
btn.addEventListener('click', getval); 
var textVal = function() {
    var val = textArea.value;
    if (val == '') {
        tip.innerHTML = "请输入您的爱好";
        return;
    } else {
        tip.innerHTML = "";
        var afterVal = val.replace(/\n\t/g,",").replace(/\s/g,",").replace(/；/g,",").replace(/、/g,",").replace(/，/g,",");
        textArr = afterVal.split(',');
        if (unqiArr(textArr).length >2) {
            tip.innerHTML = "您的爱好过多";
            return;
        } else {
            tip.innerHTML = "";
        }
    }
}
btn.addEventListener('click', textVal); 
var insertAfter = function(newElement, targetElement){  
    var parent = targetElement.parentNode;  
    if(parent.lastChild == targetElement){  
        parent.appendChild(newElement);  
    }else{  
        parent.insertBefore(newElement,targetElement.nextSibling);  
    }
}  
var appendVal = function(valArr) {
    var paragraph = document.createElement('p');
    paragraph.innerHTML = valArr;
    insertAfter(paragraph, btn);
}

var unqiArr =  function (arr) {
    var resultArr = [];
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace(/(^\s*)|(\s*$)/g, '');
        if (resultArr.indexOf(arr[i]) == '-1'&& arr[i] != ['']) {
            resultArr.push(arr[i]);
        }
   };
   return resultArr;
}
