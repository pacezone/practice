/**
 * Created by mystery on 2016/3/29.
 * 感谢Steel Team，他们的代码给了我很大的启发
 */

// ==========================================封装TreeNode================================================
function TreeNode(obj) {
    this.parent = obj.parent;
    this.childs = obj.childs || [];
    this.data = obj.data || "";
    this.selfElement = obj.selfElement; // 访问对应的DOM结点
    this.selfElement.TreeNode = this;  // 对应的DOM结点访问回来
}
// 原型模式封装公共操作
TreeNode.prototype = {
    constructor: TreeNode,
    // 解耦样式操作，四个参数表示是否改变箭头、可见性、改为高亮、改为普通，后两个参数可省略
    render: function (arrow, visibility, toHighlight, deHighlight) {
        if (arguments.length < 3) {
            toHighlight = false;
            deHighlight = false;
        }
        if (arrow) {
            if (this.isLeaf()) { // 是个叶节点，设为空箭头
                this.selfElement.getElementsByClassName("arrow")[0].className = "arrow empty-arrow";
            }
            else if (this.isFolded()) { // 折叠状态，设为右箭头
                this.selfElement.getElementsByClassName("arrow")[0].className = "arrow right-arrow";
            }
            else { // 展开状态，设为下箭头
                this.selfElement.getElementsByClassName("arrow")[0].className = "arrow down-arrow";
            }
        }
        if (visibility) { // 改变可见性
            if (this.selfElement.className.indexOf("nodebody-visible") == -1) { // 本不可见，改为可见
                this.selfElement.className = this.selfElement.className.replace("hidden", "visible");
            }
            else { //改为不可见
                this.selfElement.className = this.selfElement.className.replace("visible", "hidden");
            }
        }
        if (toHighlight) { // 设为高亮
            this.selfElement.getElementsByClassName("node-title")[0].className = "node-title node-title-highlight";
        }
        if (deHighlight) { // 取消高亮
            this.selfElement.getElementsByClassName("node-title")[0].className = "node-title";
        }
    },
    // 删除结点，DOM会自动递归删除子节点，TreeNode递归手动删除子节点
    deleteNode: function () {
        var i;
        // 递归删除子节点
        if(!this.isLeaf()){
            for(i=0;i<this.childs.length;i++){
                this.childs[i].deleteNode();
            }
        }
        this.parent.selfElement.removeChild(this.selfElement);// 移除对应的DOM结点
        for (i = 0; i < this.parent.childs.length; i++) { // 从父节点删除该孩子
            if (this.parent.childs[i] == this) {
                this.parent.childs.splice(i, 1);
                break;
            }
        }
        // 调整父结点箭头样式
        this.parent.render(true, false);
    },
    // 增加子节点
    addChild: function (text) {
        if (text == null) return this;
        if (text.trim() == "") {
            alert("节点内容不能为空！");
            return this;
        }
        // 先增加子节点，再渲染自身样式
        // 若当前节点关闭，则将其展开
        if(!this.isLeaf() && this.isFolded()){
            this.toggleFold();
        }
        // 创建新的DOM结点并附加
        var newNode = document.createElement("div");
        newNode.className = "nodebody-visible";
        var newHeader = document.createElement("label");
        newHeader.className = "node-header";
        var newSymbol = document.createElement("div");
        newSymbol.className = "arrow empty-arrow";
        var newTitle = document.createElement("span");
        newTitle.className = "node-title";
        newTitle.innerHTML = text;
        var space = document.createElement("span");
        space.innerHTML = "&nbsp;&nbsp;";
        var newDelete = document.createElement("img");
        newDelete.className = "deleteIcon";
        newDelete.src = "images/delete.png";
        var newAdd = document.createElement("img");
        newAdd.className = "addIcon";
        newAdd.src = "images/add.png";
        newHeader.appendChild(newSymbol);
        newHeader.appendChild(newTitle);
        newHeader.appendChild(space);
        newHeader.appendChild(newAdd);
        newHeader.appendChild(newDelete);
        newNode.appendChild(newHeader);
        this.selfElement.appendChild(newNode);
        // 创建对应的TreeNode对象并添加到子节点队列
        this.childs.push(new TreeNode(
        	{parent: this, childs: [], data: text, selfElement: newNode})
        );
        // 渲染自身样式
        this.render(true, false);
        return this; // 返回自身，以便链式操作
    },
    // 展开、收拢结点
    toggleFold: function () {
        if (this.isLeaf()) return this; // 叶节点，无需操作
        // 改变所有子节点的可见状态
        for (var i=0;i<this.childs.length;i++)
            this.childs[i].render(false, true);
        // 渲染本节点的箭头
        this.render(true, false);
        return this; // 返回自身，以便链式操作
    },
    // 判断是否为叶结点
    isLeaf: function(){
        return this.childs.length == 0;
    },
    // 判断结点是否处于折叠状态
    isFolded: function(){
        if(this.isLeaf()) return false; // 叶结点返回false
        if(this.childs[0].selfElement.className == "nodebody-visible") return false;
        return true;
    }
};
//=======================================以上是封装TreeNode的代码=============================================

