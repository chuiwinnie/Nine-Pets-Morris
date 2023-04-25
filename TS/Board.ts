import { Orientation } from './../Enums/Orientation';
import { Position } from './Position';
import { Team } from './Team';

export class Board{
    playingTeam: Team;
    nonPlayingTeam: Team;
    positions: Position[];

    constructor(playingTeam: Team, nonPlayingTeam: Team, positions: Position[]){
        this.playingTeam = playingTeam;
        this.nonPlayingTeam = nonPlayingTeam;
        this.positions = positions;

    }
    /**
     * Getter method of playingteam
     * @returns playingTeam
     */
    public getPlayingTeam(){
        return this.playingTeam;
    }

    public getNonPlayingTeam(){
        return this.nonPlayingTeam;
    }
    public setPlayingteam(team: Team){
        this.playingTeam = team;
    }
    public setNonPlayingTeam(team: Team){
        this.nonPlayingTeam = team;
    }

    /**
     * removeToken method responsible for removing a Token from the board
     * @param index position of token that need to be remove
     * @param movingToken boolean to determine whether player is performing moving action or removing oponent's token
     * @returns boolean to show if removeToken successful
     */
    public removeToken(index:number, movingToken: boolean){
        let team = this.positions[index].getPlayer();
        //check if player moving a token from one place to a target position
        if (movingToken){
            //check if the token belongs to the player
            if (team != this.playingTeam){
                return false;
        }
        //if it is removing opponent's token
        else{
            //check if player select oponent's token
            if (team != this.nonPlayingTeam){
                return false;
        }
        //check if the token form a mill before remove
        let orientation = this.positions[index].checkMill();
        if (orientation!= Orientation.None){
            //update the other tokens that in the same mill
            this.positions[index].updateMillCounterOrientation(orientation, false);
            this.positions[index].removeToken();
        }
        return true;
    }
    placeToken(){}
    checkMill(){}
}
