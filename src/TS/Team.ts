import { Player } from "./enums/Player.js";

export class Team {
    private player: Player;
    private numUnplacedTokens: number;
    private numaliveTokens: number;

    constructor(player: Player) {
        this.player = player;
        this.numUnplacedTokens = 1;
        this.numaliveTokens = 1;
    }

    public getNumUnplacedTokens(): number {
        return this.numUnplacedTokens;
    }

    public getNumAliveTokens(): number {
        return this.numaliveTokens;
    }

    public placeToken(): void {
        this.numUnplacedTokens--;
    }

    public removeToken(): void {
        this.numaliveTokens--;
    }

    public getPlayer(): Player{
        return this.player;
    }
}