//=============================================事件绑定区===============================================
// 创建根节点对应的TreeNode对象
var root = new TreeNode({
	parent: null, 
	childs: [], 
	data: "前端攻城狮", 
	selfElement: document.getElementsByClassName("nodebody-visible")[0]}
	);
// 为root绑定事件代理，处理所有节点的点击事件
addEvent(root.selfElement, "click", function (e) {
    var target = e.target || e.srcElement;
    var domNode = target;
    while (domNode.className.indexOf("nodebody") == -1) domNode = domNode.parentNode; // 找到类名含有nodebody前缀的DOM结点
    selectedNode = domNode.TreeNode; // 获取DOM对象对应的TreeNode对象
    // 如果点在节点文字或箭头上
    if (target.className.indexOf("node-title") != -1 || target.className.indexOf("arrow") != -1) {
        selectedNode.toggleFold(); // 触发toggle操作
    }
    else if (target.className == "addIcon") { // 点在加号上
        selectedNode.addChild(prompt("请输入子结点的内容："));
    }
    else if (target.className == "deleteIcon") { // 点在减号上
        selectedNode.deleteNode();
    }
});

// 给root绑定广度优先搜索函数，无需访问DOM，返回一个搜索结果队列
root.search = function (query) {
    var resultList = [];
    // 广度优先搜索
    var queue = []; // 辅助队列，顺序存储待访问结点
    var current = this;
    // 当前结点入队
    queue.push(current);
    while (queue.length > 0) {
        // 从“待访问”队列取出队首结点访问，并将其所有子节点入队
        current = queue.shift();
        // 还原当前结点颜色
        current.render(false, false, false, true);
        // 读取当前结点data
        if (current.data == query) resultList.push(current); //找到了
        // 将当前结点的所有孩子节点入“待访问”队
        for (var i=0;i<current.childs.length;i++) {
            queue.push(current.childs[i]);
        }
    }
    return resultList;
};
// 搜索并显示结果
addEvent(document.getElementById("search"), "click", function () {
    var text = document.getElementById("searchText").value.trim();
    if(text == "") {
        document.getElementById("result").innerHTML = "请输入查询内容！";
        return;
    }
    // 执行搜索
    var resultList = root.search(text);
    // 处理搜索结果
    if (resultList.length == 0) {
        document.getElementById("result").innerHTML = "没有查询到符合条件的结点！";
    }
    else {
        document.getElementById("result").innerHTML = "查询到" + resultList.length + "个符合条件的结点";
        // 将所有结果结点沿途展开，结果结点加粗红色展示
        var pathNode;
        for (var x = 0;x<resultList.length;x++) {
            pathNode = resultList[x];
            pathNode.render(false, false, true, false);
            while (pathNode.parent != null) {
                if (pathNode.selfElement.className == "nodebody-hidden") pathNode.parent.toggleFold(); // 若是收拢状态，则展开
                pathNode = pathNode.parent;
            }
        }
    }
});
// 清除搜索结果
addEvent(document.getElementById("clear"), "click", function () {
    document.getElementById("searchText").value = "";
    root.search(null); // 清除高亮样式
    document.getElementById("result").innerHTML = "";
});
//==================================================================================================

