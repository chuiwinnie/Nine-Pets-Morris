import { Game } from "./Game.js"
import { Display } from "./Display.js";
import { Board } from "./Board.js";
import { Team } from "./Team.js";
import { Position } from "./Position.js";


/**
 * This class represents an Application that manages and load previously played games and starts new games.
 */
export class Application {
    /**
     * An array of Game objects that have been previously played/created.
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
     * The location of the text file used to store and load games.
     */
    private txtFileLocation?: string;

    /**
     * The singleton instance of the Application class.
     */
    private static applicationInstance: Application;

    /**
     * Constructs a new application with an empty game list and a Display object.
     */
    private constructor() {
        this.gameList = [];
        this.display = Display.getInstance();
    }

    /**
     * Returns the singleton instance of the Application class, creating it if necessary.
     * @returns The singleton instance of the Application class.
     */
    static getInstance(): Application {
        if (Application.applicationInstance == null) {
            Application.applicationInstance = new Application();
        }
        return Application.applicationInstance;
    }

    /**
     * Gets the Game object that is currently being played.
     * @returns The current Game object, or undefined if no game is currently being played.
     */
    getCurrentGame(): Game {
        return this.currentGame;
    }

    /**
     * Starts a new game with an empty board and two teams (Cat and Dog by default).
     */
    startNewGame(): void {
        const boardHistory: Board[] = [];
        boardHistory.push(new Board());

        const newGame = new Game(boardHistory);
        this.gameList.push(newGame);

        const newGameIndex = this.gameList.length - 1;
        this.loadGame(newGameIndex);
    }

    /**
     * Loads the game specified by gameIndex from the gameList and runs it on display.
     * @param gameIndex The index of the game to be loaded from the gameList.
     */
    loadGame(gameIndex: number): void {
        this.currentGame = this.gameList[gameIndex];
        this.currentGame.run(this.display);
    }

    /**
     * Loads games from a TXT file.
     */
    loadFromFile(): void {
        fetch('/load')
            .then(response => response.json())
            .then(data => {
                data.forEach(game => {
                    const gameName = game.name;
                    const gameData = JSON.parse(game.data);

                    console.log('Game Name:', gameName);
                    console.log('Game Data:', gameData);

                    const loadedTeams: Team[] = gameData.teams ? gameData.teams.map((teamData) => {
                        if (teamData) {
                            return new Team(teamData.player, teamData.numUnplacedTokens, teamData.numAliveTokens);
                        } else {
                            return new Team(0, 9, 9);
                        }
                    }) : [];
                    const loadedCurrentPlayer = gameData.currentPlayer;
                    const loadedgamePhase = gameData.gamePhase;
                    const loadedPosition: Position[] = gameData.positions ? gameData.positions.map((positionData, index) => {
                        const player = positionData.player !== undefined && positionData.player !== '' ? positionData.player : undefined;
                        return new Position(player, index);
                    }
                    ) : [];
                    const loadedBoard = new Board(loadedTeams, loadedCurrentPlayer, loadedPosition, loadedgamePhase);
                    const loadedGame = new Game([loadedBoard], loadedBoard, gameName);

                    this.gameList.push(loadedGame);
                    this.display.showGameList(this.gameList);
                });
            })
            .catch(error => {
                console.error('Error loading game data:', error);
            });
    }
}


// get the application instance
const application = Application.getInstance();

// get the current URL
const currentURL = window.location.href;

// load the game list menu or start a new game based on whether the current URL matches the menu page or game page URL
if (currentURL.includes("/menu")) {
    application.loadFromFile();
} else if (currentURL.includes("/")) {
    application.startNewGame();
}
