import Game from "@/game/Game";

export interface EnemyOptions {
  game: Game;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  speedX?: number;
  color?: string;
  markedForDeletion?: boolean;
}
export default class Enemy {
  game: Game;
  x: number;
  y: number;
  width: number;
  height: number;
  speedX: number;
  color: string;
  markedForDeletion: boolean;

  constructor({ game }: EnemyOptions) {
    this.game = game;
    this.x = this.game.canvas.width;
    this.y =
      Math.random() *
      (this.game.canvas.height * 0.95 - this.game.canvas.height);
    this.width = 228 * 0.2;
    this.height = 228 * 0.2;

    this.speedX = Math.random() * -1.5 - 2.5;
    this.color = "ff0000";
    this.markedForDeletion = false;
  }

  update() {
    // Обновляем x-координату врага (уменьшаем ее на величину speedX)
    this.x += this.speedX;
    // Помечаем врага как удаленного, если он полностью пересечет левую границу игрового поля
    if (this.x + this.game.canvas.width < 0) this.markedForDeletion = true;
  }

  draw(context: CanvasRenderingContext2D) {
    // Устанавливаем цвет врага
    context.fillStyle = this.color;
    // На данном этапе наш враг будет представлять из себя
    // просто прямоугольник определенного цвета
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
