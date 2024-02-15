class Player {
  constructor(ctx, w, h) {
    this.ctx = ctx;

    this.canvasW = w;
    this.canvasH = h;

    this.keys = {
      RIGTH_KEY: 39,
      LEFT_KEY: 37,
      SPACE: 32,
    };

    this.posX = this.canvasW * 0.08;
    this.posY = this.canvasH * 0.8;
    this.posY0 = this.posY;

    this.w = 50;
    this.h = 75;

    this.vx = 0;
    this.vx0 = 5;

    this.vy = 1;
    this.vy0 = this.vy;
    this.gravity = 0.5;

    this.canJump = true;

    this.img = new Image();
    this.img.src = 'img/player.png';
    this.img.frames = 3;
    this.img.frameIndex = 2;

    this.setListeners();
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0,
      Math.floor(this.img.width / this.img.frames),
      this.img.height,
      this.posX,
      this.posY,
      this.w,
      this.h
    );
  }

  setListeners() {
    document.onkeydown = (event) => {
      if (event.keyCode === this.keys.RIGTH_KEY) {
        this.vx = this.vx0;
        this.getObstacle = false;
      }
      if (event.keyCode === this.keys.LEFT_KEY) {
        this.vx = -this.vx0;
        this.getObstacle = false;
      }
      if (event.keyCode === this.keys.SPACE && this.canJump) {
        this.posY -= 5;
        this.vy = -15;
        this.canJump = false;
      }
    };

    document.onkeyup = (event) => {
      if (
        event.keyCode === this.keys.RIGTH_KEY ||
        event.keyCode === this.keys.LEFT_KEY
      ) {
        this.vx = 0;
      }
    };
  }

  animateImage() {
    this.img.frameIndex++;

    if (this.img.frameIndex > 2) {
      this.img.frameIndex = 0;
    }
  }

  move(frameCounter, collisionObstacle) {
    if (this.vx !== 0 && frameCounter % 6 === 0) {
      this.animateImage();
    }
    if (collisionObstacle) {
      if (
        (this.posX + this.w >= collisionObstacle.posX &&
          this.vx > 0 &&
          this.posY + this.h > collisionObstacle.posY &&
          this.posY < collisionObstacle.posY + collisionObstacle.h) ||
        (this.posX < collisionObstacle.posX + collisionObstacle.w &&
          this.vx < 0 &&
          this.posY + this.h > collisionObstacle.posY &&
          this.posY < collisionObstacle.posY + collisionObstacle.h)
      ) {
        this.posX -= this.vx * 2;
        this.vx = 0;
      }

      if (this.posY <= collisionObstacle.posY) {
        console.log('top');
        this.canJump = true;
        this.posY = collisionObstacle.posY - this.h;
        this.getObstacle = true;
        this.vy = 1;
      }

      // // coliision bottom with obstacle
      if (this.posY + this.h < collisionObstacle.posY) {
        console.log('bottom');
        this.y = collisionObstacle.posY + collisionObstacle.h;
        this.vy = 0.5;
        collisionObstacle = undefined;
      }
    }

    this.posX += this.vx;
    if (!(collisionObstacle || this.getObstacle)) {
      if (this.posY >= this.posY0) {
        this.vy = this.vy0;
        this.posY = this.posY0;
        this.canJump = true;
      } else {
        this.vy += this.gravity;
        this.posY += this.vy;
      }
    }
  }
}
