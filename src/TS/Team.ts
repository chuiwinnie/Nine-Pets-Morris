import { Player } from "./enums/Player.js";

export class Team {
    private player: Player;
    private numUnplacedTokens: number;
    private numaliveTokens: number;

    constructor(player: Player) {
        this.player = player;
        this.numUnplacedTokens = 3;
        this.numaliveTokens = 3;
    }

    public getNumUnplacedTokens(): number {
        return this.numUnplacedTokens;
    }

    public getNumAliveTokens(): number {
        return this.numaliveTokens;
    }

    public placeToken(): void {
        if (this.numUnplacedTokens > 0) {
            this.numUnplacedTokens--;
        }
    }

    public removeToken(): void {
        this.numaliveTokens--;
    }

    public getPlayer(): Player{
        return this.player;
    }
}
