import { Action } from "./Action";
import { Board } from "./../Board";

export class PlaceTokenAction extends Action {
    private previosPositionIndex: number;

    constructor(board: Board, previousPositionIndex: number) {
        super(board);
        this.previosPositionIndex = previousPositionIndex;
    }

    execute(): Board {
        // TODO: Implement place token action
        return this.board;
    }
}