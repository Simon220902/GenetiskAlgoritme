let generations = [];
let genNum = 0;
let testPop;
let newPopulation;
let highestValue = {genNum: 0, value: 0};


function setup() {
	createCanvas(400, 400);
	frameRate(15);
	testPop = new Population(100, [], 4);
	testPop.generateFirstGen();
	genNum += 1;
}

function draw() {
	newGeneration();
	background(0);
	stroke(255);
	fill(255,0,0);
	textAlign(CENTER);
	text("BEST VALUE: "+highestValue.value+" FROM GEN: "+highestValue.genNum, width/2, height/10);
}

function drawGraph(){
	line();
	line();
	for(let genI = 0; genI > generations.length; genI++){
		
	}
}

function newGeneration(){
	generations.push(testPop);
	newPopulation = testPop.reproduce();

	if(testPop.highestValue > highestValue.value){
		highestValue.genNum = genNum;
		highestValue.value = testPop.highestValue;
	}
	genNum += 1;
	testPop = new Population(100, newPopulation, 4);
}