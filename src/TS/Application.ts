import { Game } from "./Game"
import { Display } from "./Display";

class Application {
    private gameList: Game[];
    private currentGame: Game;
    private display: Display;
    private txtFileLocation?: string;
    private applicationInstance: Application;

    private constructor() {
    }

    public getInstace() {
        if (this.applicationInstance == null) {
            this.applicationInstance = new Application();
        }
        return this.applicationInstance;
    }

    public getCurrentGame() { }

    public startNewGame() { }

    private loadGame(gameIndex: number) { }

    private loadFromFile() { }

    public exit(gameIndex: number) { }
}