import { Game } from "./Game.js";
import { Board } from "./Board.js";
import { Team } from "./Team.js";
import { Application } from "./Application.js";
import { Player } from "./enums/Player.js";

const canvas = <HTMLCanvasElement>document.getElementById('canvas');

const CANVAS_WIDTH = window.innerWidth * 0.8;
const CANVAS_HEIGHT = window.innerHeight * 0.8;

const CANVAS_SHORT_SIDE = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT);

const NODE_RADIUS = CANVAS_SHORT_SIDE * 0.01;
const TOKEN_SIZE = NODE_RADIUS * 10;

const NODE_1 = [CANVAS_SHORT_SIDE * 0.1, CANVAS_SHORT_SIDE * 0.1];
const NODE_2 = [CANVAS_SHORT_SIDE * 0.5, CANVAS_SHORT_SIDE * 0.1];
const NODE_3 = [CANVAS_SHORT_SIDE * 0.9, CANVAS_SHORT_SIDE * 0.1];

const NODE_4 = [CANVAS_SHORT_SIDE * 0.2, CANVAS_SHORT_SIDE * 0.2];
const NODE_5 = [CANVAS_SHORT_SIDE * 0.5, CANVAS_SHORT_SIDE * 0.2];
const NODE_6 = [CANVAS_SHORT_SIDE * 0.8, CANVAS_SHORT_SIDE * 0.2];

const NODE_7 = [CANVAS_SHORT_SIDE * 0.3, CANVAS_SHORT_SIDE * 0.3];
const NODE_8 = [CANVAS_SHORT_SIDE * 0.5, CANVAS_SHORT_SIDE * 0.3];
const NODE_9 = [CANVAS_SHORT_SIDE * 0.7, CANVAS_SHORT_SIDE * 0.3];

const NODE_10 = [CANVAS_SHORT_SIDE * 0.1, CANVAS_SHORT_SIDE * 0.5];
const NODE_11 = [CANVAS_SHORT_SIDE * 0.2, CANVAS_SHORT_SIDE * 0.5];
const NODE_12 = [CANVAS_SHORT_SIDE * 0.3, CANVAS_SHORT_SIDE * 0.5];
const NODE_13 = [CANVAS_SHORT_SIDE * 0.7, CANVAS_SHORT_SIDE * 0.5];
const NODE_14 = [CANVAS_SHORT_SIDE * 0.8, CANVAS_SHORT_SIDE * 0.5];
const NODE_15 = [CANVAS_SHORT_SIDE * 0.9, CANVAS_SHORT_SIDE * 0.5];

const NODE_16 = [CANVAS_SHORT_SIDE * 0.3, CANVAS_SHORT_SIDE * 0.7];
const NODE_17 = [CANVAS_SHORT_SIDE * 0.5, CANVAS_SHORT_SIDE * 0.7];
const NODE_18 = [CANVAS_SHORT_SIDE * 0.7, CANVAS_SHORT_SIDE * 0.7];

const NODE_19 = [CANVAS_SHORT_SIDE * 0.2, CANVAS_SHORT_SIDE * 0.8];
const NODE_20 = [CANVAS_SHORT_SIDE * 0.5, CANVAS_SHORT_SIDE * 0.8];
const NODE_21 = [CANVAS_SHORT_SIDE * 0.8, CANVAS_SHORT_SIDE * 0.8];

const NODE_22 = [CANVAS_SHORT_SIDE * 0.1, CANVAS_SHORT_SIDE * 0.9];
const NODE_23 = [CANVAS_SHORT_SIDE * 0.5, CANVAS_SHORT_SIDE * 0.9];
const NODE_24 = [CANVAS_SHORT_SIDE * 0.9, CANVAS_SHORT_SIDE * 0.9];

const NODES = [
    NODE_1, NODE_2, NODE_3, NODE_4, NODE_5, NODE_6,
    NODE_7, NODE_8, NODE_9, NODE_10, NODE_11, NODE_12,
    NODE_13, NODE_14, NODE_15, NODE_16, NODE_17, NODE_18,
    NODE_19, NODE_20, NODE_21, NODE_22, NODE_23, NODE_24
];

canvas.onclick = function (e) {
    var rect = canvas.getBoundingClientRect(),  // get absolute position of canvas
        x = e.clientX - rect.left,              // adjust mouse-position
        y = e.clientY - rect.top;

    const context = canvas.getContext('2d');
    if (context == null) return;

    for (let i = 0; i < NODES.length; i++) {
        const node = NODES[i];
        getArc(context, node[0], node[1], NODE_RADIUS);
        if (context.isPointInPath(x, y)) {
            Application.getInstance().getCurrentGame().action(Display.getInstance(), i, false)
        }
    }
};

function getArc(context: CanvasRenderingContext2D, x: number, y: number, r: number) {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.closePath();
}

