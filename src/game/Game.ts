import Player from "@/game/Player";
import Enemy from "@/game/Enemy";
import InputHandler from "@/game/InputHandler";

export default class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  player: Player;
  players: Player[];
  enemy: Enemy;
  enemies: Enemy[];
  keys: string[] = [];
  input: InputHandler;

  constructor() {
    this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    this.context = this.canvas?.getContext("2d") as CanvasRenderingContext2D;
    this.player = new Player({
      game: this,
      x: 0,
      y: 0,
    });
    this.enemy = new Enemy({
      game: this,
      x: this.canvas.width,
      y: Math.random() * (this.canvas.height * 0.95 - this.canvas.height),
    });
    this.players = [this.player];
    this.enemies = [this.enemy];
    this.input = new InputHandler(this);
    this.keys = [];
  }

  update() {
    this.players.forEach((i) => i.update());
    this.enemies.forEach((enemy) => enemy.update());
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
  }

  draw() {
    this.players.forEach((i) => i.draw(this.context));
    this.enemies.forEach((enemy) => enemy.draw(this.context));
  }

  addPlayer() {
    this.players.push(
      new Player({
        game: this,
        x: 300,
        y: 0,
        color: "#101ad0",
      })
    );
  }

  addEnemy() {
    const randomize = Math.random();
    if (randomize < 0.5)
      this.enemies.push(
        new Enemy({
          game: this,
          x: 300,
          y: 0,
          color: "#101ad0",
        })
      );
  }
}
