export class Board{
    playingTeam: Team;
    nonPlayingTeam: Team;
    positions: Position[];

    constructor(playingTeam: Team, nonPlayingTeam:TemplateStringsArray, positions: Position[]){
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