//=======================================Demo展示区==================================================
//动态生成Demo树
root.addChild("技术").addChild("IT公司").addChild("谈笑风生");
root.childs[0].addChild("HTML5").addChild("CSS3").addChild("JavaScript").addChild("PHP").addChild("Node.JS").toggleFold();
root.childs[0].childs[4].addChild("JavaScript").toggleFold();
root.childs[1].addChild("百度").addChild("腾讯").addChild("大众点评").toggleFold();
root.childs[2].addChild("身经百战").addChild("学习一个").addChild("吟两句诗").toggleFold();
root.childs[2].childs[2].addChild("苟利国家生死以").toggleFold();
//初始化查询Demo值
document.getElementById("searchText").value = "JavaScript";
//==================================================================================================

// 跨浏览器兼容的工具函数
function addEvent(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    }
    else {
        element["on" + type] = handler;
    }
}



















/* 暂定结点类型为两种，如需要可自己添加 */ 
var m = new Map();
m.set( "folder" , "ul.folder" );
m.set( "file" , "li.file" );

// tools
function $ (d , v) {
    v = v || document;
    return v.querySelector(d);
}

function getInnerText (e) {
    if( e.nodeType === 1 ) {
        return e.innerText ? e.innerText : e.textContent;
    } else {
        throw new Error("please transmit a param which is a doc element!");
    }
}

function $$ (d , v) {
    v = v || document;
    return v.querySelectorAll(d);
}

function hasClass (ele , tclass) {
    tclass = simpleTrim( tclass );

    if( ele === null ) {
        throw new Error("selector has some error!");
        return false;
    }
    var scalss = ele.className.split(" ");
    for( var i = 0 ; i<scalss.length ; i++ ) {
        if( scalss[i] === tclass ) {
            return true;
        }
    }
    return false; 
}

function addClass (element , newClassName) {
    var newClass = element.className.split(" ");    
    for(var i in newClass) {
        if( newClass[i] === newClassName ) {
            return;
        }
    }

    newClass.push(newClassName);

    element.className = newClass.join(" ");
}

function simpleTrim (str) {
    return str.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
}

function removeClass(element , rmClassName) {
    if( element.className !== undefined ) {
        var EmClass = element.className.split(" ");
        for( var i in EmClass ) {
            if( EmClass[i] === rmClassName) {
                EmClass.splice( i , 1 );
            }
        }

        element.className = EmClass.join(" ");
    } else {
        throw new Error("className is undefined");
        return;
    }   
}

function TreeNode ( o ) {
    this.parentnode = o.parentnode;  // 父结点
    this.type = o.type;              // 结点类型 包含标签名和类
    this.selfEle = o.selfEle;        // TreeNode结点可以访问Dom树结点
    this.childs = o.childs || [];    // 子结点
    this.data   = o.data || "";      // 数据内容
    this.selfEle.TreeNode = this;    // Dom树结点也可以访问TreeNode结点
    
    if( o.type.split(".")[1] === "folder" ) {
        this.selfEle.isOpen = true;          // 如果是文件类型的给其加一个收缩开关
    }

    this.renderStyle( this );        // 给予样式    
} 

