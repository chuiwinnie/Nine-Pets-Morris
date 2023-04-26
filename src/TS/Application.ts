import { Game } from "./Game.js"
import { Display } from "./Display.js";
import { Board } from "./Board.js";
import { Team } from "./Team.js";
import { Player } from "./enums/Player.js";
import { Position } from "./Position.js";
import { Direction } from "./enums/Direction.js";

/**
 * This class represents an Application that manages the game state, starts new games, and handles
 * the user interface.
 */
export class Application {
    /**
     * An array of Game objects that have been created.
     */
    private gameList: Game[];
    
    /**
     * The Game object that is currently being played.
     */
    private currentGame?: Game;
    /**
     * The Display object used to handle the user interface.
     */
    private display: Display;
    
    /**
     * The location of the text file used to load games.
     */
    private txtFileLocation?: string;

    /**
     * The singleton instance of the Application class.
     */
    private static applicationInstance: Application;
    /**
     * Constructs a new Application object with an empty game list and a new Display object.
     */
    private constructor() {
        this.gameList = [];
        this.display = Display.getInstance();
    }
    /**
     * Returns the singleton instance of the Application class, creating it if necessary.
     *
     * @returns The singleton instance of the Application class.
     */
    public static getInstance() {
        if (Application.applicationInstance == null) {
            Application.applicationInstance = new Application();
        }
        return Application.applicationInstance;
    }
    /**
     * Returns the Game object that is currently being played.
     *
     * @returns The current Game object, or undefined if no game is currently being played.
     */
    public getCurrentGame() { 
        return this.currentGame;
    }

    /**
     * Starts a new game with an empty board and two teams (one with Player.Cat and one with Player.Dog).
     */
    public startNewGame() {
        const boardHistory: Board[] = [];
        const teams: Team[] = [new Team(Player.Cat), new Team(Player.Dog)];
        const emptyBoard: Position[] = [];
        for (let i = 0; i < 24; i++) {
            emptyBoard.push(new Position(undefined, i));
        }

        emptyBoard[0].setNode(Direction.Right, emptyBoard[1]);
        emptyBoard[0].setNode(Direction.Down, emptyBoard[9]);

        emptyBoard[1].setNode(Direction.Left, emptyBoard[0]);
        emptyBoard[1].setNode(Direction.Right, emptyBoard[2]);
        emptyBoard[1].setNode(Direction.Down, emptyBoard[4]);

        emptyBoard[2].setNode(Direction.Left, emptyBoard[1]);
        emptyBoard[2].setNode(Direction.Down, emptyBoard[14]);

        emptyBoard[3].setNode(Direction.Right, emptyBoard[4]);
        emptyBoard[3].setNode(Direction.Down, emptyBoard[10]);

        emptyBoard[4].setNode(Direction.Left, emptyBoard[3]);
        emptyBoard[4].setNode(Direction.Right, emptyBoard[5]);
        emptyBoard[4].setNode(Direction.Up, emptyBoard[1]);
        emptyBoard[4].setNode(Direction.Down, emptyBoard[7]);

        emptyBoard[5].setNode(Direction.Left, emptyBoard[4]);
        emptyBoard[5].setNode(Direction.Down, emptyBoard[13]);

        emptyBoard[6].setNode(Direction.Right, emptyBoard[7]);
        emptyBoard[6].setNode(Direction.Down, emptyBoard[11]);

        emptyBoard[7].setNode(Direction.Left, emptyBoard[6]);
        emptyBoard[7].setNode(Direction.Right, emptyBoard[8]);
        emptyBoard[7].setNode(Direction.Up, emptyBoard[4]);

        emptyBoard[8].setNode(Direction.Left, emptyBoard[7]);
        emptyBoard[8].setNode(Direction.Down, emptyBoard[12]);

        emptyBoard[9].setNode(Direction.Up, emptyBoard[0]);
        emptyBoard[9].setNode(Direction.Right, emptyBoard[10]);
        emptyBoard[9].setNode(Direction.Down, emptyBoard[21]);

        emptyBoard[10].setNode(Direction.Left, emptyBoard[9]);
        emptyBoard[10].setNode(Direction.Right, emptyBoard[11]);
        emptyBoard[10].setNode(Direction.Up, emptyBoard[3]);
        emptyBoard[10].setNode(Direction.Down, emptyBoard[18]);

        emptyBoard[11].setNode(Direction.Left, emptyBoard[10]);
        emptyBoard[11].setNode(Direction.Up, emptyBoard[6]);
        emptyBoard[11].setNode(Direction.Down, emptyBoard[15]);

        emptyBoard[12].setNode(Direction.Up, emptyBoard[8]);
        emptyBoard[12].setNode(Direction.Right, emptyBoard[13]);
        emptyBoard[12].setNode(Direction.Down, emptyBoard[17]);

        emptyBoard[13].setNode(Direction.Left, emptyBoard[12]);
        emptyBoard[13].setNode(Direction.Right, emptyBoard[14]);
        emptyBoard[13].setNode(Direction.Up, emptyBoard[5]);
        emptyBoard[13].setNode(Direction.Down, emptyBoard[20]);

        emptyBoard[14].setNode(Direction.Left, emptyBoard[13]);
        emptyBoard[14].setNode(Direction.Up, emptyBoard[2]);
        emptyBoard[14].setNode(Direction.Down, emptyBoard[23]);

        emptyBoard[15].setNode(Direction.Up, emptyBoard[11]);
        emptyBoard[15].setNode(Direction.Right, emptyBoard[16]);

        emptyBoard[16].setNode(Direction.Left, emptyBoard[15]);
        emptyBoard[16].setNode(Direction.Right, emptyBoard[17]);
        emptyBoard[16].setNode(Direction.Down, emptyBoard[19]);

        emptyBoard[17].setNode(Direction.Left, emptyBoard[16]);
        emptyBoard[17].setNode(Direction.Up, emptyBoard[12]);

        emptyBoard[18].setNode(Direction.Up, emptyBoard[10]);
        emptyBoard[18].setNode(Direction.Right, emptyBoard[19]);

        emptyBoard[19].setNode(Direction.Left, emptyBoard[18]);
        emptyBoard[19].setNode(Direction.Right, emptyBoard[20]);
        emptyBoard[19].setNode(Direction.Up, emptyBoard[16]);
        emptyBoard[19].setNode(Direction.Down, emptyBoard[22]);

        emptyBoard[20].setNode(Direction.Left, emptyBoard[19]);
        emptyBoard[20].setNode(Direction.Up, emptyBoard[13]);

        emptyBoard[21].setNode(Direction.Up, emptyBoard[9]);
        emptyBoard[21].setNode(Direction.Right, emptyBoard[22]);

        emptyBoard[22].setNode(Direction.Left, emptyBoard[21]);
        emptyBoard[22].setNode(Direction.Right, emptyBoard[23]);
        emptyBoard[22].setNode(Direction.Up, emptyBoard[19]);

        emptyBoard[23].setNode(Direction.Left, emptyBoard[22]);
        emptyBoard[23].setNode(Direction.Up, emptyBoard[14]);

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
