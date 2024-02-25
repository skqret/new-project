import Game from "@/game/Game";
import Projectile from "@/game/Projectile";

export interface IOptionsPlayer {
  game: Game;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  color?: string;
  angle?: number;
  speed?: number;
  projectileSpeed?: number;
}

export default class Player {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  color: string;
  angle: number; // Угол поворота игрока
  speed: number;
  projectileSpeed: number;
  projectiles: Projectile[];
  lastShootTime: number;
  mouseX: number;
  mouseY: number;

  constructor(options: IOptionsPlayer) {
    this.game = options.game;
    this.width = options.width || 50;
    this.height = options.height || 50;
    this.x = options.x || 20;
    this.y = options.y || 20;
    this.color = options.color || "#000000";
    this.angle = options.angle || 0;
    this.speed = options.speed || 3;
    this.projectileSpeed = options.projectileSpeed || 3;
    this.projectiles = [];
    this.lastShootTime = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.game.canvas.addEventListener(
      "mousemove",
      this.handleMouseMove.bind(this)
    );
    this.game.canvas.addEventListener(
      "mousemove",
      this.playerHandleMouseMove.bind(this)
    );
  }

  handleMouseMove(event: MouseEvent) {
    const rect = this.game.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  }

  playerHandleMouseMove(event: MouseEvent) {
    const rect = this.game.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Вычисляем угол между текущим положением игрока и позицией указателя мыши
    const angle = Math.atan2(mouseY - this.y, mouseX - this.x);

    // Поворачиваем игрока к указателю мыши
    this.rotate(angle);
  }

  rotate(angle: number) {
    this.angle = angle;
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
      const currentTime: number = Date.now();
      if (currentTime - this.lastShootTime >= 100) {
        const angle = Math.atan2(this.mouseY - this.y, this.mouseX - this.x);
        const speedX = Math.cos(angle) * this.projectileSpeed;
        const speedY = Math.sin(angle) * this.projectileSpeed;

        this.projectiles.push(
          new Projectile({
            game: this.game,
            x: this.x,
            y: this.y,
            speedX: speedX,
            speedY: speedY,
          })
        );
        this.lastShootTime = currentTime;
      }
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
    context.save(); // Сохраняем текущее состояние контекста
    context.translate(this.x, this.y); // Перемещаем контекст в центр игрока
    context.rotate(this.angle); // Поворачиваем контекст на угол поворота игрока
    context.fillStyle = this.color; // Устанавливаем цвет заполнения
    context.fillRect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    ); // Рисуем квадрат в центре
    context.restore(); // Восстанавливаем предыдущее состояние контекста
  }
}
