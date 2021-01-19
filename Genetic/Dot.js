class Dot {

    constructor(startingPosition, goal) {
        //PVectors containing the positions, velocity and acceletation of the dot
        this.goal = goal;
        this.pos = startingPosition;

        this.vel = new p5.Vector(0, 0);
        this.acc = new p5.Vector(0, 0);

        this.fitness = 0;
        this.numberOfSteps = 1000;

        this.isDead = false;
        this.goalReached = false;
         
        this.brain = new Brain(this.numberOfSteps);
    }

    // Updates the position and velocity of the dot
    update() {
        if(!this.isDead && !this.goalReached) {
            //If the dots are out of bounds or there are no more instructions left, they die
            if(this.pos.x > width || this.pos.x < 0
            || this.pos.y > height || this.pos.y < 0
            || this.brain.step === this.numberOfSteps) {
                this.isDead = true;
            } else {
                this.pos = p5.Vector.add(this.pos, this.vel);
                this.vel = p5.Vector.add(this.vel, this.acc);
                this.vel.limit(5);
                this.acc = this.brain.nextDirection();
            }

            // //If this dot has reached the goal, the set goalReached to true
            if(this.pos.dist(this.goal.position) < this.goal.radius) {
                this.goalReached = true;
            }

            this.calculateFitness();
        }
    }
    
    //Draws the dot onto the screen 
    draw() {
        noStroke();
        fill(0);
        ellipse(this.pos.x, this.pos.y, 8);
    }

    highlightedDraw() {
        noStroke();
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, 8);
    }

    calculateFitness() {
        if(this.pos.dist(this.goal.position) === 0) {
            this.fitness = 1;
            return
        }

        this.fitness = 1/this.pos.dist(this.goal.position);
    }

    getBrain() {
        return this.brain;
    }

    setDirections(directions) {
        this.brain.setDirections(directions);
    }
}