TreeNode.prototype = {
    constructor : TreeNode,
    addChild : function ( type , data , bP , sclass  ) {
        if ( sclass ) {
            sclass = " "+sclass;
        } else {
            var sclass = "";
        }
        data = data || "";
        bP = bP || 1;
        if (bP < 1) {
            bP = 1;
        }

        if( this.selfEle.nodeType !== 1 ) {
            throw new Error("The tree node's parent doesn't a document element!");
        }
        // 在html中实现该结点
        var c = type.split(".");
        var n = document.createElement( c[0] );
        addClass( n , c[1]+sclass );

        this.selfEle.appendChild( n );

        // 新建一个结点
        var nTN = new TreeNode({
            parentnode : this,
            type : type,
            selfEle : n,
            data : data
        }); 
        this.childs.push( nTN );

        // 回溯
        return this.backParent( bP , nTN );
    },
    backParent : function (n , obj) {
        var i = 1;
        while ( i !== n ) {
            if ( obj.parentnode === null ) {
                return obj;
            } else {
                obj = obj.parentnode;
                i++;
            }
        }
        return obj;
    },
    rmSelf : function () {
        this.rmAllChild();

        var index = 0;
        for( var i = 0 ; i<this.parentnode.childs.length ; i++ ) {
            if ( this.parentnode.childs[i] === this ) {
                index = i;
            }
        }

        this.parentnode.rmChild( index );
    },
    rmChild : function ( idx ) {
        if ( this.childs.length === 0 ) {
            throw new Error(" this childs Array is empty !");
        }
        this.selfEle.removeChild( this.childs[idx].selfEle );
        this.childs.splice( idx , 1 );
    },
    rmAllChild : function () {
        while( this.childs.length !== 0 ) {
            this.rmChild( this.childs.length - 1 );
        }
    },
    renderStyle : function ( o ) {
        var c = o.type.split(".");
        // 根据不同的树结点，给予不同的结构和样式
        
        switch (c[1]) {
            case "folder":
                return (function () {
                    var a = document.createElement("a");
                    a.href="javascript:;";
                    addClass( a , "folder-title" );
                    a.innerHTML += o.data;
                    if( o.parentnode !== null ) {
                         var s1 = document.createElement("span");
                        var s2 = document.createElement("span");

                        addClass( s1 , "folder-close" );
                        addClass( s2 , "folder-add" );

                        a.appendChild(s1);  
                        a.appendChild(s2);
                    }
                   
                    o.selfEle.appendChild(a);
                })();
                
            case "file": 
                return (function () {
                    var s = document.createElement("span");
                    addClass( s , "file-close" );
                    o.selfEle.appendChild(s);
                    o.selfEle.innerHTML += o.data;
                })();
        }
    },
    findChild : function ( sValue , r ) {

        this.childs.forEach(function (value,idx) {
            if( value.type.split(".")[1] === "folder" ) {
                if(getInnerText( $( "a" , value.selfEle ) ) == sValue) {
                    r.push( value );
                }

                r.concat(value.findChild( sValue , r ));
            } else if ( value.type.split(".")[1] === "file" ){
                if(getInnerText( value.selfEle ) == sValue) {
                    r.push( value );
                }
            }
        });

        return r;
    }
}

var container = $("article");
var root      = $(".root");
var oFind     = $(".find");
var oCon      = $(".con");

// 创建根节点
var r = new TreeNode({
    parentnode : null,  
    type : m.get("folder"), 
    selfEle : root,
    data : "世界各国国防实力文档"
});

root.addEventListener( "click" , function (ev) {
    if (ev.target && ev.target.nodeType === 1) {
        
        if( ev.target.tagName.toLowerCase() === "a" && hasClass(ev.target , "folder-title") ) {
            return (function () {
                var a = ev.target.parentNode;
                if (a.isOpen) {
                    addClass(a , "folder-hidden");
                } else {
                    removeClass(a , "folder-hidden");
                }
                a.isOpen = !a.isOpen;
            })();
        }

        if( ev.target.tagName.toLowerCase() === "span" && hasClass(ev.target , "folder-add") ) {
            return (function () {
                var typeName = prompt("请输入您需要添加的结点类型?");
                var tN = m.get(typeName)
                
                if(!tN) {
                    alert("无此类型结点！");
                } else {
                    var data = prompt("请输入你需要添加的结点标题(内容)");
                    if( data.length === 0 ) {
                        alert("结点标题（内容）不能为空!");
                    } else {
                        ev.target.parentNode.parentNode.TreeNode.addChild(tN,data);
                    }
                }
            })();
        }

        if( ev.target.tagName.toLowerCase() === "span" && (hasClass(ev.target , "folder-close")) ) {
            return (function () {
               if(confirm("是否确认要删除该文件夹类节点？！")) {
                    ev.target.parentNode.parentNode.TreeNode.rmSelf();
               }
            })();
        }

        if( ev.target.tagName.toLowerCase() === "span" && (hasClass(ev.target , "file-close")) ) {
            return (function () {
               if(confirm("是否确认要删除该文件节点？！")) {
                    ev.target.parentNode.TreeNode.rmSelf();
               }
            })();
        }
    }
});

