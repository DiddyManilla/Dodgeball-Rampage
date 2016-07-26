$(document).ready(function() {

	let INTERVAL = 500;
	let num = 1;
	let ballSpawn;
	let obstacles = [];
	
	function randomHexColorNotWhite() {
		let color = "#";
		do {
		for (let i = 0; i < 6; i++) {
			color += "0123456789abcdef".charAt(Math.floor(Math.random() * 16));
		}
		} while (parseInt(color.substring(1, color.length)) > 0xcccccc);
		return color;
	}

	function spawnBall() {
		let endTime = performance.now();
		$("body").append("<div class=ball></div>");

		$(`.ball:nth-child(${num})`).on('mouseover', function(event) {
			$(".ball").remove();
			obstacles = [];
			clearTimeout(ballSpawn);
			$("body").append(`<div id=\"end\">You made it to:<br>${num} dodgeballs<br>${(endTime - startTime) / 1000} seconds</div>`);
		});

		obstacles.push($(`.ball:nth-child(${num})`));

		let lastObstacleAdded = obstacles[obstacles.length-1]

		lastObstacleAdded.css("background-color", randomHexColorNotWhite());
		lastObstacleAdded.speedY = Math.random() + 1.5;
		lastObstacleAdded.speedX = Math.random() + 1.5;

		num++;

		if (num < 100) {
			ballSpawn = setTimeout(spawnBall, INTERVAL);
		}

	}
	function moveBalls() {
		for (let i = 0; i < obstacles.length; i++) {
			let ball = obstacles[i];
			if (parseFloat(ball.css("top")) < 0) {
				ball.speedY *= -1;
				ball.css("top", "0px");
			} else if (parseFloat(ball.css("top")) + 11 > window.innerHeight) {
				ball.speedY *= -1;
				ball.css("top", parseFloat(window.innerHeight) - 11);
			}
			if (parseFloat(ball.css("left")) <= 0) {
				ball.speedX *= -1;
				ball.css("left", "0px")
			} else if (parseFloat(ball.css("left")) + 11 >= window.innerWidth) {
				ball.speedX *= -1;
				ball.css("left", parseFloat(window.innerWidth) - 11)
			}
			ball.css({
				"top": parseFloat(ball.css("top")) + ball.speedY + "px",
				"left": parseFloat(ball.css("left")) + ball.speedX + "px"
			});
		}
	}

	let startTime = performance.now();
	spawnBall();
	setInterval(moveBalls, 5);
});