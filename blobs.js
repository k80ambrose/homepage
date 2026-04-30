let orbs = [];
let outlineMode = false; // track if user has scrolled
let outlineOpacity = 0; // 0 = fully filled blobs, 1 = fully outlined

// when window is resized, canvas is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// listen for scroll events
window.addEventListener('scroll', () => {
  // Update outlineOpacity based on scroll position
  let scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
  let maxScroll = 1000; // Adjust this to the height at which the effect reaches full opacity
  
  // Gradually increase outlineOpacity as user scrolls
  outlineOpacity = constrain(scrollTop / maxScroll, 0, 1);
  console.log('Outline Opacity:', outlineOpacity); // For debugging purposes
});

// so canvas with orbs exists
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30); 
  for (let i = 0; i < 5; i++) {
    orbs.push(new Orb(random(width), random(height)));
  }
}

// draw everything
function draw() {
  background(20, 20, 40, 150);

  noStroke();
  for (let orb of orbs) {
    orb.move();
    orb.display();
  }
}

// orb class (this controls the orbs)
class Orb {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.angle = random(TWO_PI);
    this.speed = random(0.7, 1.7);
    this.radius = random(200, 400);

    this.offsets = Array.from({ length: 40 }, () => random(1, 6));
    this.noiseOffset = random(1000);
    this.distortionStrength = random(5, 30);

    this.color = color(random(100, 255), random(50, 180), random(150, 255), 200);  // High opacity
  }

  move() {
    this.angle += this.speed * 0.01;
    this.pos.x += cos(this.angle) * this.speed;
    this.pos.y += sin(this.angle) * this.speed;

    this.pos.x = (this.pos.x + width) % width;
    this.pos.y = (this.pos.y + height) % height;
  }

  display() {
    // Easing for opacity transition
    let eased = pow(outlineOpacity, 1.5); // Smooth transition
    let blobAlpha = lerp(255, 0, eased); // Fade from full alpha to 0
    let outlineAlpha = lerp(0, 255, eased); // Fade outline from 0 to full

    // Apply fill color with adjusted alpha
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], blobAlpha);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);

    // Always draw outlines
    noFill();
    strokeWeight(2);
    stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], outlineAlpha);

    beginShape();
    for (let i = 0; i < this.offsets.length; i++) {
      let angle = map(i, 0, this.offsets.length, 0, TWO_PI);
      let noiseVal = noise(this.noiseOffset + i * 0.15 + frameCount * 0.02);
      let radiusVariation = map(noiseVal, 0, 1, -this.distortionStrength, this.distortionStrength);
      let x = this.pos.x + (this.radius + radiusVariation) * cos(angle);
      let y = this.pos.y + (this.radius + radiusVariation) * sin(angle);
      curveVertex(x, y);
    }
    endShape(CLOSE);

    this.noiseOffset += 0.009;
  }
}
