import { Game } from "./Game.js";
import { Board } from "./Board.js";
import { Application } from "./Application.js";
import { Player } from "./enums/Player.js";


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

/**
 * Represents the game display.
 */
export class Display {
    /**
     * The instance of the display.
     */
    private static displayInstance: Display;
     /**
     * Creates a new instance of the display.
     * 
     * Note: This constructor is private to enforce the Singleton pattern.
     */
    private constructor() { }
    /**
     * Gets the instance of the display.
     * 
     * @returns The instance of the display.
     */
    public static getInstance() {
        if (Display.displayInstance == null) {
            Display.displayInstance = new Display();
        }
        return Display.displayInstance;
    }
    /**
     * Shows the main menu.
     */
    public showMainMenu() { }
    /**
     * Shows the list of games.
     * 
     * @param gameList The list of games to display.
     */
    public showGameList(gameList: Game[]) { }

    /**
     * Shows the game board.
     * 
     * @param board The game board to display.
     */
    public showBoard(board: Board) {
        // set up canvas and get its context
        const context = this.setUpCanvas();

        // draw all nodes
        this.drawNodes(context, board);

        // draw all horizontal lines
        this.drawHorizontalLines(context);

        // draw all vertical lines
        this.drawVerticalLines(context);

        // dislay game state information
        this.displayInformation(board)

        // detect which node has been clicked by user
        this.detectNodeClick()
    }
    /**
     * Sets up the canvas.
     * 
     * @returns The canvas context.
     */
    private setUpCanvas() {
        const canvas = <HTMLCanvasElement>document.getElementById('canvas');
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

        return context;
    }
    /**
     * Draws all nodes on the canvas.
     * 
     * @param context The canvas context.
     * @param board The game board.
     */
    private drawNodes(context: CanvasRenderingContext2D, board: Board) {
        for (let i = 0; i < NODES.length; i++) {
            const node = NODES[i];
            context.beginPath();
            context.arc(node[0], node[1], NODE_RADIUS, 0, 2 * Math.PI, false);
            context.fill();
            context.stroke();

            switch(board.getPositionTeam(i)) {
                case Player.Cat:
                    this.addTokenImage(context, node[0], node[1], Player.Cat);
                    break;
                case Player.Dog:
                    this.addTokenImage(context, node[0], node[1], Player.Dog);
                    break;
                default:
                    break;
            }
        }
    }
    /**
     * Draws all horizontal lines on the canvas.
     * 
     * @param context The canvas context.
     */
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
   /**
   * Renders the vertical lines of the game board.
   * @param context - The canvas rendering context to use.
   */
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
        context.moveTo(NODE_2[0], NODE_2[1]);
        context.lineTo(NODE_8[0], NODE_8[1]);
        context.stroke();

        context.beginPath();
        context.moveTo(NODE_2[0], NODE_2[1]);
        context.lineTo(NODE_8[0], NODE_8[1]);
        context.stroke();

        context.beginPath();
        context.moveTo(NODE_17[0], NODE_17[1]);
        context.lineTo(NODE_23[0], NODE_23[1]);
        context.stroke();
    }
    /**

    Displays the current game information on the user interface.

    @param board - The current game board object.
    */
    private displayInformation(board: Board) {
        let catTeam = board.getTeam(Player.Cat);
        let catAliveTokenCount = catTeam.getNumAliveTokens()
        let catUnplacedTokenCount = catTeam.getNumUnplacedTokens()

        let dogTeam = board.getTeam(Player.Dog);
        let dogAliveTokenCount = dogTeam.getNumAliveTokens()
        let dogUnplacedTokenCount = dogTeam.getNumUnplacedTokens()
        // Update the HTML elements with the game information.
        document.getElementById("currentTurn").innerHTML = `Current Turn: ${Player[board.getPlayingTeam().getPlayer()]}`;
        document.getElementById("catAliveTokens").innerHTML = `Alive Tokens: ${catAliveTokenCount}`;
        document.getElementById("catUnplacedTokens").innerHTML = `Unplaced Tokens: ${catUnplacedTokenCount}`;
        document.getElementById("dogAliveTokens").innerHTML = `Alive Tokens: ${dogAliveTokenCount}`;
        document.getElementById("dogUnplacedTokens").innerHTML = `Unplaced Tokens: ${dogUnplacedTokenCount}`;
    }
    /**

    Detects when a node is clicked on a canvas element and triggers an action.
    */
    private detectNodeClick() {
        // Get canvas element by id
        const canvas = <HTMLCanvasElement>document.getElementById('canvas');
        // Set onclick function for canvas element
        canvas.onclick = function (e) {
            // Get absolute position of canvas
            var rect = canvas.getBoundingClientRect(),  // get absolute position of canvas
                x = e.clientX - rect.left,              // adjust mouse-position
                y = e.clientY - rect.top;
             // Get context of canvas element
            const context = canvas.getContext('2d');
            if (context == null) return;
            // Iterate through nodes and check if clicked point is within a node
            for (let i = 0; i < NODES.length; i++) {
                const node = NODES[i];
                getArc(context, node[0], node[1], NODE_RADIUS);
                if (context.isPointInPath(x, y)) {
                    // Trigger action with Display instance and node index
                    Application.getInstance().getCurrentGame().action(Display.getInstance(), i, false)
                }
            }
        };
        /**

        Draws an arc on the canvas context at the given x and y coordinates with the specified radius.
        @param context - The canvas 2D rendering context to draw the arc on.
        @param x - The x-coordinate of the center of the arc.
        @param y - The y-coordinate of the center of the arc.
        @param r - The radius of the arc.
        */
        function getArc(context: CanvasRenderingContext2D, x: number, y: number, r: number) {
            context.beginPath();
            context.arc(x, y, r, 0, Math.PI * 2);
            context.closePath();
        }
    }
    /**

    Adds a token image to the specified canvas context at the given (x, y) position for the given player.

    @param context - The canvas rendering context to draw the image onto.

    @param x - The x-coordinate of the center of the token image.

    @param y - The y-coordinate of the center of the token image.

    @param player - The player whose token image should be drawn.
    */
    private addTokenImage(context: CanvasRenderingContext2D, x: number, y: number, player: Player) {
        const image = new Image();
        switch (player) {
            case (Player.Cat):
                image.src = "./assets/cat.png";
                break;
            case (Player.Dog):
                image.src = "./assets/dog.png";
                break;
            default:
                break;
        }
    
        image.onload = function () {
            context.drawImage(image, x - TOKEN_SIZE * 0.5, y - TOKEN_SIZE * 0.5, TOKEN_SIZE, TOKEN_SIZE);
        }
    }
    /**

    Updates the UI to display the victory of a specific team.
    @param team - The winning team.
    */
    public showVictory(team: Player) {
        document.getElementById("currentTurn").innerHTML = `${Player[team]} Wins!`;
        console.log(Player[team] + " wins!");
    }
}
