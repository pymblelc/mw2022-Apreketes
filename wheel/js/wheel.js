const segments = [
	"Surfing",
	"Beach day",
    "Pool day",
    "Reading",
	"Walking",
	"Skating",
	"Walk your pet",
	"Running"
];

const jsConfetti = new JSConfetti();

function myfunction() {
	var x = 1024;
	var y = 9999;
	let goal = Math.random() * 36000;
	//var deg = Math.floor(Math.random() * (x - y)) + y; 
	//document.getElementById('box').style.transform = "rotate("+deg+"deg)";
	document.getElementById('box').style.transform = `rotate(${goal}deg)`;

	var element = document.getElementById('mainbox');

	element.classList.remove('animate');
	setTimeout(function() {
		element.classList.add('animate');
		/*
		var valueList = [   "images/walking.png",
							"images/surf.png",
							"images/pet.png",
							"images/pool.png",
							"images/run.png",
							"images/read.png",
							"images/beach.png",
							"images/board.png"];
		var getValue = valueList[Math.floor(Math.random() * valueList.length)];
		console.log(getValue)
		alert(getValue); 
		*/
		let result = Math.floor(
            (
                goal
                + (360 / segments.length / 2) // Is needed if pointer is in the center of a segment
            )
            / (360 / segments.length)
        ) % segments.length;

		jsConfetti.addConfetti();
		alert(`You got ${segments[result]}!`); //'segments[result]' IS THE RESULT FROM THE WHEEL
	}, 5000);

	
}