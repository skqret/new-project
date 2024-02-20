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
        (e.code === "KeyD" ||
          e.code === "KeyA" ||
          e.code === "KeyS" ||
          e.code === "KeyW" ||
          e.code === "Space") &&
        this.game.keys.indexOf(e.code) === -1
      ) {
        this.game.keys.push(e.code);
        console.log(this.game.keys);
      }
    });
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (this.game.keys.indexOf(e.code) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(e.code), 1);
      }
    });
  }
}
