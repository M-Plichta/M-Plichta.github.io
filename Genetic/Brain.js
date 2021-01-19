class Brain {

    constructor(size) {
        this.size = size;
        this.step = -1;
        this.directions = new Array();
        this.mutationRate = 0.05;

        this.populateDirections();
    }

    //This populates the directions array with random directions
    populateDirections() {
        for(let i = 0; i < this.size; i++) {
            this.directions.push(p5.Vector.fromAngle(Math.PI * random(2)));
        }
    }

    nextDirection() {
        this.step++;
        return this.directions[this.step];
    }

    mutate() {
        for(let i = 0; i < this.size; i++) {
            if(random() < this.mutationRate) {
                this.directions[i] = p5.Vector.fromAngle(Math.PI * random(2));
            }
        }
    }

    getDirections() {
        return this.directions;
    }

    setDirections(newDirections) {
        for(let i = 0; i < this.size; i++) {
            this.directions[i] = newDirections[i];
        }
    }
}