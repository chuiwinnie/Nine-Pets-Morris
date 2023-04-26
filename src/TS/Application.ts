import { Game } from "./Game.js"
import { Display } from "./Display.js";
import { Board } from "./Board.js";
import { Team } from "./Team.js";
import { Player } from "./enums/Player.js";
import { Position } from "./Position.js";

export class Application {
    private gameList: Game[];
    private currentGame?: Game;
    private display: Display;
    private txtFileLocation?: string;
    private static applicationInstance: Application;

    private constructor() {
        this.gameList = [];
        this.display = Display.getInstance();
    }

    public static getInstance() {
        if (Application.applicationInstance == null) {
            Application.applicationInstance = new Application();
        }
        return Application.applicationInstance;
    }

    public getCurrentGame() { 
        return this.currentGame;
    }

    public startNewGame() {
        const boardHistory: Board[] = [];
        const teams: Team[] = [new Team(Player.Cat), new Team(Player.Dog)];
        const emptyBoard: Position[] = [];
        for (let i = 0; i < 24; i++) {
            emptyBoard.push(new Position(undefined, i));
        }
        boardHistory.push(new Board(teams, 0, emptyBoard, 1));

        const newGame = new Game(boardHistory, boardHistory[boardHistory.length-1]);
        this.gameList.push(newGame);

        const newGameIndex = this.gameList.length - 1;
        this.loadGame(newGameIndex);
    }

    private loadGame(gameIndex: number) { 
        this.currentGame = this.gameList[gameIndex];
        this.currentGame.run(this.display, gameIndex);
    }

    private loadFromFile() { }

    public exit(gameIndex: number) { }
}

const application = Application.getInstance();
application.startNewGame();