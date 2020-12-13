let generations;
let genNum;
let testPop;
let highestValue = {genNum: 0, value: 0, dna: testPop};
let graphBorder;
let runGenerations = false;
let generationSize;
let maxMutations;

function setup() {
	let canvas = createCanvas(400, 400);
	frameRate(15);
	startNew();
	graphBorder = width/5;
	canvas.parent("s");
}

function draw() {
	if (runGenerations){
		newGeneration();
	}
	background(0);
	stroke(255);
	fill(255,0,0);
	textAlign(CENTER);
	text("BEST VALUE: "+highestValue.value+" FROM GEN: "+highestValue.genNum + " CUR GEN: " + genNum, width/2, height/10);
	drawGraph();
	drawBestPackingList()
}

function drawGraph(){
	push();
	translate(graphBorder-10,0);
		fill(255);
		strokeWeight(3);
		//X-axis
		line(graphBorder, height-graphBorder, width-graphBorder, height-graphBorder);
		//Y-axis
		line(graphBorder, graphBorder, graphBorder, height-graphBorder);
		strokeWeight(1);
		text("Generation", width/2, height-graphBorder+10);
		text("Value", graphBorder, graphBorder-10);
		
		let xGap = (width-2*graphBorder)/(generations.length+1);
		let yUnit = (height-2*graphBorder)/highestValue.value;

		for(let genI = 0; genI < generations.length; genI++){
			//Best from the generation
			fill(255, 0, 0);
			strokeWeight(1);
			circle(graphBorder+(genI+1)*xGap, height-graphBorder-yUnit*generations[genI].bestDNA.value,4);
			//Avg from the generation
			fill(0, 0, 255);
			circle(graphBorder+(genI+1)*xGap, height-graphBorder-yUnit*generations[genI].avgValue,4);
		}
	pop();
}

function drawBestPackingList(){
	//APPROX TWO GRAPHBORDERS SPACE
	push();
	strokeWeight(1);
	fill(255);
	textAlign(LEFT);
	let ts = 12;
	textSize(ts);
	text("Best packinglist:", 10, graphBorder);
	let itemsWritten = 1;
	for(let itemI = 0; itemI < highestValue.dna.gene.length; itemI++){
		if(highestValue.dna.gene[itemI]){
			itemsWritten += 1;
			text(items[itemI][0], 10, graphBorder+itemsWritten*ts)
		}
	}
	pop();
}

function newGeneration(){
	generations.push(testPop);
	let newPopulation = testPop.reproduce();

	if(testPop.bestDNA.value > highestValue.value){
		highestValue.genNum = genNum;
		highestValue.value = testPop.bestDNA.value;
		highestValue.dna = testPop.bestDNA;

	}
	genNum += 1;
	testPop = new Population(100, newPopulation, 4);
}

function startNew(){
	generations = [];
	genNum = 0;
	highestValue = {genNum: 0, value: 0, dna: testPop}
	generationSize = parseInt(document.getElementById("generationSize").value);
	maxMutations = parseInt(document.getElementById("mutations").value);

	testPop = new Population(generationSize, [], maxMutations);
	testPop.generateFirstGen();
	genNum += 1;
	newGeneration();
	newGeneration();
}