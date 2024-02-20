import Game from "@/game/Game";

export interface IProjectileOptions {
  game: Game;
  x: number;
  y: number;
}

export default class Projectile {
  game: Game;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  markedForDeletion: boolean;

  constructor({ game, x, y }: IProjectileOptions) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 3;
    this.speed = 3;
    this.markedForDeletion = false;
  }

  update(): void {
    this.x += this.speed;
    if (this.x > this.game.canvas.width) {
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