oFind.addEventListener( "click" , find )
oCon.addEventListener( "keydown" , function (ev) {
    if( ev.keyCode === 13 ) {
        find();
    }
})

function find() {
    var findValue = simpleTrim( oCon.value );
    var b = $$(".findValue-bg");
    if ( b.length !== 0 ) {
        for( var i = 0 ; i < b.length ; i++ ) {
            removeClass( b[i] , "findValue-bg" );
        }
    }
    
    var c = [];
    r.findChild( findValue , c );
    if( c.length !== 0 ) {
        c.forEach( function (value ,idx) {
            openParent(value);
            addClass( value.selfEle , "findValue-bg" );
        });
    }else {
        alert("并没有找到所查项")
    }
    oCon.value = "";
}

function openParent (obj) {
    if( obj.parentnode !== null ) {
        if( !obj.selfEle.isOpen ) {
            removeClass( obj.selfEle , "folder-hidden" )
            obj.isOpen = true;            
        }
        obj = obj.parentnode;
        openParent (obj);
    }
}
r.addChild( m.get("folder") , "中国" )
    .addChild( m.get("folder") , "陆军" )
        .addChild( m.get("file") , "突击兵" , 2 )
        .addChild( m.get("file") , "后勤" , 3 )
    .addChild( m.get("folder") , "海军" )
        .addChild( m.get("file") , "舰艇" , 2 )
        .addChild( m.get("file") , "炮艇" , 2 )
        .addChild( m.get("file") , "两栖陆战队" , 3 )
    .addChild( m.get("folder") , "空军" )
        .addChild( m.get("file") , "地勤" , 2 )
        .addChild( m.get("file") , "航空兵" , 2 )
        .addChild( m.get("file") , "雷达兵" , 3 );


r.addChild( m.get("folder") , "美帝" )
    .addChild( m.get("folder") , "陆军" )
        .addChild( m.get("file") , "海豹突击队" , 2 )
        .addChild( m.get("file") , "后勤" , 3 )
    .addChild( m.get("folder") , "海军" )
        .addChild( m.get("file") , "航空母舰" , 2 )
        .addChild( m.get("file") , "驱逐舰" , 2 )
        .addChild( m.get("file") , "蛙人" , 3 )
    .addChild( m.get("folder") , "空军" )
        .addChild( m.get("file") , "黑鹰直升机" , 2 )
        .addChild( m.get("file") , "阿帕奇" , 2 )
        .addChild( m.get("file") , "伞兵" , 3 );

r.addChild( m.get("folder") , "日本" )
    .addChild( m.get("file") , "自卫队" );

r.addChild( m.get("folder") , "欧洲" );


/**** 用法 ****/
// 如果需要添加一个子结点
// r.addChild( m.get("file") );

// 如果添加的子节点需要添加其他类
// r.addChild( m.get("file") , "结点标题" , "a b c" );

// 删除一个结点 （其下子节点在数组中的索引）
// r.rmChild( 0 );

// r.addChild( m.get("file") );
// r.addChild( m.get("file") );
// r.addChild( m.get("file") );
// r.addChild( m.get("file") );
// r.addChild( m.get("file") );

// 如果要删除所有的孩子
// r.rmAllChild();

// 删自己
//  r.addChild( m.get("file") ).rmSelf();