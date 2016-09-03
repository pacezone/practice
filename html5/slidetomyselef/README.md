# 无缝连接轮播

标签（空格分隔）： 效果

---
###思路
1.ex，原来轮播图片有5张，1、2、3、4、5。克隆第一个节点和最后一个节点。使之变成  5、1、2、3、4、5、1

2.以往外面的框以减少position: absolute;的left定位的方式滑动到5图片的时候，如果要重新开始回到1。如果是动画滑动的话，就会看到从5*width减少到1\*width。如果是css的方式进行的话，那么又会1到4是滑动的，而1到5又是show的方式进行。

3.所以，增加了前后各一个的节点后。当外面的框到最后一张1的时候，立马css的方式使之到开始的1，show的方式，别人也看不到。前后也能滑动。

###代码实现

1.开始的时候本来想以k++;的方式来滑动的。即
```javascript
next.click (function(){
    k++;
    wrap.css(k*width);
})
```
后来发现这样出来的k很难控制，因为不知道它原来是多少，不好判断是最后一张还是什么时候。于是就想到要获取wrap框的定位，在本身的定位是判断是在什么位置，那么问题又来了。毕竟是响应式设计，现在走滑动的路数都是以```transform = 'translate3d(0px,0px,0px)'```的方式在控制。以css的获取之后是个矩阵。```matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)```尼玛！矩阵什么的，也搜到了文章比较力不从心，就先放弃了。

2.那么怎么获取本身的在transform里面的translate3d的x轴坐标就是自己的难题。
```javascript
var getTransitionX = function(el) {
	
	var curStyle = window.getComputedStyle(el, null);
if (window.WebKitCSSMatrix) {
	var curTransform = curStyle.transform || curStyle.webkitTransform;
	if (curTransform.split(',').length > 6) {
        curTransform = curTransform.split(', ').map(function(a) {
            return a.replace(',', '.');
            }).join(', ');
      	}
    transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
 } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
    }
 if (window.WebKitCSSMatrix) {
 	curTransform = transformMatrix.m41;
 } else if (matrix.length === 16) {
 	curTransform = parseFloat(matrix[12]);
 } else {
 	curTransform = parseFloat(matrix[4]);
 }
    return curTransform || 0;

}
```
是的以上代码，我特么只看懂了肤浅的语法，比如getComputedStyle是得到元素祖宗十八代的style。然后再对矩阵进行解析或者咋样吧。反正我代码抄也抄了，而且此段代码兼容的浏览器也是棒棒哒。然后那么我们先进行下一步吧


3.滑动到下一个就是getTransitionX(el)-width，滑动到上一个就是getTransitionX(el)+width，这个没问题吧。但是现在出现了一个问题，就是要修复轮播，毕竟重点思路是判断外面的框是在第几个图片位置，再进行是立马css到图片呢。还是滑动的方式。
至今我特么这个都卡壳了。真是too young too 乃义务啊。就是
```
if (Math.round(-w/conW) == (len-2)) {
		setTransition(el,0,0);
	} else if (Math.round(w/conW)==0) {
		var x= (len-2)*(-conW)
		setTransition(el,x,0);
	}	
```
以上的判断会造成循环的情况，也就是说，从末尾蹦到头又从头蹦到尾。猜测的解决方法就是，在else if后面的条件上面再加一个判断，比如是next还是pre图片。所以只能分开写。next点击的时候是第一个条件，pre点击的时候是第二个条件。

4.其实还有一个问题
```
negativeloop(contain);
slideNext(contain)
```
这两个点击的顺序不能变。至于传入的过程，为什么我至今不想弄明白，毕竟我之后还要弄加上手机端的touch监听，还有自动轮播的东西。还有自适应宽度等等，很累的。先让我把所有的效果做出来后，再来讨论这个顺序的问题。

