import * as readline from "readline";

// In this file you need to create a ship sinking game with 100 points. The board is 10x10
// The task was conducted in 2 hours, not quite finish yet with some minor bugs but I'm satisfied with the own produced code

class Ship {
    length: number;
    isVertical: boolean;
    startingPoint: number;
    leftOverPoints: number;
    coordinates: number[][];

    constructor (lengthOfShip: number, isVertical: boolean, startingPoint: number) {
        this.length = lengthOfShip;
        this.isVertical = isVertical;
        this.startingPoint = startingPoint;
        this.leftOverPoints = this.length + 1;
        this.coordinates = []
    }

    isOnBoat(x: number, y: number): boolean {
        const index = this.coordinates.findIndex(part => {
            return part[0] === x && part[1] === y;
        });

        if (index === -1) {
            return false;  
        }

        this.coordinates.splice(index, 1);
        this.leftOverPoints -= 1;
        
        if (this.leftOverPoints <= 0) {
            console.log("You've sunk the ship!")
            return true;
        }
        return false; 
    }

    addCoordinates(x: number, y: number) {
        const coordinates = [x, y];
        this.coordinates.push(coordinates);
    }
}

class Game {
    private currentPoints: number = 0;
    private board: string[][] = [];
    private boardView: string[][] = []
    private rows: number = 10;
    private vertical: number = 10;
    private totalBoats: Ship[] = [];
    private gameIsOn: boolean = true;

    private emptySlots: string = "X";
    private ship: string = "S";
    private shot: string = "O";
    private sinkedCell: string = "Ä";

    createBoard() {
        this.board = [];
        this.boardView = [];

        for (let i = 0; i < this.vertical; i++) {
            this.board[i] = [];
            this.boardView[i] = [];
            for (let j = 0; j < this.rows; j++) {
                this.board[i]![j] = this.emptySlots;
                this.boardView[i]![j] = this.emptySlots;
            }
        }
    }

    // The adding is still missing which y coordinate but now it's hardcorded
    addShipToBoard(boat: Ship) {
        // Storing the boat to the Game
        this.totalBoats.push(boat);
        // Printing in vertical
        if (boat.isVertical) {
            for (let i = 0; i < boat.length; i++) {
                const row = boat.startingPoint;
                if (row >= this.vertical) {
                    break
                }
                boat.addCoordinates(row, 0);
                this.board[row + i]![0] = this.ship; 
            }
        } else {
            // Printing in row
            for (let i = 0; i < boat.length; i++) {
                const col = boat.startingPoint;
                if (col >= this.rows) break;
                boat.addCoordinates(0, col + i);
                this.board[0]![col + i] = this.ship; 
            }
        }
    }

    shoot(x: number, y: number) {
        if (this.board[x]![y] == "S") {
            this.currentPoints += 1;
            // Checking everyboat if it was a hit or miss / Does this even happen
            for (const boat of this.totalBoats) {
                if (boat.isOnBoat(x, y)) {
                    this.removeBoat(boat);
                }
            }
            this.board[x]![y] = this.sinkedCell;
            this.boardView[x]![y] = this.sinkedCell;
            return "You've hitted the boat";
        } else if (this.board[x]![y] == this.shot){
            return "You've given a shot on these coordinates before.";
        } else {
            this.currentPoints += 1;
            this.board[x]![y] = this.shot;
            this.boardView[x]![y] = this.shot;
            return "Miss!";
        }
    }

    checkGame() {
        if (this.currentPoints >= 100) {
            this.gameIsOn = false;
            return "Game over, you've lost!";
        } else if (this.totalBoats.length <= 0) {
            this.gameIsOn = false;
            return "Congratz, you've sinked all of the boats and won the game!"
        } else {
            return "Game is not over yet, keep playing!";
        }
    }

    // Showing the user only the board which doesnt display the boats
    getBoardView(): string[][] {
        return this.boardView;
    }

    getGameIsOn() {
        return this.gameIsOn;
    }

    removeBoat(sinkedBoat: Ship) {
        this.totalBoats = this.totalBoats.filter(boat => boat !== sinkedBoat)
        if (this.totalBoats.length <= 0) {
            return "You've won the Game!";
        }
    }
}

//  ------------- Main function -------------
function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Initializing the game
    const horizontalBoat: Ship = new Ship(3, false, 1);
    const verticalBoat: Ship = new Ship(3, true, 2);
    const game = new Game();

    game.createBoard();
    game.addShipToBoard(horizontalBoat);
    game.addShipToBoard(verticalBoat);

    console.log("Welcome to boat sinking game!");

    function askQuestion() {
        if (!game.getGameIsOn()) { 
            console.log("Game is over from main loop.")
            rl.close();
            return;
        }

        rl.question('Enter coordinate X: ', (x) => {
            rl.question('Enter coordinate Y:', (y) => {
                try {
                    console.log(game.shoot(Number(x), Number(y)));
                    console.log(game.checkGame());
                    // This part was added later with AI so that I can see the printed board better
                    console.log("  0 1 2 3 4 5 6 7 8 9");
                    game.getBoardView().forEach((row, i) => {
                        console.log(i + " " + row.join(" "));
                    });
                    // ----------------------------------------------------------------------------
                } catch (error) {
                    if (error instanceof Error) {
                        console.error("Invalid coordinates: " + error.message);
                    }
                } finally {
                    askQuestion(); 
                }  
            })
        });
    }
    askQuestion(); 
};

main();