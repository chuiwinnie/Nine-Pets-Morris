import { Board } from "./Board.js"
import { Display } from "./Display.js";
import {PlaceTokenAction} from "./Actions/PlaceTokenAction.js"
import {RemoveTokenAction} from "./Actions/RemoveTokenAction.js"
import {SwitchTurnAction} from "./Actions/SwitchTurnAction.js"

/**
 * Game class to implement the game and allow the game to be played
 */
export class Game {
    //attriute
    boardHistory: Board[];
    currentBoard: Board;


    //Constructor
    constructor (boardHistory: Board[], currentBoard: Board){
        this.boardHistory = boardHistory;
        this.currentBoard = currentBoard;
    }

    /**
     * Runs the game and updates the display until a victory condition is met.
     * @param display Display type - the display object used to update the game board
     * @param gameIndex number - gameIndex of the current game being played
     */
    public run(display: Display, gameIndex: number){
            display.showBoard(this.currentBoard);
    }


    public action(display: Display, index: number, isUndoing: boolean) {
        if (isUndoing) {
            this.undo(display)
        } else {
            this.currentBoard.action(index)
            this.boardHistory.push(this.currentBoard)
        }
        display.showBoard(this.currentBoard)
        console.log(this.currentBoard)
    }

    /**
     * Checks if the victory condition of the game has been met.
     * @param Board type currentBoard - The current state of the game board.
     * @returns boolean - True if the victory condition has not been met, false otherwise.
     */
    public checkVictory(currentBoard: Board){
        let currentTeam = currentBoard.getCurrentTeam()
        if (currentTeam.getNumAliveTokens()<3){
            return false
        }
        return true
    }


    /**
     * Undoes the previous move and updates the display to reflect the previous game state.
     * @param display - The display object used to update the game board.
     * @param gameIndex - The index of the current game being played.
     */
    public undo(display: Display){
        this.boardHistory.pop()
        this.currentBoard = this.boardHistory[this.boardHistory.length-1]
        display.showBoard(this.currentBoard)
    }
}