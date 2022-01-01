const bananaCounter = document.getElementById("bananaCount");
const feedButton = document.getElementById("feedMinion");
const minionSong = new Howl({
src: ['minion.mp3']
});

let bananaAmount = 0;

// Increases the number of bananas by one when the "Feed minion" button is clicked

feedButton.addEventListener('click', () => {
    minionSong.play();
    bananaAmount++;
    bananaCounter.innerHTML = `THE MINION HAS EATEN ${bananaAmount} BANANAS`;
});

/**
 * Class that represents an item in the game
 */
class GameItem {
    amount = 0;

    /**
     * The amount of bananas you will have after each second with this item
     * @param {number} bananaAmount 
     */
    profit() {
        return this.amount * this.bananaPerSecond
    }

    /**
     * Creates a new item
     * @param {number} startingCost The base price of your item 
     * @param {string} name The name of your item 
     * @param {number} bps The bananas per second one of this item makes
     * @param {HTMLElement} button The button that displays the cost and amount of your item
     */
    constructor(startingCost, name, bps, button) {
        this.cost = startingCost;
        this.name = name;
        this.bananaPerSecond = bps;
        this.button = button
    }
    
    /**
     * Buys a new item and increases the cost (DOESN'T DECREASE YOUR AMOUNT OF BANANA'S)
     * @param {number} bananaAmount 
     */
    buy(bananaAmount) {
        if (bananaAmount >= this.cost) {
            this.amount++;
            this.cost = this.cost + (this.cost / 2);
    
            this.button.innerHTML = `${this.name}, cost: ${this.cost} bananas, amount: ${this.amount}`;
        }
    }
}

// The button to buy the tree
const bananaTreeButton = document.getElementById('bananaTreeButton');

// Creates an item called the banana tree with 0.5 bps
const bananaTree = new GameItem(10, "banana tree", 0.5, bananaTreeButton);

// Buys a tree on click of the buy button
bananaTreeButton.addEventListener('click', () => {  
    bananaTree.buy(bananaAmount);
    bananaAmount =- bananaTree.cost;

    if (bananaAmount < 0) {
        bananaAmount = 0;
    }
})

const bananaFarmButton = document.getElementById('bananaFarmButton');

// Creates an item called the banana farm with 2 bps
const bananaFarm = new GameItem(50, "banana farm", 2, bananaFarmButton);

// Buys a tree on click of the buy button
bananaFarmButton.addEventListener('click', () => {  
    bananaFarm.buy(bananaAmount);
    bananaAmount =- bananaFarm.cost;

    if (bananaAmount < 0) {
        bananaAmount = 0;
    }
})

// Increases your bananas by your BPS every second
setInterval(() => {
    bananaAmount = bananaAmount + bananaTree.profit();
    bananaAmount = bananaAmount + bananaFarm.profit();
    bananaCounter.innerHTML = `THE MINION HAS EATEN ${bananaAmount} BANANAS`;
}, 1000)