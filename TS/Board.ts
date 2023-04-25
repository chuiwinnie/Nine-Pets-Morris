import { Player } from "./../Enums/Player";
import { Position } from "./Position";

export class Board{
    playingTeam: Player;
    nonPlayingTeam: Player;
    positions: Position[];

    constructor(playingTeam: Player, nonPlayingTeam: Player, positions: Position[]){
        this.playingTeam = playingTeam;
        this.nonPlayingTeam = nonPlayingTeam;
        this.positions = positions;

    }

    getPlayingTeam(){
        return this.playingTeam;
    }
    getNonPlayingTeam(){
        return this.nonPlayingTeam;
    }
    setPlayingteam(){}
    setNonPlayingTeam(){}
    removeToken(){}
    placeToken(){}
    checkMill(){}


}
