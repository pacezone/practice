function moveElement(final_x, final_y,interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById('preview')) return false;
	var elems = document.getElementById('preview');
	if (elems.movement) {
		clearTimeout(elems.movement);
	}
	if (!elems.style.left) {
		elems.style.left = 0;
	};
	if (!elems.style.top) {
		elems.style.top = 0;
	};
	var xpox = parseInt(elems.style.left);
	var ypox = parseInt(elems.style.top);
	var dist ;
	 	if (xpox == final_x && ypox == final_y) {
			return true;
		}
		if (xpox < final_x) {
			dist = Math.ceil((final_x - xpox)/10);
			xpox = xpox + dist;
		}
		if (xpox > final_x) {
			dist = Math.ceil((xpox - final_x)/10);
			xpox = xpox - dist;
		}
		if (ypox < final_y) {
			dist = Math.ceil((final_y - ypox)/10);
			ypox = ypox + dist;
		}
		if (ypox > final_y) {
			dist = Math.ceil((ypox - final_y)/10);
			ypox = ypox - dist;
		}
		elems.style.left = xpox + 'px';
		elems.style.top = ypox + 'px';
		var repeat = "moveElement("+final_x+", "+final_y+", "+interval+")";
		// var movement = setTimeout('moveMessage(elementID, final_x, final_y, interval)', interval);
		elems.movement = setTimeout(repeat,interval);
	}



