class Background {
  constructor(ctx, w, h) {
    this.ctx = ctx;

    this.w = w;
    this.h = h;

    this.posX = 0;

    this.img = new Image();
    this.img.src = 'img/bg.png';
  }

  draw() {
    this.ctx.drawImage(this.img, this.posX, 0, this.w, this.h);
    this.ctx.drawImage(this.img, this.posX + this.w, 0, this.w, this.h);
    this.ctx.drawImage(this.img, this.posX - this.w, 0, this.w, this.h);
  }

  move(playerVx) {
    this.posX -= playerVx;

    if(this.posX < -this.w) this.posX = 0;
    if(this.posX > this.w) this.posX = 0;
  }
}
