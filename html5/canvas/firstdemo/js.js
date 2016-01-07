/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-06 13:25:52
 * @version $Id$
 */
function drawDiagonal () {
	var canvas = document.getElementById('diagonal');
	var context = canvas.getContext('2d');

	context.save();//保存尚未修改的context，以便后面还能再获取原始值。
	context.translate(70, 140);

	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(70,-70);

	context.stroke();
}

window.addEventListener("load", drawDiagonal, true);
