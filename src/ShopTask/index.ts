/*
Inventory / Shop Simulator

You have a “store” with items (name, price, quantity).

Player can buy or sell items.

Track player money and inventory.

Optional: restock items randomly.

Skills: arrays of objects, loops, functions, simple economy logic.
*/

import * as readline from "readline";


class Shop {
    private items: Item[];
    
    constructor (items: Item[]) {
        this.items = items;
    }

    displayItems(): Item[] {
        return this.items;
    }

    buyItem(item: Item, player: Player) {
        if (player.getCurrentMoney() <= item.getPrice()) {
            console.log("You don't have enough money to buy this item.");
            return;
        }       

        player.addItem(item, item.getPrice());

        item.decreaseQuantity();
    }
}

class Item {
    private name: string;
    private price: number;
    private quantity: number;
    
    constructor (name: string, price: number, quantity: number) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getQuantity(): number {
        return this.quantity;
    }

    decreaseQuantity() {
        this.quantity -= 1;
    }
}

class Player {
    private name: string;
    private currentMoney: number;
    private inventory?: Item[];

    constructor (name: string, currentMoney: number, inventory: Item[] = []) {
        this.name = name;
        this.currentMoney = currentMoney;
        this.inventory = inventory;
    }

    addItem(item: Item, price: number) {
        this.inventory?.push(item);
        this.currentMoney -= price;
    }
    
    getName(): string {
        return this.name;
    }

    getItems(): Item[] {
        return this.inventory ?? [];
    }
    
    getCurrentMoney(): number {
        return this.currentMoney;
    }
}


//  ------------- Main function -------------
function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Initializing the game TODO: Continue from here, intialize the shop, players and items.
    const player = new Player("Viet", 5000)
    const shop = new Shop([new Item("Macbook", 10, 10), new Item("Banana", 20, 20), new Item("Cherry", 30, 30)]);

    function askQuestion() {

        rl.question('Enter coordinate X: ', (x) => {
            rl.question('Enter coordinate Y:', (y) => {
                try {
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