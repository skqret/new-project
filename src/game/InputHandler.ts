import Game from "@/game/Game";

export default class InputHandler {
  game: Game;

  constructor(game: Game) {
    this.game = game;
    this.init();
  }

  init() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (
        (e.key === "ArrowUp" || e.key === "ArrowDown") &&
        this.game.keys.indexOf(e.key) === -1
      ) {
        this.game.keys.push(e.key);
        console.log(this.game.keys);
      }
    });
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (this.game.keys.indexOf(e.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
      }
    });
  }
}
