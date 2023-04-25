import { Player } from '../Enums/Player';
import { Orientation } from '../Enums/Orientation';
import { Position } from './Position';
import { Team } from './Team';

export class Board {
    teams: Team[]
    currentPlayer: number
    positions: Position[]

    constructor(teams: Team[], currentPlayer: number, positions: Position[]){
        this.teams = teams
        this.currentPlayer = currentPlayer
        this.positions = positions
    }
    /**
     * Getter method of playingteam
     * @returns playingTeam
     */
    public getCurrentTeam(){
        return this.teams[this.currentPlayer]
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
            if ((team == undefined) || (team != this.getCurrentTeam().getPlayer())){
                return false
            }
        //if it is removing opponent's token
        } else {
            //check if player select oponent's token
            if (team == this.getCurrentTeam().getPlayer()){
                return false
            }
        }
        //check if the token form a mill before remove
        let orientation = this.positions[index].checkMill();
        if (orientation!= Orientation.None){
            //update the other tokens that in the same mill
            this.positions[index].updateMillCounterOrientation(orientation, false)
            this.positions[index].removeToken()
            }
        return true;
    }
    
    public placeToken(index: number){
        let team = this.positions[index].getPlayer()
        let currentTeam = this.getCurrentTeam()
        if (team == undefined){
            return false
        }
        else{
            this.positions[index].placeToken(currentTeam.getPlayer())
        }
    }
    public switchPlayingTeam(){
        switch (this.currentPlayer) {
            case 0:
                this.currentPlayer = 1;
                break;
            case 1:
                this.currentPlayer = 0;
                break;
            default:
                break;
        }
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

        if (millOrientation == Orientation.None){
            return false;
        }
        else{
            return true;
        }
    }
}
