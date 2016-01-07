/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-07 14:39:46
 * @version $Id$
 */

var bodyStyle = document.body.style;

bodyStyle.mozUserSelect = 'none';
bodyStyle.webkitUserSelect = 'none';

var img = new Image();
var canvas = document.querySelector('canvas');
canvas.style.backgroundColor='transparent';
canvas.style.position = 'absolute';
var imgs = ['p_0.jpg','p_1.jpg'];
var num = Math.floor(Math.random()*2);
img.src = imgs[num];

img.addEventListener('load', function(e) {
	var ctx;
    var w = img.width,
    	h = img.height;
    var mousedown = false;

    function layer(ctx) {
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, w, h);
    }

    function eventDown(e){
        e.preventDefault();
        mousedown=true;
    }

    function eventUp(e){
        e.preventDefault();
        mousedown=false;
    }

    function eventMove(e){
        e.preventDefault();
        if(mousedown) {
             if(e.changedTouches){
                 e=e.changedTouches[e.changedTouches.length-1];
             }
             var x = e.clientX - e.target.offsetLeft,
                 y = e.clientY - e.target.offsetTop;
            console.log(x);

             with(ctx) {
                 beginPath()
                 arc(x, y, 10, 0, Math.PI * 2);
                 fill();
             }
        }
    }

    canvas.width=w;
    canvas.height=h;
    canvas.style.backgroundImage='url('+img.src+')';
    ctx=canvas.getContext('2d');
    ctx.fillStyle='transparent';
    ctx.fillRect(0, 0, w, h);
    layer(ctx);

    ctx.globalCompositeOperation = 'destination-out';

    canvas.addEventListener('touchstart', eventDown);
    canvas.addEventListener('touchend', eventUp);
    canvas.addEventListener('touchmove', eventMove);
    canvas.addEventListener('mousedown', eventDown);
    canvas.addEventListener('mouseup', eventUp);
    canvas.addEventListener('mousemove', eventMove);
});