function addTokenImage(context: CanvasRenderingContext2D, x: number, y: number, player: Player) {
    const image = new Image();
    switch (player) {
        case (0):
            image.src = "./assets/cat.png";
            break;
        case (1):
            image.src = "./assets/dog.png";
            break;
        default:
            break;
    }

    image.onload = function () {
        context.drawImage(image, x - TOKEN_SIZE * 0.5, y - TOKEN_SIZE * 0.5, TOKEN_SIZE, TOKEN_SIZE);
    }
}


export class Display {
    private static displayInstance: Display;

    private constructor() { }

    public static getInstance() {
        if (Display.displayInstance == null) {
            Display.displayInstance = new Display();
        }
        return Display.displayInstance;
    }

    public showMainMenu() { }

    public showGameList(gameList: Game[]) { }

    /*
    public showBoard(board: Board) {
        this.drawBoard();
    }
    */

    public showBoard(board: Board) {
        if (!canvas) {
            return;
        }

        const context = canvas.getContext('2d');
        if (!context) {
            return;
        }

        // set canvas size
        context.canvas.width = CANVAS_SHORT_SIDE;
        context.canvas.height = CANVAS_SHORT_SIDE;

        // set line stroke and line width
        context.fillStyle = 'black';
        context.strokeStyle = 'black';
        context.lineWidth = 3;

        // draw all nodes
        this.drawNodes(context, board);

        // draw all horizontal lines
        this.drawHorizontalLines(context);

        // draw all vertical lines
        this.drawVerticalLines(context);
    }

    private drawNodes(context: CanvasRenderingContext2D, board: Board) {
        for (let i = 0; i < NODES.length; i++) {
            const node = NODES[i];
            context.beginPath();
            context.arc(node[0], node[1], NODE_RADIUS, 0, 2 * Math.PI, false);
            context.fill();
            context.stroke();
            switch(board.getPositionTeam(i)) {
                case 0:
                    addTokenImage(context, node[0], node[1], Player.Cat);
                    break;
                case 1:
                    addTokenImage(context, node[0], node[1], Player.Dog);
                    break;
                default:
                    break;
            }

        }
    }

    private drawHorizontalLines(context: CanvasRenderingContext2D) {
        for (let i = 0; i < NODES.length - 1; i++) {
            const startNode = NODES[i];
            const endNode = NODES[i + 1];

            context.beginPath();
            context.moveTo(startNode[0], startNode[1]);
            context.lineTo(endNode[0], endNode[1]);
            context.stroke();

            if (i % 3 == 1) {
                i += 1;
            }
        }
    }

    private drawVerticalLines(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.moveTo(NODE_1[0], NODE_1[1]);
        context.lineTo(NODE_22[0], NODE_22[1]);
        context.stroke();

        context.beginPath();
        context.moveTo(NODE_4[0], NODE_4[1]);
        context.lineTo(NODE_19[0], NODE_19[1]);
        context.stroke();

        context.beginPath();
        context.moveTo(NODE_7[0], NODE_7[1]);
        context.lineTo(NODE_16[0], NODE_16[1]);
        context.stroke();

        context.beginPath();
        context.moveTo(NODE_9[0], NODE_9[1]);
        context.lineTo(NODE_18[0], NODE_18[1]);
        context.stroke();

        context.beginPath();
        context.moveTo(NODE_6[0], NODE_6[1]);
        context.lineTo(NODE_21[0], NODE_21[1]);
        context.stroke();

        context.beginPath();
        context.moveTo(NODE_3[0], NODE_3[1]);
        context.lineTo(NODE_24[0], NODE_24[1]);
        context.stroke();

        context.beginPath();
        context.moveTo(NODE_1[0], NODE_1[1]);
        context.lineTo(NODE_7[0], NODE_7[1]);
        context.stroke();

        context.beginPath();
        context.moveTo(NODE_2[0], NODE_2[1]);
        context.lineTo(NODE_8[0], NODE_8[1]);
        context.stroke();

        context.beginPath();
        context.moveTo(NODE_2[0], NODE_2[1]);
        context.lineTo(NODE_8[0], NODE_8[1]);
        context.stroke();

        context.beginPath();
        context.moveTo(NODE_3[0], NODE_3[1]);
        context.lineTo(NODE_9[0], NODE_9[1]);
        context.stroke();

        context.beginPath();
        context.moveTo(NODE_16[0], NODE_16[1]);
        context.lineTo(NODE_22[0], NODE_22[1]);
        context.stroke();

        context.beginPath();
        context.moveTo(NODE_17[0], NODE_17[1]);
        context.lineTo(NODE_23[0], NODE_23[1]);
        context.stroke();

        context.beginPath();
        context.moveTo(NODE_18[0], NODE_18[1]);
        context.lineTo(NODE_24[0], NODE_24[1]);
        context.stroke();
    }

    public showVictory(team: Team) { }
}