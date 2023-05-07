import { Position } from './Position.js';
import { Team } from './Team.js';
import { Player } from './enums/Player.js';
import { Direction } from "./enums/Direction.js";


/**
 * This class represents the 9MM game board displayed at any specific turn/state of the game.
 */
export class Board {
    /**
     * The list of teams in the game.
     */
    private teams: Team[];

    /**
     * The current player's index in teams.
     */
    private currentPlayer: Player;

    /**
     * An array of positions on the 9MM game board.
     */
    private positions: Position[];

    /**
     * The current phase of the game.
     */
    private gamePhase: number;

    /**
     * The position index of where the last token was picked up.
     */
    private pickUpPositionIndex?: number;

    /**
     * Constructs a new board.
     * @param teams The teams playing in the game.
     * @param currentPlayer The current player index.
     * @param gamePhase The current phase of the game.
     * @param positions The positions on the board.
     * 
     */
    constructor(teams?: Team[], currentPlayer?: Player, positions?: Position[], gamePhase?: number) {
        this.teams = teams ?? [new Team(Player.Cat), new Team(Player.Dog)];
        this.currentPlayer = currentPlayer ?? Player.Cat;
        this.positions = positions ?? this.setUpPositions();
        this.gamePhase = gamePhase ?? 1;
    }

    /**
     * Set ups an empty board with 24 positions with corresponding neighbours.
     * @returns An array of positions in a game board.
     */
    private setUpPositions(): Position[] {
        const emptyBoard: Position[] = [];
        for (let i = 0; i < 24; i++) {
            emptyBoard.push(new Position(undefined, i));
        }
        
        emptyBoard[0].setNeighbour(Direction.Right, emptyBoard[1]);
        emptyBoard[0].setNeighbour(Direction.Down, emptyBoard[9]);

        emptyBoard[1].setNeighbour(Direction.Left, emptyBoard[0]);
        emptyBoard[1].setNeighbour(Direction.Right, emptyBoard[2]);
        emptyBoard[1].setNeighbour(Direction.Down, emptyBoard[4]);

        emptyBoard[2].setNeighbour(Direction.Left, emptyBoard[1]);
        emptyBoard[2].setNeighbour(Direction.Down, emptyBoard[14]);

        emptyBoard[3].setNeighbour(Direction.Right, emptyBoard[4]);
        emptyBoard[3].setNeighbour(Direction.Down, emptyBoard[10]);

        emptyBoard[4].setNeighbour(Direction.Left, emptyBoard[3]);
        emptyBoard[4].setNeighbour(Direction.Right, emptyBoard[5]);
        emptyBoard[4].setNeighbour(Direction.Up, emptyBoard[1]);
        emptyBoard[4].setNeighbour(Direction.Down, emptyBoard[7]);

        emptyBoard[5].setNeighbour(Direction.Left, emptyBoard[4]);
        emptyBoard[5].setNeighbour(Direction.Down, emptyBoard[13]);

        emptyBoard[6].setNeighbour(Direction.Right, emptyBoard[7]);
        emptyBoard[6].setNeighbour(Direction.Down, emptyBoard[11]);

        emptyBoard[7].setNeighbour(Direction.Left, emptyBoard[6]);
        emptyBoard[7].setNeighbour(Direction.Right, emptyBoard[8]);
        emptyBoard[7].setNeighbour(Direction.Up, emptyBoard[4]);

        emptyBoard[8].setNeighbour(Direction.Left, emptyBoard[7]);
        emptyBoard[8].setNeighbour(Direction.Down, emptyBoard[12]);

        emptyBoard[9].setNeighbour(Direction.Up, emptyBoard[0]);
        emptyBoard[9].setNeighbour(Direction.Right, emptyBoard[10]);
        emptyBoard[9].setNeighbour(Direction.Down, emptyBoard[21]);

        emptyBoard[10].setNeighbour(Direction.Left, emptyBoard[9]);
        emptyBoard[10].setNeighbour(Direction.Right, emptyBoard[11]);
        emptyBoard[10].setNeighbour(Direction.Up, emptyBoard[3]);
        emptyBoard[10].setNeighbour(Direction.Down, emptyBoard[18]);

        emptyBoard[11].setNeighbour(Direction.Left, emptyBoard[10]);
        emptyBoard[11].setNeighbour(Direction.Up, emptyBoard[6]);
        emptyBoard[11].setNeighbour(Direction.Down, emptyBoard[15]);

        emptyBoard[12].setNeighbour(Direction.Up, emptyBoard[8]);
        emptyBoard[12].setNeighbour(Direction.Right, emptyBoard[13]);
        emptyBoard[12].setNeighbour(Direction.Down, emptyBoard[17]);

        emptyBoard[13].setNeighbour(Direction.Left, emptyBoard[12]);
        emptyBoard[13].setNeighbour(Direction.Right, emptyBoard[14]);
        emptyBoard[13].setNeighbour(Direction.Up, emptyBoard[5]);
        emptyBoard[13].setNeighbour(Direction.Down, emptyBoard[20]);

        emptyBoard[14].setNeighbour(Direction.Left, emptyBoard[13]);
        emptyBoard[14].setNeighbour(Direction.Up, emptyBoard[2]);
        emptyBoard[14].setNeighbour(Direction.Down, emptyBoard[23]);

        emptyBoard[15].setNeighbour(Direction.Up, emptyBoard[11]);
        emptyBoard[15].setNeighbour(Direction.Right, emptyBoard[16]);

        emptyBoard[16].setNeighbour(Direction.Left, emptyBoard[15]);
        emptyBoard[16].setNeighbour(Direction.Right, emptyBoard[17]);
        emptyBoard[16].setNeighbour(Direction.Down, emptyBoard[19]);

        emptyBoard[17].setNeighbour(Direction.Left, emptyBoard[16]);
        emptyBoard[17].setNeighbour(Direction.Up, emptyBoard[12]);

        emptyBoard[18].setNeighbour(Direction.Up, emptyBoard[10]);
        emptyBoard[18].setNeighbour(Direction.Right, emptyBoard[19]);

        emptyBoard[19].setNeighbour(Direction.Left, emptyBoard[18]);
        emptyBoard[19].setNeighbour(Direction.Right, emptyBoard[20]);
        emptyBoard[19].setNeighbour(Direction.Up, emptyBoard[16]);
        emptyBoard[19].setNeighbour(Direction.Down, emptyBoard[22]);

        emptyBoard[20].setNeighbour(Direction.Left, emptyBoard[19]);
        emptyBoard[20].setNeighbour(Direction.Up, emptyBoard[13]);

        emptyBoard[21].setNeighbour(Direction.Up, emptyBoard[9]);
        emptyBoard[21].setNeighbour(Direction.Right, emptyBoard[22]);

        emptyBoard[22].setNeighbour(Direction.Left, emptyBoard[21]);
        emptyBoard[22].setNeighbour(Direction.Right, emptyBoard[23]);
        emptyBoard[22].setNeighbour(Direction.Up, emptyBoard[19]);

        emptyBoard[23].setNeighbour(Direction.Left, emptyBoard[22]);
        emptyBoard[23].setNeighbour(Direction.Up, emptyBoard[14]);

        return emptyBoard;
    }

