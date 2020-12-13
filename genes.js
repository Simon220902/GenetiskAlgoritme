//Elementerne er lavet som følger (navn, gram, kroner)
let items =[["kort", 90, 150],
			["kompas", 130, 35],
			["vand", 1530, 200],
			["sandwich", 500, 160],
			["sukker", 150, 60],
			["dåsemad", 680, 45],
			["banan", 270, 60],
			["æble", 390, 40],
			["ost", 230, 30],
			["øl", 520, 10],
			["solcreme", 110, 70],
			["kamera", 320, 30],
			["T-shirt", 240, 15],
			["bukser", 480, 10],
			["paraply", 730, 40],
			["vandtætte bukser", 420, 70],
			["vandtæt overtøj", 430, 75],
			["pung", 220, 80],
			["solbriller", 70, 20],
			["håndklæde", 180, 12],
			["sokker", 40, 50],
			["bog", 300, 10],
			["notesbog", 900, 1],
			["telt", 2000, 150]]

let maxWeight = 5000;

class Population{
	constructor(size_, population_, maxMutations_){
		//This is the initial constructor, when there is not already an established population
		this.size = size_;
		//Generate the population
		this.population = population_;
		//
		this.maxMutations = maxMutations_;
		//STATS
		this.avgValue = 0;
		this.highestValue = 0;
		this.population.forEach(dna => {
			dna.calculateWeightAndValue();
		});
	}
	generateFirstGen(){
		for (let i = 0; i < this.size; i++) {
			let gene = [];
			for (let x = 0; x < items.length; x++){
				gene[x] = Math.floor(Math.random()*2); //Randlmly either 1 or 0
			}
			this.population[i] = new DNA(gene);
		}
	}
	findAvgValue(){
		this.population.forEach(dna => {
			this.avgValue += dna.value;
		});
		this.avgValue = this.avgValue / this.size;
	}
	
	reproduce(){
		this.findAvgValue();
		//Make mating pool
			let matingPool = [];
				
			//Eliminate all the dead DNA
			this.population.forEach(dna =>{
				if(!dna.killed){
					matingPool.push(dna);
				}
			})
			//Sort by highest value

			matingPool.sort((dna1, dna2) => dna2.value - dna1.value);
			
			//Get the highest value, which will be the first one in the list.
			this.highestValue = matingPool[0].value;

			//Choose top 33%

			matingPool = matingPool.slice(0,Math.floor(matingPool.length/3));

		//Make cross over
		let newPopulation = [];
		for(let i = 0; i < this.size; i++){
			//We get the two random DNA's
			let dna1 = matingPool[Math.floor(Math.random()*matingPool.length)];
			let dna2 = matingPool[Math.floor(Math.random()*matingPool.length)];
			//We generate the new gene by crossover
			let newGene = dna1.crossover(dna2);
			newPopulation.push(new DNA(newGene));
		}

		//Mutate some random amount of mutations, which can be turned up and down by changing maxMutations
		newPopulation.forEach(dna => dna.mutate(Math.floor(Math.random()*this.maxMutations)));
		
		return newPopulation;
	}

}

class DNA{
	constructor(gene_){
		//A list of 0/1 that is as long as items, because each item corresponds to another
		this.gene = gene_;
		this.weight = 0;
		this.value  = 0;
		this.killed = false;
	}

	calculateWeightAndValue(){
		//In this we should check whether this specific one is dead
		for (let i = 0; i < this.gene.length; i++) {
			if(this.gene[i]){
				this.weight += items[i][1];
				this.value += items[i][2];
			}
		}
		//CONSTRAINTS
		//Weight has to be under 5000 (if over then killed = true)
		if(this.weight > maxWeight){
			this.killed = true;
			this.value  = 0;
		}
	}

	crossover(otherGene){
		let newGene = [];
		for(let i = 0; i < this.gene.length; i++){
			//50/50 chance whether each of specific items comes from one or the other gene
			if(Math.floor(Math.random()*2)){
				newGene.push(this.gene[i]);
			}else{
				newGene.push(otherGene.gene[i]);
			}
		}
		return newGene;
	}

	mutate(numMutations){
		for(let mutations = 0; mutations < numMutations; mutations++){
			let mutationIndex = Math.floor(Math.random()*this.gene.length);
			if(this.gene[mutationIndex]){
				this.gene[mutationIndex] = 0;
			}else{
				this.gene[mutationIndex] = 1;
			}
		}
	}

	output(){
		console.log(this.gene);
	}
}