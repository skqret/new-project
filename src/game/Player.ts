import Game from "@/game/Game";
import Projectile from "@/game/Projectile";

export interface IOptionsPlayer {
  game: Game;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  color?: string;
  speed?: number;
}

export default class Player {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  color: string;
  speed: number;
  projectiles: Projectile[];

  constructor(options: IOptionsPlayer) {
    this.game = options.game;
    this.width = options.width || 50;
    this.height = options.height || 50;
    this.x = options.x || 20;
    this.y = options.y || 20;
    this.color = options.color || "#000000";
    this.speed = options.speed || 10;
    this.projectiles = [];
  }

  update() {
    if (this.game.keys.includes("KeyD")) {
      if (this.x + this.width / 2 < this.game.canvas.width) {
        this.x += this.speed;
      }
    } else if (this.game.keys.includes("KeyA")) {
      if (this.x - this.width / 2 >= 0) {
        this.x -= this.speed;
      }
    }

    if (this.game.keys.includes("KeyW")) {
      if (this.y - this.height / 2 > 0) {
        this.y -= this.speed;
      }
    } else if (this.game.keys.includes("KeyS")) {
      if (this.y + this.width / 2 < this.game.canvas.width) {
        this.y += this.speed;
      }
    }

    if (this.game.keys.includes("Space")) {
      this.projectiles.push(
        new Projectile({
          game: this.game,
          x: this.x,
          y: this.y,
        })
      );
    }

    this.projectiles = this.projectiles.filter((i) => {
      i.update();
      return !i.markedForDeletion;
    });
  }

  draw(context: CanvasRenderingContext2D) {
    this.projectiles.forEach((i) => {
      i.draw(context);
    });

    context.beginPath();
    context.fillStyle = "#000000";
    context.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    context.fill();
    context.closePath();
  }
}
