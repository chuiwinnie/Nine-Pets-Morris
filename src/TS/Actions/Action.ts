import { Board } from "./../Board";

export abstract class Action {
    board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    abstract execute(): void;
}