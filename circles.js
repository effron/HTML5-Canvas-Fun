var Circles = (function () {
  function Circle(centerX, centerY, radius) {
    this.centerX = centerX
    this.centerY = centerY;
    this.radius = radius;
    var dirs = [-1, 1];
    this.xDirection = dirs[Math.floor(Math.random() * 2)];
    this.xSpeed = Math.floor(Math.random() * 5 + 1);
    this.yDirection = dirs[Math.floor(Math.random() * 2)];
    this.ySpeed = Math.floor(Math.random() * 5 + 1);
    this.rotateSpeed = .5;
    this.startAngle = 3 * Math.PI/2;
    this.endAngle =   2 * Math.PI;
    
    this.rChange = .5;
    
    var colors = ["red","blue","purple", "cyan", "DarkViolet",
                  "Indigo", "DarkTurquoise", "DeepSkyBlue"];
    this.setRandColor = function(){
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  Circle.MAX_RADIUS = 20;
  Circle.randomCircle = function (maxX, maxY) {
    var radius = Math.floor(Circle.MAX_RADIUS * Math.random());
    var xpos = Math.floor(maxX * Math.random());
    if(xpos < radius){
      xpos += radius;
    }
    else if(xpos > maxX - radius){
      xpos -= radius;
    }

    var ypos = Math.floor(maxY * Math.random());
    if(ypos < radius){
      ypos += radius;
    }
    else if(ypos > maxY - radius){
      ypos -= radius;
    }
    return new Circle(xpos, ypos, radius);
  };


  Circle.prototype.render = function (ctx) {
    console.log(ctx);
    ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.arc(
      this.centerX,
      this.centerY,
      this.radius,
      this.startAngle,
      this.endAngle,
      false
    );

    ctx.fill();
  };

  function Game(xDim, yDim, numCircles) {
    this.xDim = xDim;
    this.yDim = yDim

    this.circles = []
    for (var i = 0; i < numCircles; ++i) {
      this.circles.push(Circle.randomCircle(xDim, yDim));
    }
  }

  Game.prototype.render = function (ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    this.moveCircles()

    for (var i = 0; i < this.circles.length; ++i) {
      console.log(this.circles[i]);

      this.circles[i].render(ctx);
    }
  };

  Game.prototype.moveCircles = function(){

    var numCircles = this.circles.length
    for (var i = 0; i < numCircles; ++i){
      var radius = this.circles[i].radius
      
      this.circles[i].centerX = (this.circles[i].centerX +
                                 this.circles[i].xSpeed *
                                 this.circles[i].xDirection);
      if (this.circles[i].centerX < radius){
        this.circles[i].xDirection = 1;
        this.circles[i].setRandColor();
      } 
      else if(this.circles[i].centerX > this.xDim - radius){
        this.circles[i].xDirection = -1;
      }
      
      this.circles[i].centerY = (this.circles[i].centerY +
                                 this.circles[i].ySpeed *
                                 this.circles[i].yDirection)

      if (this.circles[i].centerY < radius){
        this.circles[i].yDirection = 1;
        this.circles[i].setRandColor();
      } 
      else if(this.circles[i].centerY > this.yDim - radius){
       this.circles[i].yDirection = -1;
       this.circles[i].setRandColor();
      }
      
      this.circles[i].radius += this.circles[i].rChange
      if (this.circles[i].radius >= Circle.MAX_RADIUS || this.circles[i].radius < 1){
        this.circles[i].rChange *= -1;
      }
      
      this.circles[i].startAngle += this.circles[i].rotateSpeed;
      this.circles[i].endAngle += this.circles[i].rotateSpeed;
    }
  };

  Game.prototype.start = function (canvasEl) {
    // get a 2d canvas drawing context. The canvas API lets us call
    // a `getContext` method on a cnvas DOM element.
    var ctx = canvasEl.getContext("2d");

    // render at 60 FPS
    var that = this;
    window.setInterval(function () {
      that.render(ctx);
    }, 15);
  };

  return {
    Circle: Circle,
    Game: Game
  };
})();
