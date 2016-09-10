/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-05 14:21:27
 * @version $Id$
 */
 var a = $('#111')
console.log(a)
 var dom = [];  
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




 
 //别人的代码，，感觉很高深

    function $(selector) {
    var idReg = /^#([\w_\-]+)/;
    var classReg = /^\.([\w_\-]+)/;
    var tagReg = /^\w+$/i;
    // [data-log]
    // [data-log="test"]
    // [data-log=test]
    // [data-log='test']
    var attrReg = /(\w+)?\[([^=\]]+)(?:=(["'])?([^\]"']+)\3?)?\]/;

    // 不考虑'>' 、`~`等嵌套关系
    // 父子选择器之间用空格相隔
    var context = document;

    function blank() {}

    function direct(part, actions) {
        actions = actions || {
            id: blank,
            className: blank,
            tag: blank,
            attribute: blank
        };
        var fn;
        var params = [].slice.call(arguments, 2);
        // id
        if (result = part.match(idReg)) {
            fn = 'id';
            params.push(result[1]);
        }
        // class
        else if (result = part.match(classReg)) {
            fn = 'className';
            params.push(result[1]);
        }
        // tag
        else if (result = part.match(tagReg)) {
            fn = 'tag';
            params.push(result[0]);
        }
        // attribute
        else if (result = part.match(attrReg)) {
            fn = 'attribute';
            var tag = result[1];
            var key = result[2];
            var value = result[4];
            params.push(tag, key, value);
        }
        return actions[fn].apply(null, params);
    }

    function find(parts, context) {
        var part = parts.pop();

        var actions = {
            id: function (id) {
                return [
                    document.getElementById(id)
                ];
            },
            className: function (className) {
                var result = [];
                if (context.getElementsByClassName) {
                    result = context.getElementsByClassName(className)
                }
                else {
                    var temp = context.getElementsByTagName('*');
                    for (var i = 0, len = temp.length; i < len; i++) {
                        var node = temp[i];
                        if (hasClass(node, className)) {
                            result.push(node);
                        }
                    }
                }
                return result;
            },
            tag: function (tag) {
                return context.getElementsByTagName(tag);
            },
            attribute: function (tag, key, value) {
                var result = [];
                var temp = context.getElementsByTagName(tag || '*');

                for (var i = 0, len = temp.length; i < len; i++) {
                    var node = temp[i];
                    if (value) {
                        var v = node.getAttribute(key);
                        (v === value) && result.push(node);
                    }
                    else if (node.hasAttribute(key)) {
                        result.push(node);
                    }
                }
                return result;
            }
        };

        var ret = direct(part, actions);

        // to array
        ret = [].slice.call(ret);

        return parts[0] && ret[0] ? filterParents(parts, ret) : ret;
    }

    function filterParents(parts, ret) {
        var parentPart = parts.pop();
        var result = [];

        for (var i = 0, len = ret.length; i < len; i++) {
            var node = ret[i];
            var p = node;

            while (p = p.parentNode) {
                var actions = {
                    id: function (el, id) {
                        return (el.id === id);
                    },
                    className: function (el, className) {
                         return hasClass(el, className);
                    },
                    tag: function (el, tag) {
                        return (el.tagName.toLowerCase() === tag);
                    },
                    attribute: function (el, tag, key, value) {
                        var valid = true;
                        if (tag) {
                            valid = actions.tag(el, tag);
                        }
                        valid = valid && el.hasAttribute(key);
                        if (value) {
                            valid = valid && (value === el.getAttribute(key))
                        }
                        return valid;
                    }
                };
                var matches = direct(parentPart, actions, p);

                if (matches) {
                    break;
                }
            }

            if (matches) {
                result.push(node);
            }
        }

        return parts[0] && result[0] ? filterParents(parts, result) : result;
    }

    var result = find(selector.split(/\s+/), context);

    return result;
}



//感觉以上有参考这个的感觉，，，再看看思路

(function(){
 var doc = document,
 REG_ID = /^#[w-]+$/,
 REG_QUERY = /^(:?#([w-]+))?s*([w-]+|*)?.?([w-]+)?$/;

//将封装好的默认函数在进行集中处理，用正则来区分传入的selector
 function query(selector,content){
 var match, ret = [], id, tag, cls ,t;
 content = tuneContent(content);

if(isString(selector)){
 selector = trim(selector);


//如果传入的是id，那么就直接用封装好的getElementById
if(REG_ID.test(selector)){
 t = getElementById(selector.slice(1),content);
 if(t) ret = [t];//返回数组

//exec返回第一个匹配的字符串，和所有分组的反向引用（即正则中括号包裹的部分）
 }else if((match = REG_QUERY.exec(selector))){
 id = match[1];
 tag = match[2];
 cls = match[3];



//如果获取到的反向引用中有id，那么将content设为根据id获取到的元素，
//否则仍旧为tuneContent调整后的值
 if(content = id ? getElementById(id,content) : content){




//如果有class
if(cls){





//如果没有id并且传入的selector参数中有空格，即排除#id.cls
 if(!id && selector.indexOf("") !== -1){






//那么使用封装好的getElementsByClassName来获取元素
 ret = getElementsByClassName(cls,tag,content);
}else{
 //处理#id.cls 这个selector参数应该表示的是#id并且这个id的className值为cls

//那么先根据id取到元素，在判断取到的这个元素的className是否含有cls
 t = getElementById(id,content);
 if(t && hacClass(t,cls)){
 ret = [t];
}
}
 }else if(tag){//如果有tag


//那么直接用原生的getElementsByTagName来获取元素
 ret = content.getElementsByTagName(tag);
}
}
}
}
 return ret;
}

 function get(){
 return query(selector,content)[0];
}

//将content调整到一个合理的值
 function tuneContent(content){

//如果content未定义，那么content=doc
 if(content === undefined){
 content = doc;

//如果content是个id，那么content=根据id获取到元素
 }else if(isString(content) && REG_ID.test(content)){
 content = getElementById(content.slice(1),doc);

//如果content即不是元素或者不是doc文档类型，那么content=null
 }else if(content && content.nodeType !== 1 && content.nodeType !==9){
 content = null;
}

 return content;

}


//封装默认的getElementById函数
 function getElementById(el,content){
 if(content.nodeType !== 9){
 content = content.ownerDocument;
}
 return content.getElementById(el);
}


//封装默认的getElementsByClassName函数（高级浏览器才有这个默认函数）
 function getElementsByClassName(cls,tag,content){
 if(!cls) return;
 var els = content.getElementsByClassName(cls),
 ret = els,j=0;



//根据传入的tag筛选获取到的元素
 if(tag && tag !="*"){
 ret = [];
 for(var i = 0,len = els.length;i<len;i++){
 el = els[i];
 if(el.tagName == tag.toUpperCase()){
 ret[j++] = el;
}
}
}
 return ret;
}



//如果不支持getElementsByClassName，则降级使用querySelectorAll，

//再不支持，则先根据tag获取到元素，在遍历这些元素，看这些元素的className是否含有传入的className值
if(!doc.getElementsByClassName){
if(doc.querySelectorAll){
 getElementsByClassName = function(cls,tag,content){
 return content.querySelectorAll((tag ? tag :"") +"."+ cls);
}
}else{
 getElementsByClassName = function(cls,tag,content){
 var els = content.getElementsByTagName(tag),
 ret = [],j=0,cls =""+cls+"";
 for(var i = 0,len = els.length;i<len;i++){
 var el = els[i],t = el.className;
 if(t && hasClass(el,cls)){
 ret[j++] = el;
}
}
 return ret;
}
}
}


 function isString(str){
 return str && typeof str ==="string";
}

 function trim(str){
 return str.replace(/(^s*)|(s*$)/g,"");
}

//不支持多个cls同时判断
 function hasClass(el,cls){
 var cls =""+ cls +"",
 elcls =""+ el.className +"";
 return elcls.indexOf(cls) > -1;
}

})();


























function $(selector) {
    var quickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
    var whitespace = "[\\x20\\t\\r\\n\\f]";
    var identifier = "(?:[\\w-])+";
    
    // 属性名匹配结果数组元素1
    var attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
        // 运算符匹配,只考虑等于的简单情况
        "*=" + whitespace +
        // 属性值为字符串('' or "" )或identifier，分别为结果数组元素2, 3, 4
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
        "*\\]";
    var comExpr = "(?:#([\\w-]+)|(\\w+)|\\.([\\w-]+)|(" + attributes + "))";
    var attrExpr = new RegExp("^" + attributes);
    var combine = new RegExp(comExpr + "$");
    var match, m, element, newSelector, n, seed, index;
    //快速匹配id,tag,class
    if (match = quickExpr.exec(selector)) {
        element = quickMatch(match)[0];
    }
    //采用遍历DOM树的方式来查找属性匹配的节点
    else if (match = attrExpr.exec(selector)) {
        element = attrMatch(match)[0];
    }
    //匹配简单组合
    else if (match = combine.exec(selector)) {
        newSelector = selector;  
        //匹配最末尾的选择器,由右至左
        if (m = match[0]) {
            //匹配符合的所有元素
            if (match[1] || match[2] || match[3]) {
                n = quickExpr.exec(m);
                seed = quickMatch(n); 
            }
            else if (match[4]) {
                n = attrExpr.exec(m);
                seed = attrMatch(n);
            }
            //在匹配字符串中删除已匹配的子字符串
            index = newSelector.lastIndexOf(m);
            newSelector = trim(newSelector.substring(0, index));            
            //对元素集筛选
            element = seedFilter(seed, combine, quickExpr, attrExpr, newSelector)[0];
        }
    }
    return element;
}

function quickMatch(match) {
    var m, element;
    var elements = [];
    if (m = match[1]) {
        if ((element = document.getElementById(m)) && element.id === m) {
            elements.push(element);
        }
    } 
    else if (m = match[2]) {
        elements = document.getElementsByTagName(m);
    }
    else if (m = match[3]) {
        elements = getByClassName(m);
    }
    return elements;
}

function getByClassName(str) {
    if (document.getElementsByClassName) { 
        return document.getElementsByClassName(str); 
    }
    else {
        return recursiveTree(document.documentElement,"class", str);
    }
}


        
function attrMatch(match) {
    var attrName, value;
    var elements = [];
    attrName = match[1];
    //匹配有指定值的属性
    if (match[2] || match[3] || match[4]) {
        value = trim(match[2] || match[3] || match[4]);
    }
    //可以调用遍历文档树api--http://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
    if (NodeIterator) {
        var iterator = document.createNodeIterator(document, NodeFilter.SHOW_ELEMENT, null, false);
        var node = iterator.nextNode();
        while (node)
        {
            if (node.hasAttribute(attrName)) {           
                if (value && node.getAttribute(attrName) === value) {
                    elements.push(node);
                }
                else if (!value) {
                    elements.push(node);
                }
            }
            node = iterator.nextNode();       
        }
    }
    //递归遍历文档树
    else {
        elements = recursiveTree(document.documentElement,attrName, value);
    }
    return elements;
}

function recursiveTree(node, attrName, /* option */ attrValue) {
    var children = node.childNodes;
    var elements = [];
    var ele;
    for (var i = 0; i < children.length; i++) {
        if (children[i].nodeType === 1) {
            if (children[i].hasAttribute(attrName)) {
                if (attrName === "class" && children[i].className.indexOf(attrValue) !== -1) {
                    elements.push(children[i]);
                }
                else {
                    if (!attrValue) {
                        elements.push(children[i]);
                    }
                    else if (attrValue && children[i].getAttribute(attrName) === attrValue) {
                        elements.push(children[i]);         
                    }
                }
                
            }
            else {
                if (!attrValue) {
                    ele = recursiveTree(children[i], attrName);    
                }
                else {
                    ele = recursiveTree(children[i], attrName, attrValue);
                }
                for (var j = 0, len = ele.length; j < ele.length; j++){
                    elements.push(ele[j]);
                }
            } 
        }
    }
    return elements;
}
function seedFilter(seed, combine, quickExpr, attrExpr, selector) {
    var newSeed = [];
    var parentND = [], newParentND = [];
    var node, m, newSelector, match, matchFlag, index;
    newSelector = selector;
    //验证完所有过滤条件
    while (newSelector) {
        newSeed = [];
        newParentND = [];
        //取最右边的过滤条件
        match = combine.exec(newSelector);
        //表明过滤条件为父元素{1:id; 2:tag; 3:class; 4:attr;}
        matchFlag = (match[1])?1:(((match[2])?2:(match[3]?3:(match[4]?4:0))));    
        if (m = match[0]) {
            //对已选出的元素逐个验证
            for (var i = 0; i < seed.length; i++) {
                node = seed[i];
                if (parentND[i]) { node = parentND[i];}
                switch (matchFlag) {
                    case 1:
                        while (node.parentNode) {
                            if (node.parentNode.id === match[1]) {
                                //存入该元素
                                newSeed.push(seed[i]);
                                //存入满足条件的父元素以便下一层筛选
                                newParentND.push(node.parentNode);
                                break;
                            }
                            else { node = node.parentNode; }
                        }
                        break;
                    case 2:
                        while (node.parentNode.tagName) {
                            if (node.parentNode.tagName.toLowerCase() === match[2]) {
                                //存入该元素
                                newSeed.push(seed[i]);
                                //存入满足条件的父元素以便下一层筛选
                                newParentND.push(node.parentNode);
                                break;
                            }
                            else { node = node.parentNode; }
                        }
                        break;
                    case 3:
                        while (node.parentNode) {
                            if (node.parentNode.className === match[3]) {
                                //存入该元素
                                newSeed.push(seed[i]);
                                //存入满足条件的父元素以便下一层筛选
                                newParentND.push(node.parentNode);
                                break;
                            }
                            else { node = node.parentNode; }
                        }
                        break;
                    case 4:
                        var value = trim(match[2] || match[3] || match[4]);
                        while (node.parentNode) {
                            if (node.parentNode.hasAttribute(match[4])
                                && (!value || (value && node.parentNode.getAttribute(match[4] === value)))) {
                                //存入该元素
                                newSeed.push(seed[i]);
                                //存入满足条件的父元素以便下一层筛选
                                newParentND.push(node.parentNode);
                                break;
                            }
                            else { node = node.parentNode; }
                        }
                        break;
                } /*swith*/        
                
            } /*for*/
            
        } /*if*/
        else {
            return false;
        }
        //在匹配字符串中删除已匹配的子字符串
        index = newSelector.indexOf(m);
        newSelector = trim(newSelector.substring(0, index));
        //更新seed备选集
        seed = newSeed;
        parentND = newParentND;
    }
    return newSeed;
}