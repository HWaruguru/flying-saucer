//Topic 1.1
//Object orientation revisted
//part one

var flyingSaucers;

function setup() {
  createCanvas(1200, 600);
  noStroke();

  flyingSaucers = [];
  for (var i = 0; i < 5; i++) {
    flyingSaucers.push(new FlyingSaucer(100 + i * 250, 100));
  }
}

function draw() {
  background(50, 0, 80);

  //draw the ground
  fill(0, 50, 0);
  rect(0, height - 100, width, 100);
  for (var i = 0; i < flyingSaucers.length; i++) {
    if (flyingSaucers[i].beam_on == true) {
      flyingSaucers[i].beam();
    }
    flyingSaucers[i].hover();
    flyingSaucers[i].draw();
  }
}
function keyPressed() {
  flying_saucer.beam_on = true;
}

function keyReleased() {
  flying_saucer.beam_on = false;
}

function FlyingSaucer(x, y) {
  (this.x = x),
    (this.y = y),
    (this.width = random(150, 250)),
    (this.height = random(75, 125)),
    (this.window_width = 0.85),
    (this.window_height = 0.85),
    (this.base_height = 0.45),
    (this.num_lights = round(random(10, 20))),
    (this.brightnesses = []),
    (this.beam_on = false),
    (this.hover = function () {
      this.x += random(-2, 2);
      this.y += random(-1, 1);
      if (this.beam_on == false && random() > 0.98) {
        this.beam_on = true;
      } else if(this.beam_on == true && random() > 0.96m){
        this.beam_on = false;
      }
    }),
    (this.beam = function () {
      fill(255, 255, 100, 150);
      if (random() > 0.1) {
        beginShape();
        vertex(this.x - this.width * 0.25, this.y);
        vertex(this.x + this.width * 0.25, this.y);
        vertex(this.x + this.width * 0.35, height - 100);
        vertex(this.x - this.width * 0.35, height - 100);
        endShape(CLOSE);
      }
    }),
    (this.draw = function () {
      //draw the flying saucer
      fill(175, 238, 238);
      arc(
        this.x,
        this.y,
        this.width * this.window_width,
        this.height * this.window_height,
        PI,
        TWO_PI
      );
      fill(150);
      arc(this.x, this.y, this.width, this.height / 2, PI, TWO_PI);
      fill(50);
      arc(this.x, this.y, this.width, this.height * this.base_height, 0, PI);
      this.hover();

      fill(255);
      var incr = this.width / (this.num_lights - 1);
      for (var i = 0; i < this.num_lights; i++) {
        var x = this.x - this.width / 2 + i * incr;
        fill(this.brightnesses[i]);
        ellipse(x, this.y, 5, 5);
        this.brightnesses[i] += 5;
        if (this.brightnesses[i] > 255) {
          this.brightnesses[i] = 100;
        }
      }

      this.x += random(-1, 1);
      this.y += random(-1, 1);
    });

  for (var i = 0; i < this.num_lights; i++) {
    this.brightnesses.push((i * 20) % 255);
  }
}
