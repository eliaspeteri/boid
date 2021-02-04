class Boid {
  constructor() {
    this.pos = createVector(random(width),random(height));
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(5,10));
    this.acc = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 5;
  }

edges() {
  if (this.pos.x > width) {
    this.pos.x = 0;
  }
  else if (this.pos.x < 0) {
    this.pos.x = width;
  }
  if (this.pos.y > height) {
    this.pos.y = 0;
  }
  else if (this.pos.y < 0) {
    this.pos.y = height;
  }
}

  align(boids) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;
    for(let other of boids) {
      let d = dist(
        this.pos.x,
        this.pos.y,
        other.pos.x,
        other.pos.y
      );
      if(other != this && d < perceptionRadius) {
        steering.add(other.vel);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    return steering;
}
  cohesion(boids) {
    let perceptionRadius = 100;
    let steering = createVector();
    let total = 0;
    for(let other of boids) {
      let d = dist(
        this.pos.x,
        this.pos.y,
        other.pos.x,
        other.pos.y
      );
      if(other != this && d < perceptionRadius) {
        steering.add(other.pos);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.pos);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    return steering;
}
  separation(boids) {
    let perceptionRadius = 100;
    let steering = createVector();
    let total = 0;
    for(let other of boids) {
      let d = dist(
        this.pos.x,
        this.pos.y,
        other.pos.x,
        other.pos.y
      );
      if(other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.pos,other.pos);
        // diff.div(d);
        diff.div(Math.pow(d,2));
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    return steering;
}

flock(boids) {
  let alignment = this.align(boids);
  let cohesion = this.cohesion(boids);
  let separation = this.separation(boids);

  separation.mult(separationSlider.value());
  cohesion.mult(cohesionSlider.value());
  alignment.mult(alignSlider.value());

  this.acc.add(alignment);
  this.acc.add(cohesion);
  this.acc.add(separation);
}

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.acc.set(0,0);
  }

  show() {
    strokeWeight(8);
    stroke(255);
    point(this.pos.x,this.pos.y);
  }
}
