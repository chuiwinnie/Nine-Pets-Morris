import { Player } from '../Enums/Player';
import { Direction } from './../Enums/Direction';
import { Orientation } from './../Enums/Orientation';

/**
 * This class represents a position on the board
 * Includes both actual positions on the board and pet home positions
 */
export class Position {
    // Initialise variables
    private player?: Player;
    private upNode?: Position;
    private downNode?: Position;
    private leftNode?: Position;
    private rightNode?: Position;
    private index: number;
    private millCounter: number;

    /**
     * Constructor for Position
     * @param player Player that occupies this position
     * @param isNode Whether this position is a home position
     * @param index Index of this position
     */
    constructor(player: Player, index: number) {
        this.player = player;
        this.index = index;
        this.millCounter = 0;
    }

    /**
     * Set a neighbouring position, depending on the direction
     * @param direction Direction of the neighbour
     * @param neighbour Neighbouring position
     */
    public setNode(direction: Direction, neighbour: Position) {
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

    // Getters and setters
    /**
     * @returns Player that occupies this position
     */
    public getPlayer(): Player | undefined{
        return this.player;
    }

    /**
     * @returns Whether this position is a home position
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
     * @returns Index of this position
     */
    public getIndex(): number {
        return this.index;
    }

    /**
     * @returns Number of mills this position is part of
     */
    public getMillCounter(): number {
        return this.millCounter;
    }

    /**
     * Places a player's token onto this position
     * There is no validation done here, validation must be done by whatever function calls this method
     * @param player Player that occupies this position
     */
    public placeToken(player: Player) {
        this.player = player;
    }

    /**
     * Removes a player's token from this position
     */
    public removeToken() {
        this.player = undefined;
    }

    /**
     * @returns Orientation of the mill this position is part of, if any
     */
    public checkMill(): Orientation {
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
    private checkOrientation(orientation: Orientation): boolean {
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
    public checkDirection(direction: Direction): number {
        let neighbour = this.getNeighbour(direction);
        if (neighbour && neighbour.getPlayer() == this.getPlayer()) {
            let counter = neighbour.checkDirection(direction);
            return counter += 1;
        }
        return 0;
    }

    public updateMillCounterOrientation(orientation: Orientation, addingMill: boolean) {
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

    private updateMillCounterDirection(direction: Direction, addingMill: boolean) {
        let neighbour = this.getNeighbour(direction);
        if (neighbour) {
            neighbour.updateMillCounter(addingMill);
            neighbour.updateMillCounterDirection(direction, addingMill);
        }

    }

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
