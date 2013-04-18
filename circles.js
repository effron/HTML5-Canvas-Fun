var Circles = (function () {
  function Circle(centerX, centerY, radius) {
    this.centerX = centerX
    this.centerY = centerY;
    this.radius = radius;
  }

  Circle.MAX_RADIUS = 25;
  Circle.randomCircle = function (maxX, maxY) {
    return new Circle(
      maxX * Math.random(),
      maxY * Math.random(),
      MAX_RADIUS * Math.random()
    );
  };

  Circle.prototype.draw = function (ctx) {
    ctx.beginPath();

    ctx.arc(
      this.centerX,
      this.centerY,
      this.radius,
      0,
      2 * Math.pi,
      false
    );

    ctx.fill();
  };

  function Game(xDim, yDim, numCircles) {
    this.xDim = xDim;
    this.yDim = yDim

    this.circles = []
    for (var i = 0; i < numCircles; ++i) {
      this.circles.push(Circle.makeCircle(xDim, yDim));
    }
  }

  Game.prototype.render = function (ctx) {
    ctx.clearRect(0, 0, xDim, yDim);

    for (var i = 0; i < this.circles.length; ++i) {
      this.circles[i].render(ctx);
    }
  };

  Game.prototype.start = function (canvasEl) {
    // get a 2d canvas drawing context. The canvas API lets us call
    // a `getContext` method on a cnvas DOM element.
    var ctx = canvasEl.getContext("2d");

    var that = this;
    window.setInterval(function () {
      that.render(ctx);
    });
  };

  return {
    Circle: Circle,
    Game: Game
  };
})();
