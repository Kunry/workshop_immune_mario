class Obstacle {
  constructor(ctx, w, h, posX, posY0) {
    this.ctx = ctx;

    this.w = 18 * w;
    this.h = 18 * h;

    this.posX = posX;
    this.posY = posY0 - 18 * (h - 4);

    this.img = new Image();
    this.img.src = 'img/tileset_gutter.png';
    this.type = 'obstacle';
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      0,
      18 * 8,
      18 * 2,
      18 * 2,
      this.posX,
      this.posY,
      this.w,
      this.h
    );
  }

  move(vx) {
    this.posX -= vx;
  }
}
