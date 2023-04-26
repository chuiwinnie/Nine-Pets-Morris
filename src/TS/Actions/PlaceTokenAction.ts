import { Action } from "./Action.js";
import { Board } from "../Board.js";


/**
 * This class implements the place token action that can be performed on a game board.
 */
export class PlaceTokenAction extends Action {
    /**
     * The position index on the board to place the token.
     */
    private positionIndex: number;

    /**
     * Constructs a place token action.
     * @param board The board to perform this place token action on.
     * @param positionIndex The position index to place the token.
     */
    constructor(board: Board, positionIndex: number) {
        super(board);
        this.positionIndex = positionIndex;
    }

    /**
     * Performs operations related to token placement.
     * @returns The updated board after token placement.
     */
    execute(): Board {
        if (this.placeToken()) {
            if (this.getBoard().checkMill(this.positionIndex, true)) {
                this.getBoard().incrementGamePhase();
            } else {
                this.getBoard().switchPlayingTeam();
            }
        }
        return this.getBoard();
    }

    /**
     * Places a token on the board at position index.
     * @returns true if the token placement was successful, false otherwise.
     */
    private placeToken(): boolean {
        let position = this.getBoard().getPositions()[this.positionIndex];
        let currentTeam = this.getBoard().getPlayingTeam();
        let currentPlayer = currentTeam.getPlayer();

        // place the token at the specified position if unoccupied
        if (position.getPlayer() == undefined) {
            position.placeToken(currentPlayer);
            currentTeam.placeToken();
            return true;
        }

        return false;
    }
}
