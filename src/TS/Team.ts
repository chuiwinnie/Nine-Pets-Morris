import { Player } from "./enums/Player.js";

/**

Represents a team in the game, which corresponds to a player.
Keeps track of the number of unplaced and alive tokens for the player.
*/
export class Team {
    private player: Player;
    private numUnplacedTokens: number;
    private numaliveTokens: number;
    /**
     * Constructor for a Team object.
     * @param player - The player associated with this team.
     */
    constructor(player: Player) {
        this.player = player;
        this.numUnplacedTokens = 3;
        this.numaliveTokens = 3;
    }
    /**
     * Returns the number of unplaced tokens for the team.
     * @returns The number of unplaced tokens.
     */
    public getNumUnplacedTokens(): number {
        return this.numUnplacedTokens;
    }
    /**
     * Returns the number of alive tokens for the team.
     * @returns The number of alive tokens.
     */
    public getNumAliveTokens(): number {
        return this.numaliveTokens;
    }

    /**
     * Decreases the number of unplaced tokens by one.
     */
    public placeToken(): void {
        if (this.numUnplacedTokens > 0) {
            this.numUnplacedTokens--;
        }
    }
    /**
     * Decreases the number of alive tokens by one.
     */

    public removeToken(): void {
        this.numaliveTokens--;
    }
    /**
     * Returns the player associated with this team.
     * @returns The player.
     */
    public getPlayer(): Player{
        return this.player;
    }
}
