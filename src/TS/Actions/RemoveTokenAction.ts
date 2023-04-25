import { Action } from "./Action.js";
import { Board } from "./../Board.js";

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