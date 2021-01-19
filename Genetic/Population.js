/*
* Class to represent the entire population.
* This class will be used to preform operations on every member of the population.
*/
class Population {

    constructor(popSize, startingVector, goal) {

        this.popSize = popSize;
        this.startingVector = startingVector;
        this.goal = goal;

        this.population = new Array();
        this.best = this.population[0];

        for(let i = 0; i < popSize; i++) {
            this.population.push(new Dot(startingVector, goal));
        }
    }

    naturalSelection() {
        let bestDirections = this.best.getBrain().getDirections();
        let newPopulation = new Array(this.popSize);

        newPopulation[0] = new Dot(this.startingVector, this.goal);
        newPopulation[0].setDirections(bestDirections);
        
        for(let i = 1; i < this.popSize; i++) {
            newPopulation[i] = (new Dot(this.startingVector, this.goal));
            newPopulation[i].setDirections(bestDirections);
            newPopulation[i].getBrain().mutate();
        }


        this.population = newPopulation;
    }

    update() {
        let popIsDead = true;
        let popGoalReached = false;

        this.calculateBest();

        this.population.forEach(member => {
            if(!member.isDead) {
                popIsDead = false;
            }

            if(member.goalReached) {
                popGoalReached = true;
            }
            
            member.update();
            member.draw();
            this.best.highlightedDraw();
        });

        if(popIsDead || popGoalReached) {
            this.naturalSelection();
        }
    }

    calculateBest() {
        let newBest = this.population[0];

        this.population.forEach(dot => {
            if(dot.fitness > newBest.fitness)
                newBest = dot;
        });

        this.best = newBest;
    }

    //Function used to perform operations on each member of the population
    //Using call back functions
    // performOperation() {
    //     this.population.forEach(() => {

    //     });
    // }
}