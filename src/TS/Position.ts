import { Player } from './enums/Player.js';
import { Direction } from './enums/Direction.js';
import { Orientation } from './enums/Orientation.js';


/**
 * This class represents a position on the board.
 */
export class Position {
    /**
     * The player that occupies this position.
     */
    private player?: Player;

    /**
     * The neighbour position above this position.
     */
    private upNode?: Position;

    /**
     * The neighbour position below this position.
     */
    private downNode?: Position;

    /**
     * The neighbour position to the left of this position.
     */
    private leftNode?: Position;

    /**
     * The neighbour position to the right of this position.
     */
    private rightNode?: Position;

    /**
     * The index of this position, ranges from 0-23 inclusive.
     */
    private index: number;

    /**
     * The number of mills that this position is part of.
     */
    private millCounter: number;

    /**
     * Constructs a position.
     * @param player The player that occupies this position.
     * @param index The index of this position.
     */
    constructor(player: Player | undefined, index: number) {
        this.player = player;
        this.index = index;
        this.millCounter = 0;
    }

    /**
     * Sets the neighbour position at the specified direction.
     * @param direction The direction of the neighbour position.
     * @param neighbour The neighbour position.
     */
    public setNeighbour(direction: Direction, neighbour: Position): void {
        switch (direction) {
            case Direction.Up:
                this.upNode = neighbour;
                break;
            case Direction.Down:
                this.downNode = neighbour;
                break;
            case Direction.Left:
                this.leftNode = neighbour;
                break;
            case Direction.Right:
                this.rightNode = neighbour;
                break;
        }
    }

    /**
     * Gets the player that occupies this position.
     * @returns The player that occupies this position, or undefined if position not occupied.
     */
    public getPlayer(): Player | undefined {
        return this.player;
    }

    /**
     * Gets this position's neighbour at the specified direction.
     * @returns The specified neighbour position, or undefined if no neighbour.
    */
    public getNeighbour(direction: Direction): Position | undefined {
        switch (direction) {
            case Direction.Up:
                return this.upNode;
            case Direction.Down:
                return this.downNode;
            case Direction.Left:
                return this.leftNode;
            case Direction.Right:
                return this.rightNode;
        }
    }

    /**
     * Gets the index of this position.
     * @returns The index of this position.
     */
    getIndex(): number {
        return this.index;
    }

    /**
     * Gets the number of mils this position is part of.
     * @returns The number of mills this position is part of.
     */
    getMillCounter(): number {
        return this.millCounter;
    }

    /**
     * Places a player's token onto this position.
     * @param player The player that occupies this position.
     */
    placeToken(player: Player): void {
        this.player = player;
    }

    /**
     * Removes a player's token from this position.
     */
    removeToken(): void {
        this.player = undefined;
    }

    /**
     * 
     * @returns Orientation of the mill this position is part of, if any
     */
    checkMill(): Orientation {
        let millVertical = this.checkOrientation(Orientation.Vertical);
        let millHorizontal = this.checkOrientation(Orientation.Horizontal);
        if (millVertical && millHorizontal) {
            return Orientation.Both;
        }
        else if (millVertical) {
            return Orientation.Vertical;
        }
        else if (millHorizontal) {
            return Orientation.Horizontal;
        }
        else {
            return Orientation.None;
        }
    }

    /**
     * Checks whether this position is part of a mill in a given orientation
     * @param orientation Orientation to check for a mill
     * @returns Whether this position is part of a mill in the given orientation
     */
    checkOrientation(orientation: Orientation): boolean {
        switch (orientation) {
            case Orientation.Vertical:
                if (this.checkDirection(Direction.Up) + this.checkDirection(Direction.Down) == 2) {
                    return true;
                }
                break;
            case Orientation.Horizontal:
                if (this.checkDirection(Direction.Left) + this.checkDirection(Direction.Right) == 2) {
                    return true;
                }
                break;
        }
        return false;
    }

    /**
     * @param direction Direction to check for a neighbour
     * @returns Number of consecutive neighbours that belong to the same player in the given direction
     */
    checkDirection(direction: Direction): number {
        let neighbour = this.getNeighbour(direction);
        if (neighbour && (neighbour.getPlayer() == this.getPlayer())) {
            let counter = neighbour.checkDirection(direction);
            return counter += 1;
        }
        return 0;
    }

    /**
     * Updates the mill counter and the direction-specific mill counters for a given orientation.
     * @param orientation - The orientation of the mill.
     * @param addingMill - A boolean indicating whether a mill is being added or removed.
     */
    updateMillCounterOrientation(orientation: Orientation, addingMill: boolean) {
        this.updateMillCounter(addingMill);
        switch (orientation) {
            case Orientation.Vertical:
                this.updateMillCounterDirection(Direction.Up, addingMill);
                this.updateMillCounterDirection(Direction.Down, addingMill);
                break;
            case Orientation.Horizontal:
                this.updateMillCounterDirection(Direction.Left, addingMill);
                this.updateMillCounterDirection(Direction.Right, addingMill);
                break;
            case Orientation.Both:
                this.updateMillCounterDirection(Direction.Up, addingMill);
                this.updateMillCounterDirection(Direction.Down, addingMill);
                this.updateMillCounterDirection(Direction.Left, addingMill);
                this.updateMillCounterDirection(Direction.Right, addingMill);
                break;
            case Orientation.None:
                break;
        }
    }

    /**
     * Update the mill counter in the specified direction and recursively update in the same direction for neighbouring nodes.
     * @param {Direction} direction - The direction to update the mill counter in.
     * @param {boolean} addingMill - Whether to add or subtract from the mill counter.
     */
    private updateMillCounterDirection(direction: Direction, addingMill: boolean) {
        let neighbour = this.getNeighbour(direction);
        if (neighbour) {
            neighbour.updateMillCounter(addingMill);
            neighbour.updateMillCounterDirection(direction, addingMill);
        }

    }

    /**
     * Updates the mill counter based on whether a mill is being added or removed.
     * @param addingMill A boolean indicating whether a mill is being added (true) or removed (false).
     */
    private updateMillCounter(addingMill: boolean) {
        switch (addingMill) {
            case true:
                this.millCounter += 1;
                break;
            case false:
                this.millCounter -= 1;
                break;
        }
    }
}
