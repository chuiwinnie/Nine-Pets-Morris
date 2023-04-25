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
        // while (this.checkVictory(this.currentBoard)){
            let end = this.boardHistory.length-1;
            // duplicate last board 
            this.currentBoard = this.boardHistory[end]

            display.showBoard(gameIndex, this.currentBoard);
            
            // remove own token for move
            let removeOwnTokenAction = new RemoveTokenAction(this.currentBoard, true)
            let previousIndex = removeOwnTokenAction.execute()

            // select new position for selected/removed token
            // let placeTokenAction = new PlaceTokenAction(this.currentBoard, previousIndex)
            // let newIndex = placeTokenAction.execute()
            
            display.showBoard(gameIndex, this.currentBoard)

            // remove opponent's token if mill formed
            // if (this.currentBoard.checkMill(newIndex, true)){
            //     let removeOpponentTokenAction = new RemoveTokenAction(this.currentBoard, false)
            //     removeOpponentTokenAction.execute()
            // }

            // switch turns
            let switchTurnAction = new SwitchTurnAction(this.currentBoard)
            switchTurnAction.execute()
            
            this.boardHistory.push(this.currentBoard)

        // }
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
    public undo(display: Display, gameIndex: number){
        this.boardHistory.pop()
        this.run(display, gameIndex)
    }
}