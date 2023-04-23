import {Team} from './../Enums/Team';

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
    private millCount: number;

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
        this.millCount = 0;
    }
}