function play() {
	var logSocket = io.connect('http://localhost');
	logSocket.emit("play");
	$("#play").addClass("hide");
	$("#stop").removeClass("hide");
}

function stop() {
	var logSocket = io.connect('http://localhost');
	logSocket.emit("stop");
	$("#stop").addClass("hide");
	$("#play").removeClass("hide");
}
