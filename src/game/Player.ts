import Game from "@/game/Game";

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
  game: IOptionsPlayer["game"];
  width: IOptionsPlayer["width"];
  height: IOptionsPlayer["height"];
  x: IOptionsPlayer["x"];
  y: IOptionsPlayer["y"];
  color: IOptionsPlayer["color"];
  speed: IOptionsPlayer["speed"];

  constructor(options: IOptionsPlayer) {
    this.game = options.game;
    this.width = options.width;
    this.height = options.height;
    this.x = options.x;
    this.y = options.y;
    this.color = options.color;
    this.speed = options.speed;
  }

  update() {
    // console.log(1);
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.fillRect(
      this.x || 20,
      this.y || 20,
      this.width || 50,
      this.height || 50
    );
    context.fillStyle = this.color || "#000000";
    context.fill();
    context.closePath();
  }
}
