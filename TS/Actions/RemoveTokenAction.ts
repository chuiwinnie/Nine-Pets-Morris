import { Action } from "./Action";
import { Board } from "./../Board";

export class RemoveTokenAction extends Action {
    private removingOwnToken: boolean;

    constructor(board: Board, removingOwnToken: boolean) {
        super(board);
        this.removingOwnToken = removingOwnToken;
    }

    execute(): Board {
        // TODO: Implement place token action
        return this.board;
    }
}