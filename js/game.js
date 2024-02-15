class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.w = window.innerWidth;
    this.h = window.innerHeight;

    this.canvas.width = this.w;
    this.canvas.height = this.h;

    this.fps = 60;
    this.frameCounter = 0;
    this.score = 0;
  }

  init() {
    this.player = new Player(this.ctx, this.w, this.h);
    this.background = new Background(this.ctx, this.w, this.h);
    this.obstacles = [
      new Obstacle(this.ctx, 5, 6, this.w * 1.2, this.player.posY0),
      new Obstacle(this.ctx, 5, 8, this.w * 1.5, this.player.posY0),
      new Coin(this.ctx, this.w * 1, this.h * 0.7),

    ];
  }

  start() {
    this.init();

    this.interval = setInterval(() => {
      this.clear();
      this.drawAll();
      this.moveAll();

      this.frameCounter++;
      if (this.frameCounter > 1000) {
        this.frameCounter = 0;
      }
    }, 1000 / this.fps);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  isCollision() {
    const obstacle = this.obstacles.find((obstacle) => {
      return (
        this.player.posX + this.player.w >= obstacle.posX &&
        this.player.posX < obstacle.posX + obstacle.w &&
        this.player.posY + (this.player.h - 20) >= obstacle.posY &&
        this.player.posY < obstacle.posY + obstacle.h
      );
    });
    if (obstacle && obstacle.type === 'coin') {
      this.score += 10;
      this.obstacles.shift();
    }
    return obstacle;
  }


  drawAll() {
    this.background.draw();
    this.player.draw();
    this.obstacles.forEach((obstacle) => {
      obstacle.draw();
    })
  }

  moveAll() {
    const obstacle = this.isCollision();
    console.log(obstacle);
    this.player.move(this.frameCounter, obstacle);
    this.background.move(this.player.vx);
    this.obstacles.forEach((obstacle) => {
      obstacle.move(this.player.vx);
    })
  }


  win() {
    this.stop();

    if (confirm('YOU WIN. Play again?')) {
      this.start();
    }
  }

  stop() {
    clearInterval(this.interval)
  }
}
