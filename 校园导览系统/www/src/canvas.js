function canvas_path(style) {
	var canvas = document.getElementById("path");
	var context = canvas.getContext("2d");
	
	if (style == 1) {
		context.beginPath();
		context.moveTo(arguments[1], arguments[2]);
		context.lineTo(arguments[3], arguments[4]);
		context.closePath();
	}
	if (style == 2) {
		context.beginPath();
		context.bezierCurveTo(arguments[1], arguments[2],arguments[3], arguments[4], arguments[5], arguments[6])
	}
	context.lineJoin = "round";
	context.lineWidth = 5;
	context.strokeStyle = '#f40';
	context.stroke();
}


//canvas_path();