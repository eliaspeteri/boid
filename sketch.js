const flock = [];

let alignSlider, cohesionSlider, separationSlider;

function setup() {
  canvas = createCanvas(1200, 800);
  alignSlider = createSlider      (0,2,1.5,0.1);
  cohesionSlider = createSlider   (0,2,1,0.1);
  separationSlider = createSlider (0,2,2,0.1);
  for (var i = 0; i < 100; i++) {
    flock.push(new Boid());
  }
}
function draw() {
  background(51);
  for(let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}
