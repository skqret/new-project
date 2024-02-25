import Game from "@/game/Game";

export interface IProjectileOptions {
  game: Game;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
}

export default class Projectile {
  game: Game;
  x: number;
  y: number;
  width: number;
  height: number;
  speedX: number;
  speedY: number;
  markedForDeletion: boolean;

  constructor({ game, x, y, speedX, speedY }: IProjectileOptions) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 3;
    this.height = 3;
    this.speedX = speedX;
    this.speedY = speedY;
    this.markedForDeletion = false;
  }

  update(): void {
    this.x += this.speedX;
    this.y += this.speedY;
    if (
      this.x < 0 ||
      this.x > this.game.canvas.width ||
      this.y < 0 ||
      this.y > this.game.canvas.height
    ) {
      this.markedForDeletion = true;
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fill();
    context.closePath();
  }
}
