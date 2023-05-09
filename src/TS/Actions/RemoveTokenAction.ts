import { Action } from "./Action.js";
import { Board } from "../Board.js";


/**
 * This class implements the remove token action that can be performed on a game board.
 */
export class RemoveTokenAction extends Action {
    /**
     * The position index on the board to remove the token from.
     */
    private positionIndex: number;


    /**
     * Indicates whether it is moving the palyer's own token (true) or removing oponent's token (false).
     */
    private movingOwnToken: boolean;

    /**
     * Constructs a remove token action.
     * @param board The board to perform this place token action on.
     * @param positionIndex The position index to place the token.
     * @param movingOwnToken Indicates whether it is moving the palyer's own token.
     */
    constructor(board: Board, positionIndex: number, movingOwnToken: boolean) {
        super(board);
        this.positionIndex = positionIndex;
        this.movingOwnToken = movingOwnToken;
    }

    /**
     * Performs operations related to token removal.
     * @returns The updated board after token removal.
     */
    execute(): Board {
        if (this.removeToken()) {
            this.getBoard().incrementGamePhase();
            this.getBoard().setPickUpPosition(this.positionIndex);
            return this.getBoard();
        }
        return undefined;
    }

    /**
     * Removes the token at position index from the board.
     * @returns true if the token removal was successful, false otherwise.
     */
    private removeToken(): boolean {
        let position = this.getBoard().getPositions()[this.positionIndex];
        let positionPlayer = position.getPlayer();
        let playingTeamPlayer = this.getBoard().getPlayingTeam().getPlayer();
        let nonPlayingTeamPlayer = this.getBoard().getNonPlayingTeam().getPlayer();

        if (this.movingOwnToken && position.isStuck()) {
            return false;
        }

        // check if player is moving their own token from the specified position
        if (this.movingOwnToken == true) {
            // check if the token belongs to the player
            if (positionPlayer != playingTeamPlayer) {
                return false;
            }
            else{
                position.removeToken();
            }
        } else {
            //check if the token belongs to the opponent
            if (positionPlayer != nonPlayingTeamPlayer) {
                return false;
            }else{
        

            // check if the specified token is a part of a mill before it is removed and player is not removing own piece
            if (this.getBoard().checkMill(this.positionIndex, false) && this.movingOwnToken==false){
                console.log("the token is part of the mill")
                //check if all the token is in part of the mill
                let allTokenInMill = true;
                for (let i=0 ; i < this.getBoard().getPositions().length ; i++) {
                    let currentPosition = this.getBoard().getPositions()[i];
                    //check if it is oponent's token
                    if (playingTeamPlayer != currentPosition.getPlayer() && currentPosition.getPlayer()!= undefined) {
                        allTokenInMill = this.getBoard().checkMill(i, false)
                        if (!allTokenInMill){
                            return false
                        }
                    }
                }

                if (allTokenInMill){
                    position.removeToken();
                    // decrement the opponent's number of alive tokens if one is removed
                    this.getBoard().getNonPlayingTeam().removeToken();
                }
                else{
                    return false
                }
            }
            else if (this.movingOwnToken==false && this.getBoard().checkMill(this.positionIndex, false) == false){
                position.removeToken();
                // decrement the opponent's number of alive tokens if one is removed
                this.getBoard().getNonPlayingTeam().removeToken();
            }
        }
    }
        
        

        return true;
    }
}
