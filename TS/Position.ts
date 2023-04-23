import {Team} from './../Enums/Team';
import {Direction} from './../Enums/Direction';

/**
 * This class represents a position on the board
 * Includes both actual positions on the board and pet home positions
 */
class Position {
    // Initialise variables
    private team: Team;
    private isNode: boolean;
    private upNode: Position;
    private downNode: Position;
    private leftNode: Position;
    private rightNode: Position;
    private index: number;
    private millCounter: number;

    /**
     * Constructor for Position
     * @param team Team that occupies this position
     * @param isNode Whether this position is a home position
     * @param index Index of this position
     */
    constructor(team: Team, isNode: boolean, index: number) {
        this.team = team;
        this.isNode = isNode;
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
     * @returns Team that occupies this position
     */
    public getTeam(): Team {
        return this.team;
    }

    /**
     * @returns Whether this position is a home position
    */
    public getNeighbour(direction: Direction): Position {
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
     * @returns Whether this position is a home position
     */
    public getIsNode(): boolean {
        return this.isNode;
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
}