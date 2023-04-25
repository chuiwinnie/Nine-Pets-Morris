import { Board } from "./../Board.js";

export abstract class Action {
    board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    abstract execute(): void;
}