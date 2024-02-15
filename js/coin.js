class Coin {
  constructor(ctx, posX, posY) {
    this.ctx = ctx;

    this.w = 18 * 2;
    this.h = 18 * 2;

    this.posX = posX;
    this.posY = posY;

    this.img = new Image();
    this.img.src = 'img/tileset_gutter.png';
    this.type = 'coin';
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      18 * 25,
      18,
      18,
      18,
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
