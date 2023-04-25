import { Game } from "./Game";
import { Board } from "./Board";
import { Team } from "./Team";

export class Display {
    private displayInstance: Display;

    private constructor() { }

    public getInstance() {
        if (this.displayInstance == null) {
            this.displayInstance = new Display();
        }
        return this.displayInstance;
    }

    public showMainMeu() { }

    public showGameList(gameList: Game[]) { }

    public showBoard(gameIndex: number, board: Board) { }

    public showVictory(team: Team) { }
}