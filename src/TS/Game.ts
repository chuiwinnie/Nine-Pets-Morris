import { Board } from "./Board.js"
import { Display } from "./Display.js";
import { PlaceTokenAction } from "./Actions/PlaceTokenAction.js"
import { RemoveTokenAction } from "./Actions/RemoveTokenAction.js"
import { SwitchTurnAction } from "./Actions/SwitchTurnAction.js"


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
    run(display: Display) {        
        display.showBoard(this.currentBoard);
    }

    /**
     * Executes an action on the game board and adds the resulting board to the board history.
     * @param display The Display object used to show the game.
     * @param index The position index to execute the action on.
     * @param isUndoing Indicates whether this is an undoing action.
     */
    action(display: Display, index: number, isUndoing: boolean) {
        if (isUndoing) {
            this.undo(display);
        } else {
            this.currentBoard.action(index);
            this.boardHistory.push(this.currentBoard);
        }

        display.showBoard(this.currentBoard);

        if (this.checkVictory(this.currentBoard)) {
            display.showVictory(this.currentBoard.getNonPlayingTeam().getPlayer());
        }
    }

    /**
     * Checks if a victory condition of the game has been met.
     * @param currentBoard The board representing the current game state/turn.
     * @returns true if a victory condition has been met, false otherwise.
     */
    checkVictory(currentBoard: Board) {
        let currentTeam = currentBoard.getPlayingTeam();
        if (currentTeam.getNumAliveTokens() < 3) {
            return true;
        }
        return false;
    }

    /**
     * Undoes the previous move and updates the display to reflect the previous game state/turn.
     * @param display The Display object used to show the game board.
     * @param gameIndex The index of the currently playing game.
     */
    undo(display: Display) {
        this.boardHistory.pop();
        this.currentBoard = this.boardHistory[this.boardHistory.length - 1];
        display.showBoard(this.currentBoard);
    }
}
