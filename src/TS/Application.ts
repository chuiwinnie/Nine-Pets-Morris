/**
 * Established coding standards applied: Google TypeScript Style Guide (https://google.github.io/styleguide/tsguide.html)
 */


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
     * The singleton instance of the Application class.
     */
    private static applicationInstance: Application;

    /**
     * A boolean indicating whether the application is currently showing the menu page or the game page.
     */
    showingMenu: Boolean = true;

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
     * Starts a new game.
     */
    startNewGame(): void {
        const newGameIndex = this.gameList.length;
        this.loadGame(newGameIndex);
    }

    /**
     * Loads the game specified by gameIndex from the gameList.
     * @param gameIndex The index of the game to be loaded from the gameList.
     */
    loadGame(gameIndex: number): void {
        localStorage.setItem("currentGameIndex", gameIndex.toString());
        window.location.href = '/';
    }

    /**
     * Loads games from the TXT data file.
     */
    loadFromFile(): void {
        // send request to server for /load 
        fetch('/load')
            .then(response => response.json())
            .then(data => {
                // if data return successfully
                var gameIndexCounter = 0;

                // load each game
                data.forEach(game => {
                    const gameName = game.name;
                    // split each line using '\r'
                    const boards = game.data.split('\r');
                    const boardHist: Board[] = [];

                    // load each board of the game
                    boards.forEach(board => {
                        // check if it is last line
                        if (board.trim() === '') return;

                        // convert board data from JSON to object
                        const gameData = JSON.parse(board);

                        // create Team, current player, gamePhase, and postion of each board
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
                        // create board and add to board history
                        const loadedBoard = new Board(loadedTeams, loadedCurrentPlayer, loadedPosition, loadedgamePhase);
                        boardHist.push(loadedBoard);
                    });

                    // create Game and add to gameList
                    const loadedGame = new Game(boardHist, gameIndexCounter, boardHist[-1], gameName);
                    this.gameList.push(loadedGame);
                    gameIndexCounter++;
                });

                // load the application
                this.loadApplication();
            })
            .catch(error => {
                console.error('Error loading game data:', error);
            });
    }

    /**
     * Loads the application to show either the menu page or the game page.
     */
    private loadApplication(): void {
        // check showingMenu 
        if (this.showingMenu) {
            // display game list if true
            this.display.showGameList(this.gameList);
        } else {
            // retrieve game index from local storage
            const currentGameIndex = localStorage.getItem("currentGameIndex");
            if (Number(currentGameIndex) >= this.gameList.length) {
                this.createNewGame(Number(currentGameIndex));
            }
            // set up current game and run game
            this.currentGame = this.gameList[currentGameIndex];
            this.currentGame.run(this.display);
            console.log(`Loaded Game\n  Index: ${currentGameIndex}\n  Name: ${this.currentGame.getName()}`);
        }
    }

    /**
     * Creates a new with an empty board and two teams (Cat and Dog by default).
     */
    private createNewGame(currentGameIndex?: number): void {
        // create empty board history 
        const boardHistory: Board[] = [];
        boardHistory.push(new Board());

        // create new game
        var newGame = new Game(boardHistory);
        if (currentGameIndex) {
            newGame = new Game(boardHistory, currentGameIndex);
        }

        // add to gamelist
        this.gameList.push(newGame);
    }
    /**
     * Download game data as a simple txt file
     */
    downloadGameData(): void {
        // specify file name
        const fileName = "data.txt"

        // request /download to server
        fetch('/download')
            .then(response => {
                // check response
                if (!response.ok) {
                    throw new Error('Error while downloading the file');
                }
                return response.blob();
            })
            .then(content => {
                // perform download file using blob
                const blob = new Blob([content], { type: 'text/plain' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName;

                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            })
            .catch(error => {
                console.error('Error while downloading the file:', error);
            });
    }
}


// get the application instance
const application = Application.getInstance();

// get the current URL
const currentURL = window.location.href;

// load the application with either the menu page or the game page
if (currentURL.includes("/menu")) {
    application.showingMenu = true;
} else if (currentURL.includes("/")) {
    application.showingMenu = false;
}
application.loadFromFile();
console.log("Current game index: " + localStorage.getItem("currentGameIndex"));
