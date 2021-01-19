const populationSize = 50;
let obsticles = new Array();

let goal = {
    position: new p5.Vector(400, 50),
    radius: 12,
};

let population;
// let population = new Array();

function setup() {
    canvas = createCanvas(800, 800);
    canvas.style("border", "5px solid black");
    
    population = new Population(populationSize, new p5.Vector(400, 400), goal);
}

function draw() {
    background(255);

    noStroke();
    fill(0, 255, 0);
    ellipse(goal.position.x, goal.position.y, goal.radius);

    // canvas.(() => { 
    //     obsticles.add(new Obsticle(new p5.Vector(mouse.x, mouse.y)));
    // });

    // population.forEach(memeber => {
    //     memeber.update();
    //     memeber.draw();
    // });

    population.update();

    // obsticles.forEach(obsticle => {
    //     obsticle.draw();
    // });
}