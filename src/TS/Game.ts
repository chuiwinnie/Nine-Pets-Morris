import { Board } from "./Board.js"
import { Display } from "./Display.js";
import { PlaceTokenAction } from "./Actions/PlaceTokenAction.js"
import { RemoveTokenAction } from "./Actions/RemoveTokenAction.js"
import fs from 'fs';

/**
 * Implement a game and allows the game to be played.
 */
export class Game {
    /**
     * An array of boards representing previous turns/states of the game.
     */
    private boardHistory: Board[];

    /**
     * The board representing the current turn/state of the game.
     */
    private currentBoard: Board;

    /**
     * Contructs a game with the specified board history.
     * @param boardHistory An array of previous boards.
     * @param currentBoard The current board of the game.
     */
    constructor(boardHistory: Board[], currentBoard?: Board) {
        this.boardHistory = boardHistory;
        let topBoard = this.boardHistory[this.boardHistory.length - 1];
        topBoard = new Board(topBoard.getTeams(), topBoard.getCurrentPlayer(), topBoard.getPositions(), topBoard.getGamePhase())
        this.currentBoard = currentBoard ?? topBoard;
    }

    /**
     * Runs the game and updates the display continuosly until a victory condition is met.
     * @param display The Display object used to show the game.
     */
    run(display: Display): void {
        display.showBoard(this, this.currentBoard);
    }

    /**
     * Executes an action on the game board and adds the resulting board to the board history.
     * @param display The Display object used to show the game.
     * @param index The position index to execute the action on.
     * @param isUndoing Indicates whether this is an undoing action.
     */
    action(display: Display, index: number, isUndoing: boolean): void {
        if (isUndoing) {
            this.undo(display);
        } else {
            this.performAction(index);
        }

        if (this.checkVictory(this.currentBoard) && this.currentBoard.getGamePhase()!=1) {
            display.showBoard(this, this.currentBoard, true);
            display.showVictory(this.currentBoard.getNonPlayingTeam().getPlayer());
        } else {
            display.showBoard(this, this.currentBoard);
        }
    }

    /**
     * Performs the correct action at the specified index based on the game phase.
     * @param index The position index to perform the action on.
     */
    private performAction(index: number): void {
        let updatedBoard: Board;
        switch (this.currentBoard.getGamePhase()) {
            // pick up token
            case 0:
                let moveTokenAction = new RemoveTokenAction(this.currentBoard, index, true);
                updatedBoard = moveTokenAction.execute();
                if (updatedBoard) {
                    this.updateBoard();
                }
                break;
            // place token
            case 1:
                if (index != this.currentBoard.getPickUpPositionIndex()) {
                    let placeTokenAction = new PlaceTokenAction(this.currentBoard, index, this.currentBoard.getPickUpPositionIndex());
                    updatedBoard = placeTokenAction.execute();
                    if (updatedBoard) {
                        this.updateBoard();
                    }
                }
                break;
            // remove token
            case 2:
                let removeTokenAction = new RemoveTokenAction(this.currentBoard, index, false);
                updatedBoard = removeTokenAction.execute();
                if (updatedBoard) {
                    this.currentBoard.switchPlayingTeam();
                    this.updateBoard();
                }
                break;
            default:
                break;
        }
    }

    private updateBoard(): void {
        this.boardHistory.push(this.currentBoard);
        this.currentBoard = new Board(this.currentBoard.getTeams(), this.currentBoard.getCurrentPlayer(), this.currentBoard.getPositions(), this.currentBoard.getGamePhase());
    }

    /**
     * Undoes the previous move and updates the display to reflect the previous game state/turn.
     * @param display The Display object used to show the game board.
     * @param gameIndex The index of the currently playing game.
     */
    undo(display: Display): void {
        if (this.boardHistory.length > 1) {
            this.boardHistory.pop();
            let topBoard = this.boardHistory[this.boardHistory.length - 1];
            this.currentBoard = new Board(topBoard.getTeams(), topBoard.getCurrentPlayer(), topBoard.getPositions(), topBoard.getGamePhase());
        }
        display.showBoard(this, this.currentBoard);
    }

    exit(display: Display): void {
        console.log("Exit Game")
    }

    savetoFile(display:Display):void{
        const jsonContent = JSON.stringify(this.boardHistory.map((board) => board.toJSON()));
        const blob = new Blob([jsonContent], {type: 'application/json'});

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'data.json';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    /**
     * Checks if a victory condition of the game has been met.
     * @param currentBoard The board representing the current game state/turn.
     * @returns true if a victory condition has been met, false otherwise.
     */
    checkVictory(currentBoard: Board): boolean {
        let currentTeam = currentBoard.getPlayingTeam();

        // current team loses if it has less than 3 alive tokens
        if (currentTeam.getNumAliveTokens() < 3) {
            return true;
        }

        // current team is still in the game if it has not placed all its tokens
        if (currentTeam.getNumUnplacedTokens() > 0) {
            return false;
        }

        let unableToMove = true;
        for (let i=0 ; i < this.currentBoard.getPositions().length ; i++) {
            let currentPosition = this.currentBoard.getPositions()[i];
            // current team is still in the game if it has at least 1 position that is not stuck
            if (currentPosition.getPlayer() == this.currentBoard.getPlayingTeam().getPlayer() && !currentPosition.isStuck()) {
                unableToMove = false;
                break;
            }
        }
        
        return unableToMove;
    }
}
