import { Board } from "./Board.js"
import { Display } from "./Display.js";
import { PlaceTokenAction } from "./Actions/PlaceTokenAction.js"
import { RemoveTokenAction } from "./Actions/RemoveTokenAction.js"


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
        this.currentBoard = currentBoard ?? boardHistory[boardHistory.length - 1];
    }

    /**
     * Runs the game and updates the display continuosly until a victory condition is met.
     * @param display The Display object used to show the game.
     */
    run(display: Display): void {
        display.showBoard(this.currentBoard);
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
            this.boardHistory.push(this.currentBoard);
        }

        display.showBoard(this.currentBoard);

        if (this.checkVictory(this.currentBoard)) {
            display.showVictory(this.currentBoard.getNonPlayingTeam().getPlayer());
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
                    this.currentBoard = updatedBoard;
                }
                break;
            // place token
            case 1:
                if ((index != this.currentBoard.getPickUpPosition()) && ((this.currentBoard.getPositions()[index].isNeighbour(this.currentBoard.getPickUpPosition()))) || this.currentBoard.getPickUpPosition() == undefined) {
                    let placeTokenAction = new PlaceTokenAction(this.currentBoard, index);
                    updatedBoard = placeTokenAction.execute();
                    this.currentBoard = updatedBoard;
                }
                break;
            // remove token
            case 2:
                let removeTokenAction = new RemoveTokenAction(this.currentBoard, index, false);
                updatedBoard = removeTokenAction.execute();
                if (updatedBoard) {
                    this.currentBoard = updatedBoard;
                    this.currentBoard.switchPlayingTeam();
                }
                break;
            default:
                break;
        }
    }

    /**
     * Undoes the previous move and updates the display to reflect the previous game state/turn.
     * @param display The Display object used to show the game board.
     * @param gameIndex The index of the currently playing game.
     */
    undo(display: Display): void {
        this.boardHistory.pop();
        this.currentBoard = this.boardHistory[this.boardHistory.length - 1];
        display.showBoard(this.currentBoard);
    }

    /**
     * Checks if a victory condition of the game has been met.
     * @param currentBoard The board representing the current game state/turn.
     * @returns true if a victory condition has been met, false otherwise.
     */
    checkVictory(currentBoard: Board): boolean {
        let currentTeam = currentBoard.getPlayingTeam();
        if (currentTeam.getNumAliveTokens() < 3) {
            return true;
        }
        return false;
    }
}