    /**
     * Gets the team that is playing this current turn.
     * @returns The currently playing team.
     */
    getPlayingTeam(): Team {
        return this.teams[this.currentPlayer];
    }

    /**
     * Gets the team that is not playing this current turn..
     * @returns The non-playing team.
     */
    getNonPlayingTeam(): Team {
        return this.teams[(this.currentPlayer + 1) % 2];
    }

    /**
     * Gets the team at the specified index in teams.
     * @param index The index of the team to retrieve.
     * @returns The team at the specified index.
     */
    getTeam(index: number): Team {
        return this.teams[index];
    }

    /**
     * Gets the player at the specified position index.
     * @param index The position index.
     * @returns The player at the specified position index, or undefined if no player is at the position.
     */
    getPositionTeam(index: number): Player {
        return this.positions[index].getPlayer();
    }

    /**
     * Gets the positions array.
     * @returns The positions array of this board.
     */
    getPositions(): Position[] {
        return this.positions;
    }

    /**
     * Gets the current game phase.
     * @returns The game phase of this board.
     */
    getGamePhase(): number {
        return this.gamePhase;
    }

    /**
     * Gets the position index of where the last token was picked up.
     * @returns The position where the last token was picked up.
     */
    getPickUpPositionIndex(): number {
        return this.pickUpPositionIndex;
    }

    /**
     * Increments the game phase by 1.
     */
    incrementGamePhase(): void {
        this.gamePhase++;
    }

    /**
     * Sets the last pick up position index of the board.
     * @param index The position index where the last token was picked up.
     */
    setPickUpPosition(index: number): void {
        this.pickUpPositionIndex = index;
    }

    /**
     * Switches the currently playing team and updates the game phase accordingly.
     */
    switchPlayingTeam(): void {
        this.currentPlayer = (this.currentPlayer + 1) % 2;

        if (this.getPlayingTeam().getNumUnplacedTokens() > 0) {
            this.gamePhase = 1;
        } else {
            this.gamePhase = 0;
        }

        this.pickUpPositionIndex = undefined;
    }

    /**
     * Checks whether the position specified by index is part of a mill.
     * @param index Position index to be checked.
     * @param tokenAdded Indicates whether the mill check is performed after a token has been placed/moved.
     * @returns true if one or more mills are formed, false otherwise.
     */
    checkMill(index: number, tokenAdded: boolean): boolean {
        let millOrientation = this.positions[index].checkMill();
        this.positions[index].updateMillCounterOrientation(millOrientation, tokenAdded);
        return (millOrientation != undefined);
    }
}
