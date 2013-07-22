var Circles = (function () {
  function Circle(centerX, centerY, radius) {
    this.centerX = centerX
    this.centerY = centerY;
    this.radius = radius;
    var dirs = [-1, 1];
    this.xDirection = dirs[Math.floor(Math.random() * 2)];
    this.xSpeed = Math.floor(Math.random() * 10 + 1);

    this.yDirection = dirs[Math.floor(Math.random() * 2)];
    this.ySpeed = Math.floor(Math.random() * 10 + 1);
    this.setRandColor = function(){
        var colors = ["red","blue","black","violet", "purple", "pink"];
        this.color = colors[Math.floor(Math.random() * 6)];
      }
    this.color = this.setRandColor;
  }

  Circle.MAX_RADIUS = 20;
  Circle.randomCircle = function (maxX, maxY) {
    return new Circle(
      Math.floor(maxX * Math.random()),
      Math.floor(maxY * Math.random()),
      Math.floor(Circle.MAX_RADIUS * Math.random())
    );
  };

  Circle.prototype.setRandColor = function(){
    var colors = ["red","blue","black","violet", "purple", "pink"]
    this.color = colors[Math.floor(Math.random() * 6)]
  }

  Circle.prototype.render = function (ctx) {
    console.log(ctx);
    ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.arc(
      this.centerX,
      this.centerY,
      this.radius,
      0,
      2 * Math.PI,
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
    numCircles = this.circles.length
    for (var i = 0; i < numCircles; ++i){
      this.circles[i].centerX = (this.circles[i].centerX +
                                 this.circles[i].xSpeed *
                                 this.circles[i].xDirection);
      if (this.circles[i].centerX < 0 || this.circles[i].centerX > this.xDim){
        this.circles[i].xDirection *= -1
      }
      this.circles[i].centerY = (this.circles[i].centerY +
                                 this.circles[i].ySpeed *
                                 this.circles[i].yDirection +
                                 this.yDim) %
                                 this.yDim ;
      this.circles[i].setRandColor();
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
    }, 100);
  };

  return {
    Circle: Circle,
    Game: Game
  };
})();
