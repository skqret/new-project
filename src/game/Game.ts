import Player from "@/game/Player";
import InputHandler from "@/game/InputHandler";
export default class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  player: Player;
  players: Player[];
  keys: string[] = [];
  input: InputHandler;

  constructor() {
    this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    this.context = this.canvas?.getContext("2d") as CanvasRenderingContext2D;
    this.player = new Player({
      game: this,
      x: 200,
      y: 100,
    });
    this.players = [this.player];
    this.input = new InputHandler(this);
    this.keys = [];
  }

  update() {
    this.players.forEach((i) => i.update());
  }

  draw() {
    this.players.forEach((i) => i.draw(this.context));
  }

  addPlayer() {
    this.players.push(
      new Player({
        game: this,
        x: 300,
        y: 150,
        color: "#101ad0",
      })
    );
  }
}
