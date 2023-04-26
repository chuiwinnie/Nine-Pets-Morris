import { Orientation } from './enums/Orientation.js';
import { Position } from './Position.js';
import { Team } from './Team.js';
import { Player } from './enums/Player.js';

/**
 * Class representing the game board.
 */
export class Board {
    /**
     * The list of teams in the game.
     */

    teams: Team[]
    /**
     * The current player index.
     */
    currentPlayer: number
    /**
     * The list of positions on the board.
     */
    positions: Position[]
    /**
     * The current phase of the game.
     */
    gamePhase: number
    /**
     * The position where the last token was picked up.
     */
    pickUpPosition?: number
    /**
     * Creates a new board.
     * @param teams - The teams in the game.
     * @param currentPlayer - The current player index.
     * @param positions - The positions on the board.
     * @param gamePhase - The current phase of the game.
     */
    constructor(teams: Team[], currentPlayer: number, positions: Position[], gamePhase: number){
        this.teams = teams
        this.currentPlayer = currentPlayer
        this.positions = positions
        this.gamePhase = gamePhase
    }
    /**
     * Getter method of playingteam
     * @returns playingTeam
     */
    public getPlayingTeam(){
        return this.teams[this.currentPlayer]
    }
    /**
     * Returns the non-playing team.
     * @returns The non-playing team.
     */
    public getNonPlayingTeam(){
        return this.teams[(this.currentPlayer+1)%2]
    }
    /**
     * Returns the team at the specified index.
     * @param index - The index of the team to retrieve.
     * @returns The team at the specified index.
     */
    public getTeam(index: number) {
        return this.teams[index]
    }
    /**
     * Returns the player at the specified position index.
     * @param index - The position index.
     * @returns The player at the specified position index.
     */
    public getPositionTeam(index: number): Player | undefined {
        return this.positions[index].getPlayer()
    }
    /**
     * Performs an action on the board.
     * @param index - The index of the position to perform the action on.
     */
    public action(index: number) {
        switch(this.gamePhase) {
            case 0:
                if (this.removeToken(index, true)) {
                    this.gamePhase++
                    this.pickUpPosition = index
                }
                break;
            case 1:
                if (index != this.pickUpPosition) {
                    if (this.placeToken(index)) {
                        if (this.checkMill(index, true)) {
                            this.gamePhase++
                        } else {
                            this.switchPlayingTeam()
                        }
                    }
                }
                break;
            case 2:
                if (this.removeToken(index, false)) {
                    this.switchPlayingTeam()
                }
                break;
            default:
                break;
        }
    }

    /**
     * removeToken method responsible for removing a Token from the board
     * @param index position of token that need to be remove
     * @param movingToken boolean to determine whether player is performing moving action or removing oponent's token
     * @returns boolean to show if removeToken successful
     */
    public removeToken(index:number, movingToken: boolean){
        let team = this.positions[index].getPlayer()
        //check if player moving a token from one place to a target position
        if (movingToken){
            //check if the token belongs to the player
            if ((team == undefined) || (team != this.getPlayingTeam().getPlayer())){
                return false
            }
        //if it is removing opponent's token
        } else {
            //check if player select oponent's token
            if (team == this.getPlayingTeam().getPlayer()){
                return false
            }
        }
        //check if the token form a mill before remove
        let orientation = this.positions[index].checkMill();
        if (orientation!= Orientation.None){
            //update the other tokens that in the same mill
            this.positions[index].updateMillCounterOrientation(orientation, false)
        }
        this.positions[index].removeToken()
        if (!movingToken) {
            this.getNonPlayingTeam().removeToken()
        }
        return true;
    }
    /**
    *Place a token on the board in the specified position.
    *@param index The index of the position where the token should be placed.
    *@returns A boolean indicating whether the token placement was successful.
    */
    public placeToken(index: number){
        let team = this.positions[index].getPlayer()
        let currentTeam = this.getPlayingTeam()
        if (team == undefined){
            this.positions[index].placeToken(this.currentPlayer)
            currentTeam.placeToken()
            return true
        }
        else{
            return false
        }
    }
    /**
    * Switch the current playing team and update the game phase accordingly.
    */
    public switchPlayingTeam(){
        this.currentPlayer = (this.currentPlayer + 1) % 2
        if (this.getPlayingTeam().getNumUnplacedTokens() > 0){
            this.gamePhase = 1;
        } else {
        this.gamePhase = 0
        }
        this.pickUpPosition = undefined
    }
    /**
     * CheckMill method to check whether the position on the board form a mill
     * @param index  position index to be checked
     * @param addingMill boolean to determine whether is for adding a mill
     * @returns boolean return true if mill formed otherwise return false
     */
    public checkMill(index:number, addingMill:boolean){
        //check mill in the position
        let millOrientation = this.positions[index].checkMill();
        this.positions[index].updateMillCounterOrientation(millOrientation, addingMill)

        return (millOrientation != Orientation.None)
    }
}
