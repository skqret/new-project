import Player from "@/game/Player";

export default class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  player: Player;
  players: Player[];

  constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.canvas = document.getElementById("gameCanvas");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.context = this.canvas?.getContext("2d");
    this.player = new Player({
      game: this,
      x: 200,
      y: 100,
    });
    this.players = [this.player];
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
