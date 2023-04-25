import { Action } from "./Action.js";
import { Board } from "./../Board.js";

export class SwitchTurnAction extends Action {

    constructor(board: Board) {
        super(board);
    }

    execute(): Board {
        // TODO: Implement place token action
        return this.board;
    }
}