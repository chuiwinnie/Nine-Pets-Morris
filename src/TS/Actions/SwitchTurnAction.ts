import { Action } from "./Action";
import { Board } from "./../Board";

export class PlaceTokenAction extends Action {

    constructor(board: Board) {
        super(board);
    }

    execute(): Board {
        // TODO: Implement place token action
        return this.board;
    }
}