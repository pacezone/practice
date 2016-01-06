/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-06 15:07:54
 * @version $Id$
 */

function createCanopyPath (context) {
	context.beginPath();

	context.moveTo(-25, -50);
	context.lineTo(-10, -80);
	context.lineTo(-20, -80);
	context.lineTo(-5, -110);
	context.lineTo(-15, -110);

	context.lineTo(0, -140);
	context.lineTo(15, -110);
	context.lineTo(5, -110);
	context.lineTo(20, -80);
	context.lineTo(10, -80);
	context.lineTo(25, -50);
	context.closePath();


	context.lineWidth = 4;
	context.lineJoin = 'round';
	context.strokeStyle = '#663300';

	context.fillStyle = '#339900';
	context.fill();
	context.stroke();

}
function createCurve () {
	var canvas = document.getElementById('tree');
	var context = canvas.getContext('2d');
	context.save();
	context.translate(0, 350);
	context.beginPath();
	context.moveTo(0, 0);
	context.quadraticCurveTo(170, -50, 260, -190);
	context.quadraticCurveTo(310, -250, 410, -250);
	context.strokeStyle = '#663300';
	context.lineWidth = 20;
	context.stroke();


}
function createTrunk(context) {
	var trunkGradient = context.createLinearGradient(-5, -50, 5, -50);
	trunkGradient.addColorStop(0, '#663300');
	trunkGradient.addColorStop(0.4, '#996600');
	trunkGradient.addColorStop(1, '#552200');
	context.fillStyle = trunkGradient;
	context.fillRect(-5, -50, 10, 50);
	var canopyShadow = context.createLinearGradient(0,-50,0,0);
	canopyShadow.addColorStop(0,'rgba(0,0,0,0.5');
	canopyShadow.addColorStop(0.2,'rgba(0,0,0,0.0');
	context.fillStyle = canopyShadow;
	context.fillRect(-5,-50,10,50);
}
function drawTrails () {
	var canvas = document.getElementById('tree');
	var context = canvas.getContext('2d');
	context.save();
	context.translate(130, 250);
	createTrunk(context);
	createCanopyPath(context);
	context.restore();



}

window.addEventListener("load", drawTrails, true);
window.addEventListener("load", createCurve, true);
