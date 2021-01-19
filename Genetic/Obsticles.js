class Obsticles {

    constructor(position) {
        this.pos = position;
        this.extent = 10;
    }

    draw() {
        fill(255);
        noStroke();
        square(this.pos.x, this.pos.y, this.extent);
    }
}